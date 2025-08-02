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
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DateRange } from "react-day-picker";
import {
  Clock,
  Calendar as CalendarIcon,
  Users,
  QrCode,
  Nfc,
  Download,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plus,
  UserCheck,
  Timer,
  CalendarDays,
  MapPin,
  Smartphone,
  CreditCard,
  FileSpreadsheet,
  FileText,
  BarChart3,
  TrendingUp,
  Mail,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: string;
  clockIn: string;
  clockOut?: string;
  breakTime: number;
  totalHours: number;
  status: "present" | "late" | "absent" | "partial" | "on_leave" | "vacation";
  location: string;
  deviceType: "RFID" | "NFC" | "QR" | "Manual";
  deviceId?: string;
  notes?: string;
  isLeaveApproved?: boolean;
  leaveType?: string;
}

interface VisitorRecord {
  id: string;
  visitorName: string;
  company: string;
  purpose: string;
  hostEmployee: string;
  checkIn: string;
  checkOut?: string;
  qrCode: string;
  status: "checked-in" | "checked-out";
}

interface AttendanceReport {
  period: string;
  totalEmployees: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  onLeaveDays: number;
  averageHours: number;
  attendanceRate: number;
}

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([
    {
      id: "ATT-001",
      employeeId: "EMP-001",
      employeeName: "John Doe",
      department: "Engineering",
      date: "2024-01-15",
      clockIn: "08:30",
      clockOut: "17:15",
      breakTime: 60,
      totalHours: 7.75,
      status: "present",
      location: "Main Office",
      deviceType: "RFID",
      deviceId: "RFID-001",
    },
    {
      id: "ATT-002",
      employeeId: "EMP-002",
      employeeName: "Sarah Wilson",
      department: "Design",
      date: "2024-01-15",
      clockIn: "09:15",
      clockOut: "18:00",
      breakTime: 45,
      totalHours: 8.0,
      status: "late",
      location: "Remote",
      deviceType: "NFC",
      deviceId: "NFC-002",
    },
    {
      id: "ATT-003",
      employeeId: "EMP-003",
      employeeName: "Mike Chen",
      department: "Marketing",
      date: "2024-01-15",
      clockIn: "08:00",
      clockOut: undefined,
      breakTime: 30,
      totalHours: 0,
      status: "partial",
      location: "Branch Office",
      deviceType: "QR",
    },
    {
      id: "ATT-004",
      employeeId: "EMP-004",
      employeeName: "Emma Davis",
      department: "HR",
      date: "2024-01-15",
      clockIn: "",
      clockOut: "",
      breakTime: 0,
      totalHours: 0,
      status: "on_leave",
      location: "",
      deviceType: "Manual",
      isLeaveApproved: true,
      leaveType: "vacation",
      notes: "Annual leave - Approved",
    },
    {
      id: "ATT-005",
      employeeId: "EMP-005",
      employeeName: "Alex Rodriguez",
      department: "Sales",
      date: "2024-01-15",
      clockIn: "",
      clockOut: "",
      breakTime: 0,
      totalHours: 0,
      status: "vacation",
      location: "",
      deviceType: "Manual",
      isLeaveApproved: true,
      leaveType: "sick",
      notes: "Sick leave - Medical certificate provided",
    },
  ]);

  const [visitorRecords, setVisitorRecords] = useState<VisitorRecord[]>([
    {
      id: "VIS-001",
      visitorName: "Alex Johnson",
      company: "Tech Solutions Ltd",
      purpose: "Business Meeting",
      hostEmployee: "John Doe",
      checkIn: "10:30",
      checkOut: "14:15",
      qrCode: "QR-VIS-001-20240115",
      status: "checked-out",
    },
    {
      id: "VIS-002",
      visitorName: "Emma Davis",
      company: "Digital Corp",
      purpose: "Product Demo",
      hostEmployee: "Sarah Wilson",
      checkIn: "13:00",
      qrCode: "QR-VIS-002-20240115",
      status: "checked-in",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPeriod, setFilterPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  const [searchTerm, setSearchTerm] = useState("");
  const [showVisitorDialog, setShowVisitorDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [reportType, setReportType] = useState<
    "daily" | "weekly" | "monthly" | "quarterly" | "yearly"
  >("monthly");

  const [newVisitor, setNewVisitor] = useState({
    visitorName: "",
    company: "",
    purpose: "",
    hostEmployee: "",
  });

  const departments = [
    "Engineering",
    "Design",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
  ];
  const employees = [
    "John Doe",
    "Sarah Wilson",
    "Mike Chen",
    "Alex Rodriguez",
    "Emma Davis",
  ];

  const generateVisitorQR = () => {
    if (!newVisitor.visitorName || !newVisitor.hostEmployee) {
      toast({
        title: "Missing Information",
        description: "Please fill in visitor name and host employee.",
        variant: "destructive",
      });
      return;
    }

    const qrCode = `QR-VIS-${Date.now()}-${new Date().toISOString().split("T")[0]}`;
    const newVisitorRecord: VisitorRecord = {
      id: `VIS-${Date.now()}`,
      ...newVisitor,
      checkIn: new Date().toLocaleTimeString("en-US", { hour12: false }),
      qrCode,
      status: "checked-in",
    };

    setVisitorRecords([...visitorRecords, newVisitorRecord]);
    setNewVisitor({
      visitorName: "",
      company: "",
      purpose: "",
      hostEmployee: "",
    });
    setShowVisitorDialog(false);

    toast({
      title: "QR Code Generated",
      description: `QR Code ${qrCode} generated for ${newVisitor.visitorName}`,
    });
  };

  const generateAttendanceReport = (type: string) => {
    const reports: AttendanceReport[] = [];

    // Mock report generation based on type
    switch (type) {
      case "daily":
        for (let i = 0; i < 7; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          reports.push({
            period: date.toDateString(),
            totalEmployees: 50,
            presentDays: 42 + Math.floor(Math.random() * 5),
            absentDays: 3 + Math.floor(Math.random() * 3),
            lateDays: 2 + Math.floor(Math.random() * 3),
            onLeaveDays: 3 + Math.floor(Math.random() * 2),
            averageHours: 7.5 + Math.random(),
            attendanceRate: 85 + Math.random() * 10,
          });
        }
        break;
      case "weekly":
        for (let i = 0; i < 12; i++) {
          reports.push({
            period: `Week ${52 - i}`,
            totalEmployees: 50,
            presentDays: 210 + Math.floor(Math.random() * 20),
            absentDays: 15 + Math.floor(Math.random() * 10),
            lateDays: 10 + Math.floor(Math.random() * 8),
            onLeaveDays: 15 + Math.floor(Math.random() * 5),
            averageHours: 37.5 + Math.random() * 5,
            attendanceRate: 85 + Math.random() * 10,
          });
        }
        break;
      case "monthly":
        for (let i = 0; i < 12; i++) {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          reports.push({
            period: date.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            }),
            totalEmployees: 50,
            presentDays: 900 + Math.floor(Math.random() * 100),
            absentDays: 50 + Math.floor(Math.random() * 20),
            lateDays: 30 + Math.floor(Math.random() * 15),
            onLeaveDays: 60 + Math.floor(Math.random() * 20),
            averageHours: 160 + Math.random() * 20,
            attendanceRate: 85 + Math.random() * 10,
          });
        }
        break;
      case "quarterly":
        for (let i = 0; i < 4; i++) {
          reports.push({
            period: `Q${4 - i} 2024`,
            totalEmployees: 50,
            presentDays: 2700 + Math.floor(Math.random() * 300),
            absentDays: 150 + Math.floor(Math.random() * 50),
            lateDays: 90 + Math.floor(Math.random() * 30),
            onLeaveDays: 180 + Math.floor(Math.random() * 40),
            averageHours: 480 + Math.random() * 60,
            attendanceRate: 85 + Math.random() * 10,
          });
        }
        break;
      case "yearly":
        for (let i = 0; i < 3; i++) {
          reports.push({
            period: `${2024 - i}`,
            totalEmployees: 50,
            presentDays: 10800 + Math.floor(Math.random() * 1000),
            absentDays: 600 + Math.floor(Math.random() * 200),
            lateDays: 360 + Math.floor(Math.random() * 100),
            onLeaveDays: 720 + Math.floor(Math.random() * 150),
            averageHours: 1920 + Math.random() * 200,
            attendanceRate: 85 + Math.random() * 10,
          });
        }
        break;
    }

    return reports;
  };

  const exportToExcel = (data: any[], filename: string) => {
    toast({
      title: "Exporting to Excel",
      description: `${filename} is being exported to Excel format...`,
    });

    // In a real implementation, you would use a library like xlsx or sheet.js
    // to generate the actual Excel file
    setTimeout(() => {
      toast({
        title: "Export Completed",
        description: `${filename} has been exported successfully.`,
      });
    }, 2000);
  };

  const exportToGoogleSheets = (data: any[], filename: string) => {
    toast({
      title: "Exporting to Google Sheets",
      description: `${filename} is being exported to Google Sheets...`,
    });

    // In a real implementation, you would use Google Sheets API
    setTimeout(() => {
      toast({
        title: "Export Completed",
        description: `${filename} has been exported to Google Sheets successfully.`,
      });
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "partial":
        return "bg-orange-100 text-orange-800";
      case "on_leave":
        return "bg-blue-100 text-blue-800";
      case "vacation":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "late":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "absent":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "partial":
        return <Timer className="h-4 w-4 text-orange-500" />;
      case "on_leave":
        return <CalendarDays className="h-4 w-4 text-blue-500" />;
      case "vacation":
        return <CalendarIcon className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case "RFID":
        return <CreditCard className="h-4 w-4 text-blue-500" />;
      case "NFC":
        return <Nfc className="h-4 w-4 text-green-500" />;
      case "QR":
        return <QrCode className="h-4 w-4 text-purple-500" />;
      case "Manual":
        return <Smartphone className="h-4 w-4 text-gray-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch =
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" || record.department === filterDepartment;
    const matchesStatus =
      filterStatus === "all" || record.status === filterStatus;

    // Enhanced date filtering for different periods
    const recordDate = new Date(record.date);
    const selectedDateObj = new Date(selectedDate);

    let matchesPeriod = false;

    switch (filterPeriod) {
      case "daily":
        matchesPeriod = record.date === selectedDate.toISOString().split("T")[0];
        break;
      case "weekly":
        // Get start of week (Monday)
        const startOfWeek = new Date(selectedDateObj);
        startOfWeek.setDate(selectedDateObj.getDate() - selectedDateObj.getDay() + 1);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        matchesPeriod = recordDate >= startOfWeek && recordDate <= endOfWeek;
        break;
      case "monthly":
        matchesPeriod = recordDate.getMonth() === selectedDateObj.getMonth() &&
                       recordDate.getFullYear() === selectedDateObj.getFullYear();
        break;
    }

    return matchesSearch && matchesDepartment && matchesStatus && matchesPeriod;
  });

  const todayStats = {
    present: attendanceRecords.filter(
      (r) =>
        r.status === "present" &&
        r.date === new Date().toISOString().split("T")[0],
    ).length,
    late: attendanceRecords.filter(
      (r) =>
        r.status === "late" &&
        r.date === new Date().toISOString().split("T")[0],
    ).length,
    absent: attendanceRecords.filter(
      (r) =>
        r.status === "absent" &&
        r.date === new Date().toISOString().split("T")[0],
    ).length,
    onLeave: attendanceRecords.filter(
      (r) =>
        (r.status === "on_leave" || r.status === "vacation") &&
        r.date === new Date().toISOString().split("T")[0],
    ).length,
    totalEmployees: 50,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Attendance Management
          </h1>
          <p className="text-muted-foreground">
            Monitor staff attendance with RFID, NFC, and QR code systems
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate Attendance Report</DialogTitle>
                <DialogDescription>
                  Create comprehensive attendance reports for analysis
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
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
                      <SelectItem value="daily">Daily Report</SelectItem>
                      <SelectItem value="weekly">Weekly Report</SelectItem>
                      <SelectItem value="monthly">Monthly Report</SelectItem>
                      <SelectItem value="quarterly">
                        Quarterly Report
                      </SelectItem>
                      <SelectItem value="yearly">Yearly Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Department</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => {
                      const reports = generateAttendanceReport(reportType);
                      exportToExcel(reports, `attendance-report-${reportType}`);
                    }}
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Export to Excel
                  </Button>
                  <Button
                    onClick={() => {
                      const reports = generateAttendanceReport(reportType);
                      exportToGoogleSheets(
                        reports,
                        `attendance-report-${reportType}`,
                      );
                    }}
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Export to Google Sheets
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowReportDialog(false)}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Export Attendance Data</DialogTitle>
                <DialogDescription>
                  Choose your preferred export format and data range
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Data Type</Label>
                  <Select defaultValue="attendance">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="attendance">
                        Attendance Records
                      </SelectItem>
                      <SelectItem value="visitors">Visitor Records</SelectItem>
                      <SelectItem value="summary">Summary Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() =>
                      exportToExcel(filteredRecords, "attendance-data")
                    }
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Export to Excel
                  </Button>
                  <Button
                    onClick={() =>
                      exportToGoogleSheets(filteredRecords, "attendance-data")
                    }
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Export to Google Sheets
                  </Button>
                </div>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Report
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

          <Dialog open={showVisitorDialog} onOpenChange={setShowVisitorDialog}>
            <DialogTrigger asChild>
              <Button>
                <QrCode className="h-4 w-4 mr-2" />
                Generate Visitor QR
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate Visitor QR Code</DialogTitle>
                <DialogDescription>
                  Create a QR code for visitor access and tracking
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="visitorName">Visitor Name *</Label>
                  <Input
                    id="visitorName"
                    value={newVisitor.visitorName}
                    onChange={(e) =>
                      setNewVisitor({
                        ...newVisitor,
                        visitorName: e.target.value,
                      })
                    }
                    placeholder="Enter visitor name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={newVisitor.company}
                    onChange={(e) =>
                      setNewVisitor({ ...newVisitor, company: e.target.value })
                    }
                    placeholder="Company name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="purpose">Purpose of Visit</Label>
                  <Input
                    id="purpose"
                    value={newVisitor.purpose}
                    onChange={(e) =>
                      setNewVisitor({ ...newVisitor, purpose: e.target.value })
                    }
                    placeholder="Meeting, interview, etc."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="hostEmployee">Host Employee *</Label>
                  <Select
                    value={newVisitor.hostEmployee}
                    onValueChange={(value) =>
                      setNewVisitor({ ...newVisitor, hostEmployee: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select host employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee} value={employee}>
                          {employee}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowVisitorDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={generateVisitorQR}>
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate QR Code
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Present Today
                </p>
                <div className="text-2xl font-bold text-green-600">
                  {todayStats.present}
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Late Arrivals
                </p>
                <div className="text-2xl font-bold text-yellow-600">
                  {todayStats.late}
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Absent
                </p>
                <div className="text-2xl font-bold text-red-600">
                  {todayStats.absent}
                </div>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  On Leave
                </p>
                <div className="text-2xl font-bold text-blue-600">
                  {todayStats.onLeave}
                </div>
              </div>
              <CalendarDays className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Attendance Rate
                </p>
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(
                    ((todayStats.present + todayStats.late) /
                      todayStats.totalEmployees) *
                      100,
                  )}
                  %
                </div>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="attendance">Attendance Records</TabsTrigger>
          <TabsTrigger value="visitors">Visitor Management</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-6">
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
                  value={filterDepartment}
                  onValueChange={setFilterDepartment}
                >
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="on_leave">On Leave</SelectItem>
                    <SelectItem value="vacation">Vacation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Table */}
          <Card>
            <CardHeader>
              <CardTitle>
                Daily Attendance - {selectedDate.toDateString()}
              </CardTitle>
              <CardDescription>
                Real-time attendance tracking with RFID, NFC, QR systems, and
                leave integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Clock In</TableHead>
                    <TableHead>Clock Out</TableHead>
                    <TableHead>Total Hours</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Notes</TableHead>
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
                      <TableCell>{record.department}</TableCell>
                      <TableCell>
                        {record.clockIn ? (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {record.clockIn}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {record.clockOut ? (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {record.clockOut}
                          </div>
                        ) : record.status === "on_leave" ||
                          record.status === "vacation" ? (
                          <span className="text-muted-foreground">
                            On Leave
                          </span>
                        ) : (
                          <span className="text-muted-foreground">
                            Not clocked out
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {record.totalHours > 0 ? (
                          <div className="flex items-center gap-2">
                            <Timer className="h-4 w-4 text-muted-foreground" />
                            {record.totalHours}h
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(record.status)}
                          <Badge className={getStatusColor(record.status)}>
                            {record.status.replace("_", " ")}
                          </Badge>
                          {record.isLeaveApproved && (
                            <Badge variant="outline" className="text-xs">
                              Approved
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getDeviceIcon(record.deviceType)}
                          <span className="text-sm">{record.deviceType}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {record.location ? (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {record.location}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {record.notes && (
                          <div
                            className="text-sm text-muted-foreground max-w-[200px] truncate"
                            title={record.notes}
                          >
                            {record.notes}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visitors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visitor Management</CardTitle>
              <CardDescription>
                Track visitors with QR code access system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Visitor Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Host Employee</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>QR Code</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visitorRecords.map((visitor) => (
                    <TableRow key={visitor.id}>
                      <TableCell className="font-medium">
                        {visitor.visitorName}
                      </TableCell>
                      <TableCell>{visitor.company}</TableCell>
                      <TableCell>{visitor.purpose}</TableCell>
                      <TableCell>{visitor.hostEmployee}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {visitor.checkIn}
                        </div>
                      </TableCell>
                      <TableCell>
                        {visitor.checkOut ? (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {visitor.checkOut}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">
                            Still visiting
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <QrCode className="h-4 w-4" />
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            {visitor.qrCode}
                          </code>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            visitor.status === "checked-in"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {visitor.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
                <CardDescription>
                  Choose a date to view attendance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Attendance Calendar View</CardTitle>
                <CardDescription>
                  Visual representation of attendance patterns with leave
                  integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium">
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                    <div>Sun</div>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 31 }, (_, i) => (
                      <div
                        key={i}
                        className="aspect-square border rounded-lg p-2 text-center text-sm relative hover:bg-muted/50 cursor-pointer"
                      >
                        <div className="font-medium">{i + 1}</div>
                        <div className="mt-1 flex justify-center gap-1 flex-wrap">
                          <div
                            className="w-2 h-2 bg-green-500 rounded-full"
                            title="Present"
                          ></div>
                          <div
                            className="w-2 h-2 bg-yellow-500 rounded-full"
                            title="Late"
                          ></div>
                          <div
                            className="w-2 h-2 bg-red-500 rounded-full"
                            title="Absent"
                          ></div>
                          <div
                            className="w-2 h-2 bg-blue-500 rounded-full"
                            title="On Leave"
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Present</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Late</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Absent</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span>Partial</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>On Leave</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>Vacation</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Trends</CardTitle>
                <CardDescription>
                  Monthly attendance patterns and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">January 2024</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">
                        +5.2%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">December 2023</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium text-red-600">
                        -2.1%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">November 2023</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">
                        +1.8%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Attendance</CardTitle>
                <CardDescription>
                  Attendance rates by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departments.map((dept) => (
                    <div
                      key={dept}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{dept}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${85 + Math.random() * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-10 text-right">
                          {Math.round(85 + Math.random() * 10)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Export Options</CardTitle>
              <CardDescription>
                Generate and export attendance reports quickly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={() => {
                    const reports = generateAttendanceReport("daily");
                    exportToExcel(reports, "daily-attendance-report");
                  }}
                >
                  <div className="text-left">
                    <div className="font-medium">Daily Report</div>
                    <div className="text-sm text-muted-foreground">
                      Last 7 days attendance
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={() => {
                    const reports = generateAttendanceReport("monthly");
                    exportToGoogleSheets(reports, "monthly-attendance-report");
                  }}
                >
                  <div className="text-left">
                    <div className="font-medium">Monthly Report</div>
                    <div className="text-sm text-muted-foreground">
                      Current month summary
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={() => {
                    exportToExcel(attendanceRecords, "all-attendance-records");
                  }}
                >
                  <div className="text-left">
                    <div className="font-medium">Full Export</div>
                    <div className="text-sm text-muted-foreground">
                      All attendance data
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Attendance;
