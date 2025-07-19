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
} from "lucide-react";
import { Link } from "react-router-dom";

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

const budgetData = [
  { month: "Jan", budget: 120000, spent: 95000 },
  { month: "Feb", budget: 130000, spent: 110000 },
  { month: "Mar", budget: 125000, spent: 100000 },
  { month: "Apr", budget: 140000, spent: 125000 },
  { month: "May", budget: 135000, spent: 115000 },
  { month: "Jun", budget: 150000, spent: 130000 },
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
  {
    id: "PRJ-004",
    name: "Marketing Campaign",
    status: "Planning",
    progress: 15,
    team: ["MR", "AD"],
    dueDate: "2024-04-10",
    priority: "Low",
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

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
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
              <span className="text-success">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+3</span> new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Used</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦87K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-warning">65%</span> of total budget
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Project Overview Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Project Progress Overview</CardTitle>
            <CardDescription>
              Monthly project creation and completion rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="projects"
                  fill="hsl(var(--primary))"
                  name="Total Projects"
                />
                <Bar
                  dataKey="completed"
                  fill="hsl(var(--success))"
                  name="Completed"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Task Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Task Status</CardTitle>
            <CardDescription>Current distribution of all tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {taskStatusData.map((item) => (
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

      {/* Budget Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Tracking</CardTitle>
          <CardDescription>
            Monthly budget allocation vs actual spending
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [
                  `₦${(value as number).toLocaleString()}`,
                  "",
                ]}
              />
              <Line
                type="monotone"
                dataKey="budget"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                name="Budget"
              />
              <Line
                type="monotone"
                dataKey="spent"
                stroke="hsl(var(--warning))"
                strokeWidth={2}
                name="Spent"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Projects and Upcoming Tasks */}
      <div className="grid gap-4 md:grid-cols-2">
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

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Tasks requiring your attention</CardDescription>
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
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link to="/projects">
                <FolderKanban className="h-6 w-6" />
                <span>Create Project</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link to="/teams">
                <Users className="h-6 w-6" />
                <span>Invite Team Member</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link to="/tasks">
                <CheckSquare className="h-6 w-6" />
                <span>Create Task</span>
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
