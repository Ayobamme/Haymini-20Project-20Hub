import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, CalendarPlus, Clock, MapPin, Video, Users, User, CheckCircle, AlertCircle, Link as LinkIcon, Phone, Mail, Building } from "lucide-react";

interface Meeting {
  id: string;
  title: string;
  description: string;
  type: "physical" | "virtual" | "hybrid";
  date: string;
  startTime: string;
  endTime: string;
  organizer: string;
  attendees: string[];
  location?: string; // for physical meetings
  meetingLink?: string; // for virtual meetings
  platform?: "zoom" | "teams" | "google-meet" | "custom"; // for virtual meetings
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  recurring: boolean;
  recurrencePattern?: "daily" | "weekly" | "monthly";
  agenda: string[];
  documents: string[];
  notes?: string;
  createdDate: string;
}

interface Attendee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  avatar?: string;
  status: "invited" | "accepted" | "declined" | "tentative";
}

const MeetingManagement = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isCreateMeetingOpen, setIsCreateMeetingOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [isMeetingDetailsOpen, setIsMeetingDetailsOpen] = useState(false);

  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: "1",
      title: "Weekly Team Standup",
      description: "Weekly progress review and planning session",
      type: "virtual",
      date: "2024-01-22",
      startTime: "09:00",
      endTime: "10:00",
      organizer: "Sarah Johnson",
      attendees: ["john@company.com", "alice@company.com", "bob@company.com"],
      meetingLink: "https://zoom.us/j/123456789",
      platform: "zoom",
      status: "scheduled",
      priority: "medium",
      recurring: true,
      recurrencePattern: "weekly",
      agenda: ["Review last week's progress", "Discuss blockers", "Plan upcoming week"],
      documents: ["Meeting Notes Template", "Sprint Report"],
      createdDate: "2024-01-15"
    },
    {
      id: "2",
      title: "Q1 Planning Session",
      description: "Quarterly planning and goal setting meeting",
      type: "physical",
      date: "2024-01-25",
      startTime: "14:00",
      endTime: "17:00",
      organizer: "Michael Chen",
      attendees: ["sarah@company.com", "emily@company.com", "robert@company.com"],
      location: "Conference Room A",
      status: "scheduled",
      priority: "high",
      recurring: false,
      agenda: ["Review Q4 performance", "Set Q1 objectives", "Resource allocation", "Timeline planning"],
      documents: ["Q4 Report", "Budget Proposal", "OKR Template"],
      createdDate: "2024-01-10"
    },
    {
      id: "3",
      title: "Client Presentation",
      description: "Product demo and proposal presentation to new client",
      type: "hybrid",
      date: "2024-01-24",
      startTime: "11:00",
      endTime: "12:30",
      organizer: "Emily Davis",
      attendees: ["client@example.com", "sales@company.com", "product@company.com"],
      location: "Meeting Room B",
      meetingLink: "https://teams.microsoft.com/l/meetup-join/123",
      platform: "teams",
      status: "scheduled",
      priority: "high",
      recurring: false,
      agenda: ["Product overview", "Demo", "Pricing discussion", "Q&A"],
      documents: ["Product Brochure", "Proposal Document", "Demo Script"],
      createdDate: "2024-01-12"
    }
  ]);

  const [newMeeting, setNewMeeting] = useState({
    title: "",
    description: "",
    type: "virtual",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    meetingLink: "",
    platform: "zoom",
    priority: "medium",
    recurring: false,
    recurrencePattern: "",
    agenda: "",
    attendees: ""
  });

  // Mock attendee data
  const availableAttendees: Attendee[] = [
    { id: "1", name: "John Smith", email: "john@company.com", position: "Senior Developer", department: "Engineering", status: "accepted" },
    { id: "2", name: "Alice Johnson", email: "alice@company.com", position: "Product Manager", department: "Product", status: "accepted" },
    { id: "3", name: "Bob Wilson", email: "bob@company.com", position: "UX Designer", department: "Design", status: "tentative" },
    { id: "4", name: "Sarah Davis", email: "sarah@company.com", position: "Marketing Lead", department: "Marketing", status: "declined" }
  ];

  const getStatusVariant = (status: Meeting["status"]) => {
    switch (status) {
      case "scheduled": return "default";
      case "in-progress": return "default";
      case "completed": return "secondary";
      case "cancelled": return "destructive";
      default: return "outline";
    }
  };

  const getTypeVariant = (type: Meeting["type"]) => {
    switch (type) {
      case "virtual": return "default";
      case "physical": return "secondary";
      case "hybrid": return "outline";
      default: return "outline";
    }
  };

  const getPriorityVariant = (priority: Meeting["priority"]) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  const getTypeIcon = (type: Meeting["type"]) => {
    switch (type) {
      case "virtual": return <Video className="h-4 w-4" />;
      case "physical": return <MapPin className="h-4 w-4" />;
      case "hybrid": return <Building className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const handleCreateMeeting = () => {
    const meeting: Meeting = {
      id: Date.now().toString(),
      ...newMeeting,
      organizer: "Current User",
      attendees: newMeeting.attendees.split(',').map(email => email.trim()).filter(Boolean),
      agenda: newMeeting.agenda.split('\n').filter(Boolean),
      documents: [],
      status: "scheduled",
      recurring: newMeeting.recurring,
      recurrencePattern: newMeeting.recurring ? newMeeting.recurrencePattern as any : undefined,
      createdDate: new Date().toISOString().split('T')[0]
    } as Meeting;
    
    setMeetings([...meetings, meeting]);
    setNewMeeting({
      title: "", description: "", type: "virtual", date: "", startTime: "", endTime: "",
      location: "", meetingLink: "", platform: "zoom", priority: "medium", recurring: false,
      recurrencePattern: "", agenda: "", attendees: ""
    });
    setIsCreateMeetingOpen(false);
  };

  const getFilteredMeetings = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    switch (activeTab) {
      case "upcoming":
        return meetings.filter(m => m.date >= today && m.status === "scheduled");
      case "past":
        return meetings.filter(m => m.date < today || m.status === "completed");
      case "all":
        return meetings;
      default:
        return meetings;
    }
  };

  const getAttendeeInfo = (email: string) => {
    return availableAttendees.find(a => a.email === email);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Meeting Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Schedule and manage physical and virtual meetings
            </p>
          </div>
          <Dialog open={isCreateMeetingOpen} onOpenChange={setIsCreateMeetingOpen}>
            <DialogTrigger asChild>
              <Button>
                <CalendarPlus className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>

        {/* Meeting Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Meetings</p>
                  <p className="text-2xl font-bold">{meetings.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Upcoming</p>
                  <p className="text-2xl font-bold">
                    {meetings.filter(m => m.status === "scheduled").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Virtual</p>
                  <p className="text-2xl font-bold">
                    {meetings.filter(m => m.type === "virtual").length}
                  </p>
                </div>
                <Video className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Physical</p>
                  <p className="text-2xl font-bold">
                    {meetings.filter(m => m.type === "physical").length}
                  </p>
                </div>
                <MapPin className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="all">All Meetings</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            <div className="grid gap-4">
              {getFilteredMeetings().map((meeting) => (
                <Card key={meeting.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{meeting.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant={getTypeVariant(meeting.type)}>
                              {getTypeIcon(meeting.type)}
                              <span className="ml-1 capitalize">{meeting.type}</span>
                            </Badge>
                            <Badge variant={getStatusVariant(meeting.status)}>
                              {meeting.status.replace('-', ' ')}
                            </Badge>
                            <Badge variant={getPriorityVariant(meeting.priority)}>
                              {meeting.priority} priority
                            </Badge>
                            {meeting.recurring && (
                              <Badge variant="outline" className="text-xs">
                                Recurring
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground">{meeting.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{new Date(meeting.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{meeting.startTime} - {meeting.endTime}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>Organized by: {meeting.organizer}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{meeting.attendees.length} attendees</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {meeting.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{meeting.location}</span>
                              </div>
                            )}
                            {meeting.meetingLink && (
                              <div className="flex items-center gap-2">
                                <LinkIcon className="h-4 w-4 text-muted-foreground" />
                                <a 
                                  href={meeting.meetingLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-blue-600 hover:underline"
                                >
                                  Join Meeting
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Attendees */}
                        <div>
                          <Label className="text-sm font-medium">Attendees:</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {meeting.attendees.slice(0, 5).map((email, index) => {
                              const attendee = getAttendeeInfo(email);
                              return (
                                <div key={index} className="flex items-center gap-1 bg-muted rounded-full px-3 py-1">
                                  <Avatar className="h-5 w-5">
                                    <AvatarImage src={attendee?.avatar} alt={attendee?.name || email} />
                                    <AvatarFallback className="text-xs">
                                      {attendee?.name ? attendee.name.split(' ').map(n => n[0]).join('') : email[0].toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs">{attendee?.name || email}</span>
                                </div>
                              );
                            })}
                            {meeting.attendees.length > 5 && (
                              <Badge variant="outline" className="text-xs">
                                +{meeting.attendees.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedMeeting(meeting);
                            setIsMeetingDetailsOpen(true);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Create Meeting Dialog */}
        <Dialog open={isCreateMeetingOpen} onOpenChange={setIsCreateMeetingOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Schedule New Meeting</DialogTitle>
              <DialogDescription>
                Create a physical, virtual, or hybrid meeting
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="title">Meeting Title</Label>
                <Input
                  id="title"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter meeting title"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newMeeting.description}
                  onChange={(e) => setNewMeeting(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter meeting description"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Meeting Type</Label>
                <Select value={newMeeting.type} onValueChange={(value) => setNewMeeting(prev => ({ ...prev, type: value as any }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select meeting type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="virtual">Virtual</SelectItem>
                    <SelectItem value="physical">Physical</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={newMeeting.priority} onValueChange={(value) => setNewMeeting(prev => ({ ...prev, priority: value as any }))}>
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
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newMeeting.date}
                  onChange={(e) => setNewMeeting(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={newMeeting.startTime}
                  onChange={(e) => setNewMeeting(prev => ({ ...prev, startTime: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newMeeting.endTime}
                  onChange={(e) => setNewMeeting(prev => ({ ...prev, endTime: e.target.value }))}
                />
              </div>
              
              {(newMeeting.type === "physical" || newMeeting.type === "hybrid") && (
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newMeeting.location}
                    onChange={(e) => setNewMeeting(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter meeting location"
                  />
                </div>
              )}
              
              {(newMeeting.type === "virtual" || newMeeting.type === "hybrid") && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="platform">Platform</Label>
                    <Select value={newMeeting.platform} onValueChange={(value) => setNewMeeting(prev => ({ ...prev, platform: value as any }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zoom">Zoom</SelectItem>
                        <SelectItem value="teams">Microsoft Teams</SelectItem>
                        <SelectItem value="google-meet">Google Meet</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meetingLink">Meeting Link</Label>
                    <Input
                      id="meetingLink"
                      value={newMeeting.meetingLink}
                      onChange={(e) => setNewMeeting(prev => ({ ...prev, meetingLink: e.target.value }))}
                      placeholder="Enter meeting link"
                    />
                  </div>
                </>
              )}
              
              <div className="col-span-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recurring"
                    checked={newMeeting.recurring}
                    onCheckedChange={(checked) => setNewMeeting(prev => ({ ...prev, recurring: checked as boolean }))}
                  />
                  <Label htmlFor="recurring">Recurring meeting</Label>
                </div>
                {newMeeting.recurring && (
                  <Select value={newMeeting.recurrencePattern} onValueChange={(value) => setNewMeeting(prev => ({ ...prev, recurrencePattern: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recurrence pattern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
              
              <div className="col-span-2 space-y-2">
                <Label htmlFor="attendees">Attendees (comma-separated emails)</Label>
                <Textarea
                  id="attendees"
                  value={newMeeting.attendees}
                  onChange={(e) => setNewMeeting(prev => ({ ...prev, attendees: e.target.value }))}
                  placeholder="Enter attendee emails separated by commas"
                  rows={2}
                />
              </div>
              
              <div className="col-span-2 space-y-2">
                <Label htmlFor="agenda">Agenda (one item per line)</Label>
                <Textarea
                  id="agenda"
                  value={newMeeting.agenda}
                  onChange={(e) => setNewMeeting(prev => ({ ...prev, agenda: e.target.value }))}
                  placeholder="Enter agenda items, one per line"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateMeetingOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateMeeting}>
                Schedule Meeting
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Meeting Details Dialog */}
        <Dialog open={isMeetingDetailsOpen} onOpenChange={setIsMeetingDetailsOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedMeeting?.title}</DialogTitle>
              <DialogDescription>
                Meeting details and agenda
              </DialogDescription>
            </DialogHeader>
            {selectedMeeting && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Date & Time</Label>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedMeeting.date).toLocaleDateString()} • {selectedMeeting.startTime} - {selectedMeeting.endTime}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Type</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getTypeVariant(selectedMeeting.type)}>
                          {getTypeIcon(selectedMeeting.type)}
                          <span className="ml-1 capitalize">{selectedMeeting.type}</span>
                        </Badge>
                      </div>
                    </div>
                    {selectedMeeting.location && (
                      <div>
                        <Label className="text-sm font-medium">Location</Label>
                        <p className="text-sm text-muted-foreground">{selectedMeeting.location}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Organizer</Label>
                      <p className="text-sm text-muted-foreground">{selectedMeeting.organizer}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Priority</Label>
                      <div className="mt-1">
                        <Badge variant={getPriorityVariant(selectedMeeting.priority)}>
                          {selectedMeeting.priority} priority
                        </Badge>
                      </div>
                    </div>
                    {selectedMeeting.meetingLink && (
                      <div>
                        <Label className="text-sm font-medium">Meeting Link</Label>
                        <p className="text-sm">
                          <a 
                            href={selectedMeeting.meetingLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:underline"
                          >
                            Join Meeting
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedMeeting.description}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Agenda</Label>
                  <ul className="mt-2 space-y-1">
                    {selectedMeeting.agenda.map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Attendees ({selectedMeeting.attendees.length})</Label>
                  <div className="mt-2 space-y-2">
                    {selectedMeeting.attendees.map((email, index) => {
                      const attendee = getAttendeeInfo(email);
                      return (
                        <div key={index} className="flex items-center gap-3 p-2 bg-muted rounded">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={attendee?.avatar} alt={attendee?.name || email} />
                            <AvatarFallback className="text-xs">
                              {attendee?.name ? attendee.name.split(' ').map(n => n[0]).join('') : email[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{attendee?.name || email}</p>
                            {attendee && (
                              <p className="text-xs text-muted-foreground">
                                {attendee.position} • {attendee.department}
                              </p>
                            )}
                          </div>
                          {attendee && (
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${attendee.status === 'accepted' ? 'border-green-500 text-green-700' : 
                                attendee.status === 'declined' ? 'border-red-500 text-red-700' : 
                                'border-yellow-500 text-yellow-700'}`}
                            >
                              {attendee.status}
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsMeetingDetailsOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MeetingManagement;
