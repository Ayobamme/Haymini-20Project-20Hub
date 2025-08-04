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
  CalendarIcon,
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
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [inviteData, setInviteData] = useState({
    email: "",
    name: "",
    department: "",
    position: "",
    message: "",
  });

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    priority: "medium",
    dueDate: "",
    teamMembers: [],
    department: "",
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

  const createProject = () => {
    if (!newProject.name || !newProject.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in project name and description.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Project Created",
      description: `Project "${newProject.name}" has been created successfully.`,
    });

    setShowProjectDialog(false);
    setNewProject({
      name: "",
      description: "",
      priority: "medium",
      dueDate: "",
      teamMembers: [],
      department: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-lg text-slate-600">
              Welcome back! Here's what's happening with your projects and team
              members.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 shadow-lg">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite Team Member
                </Button>
              </DialogTrigger>
              <DialogContent className="border-0 shadow-2xl bg-gradient-to-br from-white to-slate-50">
                <DialogHeader>
                  <DialogTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Invite Team Member
                  </DialogTitle>
                  <DialogDescription className="text-slate-600">
                    Send an invitation to join your organization
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-slate-700 font-medium">Full Name *</Label>
                      <Input
                        id="name"
                        value={inviteData.name}
                        onChange={(e) =>
                          setInviteData({ ...inviteData, name: e.target.value })
                        }
                        placeholder="Enter full name"
                        className="border-2 border-slate-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-slate-700 font-medium">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={inviteData.email}
                        onChange={(e) =>
                          setInviteData({ ...inviteData, email: e.target.value })
                        }
                        placeholder="Enter email address"
                        className="border-2 border-slate-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="department" className="text-slate-700 font-medium">Department</Label>
                      <Select
                        value={inviteData.department}
                        onValueChange={(value) =>
                          setInviteData({ ...inviteData, department: value })
                        }
                      >
                        <SelectTrigger className="border-2 border-slate-200 focus:border-purple-400">
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
                      <Label htmlFor="position" className="text-slate-700 font-medium">Position</Label>
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
                        className="border-2 border-slate-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-slate-700 font-medium">Welcome Message (Optional)</Label>
                    <Textarea
                      id="message"
                      value={inviteData.message}
                      onChange={(e) =>
                        setInviteData({ ...inviteData, message: e.target.value })
                      }
                      placeholder="Add a personal welcome message..."
                      rows={3}
                      className="border-2 border-slate-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowInviteDialog(false)}
                    className="border-2 border-slate-300 hover:bg-slate-100"
                  >
                    Cancel
                  </Button>
                  <Button onClick={sendInvitation} className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0">
                    <Send className="h-4 w-4 mr-2" />
                    Send Invitation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg">
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl border-0 shadow-2xl bg-gradient-to-br from-white to-slate-50">
                <DialogHeader>
                  <DialogTitle className="text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Create New Project
                  </DialogTitle>
                  <DialogDescription className="text-slate-600">
                    Set up a new project with team members and timeline
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="projectName" className="text-slate-700 font-medium">Project Name *</Label>
                      <Input
                        id="projectName"
                        value={newProject.name}
                        onChange={(e) =>
                          setNewProject({ ...newProject, name: e.target.value })
                        }
                        placeholder="Enter project name"
                        className="border-2 border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="description" className="text-slate-700 font-medium">Description *</Label>
                      <Textarea
                        id="description"
                        value={newProject.description}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            description: e.target.value,
                          })
                        }
                        placeholder="Describe the project objectives and scope..."
                        rows={3}
                        className="border-2 border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="priority" className="text-slate-700 font-medium">Priority</Label>
                      <Select
                        value={newProject.priority}
                        onValueChange={(value) =>
                          setNewProject({ ...newProject, priority: value })
                        }
                      >
                        <SelectTrigger className="border-2 border-slate-200 focus:border-emerald-400">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dueDate" className="text-slate-700 font-medium">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newProject.dueDate}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            dueDate: e.target.value,
                          })
                        }
                        className="border-2 border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="department" className="text-slate-700 font-medium">Department</Label>
                      <Select
                        value={newProject.department}
                        onValueChange={(value) =>
                          setNewProject({ ...newProject, department: value })
                        }
                      >
                        <SelectTrigger className="border-2 border-slate-200 focus:border-emerald-400">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowProjectDialog(false)}
                    className="border-2 border-slate-300 hover:bg-slate-100"
                  >
                    Cancel
                  </Button>
                  <Button onClick={createProject} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0">
                    <FolderKanban className="h-4 w-4 mr-2" />
                    Create Project
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Key Metrics - Enhanced with HR Data */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">
                Total Projects
              </CardTitle>
              <FolderKanban className="h-8 w-8 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">45</div>
              <p className="text-blue-100 text-sm">
                <span className="text-white font-semibold">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-100">Team Members</CardTitle>
              <Users className="h-8 w-8 text-emerald-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {hrSummaryData.totalEmployees}
              </div>
              <p className="text-emerald-100 text-sm">
                <span className="text-white font-semibold">+3</span> new this month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Present Today</CardTitle>
              <UserCheck className="h-8 w-8 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {hrSummaryData.presentToday}
              </div>
              <p className="text-green-100 text-sm">
                <span className="text-white font-semibold">
                  {hrSummaryData.averageAttendanceRate}%
                </span>{" "}
                attendance rate
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-500 to-violet-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">
                Monthly Payroll
              </CardTitle>
              <DollarSign className="h-8 w-8 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ₦{(hrSummaryData.monthlyPayrollCost / 1000000).toFixed(1)}M
              </div>
              <p className="text-purple-100 text-sm">
                <span className="text-white font-semibold">
                  {hrSummaryData.pendingLeaveRequests}
                </span>{" "}
                pending leave requests
              </p>
            </CardContent>
          </Card>
        </div>

        {/* HR Analytics Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-cyan-100">
                On Leave Today
              </CardTitle>
              <CalendarDays className="h-8 w-8 text-cyan-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {hrSummaryData.onLeaveToday}
              </div>
              <p className="text-cyan-100 text-sm">
                Top type:{" "}
                <span className="text-white font-semibold">
                  {hrSummaryData.topLeaveType}
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-500 to-orange-500 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-100">Late Today</CardTitle>
              <Clock className="h-8 w-8 text-amber-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {hrSummaryData.lateToday}
              </div>
              <p className="text-amber-100 text-sm">
                <span className="text-white font-semibold">-50%</span> from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-rose-500 to-pink-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rose-100">
                Pending Leaves
              </CardTitle>
              <AlertTriangle className="h-8 w-8 text-rose-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {hrSummaryData.pendingLeaveRequests}
              </div>
              <p className="text-rose-100 text-sm">Requires approval</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-indigo-100">
                Attendance Rate
              </CardTitle>
              <TrendingUp className="h-8 w-8 text-indigo-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {hrSummaryData.averageAttendanceRate}%
              </div>
              <p className="text-indigo-100 text-sm">
                <span className="text-white font-semibold">+2%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Charts Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Attendance Overview Chart */}
          <Card className="col-span-2 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
              <CardTitle className="text-xl">Attendance Overview</CardTitle>
              <CardDescription className="text-emerald-100">
                Monthly attendance tracking with leave integration
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
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
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-t-lg">
              <CardTitle className="text-xl">Leave Distribution</CardTitle>
              <CardDescription className="text-purple-100">Types of leave requests</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
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
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-t-lg">
            <CardTitle className="text-xl">Payroll Analysis</CardTitle>
            <CardDescription className="text-blue-100">
              Monthly payroll breakdown and cost analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
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
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
              <div className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Department Attendance</CardTitle>
                  <CardDescription className="text-orange-100">Attendance rates by department</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/20">
                  <Link to="/attendance">View Details</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
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
                        className={
                          dept.rate >= 95
                            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0"
                            : dept.rate >= 90
                              ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
                              : "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
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
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-t-lg">
              <div className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Recent Projects</CardTitle>
                  <CardDescription className="text-teal-100">
                    Latest project updates and progress
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/20">
                  <Link to="/projects">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center space-x-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">
                          {project.name}
                        </p>
                        <Badge
                          className={
                            project.priority === "High"
                              ? "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
                              : project.priority === "Medium"
                                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
                                : "bg-gradient-to-r from-green-500 to-green-600 text-white border-0"
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
                              <AvatarFallback className="text-xs bg-gradient-to-r from-indigo-400 to-purple-500 text-white">
                                {member}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <Badge variant="outline" className="border-2 border-slate-300">{project.status}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Tasks */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
          <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-t-lg">
            <div className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Upcoming Tasks</CardTitle>
                <CardDescription className="text-violet-100">Tasks requiring attention</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/20">
                <Link to="/tasks">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-slate-50 to-white border border-slate-200 hover:shadow-md transition-all duration-200">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">
                        {task.title}
                      </p>
                      <Badge
                        className={
                          task.priority === "High"
                            ? "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
                            : task.priority === "Medium"
                              ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
                              : "bg-gradient-to-r from-green-500 to-green-600 text-white border-0"
                        }
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {task.project}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-3 w-3" />
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
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription className="text-indigo-100">Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-6">
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 border-2 border-emerald-200 hover:bg-emerald-50"
                onClick={() => setShowProjectDialog(true)}
              >
                <FolderKanban className="h-6 w-6 text-emerald-600" />
                <span className="text-emerald-700">Create Project</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 border-2 border-purple-200 hover:bg-purple-50"
                onClick={() => setShowInviteDialog(true)}
              >
                <UserPlus className="h-6 w-6 text-purple-600" />
                <span className="text-purple-700">Invite Team Member</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 border-2 border-green-200 hover:bg-green-50" asChild>
                <Link to="/attendance">
                  <UserCheck className="h-6 w-6 text-green-600" />
                  <span className="text-green-700">View Attendance</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 border-2 border-blue-200 hover:bg-blue-50" asChild>
                <Link to="/leave-management">
                  <CalendarDays className="h-6 w-6 text-blue-600" />
                  <span className="text-blue-700">Manage Leaves</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 border-2 border-orange-200 hover:bg-orange-50" asChild>
                <Link to="/payroll">
                  <Receipt className="h-6 w-6 text-orange-600" />
                  <span className="text-orange-700">Run Payroll</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 border-2 border-cyan-200 hover:bg-cyan-50" asChild>
                <Link to="/documents">
                  <Activity className="h-6 w-6 text-cyan-600" />
                  <span className="text-cyan-700">Upload Document</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
