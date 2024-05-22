import { Table, TableColumnsType, Select } from "antd";
import { useState } from "react";
import { salaries } from "../data/salaries";
import { salarydata } from "../types/index";

type YearDetailsType = {
  [job_title: string]: number;
};

interface DataType {
  key: React.Key;
  jobtitle: string;
  numberofjobs: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Job Title',
    dataIndex: 'jobtitle',
  },
  {
    title: 'Number Of Jobs',
    dataIndex: 'numberofjobs',
  },
];

const sortingOptions = [
  { label: "Job Title (A-Z)", value: "jobtitle-asc" },
  { label: "Job Title (Z-A)", value: "jobtitle-desc" },
  { label: "Number Of Jobs (Ascending)", value: "numberofjobs-asc" },
  { label: "Number Of Jobs (Descending)", value: "numberofjobs-desc" },
];

const YearDetails = ({ year }: { year: number }) => {
  const [sortOrder, setSortOrder] = useState("numberofjobs-asc");

  const NoOfJob: salarydata[] = salaries.filter(
    (data) => data.work_year === year
  );

  const yeardetails: YearDetailsType = NoOfJob.reduce(
    (acc: YearDetailsType, data) => {
      if (acc.hasOwnProperty(data.job_title)) {
        acc[data.job_title]++;
        return acc;
      }
      return { ...acc, [data.job_title]: 1 };
    },
    {}
  );

  const finaldata = Object.keys(yeardetails).map((job_title) => {
    return {
      key: crypto.randomUUID(),
      jobtitle: job_title,
      numberofjobs: yeardetails[job_title],
    };
  });

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  const sortedData = [...finaldata].sort((a, b) => {
    switch (sortOrder) {
      case "jobtitle-asc":
        return a.jobtitle.localeCompare(b.jobtitle);
      case "jobtitle-desc":
        return b.jobtitle.localeCompare(a.jobtitle);
      case "numberofjobs-asc":
        return a.numberofjobs - b.numberofjobs;
      case "numberofjobs-desc":
        return b.numberofjobs - a.numberofjobs;
      default:
        return 0;
    }
  });

  return (
    <>
      <Select
        defaultValue={sortOrder}
        options={sortingOptions}
        onChange={handleSortChange}
        style={{ marginBottom: 16 }}
      />
      <Table columns={columns} dataSource={sortedData} size="small" />
    </>
  );
};

export default YearDetails;

