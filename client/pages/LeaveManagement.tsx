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
  Download,
  FileSpreadsheet,
  BarChart3,
  TrendingUp,
  Edit,
  Settings,
  Mail,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType:
    | "vacation"
    | "sick"
    | "personal"
    | "maternity"
    | "paternity"
    | "bereavement"
    | "study";
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  comments?: string;
  contractType?: string;
  urgency: "low" | "medium" | "high";
}

interface LeaveBalance {
  employeeId: string;
  employeeName: string;
  department: string;
  contractType: string;
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
  noticeRequired: number;
  department?: string;
  contractType?: string;
  employeeLevel?: string;
  description: string;
  isActive: boolean;
}

interface LeaveAnalytics {
  mostUsedLeaveType: string;
  averageLeaveDays: number;
  topLeaveUsers: Array<{
    employeeName: string;
    totalDays: number;
    leaveType: string;
  }>;
  departmentUsage: Array<{
    department: string;
    usage: number;
    percentage: number;
  }>;
  seasonalTrends: Array<{
    month: string;
    requests: number;
  }>;
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
      contractType: "permanent",
      urgency: "low",
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
      contractType: "permanent",
      urgency: "high",
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
      contractType: "contract",
      urgency: "medium",
    },
  ]);

  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>([
    {
      employeeId: "EMP-001",
      employeeName: "John Doe",
      department: "Engineering",
      contractType: "permanent",
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
      contractType: "permanent",
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
      contractType: "permanent",
      description: "Annual vacation leave for permanent employees",
      isActive: true,
    },
    {
      id: "POL-002",
      leaveType: "sick",
      annualAllocation: 12,
      maxConsecutive: 10,
      carryForward: 0,
      noticeRequired: 0,
      description: "Sick leave for all employees",
      isActive: true,
    },
    {
      id: "POL-003",
      leaveType: "personal",
      annualAllocation: 5,
      maxConsecutive: 3,
      carryForward: 0,
      noticeRequired: 3,
      contractType: "permanent",
      description: "Personal leave for permanent employees",
      isActive: true,
    },
    {
      id: "POL-004",
      leaveType: "vacation",
      annualAllocation: 15,
      maxConsecutive: 10,
      carryForward: 2,
      noticeRequired: 7,
      contractType: "contract",
      description: "Annual vacation leave for contract employees",
      isActive: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showPolicyDialog, setShowPolicyDialog] = useState(false);
  const [showAnalyticsDialog, setShowAnalyticsDialog] = useState(false);
  const [showNewPolicyDialog, setShowNewPolicyDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(
    null,
  );
  const [editingPolicy, setEditingPolicy] = useState<LeavePolicy | null>(null);
  const [approvalComments, setApprovalComments] = useState("");

  const [newPolicy, setNewPolicy] = useState<Partial<LeavePolicy>>({
    leaveType: "",
    annualAllocation: 0,
    maxConsecutive: 0,
    carryForward: 0,
    noticeRequired: 0,
    contractType: "",
    department: "",
    description: "",
    isActive: true,
  });

  const approveLeave = (requestId: string, action: "approved" | "rejected") => {
    const updatedRequests = leaveRequests.map((request) => {
      if (request.id === requestId) {
        const updatedRequest = {
          ...request,
          status: action,
          approvedBy: "Admin User",
          approvedDate: new Date().toISOString().split("T")[0],
          comments: approvalComments,
        };

        // If approved, automatically update attendance system with leave
        if (action === "approved") {
          // This would integrate with the attendance system
          // to mark the days as "on_leave" or "vacation"
          console.log(
            "Updating attendance system for approved leave:",
            updatedRequest,
          );
        }

        return updatedRequest;
      }
      return request;
    });

    setLeaveRequests(updatedRequests);

    toast({
      title: `Leave ${action}`,
      description: `Leave request has been ${action}.`,
    });

    setShowApprovalDialog(false);
    setSelectedRequest(null);
    setApprovalComments("");
  };

  const savePolicy = () => {
    if (!newPolicy.leaveType || !newPolicy.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const policy: LeavePolicy = {
      id: editingPolicy ? editingPolicy.id : `POL-${Date.now()}`,
      ...newPolicy,
    } as LeavePolicy;

    if (editingPolicy) {
      setLeavePolicies((policies) =>
        policies.map((p) => (p.id === editingPolicy.id ? policy : p)),
      );
      toast({
        title: "Policy Updated",
        description: "Leave policy has been updated successfully.",
      });
    } else {
      setLeavePolicies((policies) => [...policies, policy]);
      toast({
        title: "Policy Created",
        description: "New leave policy has been created successfully.",
      });
    }

    setShowNewPolicyDialog(false);
    setEditingPolicy(null);
    setNewPolicy({
      leaveType: "",
      annualAllocation: 0,
      maxConsecutive: 0,
      carryForward: 0,
      noticeRequired: 0,
      contractType: "",
      department: "",
      description: "",
      isActive: true,
    });
  };

  const editPolicy = (policy: LeavePolicy) => {
    setEditingPolicy(policy);
    setNewPolicy(policy);
    setShowNewPolicyDialog(true);
  };

  const generateLeaveAnalytics = (): LeaveAnalytics => {
    const leaveTypeCounts = leaveRequests.reduce(
      (acc, request) => {
        acc[request.leaveType] = (acc[request.leaveType] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const mostUsedLeaveType =
      Object.entries(leaveTypeCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ||
      "vacation";

    const totalDays = leaveRequests.reduce(
      (sum, request) => sum + request.totalDays,
      0,
    );
    const averageLeaveDays = totalDays / leaveRequests.length || 0;

    const topLeaveUsers = leaveRequests
      .reduce(
        (acc, request) => {
          const existing = acc.find(
            (item) => item.employeeName === request.employeeName,
          );
          if (existing) {
            existing.totalDays += request.totalDays;
          } else {
            acc.push({
              employeeName: request.employeeName,
              totalDays: request.totalDays,
              leaveType: request.leaveType,
            });
          }
          return acc;
        },
        [] as Array<{
          employeeName: string;
          totalDays: number;
          leaveType: string;
        }>,
      )
      .sort((a, b) => b.totalDays - a.totalDays)
      .slice(0, 5);

    const departmentUsage = leaveRequests
      .reduce(
        (acc, request) => {
          const existing = acc.find(
            (item) => item.department === request.department,
          );
          if (existing) {
            existing.usage += request.totalDays;
          } else {
            acc.push({
              department: request.department,
              usage: request.totalDays,
              percentage: 0,
            });
          }
          return acc;
        },
        [] as Array<{ department: string; usage: number; percentage: number }>,
      )
      .map((item) => ({
        ...item,
        percentage: Math.round((item.usage / totalDays) * 100),
      }));

    const seasonalTrends = [
      { month: "Jan", requests: 15 },
      { month: "Feb", requests: 12 },
      { month: "Mar", requests: 18 },
      { month: "Apr", requests: 22 },
      { month: "May", requests: 19 },
      { month: "Jun", requests: 25 },
      { month: "Jul", requests: 28 },
      { month: "Aug", requests: 26 },
      { month: "Sep", requests: 16 },
      { month: "Oct", requests: 14 },
      { month: "Nov", requests: 13 },
      { month: "Dec", requests: 20 },
    ];

    return {
      mostUsedLeaveType,
      averageLeaveDays,
      topLeaveUsers,
      departmentUsage,
      seasonalTrends,
    };
  };

  const exportToExcel = (data: any[], filename: string) => {
    toast({
      title: "Exporting to Excel",
      description: `${filename} is being exported to Excel format...`,
    });
  };

  const exportToGoogleSheets = (data: any[], filename: string) => {
    toast({
      title: "Exporting to Google Sheets",
      description: `${filename} is being exported to Google Sheets...`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "cancelled":
        return <X className="h-4 w-4 text-gray-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getLeaveTypeIcon = (type: string) => {
    switch (type) {
      case "vacation":
        return <Plane className="h-4 w-4 text-blue-500" />;
      case "sick":
        return <Heart className="h-4 w-4 text-red-500" />;
      case "personal":
        return <User className="h-4 w-4 text-purple-500" />;
      case "maternity":
        return <Home className="h-4 w-4 text-pink-500" />;
      case "paternity":
        return <Home className="h-4 w-4 text-blue-500" />;
      case "bereavement":
        return <Heart className="h-4 w-4 text-gray-500" />;
      case "study":
        return <GraduationCap className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRequests = leaveRequests.filter((request) => {
    const matchesSearch =
      request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    const matchesType =
      typeFilter === "all" || request.leaveType === typeFilter;
    const matchesDepartment =
      departmentFilter === "all" || request.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesType && matchesDepartment;
  });

  const pendingCount = leaveRequests.filter(
    (r) => r.status === "pending",
  ).length;
  const approvedToday = leaveRequests.filter(
    (r) =>
      r.status === "approved" &&
      r.approvedDate === new Date().toISOString().split("T")[0],
  ).length;
  const onLeaveToday = leaveRequests.filter((r) => {
    const today = new Date().toISOString().split("T")[0];
    return (
      r.status === "approved" && r.startDate <= today && r.endDate >= today
    );
  }).length;

  const analytics = generateLeaveAnalytics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Leave Management
          </h1>
          <p className="text-muted-foreground">
            Manage employee leave requests, approvals, and leave policies with
            attendance integration
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog
            open={showAnalyticsDialog}
            onOpenChange={setShowAnalyticsDialog}
          >
            <DialogTrigger asChild>
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Leave Analytics</DialogTitle>
                <DialogDescription>
                  Comprehensive analytics on leave usage patterns and trends
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-blue-600">
                        {analytics.mostUsedLeaveType}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Most Used Leave Type
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-green-600">
                        {analytics.averageLeaveDays.toFixed(1)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Average Leave Days
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-purple-600">
                        {analytics.topLeaveUsers.length}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Active Leave Users
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Leave Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analytics.topLeaveUsers.map((user, index) => (
                          <div
                            key={user.employeeName}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="w-6 h-6 p-0 text-xs"
                              >
                                {index + 1}
                              </Badge>
                              <span className="text-sm">
                                {user.employeeName}
                              </span>
                            </div>
                            <div className="text-sm font-medium">
                              {user.totalDays} days
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Department Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analytics.departmentUsage.map((dept) => (
                          <div key={dept.department} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{dept.department}</span>
                              <span className="font-medium">
                                {dept.percentage}%
                              </span>
                            </div>
                            <Progress value={dept.percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() =>
                      exportToExcel(analytics.topLeaveUsers, "leave-analytics")
                    }
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Export to Excel
                  </Button>
                  <Button
                    onClick={() =>
                      exportToGoogleSheets(
                        analytics.departmentUsage,
                        "department-leave-usage",
                      )
                    }
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Export to Google Sheets
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setShowAnalyticsDialog(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showPolicyDialog} onOpenChange={setShowPolicyDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Leave Policies
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle>Leave Policies Management</DialogTitle>
                    <DialogDescription>
                      Configure leave policies and entitlements for different
                      departments and contracts
                    </DialogDescription>
                  </div>
                  <Dialog
                    open={showNewPolicyDialog}
                    onOpenChange={setShowNewPolicyDialog}
                  >
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Policy
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {editingPolicy ? "Edit" : "Create"} Leave Policy
                        </DialogTitle>
                        <DialogDescription>
                          Configure leave policy settings for specific groups
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Leave Type</Label>
                            <Select
                              value={newPolicy.leaveType}
                              onValueChange={(value) =>
                                setNewPolicy({ ...newPolicy, leaveType: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select leave type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="vacation">
                                  Vacation
                                </SelectItem>
                                <SelectItem value="sick">Sick Leave</SelectItem>
                                <SelectItem value="personal">
                                  Personal
                                </SelectItem>
                                <SelectItem value="maternity">
                                  Maternity
                                </SelectItem>
                                <SelectItem value="paternity">
                                  Paternity
                                </SelectItem>
                                <SelectItem value="bereavement">
                                  Bereavement
                                </SelectItem>
                                <SelectItem value="study">
                                  Study Leave
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Contract Type</Label>
                            <Select
                              value={newPolicy.contractType}
                              onValueChange={(value) =>
                                setNewPolicy({
                                  ...newPolicy,
                                  contractType: value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select contract type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="">All Contracts</SelectItem>
                                <SelectItem value="permanent">
                                  Permanent
                                </SelectItem>
                                <SelectItem value="contract">
                                  Contract
                                </SelectItem>
                                <SelectItem value="intern">Intern</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Department</Label>
                            <Select
                              value={newPolicy.department}
                              onValueChange={(value) =>
                                setNewPolicy({
                                  ...newPolicy,
                                  department: value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select department" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="">
                                  All Departments
                                </SelectItem>
                                <SelectItem value="Engineering">
                                  Engineering
                                </SelectItem>
                                <SelectItem value="Design">Design</SelectItem>
                                <SelectItem value="Marketing">
                                  Marketing
                                </SelectItem>
                                <SelectItem value="Sales">Sales</SelectItem>
                                <SelectItem value="HR">HR</SelectItem>
                                <SelectItem value="Finance">Finance</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Annual Allocation (days)</Label>
                            <Input
                              type="number"
                              value={newPolicy.annualAllocation}
                              onChange={(e) =>
                                setNewPolicy({
                                  ...newPolicy,
                                  annualAllocation:
                                    parseInt(e.target.value) || 0,
                                })
                              }
                              placeholder="Annual allocation"
                            />
                          </div>
                          <div>
                            <Label>Max Consecutive Days</Label>
                            <Input
                              type="number"
                              value={newPolicy.maxConsecutive}
                              onChange={(e) =>
                                setNewPolicy({
                                  ...newPolicy,
                                  maxConsecutive: parseInt(e.target.value) || 0,
                                })
                              }
                              placeholder="Max consecutive days"
                            />
                          </div>
                          <div>
                            <Label>Carry Forward (days)</Label>
                            <Input
                              type="number"
                              value={newPolicy.carryForward}
                              onChange={(e) =>
                                setNewPolicy({
                                  ...newPolicy,
                                  carryForward: parseInt(e.target.value) || 0,
                                })
                              }
                              placeholder="Carry forward days"
                            />
                          </div>
                          <div>
                            <Label>Notice Required (days)</Label>
                            <Input
                              type="number"
                              value={newPolicy.noticeRequired}
                              onChange={(e) =>
                                setNewPolicy({
                                  ...newPolicy,
                                  noticeRequired: parseInt(e.target.value) || 0,
                                })
                              }
                              placeholder="Notice required"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={newPolicy.description}
                            onChange={(e) =>
                              setNewPolicy({
                                ...newPolicy,
                                description: e.target.value,
                              })
                            }
                            placeholder="Policy description"
                            rows={3}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowNewPolicyDialog(false);
                            setEditingPolicy(null);
                            setNewPolicy({
                              leaveType: "",
                              annualAllocation: 0,
                              maxConsecutive: 0,
                              carryForward: 0,
                              noticeRequired: 0,
                              contractType: "",
                              department: "",
                              description: "",
                              isActive: true,
                            });
                          }}
                        >
                          Cancel
                        </Button>
                        <Button onClick={savePolicy}>
                          {editingPolicy ? "Update" : "Create"} Policy
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Leave Type</TableHead>
                      <TableHead>Contract Type</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Annual Allocation</TableHead>
                      <TableHead>Max Consecutive</TableHead>
                      <TableHead>Carry Forward</TableHead>
                      <TableHead>Notice Required</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leavePolicies.map((policy) => (
                      <TableRow key={policy.id}>
                        <TableCell className="capitalize font-medium">
                          <div className="flex items-center gap-2">
                            {getLeaveTypeIcon(policy.leaveType)}
                            {policy.leaveType}
                          </div>
                        </TableCell>
                        <TableCell>{policy.contractType || "All"}</TableCell>
                        <TableCell>{policy.department || "All"}</TableCell>
                        <TableCell>{policy.annualAllocation} days</TableCell>
                        <TableCell>{policy.maxConsecutive} days</TableCell>
                        <TableCell>{policy.carryForward} days</TableCell>
                        <TableCell>{policy.noticeRequired} days</TableCell>
                        <TableCell>
                          <Badge
                            variant={policy.isActive ? "default" : "secondary"}
                          >
                            {policy.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => editPolicy(policy)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <DialogFooter>
                <Button onClick={() => setShowPolicyDialog(false)}>
                  Close
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
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Requests
                </p>
                <div className="text-2xl font-bold text-yellow-600">
                  {pendingCount}
                </div>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Approved Today
                </p>
                <div className="text-2xl font-bold text-green-600">
                  {approvedToday}
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
                  On Leave Today
                </p>
                <div className="text-2xl font-bold text-blue-600">
                  {onLeaveToday}
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
                  Average Leave Days
                </p>
                <div className="text-2xl font-bold text-purple-600">
                  {analytics.averageLeaveDays.toFixed(1)}
                </div>
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
                    <SelectItem value="HR">HR</SelectItem>
                  </SelectContent>
                </Select>
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
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Leave Requests</CardTitle>
                  <CardDescription>
                    Review and manage employee leave requests with attendance
                    integration
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      exportToExcel(filteredRequests, "leave-requests")
                    }
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Excel
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      exportToGoogleSheets(filteredRequests, "leave-requests")
                    }
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Sheets
                  </Button>
                </div>
              </div>
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
                    <TableHead>Urgency</TableHead>
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
                              {request.employeeName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {request.employeeName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {request.department}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getLeaveTypeIcon(request.leaveType)}
                          <span className="capitalize">
                            {request.leaveType}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>
                            {new Date(request.startDate).toLocaleDateString()}
                          </div>
                          <div className="text-muted-foreground">
                            to {new Date(request.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {request.totalDays} days
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(request.appliedDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={getUrgencyColor(request.urgency)}>
                          {request.urgency}
                        </Badge>
                      </TableCell>
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
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Employee Leave Balances</CardTitle>
                  <CardDescription>
                    Current leave entitlements and usage for all employees
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportToExcel(leaveBalances, "leave-balances")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Contract Type</TableHead>
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
                              {balance.employeeName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {balance.employeeName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {balance.department}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {balance.contractType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            {balance.vacation.remaining}/
                            {balance.vacation.allocated} days
                          </div>
                          <Progress
                            value={
                              (balance.vacation.used /
                                balance.vacation.allocated) *
                              100
                            }
                            className="h-1"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            {balance.sick.remaining}/{balance.sick.allocated}{" "}
                            days
                          </div>
                          <Progress
                            value={
                              (balance.sick.used / balance.sick.allocated) * 100
                            }
                            className="h-1"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            {balance.personal.remaining}/
                            {balance.personal.allocated} days
                          </div>
                          <Progress
                            value={
                              (balance.personal.used /
                                balance.personal.allocated) *
                              100
                            }
                            className="h-1"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-green-600">
                          {balance.totalRemaining} days
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {Math.round(
                            (balance.totalUsed / balance.totalAllocated) * 100,
                          )}
                          %
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
                <CardDescription>
                  Select dates to view leave information
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
                <CardTitle>Leave Calendar View</CardTitle>
                <CardDescription>
                  Visual representation of leave schedules integrated with
                  attendance
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
                            className="w-2 h-2 bg-blue-500 rounded-full"
                            title="Vacation"
                          ></div>
                          <div
                            className="w-2 h-2 bg-red-500 rounded-full"
                            title="Sick"
                          ></div>
                          <div
                            className="w-2 h-2 bg-purple-500 rounded-full"
                            title="Personal"
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm flex-wrap">
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
                  {analytics.departmentUsage.map((dept) => (
                    <div key={dept.department} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{dept.department}</span>
                        <span className="font-medium">{dept.percentage}%</span>
                      </div>
                      <Progress value={dept.percentage} className="h-2" />
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
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "65%" }}
                        ></div>
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
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: "20%" }}
                        ></div>
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
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: "15%" }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Export Analytics</CardTitle>
              <CardDescription>
                Export comprehensive leave analytics and reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={() =>
                    exportToExcel(analytics.topLeaveUsers, "top-leave-users")
                  }
                >
                  <div className="text-left">
                    <div className="font-medium">Top Leave Users</div>
                    <div className="text-sm text-muted-foreground">
                      Employee usage report
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={() =>
                    exportToGoogleSheets(
                      analytics.departmentUsage,
                      "department-usage",
                    )
                  }
                >
                  <div className="text-left">
                    <div className="font-medium">Department Analysis</div>
                    <div className="text-sm text-muted-foreground">
                      Usage by department
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={() =>
                    exportToExcel(analytics.seasonalTrends, "seasonal-trends")
                  }
                >
                  <div className="text-left">
                    <div className="font-medium">Seasonal Trends</div>
                    <div className="text-sm text-muted-foreground">
                      Monthly patterns
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Leave Request</DialogTitle>
            <DialogDescription>
              Review and approve or reject the leave request - approved leaves
              will automatically update attendance records
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Employee</Label>
                  <p className="text-sm text-muted-foreground">
                    {selectedRequest.employeeName}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Leave Type</Label>
                  <div className="flex items-center gap-2">
                    {getLeaveTypeIcon(selectedRequest.leaveType)}
                    <p className="text-sm text-muted-foreground capitalize">
                      {selectedRequest.leaveType}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Duration</Label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedRequest.startDate).toLocaleDateString()} -{" "}
                    {new Date(selectedRequest.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Total Days</Label>
                  <p className="text-sm text-muted-foreground">
                    {selectedRequest.totalDays} days
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Urgency</Label>
                  <Badge className={getUrgencyColor(selectedRequest.urgency)}>
                    {selectedRequest.urgency}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Contract Type</Label>
                  <p className="text-sm text-muted-foreground capitalize">
                    {selectedRequest.contractType}
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Reason</Label>
                <p className="text-sm text-muted-foreground">
                  {selectedRequest.reason}
                </p>
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
              onClick={() =>
                selectedRequest && approveLeave(selectedRequest.id, "rejected")
              }
            >
              <X className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button
              onClick={() =>
                selectedRequest && approveLeave(selectedRequest.id, "approved")
              }
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
