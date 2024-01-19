import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useAddNewMutation } from "../../../services/new";

const AddNewAdmin: React.FC = () => {
  const navigator = useNavigate();
  const [form] = Form.useForm();
  const [addNew] = useAddNewMutation();

  const onFinish = async (values: any) => {
    try {
      const res = await addNew({
        ...values,
        image: imageUrl,
      });
      if ("data" in res) {
        message.success("Thêm tin tức thành công");
        navigator("/admin/new");
      } else {
        message.error("Thêm tin tức thất bại");
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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleImageChange = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} tải file thành công`);
      setImageUrl(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} tải file thất bại`);
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
      <Form.Item
        name="describe"
        rules={[{ required: true }]}
        style={{ height: 300 }}
        label="Mô tả"
      >
        <ReactQuill
          style={{ height: 200, width: "100%" }}
          theme="snow"
          value={form.getFieldValue("describe")}
          onChange={(content) => form.setFieldValue("describe", content)}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Thêm</Button>
      </Form.Item>
    </Form>
  );
};

export default AddNewAdmin;
