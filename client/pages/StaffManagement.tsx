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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Search,
  Calendar as CalendarIcon,
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  Phone,
  Mail,
  FileText,
  DollarSign,
  Activity,
  BarChart3,
  Eye,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Building,
  MapPin,
  Filter,
  Download,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface StaffMember {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  department: string;
  position: string;
  startDate: string;
  status: "active" | "inactive" | "onboarding" | "offboarding";
  location: string;
  manager: string;
  performance: StaffPerformance;
  customers: CustomerAssignment[];
  tasks: TaskAssignment[];
  metrics: PerformanceMetrics;
}

interface StaffPerformance {
  currentRating: number;
  previousRating: number;
  completedTasks: number;
  overdueTasks: number;
  customerSatisfaction: number;
  salesMetrics?: SalesMetrics;
  attendance: AttendanceMetrics;
  efficiency: number;
  collaboration: number;
  innovation: number;
}

interface SalesMetrics {
  totalRevenue: number;
  dealsWon: number;
  dealsLost: number;
  pipelineValue: number;
  conversionRate: number;
  averageDealSize: number;
  activitiesThisPeriod: {
    calls: number;
    emails: number;
    meetings: number;
    demos: number;
  };
}

interface AttendanceMetrics {
  daysPresent: number;
  daysAbsent: number;
  lateDays: number;
  attendanceRate: number;
  punctualityScore: number;
}

interface CustomerAssignment {
  customerId: string;
  customerName: string;
  company: string;
  stage: "Lead" | "Qualified" | "Proposal" | "Negotiation" | "Closed-Won" | "Closed-Lost" | "Churned";
  value: number;
  assignedDate: string;
  lastInteraction: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  churnRisk: "Low" | "Medium" | "High";
  engagementScore: number;
}

interface TaskAssignment {
  taskId: string;
  title: string;
  status: "To Do" | "In Progress" | "Review" | "Done";
  priority: "Low" | "Medium" | "High" | "Critical";
  dueDate: string;
  estimatedHours: number;
  actualHours?: number;
}

interface PerformanceMetrics {
  productivity: number;
  quality: number;
  timeliness: number;
  communication: number;
  overall: number;
  trend: "up" | "down" | "stable";
}

const StaffManagement = () => {
  const [staffMembers] = useState<StaffMember[]>([
    {
      id: "staff-1",
      employeeId: "EMP-001",
      name: "Sarah Johnson",
      email: "sarah@company.com",
      phone: "+1 234 567 8901",
      avatar: "",
      department: "Sales",
      position: "Senior Sales Manager",
      startDate: "2023-01-15",
      status: "active",
      location: "Lagos, Nigeria",
      manager: "Mike Wilson",
      performance: {
        currentRating: 4.5,
        previousRating: 4.2,
        completedTasks: 45,
        overdueTasks: 2,
        customerSatisfaction: 4.8,
        salesMetrics: {
          totalRevenue: 850000,
          dealsWon: 12,
          dealsLost: 3,
          pipelineValue: 1200000,
          conversionRate: 80,
          averageDealSize: 70800,
          activitiesThisPeriod: {
            calls: 45,
            emails: 120,
            meetings: 18,
            demos: 8
          }
        },
        attendance: {
          daysPresent: 22,
          daysAbsent: 1,
          lateDays: 0,
          attendanceRate: 95.7,
          punctualityScore: 100
        },
        efficiency: 92,
        collaboration: 88,
        innovation: 85
      },
      customers: [
        {
          customerId: "cust-1",
          customerName: "John Smith",
          company: "TechCorp Ltd",
          stage: "Negotiation",
          value: 75000,
          assignedDate: "2024-01-10",
          lastInteraction: "2024-01-25",
          priority: "High",
          churnRisk: "Low",
          engagementScore: 85
        },
        {
          customerId: "cust-2",
          customerName: "Emily Davis",
          company: "StartupXYZ",
          stage: "Proposal",
          value: 35000,
          assignedDate: "2024-01-15",
          lastInteraction: "2024-01-24",
          priority: "Medium",
          churnRisk: "Medium",
          engagementScore: 72
        }
      ],
      tasks: [
        {
          taskId: "TSK-001",
          title: "Prepare quarterly sales report",
          status: "In Progress",
          priority: "High",
          dueDate: "2024-02-01",
          estimatedHours: 8,
          actualHours: 5
        }
      ],
      metrics: {
        productivity: 92,
        quality: 88,
        timeliness: 95,
        communication: 90,
        overall: 91.25,
        trend: "up"
      }
    },
    {
      id: "staff-2",
      employeeId: "EMP-002",
      name: "Michael Chen",
      email: "michael@company.com",
      phone: "+1 234 567 8902",
      avatar: "",
      department: "Engineering",
      position: "Senior Developer",
      startDate: "2022-08-20",
      status: "active",
      location: "Abuja, Nigeria",
      manager: "David Kim",
      performance: {
        currentRating: 4.3,
        previousRating: 4.1,
        completedTasks: 38,
        overdueTasks: 1,
        customerSatisfaction: 4.6,
        attendance: {
          daysPresent: 23,
          daysAbsent: 0,
          lateDays: 1,
          attendanceRate: 100,
          punctualityScore: 95.7
        },
        efficiency: 89,
        collaboration: 92,
        innovation: 94
      },
      customers: [],
      tasks: [
        {
          taskId: "TSK-003",
          title: "Database optimization",
          status: "To Do",
          priority: "High",
          dueDate: "2024-02-20",
          estimatedHours: 15
        }
      ],
      metrics: {
        productivity: 89,
        quality: 94,
        timeliness: 87,
        communication: 85,
        overall: 88.75,
        trend: "up"
      }
    },
    {
      id: "staff-3",
      employeeId: "EMP-003",
      name: "Jennifer Martinez",
      email: "jennifer@company.com",
      phone: "+1 234 567 8903",
      avatar: "",
      department: "Marketing",
      position: "Marketing Specialist",
      startDate: "2023-03-10",
      status: "active",
      location: "Port Harcourt, Nigeria",
      manager: "Lisa Park",
      performance: {
        currentRating: 4.0,
        previousRating: 3.8,
        completedTasks: 32,
        overdueTasks: 3,
        customerSatisfaction: 4.4,
        attendance: {
          daysPresent: 21,
          daysAbsent: 2,
          lateDays: 2,
          attendanceRate: 91.3,
          punctualityScore: 91.3
        },
        efficiency: 82,
        collaboration: 86,
        innovation: 78
      },
      customers: [
        {
          customerId: "cust-3",
          customerName: "Robert Wilson",
          company: "Enterprise Solutions",
          stage: "Lead",
          value: 120000,
          assignedDate: "2024-01-20",
          lastInteraction: "2024-01-22",
          priority: "Critical",
          churnRisk: "High",
          engagementScore: 45
        }
      ],
      tasks: [
        {
          taskId: "TSK-002",
          title: "Social media campaign",
          status: "Review",
          priority: "Medium",
          dueDate: "2024-01-30",
          estimatedHours: 12,
          actualHours: 14
        }
      ],
      metrics: {
        productivity: 82,
        quality: 85,
        timeliness: 78,
        communication: 88,
        overall: 83.25,
        trend: "up"
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [performanceFilter, setPerformanceFilter] = useState("All");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isStaffDetailOpen, setIsStaffDetailOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === "All" || staff.department === departmentFilter;
    
    const matchesPerformance = performanceFilter === "All" || 
      (performanceFilter === "Excellent" && staff.performance.currentRating >= 4.5) ||
      (performanceFilter === "Good" && staff.performance.currentRating >= 4.0 && staff.performance.currentRating < 4.5) ||
      (performanceFilter === "Average" && staff.performance.currentRating >= 3.0 && staff.performance.currentRating < 4.0) ||
      (performanceFilter === "Poor" && staff.performance.currentRating < 3.0);
    
    const staffStartDate = new Date(staff.startDate);
    const matchesDateFrom = !dateFrom || staffStartDate >= dateFrom;
    const matchesDateTo = !dateTo || staffStartDate <= dateTo;
    
    return matchesSearch && matchesDepartment && matchesPerformance && matchesDateFrom && matchesDateTo;
  });

  const getPerformanceBadgeVariant = (rating: number) => {
    if (rating >= 4.5) return "default";
    if (rating >= 4.0) return "secondary";
    if (rating >= 3.0) return "outline";
    return "destructive";
  };

  const getPerformanceLabel = (rating: number) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 4.0) return "Good";
    if (rating >= 3.0) return "Average";
    return "Poor";
  };

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down": return <TrendingDown className="h-4 w-4 text-red-500" />;
      case "stable": return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Lead": return "bg-blue-100 text-blue-800";
      case "Qualified": return "bg-green-100 text-green-800";
      case "Proposal": return "bg-yellow-100 text-yellow-800";
      case "Negotiation": return "bg-orange-100 text-orange-800";
      case "Closed-Won": return "bg-emerald-100 text-emerald-800";
      case "Closed-Lost": return "bg-red-100 text-red-800";
      case "Churned": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getChurnRiskColor = (risk: "Low" | "Medium" | "High") => {
    switch (risk) {
      case "Low": return "text-green-600";
      case "Medium": return "text-yellow-600";
      case "High": return "text-red-600";
    }
  };

  const departments = [...new Set(staffMembers.map(s => s.department))];

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Staff Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Monitor staff performance, manage customer assignments, and track productivity
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button>
              <Users className="mr-2 h-4 w-4" />
              Add Staff
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search staff..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by performance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Performance</SelectItem>
                    <SelectItem value="Excellent">Excellent (4.5+)</SelectItem>
                    <SelectItem value="Good">Good (4.0-4.4)</SelectItem>
                    <SelectItem value="Average">Average (3.0-3.9)</SelectItem>
                    <SelectItem value="Poor">Poor (&lt;3.0)</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFrom ? format(dateFrom, "MMM dd") : "Start Date"}
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
                        {dateTo ? format(dateTo, "MMM dd") : "End Date"}
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
                </div>
              </div>
              
              {(dateFrom || dateTo) && (
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setDateFrom(undefined);
                      setDateTo(undefined);
                    }}
                  >
                    Clear Date Filter
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Staff Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredStaff.length}</div>
              <p className="text-xs text-muted-foreground">
                Active employees
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(filteredStaff.reduce((sum, s) => sum + s.performance.currentRating, 0) / filteredStaff.length).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">
                Out of 5.0
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Performers</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredStaff.filter(s => s.performance.currentRating >= 4.5).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Rating 4.5+
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(filteredStaff.reduce((sum, s) => sum + s.performance.attendance.attendanceRate, 0) / filteredStaff.length).toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Average rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Staff Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
            <TabsTrigger value="customers">Customer Assignments</TabsTrigger>
          </TabsList>

          {/* Staff Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4">
              {filteredStaff.map((staff) => (
                <Card key={staff.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={staff.avatar} alt={staff.name} />
                          <AvatarFallback className="text-lg">
                            {staff.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="space-y-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{staff.name}</h3>
                              <Badge variant="outline" className="font-mono text-xs">
                                {staff.employeeId}
                              </Badge>
                              <Badge variant={getPerformanceBadgeVariant(staff.performance.currentRating)}>
                                {getPerformanceLabel(staff.performance.currentRating)}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground">{staff.position} • {staff.department}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {staff.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {staff.phone}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {staff.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              Manager: {staff.manager}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              Current: {staff.performance.currentRating.toFixed(1)}
                            </div>
                            <div className="flex items-center gap-1">
                              {getTrendIcon(staff.metrics.trend)}
                              Previous: {staff.performance.previousRating.toFixed(1)}
                            </div>
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {staff.performance.completedTasks} completed
                            </div>
                            <div className="flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3 text-red-500" />
                              {staff.performance.overdueTasks} overdue
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-blue-500" />
                              {staff.performance.attendance.attendanceRate.toFixed(1)}% attendance
                            </div>
                          </div>
                          
                          {staff.customers.length > 0 && (
                            <div>
                              <div className="text-sm font-medium mb-1">Customer Assignments ({staff.customers.length})</div>
                              <div className="flex flex-wrap gap-1">
                                {staff.customers.slice(0, 3).map(customer => (
                                  <Badge key={customer.customerId} className={`text-xs ${getStageColor(customer.stage)}`}>
                                    {customer.customerName} - {customer.stage}
                                  </Badge>
                                ))}
                                {staff.customers.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{staff.customers.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <div className="text-right">
                          <div className="text-2xl font-bold">{staff.metrics.overall.toFixed(1)}%</div>
                          <div className="text-sm text-muted-foreground">Overall Score</div>
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedStaff(staff);
                            setIsStaffDetailOpen(true);
                          }}
                        >
                          <Eye className="mr-1 h-3 w-3" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Performance Analytics Tab */}
          <TabsContent value="performance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredStaff.map((staff) => (
                <Card key={staff.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{staff.name}</span>
                      {getTrendIcon(staff.metrics.trend)}
                    </CardTitle>
                    <CardDescription>{staff.position}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Productivity</span>
                          <span>{staff.metrics.productivity}%</span>
                        </div>
                        <Progress value={staff.metrics.productivity} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Quality</span>
                          <span>{staff.metrics.quality}%</span>
                        </div>
                        <Progress value={staff.metrics.quality} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Timeliness</span>
                          <span>{staff.metrics.timeliness}%</span>
                        </div>
                        <Progress value={staff.metrics.timeliness} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Communication</span>
                          <span>{staff.metrics.communication}%</span>
                        </div>
                        <Progress value={staff.metrics.communication} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Overall Rating</span>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-bold">{staff.performance.currentRating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {staff.performance.salesMetrics && (
                      <div className="pt-3 border-t space-y-2">
                        <div className="text-sm font-medium">Sales Performance</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Revenue:</span>
                            <div className="font-medium">₦{(staff.performance.salesMetrics.totalRevenue / 1000).toFixed(0)}K</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Conversion:</span>
                            <div className="font-medium">{staff.performance.salesMetrics.conversionRate}%</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Deals Won:</span>
                            <div className="font-medium">{staff.performance.salesMetrics.dealsWon}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Pipeline:</span>
                            <div className="font-medium">₦{(staff.performance.salesMetrics.pipelineValue / 1000).toFixed(0)}K</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Customer Assignments Tab */}
          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Pipeline Details</CardTitle>
                <CardDescription>
                  View customer assignments and pipeline stages for each staff member
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff Member</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Churn Risk</TableHead>
                      <TableHead>Engagement</TableHead>
                      <TableHead>Last Interaction</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff.flatMap(staff => 
                      staff.customers.map(customer => (
                        <TableRow key={`${staff.id}-${customer.customerId}`}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={staff.avatar} alt={staff.name} />
                                <AvatarFallback className="text-xs">
                                  {staff.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{staff.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{customer.customerName}</TableCell>
                          <TableCell>{customer.company}</TableCell>
                          <TableCell>
                            <Badge className={`${getStageColor(customer.stage)} text-xs`}>
                              {customer.stage}
                            </Badge>
                          </TableCell>
                          <TableCell>₦{customer.value.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={
                              customer.priority === "Critical" ? "destructive" :
                              customer.priority === "High" ? "destructive" :
                              customer.priority === "Medium" ? "default" : "secondary"
                            }>
                              {customer.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className={`text-sm font-medium ${getChurnRiskColor(customer.churnRisk)}`}>
                              {customer.churnRisk}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={customer.engagementScore} className="w-16 h-2" />
                              <span className="text-xs">{customer.engagementScore}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(customer.lastInteraction).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                
                {filteredStaff.every(staff => staff.customers.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    No customer assignments found for the filtered staff members.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Staff Detail Dialog */}
        <Dialog open={isStaffDetailOpen} onOpenChange={setIsStaffDetailOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedStaff?.avatar} alt={selectedStaff?.name} />
                  <AvatarFallback>
                    {selectedStaff?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {selectedStaff?.name} - Performance Details
              </DialogTitle>
              <DialogDescription>
                Comprehensive performance and customer assignment overview
              </DialogDescription>
            </DialogHeader>
            
            {selectedStaff && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3">Performance Metrics</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Productivity</span>
                            <span>{selectedStaff.metrics.productivity}%</span>
                          </div>
                          <Progress value={selectedStaff.metrics.productivity} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Quality</span>
                            <span>{selectedStaff.metrics.quality}%</span>
                          </div>
                          <Progress value={selectedStaff.metrics.quality} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Timeliness</span>
                            <span>{selectedStaff.metrics.timeliness}%</span>
                          </div>
                          <Progress value={selectedStaff.metrics.timeliness} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Communication</span>
                            <span>{selectedStaff.metrics.communication}%</span>
                          </div>
                          <Progress value={selectedStaff.metrics.communication} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Attendance</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Present Days:</span>
                          <div className="font-medium">{selectedStaff.performance.attendance.daysPresent}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Absent Days:</span>
                          <div className="font-medium">{selectedStaff.performance.attendance.daysAbsent}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Late Days:</span>
                          <div className="font-medium">{selectedStaff.performance.attendance.lateDays}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Attendance Rate:</span>
                          <div className="font-medium">{selectedStaff.performance.attendance.attendanceRate.toFixed(1)}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {selectedStaff.performance.salesMetrics && (
                      <div>
                        <h4 className="font-medium mb-3">Sales Performance</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Total Revenue:</span>
                            <div className="font-medium">₦{selectedStaff.performance.salesMetrics.totalRevenue.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Deals Won:</span>
                            <div className="font-medium">{selectedStaff.performance.salesMetrics.dealsWon}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Conversion Rate:</span>
                            <div className="font-medium">{selectedStaff.performance.salesMetrics.conversionRate}%</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Pipeline Value:</span>
                            <div className="font-medium">₦{selectedStaff.performance.salesMetrics.pipelineValue.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Avg Deal Size:</span>
                            <div className="font-medium">₦{selectedStaff.performance.salesMetrics.averageDealSize.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Calls Made:</span>
                            <div className="font-medium">{selectedStaff.performance.salesMetrics.activitiesThisPeriod.calls}</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="font-medium mb-3">Task Performance</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Completed Tasks:</span>
                          <div className="font-medium">{selectedStaff.performance.completedTasks}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Overdue Tasks:</span>
                          <div className="font-medium">{selectedStaff.performance.overdueTasks}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Efficiency:</span>
                          <div className="font-medium">{selectedStaff.performance.efficiency}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Customer Satisfaction:</span>
                          <div className="font-medium">{selectedStaff.performance.customerSatisfaction.toFixed(1)}/5.0</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedStaff.customers.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Customer Assignments</h4>
                    <div className="space-y-3">
                      {selectedStaff.customers.map(customer => (
                        <div key={customer.customerId} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{customer.customerName}</div>
                              <div className="text-sm text-muted-foreground">{customer.company}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">₦{customer.value.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">
                                Last contact: {new Date(customer.lastInteraction).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={`${getStageColor(customer.stage)} text-xs`}>
                              {customer.stage}
                            </Badge>
                            <Badge variant={
                              customer.priority === "Critical" ? "destructive" :
                              customer.priority === "High" ? "destructive" :
                              customer.priority === "Medium" ? "default" : "secondary"
                            }>
                              {customer.priority}
                            </Badge>
                            <span className={`text-xs ${getChurnRiskColor(customer.churnRisk)}`}>
                              Churn Risk: {customer.churnRisk}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsStaffDetailOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default StaffManagement;
