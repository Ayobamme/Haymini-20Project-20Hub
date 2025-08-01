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
  yearlyBaseSalary: number;
  hourlyRate: number;
  payrollTaxRate: number;
  socialSecurityRate: number;
  pensionContributionRate: number;
  vacationAccrualRate: number;
  annualVacationEntitlement: number;
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
  expenseReimbursements: number;
  grossPay: number;
  payrollTax: number;
  socialSecurity: number;
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
      yearlyBaseSalary: 12000000,
      hourlyRate: 5000,
      payrollTaxRate: 24,
      socialSecurityRate: 8,
      pensionContributionRate: 15,
      vacationAccrualRate: 8.33,
      annualVacationEntitlement: 25,
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
      yearlyBaseSalary: 9600000,
      hourlyRate: 4000,
      payrollTaxRate: 21,
      socialSecurityRate: 8,
      pensionContributionRate: 15,
      vacationAccrualRate: 7.69,
      annualVacationEntitlement: 20,
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
      regularPay: 800000,
      overtimePay: 60000,
      bonuses: 100000,
      expenseReimbursements: 25000,
      grossPay: 985000,
      payrollTax: 236400,
      socialSecurity: 78800,
      pensionContribution: 147750,
      otherDeductions: 15000,
      totalDeductions: 477950,
      netPay: 507050,
      status: "paid",
      generatedDate: "2024-01-25",
      approvedBy: "Admin User",
      paidDate: "2024-01-31",
    },
    {
      id: "PR-002",
      employeeId: "EMP-002",
      employeeName: "Sarah Wilson",
      payPeriod: "January 2024",
      payPeriodStart: "2024-01-01",
      payPeriodEnd: "2024-01-31",
      regularHours: 152,
      overtimeHours: 0,
      vacationHours: 8,
      sickHours: 8,
      regularPay: 608000,
      overtimePay: 0,
      bonuses: 50000,
      expenseReimbursements: 12000,
      grossPay: 670000,
      payrollTax: 140700,
      socialSecurity: 53600,
      pensionContribution: 100500,
      otherDeductions: 10000,
      totalDeductions: 304800,
      netPay: 365200,
      status: "approved",
      generatedDate: "2024-01-25",
      approvedBy: "Admin User",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showPayslipDialog, setShowPayslipDialog] = useState(false);
  const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);
  const [showPayrollDialog, setShowPayrollDialog] = useState(false);

  const generatePayslip = (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return;

    // Get attendance data (mock calculation)
    const regularHours = 160; // Standard month
    const overtimeHours = Math.floor(Math.random() * 20);
    const regularPay = regularHours * employee.hourlyRate;
    const overtimePay = overtimeHours * employee.hourlyRate * 1.5;
    const bonuses = Math.floor(Math.random() * 100000);
    const expenseReimbursements = Math.floor(Math.random() * 50000);
    
    const grossPay = regularPay + overtimePay + bonuses + expenseReimbursements;
    const payrollTax = grossPay * (employee.payrollTaxRate / 100);
    const socialSecurity = grossPay * (employee.socialSecurityRate / 100);
    const pensionContribution = grossPay * (employee.pensionContributionRate / 100);
    const otherDeductions = Math.floor(Math.random() * 20000);
    const totalDeductions = payrollTax + socialSecurity + pensionContribution + otherDeductions;
    const netPay = grossPay - totalDeductions;

    const newPayrollRecord: PayrollRecord = {
      id: `PR-${Date.now()}`,
      employeeId: employee.id,
      employeeName: employee.name,
      payPeriod: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      payPeriodStart: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
      payPeriodEnd: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0],
      regularHours,
      overtimeHours,
      vacationHours: 0,
      sickHours: 0,
      regularPay,
      overtimePay,
      bonuses,
      expenseReimbursements,
      grossPay,
      payrollTax,
      socialSecurity,
      pensionContribution,
      otherDeductions,
      totalDeductions,
      netPay,
      status: "draft",
      generatedDate: new Date().toISOString().split('T')[0],
    };

    setPayrollRecords([...payrollRecords, newPayrollRecord]);
    
    toast({
      title: "Payslip Generated",
      description: `Payslip generated for ${employee.name}`,
    });
  };

  const approvePayroll = (recordId: string) => {
    setPayrollRecords(records =>
      records.map(record =>
        record.id === recordId
          ? { ...record, status: "approved", approvedBy: "Admin User" }
          : record
      )
    );

    toast({
      title: "Payroll Approved",
      description: "Payroll record has been approved",
    });
  };

  const processPayment = (recordId: string) => {
    setPayrollRecords(records =>
      records.map(record =>
        record.id === recordId
          ? { ...record, status: "paid", paidDate: new Date().toISOString().split('T')[0] }
          : record
      )
    );

    toast({
      title: "Payment Processed",
      description: "Payment has been processed successfully",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-gray-100 text-gray-800";
      case "approved": return "bg-blue-100 text-blue-800";
      case "paid": return "bg-green-100 text-green-800";
      case "voided": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft": return <FileText className="h-4 w-4 text-gray-500" />;
      case "approved": return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "paid": return <CreditCard className="h-4 w-4 text-green-500" />;
      case "voided": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredRecords = payrollRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const employee = employees.find(emp => emp.id === record.employeeId);
    const matchesDepartment = departmentFilter === "all" || employee?.department === departmentFilter;
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const payrollSummary: PayrollSummary = {
    totalEmployees: employees.length,
    totalGrossPay: payrollRecords.reduce((sum, record) => sum + record.grossPay, 0),
    totalDeductions: payrollRecords.reduce((sum, record) => sum + record.totalDeductions, 0),
    totalNetPay: payrollRecords.reduce((sum, record) => sum + record.netPay, 0),
    totalTaxes: payrollRecords.reduce((sum, record) => sum + record.payrollTax, 0),
    averagePay: payrollRecords.length > 0 ? payrollRecords.reduce((sum, record) => sum + record.netPay, 0) / payrollRecords.length : 0,
    payrollCost: payrollRecords.reduce((sum, record) => sum + record.grossPay + (record.grossPay * 0.15), 0), // Including employer contributions
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payroll Management</h1>
          <p className="text-muted-foreground">
            Comprehensive payroll system with attendance integration and automated calculations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Payroll
          </Button>
          <Dialog open={showPayrollDialog} onOpenChange={setShowPayrollDialog}>
            <DialogTrigger asChild>
              <Button>
                <Calculator className="h-4 w-4 mr-2" />
                Run Payroll
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Run Monthly Payroll</DialogTitle>
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
                <Button variant="outline" onClick={() => setShowPayrollDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  employees.forEach(emp => generatePayslip(emp.id));
                  setShowPayrollDialog(false);
                }}>
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
            <div className="text-2xl font-bold">{payrollSummary.totalEmployees}</div>
            <div className="text-xs text-muted-foreground">Employees</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">₦{(payrollSummary.totalGrossPay / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">Gross Pay</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Percent className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">₦{(payrollSummary.totalDeductions / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">Deductions</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <CreditCard className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">₦{(payrollSummary.totalNetPay / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">Net Pay</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Receipt className="h-8 w-8 mx-auto mb-2 text-red-500" />
            <div className="text-2xl font-bold">₦{(payrollSummary.totalTaxes / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">Total Taxes</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-cyan-500" />
            <div className="text-2xl font-bold">₦{(payrollSummary.payrollCost / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">Total Cost</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payroll" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="payroll">Payroll Records</TabsTrigger>
          <TabsTrigger value="employees">Employee Information</TabsTrigger>
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
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
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
                              {record.employeeName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{record.employeeName}</div>
                            <div className="text-sm text-muted-foreground">{record.employeeId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{record.payPeriod}</div>
                          <div className="text-muted-foreground">
                            {new Date(record.payPeriodStart).toLocaleDateString()} - {new Date(record.payPeriodEnd).toLocaleDateString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Regular: {record.regularHours}h</div>
                          <div className="text-muted-foreground">OT: {record.overtimeHours}h</div>
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
                              setSelectedEmployee(employees.find(emp => emp.id === record.employeeId) || null);
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
              <CardTitle>Employee Payroll Information</CardTitle>
              <CardDescription>
                Employee details, salary information, and tax configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Contract Info</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Tax Rates</TableHead>
                    <TableHead>Benefits</TableHead>
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
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-muted-foreground">{employee.position}</div>
                            <div className="text-sm text-muted-foreground">{employee.department}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>ID: {employee.id}</div>
                          <div>Contract: {employee.contractRef}</div>
                          <div>Start: {new Date(employee.startDate).toLocaleDateString()}</div>
                          <div>{employee.state}, {employee.country}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">₦{employee.yearlyBaseSalary.toLocaleString()}/year</div>
                          <div className="text-muted-foreground">₦{employee.hourlyRate.toLocaleString()}/hour</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Tax: {employee.payrollTaxRate}%</div>
                          <div>Social Security: {employee.socialSecurityRate}%</div>
                          <div>Pension: {employee.pensionContributionRate}%</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Vacation: {employee.annualVacationEntitlement} days</div>
                          <div>Accrual: {employee.vacationAccrualRate}%</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => generatePayslip(employee.id)}
                        >
                          Generate Payslip
                        </Button>
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
                  Create payslips for specific employees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employees.map((employee) => (
                    <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.position} • {employee.department}</div>
                        </div>
                      </div>
                      <Button
                        onClick={() => generatePayslip(employee.id)}
                      >
                        <Receipt className="h-4 w-4 mr-2" />
                        Generate Payslip
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payroll Calculations</CardTitle>
                <CardDescription>
                  Automatic calculations based on attendance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="space-y-2">
                    <div className="font-medium">Gross Pay Calculation:</div>
                    <div className="pl-4 space-y-1 text-muted-foreground">
                      <div>• Regular Hours × Hourly Rate</div>
                      <div>• Overtime Hours × 1.5 × Hourly Rate</div>
                      <div>• + Bonuses & Allowances</div>
                      <div>• + Expense Reimbursements</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="font-medium">Deductions:</div>
                    <div className="pl-4 space-y-1 text-muted-foreground">
                      <div>• Payroll Tax (PAYE)</div>
                      <div>• Social Security Contributions</div>
                      <div>• Pension Contributions</div>
                      <div>• Other Deductions</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="font-medium">Net Pay:</div>
                    <div className="pl-4 text-muted-foreground">
                      Gross Pay - Total Deductions
                    </div>
                  </div>
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
                      <span className="font-medium">₦{(payrollSummary.totalGrossPay / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Employer Contributions</span>
                      <span className="font-medium">₦{((payrollSummary.totalGrossPay * 0.15) / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Payroll Cost</span>
                      <span className="font-medium text-blue-600">₦{(payrollSummary.payrollCost / 1000000).toFixed(2)}M</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Average Monthly Pay</span>
                      <span className="font-medium">₦{(payrollSummary.averagePay / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cost per Employee</span>
                      <span className="font-medium">₦{((payrollSummary.payrollCost / payrollSummary.totalEmployees) / 1000).toFixed(0)}K</span>
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
                      <span className="font-medium">₦{(payrollSummary.totalTaxes / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Social Security</span>
                      <span className="font-medium">₦{((payrollSummary.totalGrossPay * 0.08) / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Pension Contributions</span>
                      <span className="font-medium">₦{((payrollSummary.totalGrossPay * 0.15) / 1000000).toFixed(2)}M</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Effective Tax Rate</span>
                      <span className="font-medium">{Math.round((payrollSummary.totalTaxes / payrollSummary.totalGrossPay) * 100)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Deduction Rate</span>
                      <span className="font-medium">{Math.round((payrollSummary.totalDeductions / payrollSummary.totalGrossPay) * 100)}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payroll Reports</CardTitle>
              <CardDescription>
                Generate comprehensive payroll reports for compliance and analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Monthly Payroll Summary</div>
                    <div className="text-sm text-muted-foreground">Complete payroll breakdown</div>
                  </div>
                </Button>

                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Tax Withholding Report</div>
                    <div className="text-sm text-muted-foreground">PAYE and deductions summary</div>
                  </div>
                </Button>

                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Employee Pay History</div>
                    <div className="text-sm text-muted-foreground">Individual payment records</div>
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
            <DialogDescription>
              Preview of generated payslip
            </DialogDescription>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <div className="text-center border-b pb-4">
                <h3 className="text-lg font-semibold">H-Project Hub</h3>
                <p className="text-sm text-muted-foreground">Payslip for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
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
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">Earnings</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Basic Salary</span>
                    <span>₦{(selectedEmployee.yearlyBaseSalary / 12).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overtime</span>
                    <span>₦0</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-1">
                    <span>Gross Pay</span>
                    <span>₦{(selectedEmployee.yearlyBaseSalary / 12).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Deductions</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>PAYE Tax ({selectedEmployee.payrollTaxRate}%)</span>
                    <span>₦{((selectedEmployee.yearlyBaseSalary / 12) * (selectedEmployee.payrollTaxRate / 100)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pension ({selectedEmployee.pensionContributionRate}%)</span>
                    <span>₦{((selectedEmployee.yearlyBaseSalary / 12) * (selectedEmployee.pensionContributionRate / 100)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-1">
                    <span>Total Deductions</span>
                    <span>₦{((selectedEmployee.yearlyBaseSalary / 12) * ((selectedEmployee.payrollTaxRate + selectedEmployee.pensionContributionRate) / 100)).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>Net Pay</span>
                <span className="text-green-600">
                  ₦{((selectedEmployee.yearlyBaseSalary / 12) * (1 - ((selectedEmployee.payrollTaxRate + selectedEmployee.pensionContributionRate) / 100))).toLocaleString()}
                </span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPayslipDialog(false)}>
              Close
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
