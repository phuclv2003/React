import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditCategoryMutation,
  useGetByIdCategoryQuery,
  useGetCategoryQuery,
} from "../../../services/category";

const EditCategoryAdmin: React.FC = () => {
  const navigator = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [editCategory] = useEditCategoryMutation();
  const { data: listCategory } = useGetCategoryQuery({
    page_size: 1000,
    page: 1,
    sort_by: '{"created_at": "asc"}',
  });
  const { data: category } = useGetByIdCategoryQuery(id);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    form.setFieldsValue(category);
  }, [category, form]);

  const onFinish = async (values: any) => {
    console.log(values);
    try {
      const res = await editCategory({
        ...values,
        id: id,
        image: imageUrl,
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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleImageChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    } else if (info.file.status === "done") {
      message.success(`${info.file.name} tải file thành công`);
      setImageUrl(info.file.response.url);
      setLoading(false);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} tải file thất bại`);
      setLoading(false);
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
      <Form.Item name="category_name" rules={[{ required: true }]} label="Tên">
        <Input />
      </Form.Item>
      <Form.Item name="parent_category_id" label="Danh mục cha">
        <Select>
          {listCategory?.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.category_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="notes" rules={[{ required: true }]} label="Ghi chú">
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
      <Form.Item>
        <Button htmlType="submit">Sửa</Button>
      </Form.Item>
    </Form>
  );
};

export default EditCategoryAdmin;
