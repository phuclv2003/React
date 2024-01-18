import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload, message } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCategoryQuery } from "../../../services/category";
import {
  useAddProductMutation,
  useUploadImageMutation,
} from "../../../services/products";

const AddProductAdmin: React.FC = () => {
  const navigator = useNavigate();
  const [form] = Form.useForm();
  const [addProduct] = useAddProductMutation();
  const [uploadImage] = useUploadImageMutation();
  const { data: cate } = useGetCategoryQuery({
    page_size: 1000,
    page: 1,
    sort_by: '{"created_at": "asc"}',
  });

  const onFinish = async (values: any) => {
    console.log(values);
    try {
      const res = await addProduct({
        ...values,
        ingredient: { "vitaminC": values.ingredient },
        image:
          imageUrl,
      });
      if ("data" in res) {
        message.success("Thêm sản phẩm thành công");
        navigator("/admin/product");
      } else {
        message.error("Thêm sản phẩm thất bại");
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

  const handleImageChange = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImageUrl(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Form
      form={form}
      name="Form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <Form.Item name="name" rules={[{ required: true }]} label="Tên">
        <Input />
      </Form.Item>
      <Form.Item name="unit" rules={[{ required: true }]} label="Đơn vị tính">
        <Input />
      </Form.Item>
      <Form.Item name="price" rules={[{ required: true }]} label="Giá">
        <Input />
      </Form.Item>
      <Form.Item
        name="category_id"
        rules={[{ required: true }]}
        label="Danh mục"
      >
        <Select>
          {cate?.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.category_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="origin" rules={[{ required: true }]} label="Xuất sứ">
        <Input />
      </Form.Item>
      <Form.Item
        name="producer"
        rules={[{ required: true }]}
        label="Nhà sản xuất"
      >
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
      <Form.Item
        name="ingredient"
        rules={[{ required: true }]}
        label="Thành phần"
      >
        <Input />
      </Form.Item>
      <Form.Item name="use" rules={[{ required: true }]} label="Công dụng">
        <Input />
      </Form.Item>
      <Form.Item
        name="how_to_use"
        rules={[{ required: true }]}
        label="Cách sử dụng"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="side_effects"
        rules={[{ required: true }]}
        label="Tác dụng phụ"
      >
        <Input />
      </Form.Item>
      <Form.Item name="note" rules={[{ required: true }]} label="Chú ý">
        <Input />
      </Form.Item>
      <Form.Item name="preserve" rules={[{ required: true }]} label="Bảo quản">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Thêm</Button>
      </Form.Item>
    </Form>
  );
};

export default AddProductAdmin;
