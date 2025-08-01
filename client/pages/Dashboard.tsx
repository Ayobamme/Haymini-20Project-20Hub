import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  Users,
  FolderKanban,
  CheckSquare,
  TrendingUp,
  AlertTriangle,
  Calendar,
  DollarSign,
  Activity,
  Clock,
  Target,
  MoreHorizontal,
  Plus,
  UserCheck,
  CalendarDays,
  Receipt,
  CreditCard,
  Heart,
  Plane,
  Building,
  Mail,
  Send,
  UserPlus,
  BarChart3,
  FileSpreadsheet,
  Download,
  Percent,
  Timer,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

// Project data remains the same
const projectData = [
  { name: "Jan", projects: 12, completed: 8 },
  { name: "Feb", projects: 15, completed: 10 },
  { name: "Mar", projects: 18, completed: 14 },
  { name: "Apr", projects: 22, completed: 16 },
  { name: "May", projects: 25, completed: 20 },
  { name: "Jun", projects: 28, completed: 22 },
];

const taskStatusData = [
  { name: "Completed", value: 45, color: "#22c55e" },
  { name: "In Progress", value: 25, color: "#3b82f6" },
  { name: "Pending", value: 20, color: "#f59e0b" },
  { name: "Overdue", value: 10, color: "#ef4444" },
];

// Enhanced HR Analytics Data
const attendanceData = [
  { name: "Jan", present: 92, late: 5, absent: 3, onLeave: 8 },
  { name: "Feb", present: 88, late: 7, absent: 5, onLeave: 12 },
  { name: "Mar", present: 95, late: 3, absent: 2, onLeave: 6 },
  { name: "Apr", present: 90, late: 6, absent: 4, onLeave: 10 },
  { name: "May", present: 93, late: 4, absent: 3, onLeave: 8 },
  { name: "Jun", present: 96, late: 2, absent: 2, onLeave: 5 },
];

const payrollData = [
  { month: "Jan", grossPay: 12000000, deductions: 3600000, netPay: 8400000 },
  { month: "Feb", grossPay: 13000000, deductions: 3900000, netPay: 9100000 },
  { month: "Mar", grossPay: 12500000, deductions: 3750000, netPay: 8750000 },
  { month: "Apr", grossPay: 14000000, deductions: 4200000, netPay: 9800000 },
  { month: "May", grossPay: 13500000, deductions: 4050000, netPay: 9450000 },
  { month: "Jun", grossPay: 15000000, deductions: 4500000, netPay: 10500000 },
];

const leaveAnalyticsData = [
  { name: "Vacation", value: 65, color: "#3b82f6" },
  { name: "Sick Leave", value: 20, color: "#ef4444" },
  { name: "Personal", value: 10, color: "#8b5cf6" },
  { name: "Others", value: 5, color: "#6b7280" },
];

const departmentAttendanceData = [
  { department: "Engineering", rate: 96 },
  { department: "Design", rate: 94 },
  { department: "Marketing", rate: 92 },
  { department: "Sales", rate: 89 },
  { department: "HR", rate: 98 },
  { department: "Finance", rate: 95 },
];

const recentProjects = [
  {
    id: "PRJ-001",
    name: "E-commerce Platform Redesign",
    status: "In Progress",
    progress: 75,
    team: ["JD", "SM", "AL"],
    dueDate: "2024-02-15",
    priority: "High",
  },
  {
    id: "PRJ-002",
    name: "Mobile App Development",
    status: "In Progress",
    progress: 45,
    team: ["MK", "TL"],
    dueDate: "2024-03-20",
    priority: "Medium",
  },
  {
    id: "PRJ-003",
    name: "Database Migration",
    status: "Completed",
    progress: 100,
    team: ["DB", "SY"],
    dueDate: "2024-01-30",
    priority: "High",
  },
];

const upcomingTasks = [
  {
    id: "TSK-001",
    title: "Review user interface mockups",
    project: "E-commerce Platform",
    assignee: "John Doe",
    dueDate: "Today",
    priority: "High",
  },
  {
    id: "TSK-002",
    title: "Implement payment gateway",
    project: "Mobile App Development",
    assignee: "Sarah Miller",
    dueDate: "Tomorrow",
    priority: "High",
  },
  {
    id: "TSK-003",
    title: "Content strategy meeting",
    project: "Marketing Campaign",
    assignee: "Mike Johnson",
    dueDate: "Jan 28",
    priority: "Medium",
  },
];

// New HR summary data
const hrSummaryData = {
  totalEmployees: 52,
  presentToday: 48,
  onLeaveToday: 3,
  lateToday: 1,
  pendingLeaveRequests: 5,
  monthlyPayrollCost: 15000000,
  averageAttendanceRate: 94,
  topLeaveType: "Vacation",
};

export default function Dashboard() {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteData, setInviteData] = useState({
    email: "",
    name: "",
    department: "",
    position: "",
    message: "",
  });

  const sendInvitation = () => {
    if (!inviteData.email || !inviteData.name) {
      toast({
        title: "Missing Information",
        description: "Please fill in email and name fields.",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, this would send an actual email invitation
    toast({
      title: "Invitation Sent",
      description: `Invitation sent to ${inviteData.name} at ${inviteData.email}`,
    });

    setShowInviteDialog(false);
    setInviteData({
      email: "",
      name: "",
      department: "",
      position: "",
      message: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your projects and team
            members.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Team Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to join your organization
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={inviteData.name}
                      onChange={(e) =>
                        setInviteData({ ...inviteData, name: e.target.value })
                      }
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={inviteData.email}
                      onChange={(e) =>
                        setInviteData({ ...inviteData, email: e.target.value })
                      }
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={inviteData.department}
                      onValueChange={(value) =>
                        setInviteData({ ...inviteData, department: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="HR">Human Resources</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={inviteData.position}
                      onChange={(e) =>
                        setInviteData({
                          ...inviteData,
                          position: e.target.value,
                        })
                      }
                      placeholder="Job position"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Welcome Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={inviteData.message}
                    onChange={(e) =>
                      setInviteData({ ...inviteData, message: e.target.value })
                    }
                    placeholder="Add a personal welcome message..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowInviteDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={sendInvitation}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Invitation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Key Metrics - Enhanced with HR Data */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {hrSummaryData.totalEmployees}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {hrSummaryData.presentToday}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">
                {hrSummaryData.averageAttendanceRate}%
              </span>{" "}
              attendance rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Payroll
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{(hrSummaryData.monthlyPayrollCost / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">
                {hrSummaryData.pendingLeaveRequests}
              </span>{" "}
              pending leave requests
            </p>
          </CardContent>
        </Card>
      </div>

      {/* HR Analytics Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              On Leave Today
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {hrSummaryData.onLeaveToday}
            </div>
            <p className="text-xs text-muted-foreground">
              Top type:{" "}
              <span className="text-blue-600">
                {hrSummaryData.topLeaveType}
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {hrSummaryData.lateToday}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-50%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Leaves
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {hrSummaryData.pendingLeaveRequests}
            </div>
            <p className="text-xs text-muted-foreground">Requires approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Attendance Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {hrSummaryData.averageAttendanceRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Attendance Overview Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>
              Monthly attendance tracking with leave integration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="present"
                  stackId="1"
                  stroke="#22c55e"
                  fill="#22c55e"
                  name="Present"
                />
                <Area
                  type="monotone"
                  dataKey="late"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  name="Late"
                />
                <Area
                  type="monotone"
                  dataKey="onLeave"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  name="On Leave"
                />
                <Area
                  type="monotone"
                  dataKey="absent"
                  stackId="1"
                  stroke="#ef4444"
                  fill="#ef4444"
                  name="Absent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Leave Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Leave Distribution</CardTitle>
            <CardDescription>Types of leave requests</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leaveAnalyticsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {leaveAnalyticsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {leaveAnalyticsData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll Analysis</CardTitle>
          <CardDescription>
            Monthly payroll breakdown and cost analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={payrollData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [
                  `₦${((value as number) / 1000000).toFixed(1)}M`,
                  "",
                ]}
              />
              <Bar
                dataKey="grossPay"
                fill="#3b82f6"
                name="Gross Pay"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="deductions"
                fill="#ef4444"
                name="Deductions"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="netPay"
                fill="#22c55e"
                name="Net Pay"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Department Attendance and Recent Projects */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Department Attendance Rates */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Department Attendance</CardTitle>
              <CardDescription>Attendance rates by department</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/attendance">View Details</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentAttendanceData.map((dept) => (
                <div key={dept.department} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {dept.department}
                      </span>
                    </div>
                    <Badge
                      variant={
                        dept.rate >= 95
                          ? "default"
                          : dept.rate >= 90
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {dept.rate}%
                    </Badge>
                  </div>
                  <Progress value={dept.rate} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>
                Latest project updates and progress
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/projects">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">
                        {project.name}
                      </p>
                      <Badge
                        variant={
                          project.priority === "High"
                            ? "destructive"
                            : project.priority === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {project.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{project.id}</span>
                      <span>•</span>
                      <span>Due {project.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={project.progress} className="flex-1" />
                      <span className="text-sm font-medium">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {project.team.map((member, index) => (
                          <Avatar
                            key={index}
                            className="h-6 w-6 border-2 border-background"
                          >
                            <AvatarFallback className="text-xs">
                              {member}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <Badge variant="outline">{project.status}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Tasks */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Tasks requiring attention</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/tasks">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-start space-x-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">
                      {task.title}
                    </p>
                    <Badge
                      variant={
                        task.priority === "High"
                          ? "destructive"
                          : task.priority === "Medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {task.project}
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{task.dueDate}</span>
                    <span>•</span>
                    <span>{task.assignee}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions - Enhanced */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-6">
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link to="/projects">
                <FolderKanban className="h-6 w-6" />
                <span>Create Project</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => setShowInviteDialog(true)}
            >
              <UserPlus className="h-6 w-6" />
              <span>Invite Team Member</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link to="/attendance">
                <UserCheck className="h-6 w-6" />
                <span>View Attendance</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link to="/leave-management">
                <CalendarDays className="h-6 w-6" />
                <span>Manage Leaves</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link to="/payroll">
                <Receipt className="h-6 w-6" />
                <span>Run Payroll</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link to="/documents">
                <Activity className="h-6 w-6" />
                <span>Upload Document</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
