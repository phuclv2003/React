import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddCategoryMutation } from "../../../services/category";
import { useGetNewsByIdQuery } from "../../../services/new";
import { useUploadImageMutation } from "../../../services/products";

const EditNewAdmin: React.FC = () => {
  const navigator = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [addCategory] = useAddCategoryMutation();
  const [uploadImage] = useUploadImageMutation();
  const { data: dataNew } = useGetNewsByIdQuery(id);

  useEffect(() => {
    form.getFieldsValue(dataNew);
  }, [dataNew, form]);

  const onFinish = async (values: any) => {
    console.log(values);
    try {
      const res = await addCategory({
        ...values,
        image:
          "https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_08302_ba4462d00d.jpg",
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
      <Form.Item name="title" rules={[{ required: true }]} label="Tiêu đề">
        <Input />
      </Form.Item>
      <Form.Item name="content" rules={[{ required: true }]} label="Nội dung">
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
      <Form.Item name="describe" rules={[{ required: true }]} label="Mô tả">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Thêm</Button>
      </Form.Item>
    </Form>
  );
};

export default EditNewAdmin;
