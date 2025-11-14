import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { v4 as uuidv4 } from "uuid";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const getOrCreateSessionId = () => {
  let sessionId = Cookies.get('sessionId');
  return sessionId;
};

const getOrCreateCsrfToken = () => {
  let csrfToken = Cookies.get('X-CSRF-Token');
  if (!csrfToken) {
    csrfToken = uuidv4();
    Cookies.set('X-CSRF-Token', csrfToken, {
      secure: true,
      sameSite: 'strict'
    });
  }
  return csrfToken;
};

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_BE_API_URL}/graphql`,
  credentials: "include",
  fetchOptions: {
    retry: 3, // 重複次數
    retryDelay: (retryCount) => {
      const baseDelay = Math.pow(2, retryCount) * 1000;
      const cappedDelay = Math.min(baseDelay, 10000);
      const jitter = cappedDelay * 0.3 * (Math.random() - 0.5);
      return Math.max(500, cappedDelay + jitter);
    },
    onRetry: (error, retryCount) => {
      console.log(`Retry attempt ${retryCount} for GraphQL request`);
    }
  }
});

const authLink = setContext((_, { headers }) => {
  const sessionId = getOrCreateSessionId();
  const csrfToken = getOrCreateCsrfToken();
  const accessToken = localStorage.getItem('accessToken');

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
      "X-CSRF-Token": `${csrfToken}`
    }
  }
});

// 自定義錯誤處理邏輯
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);

      // 處理特定錯誤碼
      if (extensions?.code) {
        handleErrorByCode(extensions.code, message);
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);

    // 處理網路錯誤
    if (!networkError.response) {
      toast.error('網絡連接錯誤，請檢查您的網絡設置', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const status = networkError.response.status;
    handleErrorByStatus(status);
  }
});

// 錯誤狀態碼處理func
const handleErrorByStatus = (status) => {
  const errorMessages = {
    401: 'Unauthorized',
    403: '權限不足，請聯繫管理員',
    404: '請求資源不存在',
    408: '請求超時，請稍後再試',
    429: '請求過於頻繁，請稍後再試',
    500: '服務器內部錯誤，請聯繫管理員',
    502: '網路錯誤，請稍後再試',
    503: '服務不可用，請稍後再試',
    504: '網路超時，請稍後再試'
  };

  const message = errorMessages[status] || 'something went wrong';

  toast.error(message, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

// 錯誤代碼處理func
const handleErrorByCode = (code, defaultMessage) => {
  const errorMessages = {
    UNAUTHENTICATED: '請重新登錄',
    FORBIDDEN: '權限不足',
    INTERNAL_SERVER_ERROR: '服務器錯誤',
  };

  const message = errorMessages[code] || defaultMessage;
  toast.error(message, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache({
    addTypename: false
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  }
});

export default client;