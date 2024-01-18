import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewMutation } from "../../../services/new";
import { useUploadImageMutation } from "../../../services/products";

const AddNewAdmin: React.FC = () => {
  const navigator = useNavigate();
  const [form] = Form.useForm();
  const [addNew] = useAddNewMutation();
  const [uploadImage] = useUploadImageMutation();

  const onFinish = async (values: any) => {
    console.log(values);
    try {
      const res = await addNew({
        ...values,
        image:
        imageUrl
      });
      if ("data" in res) {
        message.success("Thêm danh mục thành công");
        navigator("/admin/category");
      } else {
        message.error("Thêm danh mục thất bại");
      }
    } catch (error) {
      message.error("Lỗi");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState<any | null>(null);

  // const handleChange = async (info: UploadChangeParam<UploadFile<any>>) => {
  //   if (info.file.status === "done") {
  //     message.success(`${info.file.name} file upload success.`);
  //     setImageUrl(info.file.response.data.image_path);
  //     setLoading(false);
  //   } else if (info.file.status === "error") {
  //     message.error(`${info.file.name} file upload failed.`);
  //     setLoading(false);
  //   }
  // };

  // const customRequest = async ({ file, onSuccess, onError }: any) => {
  //   try {
  //     setLoading(true);
  //     const formData = new FormData();
  //     formData.append("image", file);

  //     const res = await uploadImage(formData);

  //     if ("data" in res) {
  //       onSuccess();
  //     } else {
  //       onError(new Error("Upload failed"));
  //     }
  //   } catch (error) {
  //     onError(error);
  //   }
  // };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleImageChange = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImageUrl(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  return (
    <Form
      form={form}
      name="Form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <Form.Item name="title" rules={[{ required: true }]} label="Tiêu đề">
        <Input />
      </Form.Item>
      <Form.Item name="content" rules={[{ required: true }]} label="Nội dung">
        <Input />
      </Form.Item>
      <Form.Item name="image" label="Ảnh">
        <Upload
           name="file"
           action="https://api.cloudinary.com/v1_1/dksgvucji/image/upload"
           data={{
             upload_preset: "wh3rdke8",
             cloud_name: "dksgvucji",
           }}
           listType="picture-card"
           maxCount={1}
           showUploadList={false}
           className="ant-upload-wrapper ant-upload-select"
           onChange={handleImageChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </Form.Item>
      <Form.Item name="describe" rules={[{ required: true }]} label="Mô tả">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Thêm</Button>
      </Form.Item>
    </Form>
  );
};

export default AddNewAdmin;
