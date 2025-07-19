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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  AlertTriangle,
  Bug,
  CheckCircle2,
  Clock,
  Calendar,
  User,
  Link,
  MessageSquare,
  Eye,
  AlertCircle,
  XCircle,
  PlayCircle,
  PauseCircle,
} from "lucide-react";

const issues = [
  {
    id: "ISS-001",
    title: "Login page not responsive on mobile devices",
    description:
      "The login page layout breaks on mobile devices with screen width below 768px. The form elements overlap and buttons are not clickable.",
    status: "Open",
    priority: "High",
    severity: "Major",
    type: "Bug",
    project: "E-commerce Platform Redesign",
    assignee: {
      name: "John Doe",
      avatar: "",
      email: "john@company.com",
    },
    reporter: {
      name: "Sarah Wilson",
      avatar: "",
      email: "sarah@company.com",
    },
    createdDate: "2024-01-25",
    dueDate: "2024-01-30",
    closedDate: null,
    linkedTask: "Review user interface mockups",
    tags: ["mobile", "responsive", "UI"],
    comments: 5,
    attachments: 3,
    isOverdue: false,
    timeSpent: "2h 30m",
    estimatedTime: "4h",
  },
  {
    id: "ISS-002",
    title: "Payment gateway timeout errors",
    description:
      "Users are experiencing timeout errors when processing payments during checkout. The issue affects approximately 15% of transactions.",
    status: "In Progress",
    priority: "Critical",
    severity: "Critical",
    type: "Bug",
    project: "Mobile App Development",
    assignee: {
      name: "Alex Rodriguez",
      avatar: "",
      email: "alex@company.com",
    },
    reporter: {
      name: "Emma Thompson",
      avatar: "",
      email: "emma@company.com",
    },
    createdDate: "2024-01-22",
    dueDate: "2024-01-27",
    closedDate: null,
    linkedTask: "Implement payment gateway integration",
    tags: ["payment", "timeout", "critical"],
    comments: 12,
    attachments: 1,
    isOverdue: true,
    timeSpent: "8h 15m",
    estimatedTime: "12h",
  },
  {
    id: "ISS-003",
    title: "Feature request: Dark mode support",
    description:
      "Multiple users have requested dark mode support for better user experience during evening hours and reduced eye strain.",
    status: "Open",
    priority: "Medium",
    severity: "Minor",
    type: "Feature Request",
    project: "E-commerce Platform Redesign",
    assignee: {
      name: "Mike Chen",
      avatar: "",
      email: "mike@company.com",
    },
    reporter: {
      name: "Lisa Park",
      avatar: "",
      email: "lisa@company.com",
    },
    createdDate: "2024-01-20",
    dueDate: "2024-02-15",
    closedDate: null,
    linkedTask: null,
    tags: ["feature", "UI", "dark-mode"],
    comments: 8,
    attachments: 2,
    isOverdue: false,
    timeSpent: "1h 45m",
    estimatedTime: "16h",
  },
  {
    id: "ISS-004",
    title: "Database query performance optimization",
    description:
      "Slow database queries are affecting the application performance. Response times have increased by 40% over the past week.",
    status: "Resolved",
    priority: "High",
    severity: "Major",
    type: "Performance",
    project: "Database Migration",
    assignee: {
      name: "Emma Thompson",
      avatar: "",
      email: "emma@company.com",
    },
    reporter: {
      name: "Alex Rodriguez",
      avatar: "",
      email: "alex@company.com",
    },
    createdDate: "2024-01-15",
    dueDate: "2024-01-25",
    closedDate: "2024-01-24",
    linkedTask: "Database performance optimization",
    tags: ["database", "performance", "optimization"],
    comments: 15,
    attachments: 4,
    isOverdue: false,
    timeSpent: "12h 30m",
    estimatedTime: "10h",
  },
  {
    id: "ISS-005",
    title: "Email notifications not being sent",
    description:
      "System email notifications for password resets and account verification are not being delivered to users.",
    status: "Open",
    priority: "Medium",
    severity: "Major",
    type: "Bug",
    project: "Marketing Campaign Q1",
    assignee: {
      name: "David Kim",
      avatar: "",
      email: "david@company.com",
    },
    reporter: {
      name: "Rachel Green",
      avatar: "",
      email: "rachel@company.com",
    },
    createdDate: "2024-01-23",
    dueDate: "2024-02-02",
    closedDate: null,
    linkedTask: "Content strategy meeting preparation",
    tags: ["email", "notifications", "system"],
    comments: 3,
    attachments: 1,
    isOverdue: false,
    timeSpent: "0h 45m",
    estimatedTime: "6h",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "destructive";
    case "In Progress":
      return "default";
    case "Resolved":
      return "success";
    case "Closed":
      return "secondary";
    default:
      return "secondary";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Critical":
      return "destructive";
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

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "Critical":
      return "destructive";
    case "Major":
      return "destructive";
    case "Minor":
      return "default";
    case "Trivial":
      return "secondary";
    default:
      return "secondary";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Bug":
      return Bug;
    case "Feature Request":
      return AlertCircle;
    case "Performance":
      return Clock;
    default:
      return AlertTriangle;
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
    year: "numeric",
  });
};

const calculateDaysOverdue = (dueDate: string) => {
  const due = new Date(dueDate);
  const today = new Date();
  const diffTime = today.getTime() - due.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

export default function Issues() {
  const [isCreateIssueOpen, setIsCreateIssueOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [projectFilter, setProjectFilter] = useState<string>("all");

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch = issue.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || issue.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || issue.priority === priorityFilter;
    const matchesType = typeFilter === "all" || issue.type === typeFilter;
    const matchesProject =
      projectFilter === "all" || issue.project === projectFilter;
    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesType &&
      matchesProject
    );
  });

  const issueStats = {
    total: issues.length,
    open: issues.filter((i) => i.status === "Open").length,
    inProgress: issues.filter((i) => i.status === "In Progress").length,
    resolved: issues.filter((i) => i.status === "Resolved").length,
    overdue: issues.filter((i) => i.isOverdue).length,
    critical: issues.filter((i) => i.priority === "Critical").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Issues</h1>
          <p className="text-muted-foreground">
            Track and manage project issues, bugs, and feature requests.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isCreateIssueOpen} onOpenChange={setIsCreateIssueOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Log Issue
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Log New Issue</DialogTitle>
                <DialogDescription>
                  Report a new issue, bug, or feature request.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[500px] overflow-y-auto">
                <div className="grid gap-2">
                  <Label htmlFor="issueTitle">Issue Title *</Label>
                  <Input id="issueTitle" placeholder="Enter issue title" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="issueDescription">Description *</Label>
                  <Textarea
                    id="issueDescription"
                    placeholder="Describe the issue in detail"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="issueType">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bug">Bug</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="improvement">Improvement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="issuePriority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
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
                    <Label htmlFor="issueSeverity">Severity</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trivial">Trivial</SelectItem>
                        <SelectItem value="minor">Minor</SelectItem>
                        <SelectItem value="major">Major</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="issueProject">Project *</Label>
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
                        <SelectItem value="database">
                          Database Migration
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="issueAssignee">Assignee</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Doe</SelectItem>
                        <SelectItem value="sarah">Sarah Wilson</SelectItem>
                        <SelectItem value="alex">Alex Rodriguez</SelectItem>
                        <SelectItem value="emma">Emma Thompson</SelectItem>
                        <SelectItem value="mike">Mike Chen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="issueDueDate">Due Date</Label>
                    <Input id="issueDueDate" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="linkedTask">Link to Task (Optional)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select task" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="task1">
                          Review user interface mockups
                        </SelectItem>
                        <SelectItem value="task2">
                          Implement payment gateway integration
                        </SelectItem>
                        <SelectItem value="task3">
                          Database performance optimization
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="estimatedTime">Estimated Time (hours)</Label>
                  <Input
                    id="estimatedTime"
                    type="number"
                    placeholder="0"
                    min="0"
                    step="0.5"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="issueTags">Tags (comma-separated)</Label>
                  <Input
                    id="issueTags"
                    placeholder="e.g., mobile, UI, critical"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateIssueOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Log Issue</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Issue Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{issueStats.total}</div>
            <p className="text-xs text-muted-foreground">All projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {issueStats.open}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <PlayCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {issueStats.inProgress}
            </div>
            <p className="text-xs text-muted-foreground">Being worked on</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {issueStats.resolved}
            </div>
            <p className="text-xs text-muted-foreground">Fixed issues</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {issueStats.overdue}
            </div>
            <p className="text-xs text-muted-foreground">Past due date</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {issueStats.critical}
            </div>
            <p className="text-xs text-muted-foreground">High priority</p>
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
                placeholder="Search issues..."
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
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Bug">Bug</SelectItem>
              <SelectItem value="Feature Request">Feature Request</SelectItem>
              <SelectItem value="Performance">Performance</SelectItem>
            </SelectContent>
          </Select>
          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="E-commerce Platform Redesign">
                E-commerce Platform
              </SelectItem>
              <SelectItem value="Mobile App Development">
                Mobile App Development
              </SelectItem>
              <SelectItem value="Marketing Campaign Q1">
                Marketing Campaign Q1
              </SelectItem>
              <SelectItem value="Database Migration">
                Database Migration
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Issues List */}
      <Card>
        <CardHeader>
          <CardTitle>Issues</CardTitle>
          <CardDescription>
            Track and manage all project issues and bugs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredIssues.map((issue) => {
              const TypeIcon = getTypeIcon(issue.type);
              const daysOverdue = issue.isOverdue
                ? calculateDaysOverdue(issue.dueDate)
                : 0;

              return (
                <div
                  key={issue.id}
                  className={`flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors ${
                    issue.isOverdue
                      ? "border-destructive/50 bg-destructive/5"
                      : ""
                  }`}
                >
                  <div className="flex items-start space-x-4 flex-1">
                    <TypeIcon className="h-5 w-5 text-primary mt-1" />
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{issue.title}</h3>
                        <Badge variant={getStatusColor(issue.status) as any}>
                          {issue.status}
                        </Badge>
                        <Badge
                          variant={getPriorityColor(issue.priority) as any}
                        >
                          {issue.priority}
                        </Badge>
                        <Badge
                          variant={getSeverityColor(issue.severity) as any}
                        >
                          {issue.severity}
                        </Badge>
                        {issue.isOverdue && (
                          <Badge variant="destructive">
                            Overdue {daysOverdue} days
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {issue.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          Assigned: {issue.assignee.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          Reporter: {issue.reporter.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Created: {formatDate(issue.createdDate)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Due: {formatDate(issue.dueDate)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Project: {issue.project}</span>
                        {issue.linkedTask && (
                          <span className="flex items-center gap-1">
                            <Link className="h-3 w-3" />
                            Task: {issue.linkedTask}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {issue.comments} comments
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {issue.timeSpent} / {issue.estimatedTime}
                        </span>
                      </div>

                      {issue.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {issue.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={issue.assignee.avatar}
                          alt={issue.assignee.name}
                        />
                        <AvatarFallback className="text-xs">
                          {getInitials(issue.assignee.name)}
                        </AvatarFallback>
                      </Avatar>
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={issue.reporter.avatar}
                          alt={issue.reporter.name}
                        />
                        <AvatarFallback className="text-xs">
                          {getInitials(issue.reporter.name)}
                        </AvatarFallback>
                      </Avatar>
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
                          Edit Issue
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link className="mr-2 h-4 w-4" />
                          Link to Task
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {issue.status !== "Resolved" && (
                          <DropdownMenuItem>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark as Resolved
                          </DropdownMenuItem>
                        )}
                        {issue.status === "Open" && (
                          <DropdownMenuItem>
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Start Progress
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Issue
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
    </div>
  );
}
