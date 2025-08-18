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
  CheckSquare,
  Building,
  GitBranch,
  Briefcase,
  UserPlus,
  ListChecks,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface TaskChecklist {
  id: string;
  taskId: string;
  title: string;
  description: string;
  isCompleted: boolean;
  assignedHours: number;
  actualHours?: number;
  assignedTo?: string;
  createdDate: string;
  completedDate?: string;
}

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
  projectId?: string; // Link to actual project
  projectPhaseId?: string; // Link to specific project phase
  tags: string[];
  estimatedHours: number;
  actualHours?: number;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
  stage: "Planning" | "Development" | "Testing" | "Review" | "Deployment" | "Completed";
  comments: TaskComment[];
  checklist: TaskChecklist[];
  assignedTeam?: string;
  assignedDepartment?: string;
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

interface Project {
  id: string;
  projectId: string;
  name: string;
  description: string;
  status: "Not Started" | "In Progress" | "On Hold" | "Completed" | "Cancelled";
  phases: ProjectPhase[];
}

interface ProjectPhase {
  id: string;
  name: string;
  description: string;
  status: "Not Started" | "In Progress" | "Completed" | "On Hold" | "Cancelled";
  assignedTeam?: string;
  assignedMembers: string[];
}

interface Team {
  id: string;
  name: string;
  department: string;
  members: string[];
}

interface Department {
  id: string;
  name: string;
  teams: string[];
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
      projectId: "project-1",
      projectPhaseId: "phase-1",
      tags: ["Frontend", "Security"],
      estimatedHours: 20,
      actualHours: 12,
      createdBy: "Admin",
      createdDate: "2024-01-20",
      updatedDate: "2024-01-25",
      stage: "Development",
      assignedTeam: "frontend-team",
      assignedDepartment: "engineering",
      checklist: [
        {
          id: "cl-1",
          taskId: "1",
          title: "Setup JWT library",
          description: "Install and configure JWT token handling",
          isCompleted: true,
          assignedHours: 2,
          actualHours: 1.5,
          assignedTo: "John Smith",
          createdDate: "2024-01-20",
          completedDate: "2024-01-21"
        },
        {
          id: "cl-2",
          taskId: "1",
          title: "Create login component",
          description: "Build React login form component",
          isCompleted: true,
          assignedHours: 4,
          actualHours: 3.5,
          assignedTo: "John Smith",
          createdDate: "2024-01-20",
          completedDate: "2024-01-22"
        },
        {
          id: "cl-3",
          taskId: "1",
          title: "Implement password validation",
          description: "Add robust password validation rules",
          isCompleted: false,
          assignedHours: 3,
          assignedTo: "John Smith",
          createdDate: "2024-01-20"
        }
      ],
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
      projectId: "project-2",
      tags: ["Design", "Wireframes"],
      estimatedHours: 8,
      actualHours: 6,
      createdBy: "Admin",
      createdDate: "2024-01-18",
      updatedDate: "2024-01-24",
      stage: "Review",
      assignedTeam: "design-team",
      assignedDepartment: "design",
      checklist: [
        {
          id: "cl-4",
          taskId: "2",
          title: "Research user requirements",
          description: "Gather and analyze user needs",
          isCompleted: true,
          assignedHours: 3,
          actualHours: 2.5,
          assignedTo: "Sarah Johnson",
          createdDate: "2024-01-18",
          completedDate: "2024-01-19"
        },
        {
          id: "cl-5",
          taskId: "2",
          title: "Create initial wireframes",
          description: "Design basic layout wireframes",
          isCompleted: true,
          assignedHours: 4,
          actualHours: 3,
          assignedTo: "Sarah Johnson",
          createdDate: "2024-01-18",
          completedDate: "2024-01-21"
        },
        {
          id: "cl-6",
          taskId: "2",
          title: "Mobile responsive design",
          description: "Adapt wireframes for mobile devices",
          isCompleted: false,
          assignedHours: 2,
          assignedTo: "Sarah Johnson",
          createdDate: "2024-01-18"
        }
      ],
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
      projectId: "project-1",
      projectPhaseId: "phase-2",
      tags: ["Database", "Performance"],
      estimatedHours: 15,
      createdBy: "Admin",
      createdDate: "2024-01-22",
      updatedDate: "2024-01-22",
      stage: "Planning",
      assignedTeam: "backend-team",
      assignedDepartment: "engineering",
      checklist: [],
      comments: []
    }
  ]);

  const [projects] = useState<Project[]>([
    {
      id: "project-1",
      projectId: "PRJ-001",
      name: "E-commerce Platform",
      description: "Complete e-commerce solution",
      status: "In Progress",
      phases: [
        {
          id: "phase-1",
          name: "Authentication Module",
          description: "User authentication and authorization",
          status: "In Progress",
          assignedTeam: "frontend-team",
          assignedMembers: ["staff-1", "staff-2"]
        },
        {
          id: "phase-2",
          name: "Database Layer",
          description: "Database design and optimization",
          status: "Not Started",
          assignedTeam: "backend-team",
          assignedMembers: ["staff-3"]
        }
      ]
    },
    {
      id: "project-2",
      projectId: "PRJ-002",
      name: "Mobile App Design",
      description: "Mobile application UI/UX design",
      status: "In Progress",
      phases: [
        {
          id: "phase-3",
          name: "User Research",
          description: "Research and wireframing",
          status: "In Progress",
          assignedTeam: "design-team",
          assignedMembers: ["staff-2"]
        }
      ]
    }
  ]);

  const [teams] = useState<Team[]>([
    {
      id: "frontend-team",
      name: "Frontend Team",
      department: "engineering",
      members: ["staff-1", "staff-2"]
    },
    {
      id: "backend-team",
      name: "Backend Team", 
      department: "engineering",
      members: ["staff-3"]
    },
    {
      id: "design-team",
      name: "Design Team",
      department: "design",
      members: ["staff-2"]
    }
  ]);

  const [departments] = useState<Department[]>([
    {
      id: "engineering",
      name: "Engineering",
      teams: ["frontend-team", "backend-team"]
    },
    {
      id: "design",
      name: "Design",
      teams: ["design-team"]
    },
    {
      id: "marketing",
      name: "Marketing",
      teams: []
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
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState("all-tasks");
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assigneeId: "",
    priority: "Medium",
    dueDate: "",
    projectId: "",
    projectPhaseId: "",
    estimatedHours: "",
    tags: "",
    assignedTeam: "",
    assignedDepartment: ""
  });

  const [newChecklistItem, setNewChecklistItem] = useState({
    title: "",
    description: "",
    assignedHours: "",
    assignedTo: ""
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [staffFilter, setStaffFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [teamFilter, setTeamFilter] = useState("All");
  const [projectFilter, setProjectFilter] = useState("All");
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
    const matchesDepartment = departmentFilter === "All" || task.assignedDepartment === departmentFilter;
    const matchesTeam = teamFilter === "All" || task.assignedTeam === teamFilter;
    const matchesProject = projectFilter === "All" || task.projectId === projectFilter;
    
    const taskDate = new Date(task.createdDate);
    const matchesDateFrom = !dateFrom || taskDate >= dateFrom;
    const matchesDateTo = !dateTo || taskDate <= dateTo;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesStaff && 
           matchesDepartment && matchesTeam && matchesProject && matchesDateFrom && matchesDateTo;
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
    const selectedProject = projects.find(p => p.id === newTask.projectId);
    
    const task: Task = {
      id: Date.now().toString(),
      taskId: generateTaskId(),
      ...newTask,
      assignee: assignee?.name || "",
      project: selectedProject?.name || "",
      status: "To Do",
      stage: "Planning",
      estimatedHours: parseInt(newTask.estimatedHours) || 0,
      tags: newTask.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      createdBy: "Admin",
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      checklist: [],
      comments: []
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: "", description: "", assigneeId: "", priority: "Medium",
      dueDate: "", projectId: "", projectPhaseId: "", estimatedHours: "", 
      tags: "", assignedTeam: "", assignedDepartment: ""
    });
    setIsCreateTaskOpen(false);

    toast({
      title: "Task Created",
      description: `Task "${task.taskId}" has been assigned to ${task.assignee}.`,
    });
  };

  const handleAddChecklistItem = (taskId: string) => {
    if (!newChecklistItem.title || !newChecklistItem.assignedHours) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and assigned hours.",
        variant: "destructive",
      });
      return;
    }

    const checklistItem: TaskChecklist = {
      id: Date.now().toString(),
      taskId,
      title: newChecklistItem.title,
      description: newChecklistItem.description,
      isCompleted: false,
      assignedHours: parseInt(newChecklistItem.assignedHours),
      assignedTo: newChecklistItem.assignedTo || undefined,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, checklist: [...task.checklist, checklistItem], updatedDate: new Date().toISOString().split('T')[0] }
        : task
    ));

    setNewChecklistItem({
      title: "", description: "", assignedHours: "", assignedTo: ""
    });

    toast({
      title: "Checklist Item Added",
      description: "New checklist item has been added to the task.",
    });
  };

  const handleChecklistToggle = (taskId: string, checklistId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? {
            ...task,
            checklist: task.checklist.map(item =>
              item.id === checklistId 
                ? { 
                    ...item, 
                    isCompleted: !item.isCompleted,
                    completedDate: !item.isCompleted ? new Date().toISOString().split('T')[0] : undefined
                  }
                : item
            ),
            updatedDate: new Date().toISOString().split('T')[0]
          }
        : task
    ));
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
                      
                      {/* Checklist Progress in Kanban */}
                      {task.checklist.length > 0 && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs">
                            <ListChecks className="h-3 w-3" />
                            <span>
                              {task.checklist.filter(c => c.isCompleted).length}/{task.checklist.length} items
                            </span>
                          </div>
                          <Progress 
                            value={(task.checklist.filter(c => c.isCompleted).length / task.checklist.length) * 100} 
                            className="h-1" 
                          />
                          <div className="space-y-1">
                            {task.checklist.slice(0, 3).map(item => (
                              <div key={item.id} className="flex items-center gap-1 text-xs">
                                <Checkbox 
                                  checked={item.isCompleted}
                                  onCheckedChange={() => handleChecklistToggle(task.id, item.id)}
                                  className="h-3 w-3"
                                />
                                <span className={item.isCompleted ? "line-through text-muted-foreground" : ""}>
                                  {item.title}
                                </span>
                                <span className="text-muted-foreground">({item.assignedHours}h)</span>
                              </div>
                            ))}
                            {task.checklist.length > 3 && (
                              <div className="text-xs text-muted-foreground">
                                +{task.checklist.length - 3} more items
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
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
              Manage tasks with checklists, team assignments, and project linking
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
                
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={teamFilter} onValueChange={setTeamFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Teams</SelectItem>
                    {teams.map(team => (
                      <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                
                <Select value={projectFilter} onValueChange={setProjectFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Projects</SelectItem>
                    {projects.map(project => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.projectId} - {project.name}
                      </SelectItem>
                    ))}
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
              <CardTitle className="text-sm font-medium">With Checklists</CardTitle>
              <ListChecks className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredTasks.filter(t => t.checklist.length > 0).length}
              </div>
              <p className="text-xs text-muted-foreground">
                {filteredTasks.reduce((sum, t) => sum + t.checklist.length, 0)} total items
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Department Tasks</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {departmentFilter !== "All" 
                  ? filteredTasks.filter(t => t.assignedDepartment === departmentFilter).length 
                  : filteredTasks.length}
              </div>
              <p className="text-xs text-muted-foreground">
                {departmentFilter !== "All" 
                  ? departments.find(d => d.id === departmentFilter)?.name 
                  : "All departments"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Tasks</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teamFilter !== "All" 
                  ? filteredTasks.filter(t => t.assignedTeam === teamFilter).length 
                  : filteredTasks.length}
              </div>
              <p className="text-xs text-muted-foreground">
                {teamFilter !== "All" 
                  ? teams.find(t => t.id === teamFilter)?.name 
                  : "All teams"}
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
                              <Briefcase className="h-3 w-3" />
                              {task.project}
                            </div>
                            {task.assignedTeam && (
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {teams.find(t => t.id === task.assignedTeam)?.name}
                              </div>
                            )}
                            {task.assignedDepartment && (
                              <div className="flex items-center gap-1">
                                <Building className="h-3 w-3" />
                                {departments.find(d => d.id === task.assignedDepartment)?.name}
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3" />
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                          </div>

                          {/* Checklist Summary */}
                          {task.checklist.length > 0 && (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <ListChecks className="h-4 w-4" />
                                <span className="font-medium">
                                  Checklist ({task.checklist.filter(c => c.isCompleted).length}/{task.checklist.length})
                                </span>
                                <span className="text-muted-foreground">
                                  - {task.checklist.reduce((sum, c) => sum + c.assignedHours, 0)}h total
                                </span>
                              </div>
                              <Progress 
                                value={(task.checklist.filter(c => c.isCompleted).length / task.checklist.length) * 100} 
                                className="h-2" 
                              />
                            </div>
                          )}

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
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedTask(task);
                                  setIsChecklistOpen(true);
                                }}
                              >
                                <ListChecks className="mr-2 h-4 w-4" />
                                Manage Checklist
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
                          <Badge variant="outline">
                            {staffTasks.reduce((sum, t) => sum + t.checklist.length, 0)} checklist items
                          </Badge>
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
                                  {task.checklist.length > 0 && (
                                    <Badge variant="secondary" className="text-xs">
                                      <ListChecks className="h-3 w-3 mr-1" />
                                      {task.checklist.filter(c => c.isCompleted).length}/{task.checklist.length}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Due: {new Date(task.dueDate).toLocaleDateString()} • {task.project}
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

          {/* Analytics Tab */}
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
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {(analyticsStaff === "All" ? staffMembers : staffMembers.filter(s => s.id === analyticsStaff))
                .map((staff) => {
                  const analytics = getStaffAnalytics(staff.id);
                  const staffTasks = tasks.filter(t => t.assigneeId === staff.id);
                  const checklistStats = {
                    total: staffTasks.reduce((sum, t) => sum + t.checklist.length, 0),
                    completed: staffTasks.reduce((sum, t) => sum + t.checklist.filter(c => c.isCompleted).length, 0),
                    totalHours: staffTasks.reduce((sum, t) => sum + t.checklist.reduce((hrs, c) => hrs + c.assignedHours, 0), 0)
                  };
                  
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
                            <div className="font-medium">Checklist Items</div>
                            <div className="text-2xl font-bold text-blue-600">{checklistStats.completed}/{checklistStats.total}</div>
                          </div>
                          <div>
                            <div className="font-medium">Checklist Hours</div>
                            <div className="text-2xl font-bold text-purple-600">{checklistStats.totalHours}h</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span>Task Completion</span>
                            <span className="font-medium">{analytics.completionRate.toFixed(1)}%</span>
                          </div>
                          <Progress value={analytics.completionRate} className="h-2" />
                        </div>
                        
                        {checklistStats.total > 0 && (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span>Checklist Progress</span>
                              <span className="font-medium">{((checklistStats.completed / checklistStats.total) * 100).toFixed(1)}%</span>
                            </div>
                            <Progress value={(checklistStats.completed / checklistStats.total) * 100} className="h-2" />
                          </div>
                        )}
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
                const checklistItems = periodTasks.reduce((sum, t) => sum + t.checklist.length, 0);
                const completedChecklistItems = periodTasks.reduce((sum, t) => sum + t.checklist.filter(c => c.isCompleted).length, 0);
                
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
                      <div className="grid grid-cols-5 gap-4 text-center">
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
                        <div>
                          <div className="text-2xl font-bold text-orange-600">{completedChecklistItems}/{checklistItems}</div>
                          <div className="text-sm text-muted-foreground">Checklist Items</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Task Detail Dialog */}
        <Dialog open={isTaskDetailOpen} onOpenChange={setIsTaskDetailOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono">
                  {selectedTask?.taskId}
                </Badge>
                {selectedTask?.title}
              </DialogTitle>
              <DialogDescription>
                Task details, checklist, and comments
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
                      <Label className="text-sm font-medium">Project</Label>
                      <p className="text-sm text-muted-foreground">{selectedTask.project}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Team</Label>
                      <p className="text-sm text-muted-foreground">
                        {selectedTask.assignedTeam ? teams.find(t => t.id === selectedTask.assignedTeam)?.name : "Not assigned"}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Department</Label>
                      <p className="text-sm text-muted-foreground">
                        {selectedTask.assignedDepartment ? departments.find(d => d.id === selectedTask.assignedDepartment)?.name : "Not assigned"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
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
                    <div>
                      <Label className="text-sm font-medium">Due Date</Label>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedTask.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedTask.description}</p>
                </div>

                {/* Checklist Section */}
                {selectedTask.checklist.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-sm font-medium">
                        Checklist ({selectedTask.checklist.filter(c => c.isCompleted).length}/{selectedTask.checklist.length})
                      </Label>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setIsChecklistOpen(true);
                        }}
                      >
                        <ListChecks className="mr-1 h-3 w-3" />
                        Manage Checklist
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {selectedTask.checklist.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-2 border rounded">
                          <Checkbox 
                            checked={item.isCompleted}
                            onCheckedChange={() => handleChecklistToggle(selectedTask.id, item.id)}
                          />
                          <div className="flex-1">
                            <div className={`text-sm ${item.isCompleted ? "line-through text-muted-foreground" : ""}`}>
                              {item.title}
                            </div>
                            {item.description && (
                              <div className="text-xs text-muted-foreground">{item.description}</div>
                            )}
                            <div className="text-xs text-muted-foreground">
                              {item.assignedHours}h assigned {item.assignedTo && `• ${item.assignedTo}`}
                            </div>
                          </div>
                        </div>
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

        {/* Checklist Management Dialog */}
        <Dialog open={isChecklistOpen} onOpenChange={setIsChecklistOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Manage Checklist - {selectedTask?.title}</DialogTitle>
              <DialogDescription>
                Add and manage checklist items for this task
              </DialogDescription>
            </DialogHeader>
            
            {selectedTask && (
              <div className="space-y-4">
                {/* Add New Checklist Item */}
                <div className="border rounded-lg p-4 space-y-4">
                  <h4 className="font-medium">Add New Checklist Item</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="checklistTitle">Title *</Label>
                      <Input
                        id="checklistTitle"
                        value={newChecklistItem.title}
                        onChange={(e) => setNewChecklistItem(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter checklist item title"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="checklistDescription">Description</Label>
                      <Textarea
                        id="checklistDescription"
                        value={newChecklistItem.description}
                        onChange={(e) => setNewChecklistItem(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter description (optional)"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="assignedHours">Assigned Hours *</Label>
                      <Input
                        id="assignedHours"
                        type="number"
                        value={newChecklistItem.assignedHours}
                        onChange={(e) => setNewChecklistItem(prev => ({ ...prev, assignedHours: e.target.value }))}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="assignedTo">Assigned To</Label>
                      <Select 
                        value={newChecklistItem.assignedTo} 
                        onValueChange={(value) => setNewChecklistItem(prev => ({ ...prev, assignedTo: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                        <SelectContent>
                          {staffMembers.map((staff) => (
                            <SelectItem key={staff.id} value={staff.name}>
                              {staff.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={() => handleAddChecklistItem(selectedTask.id)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </div>

                {/* Existing Checklist Items */}
                <div>
                  <h4 className="font-medium mb-3">
                    Checklist Items ({selectedTask.checklist.filter(c => c.isCompleted).length}/{selectedTask.checklist.length})
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {selectedTask.checklist.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 p-3 border rounded">
                        <Checkbox 
                          checked={item.isCompleted}
                          onCheckedChange={() => handleChecklistToggle(selectedTask.id, item.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className={`font-medium ${item.isCompleted ? "line-through text-muted-foreground" : ""}`}>
                            {item.title}
                          </div>
                          {item.description && (
                            <div className="text-sm text-muted-foreground mt-1">{item.description}</div>
                          )}
                          <div className="text-sm text-muted-foreground mt-1">
                            <span className="font-medium">{item.assignedHours}h</span>
                            {item.assignedTo && <span> • Assigned to {item.assignedTo}</span>}
                            <span> • Created {new Date(item.createdDate).toLocaleDateString()}</span>
                            {item.completedDate && <span> • Completed {new Date(item.completedDate).toLocaleDateString()}</span>}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsChecklistOpen(false)}>
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
                Create a task and assign it to teams, departments, and projects
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
              
              {/* Project and Phase Selection */}
              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Select value={newTask.projectId} onValueChange={(value) => {
                  setNewTask(prev => ({ ...prev, projectId: value, projectPhaseId: "" }));
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.projectId} - {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="projectPhase">Project Phase</Label>
                <Select 
                  value={newTask.projectPhaseId} 
                  onValueChange={(value) => setNewTask(prev => ({ ...prev, projectPhaseId: value }))}
                  disabled={!newTask.projectId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select phase" />
                  </SelectTrigger>
                  <SelectContent>
                    {newTask.projectId && projects.find(p => p.id === newTask.projectId)?.phases.map((phase) => (
                      <SelectItem key={phase.id} value={phase.id}>
                        {phase.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Team and Department Assignment */}
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={newTask.assignedDepartment} onValueChange={(value) => {
                  setNewTask(prev => ({ ...prev, assignedDepartment: value, assignedTeam: "" }));
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="team">Team</Label>
                <Select 
                  value={newTask.assignedTeam} 
                  onValueChange={(value) => setNewTask(prev => ({ ...prev, assignedTeam: value }))}
                  disabled={!newTask.assignedDepartment}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    {newTask.assignedDepartment && teams.filter(t => t.department === newTask.assignedDepartment).map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
