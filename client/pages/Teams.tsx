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
import {
  Plus,
  Users,
  Mail,
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
  Search,
  Filter,
  Calendar,
  MapPin,
  Globe,
  Shield,
} from "lucide-react";

const teams = [
  {
    id: "TEAM-001",
    name: "Frontend Development",
    description:
      "Responsible for user interface and user experience development",
    members: [
      {
        id: "1",
        name: "John Doe",
        email: "john@company.com",
        role: "Team Lead",
        avatar: "",
        status: "online",
        joinDate: "2023-01-15",
      },
      {
        id: "2",
        name: "Sarah Wilson",
        email: "sarah@company.com",
        role: "Senior Developer",
        avatar: "",
        status: "away",
        joinDate: "2023-02-01",
      },
      {
        id: "3",
        name: "Mike Chen",
        email: "mike@company.com",
        role: "UI/UX Designer",
        avatar: "",
        status: "online",
        joinDate: "2023-03-10",
      },
    ],
    activeProjects: 8,
    completedProjects: 15,
    department: "Engineering",
    location: "San Francisco, CA",
  },
  {
    id: "TEAM-002",
    name: "Backend Development",
    description: "Server-side development and API management",
    members: [
      {
        id: "4",
        name: "Alex Rodriguez",
        email: "alex@company.com",
        role: "Team Lead",
        avatar: "",
        status: "online",
        joinDate: "2023-01-20",
      },
      {
        id: "5",
        name: "Emma Thompson",
        email: "emma@company.com",
        role: "Senior Developer",
        avatar: "",
        status: "offline",
        joinDate: "2023-02-15",
      },
    ],
    activeProjects: 5,
    completedProjects: 12,
    department: "Engineering",
    location: "Remote",
  },
  {
    id: "TEAM-003",
    name: "Marketing & Growth",
    description: "Product marketing and customer acquisition",
    members: [
      {
        id: "6",
        name: "Lisa Park",
        email: "lisa@company.com",
        role: "Marketing Manager",
        avatar: "",
        status: "online",
        joinDate: "2023-01-10",
      },
      {
        id: "7",
        name: "David Kim",
        email: "david@company.com",
        role: "Content Strategist",
        avatar: "",
        status: "away",
        joinDate: "2023-03-01",
      },
      {
        id: "8",
        name: "Rachel Green",
        email: "rachel@company.com",
        role: "Social Media Manager",
        avatar: "",
        status: "online",
        joinDate: "2023-04-05",
      },
    ],
    activeProjects: 12,
    completedProjects: 8,
    department: "Marketing",
    location: "New York, NY",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-green-500";
    case "away":
      return "bg-yellow-500";
    case "offline":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
};

const getDepartmentColor = (department: string) => {
  switch (department) {
    case "Engineering":
      return "bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0";
    case "Marketing":
      return "bg-gradient-to-r from-pink-500 to-rose-600 text-white border-0";
    case "Design":
      return "bg-gradient-to-r from-purple-500 to-violet-600 text-white border-0";
    case "Sales":
      return "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0";
    case "Operations":
      return "bg-gradient-to-r from-orange-500 to-red-500 text-white border-0";
    default:
      return "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0";
  }
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export default function Teams() {
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [isInviteMemberOpen, setIsInviteMemberOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");

  const filteredTeams = teams.filter((team) => {
    const matchesSearch = team.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDepartment =
      departmentFilter === "all" || team.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(teams.map((team) => team.department))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
              Teams
            </h1>
            <p className="text-lg text-slate-600">
              Manage your teams and team members across all projects.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Dialog open={isCreateTeamOpen} onOpenChange={setIsCreateTeamOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Team
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] border-0 shadow-2xl bg-gradient-to-br from-white to-slate-50">
                <DialogHeader>
                  <DialogTitle className="text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Create New Team
                  </DialogTitle>
                  <DialogDescription className="text-slate-600">
                    Create a new team and start collaborating with your
                    colleagues.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-slate-700 font-medium">Team Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter team name"
                      className="col-span-3 border-2 border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description" className="text-slate-700 font-medium">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the team's purpose and responsibilities"
                      className="col-span-3 border-2 border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="department" className="text-slate-700 font-medium">Department</Label>
                    <Select>
                      <SelectTrigger className="border-2 border-slate-200 focus:border-emerald-400">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location" className="text-slate-700 font-medium">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., San Francisco, CA or Remote"
                      className="col-span-3 border-2 border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateTeamOpen(false)}
                    className="border-2 border-slate-300 hover:bg-slate-100"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0">
                    Create Team
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-2 border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-[180px] border-2 border-slate-200 focus:border-emerald-400">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Teams Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTeams.map((team) => (
            <Card key={team.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg text-slate-800">{team.name}</CardTitle>
                    <Badge className={getDepartmentColor(team.department)}>
                      {team.department}
                    </Badge>
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
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Team
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedTeam(team.id);
                          setIsInviteMemberOpen(true);
                        }}
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Invite Member
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Team
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="text-sm text-slate-600">
                  {team.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Team Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100">
                    <div className="text-2xl font-bold text-blue-700">
                      {team.activeProjects}
                    </div>
                    <div className="text-xs text-blue-600 font-medium">
                      Active Projects
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100">
                    <div className="text-2xl font-bold text-green-700">
                      {team.completedProjects}
                    </div>
                    <div className="text-xs text-green-600 font-medium">Completed</div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center text-sm text-muted-foreground p-2 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100">
                  <MapPin className="mr-1 h-3 w-3" />
                  {team.location}
                </div>

                {/* Team Members */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Members ({team.members.length})
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedTeam(team.id);
                        setIsInviteMemberOpen(true);
                      }}
                      className="h-8 w-8 p-0 hover:bg-emerald-50"
                    >
                      <UserPlus className="h-3 w-3 text-emerald-600" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {team.members.slice(0, 3).map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center space-x-3 p-2 rounded-lg bg-gradient-to-r from-white to-slate-50 border border-slate-200"
                      >
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="text-xs bg-gradient-to-r from-indigo-400 to-purple-500 text-white">
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(
                              member.status,
                            )}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-slate-800">
                            {member.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    ))}
                    {team.members.length > 3 && (
                      <div className="text-xs text-muted-foreground text-center py-1 bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg">
                        +{team.members.length - 3} more members
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Invite Member Dialog */}
        <Dialog open={isInviteMemberOpen} onOpenChange={setIsInviteMemberOpen}>
          <DialogContent className="sm:max-w-[500px] border-0 shadow-2xl bg-gradient-to-br from-white to-slate-50">
            <DialogHeader>
              <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Invite Team Member
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                Send an email invitation to add a new member to the team.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  className="col-span-3 border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role" className="text-slate-700 font-medium">Role</Label>
                <Select>
                  <SelectTrigger className="border-2 border-slate-200 focus:border-blue-400">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Team Member</SelectItem>
                    <SelectItem value="lead">Team Lead</SelectItem>
                    <SelectItem value="senior">Senior Member</SelectItem>
                    <SelectItem value="junior">Junior Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="team" className="text-slate-700 font-medium">Team</Label>
                <Select value={selectedTeam || ""}>
                  <SelectTrigger className="border-2 border-slate-200 focus:border-blue-400">
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message" className="text-slate-700 font-medium">Invitation Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Add a personal message to the invitation"
                  className="col-span-3 border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsInviteMemberOpen(false)}
                className="border-2 border-slate-300 hover:bg-slate-100"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
                <Mail className="mr-2 h-4 w-4" />
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Team Stats Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Total Teams</CardTitle>
              <Users className="h-8 w-8 text-blue-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{teams.length}</div>
              <p className="text-blue-100 text-sm">
                Across {departments.length} departments
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-100">Total Members</CardTitle>
              <UserPlus className="h-8 w-8 text-emerald-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {teams.reduce((acc, team) => acc + team.members.length, 0)}
              </div>
              <p className="text-emerald-100 text-sm">Active team members</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-500 to-violet-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">
                Active Projects
              </CardTitle>
              <Calendar className="h-8 w-8 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {teams.reduce((acc, team) => acc + team.activeProjects, 0)}
              </div>
              <p className="text-purple-100 text-sm">In progress</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-100">Departments</CardTitle>
              <Globe className="h-8 w-8 text-orange-200" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{departments.length}</div>
              <p className="text-orange-100 text-sm">Active departments</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
