import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserRotate } from '../../provider/JwtTokenRotate';
import { usePendingItems } from '../../provider/usePendingItems';
import { apiClient } from '../../provider/axiosInstanceWithTokenCheck';
import { MealContext } from '../../provider/MealContext';

export const CartPageContext = createContext();

export const useCartPage = () => {
    return useContext(CartPageContext);
};

export const CartPageContextProvider = ({ children }) => {
    const location = useLocation();
    const [oldLocation, setOldLocation] = useState(location.pathname)
    const { identifier, isEmail } = useUserRotate();
    const { setCartItem } = useContext(MealContext);
    const [cartData, setCartData] = useState();
    const [checkoutLogin, setCheckoutLogin] = useState(false)
    const [userInfo, setUserInfo] = useState({ mergeCart: false, sessionId: !isEmail ? identifier : null, accessToken: null })

    const { addPendingItems, finishPending } = usePendingItems({
        sendToServer:
            async (latestPendingItems) => {

                try {
                    const endpoint = userInfo.mergeCart
                        ? `${import.meta.env.VITE_BE_API_URL}/shoppingcart/mergeCart`
                        : `${import.meta.env.VITE_BE_API_URL}/shoppingcart/updateCart`;

                    const payload = userInfo.mergeCart
                        ? { updatedItems: latestPendingItems, userInfo: userInfo }
                        : { updatedItems: latestPendingItems };
                    const result = await apiClient.post(endpoint, payload)

                    if (result.status === 200) {
                        setCartItem(result.data.result.totalItem)

                        setCartData(prevCartData => {
                            if (!prevCartData) return prevCartData;
                            return {
                                ...prevCartData,
                                data: prevCartData.data.map(dataItem => {
                                    // 找到對應的更新項
                                    const updatedItem = result.data.result.data.find(item => item.idMeal === dataItem.idMeal);
                                    return updatedItem ? {
                                        ...dataItem,
                                        numMeal: updatedItem.numMeal,
                                        cartAmount: updatedItem.cartAmount, // 更新 cartAmount
                                        checked: updatedItem.checked || false
                                    } : dataItem;
                                }),
                                totalAmount: result.data.result.totalAmount,
                                totalItem: result.data.result.totalItem,
                                checkedAmount: result.data.result.checkedAmount,
                                checkedItem: result.data.result.checkedItem
                            };
                        });


                    }
                } catch (error) {
                    if (error.code === "ECONNABORTED") {
                        // toast({ title: "請求超時：後端處理時間過長", status: "error" });
                    } else if (error.response) {
                        // 正常後端錯誤（如 400、500）
                    } else {
                        // toast({ title: "網路錯誤", status: "error" });
                    }
                }
            },

        onClear: () => console.log("pendingItems cleared"),
        debounceTime: 1500
    });
    useEffect(() => {
        const handleNavigationAndMerge = async () => {

            // 檢查用戶狀態和路由，決定是否觸發 mergeCart
            await finishPending()
            // ... mergeCart 的邏輯
            // finishPending()

        };
        if (location.pathname !== '/cart' && oldLocation === '/cart' && location.pathname !== '/login') {
            handleNavigationAndMerge();

        }
        setOldLocation(location.pathname)
    }, [location.pathname]);
    return (
        <CartPageContext.Provider value={{ addPendingItems, finishPending, userInfo, setUserInfo, cartData, setCartData,checkoutLogin, setCheckoutLogin }}>
            {children}
        </CartPageContext.Provider>
    );
};
