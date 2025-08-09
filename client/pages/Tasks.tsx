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
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Calendar,
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
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Task {
  id: string;
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

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
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
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState("all-tasks");

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

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

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
      ...newTask,
      assignee: assignee?.name || "",
      status: "To Do",
      estimatedHours: parseInt(newTask.estimatedHours) || 0,
      tags: newTask.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      createdBy: "Admin",
      createdDate: new Date().toISOString().split('T')[0],
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
      description: `Task "${task.title}" has been assigned to ${task.assignee}.`,
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
        ? { ...task, comments: [...task.comments, comment] }
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
      task.id === taskId ? { ...task, status: newStatus } : task
    ));

    toast({
      title: "Status Updated",
      description: `Task status changed to ${newStatus}.`,
    });
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
              Manage tasks, track progress, and view staff to-do lists
            </p>
          </div>
          <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Task
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>

        {/* Task Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks.length}</div>
              <p className="text-xs text-muted-foreground">
                {tasks.filter(t => t.status === "Done").length} completed
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
                {tasks.filter(t => t.status === "In Progress").length}
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
                {tasks.filter(t => t.priority === "High" || t.priority === "Critical").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Urgent tasks
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{staffMembers.length}</div>
              <p className="text-xs text-muted-foreground">
                Active staff
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all-tasks">All Tasks</TabsTrigger>
            <TabsTrigger value="staff-todos">Staff To-Do Lists</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* All Tasks Tab */}
          <TabsContent value="all-tasks" className="space-y-4">
            {/* Filters */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-80"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
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
                  <SelectTrigger className="w-40">
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
              </div>
            </div>

            {/* Task List */}
            <div className="grid gap-4">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{task.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant={getStatusVariant(task.status)}>
                              {task.status}
                            </Badge>
                            <Badge variant={getPriorityVariant(task.priority)}>
                              {getPriorityIcon(task.priority)}
                              <span className="ml-1">{task.priority}</span>
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
                            <Calendar className="h-3 w-3" />
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
          </TabsContent>

          {/* Staff To-Do Lists Tab */}
          <TabsContent value="staff-todos" className="space-y-4">
            <div className="grid gap-4">
              {staffMembers.map((staff) => (
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
                          {staff.tasks.length} tasks
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedStaff(staff);
                            setIsStaffDetailOpen(true);
                          }}
                        >
                          <Eye className="mr-1 h-3 w-3" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {staff.tasks.slice(0, 3).map((task) => (
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
                              <p className="font-medium">{task.title}</p>
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
                          </div>
                        </div>
                      ))}
                      {staff.tasks.length > 3 && (
                        <p className="text-sm text-muted-foreground text-center">
                          +{staff.tasks.length - 3} more tasks
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Task Progress by Staff</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {staffMembers.map((staff) => {
                      const completedTasks = staff.tasks.filter(t => t.status === "Done").length;
                      const totalTasks = staff.tasks.length;
                      const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
                      
                      return (
                        <div key={staff.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{staff.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {completedTasks}/{totalTasks} tasks
                            </span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Task Status Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["To Do", "In Progress", "Review", "Done"].map((status) => {
                      const count = tasks.filter(t => t.status === status).length;
                      const percentage = tasks.length > 0 ? (count / tasks.length) * 100 : 0;
                      
                      return (
                        <div key={status} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Badge variant={getStatusVariant(status as Task["status"])} className="text-xs">
                              {status}
                            </Badge>
                            <span className="text-sm">{count} tasks</span>
                          </div>
                          <span className="text-sm font-medium">{percentage.toFixed(1)}%</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Task Detail Dialog */}
        <Dialog open={isTaskDetailOpen} onOpenChange={setIsTaskDetailOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedTask?.title}</DialogTitle>
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

        {/* Staff Detail Dialog */}
        <Dialog open={isStaffDetailOpen} onOpenChange={setIsStaffDetailOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedStaff?.name} - To-Do List</DialogTitle>
              <DialogDescription>
                Complete task list and progress for {selectedStaff?.name}
              </DialogDescription>
            </DialogHeader>
            {selectedStaff && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedStaff.avatar} alt={selectedStaff.name} />
                    <AvatarFallback className="text-lg">
                      {selectedStaff.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedStaff.name}</h3>
                    <p className="text-muted-foreground">{selectedStaff.position}</p>
                    <p className="text-muted-foreground">{selectedStaff.department}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-2xl font-bold">{selectedStaff.tasks.length}</div>
                    <div className="text-sm text-muted-foreground">Total Tasks</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedStaff.tasks.map((task) => (
                    <div key={task.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <Checkbox 
                            checked={task.status === "Done"} 
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleStatusChange(task.id, "Done");
                              }
                            }}
                            className="mt-1"
                          />
                          <div className="space-y-2 flex-1">
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                              <span>Est: {task.estimatedHours}h</span>
                              <span>Project: {task.project}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusVariant(task.status)} className="text-xs">
                            {task.status}
                          </Badge>
                          <Badge variant={getPriorityVariant(task.priority)} className="text-xs">
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                      
                      {task.comments.length > 0 && (
                        <div className="mt-3 pl-6">
                          <details className="group">
                            <summary className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                              <MessageSquare className="h-3 w-3" />
                              {task.comments.length} comments
                              <ChevronDown className="h-3 w-3 transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="mt-2 space-y-2">
                              {task.comments.slice(-2).map((comment) => (
                                <div key={comment.id} className="flex gap-2 p-2 bg-muted rounded text-xs">
                                  <span className="font-medium">{comment.author}:</span>
                                  <span>{comment.content}</span>
                                </div>
                              ))}
                            </div>
                          </details>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsStaffDetailOpen(false)}>
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
