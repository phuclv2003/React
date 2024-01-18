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

  const [image, setImage] = useState<string | undefined>();

  const [fileList, setFileList] = useState<UploadFile[]>([
  ]);
  useEffect(() => {
    if (dataNew) {
      form.getFieldsValue(dataNew);
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: dataNew.image,
        },
      ]);
    }
  }, [dataNew, form]);

  const onFinish = async (values: any) => {
    console.log(values);
    try {
      const res = await addCategory({
        ...values,
        image: image,
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

 
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleImageChange = ({ fileList: newFileList }: any) => {
    if (newFileList[0].response) {
      setImage(newFileList[0].response.secure_url);
    }
    setFileList(newFileList);
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
          showUploadList={true}
          className="ant-upload-wrapper ant-upload-select"
          onChange={handleImageChange}
          fileList={fileList}
        >
          {uploadButton}
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
