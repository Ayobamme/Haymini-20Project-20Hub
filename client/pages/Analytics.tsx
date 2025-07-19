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
  avgCompletionTime: 3.2, // days
  productivityScore: 87, // percentage
  tasksByPriority: [
    { name: "High", value: 45, color: "#ef4444" },
    { name: "Medium", value: 89, color: "#f59e0b" },
    { name: "Low", value: 100, color: "#22c55e" },
  ],
  weeklyProductivity: [
    { week: "W1", completed: 38, assigned: 42 },
    { week: "W2", completed: 41, assigned: 45 },
    { week: "W3", completed: 36, assigned: 40 },
    { week: "W4", completed: 44, assigned: 48 },
  ],
};

const teamReports = {
  totalMembers: 52,
  activeMembers: 48,
  avgUtilization: 85, // percentage
  topPerformers: [
    { name: "Sarah Wilson", tasksCompleted: 24, efficiency: 95 },
    { name: "John Doe", tasksCompleted: 22, efficiency: 92 },
    { name: "Alex Rodriguez", tasksCompleted: 20, efficiency: 88 },
  ],
  teamProductivity: [
    { team: "Frontend", efficiency: 92, completed: 45 },
    { team: "Backend", efficiency: 88, completed: 38 },
    { team: "Marketing", efficiency: 85, completed: 32 },
    { team: "Design", efficiency: 90, completed: 28 },
  ],
};

const communicationReports = {
  totalMessages: 1250,
  activeMeetings: 28,
  emailsSent: 450,
  responseTime: 2.3, // hours
  channelActivity: [
    { channel: "General", messages: 380, participants: 25 },
    { channel: "Dev Team", messages: 290, participants: 12 },
    { channel: "Marketing", messages: 180, participants: 8 },
    { channel: "Design", messages: 150, participants: 6 },
  ],
};

const riskReports = {
  totalRisks: 15,
  highRisks: 3,
  mitigatedRisks: 8,
  avgRiskScore: 45,
  risksByCategory: [
    { name: "Technical", value: 6, color: "#3b82f6" },
    { name: "Financial", value: 4, color: "#f59e0b" },
    { name: "Security", value: 3, color: "#ef4444" },
    { name: "Operational", value: 2, color: "#22c55e" },
  ],
};

const timeLogData = [
  {
    employee: "John Doe",
    department: "Frontend Development",
    hoursWorked: 38.5,
    projectHours: 32,
    meetingHours: 4.5,
    adminHours: 2,
    efficiency: 92,
    week: "Week 4",
  },
  {
    employee: "Sarah Wilson",
    department: "Frontend Development",
    hoursWorked: 40,
    projectHours: 35,
    meetingHours: 3,
    adminHours: 2,
    efficiency: 95,
    week: "Week 4",
  },
  {
    employee: "Alex Rodriguez",
    department: "Backend Development",
    hoursWorked: 37,
    projectHours: 30,
    meetingHours: 5,
    adminHours: 2,
    efficiency: 88,
    week: "Week 4",
  },
  {
    employee: "Emma Thompson",
    department: "Backend Development",
    hoursWorked: 39,
    projectHours: 33,
    meetingHours: 4,
    adminHours: 2,
    efficiency: 90,
    week: "Week 4",
  },
  {
    employee: "Lisa Park",
    department: "Marketing & Growth",
    hoursWorked: 40,
    projectHours: 34,
    meetingHours: 4,
    adminHours: 2,
    efficiency: 89,
    week: "Week 4",
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function Analytics() {
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState("");
  const [dateRange, setDateRange] = useState("last30days");
  const [selectedTeam, setSelectedTeam] = useState("all");

  const generateReport = (type: string) => {
    // In a real app, this would generate and download the report
    console.log(`Generating ${type} report for ${dateRange}`);
    setIsGenerateReportOpen(false);
  };

  const exportTimeLog = () => {
    const csvContent = [
      "Employee,Department,Hours Worked,Project Hours,Meeting Hours,Admin Hours,Efficiency,Week",
      ...timeLogData.map(
        (row) =>
          `${row.employee},${row.department},${row.hoursWorked},${row.projectHours},${row.meetingHours},${row.adminHours},${row.efficiency}%,${row.week}`,
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "staff_time_log.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">
            Comprehensive reporting and analytics across all business functions.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={exportTimeLog}>
            <Download className="mr-2 h-4 w-4" />
            Export Time Log
          </Button>
          <Dialog
            open={isGenerateReportOpen}
            onOpenChange={setIsGenerateReportOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Generate Custom Report</DialogTitle>
                <DialogDescription>
                  Create a comprehensive report for specific metrics and time
                  periods.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="reportType">Report Type</Label>
                  <Select
                    value={selectedReportType}
                    onValueChange={setSelectedReportType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="projects">Projects Report</SelectItem>
                      <SelectItem value="tasks">Tasks Report</SelectItem>
                      <SelectItem value="teams">Teams Report</SelectItem>
                      <SelectItem value="communication">
                        Communication Report
                      </SelectItem>
                      <SelectItem value="documents">
                        Documents Report
                      </SelectItem>
                      <SelectItem value="issues">Issues Report</SelectItem>
                      <SelectItem value="risks">Risk Report</SelectItem>
                      <SelectItem value="inventory">
                        Inventory Report
                      </SelectItem>
                      <SelectItem value="integration">
                        Integration Report
                      </SelectItem>
                      <SelectItem value="timelog">Time Log Report</SelectItem>
                      <SelectItem value="comprehensive">
                        Comprehensive Report
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dateRange">Date Range</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last7days">Last 7 days</SelectItem>
                      <SelectItem value="last30days">Last 30 days</SelectItem>
                      <SelectItem value="last3months">Last 3 months</SelectItem>
                      <SelectItem value="last6months">Last 6 months</SelectItem>
                      <SelectItem value="lastyear">Last year</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="teams">Teams (Optional)</Label>
                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select teams" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Teams</SelectItem>
                      <SelectItem value="frontend">
                        Frontend Development
                      </SelectItem>
                      <SelectItem value="backend">
                        Backend Development
                      </SelectItem>
                      <SelectItem value="marketing">
                        Marketing & Growth
                      </SelectItem>
                      <SelectItem value="design">Design Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsGenerateReportOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={() => generateReport(selectedReportType)}
                  disabled={!selectedReportType}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projectReports.activeProjects}
            </div>
            <p className="text-xs text-muted-foreground">
              {projectReports.totalProjects} total projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Team Efficiency
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamReports.avgUtilization}%
            </div>
            <p className="text-xs text-muted-foreground">
              {teamReports.activeMembers} active members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tasks Completed
            </CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {taskReports.completedTasks}
            </div>
            <p className="text-xs text-muted-foreground">
              {taskReports.totalTasks} total tasks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Risks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {riskReports.highRisks}
            </div>
            <p className="text-xs text-muted-foreground">
              {riskReports.totalRisks} total risks
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="timelog">Time Log</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={projectReports.projectsByStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
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
                <div className="mt-4 space-y-2">
                  {projectReports.projectsByStatus.map((item) => (
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
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Project Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={projectReports.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="completed"
                      fill="hsl(var(--success))"
                      name="Completed"
                    />
                    <Bar
                      dataKey="started"
                      fill="hsl(var(--primary))"
                      name="Started"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Budget Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={projectReports.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [formatCurrency(value as number), ""]}
                  />
                  <Line
                    type="monotone"
                    dataKey="budget"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    name="Budget Spent"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tasks by Priority</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={taskReports.tasksByPriority}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {taskReports.tasksByPriority.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {taskReports.tasksByPriority.map((item) => (
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
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Productivity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={taskReports.weeklyProductivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="completed"
                      fill="hsl(var(--success))"
                      name="Completed"
                    />
                    <Bar
                      dataKey="assigned"
                      fill="hsl(var(--secondary))"
                      name="Assigned"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Task Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion Rate</span>
                    <span className="font-medium">
                      {Math.round(
                        (taskReports.completedTasks / taskReports.totalTasks) *
                          100,
                      )}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg Completion Time</span>
                    <span className="font-medium">
                      {taskReports.avgCompletionTime} days
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Overdue Tasks</span>
                    <span className="font-medium text-destructive">
                      {taskReports.overdueTasks}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Productivity Score</span>
                    <span className="font-medium text-success">
                      {taskReports.productivityScore}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={teamReports.teamProductivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="team" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="efficiency"
                      fill="hsl(var(--primary))"
                      name="Efficiency %"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamReports.topPerformers.map((performer, index) => (
                    <div
                      key={performer.name}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-bold text-primary">
                          #{index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{performer.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {performer.tasksCompleted} tasks completed
                          </div>
                        </div>
                      </div>
                      <Badge variant="success">{performer.efficiency}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="communication" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Communication Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {communicationReports.totalMessages}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Messages
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {communicationReports.activeMeetings}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Active Meetings
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {communicationReports.emailsSent}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Emails Sent
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {communicationReports.responseTime}h
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg Response Time
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {communicationReports.channelActivity.map((channel) => (
                    <div
                      key={channel.channel}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <div>
                        <div className="font-medium">{channel.channel}</div>
                        <div className="text-sm text-muted-foreground">
                          {channel.participants} participants
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{channel.messages}</div>
                        <div className="text-sm text-muted-foreground">
                          messages
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timelog" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Staff Time Log</CardTitle>
                <CardDescription>
                  Detailed time tracking for all team members
                </CardDescription>
              </div>
              <Button onClick={exportTimeLog}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeLogData.map((employee) => (
                  <Card key={employee.employee}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">{employee.employee}</h4>
                          <p className="text-sm text-muted-foreground">
                            {employee.department}
                          </p>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold">
                              {employee.hoursWorked}h
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Total
                            </div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-primary">
                              {employee.projectHours}h
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Project
                            </div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-secondary">
                              {employee.meetingHours}h
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Meetings
                            </div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-success">
                              {employee.efficiency}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Efficiency
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
