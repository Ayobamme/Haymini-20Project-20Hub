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
import { Checkbox } from "@/components/ui/checkbox";
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
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Calendar as CalendarIcon,
  Clock,
  AlertCircle,
  CheckCircle2,
  User,
  Users,
  MessageSquare,
  Flag,
  Eye,
  ChevronDown,
  Send,
  BarChart3,
  TrendingUp,
  Calendar as CalendarDays,
  Timer,
  Target,
  Activity,
  FileText,
  KanbanSquare,
  List,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Task {
  id: string;
  taskId: string; // Auto-generated unique task ID
  title: string;
  description: string;
  assignee: string;
  assigneeId: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "To Do" | "In Progress" | "Review" | "Done";
  dueDate: string;
  project: string;
  tags: string[];
  estimatedHours: number;
  actualHours?: number;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
  stage: "Planning" | "Development" | "Testing" | "Review" | "Deployment" | "Completed";
  comments: TaskComment[];
}

interface TaskComment {
  id: string;
  taskId: string;
  author: string;
  authorId: string;
  content: string;
  timestamp: string;
  avatar?: string;
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  department: string;
  position: string;
  tasks: Task[];
}

interface WorkOverview {
  staffId: string;
  period: "daily" | "weekly" | "monthly";
  date: string;
  tasksCompleted: number;
  tasksInProgress: number;
  hoursWorked: number;
  efficiency: number;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      taskId: "TSK-001",
      title: "Implement user authentication system",
      description: "Build secure login/logout functionality with JWT tokens",
      assignee: "John Smith",
      assigneeId: "staff-1",
      priority: "High",
      status: "In Progress",
      dueDate: "2024-02-15",
      project: "Web Application",
      tags: ["Frontend", "Security"],
      estimatedHours: 20,
      actualHours: 12,
      createdBy: "Admin",
      createdDate: "2024-01-20",
      updatedDate: "2024-01-25",
      stage: "Development",
      comments: [
        {
          id: "c1",
          taskId: "1",
          author: "Admin",
          authorId: "admin-1",
          content: "Please focus on security best practices for this implementation.",
          timestamp: "2024-01-21T10:30:00Z"
        },
        {
          id: "c2",
          taskId: "1",
          author: "John Smith",
          authorId: "staff-1",
          content: "I've completed the JWT integration. Working on password validation now.",
          timestamp: "2024-01-22T14:15:00Z"
        }
      ]
    },
    {
      id: "2",
      taskId: "TSK-002",
      title: "Design dashboard wireframes",
      description: "Create wireframes for the main dashboard interface",
      assignee: "Sarah Johnson",
      assigneeId: "staff-2",
      priority: "Medium",
      status: "Review",
      dueDate: "2024-02-10",
      project: "UI/UX Design",
      tags: ["Design", "Wireframes"],
      estimatedHours: 8,
      actualHours: 6,
      createdBy: "Admin",
      createdDate: "2024-01-18",
      updatedDate: "2024-01-24",
      stage: "Review",
      comments: [
        {
          id: "c3",
          taskId: "2",
          author: "Admin",
          authorId: "admin-1",
          content: "Please include mobile responsive designs as well.",
          timestamp: "2024-01-19T09:00:00Z"
        }
      ]
    },
    {
      id: "3",
      taskId: "TSK-003",
      title: "Database optimization",
      description: "Optimize database queries for better performance",
      assignee: "Michael Chen",
      assigneeId: "staff-3",
      priority: "High",
      status: "To Do",
      dueDate: "2024-02-20",
      project: "Backend Development",
      tags: ["Database", "Performance"],
      estimatedHours: 15,
      createdBy: "Admin",
      createdDate: "2024-01-22",
      updatedDate: "2024-01-22",
      stage: "Planning",
      comments: []
    },
    {
      id: "4",
      taskId: "TSK-004",
      title: "API endpoint testing",
      description: "Comprehensive testing of all API endpoints",
      assignee: "John Smith",
      assigneeId: "staff-1",
      priority: "Medium",
      status: "Done",
      dueDate: "2024-01-30",
      project: "Web Application",
      tags: ["Testing", "API"],
      estimatedHours: 12,
      actualHours: 10,
      createdBy: "Admin",
      createdDate: "2024-01-15",
      updatedDate: "2024-01-29",
      stage: "Completed",
      comments: []
    }
  ]);

  const [staffMembers] = useState<StaffMember[]>([
    {
      id: "staff-1",
      name: "John Smith",
      email: "john@company.com",
      department: "Engineering",
      position: "Senior Developer",
      tasks: tasks.filter(t => t.assigneeId === "staff-1")
    },
    {
      id: "staff-2",
      name: "Sarah Johnson",
      email: "sarah@company.com",
      department: "Design",
      position: "UI/UX Designer",
      tasks: tasks.filter(t => t.assigneeId === "staff-2")
    },
    {
      id: "staff-3",
      name: "Michael Chen",
      email: "michael@company.com",
      department: "Engineering",
      position: "Backend Developer",
      tasks: tasks.filter(t => t.assigneeId === "staff-3")
    }
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [isStaffDetailOpen, setIsStaffDetailOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState("all-tasks");
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assigneeId: "",
    priority: "Medium",
    dueDate: "",
    project: "",
    estimatedHours: "",
    tags: ""
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [staffFilter, setStaffFilter] = useState("All");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [analyticsStaff, setAnalyticsStaff] = useState("All");
  const [analyticsPeriod, setAnalyticsPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  const [workOverviewPeriod, setWorkOverviewPeriod] = useState<"daily" | "weekly" | "monthly">("daily");

  const generateTaskId = () => {
    const maxId = Math.max(...tasks.map(t => parseInt(t.taskId.split('-')[1])), 0);
    return `TSK-${String(maxId + 1).padStart(3, '0')}`;
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.taskId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
    const matchesStaff = staffFilter === "All" || task.assigneeId === staffFilter;
    
    const taskDate = new Date(task.createdDate);
    const matchesDateFrom = !dateFrom || taskDate >= dateFrom;
    const matchesDateTo = !dateTo || taskDate <= dateTo;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesStaff && matchesDateFrom && matchesDateTo;
  });

  const getTasksByStaffAndDate = (staffId: string, period: "daily" | "weekly" | "monthly") => {
    const now = new Date();
    const staffTasks = tasks.filter(t => t.assigneeId === staffId);
    
    let startDate: Date;
    switch (period) {
      case "daily":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "weekly":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        break;
      case "monthly":
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
    }
    
    return staffTasks.filter(task => {
      const taskDate = new Date(task.updatedDate);
      return taskDate >= startDate;
    });
  };

  const getStaffAnalytics = (staffId: string) => {
    const staffTasks = tasks.filter(t => t.assigneeId === staffId);
    const completedTasks = staffTasks.filter(t => t.status === "Done");
    const inProgressTasks = staffTasks.filter(t => t.status === "In Progress");
    const overdueTasks = staffTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== "Done");
    
    const totalEstimated = staffTasks.reduce((sum, task) => sum + task.estimatedHours, 0);
    const totalActual = staffTasks.reduce((sum, task) => sum + (task.actualHours || 0), 0);
    const efficiency = totalEstimated > 0 ? (totalEstimated / totalActual) * 100 : 0;

    return {
      totalTasks: staffTasks.length,
      completedTasks: completedTasks.length,
      inProgressTasks: inProgressTasks.length,
      overdueTasks: overdueTasks.length,
      completionRate: staffTasks.length > 0 ? (completedTasks.length / staffTasks.length) * 100 : 0,
      efficiency: isFinite(efficiency) ? efficiency : 0,
      totalHours: totalActual
    };
  };

  const getStatusVariant = (status: Task["status"]) => {
    switch (status) {
      case "To Do": return "outline";
      case "In Progress": return "default";
      case "Review": return "secondary";
      case "Done": return "default";
      default: return "outline";
    }
  };

  const getPriorityVariant = (priority: Task["priority"]) => {
    switch (priority) {
      case "Low": return "secondary";
      case "Medium": return "default";
      case "High": return "destructive";
      case "Critical": return "destructive";
      default: return "outline";
    }
  };

  const getStageColor = (stage: Task["stage"]) => {
    switch (stage) {
      case "Planning": return "bg-blue-100 text-blue-800";
      case "Development": return "bg-orange-100 text-orange-800";
      case "Testing": return "bg-purple-100 text-purple-800";
      case "Review": return "bg-yellow-100 text-yellow-800";
      case "Deployment": return "bg-indigo-100 text-indigo-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: Task["priority"]) => {
    switch (priority) {
      case "Critical": return <AlertCircle className="h-3 w-3" />;
      case "High": return <Flag className="h-3 w-3" />;
      default: return null;
    }
  };

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.assigneeId || !newTask.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const assignee = staffMembers.find(s => s.id === newTask.assigneeId);
    const task: Task = {
      id: Date.now().toString(),
      taskId: generateTaskId(),
      ...newTask,
      assignee: assignee?.name || "",
      status: "To Do",
      stage: "Planning",
      estimatedHours: parseInt(newTask.estimatedHours) || 0,
      tags: newTask.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      createdBy: "Admin",
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      comments: []
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: "", description: "", assigneeId: "", priority: "Medium",
      dueDate: "", project: "", estimatedHours: "", tags: ""
    });
    setIsCreateTaskOpen(false);

    toast({
      title: "Task Created",
      description: `Task "${task.taskId}" has been assigned to ${task.assignee}.`,
    });
  };

  const handleAddComment = (taskId: string) => {
    if (!newComment.trim()) return;

    const comment: TaskComment = {
      id: Date.now().toString(),
      taskId,
      author: "Admin",
      authorId: "admin-1",
      content: newComment,
      timestamp: new Date().toISOString()
    };

    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, comments: [...task.comments, comment], updatedDate: new Date().toISOString().split('T')[0] }
        : task
    ));
    setNewComment("");

    toast({
      title: "Comment Added",
      description: "Your comment has been added to the task.",
    });
  };

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: newStatus, 
            updatedDate: new Date().toISOString().split('T')[0],
            stage: newStatus === "Done" ? "Completed" : task.stage
          } 
        : task
    ));

    toast({
      title: "Status Updated",
      description: `Task status changed to ${newStatus}.`,
    });
  };

  const handleStageChange = (taskId: string, newStage: Task["stage"]) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            stage: newStage, 
            updatedDate: new Date().toISOString().split('T')[0]
          } 
        : task
    ));

    toast({
      title: "Stage Updated",
      description: `Task moved to ${newStage} stage.`,
    });
  };

  const KanbanBoard = () => {
    const stages = ["Planning", "Development", "Testing", "Review", "Deployment", "Completed"];
    
    return (
      <div className="grid grid-cols-6 gap-4 h-[600px] overflow-auto">
        {stages.map(stage => (
          <Card key={stage} className="min-h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                {stage}
                <Badge variant="outline" className="text-xs">
                  {filteredTasks.filter(t => t.stage === stage).length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredTasks
                .filter(task => task.stage === stage)
                .map(task => (
                  <Card key={task.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-medium line-clamp-2">{task.title}</h4>
                        <Badge variant={getPriorityVariant(task.priority)} className="text-xs">
                          {task.priority}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {task.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium">{task.taskId}</span>
                        <Badge variant={getStatusVariant(task.status)} className="text-xs">
                          {task.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarIcon className="h-3 w-3" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-xs">
                            {task.assignee.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs">{task.assignee}</span>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-6 text-xs"
                          onClick={() => {
                            const stageIndex = stages.indexOf(stage);
                            if (stageIndex > 0) {
                              handleStageChange(task.id, stages[stageIndex - 1] as Task["stage"]);
                            }
                          }}
                          disabled={stages.indexOf(stage) === 0}
                        >
                          ←
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-6 text-xs"
                          onClick={() => {
                            const stageIndex = stages.indexOf(stage);
                            if (stageIndex < stages.length - 1) {
                              handleStageChange(task.id, stages[stageIndex + 1] as Task["stage"]);
                            }
                          }}
                          disabled={stages.indexOf(stage) === stages.length - 1}
                        >
                          →
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Task Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage tasks with advanced analytics, date filtering, and kanban views
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setViewMode(viewMode === "list" ? "kanban" : "list")}
            >
              {viewMode === "list" ? <KanbanSquare className="mr-2 h-4 w-4" /> : <List className="mr-2 h-4 w-4" />}
              {viewMode === "list" ? "Kanban View" : "List View"}
            </Button>
            <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Task
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>

        {/* Enhanced Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks or Task ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Review">Review</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Priority</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={staffFilter} onValueChange={setStaffFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by staff" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Staff</SelectItem>
                    {staffMembers.map(staff => (
                      <SelectItem key={staff.id} value={staff.id}>{staff.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range Filter */}
              <div className="flex items-center gap-4">
                <Label className="text-sm font-medium">Date Range:</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "MMM dd") : "From Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "MMM dd") : "To Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                {(dateFrom || dateTo) && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setDateFrom(undefined);
                      setDateTo(undefined);
                    }}
                  >
                    Clear Dates
                  </Button>
                )}
                
                <span className="text-sm text-muted-foreground ml-auto">
                  {filteredTasks.length} of {tasks.length} tasks
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredTasks.length}</div>
              <p className="text-xs text-muted-foreground">
                {filteredTasks.filter(t => t.status === "Done").length} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredTasks.filter(t => t.status === "In Progress").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Active tasks
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredTasks.filter(t => t.priority === "High" || t.priority === "Critical").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Urgent tasks
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {filteredTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== "Done").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Need attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all-tasks">All Tasks</TabsTrigger>
            <TabsTrigger value="staff-todos">Staff To-Do Lists</TabsTrigger>
            <TabsTrigger value="analytics">Task Analytics</TabsTrigger>
            <TabsTrigger value="work-overview">Work Overview</TabsTrigger>
          </TabsList>

          {/* All Tasks Tab */}
          <TabsContent value="all-tasks" className="space-y-4">
            {viewMode === "kanban" ? (
              <KanbanBoard />
            ) : (
              <div className="grid gap-4">
                {filteredTasks.map((task) => (
                  <Card key={task.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="font-mono">
                              {task.taskId}
                            </Badge>
                            <h3 className="font-semibold text-lg">{task.title}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant={getStatusVariant(task.status)}>
                                {task.status}
                              </Badge>
                              <Badge variant={getPriorityVariant(task.priority)}>
                                {getPriorityIcon(task.priority)}
                                <span className="ml-1">{task.priority}</span>
                              </Badge>
                              <Badge className={getStageColor(task.stage)}>
                                {task.stage}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground">{task.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {task.assignee}
                            </div>
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3" />
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {task.estimatedHours}h estimated
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              {task.comments.length} comments
                            </div>
                            <div className="flex items-center gap-1">
                              <Activity className="h-3 w-3" />
                              Updated: {new Date(task.updatedDate).toLocaleDateString()}
                            </div>
                          </div>

                          {task.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {task.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedTask(task);
                              setIsTaskDetailOpen(true);
                            }}
                          >
                            <Eye className="mr-1 h-3 w-3" />
                            View Details
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Task
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleStatusChange(task.id, "To Do")}>
                                To Do
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(task.id, "In Progress")}>
                                In Progress
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(task.id, "Review")}>
                                Review
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(task.id, "Done")}>
                                Done
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Task
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Staff To-Do Lists Tab */}
          <TabsContent value="staff-todos" className="space-y-4">
            <div className="grid gap-4">
              {staffMembers.map((staff) => {
                const staffTasks = filteredTasks.filter(t => t.assigneeId === staff.id);
                return (
                  <Card key={staff.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={staff.avatar} alt={staff.name} />
                            <AvatarFallback>
                              {staff.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{staff.name}</CardTitle>
                            <CardDescription>{staff.position} • {staff.department}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {staffTasks.length} tasks
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAnalyticsStaff(staff.id)}
                          >
                            <BarChart3 className="mr-1 h-3 w-3" />
                            Analytics
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {staffTasks.slice(0, 5).map((task) => (
                          <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Checkbox 
                                checked={task.status === "Done"} 
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    handleStatusChange(task.id, "Done");
                                  }
                                }}
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs font-mono">
                                    {task.taskId}
                                  </Badge>
                                  <p className="font-medium">{task.title}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Due: {new Date(task.dueDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={getStatusVariant(task.status)} className="text-xs">
                                {task.status}
                              </Badge>
                              <Badge variant={getPriorityVariant(task.priority)} className="text-xs">
                                {task.priority}
                              </Badge>
                              <Badge className={`text-xs ${getStageColor(task.stage)}`}>
                                {task.stage}
                              </Badge>
                            </div>
                          </div>
                        ))}
                        {staffTasks.length > 5 && (
                          <p className="text-sm text-muted-foreground text-center">
                            +{staffTasks.length - 5} more tasks
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Task Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <Select value={analyticsStaff} onValueChange={setAnalyticsStaff}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Staff</SelectItem>
                  {staffMembers.map(staff => (
                    <SelectItem key={staff.id} value={staff.id}>{staff.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "MMM dd") : "From Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "MMM dd") : "To Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {(analyticsStaff === "All" ? staffMembers : staffMembers.filter(s => s.id === analyticsStaff))
                .map((staff) => {
                  const analytics = getStaffAnalytics(staff.id);
                  return (
                    <Card key={staff.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{staff.name}</CardTitle>
                        <CardDescription>{staff.position}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-medium">Total Tasks</div>
                            <div className="text-2xl font-bold">{analytics.totalTasks}</div>
                          </div>
                          <div>
                            <div className="font-medium">Completed</div>
                            <div className="text-2xl font-bold text-green-600">{analytics.completedTasks}</div>
                          </div>
                          <div>
                            <div className="font-medium">In Progress</div>
                            <div className="text-2xl font-bold text-blue-600">{analytics.inProgressTasks}</div>
                          </div>
                          <div>
                            <div className="font-medium">Overdue</div>
                            <div className="text-2xl font-bold text-red-600">{analytics.overdueTasks}</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span>Completion Rate</span>
                            <span className="font-medium">{analytics.completionRate.toFixed(1)}%</span>
                          </div>
                          <Progress value={analytics.completionRate} className="h-2" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span>Efficiency</span>
                            <span className="font-medium">{analytics.efficiency.toFixed(1)}%</span>
                          </div>
                          <Progress value={Math.min(analytics.efficiency, 100)} className="h-2" />
                        </div>
                        
                        <div className="text-sm">
                          <span className="font-medium">Total Hours Worked: </span>
                          <span>{analytics.totalHours}h</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>

          {/* Work Overview Tab */}
          <TabsContent value="work-overview" className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <Select value={workOverviewPeriod} onValueChange={setWorkOverviewPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4">
              {staffMembers.map((staff) => {
                const periodTasks = getTasksByStaffAndDate(staff.id, workOverviewPeriod);
                const completedTasks = periodTasks.filter(t => t.status === "Done");
                const inProgressTasks = periodTasks.filter(t => t.status === "In Progress");
                const totalHours = periodTasks.reduce((sum, task) => sum + (task.actualHours || 0), 0);
                
                return (
                  <Card key={staff.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={staff.avatar} alt={staff.name} />
                            <AvatarFallback>
                              {staff.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{staff.name}</div>
                            <div className="text-sm text-muted-foreground">{staff.position}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {workOverviewPeriod} Overview
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold">{periodTasks.length}</div>
                          <div className="text-sm text-muted-foreground">Total Tasks</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">{completedTasks.length}</div>
                          <div className="text-sm text-muted-foreground">Completed</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">{inProgressTasks.length}</div>
                          <div className="text-sm text-muted-foreground">In Progress</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-600">{totalHours}h</div>
                          <div className="text-sm text-muted-foreground">Hours Worked</div>
                        </div>
                      </div>
                      
                      {periodTasks.length > 0 && (
                        <div className="mt-4">
                          <div className="text-sm font-medium mb-2">Recent Tasks</div>
                          <div className="space-y-1">
                            {periodTasks.slice(0, 3).map(task => (
                              <div key={task.id} className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs font-mono">
                                    {task.taskId}
                                  </Badge>
                                  <span className="truncate">{task.title}</span>
                                </span>
                                <Badge variant={getStatusVariant(task.status)} className="text-xs">
                                  {task.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Task Detail Dialog */}
        <Dialog open={isTaskDetailOpen} onOpenChange={setIsTaskDetailOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono">
                  {selectedTask?.taskId}
                </Badge>
                {selectedTask?.title}
              </DialogTitle>
              <DialogDescription>
                Task details and comments
              </DialogDescription>
            </DialogHeader>
            {selectedTask && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Assignee</Label>
                      <p className="text-sm text-muted-foreground">{selectedTask.assignee}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <div className="mt-1">
                        <Badge variant={getStatusVariant(selectedTask.status)}>
                          {selectedTask.status}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Priority</Label>
                      <div className="mt-1">
                        <Badge variant={getPriorityVariant(selectedTask.priority)}>
                          {selectedTask.priority}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Stage</Label>
                      <div className="mt-1">
                        <Badge className={getStageColor(selectedTask.stage)}>
                          {selectedTask.stage}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Due Date</Label>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedTask.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Estimated Hours</Label>
                      <p className="text-sm text-muted-foreground">{selectedTask.estimatedHours}h</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Actual Hours</Label>
                      <p className="text-sm text-muted-foreground">{selectedTask.actualHours || 0}h</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Project</Label>
                      <p className="text-sm text-muted-foreground">{selectedTask.project}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedTask.description}</p>
                </div>

                {selectedTask.tags.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">Tags</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedTask.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Separator />

                <div>
                  <Label className="text-sm font-medium">Comments ({selectedTask.comments.length})</Label>
                  <div className="mt-3 space-y-3 max-h-60 overflow-y-auto">
                    {selectedTask.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3 p-3 bg-muted rounded-lg">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.avatar} alt={comment.author} />
                          <AvatarFallback className="text-xs">
                            {comment.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(comment.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                    />
                    <Button 
                      size="sm" 
                      onClick={() => handleAddComment(selectedTask.id)}
                      disabled={!newComment.trim()}
                    >
                      <Send className="mr-1 h-3 w-3" />
                      Add Comment
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsTaskDetailOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Task Dialog */}
        <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Assign a new task to a team member
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="title">Task Title *</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter task title"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter task description"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignee">Assignee *</Label>
                <Select value={newTask.assigneeId} onValueChange={(value) => setNewTask(prev => ({ ...prev, assigneeId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {staffMembers.map((staff) => (
                      <SelectItem key={staff.id} value={staff.id}>
                        {staff.name} - {staff.position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={newTask.priority} onValueChange={(value) => setNewTask(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedHours">Estimated Hours</Label>
                <Input
                  id="estimatedHours"
                  type="number"
                  value={newTask.estimatedHours}
                  onChange={(e) => setNewTask(prev => ({ ...prev, estimatedHours: e.target.value }))}
                  placeholder="Enter estimated hours"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Input
                  id="project"
                  value={newTask.project}
                  onChange={(e) => setNewTask(prev => ({ ...prev, project: e.target.value }))}
                  placeholder="Enter project name"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={newTask.tags}
                  onChange={(e) => setNewTask(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="e.g., Frontend, Backend, Design"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateTaskOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTask}>Create Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Tasks;
