import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload, message } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCategoryQuery } from "../../../services/category";
import {
  useEditProductMutation,
  useGetProductByIdQuery,
  useUploadImageMutation,
} from "../../../services/products";

const EditProductAdmin: React.FC = () => {
  const navigator = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetProductByIdQuery(id);
  const [editProduct] = useEditProductMutation();
  const [uploadImage] = useUploadImageMutation();
  const { data: cate } = useGetCategoryQuery({
    page_size: 1000,
    page: 1,
    sort_by: '{"created_at": "asc"}',
  });

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const onFinish = async (values: any) => {
    console.log(values);
    try {
      const res = await editProduct({
        ...values,
        id: id,
        ingredient: {
          vitaminC: values.ingredient,
          vgranuleC: values.ingredient,
        },
        image:
          "https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_08302_ba4462d00d.jpg",
      });
      if ("data" in res) {
        message.success("Sửa sản phẩm thành công");
        navigator("/admin/product");
      } else {
        message.error("Sửa sản phẩm thất bại");
      }
    } catch (error) {
      message.error("Lỗi");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange = async (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file upload success.`);
      setImageUrl(info.file.response.data.image_path);
      setLoading(false);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      setLoading(false);
    }
  };

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", file);

      const res = await uploadImage(formData);

      if ("data" in res) {
        onSuccess();
      } else {
        onError(new Error("Upload failed"));
      }
    } catch (error) {
      onError(error);
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
          listType="picture-card"
          showUploadList={false}
          customRequest={customRequest}
          onChange={handleChange}
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
        <ReactQuill
          style={{ height: 500 }}
          theme="snow"
          value={form.getFieldValue("how_to_use")}
          onChange={(content) => form.setFieldValue("how_to_use", content)}
        />
      </Form.Item>
      <Form.Item
        name="side_effects"
        rules={[{ required: true }]}
        label="Tác dụng phụ"
      >
        <ReactQuill
          style={{ height: 500 }}
          theme="snow"
          value={form.getFieldValue("side_effects")}
          onChange={(content) => form.setFieldValue("side_effects", content)}
        />
      </Form.Item>
      <Form.Item name="note" rules={[{ required: true }]} label="Chú ý">
        <ReactQuill
          style={{ height: 500 }}
          theme="snow"
          value={form.getFieldValue("note")}
          onChange={(content) => form.setFieldValue("note", content)}
        />
      </Form.Item>
      <Form.Item name="preserve" rules={[{ required: true }]} label="Bảo quản">
        <ReactQuill
          style={{ height: 500 }}
          theme="snow"
          value={form.getFieldValue("preserve")}
          onChange={(content) => form.setFieldValue("preserve", content)}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Sửa</Button>
      </Form.Item>
    </Form>
  );
};

export default EditProductAdmin;
