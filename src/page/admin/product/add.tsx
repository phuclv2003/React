import {
  LoadingOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select, Space, Upload, message } from "antd";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { useGetCategoryQuery } from "../../../services/category";
import { useAddProductMutation } from "../../../services/products";

const AddProductAdmin: React.FC = () => {
  const navigator = useNavigate();
  const [form] = Form.useForm();
  const [addProduct] = useAddProductMutation();
  const { data: cate } = useGetCategoryQuery({
    page_size: 1000,
    page: 1,
    sort_by: '{"created_at": "asc"}',
  });
  const [loading, setLoading] = useState(false);
  const [dataIngredient, setDataIngredient] = useState<
    {
      [x: string]: string;
    }[]
  >([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientContent, setIngredientContent] = useState("");
  const [imageUrl, setImageUrl] = useState<any | null>(null);

  const onFinish = async (values: any) => {
    try {
      const transformedIngredient = dataIngredient.reduce((acc, item) => {
        const key = Object.keys(item)[0];
        const value = item[key];
        return { ...acc, [key]: value };
      }, {});

      const res = await addProduct({
        ...values,
        ingredient: transformedIngredient,
        image: imageUrl,
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

  const handleImageChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    } else if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImageUrl(info.file.response.url);
      setLoading(false);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      setLoading(false);
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleIngredient = () => {
    if (ingredientName && ingredientContent) {
      const newIngredient = { [`${ingredientName}`]: ingredientContent };
      setDataIngredient([...dataIngredient, newIngredient]);
      console.log([...dataIngredient, newIngredient]);
      form.setFieldValue("ingredient", [...dataIngredient, newIngredient]);
      setIngredientName("");
      setIngredientContent("");
    }
  };

  const handleRemoteIngredient = (index: number) => {
    const newDataIngredient = [...dataIngredient];
    newDataIngredient.splice(index, 1);
    setDataIngredient(newDataIngredient);
    form.setFieldValue("ingredient", newDataIngredient);
  };

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
        label="Thành phần"
        name="ingredient"
        rules={[{ required: true, message: "Không được để trống" }]}
      >
        <div style={{ display: "flex", columnGap: 20 }}>
          <Input
            placeholder="Tìm kiếm tên"
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Input
            placeholder="Tìm kiếm tên"
            value={ingredientContent}
            onChange={(e) => setIngredientContent(e.target.value)}
            style={{ width: 200, marginBottom: 10 }}
          />
          <Button
            onClick={() => handleIngredient()}
            ghost
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
          />
        </div>
        <>
          {dataIngredient.map((item, index) => {
            return (
              <div key={index} style={{ display: "flex", columnGap: 20 }}>
                <Input
                  value={Object.keys(item)[0]}
                  disabled
                  style={{ width: 200, marginBottom: 10 }}
                />
                <Input
                  value={item[Object.keys(item)[0]]}
                  disabled
                  style={{ width: 200, marginBottom: 10 }}
                />
                <Button
                  onClick={() => handleRemoteIngredient(index)}
                  danger
                  type="primary"
                  shape="circle"
                  icon={<MinusOutlined />}
                />
              </div>
            );
          })}
        </>
      </Form.Item>
      {/* <Form.Item>
        <Form.Item
          label="Tên thành phần"
          rules={[{ required: true, message: "Không được để trống" }]}
          style={{ width: "100%" }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Hàm lượng(g)"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Không được để trống" }]}
        >
          <Input />
        </Form.Item>
      </Form.Item> */}
      {/* <Form.Item
        name="ingredient"
        rules={[{ required: true }]}
        label="Thành phần"
      >
        <Input />
      </Form.Item> */}
      <Form.Item name="use" rules={[{ required: true }]} label="Công dụng">
        <Input />
      </Form.Item>
      <Form.Item
        name="how_to_use"
        rules={[{ required: true }]}
        label="Cách sử dụng"
        style={{ height: 260, width: "100%" }}
      >
        <ReactQuill
          style={{ height: 200 }}
          theme="snow"
          value={form.getFieldValue("how_to_use")}
          onChange={(content) => form.setFieldValue("how_to_use", content)}
        />
      </Form.Item>
      <Form.Item
        name="side_effects"
        rules={[{ required: true }]}
        label="Tác dụng phụ"
        style={{ height: 260, width: "100%" }}
      >
        <ReactQuill
          style={{ height: 200 }}
          theme="snow"
          value={form.getFieldValue("side_effects")}
          onChange={(content) => form.setFieldValue("side_effects", content)}
        />
      </Form.Item>
      <Form.Item
        name="note"
        rules={[{ required: true }]}
        label="Chú ý"
        style={{ height: 260, width: "100%" }}
      >
        <ReactQuill
          style={{ height: 200 }}
          theme="snow"
          value={form.getFieldValue("note")}
          onChange={(content) => form.setFieldValue("note", content)}
        />
      </Form.Item>
      <Form.Item
        name="preserve"
        rules={[{ required: true }]}
        label="Bảo quản"
        style={{ height: 260, width: "100%" }}
      >
        <ReactQuill
          style={{ height: 200 }}
          theme="snow"
          value={form.getFieldValue("preserve")}
          onChange={(content) => form.setFieldValue("preserve", content)}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Thêm</Button>
      </Form.Item>
    </Form>
  );
};

export default AddProductAdmin;
