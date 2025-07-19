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
import { DatePicker } from "@/components/ui/date-picker";
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
  UserPlus,
  Check,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: Date;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: "Todo" | "In Progress" | "Done" | "Blocked";
  priority: "Low" | "Medium" | "High" | "Critical";
  project: string;
  assignee: {
    name: string;
    avatar?: string;
    email: string;
  };
  collaborators: Array<{
    name: string;
    avatar?: string;
    email: string;
  }>;
  reporter: string;
  startDate: string;
  dueDate: string;
  estimatedHours: number;
  loggedHours: number;
  tags: string[];
  checklist: ChecklistItem[];
  comments: Comment[];
  attachments: number;
  isOverdue: boolean;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "TSK-001",
      title: "Review user interface mockups",
      description:
        "Review and provide feedback on the new user interface mockups for the e-commerce platform",
      status: "In Progress",
      priority: "High",
      project: "E-commerce Platform Redesign",
      assignee: {
        name: "John Doe",
        avatar: "",
        email: "john@company.com",
      },
      collaborators: [
        { name: "Sarah Wilson", email: "sarah@company.com" },
        { name: "Mike Chen", email: "mike@company.com" },
      ],
      reporter: "Sarah Wilson",
      startDate: "2024-01-20",
      dueDate: "2024-01-28",
      estimatedHours: 8,
      loggedHours: 4.5,
      tags: ["UI/UX", "Review"],
      checklist: [
        { id: "CL-001", title: "Review homepage mockup", completed: true },
        { id: "CL-002", title: "Review product page mockup", completed: true },
        { id: "CL-003", title: "Review checkout mockup", completed: false },
        { id: "CL-004", title: "Provide detailed feedback", completed: false },
      ],
      comments: [
        {
          id: "CM-001",
          author: "Sarah Wilson",
          content:
            "Started reviewing the homepage mockup. Looking good so far!",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          id: "CM-002",
          author: "John Doe",
          content:
            "Thanks! Will update the checkout flow based on your feedback.",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        },
      ],
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
      project: "Mobile App Development",
      assignee: {
        name: "Sarah Wilson",
        avatar: "",
        email: "sarah@company.com",
      },
      collaborators: [{ name: "Alex Rodriguez", email: "alex@company.com" }],
      reporter: "Alex Rodriguez",
      startDate: "2024-01-29",
      dueDate: "2024-02-05",
      estimatedHours: 16,
      loggedHours: 0,
      tags: ["Backend", "Payment"],
      checklist: [
        { id: "CL-005", title: "Set up Stripe account", completed: false },
        {
          id: "CL-006",
          title: "Create payment API endpoints",
          completed: false,
        },
        { id: "CL-007", title: "Test payment flow", completed: false },
        { id: "CL-008", title: "Document integration", completed: false },
      ],
      comments: [
        {
          id: "CM-003",
          author: "Alex Rodriguez",
          content: "Please prioritize this for the next sprint.",
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        },
      ],
      attachments: 0,
      isOverdue: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newComment, setNewComment] = useState("");
  const [newChecklistItem, setNewChecklistItem] = useState("");

  const calculateProgress = (checklist: ChecklistItem[]) => {
    if (checklist.length === 0) return 0;
    const completed = checklist.filter((item) => item.completed).length;
    return Math.round((completed / checklist.length) * 100);
  };

  const handleChecklistToggle = (taskId: string, checklistId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const updatedChecklist = task.checklist.map((item) =>
            item.id === checklistId
              ? { ...item, completed: !item.completed }
              : item,
          );
          return { ...task, checklist: updatedChecklist };
        }
        return task;
      }),
    );
    toast({
      title: "Checklist Updated",
      description: "Task progress has been updated.",
    });
  };

  const addChecklistItem = (taskId: string) => {
    if (!newChecklistItem.trim()) return;

    const newItem: ChecklistItem = {
      id: `CL-${Date.now()}`,
      title: newChecklistItem.trim(),
      completed: false,
    };

    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, checklist: [...task.checklist, newItem] }
          : task,
      ),
    );

    setNewChecklistItem("");
    toast({
      title: "Checklist Item Added",
      description: "New checklist item has been added to the task.",
    });
  };

  const addComment = (taskId: string) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `CM-${Date.now()}`,
      author: "Admin User",
      content: newComment.trim(),
      timestamp: new Date(),
    };

    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, comments: [...task.comments, comment] }
          : task,
      ),
    );

    setNewComment("");
    toast({
      title: "Comment Added",
      description: "Your comment has been added to the task.",
    });
  };

  const updateTaskStatus = (taskId: string, newStatus: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus as Task["status"] }
          : task,
      ),
    );
    toast({
      title: "Task Updated",
      description: `Task status changed to ${newStatus}.`,
    });
  };

  const assignCollaborator = (taskId: string, email: string) => {
    // Mock implementation - in real app, you'd fetch user data
    const newCollaborator = {
      name: email.split("@")[0],
      email: email,
      avatar: "",
    };

    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const exists = task.collaborators.some((c) => c.email === email);
          if (!exists) {
            return {
              ...task,
              collaborators: [...task.collaborators, newCollaborator],
            };
          }
        }
        return task;
      }),
    );

    toast({
      title: "Collaborator Added",
      description: `${email} has been added as a collaborator.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Todo":
        return "bg-gray-100 text-gray-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Done":
        return "bg-green-100 text-green-800";
      case "Blocked":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.project.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
          <p className="text-muted-foreground">
            Manage and track all tasks with enhanced collaboration features
          </p>
        </div>
        <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Create a new task with checklist and collaboration features
              </DialogDescription>
            </DialogHeader>
            {/* Task creation form would go here */}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowTaskDialog(false)}
              >
                Cancel
              </Button>
              <Button>Create Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Todo">Todo</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
                <SelectItem value="Blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTasks.map((task) => {
          const progress = calculateProgress(task.checklist);
          return (
            <Card key={task.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={getStatusColor(task.status)}
                      >
                        {task.status}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={getPriorityColor(task.priority)}
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedTask(task);
                          setEditingTask(task);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Task
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => updateTaskStatus(task.id, "In Progress")}
                      >
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Start Task
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => updateTaskStatus(task.id, "Done")}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Mark Complete
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Task
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {task.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Checklist Preview */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Checklist</Label>
                  <div className="space-y-1">
                    {task.checklist.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={item.completed}
                          onCheckedChange={() =>
                            handleChecklistToggle(task.id, item.id)
                          }
                        />
                        <span
                          className={`text-sm ${
                            item.completed
                              ? "line-through text-muted-foreground"
                              : ""
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>
                    ))}
                    {task.checklist.length > 3 && (
                      <p className="text-xs text-muted-foreground">
                        +{task.checklist.length - 3} more items
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={task.assignee.avatar} />
                      <AvatarFallback className="text-xs">
                        {task.assignee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{task.assignee.name}</span>
                    {task.collaborators.length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        +{task.collaborators.length}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-sm">{task.comments.length}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setSelectedTask(task)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Task Detail Dialog */}
      <Dialog
        open={selectedTask !== null}
        onOpenChange={() => setSelectedTask(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedTask && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-xl">
                      {selectedTask.title}
                    </DialogTitle>
                    <DialogDescription>
                      {selectedTask.project} • {selectedTask.id}
                    </DialogDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(selectedTask.status)}>
                      {selectedTask.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={getPriorityColor(selectedTask.priority)}
                    >
                      {selectedTask.priority}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="checklist">Checklist</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="collaborators">Team</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Description</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedTask.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Assignee</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={selectedTask.assignee.avatar} />
                            <AvatarFallback className="text-xs">
                              {selectedTask.assignee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">
                            {selectedTask.assignee.name}
                          </span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Reporter</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedTask.reporter}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Start Date
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(
                            selectedTask.startDate,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Due Date</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(selectedTask.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Estimated Hours
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedTask.estimatedHours}h
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Logged Hours
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedTask.loggedHours}h
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Tags</Label>
                      <div className="flex gap-2 mt-1">
                        {selectedTask.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="checklist" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">
                        Task Checklist (
                        {calculateProgress(selectedTask.checklist)}% Complete)
                      </Label>
                      <Progress
                        value={calculateProgress(selectedTask.checklist)}
                        className="w-24 h-2"
                      />
                    </div>

                    <div className="space-y-2">
                      {selectedTask.checklist.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50"
                        >
                          <Checkbox
                            checked={item.completed}
                            onCheckedChange={() =>
                              handleChecklistToggle(selectedTask.id, item.id)
                            }
                          />
                          <span
                            className={`flex-1 text-sm ${
                              item.completed
                                ? "line-through text-muted-foreground"
                                : ""
                            }`}
                          >
                            {item.title}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Input
                        placeholder="Add new checklist item..."
                        value={newChecklistItem}
                        onChange={(e) => setNewChecklistItem(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addChecklistItem(selectedTask.id);
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={() => addChecklistItem(selectedTask.id)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="comments" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Comments</Label>

                    <div className="space-y-4 max-h-60 overflow-y-auto">
                      {selectedTask.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.avatar} />
                            <AvatarFallback className="text-xs">
                              {comment.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                {comment.author}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {comment.timestamp.toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                      />
                      <Button
                        size="sm"
                        onClick={() => addComment(selectedTask.id)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Add Comment
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="collaborators" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Team Members</Label>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={selectedTask.assignee.avatar} />
                            <AvatarFallback className="text-xs">
                              {selectedTask.assignee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {selectedTask.assignee.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {selectedTask.assignee.email}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">Assignee</Badge>
                      </div>

                      {selectedTask.collaborators.map((collaborator, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={collaborator.avatar} />
                              <AvatarFallback className="text-xs">
                                {collaborator.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {collaborator.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {collaborator.email}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline">Collaborator</Badge>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Add Collaborator
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter email address..."
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              const email = (e.target as HTMLInputElement)
                                .value;
                              if (email) {
                                assignCollaborator(selectedTask.id, email);
                                (e.target as HTMLInputElement).value = "";
                              }
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={(e) => {
                            const input = (
                              e.target as HTMLElement
                            ).parentElement?.querySelector("input");
                            if (input?.value) {
                              assignCollaborator(selectedTask.id, input.value);
                              input.value = "";
                            }
                          }}
                        >
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tasks;
