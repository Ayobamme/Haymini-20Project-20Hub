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
import { Switch } from "@/components/ui/switch";
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
  Users,
  Calendar as CalendarIcon,
  DollarSign,
  Clock,
  Target,
  Eye,
  EyeOff,
  Star,
  AlertTriangle,
  CheckCircle2,
  PlayCircle,
  PauseCircle,
  Archive,
  Settings,
  FolderKanban,
  CalendarDays,
  X,
  List,
  KanbanSquare,
  ArrowRight,
  ArrowLeft,
  FileText,
  Briefcase,
  Activity,
  BarChart3,
  ListChecks,
  User,
  Building,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface Task {
  id: string;
  taskId: string;
  title: string;
  description: string;
  assignee: string;
  assigneeId: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "To Do" | "In Progress" | "Review" | "Done";
  dueDate: string;
  project: string;
  projectId?: string;
  tags: string[];
  estimatedHours: number;
  actualHours?: number;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
  stage: "Planning" | "Development" | "Testing" | "Review" | "Deployment" | "Completed";
  checklist: TaskChecklist[];
}

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

interface Project {
  id: string;
  projectId: string;
  name: string;
  description: string;
  status: "Not Started" | "In Progress" | "On Hold" | "Completed" | "Cancelled";
  priority: "Low" | "Medium" | "High" | "Critical";
  progress: number;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  owner: string;
  team: string;
  members: Array<{
    name: string;
    avatar?: string;
    role: string;
  }>;
  tags: string[];
  isPrivate: boolean;
  group: string;
  tasksTotal: number;
  tasksCompleted: number;
  issuesOpen: number;
  lastUpdate: string;
  createdDate: string;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  clientName?: string;
  contractValue?: number;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      projectId: "PRJ-001",
      name: "E-commerce Platform Redesign",
      description: "Complete overhaul of the e-commerce platform with modern UI/UX and improved performance",
      status: "In Progress",
      priority: "High",
      progress: 75,
      budget: 1500000,
      spent: 1125000,
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      owner: "John Doe",
      team: "Frontend Development",
      members: [
        { name: "John Doe", avatar: "", role: "Project Manager" },
        { name: "Sarah Wilson", avatar: "", role: "Lead Developer" },
        { name: "Mike Chen", avatar: "", role: "UI/UX Designer" },
      ],
      tags: ["Web", "E-commerce", "UI/UX"],
      isPrivate: false,
      group: "Customer Experience",
      tasksTotal: 45,
      tasksCompleted: 34,
      issuesOpen: 3,
      lastUpdate: "2024-01-25",
      createdDate: "2024-01-10",
      riskLevel: "Medium",
      clientName: "TechCorp Solutions",
      contractValue: 1800000,
    },
    {
      id: "2",
      projectId: "PRJ-002",
      name: "Mobile App Development",
      description: "Native mobile application for iOS and Android with cross-platform features",
      status: "In Progress",
      priority: "Medium",
      progress: 45,
      budget: 2000000,
      spent: 900000,
      startDate: "2024-02-01",
      endDate: "2024-05-30",
      owner: "Sarah Wilson",
      team: "Mobile Development",
      members: [
        { name: "Sarah Wilson", avatar: "", role: "Project Manager" },
        { name: "Alex Rodriguez", avatar: "", role: "Mobile Developer" },
        { name: "Emma Davis", avatar: "", role: "QA Engineer" },
      ],
      tags: ["Mobile", "iOS", "Android"],
      isPrivate: false,
      group: "Product Development",
      tasksTotal: 60,
      tasksCompleted: 27,
      issuesOpen: 5,
      lastUpdate: "2024-01-23",
      createdDate: "2024-01-20",
      riskLevel: "Low",
      clientName: "Mobile First Inc",
      contractValue: 2200000,
    }
  ]);

  // Sample tasks linked to projects
  const [projectTasks] = useState<Task[]>([
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
      project: "E-commerce Platform Redesign",
      projectId: "1",
      tags: ["Frontend", "Security"],
      estimatedHours: 20,
      actualHours: 12,
      createdBy: "Admin",
      createdDate: "2024-01-20",
      updatedDate: "2024-01-25",
      stage: "Development",
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
      project: "E-commerce Platform Redesign",
      projectId: "1",
      tags: ["Design", "Wireframes"],
      estimatedHours: 8,
      actualHours: 6,
      createdBy: "Admin",
      createdDate: "2024-01-18",
      updatedDate: "2024-01-24",
      stage: "Review",
      checklist: []
    },
    {
      id: "3",
      taskId: "TSK-003",
      title: "Mobile app architecture design",
      description: "Design the overall architecture for the mobile application",
      assignee: "Alex Rodriguez",
      assigneeId: "staff-3",
      priority: "High",
      status: "To Do",
      dueDate: "2024-02-20",
      project: "Mobile App Development",
      projectId: "2",
      tags: ["Architecture", "Mobile"],
      estimatedHours: 15,
      createdBy: "Admin",
      createdDate: "2024-01-22",
      updatedDate: "2024-01-22",
      stage: "Planning",
      checklist: []
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [startDateFilter, setStartDateFilter] = useState<Date | undefined>();
  const [endDateFilter, setEndDateFilter] = useState<Date | undefined>();
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectDetailOpen, setIsProjectDetailOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    priority: "Medium",
    team: "",
    startDate: "",
    endDate: "",
    budget: "",
    isPrivate: false,
    clientName: "",
    contractValue: ""
  });

  const generateProjectId = () => {
    const maxId = Math.max(...projects.map(p => parseInt(p.projectId.split('-')[1])), 0);
    return `PRJ-${String(maxId + 1).padStart(3, '0')}`;
  };

  const getTasksForProject = (projectId: string) => {
    return projectTasks.filter(task => task.projectId === projectId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Not Started": return "secondary";
      case "In Progress": return "default";
      case "On Hold": return "outline";
      case "Completed": return "default";
      case "Cancelled": return "destructive";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low": return "secondary";
      case "Medium": return "default";
      case "High": return "destructive";
      case "Critical": return "destructive";
      default: return "secondary";
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "To Do": return "outline";
      case "In Progress": return "default";
      case "Review": return "secondary";
      case "Done": return "default";
      default: return "outline";
    }
  };

  const getTaskPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low": return "secondary";
      case "Medium": return "default";
      case "High": return "destructive";
      case "Critical": return "destructive";
      default: return "outline";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-green-600";
      case "Medium": return "text-yellow-600";
      case "High": return "text-orange-600";
      case "Critical": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const isProjectInDateRange = (project: Project) => {
    const projectStart = new Date(project.startDate);
    const projectEnd = new Date(project.endDate);

    if (!startDateFilter && !endDateFilter) return true;

    if (startDateFilter && !endDateFilter) {
      return projectStart >= startDateFilter || projectEnd >= startDateFilter;
    }

    if (!startDateFilter && endDateFilter) {
      return projectStart <= endDateFilter || projectEnd <= endDateFilter;
    }

    if (startDateFilter && endDateFilter) {
      return (
        (projectStart >= startDateFilter && projectStart <= endDateFilter) ||
        (projectEnd >= startDateFilter && projectEnd <= endDateFilter) ||
        (projectStart <= startDateFilter && projectEnd >= endDateFilter)
      );
    }

    return true;
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.projectId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter;
    const matchesDateRange = isProjectInDateRange(project);

    return matchesSearch && matchesStatus && matchesPriority && matchesDateRange;
  });

  const handleCreateProject = () => {
    if (!newProject.name || !newProject.startDate || !newProject.endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const project: Project = {
      id: Date.now().toString(),
      projectId: generateProjectId(),
      ...newProject,
      status: "Not Started",
      progress: 0,
      spent: 0,
      budget: parseInt(newProject.budget) || 0,
      contractValue: parseInt(newProject.contractValue) || undefined,
      members: [],
      tags: [],
      group: newProject.team,
      tasksTotal: 0,
      tasksCompleted: 0,
      issuesOpen: 0,
      lastUpdate: new Date().toISOString().split('T')[0],
      createdDate: new Date().toISOString().split('T')[0],
      riskLevel: "Low",
    };

    setProjects([...projects, project]);
    setNewProject({
      name: "", description: "", priority: "Medium", team: "",
      startDate: "", endDate: "", budget: "", isPrivate: false,
      clientName: "", contractValue: ""
    });
    setShowCreateProject(false);

    toast({
      title: "Project Created",
      description: `Project "${project.projectId}" has been created successfully.`,
    });
  };

  const clearDateFilters = () => {
    setStartDateFilter(undefined);
    setEndDateFilter(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Project Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage projects and view linked tasks
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            >
              {viewMode === "grid" ? <List className="mr-2 h-4 w-4" /> : <FolderKanban className="mr-2 h-4 w-4" />}
              {viewMode === "grid" ? "List View" : "Grid View"}
            </Button>
            <Dialog open={showCreateProject} onOpenChange={setShowCreateProject}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>

        {/* Simplified Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search projects or Project ID..."
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
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDateFilter ? format(startDateFilter, "MMM dd") : "Start Date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDateFilter}
                        onSelect={setStartDateFilter}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <span className="text-sm text-muted-foreground">to</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDateFilter ? format(endDateFilter, "MMM dd") : "End Date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDateFilter}
                        onSelect={setEndDateFilter}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                {(startDateFilter || endDateFilter) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearDateFilters}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear Dates
                  </Button>
                )}
                <div className="text-sm text-muted-foreground ml-auto">
                  {filteredProjects.length} of {projects.length} projects
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Projects
                  </p>
                  <div className="text-3xl font-bold">
                    {filteredProjects.length}
                  </div>
                </div>
                <FolderKanban className="h-10 w-10 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    In Progress
                  </p>
                  <div className="text-3xl font-bold">
                    {filteredProjects.filter((p) => p.status === "In Progress").length}
                  </div>
                </div>
                <PlayCircle className="h-10 w-10 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Completed
                  </p>
                  <div className="text-3xl font-bold">
                    {filteredProjects.filter((p) => p.status === "Completed").length}
                  </div>
                </div>
                <CheckCircle2 className="h-10 w-10 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Tasks
                  </p>
                  <div className="text-3xl font-bold">
                    {projectTasks.length}
                  </div>
                </div>
                <ListChecks className="h-10 w-10 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map((project) => {
                  const linkedTasks = getTasksForProject(project.id);
                  return (
                    <Card
                      key={project.id}
                      className="hover:shadow-lg transition-all duration-300"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="font-mono text-xs">
                                {project.projectId}
                              </Badge>
                              <CardTitle className="text-lg">{project.name}</CardTitle>
                              {project.isPrivate && (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={getStatusColor(project.status)}>
                                {project.status}
                              </Badge>
                              <Badge variant={getPriorityColor(project.priority)}>
                                {project.priority}
                              </Badge>
                              <span className={`text-xs font-medium ${getRiskColor(project.riskLevel)}`}>
                                Risk: {project.riskLevel}
                              </span>
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
                                  setSelectedProject(project);
                                  setIsProjectDetailOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Details & Tasks
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Project
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Archive className="h-4 w-4 mr-2" />
                                Archive
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Budget</span>
                            <span className="font-medium">
                              ₦{(project.budget / 1000000).toFixed(1)}M
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Spent</span>
                            <span className="font-medium">
                              ₦{(project.spent / 1000000).toFixed(1)}M
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Linked Tasks</span>
                            <span className="font-medium">
                              {linkedTasks.filter(t => t.status === "Done").length}/{linkedTasks.length}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {new Date(project.startDate).toLocaleDateString()} -{" "}
                              {new Date(project.endDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {project.members.slice(0, 3).map((member, index) => (
                              <Avatar
                                key={index}
                                className="h-6 w-6 border-2 border-background"
                              >
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback className="text-xs">
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {project.members.length > 3 && (
                              <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                                <span className="text-xs">
                                  +{project.members.length - 3}
                                </span>
                              </div>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {project.team}
                          </span>
                        </div>

                        <div className="flex gap-1">
                          {project.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{project.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Projects List</CardTitle>
                  <CardDescription>
                    All projects with linked tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {filteredProjects.map((project) => {
                      const linkedTasks = getTasksForProject(project.id);
                      return (
                        <div
                          key={project.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="font-mono text-xs">
                                  {project.projectId}
                                </Badge>
                                <h4 className="font-semibold">{project.name}</h4>
                                {project.isPrivate && (
                                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={getStatusColor(project.status)}>
                                  {project.status}
                                </Badge>
                                <Badge variant={getPriorityColor(project.priority)}>
                                  {project.priority}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {project.team}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="text-sm font-medium">
                                {project.progress}%
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Progress
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-medium">
                                ₦{(project.budget / 1000000).toFixed(1)}M
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Budget
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-medium">
                                {linkedTasks.filter(t => t.status === "Done").length}/{linkedTasks.length}
                              </div>
                              <div className="text-xs text-muted-foreground">Tasks</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-medium">
                                {new Date(project.endDate).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Due Date
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
                                    setSelectedProject(project);
                                    setIsProjectDetailOpen(true);
                                  }}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details & Tasks
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Project
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Archive className="h-4 w-4 mr-2" />
                                  Archive
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Project Status Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Not Started", "In Progress", "On Hold", "Completed", "Cancelled"].map((status) => {
                      const count = filteredProjects.filter(p => p.status === status).length;
                      const percentage = filteredProjects.length > 0 ? (count / filteredProjects.length) * 100 : 0;
                      
                      return (
                        <div key={status} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Badge variant={getStatusColor(status as any)} className="text-xs">
                              {status}
                            </Badge>
                            <span className="text-sm">{count} projects</span>
                          </div>
                          <span className="text-sm font-medium">{percentage.toFixed(1)}%</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold">
                          ₦{(filteredProjects.reduce((sum, p) => sum + p.budget, 0) / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-sm text-muted-foreground">Total Budget</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">
                          ₦{(filteredProjects.reduce((sum, p) => sum + p.spent, 0) / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-sm text-muted-foreground">Total Spent</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Budget Utilization</span>
                        <span>
                          {filteredProjects.reduce((sum, p) => sum + p.budget, 0) > 0 
                            ? ((filteredProjects.reduce((sum, p) => sum + p.spent, 0) / filteredProjects.reduce((sum, p) => sum + p.budget, 0)) * 100).toFixed(1)
                            : 0}%
                        </span>
                      </div>
                      <Progress 
                        value={
                          filteredProjects.reduce((sum, p) => sum + p.budget, 0) > 0 
                            ? (filteredProjects.reduce((sum, p) => sum + p.spent, 0) / filteredProjects.reduce((sum, p) => sum + p.budget, 0)) * 100
                            : 0
                        } 
                        className="h-2" 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {filteredProjects.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FolderKanban className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Projects Found</h3>
              <p className="text-muted-foreground mb-4">
                No projects match your current search and filter criteria.
              </p>
              <Button onClick={() => setShowCreateProject(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Project
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Project Detail Dialog with Linked Tasks */}
        <Dialog open={isProjectDetailOpen} onOpenChange={setIsProjectDetailOpen}>
          <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono">
                  {selectedProject?.projectId}
                </Badge>
                {selectedProject?.name}
              </DialogTitle>
              <DialogDescription>
                Project details and linked tasks
              </DialogDescription>
            </DialogHeader>
            {selectedProject && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Project Owner</Label>
                      <p className="text-sm text-muted-foreground">{selectedProject.owner}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <div className="mt-1">
                        <Badge variant={getStatusColor(selectedProject.status)}>
                          {selectedProject.status}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Priority</Label>
                      <div className="mt-1">
                        <Badge variant={getPriorityColor(selectedProject.priority)}>
                          {selectedProject.priority}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Risk Level</Label>
                      <p className={`text-sm font-medium ${getRiskColor(selectedProject.riskLevel)}`}>
                        {selectedProject.riskLevel}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Budget</Label>
                      <p className="text-sm text-muted-foreground">
                        ₦{selectedProject.budget.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Spent</Label>
                      <p className="text-sm text-muted-foreground">
                        ₦{selectedProject.spent.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Timeline</Label>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedProject.startDate).toLocaleDateString()} - {new Date(selectedProject.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    {selectedProject.clientName && (
                      <div>
                        <Label className="text-sm font-medium">Client</Label>
                        <p className="text-sm text-muted-foreground">{selectedProject.clientName}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedProject.description}</p>
                </div>

                {/* Linked Tasks Section */}
                <div>
                  <Label className="text-sm font-medium">Linked Tasks ({getTasksForProject(selectedProject.id).length})</Label>
                  <div className="mt-3 space-y-3">
                    {getTasksForProject(selectedProject.id).map((task) => (
                      <div key={task.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono text-xs">
                              {task.taskId}
                            </Badge>
                            <h4 className="font-medium">{task.title}</h4>
                            <Badge variant={getTaskStatusColor(task.status)}>
                              {task.status}
                            </Badge>
                            <Badge variant={getTaskPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-3 w-3" />
                            {task.assignee}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                          <span>
                            Est: {task.estimatedHours}h | Actual: {task.actualHours || 0}h
                          </span>
                          {task.checklist.length > 0 && (
                            <span>
                              Checklist: {task.checklist.filter(c => c.isCompleted).length}/{task.checklist.length}
                            </span>
                          )}
                        </div>
                        {task.checklist.length > 0 && (
                          <Progress 
                            value={(task.checklist.filter(c => c.isCompleted).length / task.checklist.length) * 100} 
                            className="h-1 mt-2" 
                          />
                        )}
                      </div>
                    ))}
                    {getTasksForProject(selectedProject.id).length === 0 && (
                      <div className="text-center py-4 text-muted-foreground">
                        No tasks linked to this project yet.
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Team Members</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedProject.members.map((member, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="text-xs">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsProjectDetailOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Project Dialog */}
        <Dialog open={showCreateProject} onOpenChange={setShowCreateProject}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Set up a new project with timeline and team members
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input 
                  id="projectName" 
                  placeholder="Enter project name" 
                  value={newProject.name}
                  onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the project..."
                  rows={3}
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newProject.priority} onValueChange={(value) => setNewProject(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
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
                  <Label htmlFor="team">Team</Label>
                  <Input
                    id="team"
                    placeholder="Team name"
                    value={newProject.team}
                    onChange={(e) => setNewProject(prev => ({ ...prev, team: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newProject.endDate}
                    onChange={(e) => setNewProject(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Project budget"
                    value={newProject.budget}
                    onChange={(e) => setNewProject(prev => ({ ...prev, budget: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    placeholder="Client name"
                    value={newProject.clientName}
                    onChange={(e) => setNewProject(prev => ({ ...prev, clientName: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isPrivate"
                  checked={newProject.isPrivate}
                  onCheckedChange={(checked) => setNewProject(prev => ({ ...prev, isPrivate: checked }))}
                />
                <Label htmlFor="isPrivate">Private Project</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateProject(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProject}>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Projects;
