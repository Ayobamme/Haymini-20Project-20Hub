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
  CalendarDays,
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
  const [startDateFilter, setStartDateFilter] = useState<Date | undefined>();
  const [endDateFilter, setEndDateFilter] = useState<Date | undefined>();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newComment, setNewComment] = useState("");
  const [newChecklistItem, setNewChecklistItem] = useState("");

  // Task creation form state
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium" as Task["priority"],
    project: "",
    assigneeEmail: "",
    startDate: "",
    dueDate: "",
    estimatedHours: 0,
    tags: [] as string[],
    collaboratorEmails: [] as string[],
    initialChecklist: [] as string[],
  });
  const [newTag, setNewTag] = useState("");
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState("");
  const [newChecklistItemForm, setNewChecklistItemForm] = useState("");

  // Available team members for assignment
  const availableTeamMembers = [
    { name: "John Doe", email: "john@company.com", role: "Project Manager" },
    {
      name: "Sarah Wilson",
      email: "sarah@company.com",
      role: "Lead Developer",
    },
    { name: "Mike Chen", email: "mike@company.com", role: "UI/UX Designer" },
    {
      name: "Alex Rodriguez",
      email: "alex@company.com",
      role: "Backend Developer",
    },
    { name: "Emma Davis", email: "emma@company.com", role: "QA Engineer" },
    {
      name: "David Kim",
      email: "david@company.com",
      role: "Content Strategist",
    },
    { name: "Lisa Park", email: "lisa@company.com", role: "Marketing Manager" },
    {
      name: "Michael Brown",
      email: "michael@company.com",
      role: "Data Engineer",
    },
  ];

  // Available projects
  const availableProjects = [
    "E-commerce Platform Redesign",
    "Mobile App Development",
    "Marketing Campaign Q1",
    "Data Analytics Platform",
    "Website Redesign",
    "Customer Portal",
    "Inventory Management System",
  ];

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

  const addTagToNewTask = () => {
    if (newTag.trim() && !newTask.tags.includes(newTag.trim())) {
      setNewTask({
        ...newTask,
        tags: [...newTask.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const removeTagFromNewTask = (tagToRemove: string) => {
    setNewTask({
      ...newTask,
      tags: newTask.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const addCollaboratorToNewTask = () => {
    if (
      newCollaboratorEmail.trim() &&
      !newTask.collaboratorEmails.includes(newCollaboratorEmail.trim())
    ) {
      setNewTask({
        ...newTask,
        collaboratorEmails: [
          ...newTask.collaboratorEmails,
          newCollaboratorEmail.trim(),
        ],
      });
      setNewCollaboratorEmail("");
    }
  };

  const removeCollaboratorFromNewTask = (emailToRemove: string) => {
    setNewTask({
      ...newTask,
      collaboratorEmails: newTask.collaboratorEmails.filter(
        (email) => email !== emailToRemove,
      ),
    });
  };

  const addChecklistItemToNewTask = () => {
    if (
      newChecklistItemForm.trim() &&
      !newTask.initialChecklist.includes(newChecklistItemForm.trim())
    ) {
      setNewTask({
        ...newTask,
        initialChecklist: [
          ...newTask.initialChecklist,
          newChecklistItemForm.trim(),
        ],
      });
      setNewChecklistItemForm("");
    }
  };

  const removeChecklistItemFromNewTask = (itemToRemove: string) => {
    setNewTask({
      ...newTask,
      initialChecklist: newTask.initialChecklist.filter(
        (item) => item !== itemToRemove,
      ),
    });
  };

  const createTask = () => {
    if (!newTask.title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a task title.",
        variant: "destructive",
      });
      return;
    }

    if (!newTask.assigneeEmail) {
      toast({
        title: "Assignee Required",
        description: "Please select an assignee for the task.",
        variant: "destructive",
      });
      return;
    }

    const assignee = availableTeamMembers.find(
      (member) => member.email === newTask.assigneeEmail,
    );
    if (!assignee) {
      toast({
        title: "Invalid Assignee",
        description: "Please select a valid team member.",
        variant: "destructive",
      });
      return;
    }

    const collaborators = newTask.collaboratorEmails.map((email) => {
      const member = availableTeamMembers.find((m) => m.email === email);
      return {
        name: member?.name || email.split("@")[0],
        email: email,
        avatar: "",
      };
    });

    const checklist: ChecklistItem[] = newTask.initialChecklist.map(
      (item, index) => ({
        id: `CL-${Date.now()}-${index}`,
        title: item,
        completed: false,
      }),
    );

    const task: Task = {
      id: `TSK-${String(tasks.length + 1).padStart(3, "0")}`,
      title: newTask.title,
      description: newTask.description,
      status: "Todo",
      priority: newTask.priority,
      project: newTask.project,
      assignee: {
        name: assignee.name,
        email: assignee.email,
        avatar: "",
      },
      collaborators: collaborators,
      reporter: "Admin User",
      startDate: newTask.startDate || new Date().toISOString().split("T")[0],
      dueDate:
        newTask.dueDate ||
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      estimatedHours: newTask.estimatedHours,
      loggedHours: 0,
      tags: newTask.tags,
      checklist: checklist,
      comments: [],
      attachments: 0,
      isOverdue: false,
    };

    setTasks([...tasks, task]);

    // Reset form
    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      project: "",
      assigneeEmail: "",
      startDate: "",
      dueDate: "",
      estimatedHours: 0,
      tags: [],
      collaboratorEmails: [],
      initialChecklist: [],
    });

    setShowTaskDialog(false);

    toast({
      title: "Task Created",
      description: `Task "${task.title}" has been created and assigned to ${assignee.name}.`,
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

  const clearDateFilters = () => {
    setStartDateFilter(undefined);
    setEndDateFilter(undefined);
  };

  const isTaskInDateRange = (task: Task) => {
    const taskStart = new Date(task.startDate);
    const taskEnd = new Date(task.dueDate);

    // If no date filters are set, include all tasks
    if (!startDateFilter && !endDateFilter) return true;

    // If only start date filter is set
    if (startDateFilter && !endDateFilter) {
      return taskStart >= startDateFilter || taskEnd >= startDateFilter;
    }

    // If only end date filter is set
    if (!startDateFilter && endDateFilter) {
      return taskStart <= endDateFilter || taskEnd <= endDateFilter;
    }

    // If both date filters are set
    if (startDateFilter && endDateFilter) {
      return (
        (taskStart >= startDateFilter && taskStart <= endDateFilter) ||
        (taskEnd >= startDateFilter && taskEnd <= endDateFilter) ||
        (taskStart <= startDateFilter && taskEnd >= endDateFilter)
      );
    }

    return true;
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
    const matchesDateRange = isTaskInDateRange(task);

    return (
      matchesSearch && matchesStatus && matchesPriority && matchesDateRange
    );
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
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Create a comprehensive task with all details, assignments, and
                collaboration features
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Task Details</TabsTrigger>
                <TabsTrigger value="assignment">Assignment</TabsTrigger>
                <TabsTrigger value="checklist">Checklist</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 mt-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="taskTitle">Task Title *</Label>
                    <Input
                      id="taskTitle"
                      placeholder="Enter task title"
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="taskDescription">Description</Label>
                    <Textarea
                      id="taskDescription"
                      placeholder="Describe the task in detail..."
                      value={newTask.description}
                      onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                      }
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="taskPriority">Priority</Label>
                      <Select
                        value={newTask.priority}
                        onValueChange={(value) =>
                          setNewTask({
                            ...newTask,
                            priority: value as Task["priority"],
                          })
                        }
                      >
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

                    <div className="grid gap-2">
                      <Label htmlFor="taskProject">Project</Label>
                      <Select
                        value={newTask.project}
                        onValueChange={(value) =>
                          setNewTask({ ...newTask, project: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableProjects.map((project) => (
                            <SelectItem key={project} value={project}>
                              {project}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTagToNewTask();
                          }
                        }}
                      />
                      <Button type="button" onClick={addTagToNewTask} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {newTask.tags.length > 0 && (
                      <div className="flex gap-2 flex-wrap mt-2">
                        {newTask.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTagFromNewTask(tag)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="assignment" className="space-y-4 mt-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="taskAssignee">Assignee *</Label>
                    <Select
                      value={newTask.assigneeEmail}
                      onValueChange={(value) =>
                        setNewTask({ ...newTask, assigneeEmail: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select team member" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTeamMembers.map((member) => (
                          <SelectItem key={member.email} value={member.email}>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{member.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {member.role}
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label>Collaborators</Label>
                    <div className="flex gap-2">
                      <Select
                        value={newCollaboratorEmail}
                        onValueChange={setNewCollaboratorEmail}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Add collaborator" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTeamMembers
                            .filter(
                              (member) =>
                                member.email !== newTask.assigneeEmail &&
                                !newTask.collaboratorEmails.includes(
                                  member.email,
                                ),
                            )
                            .map((member) => (
                              <SelectItem
                                key={member.email}
                                value={member.email}
                              >
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-xs">
                                      {member.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">
                                      {member.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {member.role}
                                    </div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        onClick={addCollaboratorToNewTask}
                        size="sm"
                        disabled={!newCollaboratorEmail}
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </div>
                    {newTask.collaboratorEmails.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {newTask.collaboratorEmails.map((email) => {
                          const member = availableTeamMembers.find(
                            (m) => m.email === email,
                          );
                          return (
                            <div
                              key={email}
                              className="flex items-center justify-between p-2 border rounded"
                            >
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">
                                    {member?.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("") || email[0].toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-sm font-medium">
                                    {member?.name || email}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {member?.role || "External"}
                                  </div>
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  removeCollaboratorFromNewTask(email)
                                }
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="checklist" className="space-y-4 mt-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Initial Checklist Items</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add checklist item"
                        value={newChecklistItemForm}
                        onChange={(e) =>
                          setNewChecklistItemForm(e.target.value)
                        }
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addChecklistItemToNewTask();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={addChecklistItemToNewTask}
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {newTask.initialChecklist.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {newTask.initialChecklist.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 border rounded"
                          >
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{item}</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                removeChecklistItemFromNewTask(item)
                              }
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-4 mt-6">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newTask.startDate}
                        onChange={(e) =>
                          setNewTask({ ...newTask, startDate: e.target.value })
                        }
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) =>
                          setNewTask({ ...newTask, dueDate: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="estimatedHours">Estimated Hours</Label>
                    <Input
                      id="estimatedHours"
                      type="number"
                      min="0"
                      step="0.5"
                      placeholder="0"
                      value={newTask.estimatedHours || ""}
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          estimatedHours: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Task Summary</Label>
                    <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>Title:</span>
                        <span className="font-medium">
                          {newTask.title || "Untitled Task"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Priority:</span>
                        <Badge
                          variant="outline"
                          className={getPriorityColor(newTask.priority)}
                        >
                          {newTask.priority}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Assignee:</span>
                        <span className="font-medium">
                          {availableTeamMembers.find(
                            (m) => m.email === newTask.assigneeEmail,
                          )?.name || "Not assigned"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Collaborators:</span>
                        <span className="font-medium">
                          {newTask.collaboratorEmails.length}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Checklist Items:</span>
                        <span className="font-medium">
                          {newTask.initialChecklist.length}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Estimated Hours:</span>
                        <span className="font-medium">
                          {newTask.estimatedHours}h
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowTaskDialog(false);
                  // Reset form
                  setNewTask({
                    title: "",
                    description: "",
                    priority: "Medium",
                    project: "",
                    assigneeEmail: "",
                    startDate: "",
                    dueDate: "",
                    estimatedHours: 0,
                    tags: [],
                    collaboratorEmails: [],
                    initialChecklist: [],
                  });
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={createTask}
                disabled={!newTask.title.trim() || !newTask.assigneeEmail}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Enhanced Filters with Date Range */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
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
                <SelectTrigger className="w-full lg:w-[180px]">
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
                <SelectTrigger className="w-full lg:w-[180px]">
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

            {/* Date Range Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-center border-t pt-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Date Range:</Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <DatePicker
                  date={startDateFilter}
                  onDateChange={setStartDateFilter}
                  placeholder="Start date"
                  className="w-full sm:w-[160px]"
                />
                <span className="text-sm text-muted-foreground">to</span>
                <DatePicker
                  date={endDateFilter}
                  onDateChange={setEndDateFilter}
                  placeholder="End date"
                  className="w-full sm:w-[160px]"
                />
              </div>
              {(startDateFilter || endDateFilter) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearDateFilters}
                  className="flex items-center gap-2"
                >
                  <X className="h-3 w-3" />
                  Clear Dates
                </Button>
              )}
              <div className="text-sm text-muted-foreground">
                {filteredTasks.length} of {tasks.length} tasks
              </div>
            </div>
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
