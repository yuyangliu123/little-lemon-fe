import { gql, useQuery, useMutation } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { useUserRotate } from '../provider/JwtTokenRotate';
import { useState, Suspense } from 'react';
import AccountSkeleton from './AccountSkeleton';
import Account from './Account';
const MYORDER_QUERY = gql`
query Myorderinfo($identifier: String) {
  myorderinfo(identifier: $identifier) {
      orderAmount
      orderItem
      payment
      createdAt
      orderNumber
      orderUuid
      itemInfo {
        baseAmount
      }
    }
}
`;

const AccountContainer = () => {
  const { identifier, isEmail } = useUserRotate();
  const [initialData, setInitialData] = useState(null)
  const [isDelayed, setIsDelayed] = useState(true);
  const { data, loading, error, refetch: fetchMyorder } = useQuery(MYORDER_QUERY, {
    variables: { identifier },
    fetchPolicy: 'network-only',
    skip: !identifier || !isEmail,
    //load cart item when login
    //onCompleted broken, only work when first load
    onCompleted: (data) => {
      setTimeout(() => {
        setInitialData(data.myorderinfo)
        setIsDelayed(false)
      }, 500);
    },
    onError: (error) => {
      console.log(error);
      setIsDelayed(false)
    }
  });

  if (isDelayed || loading || !initialData) {
    return <AccountSkeleton />
  }
  if (initialData.length === 0) {
    return (
      <>
        <Box>
          No Order Yet
        </Box>
      </>
    )
  }
  if (error) {
    return (
      <Box>
        something went wrong
      </Box>
    )
  }
  console.log(initialData, "initialData");

  return (
    <Suspense fallback={<AccountSkeleton />}>
      <Account initialData={initialData} />
    </Suspense>
  );
}

export default AccountContainer