import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Col, Row, Statistic, Card } from "antd";
import { Bar, Line, Pie } from "@ant-design/charts";

const barData: any[] = [
  { type: "tỉa lông", value: 10, color: "blue" },
  { type: "tắm", value: 35, color: "green" },
  { type: "nhuộm lông", value: 30, color: "red" },
  { type: "thuê phòng", value: 15, color: "pink" },
];
const pieData = [
  { type: "Thực phẩm chức năng", value: 10 },
  { type: "Dụng cụ y tế", value: 20 },
  { type: "Thuốc", value: 30 },
];

const lineData = [
  { type: "Tháng 1", value: 1000 },
  { type: "Tháng 2", value: 2020 },
  { type: "Tháng 3", value: 303 },
  { type: "Tháng 4", value: 3022 },
  { type: "Tháng 5", value: 4000 },
  { type: "Tháng 6", value: 7000 },
  { type: "Tháng 7", value: 2000 },
  { type: "Tháng 8", value: 3000 },
  { type: "Tháng 9", value: 5000 },
  { type: "Tháng 10", value: 4000 },
  { type: "Tháng 11", value: 6000 },
  { type: "Tháng 12", value: 1200 },
];

const DashBoard = () => {
  const pieConfig = {
    data: pieData,
    angleField: "value",
    colorField: "type",
  };
  const barConfig: any = {
    data: barData,
    xField: "value",
    yField: "type",
    seriesField: "type",
    color: (datum: any, defaultColor: string) =>
      barData.find((item) => item.type === datum.type)?.color || defaultColor,
  };
  const lineConfig = {
    data: lineData,
    xField: "type",
    yField: "value",
    point: {
      size: 4,
      style: () => {
        return {
          fill: "#aaa", // Specify the fill color for the points
          r: 4, // Specify the radius of the circle (optional)
        };
      },
    },
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="col-2">
        <div>
          <Row gutter={36}>
            <Col span={24}>
              <Card bordered={false} className="bg-[#f5f5f5]">
                <Statistic
                  title="Doanh số theo các tháng"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div className="text-center bg-[#f5f5f5]">
        <h2 className="text-2xl my-2">Bảng doanh số theo các thàng</h2>
        <Line {...lineConfig} />
      </div>
      <div className="flex justify-between items-center">
        <div className="w-[48%] bg-[#f5f5f5]">
          <h2 className="text-center my-2 text-xl">Sản phẩm bán chạy </h2>
          <Bar {...barConfig} />
        </div>
        <div className="w-[48%] bg-[#f5f5f5]">
          <h2 className="text-center my-2 text-xl">Danh mục</h2>
          <Pie {...pieConfig} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
