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
} from "lucide-react";

const projects = [
  {
    id: "PRJ-001",
    name: "E-commerce Platform Redesign",
    description:
      "Complete overhaul of the e-commerce platform with modern UI/UX and improved performance",
    status: "In Progress",
    priority: "High",
    progress: 75,
    budget: 150000,
    spent: 112500,
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
    budget: 200000,
    spent: 90000,
    startDate: "2024-02-01",
    endDate: "2024-06-01",
    owner: "Alex Rodriguez",
    team: "Backend Development",
    members: [
      { name: "Alex Rodriguez", avatar: "", role: "Project Manager" },
      { name: "Emma Thompson", avatar: "", role: "Mobile Developer" },
    ],
    tags: ["Mobile", "iOS", "Android"],
    isPrivate: false,
    group: "Product Development",
    tasksTotal: 67,
    tasksCompleted: 30,
    issuesOpen: 5,
    lastUpdate: "2024-01-24",
  },
  {
    id: "PRJ-003",
    name: "Marketing Campaign Q1",
    description:
      "Comprehensive marketing campaign for Q1 product launch and brand awareness",
    status: "Planning",
    priority: "High",
    progress: 20,
    budget: 75000,
    spent: 15000,
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    owner: "Lisa Park",
    team: "Marketing & Growth",
    members: [
      { name: "Lisa Park", avatar: "", role: "Marketing Manager" },
      { name: "David Kim", avatar: "", role: "Content Strategist" },
      { name: "Rachel Green", avatar: "", role: "Social Media Manager" },
    ],
    tags: ["Marketing", "Campaign", "Q1"],
    isPrivate: true,
    group: "Marketing Initiatives",
    tasksTotal: 28,
    tasksCompleted: 6,
    issuesOpen: 1,
    lastUpdate: "2024-01-23",
  },
  {
    id: "PRJ-004",
    name: "Database Migration",
    description: "Migration of legacy database to modern cloud infrastructure",
    status: "Completed",
    priority: "High",
    progress: 100,
    budget: 80000,
    spent: 75000,
    startDate: "2023-11-01",
    endDate: "2024-01-15",
    owner: "Alex Rodriguez",
    team: "Backend Development",
    members: [
      { name: "Alex Rodriguez", avatar: "", role: "Project Manager" },
      { name: "Emma Thompson", avatar: "", role: "Database Engineer" },
    ],
    tags: ["Database", "Migration", "Infrastructure"],
    isPrivate: false,
    group: "Technical Infrastructure",
    tasksTotal: 32,
    tasksCompleted: 32,
    issuesOpen: 0,
    lastUpdate: "2024-01-15",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "success";
    case "In Progress":
      return "default";
    case "Planning":
      return "secondary";
    case "On Hold":
      return "warning";
    case "Cancelled":
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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function Projects() {
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || project.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const projectStats = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === "In Progress").length,
    completed: projects.filter((p) => p.status === "Completed").length,
    planning: projects.filter((p) => p.status === "Planning").length,
    totalBudget: projects.reduce((acc, p) => acc + p.budget, 0),
    totalSpent: projects.reduce((acc, p) => acc + p.spent, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Create, manage, and track all your projects in one place.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog
            open={isCreateProjectOpen}
            onOpenChange={setIsCreateProjectOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Set up a new project with all the necessary details and team
                  assignments.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[500px] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Project Name *</Label>
                    <Input id="name" placeholder="Enter project name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the project goals and objectives"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="budget">Budget (₦)</Label>
                    <Input id="budget" type="number" placeholder="0" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="owner">Project Owner</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select owner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Doe</SelectItem>
                        <SelectItem value="alex">Alex Rodriguez</SelectItem>
                        <SelectItem value="lisa">Lisa Park</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="team">Assign Team</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select team" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">
                          Frontend Development
                        </SelectItem>
                        <SelectItem value="backend">
                          Backend Development
                        </SelectItem>
                        <SelectItem value="marketing">
                          Marketing & Growth
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="group">Project Group</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">
                          Customer Experience
                        </SelectItem>
                        <SelectItem value="product">
                          Product Development
                        </SelectItem>
                        <SelectItem value="marketing">
                          Marketing Initiatives
                        </SelectItem>
                        <SelectItem value="technical">
                          Technical Infrastructure
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input id="tags" placeholder="e.g., Web, Mobile, UI/UX" />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="private" />
                  <Label htmlFor="private">Make this project private</Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateProjectOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.total}</div>
            <p className="text-xs text-muted-foreground">All project types</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <PlayCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {projectStats.inProgress}
            </div>
            <p className="text-xs text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {projectStats.completed}
            </div>
            <p className="text-xs text-muted-foreground">
              Successfully delivered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Usage</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (projectStats.totalSpent / projectStats.totalBudget) * 100,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(projectStats.totalSpent)} /{" "}
              {formatCurrency(projectStats.totalBudget)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
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
              <SelectItem value="Planning">Planning</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="On Hold">On Hold</SelectItem>
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
          onValueChange={(value) => setViewMode(value as "grid" | "list")}
        >
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Projects */}
      {viewMode === "grid" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg line-clamp-1">
                        {project.name}
                      </CardTitle>
                      {project.isPrivate && (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(project.status) as any}>
                        {project.status}
                      </Badge>
                      <Badge
                        variant={getPriorityColor(project.priority) as any}
                      >
                        {project.priority}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        Manage Team
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Archive className="mr-2 h-4 w-4" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="text-sm line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="w-full" />
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Budget</span>
                    <span className="font-medium">
                      {formatCurrency(project.spent)} /{" "}
                      {formatCurrency(project.budget)}
                    </span>
                  </div>
                  <Progress
                    value={(project.spent / project.budget) * 100}
                    className="w-full"
                  />
                </div>

                {/* Project Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Tasks</div>
                    <div className="font-medium">
                      {project.tasksCompleted}/{project.tasksTotal}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Issues</div>
                    <div className="font-medium text-destructive">
                      {project.issuesOpen}
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  {project.startDate} - {project.endDate}
                </div>

                {/* Team */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">
                    Team: {project.team}
                  </div>
                  <div className="flex items-center -space-x-2">
                    {project.members.slice(0, 3).map((member, index) => (
                      <Avatar
                        key={index}
                        className="h-8 w-8 border-2 border-background"
                      >
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="text-xs">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.members.length > 3 && (
                      <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                        +{project.members.length - 3}
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Projects List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{project.name}</h3>
                      {project.isPrivate && (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      )}
                      <Badge variant={getStatusColor(project.status) as any}>
                        {project.status}
                      </Badge>
                      <Badge
                        variant={getPriorityColor(project.priority) as any}
                      >
                        {project.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Owner: {project.owner}</span>
                      <span>Team: {project.team}</span>
                      <span>Due: {project.endDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {project.progress}%
                      </div>
                      <Progress value={project.progress} className="w-20" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {formatCurrency(project.spent)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        of {formatCurrency(project.budget)}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Project
                        </DropdownMenuItem>
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
    </div>
  );
}
