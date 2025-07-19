import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  BellRing,
  Check,
  Clock,
  Filter,
  MoreVertical,
  Search,
  Trash2,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  Info,
  UserPlus,
  MessageSquare,
  Calendar,
  DollarSign,
  FolderOpen,
  Settings,
} from "lucide-react";

interface NotificationItem {
  id: string;
  type:
    | "task"
    | "project"
    | "team"
    | "document"
    | "issue"
    | "communication"
    | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: "low" | "medium" | "high";
  actor: {
    name: string;
    role: string;
    avatar?: string;
  };
  metadata?: any;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      type: "task",
      title: "Task Completed",
      message:
        "Sarah completed 'Website Redesign' task in Digital Marketing Project",
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false,
      priority: "medium",
      actor: {
        name: "Sarah Johnson",
        role: "Designer",
        avatar: "",
      },
      metadata: { taskId: "task-1", projectId: "proj-1" },
    },
    {
      id: "2",
      type: "team",
      title: "New Team Member",
      message: "Michael Brown joined the Engineering team",
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      read: false,
      priority: "low",
      actor: {
        name: "Michael Brown",
        role: "Frontend Developer",
        avatar: "",
      },
      metadata: { teamId: "team-1" },
    },
    {
      id: "3",
      type: "project",
      title: "Project Budget Alert",
      message:
        "Mobile App Development project has exceeded 80% of budget (₦8,000,000 of ₦10,000,000)",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: true,
      priority: "high",
      actor: {
        name: "System",
        role: "Automated Alert",
        avatar: "",
      },
      metadata: {
        projectId: "proj-2",
        budgetUsed: 8000000,
        totalBudget: 10000000,
      },
    },
    {
      id: "4",
      type: "document",
      title: "Document Shared",
      message: "Alex shared 'Project Requirements.pdf' with Development Team",
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      read: true,
      priority: "low",
      actor: {
        name: "Alex Wilson",
        role: "Project Manager",
        avatar: "",
      },
      metadata: { documentId: "doc-1", teamId: "team-2" },
    },
    {
      id: "5",
      type: "issue",
      title: "New Issue Logged",
      message:
        "David logged an issue: 'Login system not working on mobile devices'",
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      read: true,
      priority: "high",
      actor: {
        name: "David Chen",
        role: "QA Engineer",
        avatar: "",
      },
      metadata: { issueId: "issue-1", severity: "high" },
    },
    {
      id: "6",
      type: "communication",
      title: "Meeting Scheduled",
      message:
        "Emma scheduled 'Sprint Planning' meeting for tomorrow at 10:00 AM",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: true,
      priority: "medium",
      actor: {
        name: "Emma Davis",
        role: "Scrum Master",
        avatar: "",
      },
      metadata: { meetingId: "meeting-1", date: "2024-01-15", time: "10:00" },
    },
    {
      id: "7",
      type: "system",
      title: "System Maintenance",
      message: "Scheduled system maintenance completed successfully",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      read: true,
      priority: "low",
      actor: {
        name: "System",
        role: "Automated Alert",
        avatar: "",
      },
      metadata: { maintenanceId: "maint-1" },
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "task":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "project":
        return <FolderOpen className="h-4 w-4 text-blue-500" />;
      case "team":
        return <Users className="h-4 w-4 text-purple-500" />;
      case "document":
        return <FileText className="h-4 w-4 text-orange-500" />;
      case "issue":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "communication":
        return <MessageSquare className="h-4 w-4 text-cyan-500" />;
      case "system":
        return <Settings className="h-4 w-4 text-gray-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - timestamp.getTime()) / 1000,
    );

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true })),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id),
    );
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.actor.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "unread" && !notification.read) ||
      (selectedFilter === "read" && notification.read) ||
      notification.type === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getActivityCounts = () => {
    const counts = {
      total: notifications.length,
      unread: unreadCount,
      tasks: notifications.filter((n) => n.type === "task").length,
      projects: notifications.filter((n) => n.type === "project").length,
      teams: notifications.filter((n) => n.type === "team").length,
      documents: notifications.filter((n) => n.type === "document").length,
      issues: notifications.filter((n) => n.type === "issue").length,
      communication: notifications.filter((n) => n.type === "communication")
        .length,
      system: notifications.filter((n) => n.type === "system").length,
    };
    return counts;
  };

  const activityCounts = getActivityCounts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Bell className="h-8 w-8" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} new
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground">
            Monitor all activities and updates across your organization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Activity Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {activityCounts.total}
            </div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {activityCounts.unread}
            </div>
            <div className="text-sm text-muted-foreground">Unread</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {activityCounts.tasks}
            </div>
            <div className="text-sm text-muted-foreground">Tasks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {activityCounts.projects}
            </div>
            <div className="text-sm text-muted-foreground">Projects</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {activityCounts.teams}
            </div>
            <div className="text-sm text-muted-foreground">Teams</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {activityCounts.documents}
            </div>
            <div className="text-sm text-muted-foreground">Documents</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {activityCounts.issues}
            </div>
            <div className="text-sm text-muted-foreground">Issues</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-cyan-600">
              {activityCounts.communication}
            </div>
            <div className="text-sm text-muted-foreground">Messages</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  {selectedFilter === "all"
                    ? "All Notifications"
                    : selectedFilter === "unread"
                      ? "Unread"
                      : selectedFilter === "read"
                        ? "Read"
                        : selectedFilter.charAt(0).toUpperCase() +
                          selectedFilter.slice(1)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedFilter("all")}>
                  All Notifications
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("unread")}>
                  Unread
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("read")}>
                  Read
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem onClick={() => setSelectedFilter("task")}>
                  Tasks
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("project")}>
                  Projects
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("team")}>
                  Teams
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("document")}>
                  Documents
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("issue")}>
                  Issues
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedFilter("communication")}
                >
                  Communication
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Feed</CardTitle>
          <CardDescription>
            Real-time updates from your teams and projects
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">
                No notifications found
              </h3>
              <p>
                No notifications match your current search and filter criteria.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-muted/50 transition-colors ${
                    !notification.read
                      ? "bg-blue-50 border-l-4 border-l-blue-500"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-semibold text-foreground">
                              {notification.title}
                            </h4>
                            <Badge
                              variant="outline"
                              className={`text-xs ${getPriorityColor(notification.priority)}`}
                            >
                              {notification.priority}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Avatar className="h-4 w-4">
                                <AvatarImage src={notification.actor.avatar} />
                                <AvatarFallback className="text-xs">
                                  {notification.actor.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{notification.actor.name}</span>
                              <span>•</span>
                              <span>{notification.actor.role}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>
                                {formatTimeAgo(notification.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!notification.read && (
                                <DropdownMenuItem
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <Check className="h-4 w-4 mr-2" />
                                  Mark as Read
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                onClick={() =>
                                  deleteNotification(notification.id)
                                }
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
