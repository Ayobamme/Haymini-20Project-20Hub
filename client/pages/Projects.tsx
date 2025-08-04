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
import { DatePicker } from "@/components/ui/date-picker";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  Calendar,
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
} from "lucide-react";

interface Project {
  id: string;
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
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "PRJ-001",
      name: "E-commerce Platform Redesign",
      description:
        "Complete overhaul of the e-commerce platform with modern UI/UX and improved performance",
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
    },
    {
      id: "PRJ-002",
      name: "Mobile App Development",
      description:
        "Native mobile application for iOS and Android with cross-platform features",
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
    },
    {
      id: "PRJ-003",
      name: "Marketing Campaign Q1",
      description:
        "Comprehensive marketing strategy and campaign execution for Q1 2024",
      status: "Completed",
      priority: "Medium",
      progress: 100,
      budget: 800000,
      spent: 750000,
      startDate: "2023-12-01",
      endDate: "2024-01-31",
      owner: "Lisa Park",
      team: "Marketing",
      members: [
        { name: "Lisa Park", avatar: "", role: "Marketing Manager" },
        { name: "David Kim", avatar: "", role: "Content Strategist" },
        { name: "Jennifer Lee", avatar: "", role: "Graphic Designer" },
      ],
      tags: ["Marketing", "Campaign", "Content"],
      isPrivate: false,
      group: "Marketing & Sales",
      tasksTotal: 28,
      tasksCompleted: 28,
      issuesOpen: 0,
      lastUpdate: "2024-01-31",
    },
    {
      id: "PRJ-004",
      name: "Data Analytics Platform",
      description:
        "Internal analytics platform for business intelligence and reporting",
      status: "On Hold",
      priority: "Low",
      progress: 20,
      budget: 1200000,
      spent: 240000,
      startDate: "2024-01-01",
      endDate: "2024-06-30",
      owner: "Michael Brown",
      team: "Data Engineering",
      members: [
        { name: "Michael Brown", avatar: "", role: "Data Engineer" },
        { name: "Anna Thompson", avatar: "", role: "Data Scientist" },
      ],
      tags: ["Analytics", "BI", "Data"],
      isPrivate: true,
      group: "Technology",
      tasksTotal: 35,
      tasksCompleted: 7,
      issuesOpen: 2,
      lastUpdate: "2024-01-10",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [startDateFilter, setStartDateFilter] = useState<Date | undefined>();
  const [endDateFilter, setEndDateFilter] = useState<Date | undefined>();
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleDateFilter = () => {
    // Date filtering is now handled in the filteredProjects computed value
    console.log("Date filter applied:", { startDateFilter, endDateFilter });
  };

  const clearDateFilters = () => {
    setStartDateFilter(undefined);
    setEndDateFilter(undefined);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Not Started":
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0";
      case "In Progress":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0";
      case "On Hold":
        return "bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-0";
      case "Completed":
        return "bg-gradient-to-r from-green-500 to-green-600 text-white border-0";
      case "Cancelled":
        return "bg-gradient-to-r from-red-500 to-red-600 text-white border-0";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-gradient-to-r from-green-400 to-green-500 text-white border-0";
      case "Medium":
        return "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white border-0";
      case "High":
        return "bg-gradient-to-r from-orange-500 to-red-500 text-white border-0";
      case "Critical":
        return "bg-gradient-to-r from-red-600 to-red-700 text-white border-0";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0";
    }
  };

  const isProjectInDateRange = (project: Project) => {
    const projectStart = new Date(project.startDate);
    const projectEnd = new Date(project.endDate);

    // If no date filters are set, include all projects
    if (!startDateFilter && !endDateFilter) return true;

    // If only start date filter is set
    if (startDateFilter && !endDateFilter) {
      return projectStart >= startDateFilter || projectEnd >= startDateFilter;
    }

    // If only end date filter is set
    if (!startDateFilter && endDateFilter) {
      return projectStart <= endDateFilter || projectEnd <= endDateFilter;
    }

    // If both date filters are set
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
      project.team.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || project.priority === priorityFilter;
    const matchesDateRange = isProjectInDateRange(project);

    return (
      matchesSearch && matchesStatus && matchesPriority && matchesDateRange
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              Project Management
            </h1>
            <p className="text-lg text-slate-600">
              Manage and track all your projects with advanced filtering
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="border-2 border-slate-300 hover:bg-slate-100"
            >
              {viewMode === "grid" ? "List View" : "Grid View"}
            </Button>
            <Dialog open={showCreateProject} onOpenChange={setShowCreateProject}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white border-0 shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl border-0 shadow-2xl bg-gradient-to-br from-white to-slate-50">
                <DialogHeader>
                  <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Create New Project
                  </DialogTitle>
                  <DialogDescription className="text-slate-600">
                    Set up a new project with team members and timeline
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="projectName" className="text-slate-700 font-medium">Project Name</Label>
                    <Input id="projectName" placeholder="Enter project name" className="border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description" className="text-slate-700 font-medium">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the project..."
                      rows={3}
                      className="border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="priority" className="text-slate-700 font-medium">Priority</Label>
                      <Select>
                        <SelectTrigger className="border-2 border-slate-200 focus:border-blue-400">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="team" className="text-slate-700 font-medium">Team</Label>
                      <Select>
                        <SelectTrigger className="border-2 border-slate-200 focus:border-blue-400">
                          <SelectValue placeholder="Select team" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="frontend">
                            Frontend Development
                          </SelectItem>
                          <SelectItem value="backend">
                            Backend Development
                          </SelectItem>
                          <SelectItem value="mobile">
                            Mobile Development
                          </SelectItem>
                          <SelectItem value="design">Design Team</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="startDate" className="text-slate-700 font-medium">Start Date</Label>
                      <DatePicker placeholder="Select start date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="endDate" className="text-slate-700 font-medium">End Date</Label>
                      <DatePicker placeholder="Select end date" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="budget" className="text-slate-700 font-medium">Budget (₦)</Label>
                    <Input id="budget" type="number" placeholder="0" className="border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="private" />
                    <Label htmlFor="private" className="text-slate-700 font-medium">Make this project private</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateProject(false)}
                    className="border-2 border-slate-300 hover:bg-slate-100"
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setShowCreateProject(false)} className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white border-0">
                    Create Project
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Enhanced Filters with Date Range */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-slate-50">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full lg:w-[180px] border-2 border-slate-200 focus:border-blue-400">
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
                  <SelectTrigger className="w-full lg:w-[180px] border-2 border-slate-200 focus:border-blue-400">
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
                    className="flex items-center gap-2 border-2 border-slate-300 hover:bg-slate-100"
                  >
                    <X className="h-3 w-3" />
                    Clear Dates
                  </Button>
                )}
                <div className="text-sm text-muted-foreground">
                  {filteredProjects.length} of {projects.length} projects
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-100">
                    Total Projects
                  </p>
                  <div className="text-3xl font-bold">
                    {filteredProjects.length}
                  </div>
                </div>
                <FolderKanban className="h-10 w-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-100">
                    In Progress
                  </p>
                  <div className="text-3xl font-bold">
                    {
                      filteredProjects.filter((p) => p.status === "In Progress")
                        .length
                    }
                  </div>
                </div>
                <PlayCircle className="h-10 w-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-100">
                    Completed
                  </p>
                  <div className="text-3xl font-bold">
                    {
                      filteredProjects.filter((p) => p.status === "Completed")
                        .length
                    }
                  </div>
                </div>
                <CheckCircle2 className="h-10 w-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-100">
                    Total Budget
                  </p>
                  <div className="text-3xl font-bold">
                    ₦
                    {(
                      filteredProjects.reduce((sum, p) => sum + p.budget, 0) /
                      1000000
                    ).toFixed(1)}
                    M
                  </div>
                </div>
                <DollarSign className="h-10 w-10 text-emerald-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg text-slate-800">{project.name}</CardTitle>
                        {project.isPrivate && (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <Badge className={getPriorityColor(project.priority)}>
                          {project.priority}
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
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
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
                      <span className="font-medium text-emerald-600">
                        ₦{(project.budget / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Spent</span>
                      <span className="font-medium text-red-600">
                        ₦{(project.spent / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tasks</span>
                      <span className="font-medium">
                        {project.tasksCompleted}/{project.tasksTotal}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
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
                          <AvatarFallback className="text-xs bg-gradient-to-r from-indigo-400 to-purple-500 text-white">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.members.length > 3 && (
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-slate-400 to-slate-500 border-2 border-background flex items-center justify-center">
                          <span className="text-xs text-white">
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
                      <Badge key={tag} variant="secondary" className="text-xs bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 border-0">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 border-0">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-t-lg">
              <CardTitle className="text-xl">Projects List</CardTitle>
              <CardDescription className="text-blue-100">
                All projects with detailed information
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-slate-800">{project.name}</h4>
                          {project.isPrivate && (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                          <Badge className={getPriorityColor(project.priority)}>
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
                        <div className="text-sm font-medium text-emerald-600">
                          ₦{(project.budget / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Budget
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">
                          {project.tasksCompleted}/{project.tasksTotal}
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
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
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
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {filteredProjects.length === 0 && (
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
            <CardContent className="p-12 text-center">
              <FolderKanban className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Projects Found</h3>
              <p className="text-muted-foreground mb-4">
                No projects match your current search and filter criteria.
              </p>
              <Button onClick={() => setShowCreateProject(true)} className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white border-0">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Project
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Projects;
