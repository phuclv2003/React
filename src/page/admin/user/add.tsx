import { Button, DatePicker, Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useRegisterMutation,
  useValidateEmailMutation,
} from "../../../services/auth";
import dayjs from "dayjs";

const AddUserAdmin: React.FC = () => {
  const navigator = useNavigate();
  const [form] = Form.useForm();
  const [registerForm] = useRegisterMutation();
  const [validateEmail] = useValidateEmailMutation();

  const onFinish = async (values: any) => {
    console.log(values);
    try {
      const resValidate = await validateEmail({
        mail_address: values.mail_address,
      });
      if ("data" in resValidate) {
        const accountNew = {
          ...values,
          birthday: dayjs(values.birthday).format("YYYY-MM-DDTHH:mm:ssZ"),
          user_type: "admin",
        };
        const res = await registerForm(accountNew);
        if ("data" in res) {
          message.success("Đăng ký thành công");
          navigator('/admin/user')
        }
      } else {
        message.error("Email address already exists");
      }
    } catch (error) {
      message.error("Lỗi");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="Form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <Form.Item
        name="account_name"
        rules={[{ required: true }]}
        label="Tên tài khoản"
      >
        <Input />
      </Form.Item>
      <Form.Item name="birthday" rules={[{ required: true }]} label="Ngày sinh">
        <DatePicker className="w-full" format={"DD/MM/YYYY"} placeholder=""/>
      </Form.Item>
      <Form.Item name="tel" rules={[{ required: true }]} label="Số điện thoại">
        <Input />
      </Form.Item>
      <Form.Item name="mail_address" rules={[{ required: true }]} label="Email">
        <Input />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]} label="Mật khẩu">
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Thêm</Button>
      </Form.Item>
    </Form>
  );
};

export default AddUserAdmin;
