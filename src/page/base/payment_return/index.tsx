import { Button, Result } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePaymentReturnQuery } from '../../../services/order';


interface PaymentResultProps {
  isSuccess: boolean;
  title: string;
  subTitle: string;
  handle: () => void;
}

const PaymentResult: React.FC<PaymentResultProps> = ({
  isSuccess,
  title,
  subTitle,
  handle,
}) => {
  const redirectHome = () => {
    window.location.href = "/";
  };
  return (
    <Result
      status={isSuccess ? "success" : "error"}
      title={title}
      subTitle={subTitle}
      extra={
        isSuccess
          ? [
            <Button type="primary" key="back" onClick={handle}>
              Về Trang Chủ
            </Button>,
          ]
          : [
            <Button key="home" onClick={redirectHome} type="primary">
              Về Trang Chủ
            </Button>,
          ]
      }
    />
  );
};

const PaymentReturn: FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const [vnpResponse, setVnpResponse] = useState<any>(null);
  const navigate = useNavigate();  
  const { data } = usePaymentReturnQuery(Object.fromEntries(urlParams));
  useEffect(() => {
    if (data) {
      console.log(data.vnp_ResponseCode);
      
      setVnpResponse(data.vnp_ResponseCode)
    }
  }, [data])
  const handleContinue = () => {
    navigate("/");
  };

  return (
    <div>
      <div>
        {vnpResponse && (
          <PaymentResult
            isSuccess={vnpResponse === "00"}
            title={
              vnpResponse === "00"
                ? "Thanh toán thành công!"
                : "Thanh toán bị hủy!"
            }
            subTitle={
              vnpResponse === "00"
                ? "Cảm ơn bạn đã thanh toán!"
                : "Đơn hàng của bạn đã bị hủy."
            }
            handle={handleContinue}
          />
        )}
      </div>
    </div>
  )
}

export default PaymentReturn