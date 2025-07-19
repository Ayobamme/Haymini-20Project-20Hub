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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Calendar,
  Clock,
  User,
  Flag,
  CheckCircle2,
  PlayCircle,
  PauseCircle,
  AlertTriangle,
  FileText,
  MessageSquare,
  Paperclip,
  List,
  Kanban,
  BarChart3,
  Timer,
  Target,
} from "lucide-react";

const tasks = [
  {
    id: "TSK-001",
    title: "Review user interface mockups",
    description:
      "Review and provide feedback on the new user interface mockups for the e-commerce platform",
    status: "In Progress",
    priority: "High",
    progress: 60,
    project: "E-commerce Platform Redesign",
    assignee: {
      name: "John Doe",
      avatar: "",
      email: "john@company.com",
    },
    reporter: "Sarah Wilson",
    startDate: "2024-01-20",
    dueDate: "2024-01-28",
    estimatedHours: 8,
    loggedHours: 4.5,
    tags: ["UI/UX", "Review"],
    subtasks: [
      { id: "ST-001", title: "Review homepage mockup", completed: true },
      { id: "ST-002", title: "Review product page mockup", completed: true },
      { id: "ST-003", title: "Review checkout mockup", completed: false },
    ],
    comments: 3,
    attachments: 2,
    isOverdue: false,
  },
  {
    id: "TSK-002",
    title: "Implement payment gateway integration",
    description:
      "Integrate Stripe payment gateway with the mobile application for seamless transactions",
    status: "Todo",
    priority: "High",
    progress: 0,
    project: "Mobile App Development",
    assignee: {
      name: "Sarah Wilson",
      avatar: "",
      email: "sarah@company.com",
    },
    reporter: "Alex Rodriguez",
    startDate: "2024-01-29",
    dueDate: "2024-02-05",
    estimatedHours: 16,
    loggedHours: 0,
    tags: ["Backend", "Payment"],
    subtasks: [
      { id: "ST-004", title: "Set up Stripe account", completed: false },
      { id: "ST-005", title: "Create payment API endpoints", completed: false },
      { id: "ST-006", title: "Test payment flow", completed: false },
    ],
    comments: 1,
    attachments: 0,
    isOverdue: false,
  },
  {
    id: "TSK-003",
    title: "Content strategy meeting preparation",
    description:
      "Prepare materials and agenda for the Q1 content strategy meeting",
    status: "Done",
    priority: "Medium",
    progress: 100,
    project: "Marketing Campaign Q1",
    assignee: {
      name: "David Kim",
      avatar: "",
      email: "david@company.com",
    },
    reporter: "Lisa Park",
    startDate: "2024-01-15",
    dueDate: "2024-01-25",
    estimatedHours: 6,
    loggedHours: 5.5,
    tags: ["Content", "Meeting"],
    subtasks: [
      { id: "ST-007", title: "Create meeting agenda", completed: true },
      { id: "ST-008", title: "Prepare content calendar", completed: true },
      { id: "ST-009", title: "Research competitors", completed: true },
    ],
    comments: 5,
    attachments: 3,
    isOverdue: false,
  },
  {
    id: "TSK-004",
    title: "Database performance optimization",
    description:
      "Optimize database queries and improve overall performance metrics",
    status: "In Progress",
    priority: "Medium",
    progress: 30,
    project: "Database Migration",
    assignee: {
      name: "Emma Thompson",
      avatar: "",
      email: "emma@company.com",
    },
    reporter: "Alex Rodriguez",
    startDate: "2024-01-10",
    dueDate: "2024-01-26",
    estimatedHours: 20,
    loggedHours: 12,
    tags: ["Database", "Performance"],
    subtasks: [
      { id: "ST-010", title: "Analyze slow queries", completed: true },
      { id: "ST-011", title: "Create optimization plan", completed: true },
      { id: "ST-012", title: "Implement optimizations", completed: false },
    ],
    comments: 7,
    attachments: 1,
    isOverdue: true,
  },
  {
    id: "TSK-005",
    title: "Social media campaign assets",
    description: "Create visual assets for the upcoming social media campaign",
    status: "Todo",
    priority: "Low",
    progress: 0,
    project: "Marketing Campaign Q1",
    assignee: {
      name: "Rachel Green",
      avatar: "",
      email: "rachel@company.com",
    },
    reporter: "Lisa Park",
    startDate: "2024-02-01",
    dueDate: "2024-02-10",
    estimatedHours: 12,
    loggedHours: 0,
    tags: ["Design", "Social Media"],
    subtasks: [
      { id: "ST-013", title: "Create Instagram posts", completed: false },
      { id: "ST-014", title: "Create Twitter graphics", completed: false },
      { id: "ST-015", title: "Create LinkedIn content", completed: false },
    ],
    comments: 0,
    attachments: 0,
    isOverdue: false,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Done":
      return "success";
    case "In Progress":
      return "default";
    case "Todo":
      return "secondary";
    case "Blocked":
      return "destructive";
    default:
      return "secondary";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "destructive";
    case "Medium":
      return "default";
    case "Low":
      return "secondary";
    default:
      return "secondary";
  }
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export default function Tasks() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"list" | "kanban" | "gantt">("list");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const taskStats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "Todo").length,
    inProgress: tasks.filter((t) => t.status === "In Progress").length,
    done: tasks.filter((t) => t.status === "Done").length,
    overdue: tasks.filter((t) => t.isOverdue).length,
  };

  const kanbanColumns = [
    {
      id: "Todo",
      title: "To Do",
      tasks: filteredTasks.filter((t) => t.status === "Todo"),
    },
    {
      id: "In Progress",
      title: "In Progress",
      tasks: filteredTasks.filter((t) => t.status === "In Progress"),
    },
    {
      id: "Done",
      title: "Done",
      tasks: filteredTasks.filter((t) => t.status === "Done"),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and track all tasks across your projects.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>
                  Create a new task and assign it to team members.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[500px] overflow-y-auto">
                <div className="grid gap-2">
                  <Label htmlFor="title">Task Title *</Label>
                  <Input id="title" placeholder="Enter task title" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the task requirements and objectives"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="project">Project</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ecommerce">
                          E-commerce Platform Redesign
                        </SelectItem>
                        <SelectItem value="mobile">
                          Mobile App Development
                        </SelectItem>
                        <SelectItem value="marketing">
                          Marketing Campaign Q1
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="assignee">Assignee</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Doe</SelectItem>
                        <SelectItem value="sarah">Sarah Wilson</SelectItem>
                        <SelectItem value="david">David Kim</SelectItem>
                        <SelectItem value="emma">Emma Thompson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" type="date" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="estimatedHours">Estimated Hours</Label>
                    <Input id="estimatedHours" type="number" placeholder="0" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      placeholder="e.g., Frontend, API, Testing"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateTaskOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Task Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskStats.total}</div>
            <p className="text-xs text-muted-foreground">All projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">To Do</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary-foreground">
              {taskStats.todo}
            </div>
            <p className="text-xs text-muted-foreground">Pending tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <PlayCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {taskStats.inProgress}
            </div>
            <p className="text-xs text-muted-foreground">Active tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {taskStats.done}
            </div>
            <p className="text-xs text-muted-foreground">Finished tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {taskStats.overdue}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and View Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Todo">To Do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs
          value={viewMode}
          onValueChange={(value) => setViewMode(value as any)}
        >
          <TabsList>
            <TabsTrigger value="list">
              <List className="mr-2 h-4 w-4" />
              List
            </TabsTrigger>
            <TabsTrigger value="kanban">
              <Kanban className="mr-2 h-4 w-4" />
              Kanban
            </TabsTrigger>
            <TabsTrigger value="gantt">
              <BarChart3 className="mr-2 h-4 w-4" />
              Gantt
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Task Views */}
      {viewMode === "list" && (
        <Card>
          <CardHeader>
            <CardTitle>Tasks List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors ${
                    task.isOverdue
                      ? "border-destructive/50 bg-destructive/5"
                      : ""
                  }`}
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{task.title}</h3>
                      {task.isOverdue && (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      )}
                      <Badge variant={getStatusColor(task.status) as any}>
                        {task.status}
                      </Badge>
                      <Badge variant={getPriorityColor(task.priority) as any}>
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {task.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Project: {task.project}</span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {task.assignee.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Due {formatDate(task.dueDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Timer className="h-3 w-3" />
                        {task.loggedHours}h / {task.estimatedHours}h
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Progress value={task.progress} className="w-20" />
                        <span className="text-sm font-medium">
                          {task.progress}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MessageSquare className="h-3 w-3" />
                        {task.comments}
                        <Paperclip className="h-3 w-3" />
                        {task.attachments}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={task.assignee.avatar}
                        alt={task.assignee.name}
                      />
                      <AvatarFallback className="text-xs">
                        {getInitials(task.assignee.name)}
                      </AvatarFallback>
                    </Avatar>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Task
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {viewMode === "kanban" && (
        <div className="grid grid-cols-3 gap-6">
          {kanbanColumns.map((column) => (
            <Card key={column.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {column.title}
                  </CardTitle>
                  <Badge variant="outline">{column.tasks.length}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {column.tasks.map((task) => (
                    <Card
                      key={task.id}
                      className={`hover:shadow-md transition-shadow cursor-pointer ${
                        task.isOverdue ? "border-destructive/50" : ""
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-sm line-clamp-2">
                              {task.title}
                            </h4>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                >
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-3 w-3" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-3 w-3" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge
                              variant={getPriorityColor(task.priority) as any}
                              className="text-xs"
                            >
                              {task.priority}
                            </Badge>
                            {task.isOverdue && (
                              <AlertTriangle className="h-3 w-3 text-destructive" />
                            )}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>Progress</span>
                              <span>{task.progress}%</span>
                            </div>
                            <Progress value={task.progress} className="h-1" />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {formatDate(task.dueDate)}
                            </div>
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={task.assignee.avatar}
                                alt={task.assignee.name}
                              />
                              <AvatarFallback className="text-xs">
                                {getInitials(task.assignee.name)}
                              </AvatarFallback>
                            </Avatar>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              {task.comments}
                            </span>
                            <span className="flex items-center gap-1">
                              <Paperclip className="h-3 w-3" />
                              {task.attachments}
                            </span>
                            <span className="flex items-center gap-1">
                              <Timer className="h-3 w-3" />
                              {task.loggedHours}h
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {viewMode === "gantt" && (
        <Card>
          <CardHeader>
            <CardTitle>Gantt Chart View</CardTitle>
            <CardDescription>
              Timeline view of all tasks with their durations and dependencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground border-b pb-2">
                <div className="col-span-4">Task</div>
                <div className="col-span-2">Assignee</div>
                <div className="col-span-6">Timeline (Jan 2024)</div>
              </div>
              {filteredTasks.map((task) => {
                const startDay = new Date(task.startDate).getDate();
                const dueDay = new Date(task.dueDate).getDate();
                const duration = dueDay - startDay + 1;
                const startPosition = ((startDay - 1) / 31) * 100;
                const width = (duration / 31) * 100;

                return (
                  <div
                    key={task.id}
                    className="grid grid-cols-12 gap-2 text-sm items-center py-2 border-b"
                  >
                    <div className="col-span-4">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={getPriorityColor(task.priority) as any}
                          className="text-xs"
                        >
                          {task.priority}
                        </Badge>
                        <span className="font-medium">{task.title}</span>
                        {task.isOverdue && (
                          <AlertTriangle className="h-3 w-3 text-destructive" />
                        )}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={task.assignee.avatar}
                            alt={task.assignee.name}
                          />
                          <AvatarFallback className="text-xs">
                            {getInitials(task.assignee.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs">{task.assignee.name}</span>
                      </div>
                    </div>
                    <div className="col-span-6 relative h-8">
                      <div
                        className="absolute inset-y-0 bg-muted rounded"
                        style={{
                          left: `${startPosition}%`,
                          width: `${width}%`,
                        }}
                      >
                        <div
                          className={`h-full rounded ${
                            task.status === "Done"
                              ? "bg-success"
                              : task.status === "In Progress"
                                ? "bg-primary"
                                : "bg-muted-foreground"
                          }`}
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                        {task.progress}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
