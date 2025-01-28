import { Line, Bar, Radar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadarController,
  ArcElement,
  RadialLinearScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadarController,
  ArcElement,
  RadialLinearScale
);

interface ChartProps {
  data: any;
  type: "line" | "bar" | "horizontal" | "pie";
  options?: any;
}

const Chart = ({ data, type, options }: ChartProps) => {
  switch (type) {
    case "line":
      return <Line data={data} options={options} />;
    case "bar":
      return <Bar data={data} options={options} />;
    case "horizontal":
      return <Radar data={data} options={options} />;
    case "pie":
      return <Pie data={data} options={options} />;
    default:
      return null;
  }
};

export default Chart;
