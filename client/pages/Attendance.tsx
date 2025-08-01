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
  breakTime: number; // in minutes
  totalHours: number;
  status: "present" | "late" | "absent" | "partial";
  location: string;
  deviceType: "RFID" | "NFC" | "QR" | "Manual";
  deviceId?: string;
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

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
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
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showVisitorDialog, setShowVisitorDialog] = useState(false);
  const [newVisitor, setNewVisitor] = useState({
    visitorName: "",
    company: "",
    purpose: "",
    hostEmployee: "",
  });

  const departments = ["Engineering", "Design", "Marketing", "Sales", "HR"];
  const employees = [
    "John Doe",
    "Sarah Wilson", 
    "Mike Chen",
    "Alex Rodriguez",
    "Emma Davis"
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

    const qrCode = `QR-VIS-${Date.now()}-${new Date().toISOString().split('T')[0]}`;
    const newVisitorRecord: VisitorRecord = {
      id: `VIS-${Date.now()}`,
      ...newVisitor,
      checkIn: new Date().toLocaleTimeString('en-US', { hour12: false }),
      qrCode,
      status: "checked-in",
    };

    setVisitorRecords([...visitorRecords, newVisitorRecord]);
    setNewVisitor({ visitorName: "", company: "", purpose: "", hostEmployee: "" });
    setShowVisitorDialog(false);

    toast({
      title: "QR Code Generated",
      description: `QR Code ${qrCode} generated for ${newVisitor.visitorName}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present": return "bg-green-100 text-green-800";
      case "late": return "bg-yellow-100 text-yellow-800";
      case "absent": return "bg-red-100 text-red-800";
      case "partial": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "late": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "absent": return <XCircle className="h-4 w-4 text-red-500" />;
      case "partial": return <Timer className="h-4 w-4 text-orange-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case "RFID": return <CreditCard className="h-4 w-4 text-blue-500" />;
      case "NFC": return <Nfc className="h-4 w-4 text-green-500" />;
      case "QR": return <QrCode className="h-4 w-4 text-purple-500" />;
      case "Manual": return <Smartphone className="h-4 w-4 text-gray-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || record.department === filterDepartment;
    const matchesStatus = filterStatus === "all" || record.status === filterStatus;
    const matchesDate = record.date === selectedDate.toISOString().split('T')[0];
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesDate;
  });

  const todayStats = {
    present: attendanceRecords.filter(r => r.status === "present" && r.date === new Date().toISOString().split('T')[0]).length,
    late: attendanceRecords.filter(r => r.status === "late" && r.date === new Date().toISOString().split('T')[0]).length,
    absent: attendanceRecords.filter(r => r.status === "absent" && r.date === new Date().toISOString().split('T')[0]).length,
    totalEmployees: 50, // Mock total
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Management</h1>
          <p className="text-muted-foreground">
            Monitor staff attendance with RFID, NFC, and QR code systems
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
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
                    onChange={(e) => setNewVisitor({...newVisitor, visitorName: e.target.value})}
                    placeholder="Enter visitor name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={newVisitor.company}
                    onChange={(e) => setNewVisitor({...newVisitor, company: e.target.value})}
                    placeholder="Company name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="purpose">Purpose of Visit</Label>
                  <Input
                    id="purpose"
                    value={newVisitor.purpose}
                    onChange={(e) => setNewVisitor({...newVisitor, purpose: e.target.value})}
                    placeholder="Meeting, interview, etc."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="hostEmployee">Host Employee *</Label>
                  <Select value={newVisitor.hostEmployee} onValueChange={(value) => setNewVisitor({...newVisitor, hostEmployee: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select host employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map(employee => (
                        <SelectItem key={employee} value={employee}>{employee}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowVisitorDialog(false)}>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Present Today</p>
                <div className="text-2xl font-bold text-green-600">{todayStats.present}</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Late Arrivals</p>
                <div className="text-2xl font-bold text-yellow-600">{todayStats.late}</div>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Absent</p>
                <div className="text-2xl font-bold text-red-600">{todayStats.absent}</div>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round((todayStats.present / todayStats.totalEmployees) * 100)}%
                </div>
              </div>
              <UserCheck className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="attendance">Attendance Records</TabsTrigger>
          <TabsTrigger value="visitors">Visitor Management</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
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
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
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
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Attendance - {selectedDate.toDateString()}</CardTitle>
              <CardDescription>
                Real-time attendance tracking with RFID, NFC, and QR systems
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
                      <TableCell>{record.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {record.clockIn}
                        </div>
                      </TableCell>
                      <TableCell>
                        {record.clockOut ? (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {record.clockOut}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Not clocked out</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Timer className="h-4 w-4 text-muted-foreground" />
                          {record.totalHours}h
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
                        <div className="flex items-center gap-2">
                          {getDeviceIcon(record.deviceType)}
                          <span className="text-sm">{record.deviceType}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {record.location}
                        </div>
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
                      <TableCell className="font-medium">{visitor.visitorName}</TableCell>
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
                          <span className="text-muted-foreground">Still visiting</span>
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
                        <Badge className={visitor.status === "checked-in" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
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
                <CardDescription>Choose a date to view attendance</CardDescription>
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
                  Visual representation of attendance patterns
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
                        <div className="mt-1 flex justify-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full" title="Present"></div>
                          <div className="w-2 h-2 bg-yellow-500 rounded-full" title="Late"></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full" title="Absent"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm">
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
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Attendance;
