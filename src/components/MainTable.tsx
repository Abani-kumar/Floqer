import React, { useState, useEffect, useCallback } from "react";
import { Table, Select } from "antd";
import YearDetails from "./YearlyDetails";
import { TableColumnsType } from "antd";
import type { SelectProps } from "antd/es/select";
import { YearlyData } from "../types";

interface YearlyDataEntry extends YearlyData {
  year: number;
}

interface DataItem extends YearlyDataEntry {
  key: string;
  expandable: boolean;
  yearDetails: React.ReactNode;
}

const MainTable = ({ finaldata }: { finaldata: YearlyDataEntry[] }) => {
  const [sortedData, setSortedData] = useState<DataItem[]>([]);
  const [sortOption, setSortOption] = useState<string>("year-asc");

  const handleSortChange = (value: string) => {
    setSortOption(value);
    applySorting(value);
  };

  const applySorting = useCallback(
    (sortOption: string) => {
      let sortedArray = [...finaldata];

      switch (sortOption) {
        case "year-asc":
          sortedArray.sort((a, b) => a.year - b.year);
          break;
        case "year-desc":
          sortedArray.sort((a, b) => b.year - a.year);
          break;
        case "avgSalary-asc":
          sortedArray.sort((a, b) => a.averageSalary - b.averageSalary);
          break;
        case "avgSalary-desc":
          sortedArray.sort((a, b) => b.averageSalary - a.averageSalary);
          break;
        case "totalJobs-asc":
          sortedArray.sort((a, b) => a.totalJobs - b.totalJobs);
          break;
        case "totalJobs-desc":
          sortedArray.sort((a, b) => b.totalJobs - a.totalJobs);
          break;
        default:
          break;
      }

      const sortedItems: DataItem[] = sortedArray.map((d) => ({
        key: `${d.year}`,
        ...d,
        expandable: true,
        yearDetails: <YearDetails year={d.year} />,
      }));

      setSortedData(sortedItems);
    },
    [finaldata]
  );

  useEffect(() => {
    applySorting(sortOption);
  }, [applySorting, sortOption, finaldata]);

  const columns: TableColumnsType<DataItem> = [
    {
      title: "Year",
      dataIndex: "year",
    },
    {
      title: "Total Jobs",
      dataIndex: "totalJobs",
    },
    {
      title: "Average Salary",
      dataIndex: "averageSalary",
    },
  ];

  const selectOptions: SelectProps["options"] = [
    { label: "Year Ascending", value: "year-asc" },
    { label: "Year Descending", value: "year-desc" },
    { label: "Average Salary Ascending", value: "avgSalary-asc" },
    { label: "Average Salary Descending", value: "avgSalary-desc" },
    { label: "Total Jobs Ascending", value: "totalJobs-asc" },
    { label: "Total Jobs Descending", value: "totalJobs-desc" },
  ];

  return (
    <div>
      <div className="flex gap-4 items-center ml-8">
        <span>Sort :</span>
        <Select
        defaultValue="year-asc"
        style={{ marginBottom: 16 }}
        onChange={handleSortChange}
        options={selectOptions}
        className="mt-2"
      />
      </div>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => record.yearDetails,
          rowExpandable: (record) => record.expandable,
        }}
        dataSource={sortedData}
      />
    </div>
  );
};

export default MainTable;
