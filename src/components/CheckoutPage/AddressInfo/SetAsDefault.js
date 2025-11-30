import { Box, } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useContext } from 'react';
import { ModalContext } from '../../provider/ModalContext';
import { useUserRotate } from '../../provider/JwtTokenRotate';
import { apiClient } from '../../provider/axiosInstanceWithTokenCheck';

const SetAsDefault = ({ address }) => {
    const {
        setAllAddressInfo, } = useContext(ModalContext);
    const { register, handleSubmit, control, watch, trigger, formState: { errors, isValid }, setValue } = useFormContext()
    const { email } = useUserRotate();







    const handleSetDefault = async (address) => {
        // e.preventDefault();

        // 觸發特定欄位的驗證
        try {
            const requestBody = {
                ...address,
                email: email,
                state: "setDefault",
                uuid: address.uuid
            };
            const result = await apiClient.post(`checkout/checkoutInfo`, requestBody);
            if (result.status === 200) {
                setAllAddressInfo((prev) => ({
                    ...prev,
                    shippingInfo: result.data.shippingInfo,
                    addressInfo: result.data.updatedAddress
                    // updatedAddress:result.data.updatedAddress //可能不需要
                }))
                setValue("selectedAddress", result.data.updatedAddress?.uuid)
                toast({ title: "delete", status: "success", duration: 2000 });
            }

        } catch (error) {
            console.error("Error:", error);
        }
        // toast({ title: "Add Address success", status: "success", duration: 2000 });
    }
    return (
        <>
            <Box onClick={() => {
                handleSetDefault(address)
            }}>
                Set As Default
            </Box>
        </>
    )
}

export default SetAsDefault