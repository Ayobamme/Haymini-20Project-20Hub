import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Calculator,
  Download,
  FileText,
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
  Plus,
  Search,
  Filter,
  Receipt,
  Building,
  CreditCard,
  Percent,
  Clock,
  CheckCircle,
  AlertTriangle,
  Edit,
  Save,
  X,
  FileSpreadsheet,
  Upload,
  Mail,
  FolderOpen,
  Cloud,
  Calendar as CalendarIcon,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
  email: string;
  contractRef: string;
  startDate: string;
  country: string;
  state: string;
  department: string;
  position: string;
  payFrequency: "monthly" | "weekly" | "daily" | "hourly";
  yearlyBaseSalary: number;
  hourlyRate: number;
  weeklyRate: number;
  dailyRate: number;
  monthlyRate: number;
  payrollTaxRate: number;
  benefitsRate: number;
  pensionContributionRate: number;
  vacationAccrualRate: number;
  annualVacationEntitlement: number;
  allowances: {
    transport: number;
    housing: number;
    meal: number;
    medical: number;
    other: number;
  };
  deductions: {
    loan: number;
    advance: number;
    other: number;
  };
}

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  payPeriod: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  regularHours: number;
  overtimeHours: number;
  vacationHours: number;
  sickHours: number;
  regularPay: number;
  overtimePay: number;
  bonuses: number;
  allowances: number;
  grossPay: number;
  payrollTax: number;
  benefits: number;
  pensionContribution: number;
  otherDeductions: number;
  totalDeductions: number;
  netPay: number;
  status: "draft" | "approved" | "paid" | "voided";
  generatedDate: string;
  approvedBy?: string;
  paidDate?: string;
}

interface PayrollSummary {
  totalEmployees: number;
  totalGrossPay: number;
  totalDeductions: number;
  totalNetPay: number;
  totalTaxes: number;
  averagePay: number;
  payrollCost: number;
}

const Payroll = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "EMP-001",
      name: "John Doe",
      email: "john.doe@company.com",
      contractRef: "CNT-2024-001",
      startDate: "2024-01-15",
      country: "Nigeria",
      state: "Lagos",
      department: "Engineering",
      position: "Senior Developer",
      payFrequency: "monthly",
      yearlyBaseSalary: 12000000,
      hourlyRate: 5000,
      weeklyRate: 200000,
      dailyRate: 40000,
      monthlyRate: 1000000,
      payrollTaxRate: 24,
      benefitsRate: 8,
      pensionContributionRate: 15,
      vacationAccrualRate: 8.33,
      annualVacationEntitlement: 25,
      allowances: {
        transport: 50000,
        housing: 200000,
        meal: 30000,
        medical: 25000,
        other: 0,
      },
      deductions: {
        loan: 0,
        advance: 0,
        other: 0,
      },
    },
    {
      id: "EMP-002",
      name: "Sarah Wilson",
      email: "sarah.wilson@company.com",
      contractRef: "CNT-2024-002",
      startDate: "2024-02-01",
      country: "Nigeria",
      state: "Lagos",
      department: "Design",
      position: "UI/UX Designer",
      payFrequency: "monthly",
      yearlyBaseSalary: 9600000,
      hourlyRate: 4000,
      weeklyRate: 160000,
      dailyRate: 32000,
      monthlyRate: 800000,
      payrollTaxRate: 21,
      benefitsRate: 8,
      pensionContributionRate: 15,
      vacationAccrualRate: 7.69,
      annualVacationEntitlement: 20,
      allowances: {
        transport: 40000,
        housing: 150000,
        meal: 25000,
        medical: 20000,
        other: 0,
      },
      deductions: {
        loan: 50000,
        advance: 0,
        other: 0,
      },
    },
  ]);

  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([
    {
      id: "PR-001",
      employeeId: "EMP-001",
      employeeName: "John Doe",
      payPeriod: "January 2024",
      payPeriodStart: "2024-01-01",
      payPeriodEnd: "2024-01-31",
      regularHours: 160,
      overtimeHours: 8,
      vacationHours: 8,
      sickHours: 0,
      regularPay: 1000000,
      overtimePay: 60000,
      bonuses: 100000,
      allowances: 305000,
      grossPay: 1465000,
      payrollTax: 351600,
      benefits: 117200,
      pensionContribution: 219750,
      otherDeductions: 15000,
      totalDeductions: 703550,
      netPay: 761450,
      status: "paid",
      generatedDate: "2024-01-25",
      approvedBy: "Admin User",
      paidDate: "2024-01-31",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);
  const [showPayrollDialog, setShowPayrollDialog] = useState(false);
  const [showPayslipDialog, setShowPayslipDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showBulkReportDialog, setShowBulkReportDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // New state for bulk report generation
  const [reportPeriod, setReportPeriod] = useState<
    "monthly" | "3month" | "6month" | "yearly"
  >("monthly");
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [reportType, setReportType] = useState<"individual" | "all">("all");

  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
    name: "",
    email: "",
    contractRef: "",
    startDate: "",
    country: "Nigeria",
    state: "",
    department: "",
    position: "",
    payFrequency: "monthly",
    yearlyBaseSalary: 0,
    hourlyRate: 0,
    weeklyRate: 0,
    dailyRate: 0,
    monthlyRate: 0,
    payrollTaxRate: 21,
    benefitsRate: 8,
    pensionContributionRate: 15,
    vacationAccrualRate: 8.33,
    annualVacationEntitlement: 20,
    allowances: {
      transport: 0,
      housing: 0,
      meal: 0,
      medical: 0,
      other: 0,
    },
    deductions: {
      loan: 0,
      advance: 0,
      other: 0,
    },
  });

  const calculateRatesFromYearly = (yearly: number, frequency: string) => {
    return {
      hourlyRate: Math.round(yearly / (52 * 40)), // 52 weeks, 40 hours
      weeklyRate: Math.round(yearly / 52),
      dailyRate: Math.round(yearly / (52 * 5)), // 5 working days
      monthlyRate: Math.round(yearly / 12),
    };
  };

  const saveEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.position) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const rates = calculateRatesFromYearly(
      newEmployee.yearlyBaseSalary || 0,
      newEmployee.payFrequency || "monthly",
    );

    const employee: Employee = {
      id: `EMP-${Date.now().toString().slice(-3)}`,
      ...newEmployee,
      ...rates,
    } as Employee;

    if (isEditMode && editingEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployee.id ? employee : emp,
        ),
      );
      toast({
        title: "Employee Updated",
        description: `${employee.name} has been updated successfully.`,
      });
    } else {
      setEmployees([...employees, employee]);
      toast({
        title: "Employee Added",
        description: `${employee.name} has been added to the payroll system.`,
      });
    }

    setShowEmployeeDialog(false);
    setIsEditMode(false);
    setEditingEmployee(null);
    setNewEmployee({
      name: "",
      email: "",
      contractRef: "",
      startDate: "",
      country: "Nigeria",
      state: "",
      department: "",
      position: "",
      payFrequency: "monthly",
      yearlyBaseSalary: 0,
      hourlyRate: 0,
      weeklyRate: 0,
      dailyRate: 0,
      monthlyRate: 0,
      payrollTaxRate: 21,
      benefitsRate: 8,
      pensionContributionRate: 15,
      vacationAccrualRate: 8.33,
      annualVacationEntitlement: 20,
      allowances: {
        transport: 0,
        housing: 0,
        meal: 0,
        medical: 0,
        other: 0,
      },
      deductions: {
        loan: 0,
        advance: 0,
        other: 0,
      },
    });
  };

  const editEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setNewEmployee(employee);
    setIsEditMode(true);
    setShowEmployeeDialog(true);
  };

  const generatePayslip = (employeeId: string) => {
    const employee = employees.find((emp) => emp.id === employeeId);
    if (!employee) return;

    let basePay = 0;
    let hours = 0;

    switch (employee.payFrequency) {
      case "hourly":
        hours = 160; // Standard month
        basePay = hours * employee.hourlyRate;
        break;
      case "daily":
        const workDays = 22; // Standard working days per month
        basePay = workDays * employee.dailyRate;
        break;
      case "weekly":
        const weeks = 4.33; // Average weeks per month
        basePay = weeks * employee.weeklyRate;
        break;
      case "monthly":
      default:
        basePay = employee.monthlyRate;
        break;
    }

    const overtimeHours = Math.floor(Math.random() * 20);
    const overtimePay = overtimeHours * employee.hourlyRate * 1.5;
    const bonuses = Math.floor(Math.random() * 100000);
    const totalAllowances = Object.values(employee.allowances).reduce(
      (sum, allowance) => sum + allowance,
      0,
    );

    const grossPay = basePay + overtimePay + bonuses + totalAllowances;
    const payrollTax = grossPay * (employee.payrollTaxRate / 100);
    const benefits = grossPay * (employee.benefitsRate / 100);
    const pensionContribution =
      grossPay * (employee.pensionContributionRate / 100);
    const totalDeductions =
      payrollTax +
      benefits +
      pensionContribution +
      Object.values(employee.deductions).reduce(
        (sum, deduction) => sum + deduction,
        0,
      );
    const netPay = grossPay - totalDeductions;

    const newPayrollRecord: PayrollRecord = {
      id: `PR-${Date.now()}`,
      employeeId: employee.id,
      employeeName: employee.name,
      payPeriod: new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      payPeriodStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1,
      )
        .toISOString()
        .split("T")[0],
      payPeriodEnd: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0,
      )
        .toISOString()
        .split("T")[0],
      regularHours: hours,
      overtimeHours,
      vacationHours: 0,
      sickHours: 0,
      regularPay: basePay,
      overtimePay,
      bonuses,
      allowances: totalAllowances,
      grossPay,
      payrollTax,
      benefits,
      pensionContribution,
      otherDeductions: Object.values(employee.deductions).reduce(
        (sum, deduction) => sum + deduction,
        0,
      ),
      totalDeductions,
      netPay,
      status: "draft",
      generatedDate: new Date().toISOString().split("T")[0],
    };

    setPayrollRecords([...payrollRecords, newPayrollRecord]);

    toast({
      title: "Payslip Generated",
      description: `Payslip generated for ${employee.name}`,
    });
  };

  const generateBulkReports = () => {
    const employeesToProcess =
      reportType === "all"
        ? employees
        : employees.filter((emp) => selectedEmployees.includes(emp.id));

    if (employeesToProcess.length === 0) {
      toast({
        title: "No Employees Selected",
        description: "Please select employees for report generation.",
        variant: "destructive",
      });
      return;
    }

    const periodMultiplier = {
      monthly: 1,
      "3month": 3,
      "6month": 6,
      yearly: 12,
    }[reportPeriod];

    employeesToProcess.forEach((employee) => {
      // Generate multiple records for the selected period
      for (let i = 0; i < periodMultiplier; i++) {
        generatePayslip(employee.id);
      }
    });

    toast({
      title: "Bulk Reports Generated",
      description: `Generated ${reportPeriod} reports for ${employeesToProcess.length} employees`,
    });

    setShowBulkReportDialog(false);
    setSelectedEmployees([]);
  };

  const approvePayroll = (recordId: string) => {
    setPayrollRecords((records) =>
      records.map((record) =>
        record.id === recordId
          ? { ...record, status: "approved", approvedBy: "Admin User" }
          : record,
      ),
    );

    toast({
      title: "Payroll Approved",
      description: "Payroll record has been approved",
    });
  };

  const processPayment = (recordId: string) => {
    setPayrollRecords((records) =>
      records.map((record) =>
        record.id === recordId
          ? {
              ...record,
              status: "paid",
              paidDate: new Date().toISOString().split("T")[0],
            }
          : record,
      ),
    );

    toast({
      title: "Payment Processed",
      description: "Payment has been processed successfully",
    });
  };

  const exportToExcel = () => {
    toast({
      title: "Exporting to Excel",
      description: "Payroll data is being exported to Excel format...",
    });
  };

  const exportToGoogleSheets = () => {
    toast({
      title: "Exporting to Google Sheets",
      description: "Payroll data is being exported to Google Sheets...",
    });
  };

  const archiveToGoogleDrive = () => {
    toast({
      title: "Archiving to Google Drive",
      description: "Payroll documents are being archived to Google Drive...",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "approved":
        return "bg-blue-100 text-blue-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "voided":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <FileText className="h-4 w-4 text-gray-500" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "paid":
        return <CreditCard className="h-4 w-4 text-green-500" />;
      case "voided":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredRecords = payrollRecords.filter((record) => {
    const matchesSearch = record.employeeName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const employee = employees.find((emp) => emp.id === record.employeeId);
    const matchesDepartment =
      departmentFilter === "all" || employee?.department === departmentFilter;
    const matchesStatus =
      statusFilter === "all" || record.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const payrollSummary: PayrollSummary = {
    totalEmployees: employees.length,
    totalGrossPay: payrollRecords.reduce(
      (sum, record) => sum + record.grossPay,
      0,
    ),
    totalDeductions: payrollRecords.reduce(
      (sum, record) => sum + record.totalDeductions,
      0,
    ),
    totalNetPay: payrollRecords.reduce((sum, record) => sum + record.netPay, 0),
    totalTaxes: payrollRecords.reduce(
      (sum, record) => sum + record.payrollTax,
      0,
    ),
    averagePay:
      payrollRecords.length > 0
        ? payrollRecords.reduce((sum, record) => sum + record.netPay, 0) /
          payrollRecords.length
        : 0,
    payrollCost: payrollRecords.reduce(
      (sum, record) => sum + record.grossPay + record.grossPay * 0.15,
      0,
    ),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Payroll Management
          </h1>
          <p className="text-muted-foreground">
            Comprehensive payroll system with multi-period reporting and Google
            Drive integration
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog
            open={showBulkReportDialog}
            onOpenChange={setShowBulkReportDialog}
          >
            <DialogTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Bulk Reports
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Generate Payroll Reports</DialogTitle>
                <DialogDescription>
                  Generate payroll slips for selected employees and time periods
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Report Period</Label>
                    <Select
                      value={reportPeriod}
                      onValueChange={(value) => setReportPeriod(value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="3month">3 Months</SelectItem>
                        <SelectItem value="6month">6 Months</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Report Type</Label>
                    <Select
                      value={reportType}
                      onValueChange={(value) => setReportType(value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Employees</SelectItem>
                        <SelectItem value="individual">
                          Selected Employees
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {reportType === "individual" && (
                  <div>
                    <Label>Select Employees</Label>
                    <div className="border rounded-lg p-4 max-h-64 overflow-y-auto">
                      <div className="space-y-3">
                        {employees.map((employee) => (
                          <div
                            key={employee.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={employee.id}
                              checked={selectedEmployees.includes(employee.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedEmployees([
                                    ...selectedEmployees,
                                    employee.id,
                                  ]);
                                } else {
                                  setSelectedEmployees(
                                    selectedEmployees.filter(
                                      (id) => id !== employee.id,
                                    ),
                                  );
                                }
                              }}
                            />
                            <Label
                              htmlFor={employee.id}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {employee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm">
                                  {employee.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {employee.department}
                                </div>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">Report Summary</div>
                    <div className="text-sm text-muted-foreground">
                      {reportType === "all"
                        ? employees.length
                        : selectedEmployees.length}{" "}
                      employees • {reportPeriod} period
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {reportType === "all"
                        ? employees.length
                        : selectedEmployees.length}{" "}
                      reports
                    </div>
                    <div className="text-sm text-muted-foreground">
                      will be generated
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowBulkReportDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={generateBulkReports}>
                  <Receipt className="h-4 w-4 mr-2" />
                  Generate Reports
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export & Archive
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Export & Archive Payroll Data</DialogTitle>
                <DialogDescription>
                  Choose your preferred export format and archive destination
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Button onClick={exportToExcel} className="justify-start">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export to Excel
                </Button>
                <Button
                  onClick={exportToGoogleSheets}
                  className="justify-start"
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export to Google Sheets
                </Button>
                <Separator />
                <Button
                  onClick={archiveToGoogleDrive}
                  className="justify-start"
                  variant="outline"
                >
                  <Cloud className="h-4 w-4 mr-2" />
                  Archive to Google Drive
                </Button>
                <Button variant="outline" className="justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload to Cloud Storage
                </Button>
                <Button variant="outline" className="justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Reports
                </Button>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowExportDialog(false)}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showPayrollDialog} onOpenChange={setShowPayrollDialog}>
            <DialogTrigger asChild>
              <Button>
                <Calculator className="h-4 w-4 mr-2" />
                Run Payroll
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Run Payroll Process</DialogTitle>
                <DialogDescription>
                  Generate payslips for all employees for the current pay period
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>Pay Period</Label>
                  <Select defaultValue="current">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Month</SelectItem>
                      <SelectItem value="previous">Previous Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Department</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowPayrollDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    employees.forEach((emp) => generatePayslip(emp.id));
                    setShowPayrollDialog(false);
                  }}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Generate Payroll
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">
              {payrollSummary.totalEmployees}
            </div>
            <div className="text-xs text-muted-foreground">Employees</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">
              ₦{(payrollSummary.totalGrossPay / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-muted-foreground">Gross Pay</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Percent className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">
              ₦{(payrollSummary.totalDeductions / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-muted-foreground">Deductions</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <CreditCard className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">
              ₦{(payrollSummary.totalNetPay / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-muted-foreground">Net Pay</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Receipt className="h-8 w-8 mx-auto mb-2 text-red-500" />
            <div className="text-2xl font-bold">
              ₦{(payrollSummary.totalTaxes / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-muted-foreground">Total Taxes</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-cyan-500" />
            <div className="text-2xl font-bold">
              ₦{(payrollSummary.payrollCost / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-muted-foreground">Total Cost</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payroll" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="payroll">Payroll Records</TabsTrigger>
          <TabsTrigger value="employees">Employee Management</TabsTrigger>
          <TabsTrigger value="payslips">Generate Payslips</TabsTrigger>
          <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="payroll" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select
                  value={departmentFilter}
                  onValueChange={setDepartmentFilter}
                >
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="voided">Voided</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Payroll Records Table */}
          <Card>
            <CardHeader>
              <CardTitle>Payroll Records</CardTitle>
              <CardDescription>
                Current payroll records with attendance-based calculations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Pay Period</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Gross Pay</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Pay</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {record.employeeName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {record.employeeName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {record.employeeId}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{record.payPeriod}</div>
                          <div className="text-muted-foreground">
                            {new Date(
                              record.payPeriodStart,
                            ).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(record.payPeriodEnd).toLocaleDateString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Regular: {record.regularHours}h</div>
                          <div className="text-muted-foreground">
                            OT: {record.overtimeHours}h
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-green-600">
                          ₦{record.grossPay.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-red-600">
                          ₦{record.totalDeductions.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-blue-600">
                          ₦{record.netPay.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(record.status)}
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {record.status === "draft" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => approvePayroll(record.id)}
                            >
                              Approve
                            </Button>
                          )}
                          {record.status === "approved" && (
                            <Button
                              size="sm"
                              onClick={() => processPayment(record.id)}
                            >
                              Pay
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedEmployee(
                                employees.find(
                                  (emp) => emp.id === record.employeeId,
                                ) || null,
                              );
                              setShowPayslipDialog(true);
                            }}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Employee Management</CardTitle>
                  <CardDescription>
                    Manage employee information, pay structures, and benefit
                    configurations
                  </CardDescription>
                </div>
                <Dialog
                  open={showEmployeeDialog}
                  onOpenChange={setShowEmployeeDialog}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Employee
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {isEditMode ? "Edit Employee" : "Add New Employee"}
                      </DialogTitle>
                      <DialogDescription>
                        Configure employee details, pay structure, and benefit
                        settings
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      {/* Basic Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Basic Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              value={newEmployee.name}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  name: e.target.value,
                                })
                              }
                              placeholder="Enter full name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={newEmployee.email}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  email: e.target.value,
                                })
                              }
                              placeholder="Enter email address"
                            />
                          </div>
                          <div>
                            <Label htmlFor="contractRef">
                              Contract Reference
                            </Label>
                            <Input
                              id="contractRef"
                              value={newEmployee.contractRef}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  contractRef: e.target.value,
                                })
                              }
                              placeholder="Contract reference"
                            />
                          </div>
                          <div>
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input
                              id="startDate"
                              type="date"
                              value={newEmployee.startDate}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  startDate: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="department">Department *</Label>
                            <Select
                              value={newEmployee.department}
                              onValueChange={(value) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  department: value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select department" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Engineering">
                                  Engineering
                                </SelectItem>
                                <SelectItem value="Design">Design</SelectItem>
                                <SelectItem value="Marketing">
                                  Marketing
                                </SelectItem>
                                <SelectItem value="Sales">Sales</SelectItem>
                                <SelectItem value="HR">
                                  Human Resources
                                </SelectItem>
                                <SelectItem value="Finance">Finance</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="position">Position *</Label>
                            <Input
                              id="position"
                              value={newEmployee.position}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  position: e.target.value,
                                })
                              }
                              placeholder="Job position"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Pay Structure */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Pay Structure</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="payFrequency">Pay Frequency</Label>
                            <Select
                              value={newEmployee.payFrequency}
                              onValueChange={(value) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  payFrequency: value as any,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select pay frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hourly">Hourly</SelectItem>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="yearlyBaseSalary">
                              Annual Base Salary (₦)
                            </Label>
                            <Input
                              id="yearlyBaseSalary"
                              type="number"
                              value={newEmployee.yearlyBaseSalary}
                              onChange={(e) => {
                                const yearly = parseInt(e.target.value) || 0;
                                const rates = calculateRatesFromYearly(
                                  yearly,
                                  newEmployee.payFrequency || "monthly",
                                );
                                setNewEmployee({
                                  ...newEmployee,
                                  yearlyBaseSalary: yearly,
                                  ...rates,
                                });
                              }}
                              placeholder="Annual salary"
                            />
                          </div>
                          <div>
                            <Label>Hourly Rate (₦)</Label>
                            <Input
                              type="number"
                              value={newEmployee.hourlyRate}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  hourlyRate: parseInt(e.target.value) || 0,
                                })
                              }
                              placeholder="Auto-calculated"
                            />
                          </div>
                          <div>
                            <Label>Daily Rate (₦)</Label>
                            <Input
                              type="number"
                              value={newEmployee.dailyRate}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  dailyRate: parseInt(e.target.value) || 0,
                                })
                              }
                              placeholder="Auto-calculated"
                            />
                          </div>
                          <div>
                            <Label>Weekly Rate (₦)</Label>
                            <Input
                              type="number"
                              value={newEmployee.weeklyRate}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  weeklyRate: parseInt(e.target.value) || 0,
                                })
                              }
                              placeholder="Auto-calculated"
                            />
                          </div>
                          <div>
                            <Label>Monthly Rate (₦)</Label>
                            <Input
                              type="number"
                              value={newEmployee.monthlyRate}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  monthlyRate: parseInt(e.target.value) || 0,
                                })
                              }
                              placeholder="Auto-calculated"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Tax and Benefits */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Tax & Benefits Configuration
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="payrollTaxRate">
                              PAYE Tax Rate (%)
                            </Label>
                            <Input
                              id="payrollTaxRate"
                              type="number"
                              step="0.1"
                              value={newEmployee.payrollTaxRate}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  payrollTaxRate:
                                    parseFloat(e.target.value) || 0,
                                })
                              }
                              placeholder="Tax rate"
                            />
                          </div>
                          <div>
                            <Label htmlFor="benefitsRate">
                              Benefits Rate (%)
                            </Label>
                            <Input
                              id="benefitsRate"
                              type="number"
                              step="0.1"
                              value={newEmployee.benefitsRate}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  benefitsRate: parseFloat(e.target.value) || 0,
                                })
                              }
                              placeholder="Benefits rate"
                            />
                          </div>
                          <div>
                            <Label htmlFor="pensionContributionRate">
                              Pension Rate (%)
                            </Label>
                            <Input
                              id="pensionContributionRate"
                              type="number"
                              step="0.1"
                              value={newEmployee.pensionContributionRate}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  pensionContributionRate:
                                    parseFloat(e.target.value) || 0,
                                })
                              }
                              placeholder="Pension rate"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Allowances */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Allowances (₦)
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label>Transport Allowance</Label>
                            <Input
                              type="number"
                              value={newEmployee.allowances?.transport}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  allowances: {
                                    ...newEmployee.allowances!,
                                    transport: parseInt(e.target.value) || 0,
                                  },
                                })
                              }
                              placeholder="Transport allowance"
                            />
                          </div>
                          <div>
                            <Label>Housing Allowance</Label>
                            <Input
                              type="number"
                              value={newEmployee.allowances?.housing}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  allowances: {
                                    ...newEmployee.allowances!,
                                    housing: parseInt(e.target.value) || 0,
                                  },
                                })
                              }
                              placeholder="Housing allowance"
                            />
                          </div>
                          <div>
                            <Label>Meal Allowance</Label>
                            <Input
                              type="number"
                              value={newEmployee.allowances?.meal}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  allowances: {
                                    ...newEmployee.allowances!,
                                    meal: parseInt(e.target.value) || 0,
                                  },
                                })
                              }
                              placeholder="Meal allowance"
                            />
                          </div>
                          <div>
                            <Label>Medical Allowance</Label>
                            <Input
                              type="number"
                              value={newEmployee.allowances?.medical}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  allowances: {
                                    ...newEmployee.allowances!,
                                    medical: parseInt(e.target.value) || 0,
                                  },
                                })
                              }
                              placeholder="Medical allowance"
                            />
                          </div>
                          <div>
                            <Label>Other Allowances</Label>
                            <Input
                              type="number"
                              value={newEmployee.allowances?.other}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  allowances: {
                                    ...newEmployee.allowances!,
                                    other: parseInt(e.target.value) || 0,
                                  },
                                })
                              }
                              placeholder="Other allowances"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Deductions */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Deductions (₦)
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label>Loan Deduction</Label>
                            <Input
                              type="number"
                              value={newEmployee.deductions?.loan}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  deductions: {
                                    ...newEmployee.deductions!,
                                    loan: parseInt(e.target.value) || 0,
                                  },
                                })
                              }
                              placeholder="Loan deduction"
                            />
                          </div>
                          <div>
                            <Label>Salary Advance</Label>
                            <Input
                              type="number"
                              value={newEmployee.deductions?.advance}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  deductions: {
                                    ...newEmployee.deductions!,
                                    advance: parseInt(e.target.value) || 0,
                                  },
                                })
                              }
                              placeholder="Salary advance"
                            />
                          </div>
                          <div>
                            <Label>Other Deductions</Label>
                            <Input
                              type="number"
                              value={newEmployee.deductions?.other}
                              onChange={(e) =>
                                setNewEmployee({
                                  ...newEmployee,
                                  deductions: {
                                    ...newEmployee.deductions!,
                                    other: parseInt(e.target.value) || 0,
                                  },
                                })
                              }
                              placeholder="Other deductions"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowEmployeeDialog(false);
                          setIsEditMode(false);
                          setEditingEmployee(null);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={saveEmployee}>
                        <Save className="h-4 w-4 mr-2" />
                        {isEditMode ? "Update" : "Save"} Employee
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Pay Structure</TableHead>
                    <TableHead>Tax & Benefits</TableHead>
                    <TableHead>Allowances</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {employee.position}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {employee.department}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium capitalize">
                            {employee.payFrequency} Pay
                          </div>
                          <div className="text-muted-foreground">
                            {employee.payFrequency === "hourly" &&
                              `₦${employee.hourlyRate.toLocaleString()}/hour`}
                            {employee.payFrequency === "daily" &&
                              `₦${employee.dailyRate.toLocaleString()}/day`}
                            {employee.payFrequency === "weekly" &&
                              `₦${employee.weeklyRate.toLocaleString()}/week`}
                            {employee.payFrequency === "monthly" &&
                              `₦${employee.monthlyRate.toLocaleString()}/month`}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ₦{employee.yearlyBaseSalary.toLocaleString()}/year
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Tax: {employee.payrollTaxRate}%</div>
                          <div>Benefits: {employee.benefitsRate}%</div>
                          <div>
                            Pension: {employee.pensionContributionRate}%
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>
                            Transport: ₦
                            {employee.allowances.transport.toLocaleString()}
                          </div>
                          <div>
                            Housing: ₦
                            {employee.allowances.housing.toLocaleString()}
                          </div>
                          <div>
                            Meal: ₦{employee.allowances.meal.toLocaleString()}
                          </div>
                          <div>
                            Medical: ₦
                            {employee.allowances.medical.toLocaleString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>
                            Loan: ₦{employee.deductions.loan.toLocaleString()}
                          </div>
                          <div>
                            Advance: ₦
                            {employee.deductions.advance.toLocaleString()}
                          </div>
                          <div>
                            Other: ₦{employee.deductions.other.toLocaleString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => editEmployee(employee)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => generatePayslip(employee.id)}
                          >
                            <Receipt className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payslips" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Generate Individual Payslips</CardTitle>
                <CardDescription>
                  Create payslips for specific employees with custom periods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employees.map((employee) => (
                    <div
                      key={employee.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {employee.position} • {employee.department} •{" "}
                            {employee.payFrequency} pay
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => generatePayslip(employee.id)}
                        >
                          <Receipt className="h-4 w-4 mr-2" />
                          Monthly
                        </Button>
                        <Button onClick={() => generatePayslip(employee.id)}>
                          Generate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bulk Report Options</CardTitle>
                <CardDescription>
                  Generate reports for multiple periods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => setShowBulkReportDialog(true)}
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Monthly Reports
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => {
                      setReportPeriod("3month");
                      setShowBulkReportDialog(true);
                    }}
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    3-Month Reports
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => {
                      setReportPeriod("6month");
                      setShowBulkReportDialog(true);
                    }}
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    6-Month Reports
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => {
                      setReportPeriod("yearly");
                      setShowBulkReportDialog(true);
                    }}
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Yearly Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Cost Analysis</CardTitle>
                <CardDescription>
                  Monthly payroll cost breakdown and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Gross Pay</span>
                      <span className="font-medium">
                        ₦{(payrollSummary.totalGrossPay / 1000000).toFixed(2)}M
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Employer Contributions</span>
                      <span className="font-medium">
                        ₦
                        {(
                          (payrollSummary.totalGrossPay * 0.15) /
                          1000000
                        ).toFixed(2)}
                        M
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Payroll Cost</span>
                      <span className="font-medium text-blue-600">
                        ₦{(payrollSummary.payrollCost / 1000000).toFixed(2)}M
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Average Monthly Pay</span>
                      <span className="font-medium">
                        ₦{(payrollSummary.averagePay / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cost per Employee</span>
                      <span className="font-medium">
                        ₦
                        {(
                          payrollSummary.payrollCost /
                          payrollSummary.totalEmployees /
                          1000
                        ).toFixed(0)}
                        K
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax & Compliance Summary</CardTitle>
                <CardDescription>
                  Tax withholdings and regulatory compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total PAYE Tax</span>
                      <span className="font-medium">
                        ₦{(payrollSummary.totalTaxes / 1000000).toFixed(2)}M
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Benefits Contributions</span>
                      <span className="font-medium">
                        ₦
                        {(
                          (payrollSummary.totalGrossPay * 0.08) /
                          1000000
                        ).toFixed(2)}
                        M
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Pension Contributions</span>
                      <span className="font-medium">
                        ₦
                        {(
                          (payrollSummary.totalGrossPay * 0.15) /
                          1000000
                        ).toFixed(2)}
                        M
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Effective Tax Rate</span>
                      <span className="font-medium">
                        {Math.round(
                          (payrollSummary.totalTaxes /
                            payrollSummary.totalGrossPay) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Deduction Rate</span>
                      <span className="font-medium">
                        {Math.round(
                          (payrollSummary.totalDeductions /
                            payrollSummary.totalGrossPay) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Export & Archive Options</CardTitle>
              <CardDescription>
                Generate comprehensive payroll reports and archive to Google
                Drive
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={exportToExcel}
                >
                  <div className="text-left">
                    <div className="font-medium">Excel Export</div>
                    <div className="text-sm text-muted-foreground">
                      Monthly summary
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={exportToGoogleSheets}
                >
                  <div className="text-left">
                    <div className="font-medium">Google Sheets</div>
                    <div className="text-sm text-muted-foreground">
                      Live collaboration
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={archiveToGoogleDrive}
                >
                  <div className="text-left">
                    <div className="font-medium">Google Drive</div>
                    <div className="text-sm text-muted-foreground">
                      Archive documents
                    </div>
                  </div>
                </Button>

                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Email Reports</div>
                    <div className="text-sm text-muted-foreground">
                      Send to stakeholders
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payslip Preview Dialog */}
      <Dialog open={showPayslipDialog} onOpenChange={setShowPayslipDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payslip Preview</DialogTitle>
            <DialogDescription>Preview of generated payslip</DialogDescription>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <div className="text-center border-b pb-4">
                <h3 className="text-lg font-semibold">H-Project Hub</h3>
                <p className="text-sm text-muted-foreground">
                  Payslip for{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Employee Name</Label>
                  <p className="text-sm">{selectedEmployee.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Employee ID</Label>
                  <p className="text-sm">{selectedEmployee.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Department</Label>
                  <p className="text-sm">{selectedEmployee.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Position</Label>
                  <p className="text-sm">{selectedEmployee.position}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Pay Frequency</Label>
                  <p className="text-sm capitalize">
                    {selectedEmployee.payFrequency}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Pay Rate</Label>
                  <p className="text-sm">
                    {selectedEmployee.payFrequency === "hourly" &&
                      `₦${selectedEmployee.hourlyRate.toLocaleString()}/hour`}
                    {selectedEmployee.payFrequency === "daily" &&
                      `₦${selectedEmployee.dailyRate.toLocaleString()}/day`}
                    {selectedEmployee.payFrequency === "weekly" &&
                      `₦${selectedEmployee.weeklyRate.toLocaleString()}/week`}
                    {selectedEmployee.payFrequency === "monthly" &&
                      `₦${selectedEmployee.monthlyRate.toLocaleString()}/month`}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">Earnings</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Basic Salary</span>
                    <span>
                      ₦{selectedEmployee.monthlyRate.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transport Allowance</span>
                    <span>
                      ₦{selectedEmployee.allowances.transport.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Housing Allowance</span>
                    <span>
                      ₦{selectedEmployee.allowances.housing.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Meal Allowance</span>
                    <span>
                      ₦{selectedEmployee.allowances.meal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-1">
                    <span>Gross Pay</span>
                    <span>
                      ₦
                      {(
                        selectedEmployee.monthlyRate +
                        Object.values(selectedEmployee.allowances).reduce(
                          (sum, allowance) => sum + allowance,
                          0,
                        )
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Deductions</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>PAYE Tax ({selectedEmployee.payrollTaxRate}%)</span>
                    <span>
                      ₦
                      {(
                        selectedEmployee.monthlyRate *
                        (selectedEmployee.payrollTaxRate / 100)
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Benefits ({selectedEmployee.benefitsRate}%)</span>
                    <span>
                      ₦
                      {(
                        selectedEmployee.monthlyRate *
                        (selectedEmployee.benefitsRate / 100)
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      Pension ({selectedEmployee.pensionContributionRate}%)
                    </span>
                    <span>
                      ₦
                      {(
                        selectedEmployee.monthlyRate *
                        (selectedEmployee.pensionContributionRate / 100)
                      ).toLocaleString()}
                    </span>
                  </div>
                  {selectedEmployee.deductions.loan > 0 && (
                    <div className="flex justify-between">
                      <span>Loan Deduction</span>
                      <span>
                        ₦{selectedEmployee.deductions.loan.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium border-t pt-1">
                    <span>Total Deductions</span>
                    <span>
                      ₦
                      {(
                        selectedEmployee.monthlyRate *
                          ((selectedEmployee.payrollTaxRate +
                            selectedEmployee.benefitsRate +
                            selectedEmployee.pensionContributionRate) /
                            100) +
                        Object.values(selectedEmployee.deductions).reduce(
                          (sum, deduction) => sum + deduction,
                          0,
                        )
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>Net Pay</span>
                <span className="text-green-600">
                  ₦
                  {(
                    selectedEmployee.monthlyRate +
                    Object.values(selectedEmployee.allowances).reduce(
                      (sum, allowance) => sum + allowance,
                      0,
                    ) -
                    (selectedEmployee.monthlyRate *
                      ((selectedEmployee.payrollTaxRate +
                        selectedEmployee.benefitsRate +
                        selectedEmployee.pensionContributionRate) /
                        100) +
                      Object.values(selectedEmployee.deductions).reduce(
                        (sum, deduction) => sum + deduction,
                        0,
                      ))
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPayslipDialog(false)}
            >
              Close
            </Button>
            <Button onClick={archiveToGoogleDrive}>
              <FolderOpen className="h-4 w-4 mr-2" />
              Archive to Drive
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payroll;
