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
import { Textarea } from "@/components/ui/textarea";
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
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  Search,
  Filter,
  Check,
  X,
  Clock,
  Calendar as CalendarIcon,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  User,
  CalendarDays,
  Plane,
  Heart,
  Briefcase,
  Home,
  GraduationCap,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: "vacation" | "sick" | "personal" | "maternity" | "paternity" | "bereavement" | "study";
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  comments?: string;
}

interface LeaveBalance {
  employeeId: string;
  employeeName: string;
  department: string;
  vacation: { allocated: number; used: number; remaining: number };
  sick: { allocated: number; used: number; remaining: number };
  personal: { allocated: number; used: number; remaining: number };
  totalAllocated: number;
  totalUsed: number;
  totalRemaining: number;
}

interface LeavePolicy {
  id: string;
  leaveType: string;
  annualAllocation: number;
  maxConsecutive: number;
  carryForward: number;
  noticeRequired: number; // days
  department?: string;
  employeeLevel?: string;
}

const LeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: "LR-001",
      employeeId: "EMP-001",
      employeeName: "John Doe",
      department: "Engineering",
      leaveType: "vacation",
      startDate: "2024-02-15",
      endDate: "2024-02-20",
      totalDays: 6,
      reason: "Family vacation to Europe",
      status: "pending",
      appliedDate: "2024-01-15",
    },
    {
      id: "LR-002",
      employeeId: "EMP-002",
      employeeName: "Sarah Wilson",
      department: "Design",
      leaveType: "sick",
      startDate: "2024-01-20",
      endDate: "2024-01-22",
      totalDays: 3,
      reason: "Medical treatment",
      status: "approved",
      appliedDate: "2024-01-18",
      approvedBy: "Admin User",
      approvedDate: "2024-01-19",
    },
    {
      id: "LR-003",
      employeeId: "EMP-003",
      employeeName: "Mike Chen",
      department: "Marketing",
      leaveType: "personal",
      startDate: "2024-02-05",
      endDate: "2024-02-05",
      totalDays: 1,
      reason: "Personal appointment",
      status: "rejected",
      appliedDate: "2024-02-03",
      approvedBy: "Admin User",
      approvedDate: "2024-02-04",
      comments: "Insufficient notice period",
    },
  ]);

  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>([
    {
      employeeId: "EMP-001",
      employeeName: "John Doe",
      department: "Engineering",
      vacation: { allocated: 25, used: 5, remaining: 20 },
      sick: { allocated: 12, used: 2, remaining: 10 },
      personal: { allocated: 5, used: 1, remaining: 4 },
      totalAllocated: 42,
      totalUsed: 8,
      totalRemaining: 34,
    },
    {
      employeeId: "EMP-002",
      employeeName: "Sarah Wilson",
      department: "Design",
      vacation: { allocated: 22, used: 8, remaining: 14 },
      sick: { allocated: 12, used: 3, remaining: 9 },
      personal: { allocated: 5, used: 0, remaining: 5 },
      totalAllocated: 39,
      totalUsed: 11,
      totalRemaining: 28,
    },
  ]);

  const [leavePolicies, setLeavePolicies] = useState<LeavePolicy[]>([
    {
      id: "POL-001",
      leaveType: "vacation",
      annualAllocation: 25,
      maxConsecutive: 15,
      carryForward: 5,
      noticeRequired: 14,
    },
    {
      id: "POL-002",
      leaveType: "sick",
      annualAllocation: 12,
      maxConsecutive: 10,
      carryForward: 0,
      noticeRequired: 0,
    },
    {
      id: "POL-003",
      leaveType: "personal",
      annualAllocation: 5,
      maxConsecutive: 3,
      carryForward: 0,
      noticeRequired: 3,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [approvalComments, setApprovalComments] = useState("");
  const [showPolicyDialog, setShowPolicyDialog] = useState(false);

  const approveLeave = (requestId: string, action: "approved" | "rejected") => {
    setLeaveRequests(requests =>
      requests.map(request =>
        request.id === requestId
          ? {
              ...request,
              status: action,
              approvedBy: "Admin User",
              approvedDate: new Date().toISOString().split('T')[0],
              comments: approvalComments,
            }
          : request
      )
    );

    toast({
      title: `Leave ${action}`,
      description: `Leave request has been ${action}.`,
    });

    setShowApprovalDialog(false);
    setSelectedRequest(null);
    setApprovalComments("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "cancelled": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "approved": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected": return <XCircle className="h-4 w-4 text-red-500" />;
      case "cancelled": return <X className="h-4 w-4 text-gray-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getLeaveTypeIcon = (type: string) => {
    switch (type) {
      case "vacation": return <Plane className="h-4 w-4 text-blue-500" />;
      case "sick": return <Heart className="h-4 w-4 text-red-500" />;
      case "personal": return <User className="h-4 w-4 text-purple-500" />;
      case "maternity": return <Home className="h-4 w-4 text-pink-500" />;
      case "paternity": return <Home className="h-4 w-4 text-blue-500" />;
      case "bereavement": return <Heart className="h-4 w-4 text-gray-500" />;
      case "study": return <GraduationCap className="h-4 w-4 text-green-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    const matchesType = typeFilter === "all" || request.leaveType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const pendingCount = leaveRequests.filter(r => r.status === "pending").length;
  const approvedToday = leaveRequests.filter(r => 
    r.status === "approved" && 
    r.approvedDate === new Date().toISOString().split('T')[0]
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground">
            Manage employee leave requests, approvals, and leave policies
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={showPolicyDialog} onOpenChange={setShowPolicyDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Leave Policies
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Leave Policies Management</DialogTitle>
                <DialogDescription>
                  Configure leave policies and entitlements for different leave types
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Leave Type</TableHead>
                      <TableHead>Annual Allocation</TableHead>
                      <TableHead>Max Consecutive</TableHead>
                      <TableHead>Carry Forward</TableHead>
                      <TableHead>Notice Required</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leavePolicies.map((policy) => (
                      <TableRow key={policy.id}>
                        <TableCell className="capitalize font-medium">{policy.leaveType}</TableCell>
                        <TableCell>{policy.annualAllocation} days</TableCell>
                        <TableCell>{policy.maxConsecutive} days</TableCell>
                        <TableCell>{policy.carryForward} days</TableCell>
                        <TableCell>{policy.noticeRequired} days</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <DialogFooter>
                <Button onClick={() => setShowPolicyDialog(false)}>Close</Button>
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
                <p className="text-sm font-medium text-muted-foreground">Pending Requests</p>
                <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved Today</p>
                <div className="text-2xl font-bold text-green-600">{approvedToday}</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Leave Today</p>
                <div className="text-2xl font-bold text-blue-600">8</div>
              </div>
              <CalendarDays className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Leave Days</p>
                <div className="text-2xl font-bold text-purple-600">18.5</div>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="requests">Leave Requests</TabsTrigger>
          <TabsTrigger value="balances">Leave Balances</TabsTrigger>
          <TabsTrigger value="calendar">Leave Calendar</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-6">
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="vacation">Vacation</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="maternity">Maternity</SelectItem>
                    <SelectItem value="paternity">Paternity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Leave Requests Table */}
          <Card>
            <CardHeader>
              <CardTitle>Leave Requests</CardTitle>
              <CardDescription>
                Review and manage employee leave requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {request.employeeName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{request.employeeName}</div>
                            <div className="text-sm text-muted-foreground">{request.department}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getLeaveTypeIcon(request.leaveType)}
                          <span className="capitalize">{request.leaveType}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{new Date(request.startDate).toLocaleDateString()}</div>
                          <div className="text-muted-foreground">to {new Date(request.endDate).toLocaleDateString()}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{request.totalDays} days</Badge>
                      </TableCell>
                      <TableCell>{new Date(request.appliedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(request.status)}
                          <Badge className={getStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {request.status === "pending" && (
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedRequest(request);
                                setShowApprovalDialog(true);
                              }}
                            >
                              Review
                            </Button>
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

        <TabsContent value="balances" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Leave Balances</CardTitle>
              <CardDescription>
                Current leave entitlements and usage for all employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Vacation Leave</TableHead>
                    <TableHead>Sick Leave</TableHead>
                    <TableHead>Personal Leave</TableHead>
                    <TableHead>Total Remaining</TableHead>
                    <TableHead>Usage %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveBalances.map((balance) => (
                    <TableRow key={balance.employeeId}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {balance.employeeName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{balance.employeeName}</div>
                            <div className="text-sm text-muted-foreground">{balance.department}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{balance.vacation.remaining}/{balance.vacation.allocated} days</div>
                          <Progress value={(balance.vacation.used / balance.vacation.allocated) * 100} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{balance.sick.remaining}/{balance.sick.allocated} days</div>
                          <Progress value={(balance.sick.used / balance.sick.allocated) * 100} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{balance.personal.remaining}/{balance.personal.allocated} days</div>
                          <Progress value={(balance.personal.used / balance.personal.allocated) * 100} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-green-600">
                          {balance.totalRemaining} days
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {Math.round((balance.totalUsed / balance.totalAllocated) * 100)}%
                        </div>
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
                <CardTitle>Calendar Navigation</CardTitle>
                <CardDescription>Select dates to view leave information</CardDescription>
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
                <CardTitle>Leave Calendar View</CardTitle>
                <CardDescription>
                  Visual representation of leave schedules
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
                          <div className="w-2 h-2 bg-blue-500 rounded-full" title="Vacation"></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full" title="Sick"></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full" title="Personal"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Vacation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Sick Leave</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>Personal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                      <span>Maternity/Paternity</span>
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
                <CardTitle>Leave Usage by Department</CardTitle>
                <CardDescription>
                  Department-wise leave consumption analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Engineering", "Design", "Marketing", "Sales", "HR"].map((dept) => (
                    <div key={dept} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{dept}</span>
                        <span className="font-medium">72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leave Type Distribution</CardTitle>
                <CardDescription>
                  Breakdown of leave types requested
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Plane className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Vacation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Sick Leave</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Personal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                      </div>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Leave Request</DialogTitle>
            <DialogDescription>
              Review and approve or reject the leave request
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Employee</Label>
                  <p className="text-sm text-muted-foreground">{selectedRequest.employeeName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Leave Type</Label>
                  <p className="text-sm text-muted-foreground capitalize">{selectedRequest.leaveType}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Duration</Label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedRequest.startDate).toLocaleDateString()} - {new Date(selectedRequest.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Total Days</Label>
                  <p className="text-sm text-muted-foreground">{selectedRequest.totalDays} days</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Reason</Label>
                <p className="text-sm text-muted-foreground">{selectedRequest.reason}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="comments">Comments (Optional)</Label>
                <Textarea
                  id="comments"
                  value={approvalComments}
                  onChange={(e) => setApprovalComments(e.target.value)}
                  placeholder="Add any comments for the employee..."
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowApprovalDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedRequest && approveLeave(selectedRequest.id, "rejected")}
            >
              <X className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button
              onClick={() => selectedRequest && approveLeave(selectedRequest.id, "approved")}
            >
              <Check className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeaveManagement;
