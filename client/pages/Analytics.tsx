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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  AreaChart,
  Area,
} from "recharts";
import {
  Download,
  FileText,
  Calendar,
  Filter,
  MoreHorizontal,
  BarChart3,
  TrendingUp,
  Users,
  FolderKanban,
  CheckSquare,
  AlertTriangle,
  Shield,
  Package,
  MessageSquare,
  Clock,
  DollarSign,
  Activity,
  Eye,
  Search,
  Printer,
  UserCheck,
} from "lucide-react";

const projectReports = {
  totalProjects: 45,
  completedProjects: 32,
  activeProjects: 13,
  avgCompletionTime: 45, // days
  budgetUtilization: 78, // percentage
  projectsByStatus: [
    { name: "Completed", value: 32, color: "#22c55e" },
    { name: "In Progress", value: 13, color: "#3b82f6" },
    { name: "Planning", value: 8, color: "#f59e0b" },
    { name: "On Hold", value: 2, color: "#ef4444" },
  ],
  monthlyData: [
    { month: "Oct", completed: 8, started: 5, budget: 125000 },
    { month: "Nov", completed: 10, started: 6, budget: 145000 },
    { month: "Dec", completed: 12, started: 8, budget: 165000 },
    { month: "Jan", completed: 14, started: 7, budget: 178000 },
  ],
};

const taskReports = {
  totalTasks: 234,
  completedTasks: 156,
  overdueTasks: 12,
  avgCompletionRate: 87,
  tasksByPriority: [
    { name: "Critical", value: 23, color: "#ef4444" },
    { name: "High", value: 45, color: "#f59e0b" },
    { name: "Medium", value: 98, color: "#3b82f6" },
    { name: "Low", value: 68, color: "#22c55e" },
  ],
};

const teamPerformance = {
  totalTeams: 8,
  activeMembers: 52,
  productivityScore: 92,
  collaboration: 88,
  teamData: [
    { team: "Frontend", productivity: 95, collaboration: 92, projects: 8 },
    { team: "Backend", productivity: 88, collaboration: 85, projects: 6 },
    { team: "Design", productivity: 92, collaboration: 94, projects: 5 },
    { team: "Marketing", productivity: 87, collaboration: 89, projects: 7 },
    { team: "QA", productivity: 91, collaboration: 88, projects: 4 },
  ],
};

const revenueData = [
  { month: "Aug", revenue: 450000, expenses: 320000, profit: 130000 },
  { month: "Sep", revenue: 520000, expenses: 340000, profit: 180000 },
  { month: "Oct", revenue: 480000, expenses: 350000, profit: 130000 },
  { month: "Nov", revenue: 620000, expenses: 380000, profit: 240000 },
  { month: "Dec", revenue: 580000, expenses: 360000, profit: 220000 },
  { month: "Jan", revenue: 720000, expenses: 420000, profit: 300000 },
];

const hrAnalytics = {
  totalEmployees: 52,
  newHires: 8,
  retentionRate: 94,
  averageSalary: 185000,
  departmentDistribution: [
    { department: "Engineering", count: 18, percentage: 35 },
    { department: "Marketing", count: 12, percentage: 23 },
    { department: "Sales", count: 8, percentage: 15 },
    { department: "Design", count: 6, percentage: 12 },
    { department: "Operations", count: 5, percentage: 10 },
    { department: "HR", count: 3, percentage: 5 },
  ],
};

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("last30days");
  const [selectedMetric, setSelectedMetric] = useState("all");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-lg text-slate-600">
              Comprehensive insights and performance metrics across all business
              areas
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[180px] border-2 border-slate-200 focus:border-violet-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
                <SelectItem value="last3months">Last 3 Months</SelectItem>
                <SelectItem value="lastyear">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 shadow-lg">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    Total Projects
                  </p>
                  <div className="text-3xl font-bold">
                    {projectReports.totalProjects}
                  </div>
                  <p className="text-blue-100 text-sm">
                    <span className="text-white font-semibold">
                      {projectReports.completedProjects}
                    </span>{" "}
                    completed
                  </p>
                </div>
                <FolderKanban className="h-10 w-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">
                    Total Tasks
                  </p>
                  <div className="text-3xl font-bold">
                    {taskReports.totalTasks}
                  </div>
                  <p className="text-emerald-100 text-sm">
                    <span className="text-white font-semibold">
                      {taskReports.avgCompletionRate}%
                    </span>{" "}
                    completion rate
                  </p>
                </div>
                <CheckSquare className="h-10 w-10 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">
                    Team Members
                  </p>
                  <div className="text-3xl font-bold">
                    {teamPerformance.activeMembers}
                  </div>
                  <p className="text-orange-100 text-sm">
                    <span className="text-white font-semibold">
                      {teamPerformance.productivityScore}%
                    </span>{" "}
                    productivity
                  </p>
                </div>
                <Users className="h-10 w-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-500 to-violet-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">
                    Monthly Revenue
                  </p>
                  <div className="text-3xl font-bold">₦720K</div>
                  <p className="text-purple-100 text-sm">
                    <span className="text-white font-semibold">+15%</span> from
                    last month
                  </p>
                </div>
                <DollarSign className="h-10 w-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl p-1 h-12">
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white rounded-lg"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white rounded-lg"
            >
              Tasks
            </TabsTrigger>
            <TabsTrigger
              value="teams"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-lg"
            >
              Teams
            </TabsTrigger>
            <TabsTrigger
              value="revenue"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-600 data-[state=active]:text-white rounded-lg"
            >
              Revenue
            </TabsTrigger>
            <TabsTrigger
              value="hr"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-600 data-[state=active]:text-white rounded-lg"
            >
              HR Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-t-lg">
                  <CardTitle className="text-xl">
                    Project Status Distribution
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Overview of all project statuses
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={projectReports.projectsByStatus}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {projectReports.projectsByStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {projectReports.projectsByStatus.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-medium">
                          {item.name}: {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
                  <CardTitle className="text-xl">
                    Monthly Project Trends
                  </CardTitle>
                  <CardDescription className="text-emerald-100">
                    Project completion and budget trends
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={projectReports.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="completed"
                        stackId="1"
                        stroke="#22c55e"
                        fill="#22c55e"
                        name="Completed"
                      />
                      <Area
                        type="monotone"
                        dataKey="started"
                        stackId="1"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        name="Started"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">
                        Budget Utilization
                      </p>
                      <div className="text-3xl font-bold">
                        {projectReports.budgetUtilization}%
                      </div>
                    </div>
                    <DollarSign className="h-10 w-10 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">
                        Avg Completion Time
                      </p>
                      <div className="text-3xl font-bold">
                        {projectReports.avgCompletionTime}
                      </div>
                      <p className="text-blue-100 text-sm">days</p>
                    </div>
                    <Clock className="h-10 w-10 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-violet-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">
                        Success Rate
                      </p>
                      <div className="text-3xl font-bold">94%</div>
                    </div>
                    <TrendingUp className="h-10 w-10 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                  <CardTitle className="text-xl">
                    Task Priority Distribution
                  </CardTitle>
                  <CardDescription className="text-orange-100">
                    Tasks categorized by priority levels
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={taskReports.tasksByPriority}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {taskReports.tasksByPriority.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-emerald-100 text-sm font-medium">
                          Completed Tasks
                        </p>
                        <div className="text-3xl font-bold">
                          {taskReports.completedTasks}
                        </div>
                      </div>
                      <CheckSquare className="h-10 w-10 text-emerald-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-pink-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-100 text-sm font-medium">
                          Overdue Tasks
                        </p>
                        <div className="text-3xl font-bold">
                          {taskReports.overdueTasks}
                        </div>
                      </div>
                      <AlertTriangle className="h-10 w-10 text-red-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">
                          Completion Rate
                        </p>
                        <div className="text-3xl font-bold">
                          {taskReports.avgCompletionRate}%
                        </div>
                      </div>
                      <Activity className="h-10 w-10 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="teams" className="space-y-6 mt-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
              <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-xl">
                  Team Performance Overview
                </CardTitle>
                <CardDescription className="text-violet-100">
                  Productivity and collaboration metrics by team
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={teamPerformance.teamData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="team" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="productivity"
                      fill="#8b5cf6"
                      name="Productivity %"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="collaboration"
                      fill="#06b6d4"
                      name="Collaboration %"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6 mt-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="text-xl">Revenue Analysis</CardTitle>
                <CardDescription className="text-green-100">
                  Monthly revenue, expenses, and profit trends
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [
                        formatCurrency(value as number),
                        "",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stackId="1"
                      stroke="#22c55e"
                      fill="#22c55e"
                      name="Revenue"
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stackId="2"
                      stroke="#ef4444"
                      fill="#ef4444"
                      name="Expenses"
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      stackId="3"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      name="Profit"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hr" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
                <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-t-lg">
                  <CardTitle className="text-xl">
                    Department Distribution
                  </CardTitle>
                  <CardDescription className="text-pink-100">
                    Employee count by department
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {hrAnalytics.departmentDistribution.map((dept, index) => (
                      <div key={dept.department} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {dept.department}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {dept.count} employees
                            </span>
                            <Badge
                              className={`${
                                index === 0
                                  ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0"
                                  : index === 1
                                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0"
                                    : index === 2
                                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
                                      : index === 3
                                        ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white border-0"
                                        : index === 4
                                          ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white border-0"
                                          : "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0"
                              }`}
                            >
                              {dept.percentage}%
                            </Badge>
                          </div>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              index === 0
                                ? "bg-gradient-to-r from-blue-500 to-cyan-600"
                                : index === 1
                                  ? "bg-gradient-to-r from-green-500 to-emerald-600"
                                  : index === 2
                                    ? "bg-gradient-to-r from-orange-500 to-red-500"
                                    : index === 3
                                      ? "bg-gradient-to-r from-purple-500 to-violet-600"
                                      : index === 4
                                        ? "bg-gradient-to-r from-pink-500 to-rose-600"
                                        : "bg-gradient-to-r from-gray-500 to-gray-600"
                            }`}
                            style={{ width: `${dept.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">
                          Total Employees
                        </p>
                        <div className="text-3xl font-bold">
                          {hrAnalytics.totalEmployees}
                        </div>
                      </div>
                      <Users className="h-10 w-10 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-emerald-100 text-sm font-medium">
                          New Hires
                        </p>
                        <div className="text-3xl font-bold">
                          {hrAnalytics.newHires}
                        </div>
                      </div>
                      <UserCheck className="h-10 w-10 text-emerald-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-violet-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm font-medium">
                          Retention Rate
                        </p>
                        <div className="text-3xl font-bold">
                          {hrAnalytics.retentionRate}%
                        </div>
                      </div>
                      <Shield className="h-10 w-10 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
