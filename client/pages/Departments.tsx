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
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  Building,
  MapPin,
  DollarSign,
  TrendingUp,
  UserPlus,
  Settings,
  Eye,
  Activity,
  Target,
} from "lucide-react";

const departments = [
  {
    id: "DEPT-001",
    name: "Engineering",
    description: "Software development and technical operations",
    headOfDepartment: "Alex Rodriguez",
    location: "San Francisco, CA",
    employeeCount: 25,
    budget: 2500000,
    budgetUsed: 1875000,
    teams: ["Frontend Development", "Backend Development", "DevOps"],
    establishedDate: "2020-01-15",
    status: "Active",
    avgSalary: 120000,
    projects: 15,
    completedProjects: 12,
    performance: 92,
  },
  {
    id: "DEPT-002",
    name: "Marketing & Growth",
    description:
      "Digital marketing, brand management, and customer acquisition",
    headOfDepartment: "Lisa Park",
    location: "New York, NY",
    employeeCount: 12,
    budget: 800000,
    budgetUsed: 520000,
    teams: ["Digital Marketing", "Content Strategy", "Growth Analytics"],
    establishedDate: "2020-03-01",
    status: "Active",
    avgSalary: 85000,
    projects: 8,
    completedProjects: 6,
    performance: 88,
  },
  {
    id: "DEPT-003",
    name: "Product Design",
    description: "User experience design and product strategy",
    headOfDepartment: "Sarah Wilson",
    location: "Austin, TX",
    employeeCount: 8,
    budget: 650000,
    budgetUsed: 455000,
    teams: ["UX Design", "UI Design", "Product Strategy"],
    establishedDate: "2020-06-15",
    status: "Active",
    avgSalary: 95000,
    projects: 10,
    completedProjects: 8,
    performance: 90,
  },
  {
    id: "DEPT-004",
    name: "Sales",
    description: "Business development and customer relations",
    headOfDepartment: "Michael Torres",
    location: "Chicago, IL",
    employeeCount: 15,
    budget: 1200000,
    budgetUsed: 960000,
    teams: ["Enterprise Sales", "SMB Sales", "Customer Success"],
    establishedDate: "2019-11-01",
    status: "Active",
    avgSalary: 110000,
    projects: 5,
    completedProjects: 4,
    performance: 85,
  },
  {
    id: "DEPT-005",
    name: "Operations",
    description: "Human resources, finance, and administrative support",
    headOfDepartment: "Emma Thompson",
    location: "Remote",
    employeeCount: 10,
    budget: 900000,
    budgetUsed: 675000,
    teams: ["HR", "Finance", "Legal & Compliance"],
    establishedDate: "2020-01-01",
    status: "Active",
    avgSalary: 75000,
    projects: 3,
    completedProjects: 3,
    performance: 95,
  },
];

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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const getPerformanceColor = (performance: number) => {
  if (performance >= 90) return "success";
  if (performance >= 80) return "default";
  if (performance >= 70) return "warning";
  return "destructive";
};

export default function Departments() {
  const [isCreateDepartmentOpen, setIsCreateDepartmentOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const departmentStats = {
    totalDepartments: departments.length,
    totalEmployees: departments.reduce(
      (acc, dept) => acc + dept.employeeCount,
      0,
    ),
    totalBudget: departments.reduce((acc, dept) => acc + dept.budget, 0),
    totalBudgetUsed: departments.reduce(
      (acc, dept) => acc + dept.budgetUsed,
      0,
    ),
    avgPerformance: Math.round(
      departments.reduce((acc, dept) => acc + dept.performance, 0) /
        departments.length,
    ),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Departments</h1>
          <p className="text-muted-foreground">
            Manage organizational departments and structure.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog
            open={isCreateDepartmentOpen}
            onOpenChange={setIsCreateDepartmentOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Department</DialogTitle>
                <DialogDescription>
                  Add a new department to your organizational structure.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="deptName">Department Name *</Label>
                    <Input id="deptName" placeholder="Department name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="deptHead">Head of Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department head" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alex">Alex Rodriguez</SelectItem>
                        <SelectItem value="lisa">Lisa Park</SelectItem>
                        <SelectItem value="sarah">Sarah Wilson</SelectItem>
                        <SelectItem value="michael">Michael Torres</SelectItem>
                        <SelectItem value="emma">Emma Thompson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="deptDescription">Description</Label>
                  <Textarea
                    id="deptDescription"
                    placeholder="Department description and responsibilities"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="deptLocation">Location</Label>
                    <Input
                      id="deptLocation"
                      placeholder="e.g., San Francisco, CA or Remote"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="deptBudget">Annual Budget (₦)</Label>
                    <Input
                      id="deptBudget"
                      type="number"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="deptTeams">Teams (comma-separated)</Label>
                  <Input
                    id="deptTeams"
                    placeholder="e.g., Frontend Team, Backend Team"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDepartmentOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Department</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Department Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Departments
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {departmentStats.totalDepartments}
            </div>
            <p className="text-xs text-muted-foreground">Active departments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {departmentStats.totalEmployees}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all departments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(departmentStats.totalBudget)}
            </div>
            <p className="text-xs text-muted-foreground">Annual allocation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Used</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (departmentStats.totalBudgetUsed /
                  departmentStats.totalBudget) *
                  100,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(departmentStats.totalBudgetUsed)} used
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Performance
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {departmentStats.avgPerformance}%
            </div>
            <p className="text-xs text-muted-foreground">Overall rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDepartments.map((department) => (
          <Card
            key={department.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg line-clamp-1">
                      {department.name}
                    </CardTitle>
                  </div>
                  <Badge
                    variant={getPerformanceColor(department.performance) as any}
                  >
                    {department.performance}% Performance
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
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Department
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Employee
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Manage Teams
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Department
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="text-sm line-clamp-2">
                {department.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Department Head */}
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt={department.headOfDepartment} />
                  <AvatarFallback className="text-xs">
                    {getInitials(department.headOfDepartment)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">
                    {department.headOfDepartment}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Head of Department
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Employees</div>
                  <div className="font-medium text-lg">
                    {department.employeeCount}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Projects</div>
                  <div className="font-medium text-lg">
                    {department.projects}
                  </div>
                </div>
              </div>

              {/* Budget Information */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Budget Used</span>
                  <span className="font-medium">
                    {Math.round(
                      (department.budgetUsed / department.budget) * 100,
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width: `${(department.budgetUsed / department.budget) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatCurrency(department.budgetUsed)}</span>
                  <span>{formatCurrency(department.budget)}</span>
                </div>
              </div>

              {/* Location and Teams */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{department.location}</span>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Teams</div>
                  <div className="flex flex-wrap gap-1">
                    {department.teams.slice(0, 2).map((team) => (
                      <Badge key={team} variant="outline" className="text-xs">
                        {team}
                      </Badge>
                    ))}
                    {department.teams.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{department.teams.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t">
                <div>
                  <div className="text-muted-foreground">Avg Salary</div>
                  <div className="font-medium">
                    {formatCurrency(department.avgSalary)}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Established</div>
                  <div className="font-medium">
                    {formatDate(department.establishedDate)}
                  </div>
                </div>
              </div>

              {/* Project Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Projects Completed</span>
                  <span className="font-medium">
                    {department.completedProjects}/{department.projects}
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-success h-2 rounded-full"
                    style={{
                      width: `${(department.completedProjects / department.projects) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
