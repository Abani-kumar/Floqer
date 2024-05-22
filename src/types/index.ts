export interface salarydata {
  work_year: number;
  experience_level: string;
  employment_type: string;
  job_title: string;
  salary: number;
  salary_currency: string;
  salary_in_usd: number;
  employee_residence: string;
  remote_ratio: number;
  company_location: string;
  company_size: string;
}

export interface YearlyData {
  totalJobs: number;
  totalSalary: number;
  averageSalary: number;
}

export interface FinalData {
  [year: number]: YearlyData;
}

