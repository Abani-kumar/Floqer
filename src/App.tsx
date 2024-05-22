import React, { useState } from "react";
import "./App.css";
import MainTable from "./components/MainTable";
import Linegraph from "./components/Linegraph";
import { salaries } from "./data/salaries";
import { YearlyData, FinalData } from "./types";
import AIchatRoom from "./components/AIchatRoom";
import { Drawer } from "antd";

interface YearlyDataEntry extends YearlyData {
  year: number;
}

function App() {
  
  const [open, setOpen] = useState<boolean>(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const yearlyDataCalculation = (): YearlyDataEntry[] => {
    const yearlyData: FinalData = {};

    salaries.forEach((salary) => {
      const { work_year, salary_in_usd } = salary;
      const year = work_year;

      if (!yearlyData[year]) {
        yearlyData[year] = {
          totalJobs: 0,
          totalSalary: 0,
          averageSalary: 0,
        };
      }

      yearlyData[year].totalJobs += 1;
      yearlyData[year].totalSalary += salary_in_usd;
      yearlyData[year].averageSalary = Math.floor(
        yearlyData[year].totalSalary / yearlyData[year].totalJobs
      );
    });

    return Object.keys(yearlyData).map((yearStr) => {
      const year = parseInt(yearStr);
      return {
        year,
        ...yearlyData[year],
      };
    });
  };

  const finaldata = yearlyDataCalculation();
  
  return (
    <div className=" w-screen h-screen">
      <div className="w-[96%] mx-auto">
        <button className="mx-auto mt-3 bg-slate-800 text-white rounded-sm p-1" onClick={showDrawer}>Know more from ai chatbot</button>
        <MainTable finaldata={finaldata} />
        <Linegraph finaldata={finaldata} />
      </div>
      <Drawer title="Welcome to chat assitant" onClose={onClose} open={open} size="large">
        <AIchatRoom/>
      </Drawer>
    </div>
  );
}

export default App;
