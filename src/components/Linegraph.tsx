import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  LineElement,
  CategoryScale,
  PointElement,
  Legend,
  Tooltip,
  Title,
} from "chart.js";
import { YearlyData } from "../types";

interface YearlyDataEntry extends YearlyData {
  year: number;
}

ChartJS.register(
  LinearScale,
  LineElement,
  CategoryScale,
  PointElement,
  Legend,
  Tooltip,
  Title
);

const averageSalaryOption = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Average salary vs Year",
    },
  },
};

const totalJobsoptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Number Of Jobs vs Year",
    },
  },
};

const Linegraph = ({ finaldata }: { finaldata: YearlyDataEntry[] }) => {
  const avgsalarydata = {
    labels: finaldata.map((data) => data.year),
    datasets: [
      {
        label: "Average Salary",
        data: finaldata.map((data) => data.averageSalary),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const totaljobsdata = {
    labels: finaldata.map((data) => data.year),
    datasets: [
      {
        label: "Number Of Jobs",
        data: finaldata.map((data) => data.totalJobs),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  
  return (
    <div>
      <div className="flex justify-between max-sm:flex-col">
        <div className="w-full max-sm:w-full">
          <Line options={averageSalaryOption} data={avgsalarydata} />
        </div>
        <div className=" w-full max-sm:w-full">
          <Line options={totalJobsoptions} data={totaljobsdata} />
        </div>
      </div>
    </div>
  );
};

export default Linegraph;
