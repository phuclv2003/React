import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { useEditNewMutation, useGetNewsByIdQuery } from "../../../services/new";

const EditNewAdmin: React.FC = () => {
  const navigator = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [editNew] = useEditNewMutation();
  const { data: dataNew } = useGetNewsByIdQuery(id);
  
  const [imageUrl, setImageUrl] = useState<any | null>(null);

  useEffect(() => {
    if (dataNew) {
      form.setFieldsValue(dataNew);
    }
  }, [dataNew, form]);

  const onFinish = async (values: any) => {
    try {
      const res = await editNew({
        ...values,
        id: id,
        image: imageUrl,
      });
      if ("data" in res) {
        message.success("Sửa tin tức thành công");
        navigator("/admin/new");
      } else {
        message.error("Sửa tin tức thất bại");
      }
    } catch (error) {
      message.error("Lỗi");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleImageChange = async (
    info: UploadChangeParam<UploadFile<any>>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    } else if (info.file.status === "done") {
      message.success(`${info.file.name} file upload success.`);
      setImageUrl(info.file.response.data.image_path);
      setLoading(false);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
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
        style={{ height: 300 }}
        rules={[{ required: true }]}
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
        <Button htmlType="submit">Sửa</Button>
      </Form.Item>
    </Form>
  );
};

export default EditNewAdmin;
