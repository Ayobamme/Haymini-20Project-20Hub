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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  Search,
  Send,
  Phone,
  Video,
  Calendar,
  Mail,
  MessageSquare,
  Users,
  Clock,
  MoreHorizontal,
  Settings,
  Archive,
  Star,
  Paperclip,
  Smile,
  Image,
  Mic,
  PhoneCall,
  VideoIcon,
  MapPin,
  Globe,
  Shield,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
} from "lucide-react";

const teamChats = [
  {
    id: "CHAT-001",
    name: "Frontend Development Team",
    type: "Team",
    members: [
      {
        name: "John Doe",
        avatar: "",
        status: "online",
        role: "Team Lead",
      },
      {
        name: "Sarah Wilson",
        avatar: "",
        status: "online",
        role: "Senior Developer",
      },
      {
        name: "Mike Chen",
        avatar: "",
        status: "away",
        role: "UI/UX Designer",
      },
    ],
    lastMessage: {
      sender: "Sarah Wilson",
      content: "The new design mockups look great! 🎨",
      time: "2024-01-26 14:30",
      unread: false,
    },
    unreadCount: 0,
    isPrivate: false,
  },
  {
    id: "CHAT-002",
    name: "Project Alpha Discussion",
    type: "Project",
    members: [
      {
        name: "Alex Rodriguez",
        avatar: "",
        status: "online",
        role: "Project Manager",
      },
      {
        name: "Emma Thompson",
        avatar: "",
        status: "offline",
        role: "Backend Developer",
      },
      {
        name: "Lisa Park",
        avatar: "",
        status: "away",
        role: "Marketing Manager",
      },
    ],
    lastMessage: {
      sender: "Alex Rodriguez",
      content:
        "Can we schedule a meeting to discuss the API integration timeline?",
      time: "2024-01-26 13:45",
      unread: true,
    },
    unreadCount: 3,
    isPrivate: false,
  },
  {
    id: "CHAT-003",
    name: "David Kim",
    type: "Direct",
    members: [
      {
        name: "David Kim",
        avatar: "",
        status: "online",
        role: "Content Strategist",
      },
    ],
    lastMessage: {
      sender: "David Kim",
      content: "Thanks for the feedback on the content strategy document!",
      time: "2024-01-26 12:15",
      unread: false,
    },
    unreadCount: 0,
    isPrivate: true,
  },
];

const meetings = [
  {
    id: "MEET-001",
    title: "Weekly Sprint Planning",
    description: "Plan tasks and goals for the upcoming sprint",
    date: "2024-01-29",
    time: "09:00",
    duration: 60,
    type: "Recurring",
    organizer: "John Doe",
    attendees: [
      { name: "Sarah Wilson", status: "accepted" },
      { name: "Mike Chen", status: "tentative" },
      { name: "Alex Rodriguez", status: "accepted" },
    ],
    meetingLink: "https://meet.google.com/abc-defg-hij",
    platform: "Google Meet",
    status: "Scheduled",
    project: "E-commerce Platform Redesign",
  },
  {
    id: "MEET-002",
    title: "Client Presentation",
    description: "Present Q1 marketing campaign proposal to client",
    date: "2024-01-30",
    time: "14:00",
    duration: 90,
    type: "One-time",
    organizer: "Lisa Park",
    attendees: [
      { name: "David Kim", status: "accepted" },
      { name: "Rachel Green", status: "accepted" },
      { name: "John Doe", status: "pending" },
    ],
    meetingLink: "https://teams.microsoft.com/l/meetup-join/xyz",
    platform: "Microsoft Teams",
    status: "Scheduled",
    project: "Marketing Campaign Q1",
  },
  {
    id: "MEET-003",
    title: "Technical Architecture Review",
    description: "Review system architecture and database design",
    date: "2024-01-28",
    time: "15:30",
    duration: 120,
    type: "One-time",
    organizer: "Alex Rodriguez",
    attendees: [
      { name: "Emma Thompson", status: "accepted" },
      { name: "John Doe", status: "accepted" },
    ],
    meetingLink: "https://zoom.us/j/123456789",
    platform: "Zoom",
    status: "Completed",
    project: "Database Migration",
  },
];

const emails = [
  {
    id: "EMAIL-001",
    subject: "Project Update: E-commerce Platform Progress",
    sender: {
      name: "John Doe",
      email: "john@company.com",
      avatar: "",
    },
    recipients: ["sarah@company.com", "mike@company.com", "alex@company.com"],
    content:
      "Hi team, I wanted to provide you with an update on our e-commerce platform project. We've made significant progress this week...",
    timestamp: "2024-01-26 16:20",
    isRead: false,
    isStarred: true,
    hasAttachments: true,
    folder: "Inbox",
    priority: "High",
    tags: ["project", "update", "e-commerce"],
  },
  {
    id: "EMAIL-002",
    subject: "Meeting Notes: Sprint Planning",
    sender: {
      name: "Sarah Wilson",
      email: "sarah@company.com",
      avatar: "",
    },
    recipients: ["team@company.com"],
    content:
      "Here are the notes from today's sprint planning meeting. We discussed the following items and assigned tasks...",
    timestamp: "2024-01-26 11:30",
    isRead: true,
    isStarred: false,
    hasAttachments: false,
    folder: "Inbox",
    priority: "Medium",
    tags: ["meeting", "notes", "sprint"],
  },
  {
    id: "EMAIL-003",
    subject: "Q1 Marketing Campaign Approval Needed",
    sender: {
      name: "Lisa Park",
      email: "lisa@company.com",
      avatar: "",
    },
    recipients: ["management@company.com"],
    content:
      "Please review the attached Q1 marketing campaign proposal. We need approval by end of week to meet our launch timeline...",
    timestamp: "2024-01-25 14:45",
    isRead: true,
    isStarred: false,
    hasAttachments: true,
    folder: "Sent",
    priority: "High",
    tags: ["approval", "marketing", "campaign"],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-green-500";
    case "away":
      return "bg-yellow-500";
    case "busy":
      return "bg-red-500";
    case "offline":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
};

const getAttendeeStatusColor = (status: string) => {
  switch (status) {
    case "accepted":
      return "success";
    case "tentative":
      return "default";
    case "pending":
      return "secondary";
    case "declined":
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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (timeString: string) => {
  return new Date(`2024-01-01 ${timeString}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const formatDateTime = (dateTimeString: string) => {
  return new Date(dateTimeString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export default function Communication() {
  const [isCreateChatOpen, setIsCreateChatOpen] = useState(false);
  const [isScheduleMeetingOpen, setIsScheduleMeetingOpen] = useState(false);
  const [isComposeEmailOpen, setIsComposeEmailOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(teamChats[0]);
  const [chatMessage, setChatMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("chat");

  const communicationStats = {
    totalChats: teamChats.length,
    unreadMessages: teamChats.reduce((acc, chat) => acc + chat.unreadCount, 0),
    upcomingMeetings: meetings.filter((m) => m.status === "Scheduled").length,
    unreadEmails: emails.filter((e) => !e.isRead).length,
    onlineMembers: 8, // Mock data
    totalEmails: emails.length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communication</h1>
          <p className="text-muted-foreground">
            Team chat, meetings, email, and collaboration tools in one place.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isCreateChatOpen} onOpenChange={setIsCreateChatOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                New Chat
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Chat</DialogTitle>
                <DialogDescription>
                  Start a new team chat or direct conversation.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="chatName">Chat Name</Label>
                  <Input id="chatName" placeholder="Enter chat name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="chatType">Chat Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="team">Team Chat</SelectItem>
                      <SelectItem value="project">Project Chat</SelectItem>
                      <SelectItem value="direct">Direct Message</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="participants">Add Participants</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team members" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Doe</SelectItem>
                      <SelectItem value="sarah">Sarah Wilson</SelectItem>
                      <SelectItem value="alex">Alex Rodriguez</SelectItem>
                      <SelectItem value="emma">Emma Thompson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateChatOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Chat</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isScheduleMeetingOpen}
            onOpenChange={setIsScheduleMeetingOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Schedule New Meeting</DialogTitle>
                <DialogDescription>
                  Create a new meeting and invite team members.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[400px] overflow-y-auto">
                <div className="grid gap-2">
                  <Label htmlFor="meetingTitle">Meeting Title *</Label>
                  <Input id="meetingTitle" placeholder="Enter meeting title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="meetingDescription">Description</Label>
                  <Textarea
                    id="meetingDescription"
                    placeholder="Meeting description and agenda"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="meetingDate">Date</Label>
                    <Input id="meetingDate" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="meetingTime">Time</Label>
                    <Input id="meetingTime" type="time" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="60"
                      min="15"
                      max="480"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="platform">Platform</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google-meet">Google Meet</SelectItem>
                        <SelectItem value="microsoft-teams">
                          Microsoft Teams
                        </SelectItem>
                        <SelectItem value="zoom">Zoom</SelectItem>
                        <SelectItem value="in-person">In Person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="attendees">Attendees</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select attendees" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend-team">
                        Frontend Development Team
                      </SelectItem>
                      <SelectItem value="backend-team">
                        Backend Development Team
                      </SelectItem>
                      <SelectItem value="marketing-team">
                        Marketing & Growth Team
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project">Link to Project (Optional)</Label>
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
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsScheduleMeetingOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Schedule Meeting</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isComposeEmailOpen}
            onOpenChange={setIsComposeEmailOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Compose Email
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Compose Email</DialogTitle>
                <DialogDescription>
                  Send an email to team members or external contacts.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="emailTo">To</Label>
                  <Input
                    id="emailTo"
                    placeholder="Enter email addresses (comma separated)"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="emailSubject">Subject</Label>
                  <Input id="emailSubject" placeholder="Email subject" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="emailContent">Message</Label>
                  <Textarea
                    id="emailContent"
                    placeholder="Type your message here..."
                    rows={6}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Image className="h-4 w-4" />
                  </Button>
                  <div className="flex-1" />
                  <Select>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline">
                  Save Draft
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsComposeEmailOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Send className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Communication Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {communicationStats.totalChats}
            </div>
            <p className="text-xs text-muted-foreground">Team conversations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unread Messages
            </CardTitle>
            <Badge
              variant="destructive"
              className="h-5 w-5 rounded-full flex items-center justify-center p-0 text-xs"
            >
              {communicationStats.unreadMessages}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {communicationStats.unreadMessages}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Meetings
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {communicationStats.upcomingMeetings}
            </div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Emails</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {communicationStats.unreadEmails}
            </div>
            <p className="text-xs text-muted-foreground">In inbox</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Now</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {communicationStats.onlineMembers}
            </div>
            <p className="text-xs text-muted-foreground">Team members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {communicationStats.totalEmails}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Communication Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="chat">Team Chat</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <div className="grid grid-cols-12 gap-6 h-[600px]">
            {/* Chat List */}
            <Card className="col-span-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Conversations</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCreateChatOpen(true)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[480px]">
                  <div className="space-y-1 p-2">
                    {teamChats.map((chat) => (
                      <div
                        key={chat.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedChat.id === chat.id
                            ? "bg-primary/10"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedChat(chat)}
                      >
                        <div className="relative">
                          {chat.type === "Direct" ? (
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={chat.members[0].avatar}
                                alt={chat.members[0].name}
                              />
                              <AvatarFallback>
                                {getInitials(chat.members[0].name)}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                              <Users className="h-5 w-5 text-primary-foreground" />
                            </div>
                          )}
                          {chat.type === "Direct" && (
                            <div
                              className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(
                                chat.members[0].status,
                              )}`}
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium truncate">
                              {chat.name}
                            </h4>
                            {chat.unreadCount > 0 && (
                              <Badge
                                variant="destructive"
                                className="h-5 w-5 rounded-full flex items-center justify-center p-0 text-xs"
                              >
                                {chat.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="truncate">
                              {chat.lastMessage.sender}:{" "}
                              {chat.lastMessage.content}
                            </span>
                            <span className="ml-2 whitespace-nowrap">
                              {formatDateTime(chat.lastMessage.time)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Chat Messages */}
            <Card className="col-span-8">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      {selectedChat.type === "Direct" ? (
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={selectedChat.members[0].avatar}
                            alt={selectedChat.members[0].name}
                          />
                          <AvatarFallback>
                            {getInitials(selectedChat.members[0].name)}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                          <Users className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{selectedChat.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedChat.members.length} member
                        {selectedChat.members.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          Chat Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          Manage Members
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="mr-2 h-4 w-4" />
                          Archive Chat
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex flex-col">
                <ScrollArea className="flex-1 h-[400px] p-4">
                  <div className="space-y-4">
                    {/* Sample messages */}
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>SW</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">
                            Sarah Wilson
                          </span>
                          <span className="text-xs text-muted-foreground">
                            2:30 PM
                          </span>
                        </div>
                        <div className="mt-1 p-3 bg-muted rounded-lg">
                          <p className="text-sm">
                            The new design mockups look great! 🎨
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Mike Chen</span>
                          <span className="text-xs text-muted-foreground">
                            2:45 PM
                          </span>
                        </div>
                        <div className="mt-1 p-3 bg-muted rounded-lg">
                          <p className="text-sm">
                            Thanks! I'm particularly excited about the new color
                            scheme and the improved user flow.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 justify-end">
                      <div className="flex-1 max-w-xs">
                        <div className="flex items-center justify-end space-x-2">
                          <span className="text-xs text-muted-foreground">
                            3:00 PM
                          </span>
                          <span className="text-sm font-medium">You</span>
                        </div>
                        <div className="mt-1 p-3 bg-primary text-primary-foreground rounded-lg">
                          <p className="text-sm">
                            Great work everyone! Let's schedule a review meeting
                            for tomorrow.
                          </p>
                        </div>
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </ScrollArea>
                <div className="p-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Image className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          // Handle send message
                          setChatMessage("");
                        }
                      }}
                    />
                    <Button variant="ghost" size="icon">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      onClick={() => {
                        // Handle send message
                        setChatMessage("");
                      }}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="meetings">
          <div className="space-y-4">
            {meetings.map((meeting) => (
              <Card key={meeting.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">
                          {meeting.title}
                        </CardTitle>
                        <Badge
                          variant={
                            meeting.status === "Scheduled"
                              ? "default"
                              : meeting.status === "Completed"
                                ? "success"
                                : "secondary"
                          }
                        >
                          {meeting.status}
                        </Badge>
                        <Badge variant="outline">{meeting.type}</Badge>
                      </div>
                      <CardDescription>{meeting.description}</CardDescription>
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
                          Edit Meeting
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Video className="mr-2 h-4 w-4" />
                          Join Meeting
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Cancel Meeting
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {formatDate(meeting.date)} at{" "}
                          {formatTime(meeting.time)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{meeting.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>{meeting.platform}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-sm">
                        <div className="text-muted-foreground">Organizer</div>
                        <div className="font-medium">{meeting.organizer}</div>
                      </div>
                      {meeting.project && (
                        <div className="text-sm">
                          <div className="text-muted-foreground">Project</div>
                          <div className="font-medium">{meeting.project}</div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="text-sm">
                        <div className="text-muted-foreground mb-2">
                          Attendees ({meeting.attendees.length})
                        </div>
                        <div className="space-y-1">
                          {meeting.attendees.map((attendee, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between"
                            >
                              <span className="text-sm">{attendee.name}</span>
                              <Badge
                                variant={
                                  getAttendeeStatusColor(attendee.status) as any
                                }
                                className="text-xs"
                              >
                                {attendee.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {meeting.status === "Scheduled" && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Button>
                          <Video className="mr-2 h-4 w-4" />
                          Join Meeting
                        </Button>
                        <Button variant="outline">
                          <Calendar className="mr-2 h-4 w-4" />
                          Add to Calendar
                        </Button>
                        <Button variant="outline" size="sm">
                          Copy Link
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="email">
          <div className="grid grid-cols-12 gap-6">
            {/* Email Sidebar */}
            <Card className="col-span-3">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Folders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsComposeEmailOpen(true)}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Compose
                  </Button>
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-between">
                      <span className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" />
                        Inbox
                      </span>
                      <Badge variant="destructive">
                        {communicationStats.unreadEmails}
                      </Badge>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Send className="mr-2 h-4 w-4" />
                      Sent
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Star className="mr-2 h-4 w-4" />
                      Starred
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Archive className="mr-2 h-4 w-4" />
                      Archive
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email List */}
            <Card className="col-span-9">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Inbox</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search emails..." className="pl-9" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {emails.map((email) => (
                    <div
                      key={email.id}
                      className={`p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer ${
                        !email.isRead ? "bg-muted/20 border-primary/20" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={email.sender.avatar}
                              alt={email.sender.name}
                            />
                            <AvatarFallback>
                              {getInitials(email.sender.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-sm ${
                                    !email.isRead ? "font-semibold" : ""
                                  }`}
                                >
                                  {email.sender.name}
                                </span>
                                <Badge
                                  variant={
                                    getPriorityColor(email.priority) as any
                                  }
                                  className="text-xs"
                                >
                                  {email.priority}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                {email.isStarred && (
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                )}
                                {email.hasAttachments && (
                                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span className="text-xs text-muted-foreground">
                                  {formatDateTime(email.timestamp)}
                                </span>
                              </div>
                            </div>
                            <h4
                              className={`text-sm mt-1 ${
                                !email.isRead
                                  ? "font-semibold"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {email.subject}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {email.content}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {email.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
