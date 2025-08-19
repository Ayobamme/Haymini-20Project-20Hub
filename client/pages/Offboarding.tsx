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
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Calendar as CalendarIcon,
  CheckCircle2,
  User,
  Users,
  Building,
  UserMinus,
  ListChecks,
  Clock,
  Target,
  TrendingDown,
  Save,
  X,
  FileText,
  Briefcase,
  Shield,
  Key,
  CreditCard,
  Laptop,
  AlertTriangle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface OffboardingChecklistItem {
  id: string;
  title: string;
  description: string;
  category: "HR" | "IT" | "Manager" | "Finance" | "Legal" | "Security" | "Facilities";
  priority: "Low" | "Medium" | "High" | "Critical";
  estimatedDays: number;
  isCompleted: boolean;
  completedDate?: string;
  assignedTo: string;
  notes?: string;
  order: number;
}

interface OffboardingTemplate {
  id: string;
  name: string;
  description: string;
  department: string;
  position: string;
  checklist: OffboardingChecklistItem[];
  isDefault: boolean;
  createdDate: string;
  lastUpdated: string;
}

interface OffboardingEmployee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  lastWorkingDay: string;
  resignationDate: string;
  reason: "Resignation" | "Termination" | "Retirement" | "Contract End" | "Layoff";
  templateId: string;
  checklist: OffboardingChecklistItem[];
  progress: number;
  status: "Pending" | "In Progress" | "Completed";
  exitInterviewCompleted: boolean;
  accessRevoked: boolean;
  equipmentReturned: boolean;
  finalPayProcessed: boolean;
  handoverCompleted: boolean;
  assignedManager: string;
}

const Offboarding = () => {
  const [offboardingTemplates, setOffboardingTemplates] = useState<OffboardingTemplate[]>([
    {
      id: "template-1",
      name: "Standard Employee Offboarding",
      description: "Complete offboarding checklist for regular employees",
      department: "All",
      position: "General",
      isDefault: true,
      createdDate: "2024-01-15",
      lastUpdated: "2024-01-20",
      checklist: [
        {
          id: "item-1",
          title: "Receive resignation letter and acknowledge",
          description: "Formally acknowledge receipt of resignation and confirm last working day",
          category: "HR",
          priority: "High",
          estimatedDays: 1,
          isCompleted: false,
          assignedTo: "HR Team",
          order: 1
        },
        {
          id: "item-2",
          title: "Schedule exit interview",
          description: "Book exit interview session to gather feedback and insights",
          category: "HR",
          priority: "Medium",
          estimatedDays: 2,
          isCompleted: false,
          assignedTo: "HR Team",
          order: 2
        },
        {
          id: "item-3",
          title: "Disable system access and accounts",
          description: "Revoke access to all systems, email, VPN, and applications",
          category: "IT",
          priority: "Critical",
          estimatedDays: 1,
          isCompleted: false,
          assignedTo: "IT Security",
          order: 3
        },
        {
          id: "item-4",
          title: "Collect company equipment",
          description: "Retrieve laptop, monitor, phone, access cards, and other company property",
          category: "IT",
          priority: "High",
          estimatedDays: 1,
          isCompleted: false,
          assignedTo: "IT Support",
          order: 4
        },
        {
          id: "item-5",
          title: "Knowledge transfer and handover",
          description: "Document and transfer ongoing projects and responsibilities",
          category: "Manager",
          priority: "High",
          estimatedDays: 5,
          isCompleted: false,
          assignedTo: "Direct Manager",
          order: 5
        },
        {
          id: "item-6",
          title: "Process final payroll and benefits",
          description: "Calculate final salary, unused leave, and benefits settlement",
          category: "Finance",
          priority: "High",
          estimatedDays: 3,
          isCompleted: false,
          assignedTo: "Finance Team",
          order: 6
        },
        {
          id: "item-7",
          title: "Return security access cards and keys",
          description: "Collect all physical access cards, keys, and security tokens",
          category: "Security",
          priority: "High",
          estimatedDays: 1,
          isCompleted: false,
          assignedTo: "Security Team",
          order: 7
        },
        {
          id: "item-8",
          title: "Update organizational chart and team structure",
          description: "Remove from team listings and update reporting structures",
          category: "HR",
          priority: "Medium",
          estimatedDays: 1,
          isCompleted: false,
          assignedTo: "HR Team",
          order: 8
        },
        {
          id: "item-9",
          title: "Conduct exit interview",
          description: "Complete formal exit interview and document feedback",
          category: "HR",
          priority: "Medium",
          estimatedDays: 1,
          isCompleted: false,
          assignedTo: "HR Manager",
          order: 9
        },
        {
          id: "item-10",
          title: "Process legal documentation",
          description: "Handle non-disclosure agreements, return policies, and legal clearance",
          category: "Legal",
          priority: "Medium",
          estimatedDays: 2,
          isCompleted: false,
          assignedTo: "Legal Team",
          order: 10
        }
      ]
    },
    {
      id: "template-2",
      name: "Executive Offboarding",
      description: "Comprehensive offboarding process for executives and senior management",
      department: "Executive",
      position: "Senior Management",
      isDefault: false,
      createdDate: "2024-01-18",
      lastUpdated: "2024-01-22",
      checklist: [
        {
          id: "item-11",
          title: "Board notification and announcement",
          description: "Notify board of directors and prepare internal/external announcements",
          category: "HR",
          priority: "Critical",
          estimatedDays: 1,
          isCompleted: false,
          assignedTo: "CEO/HR Director",
          order: 1
        },
        {
          id: "item-12",
          title: "Transition leadership responsibilities",
          description: "Formal handover of leadership duties and decision-making authority",
          category: "Manager",
          priority: "Critical",
          estimatedDays: 7,
          isCompleted: false,
          assignedTo: "Board/CEO",
          order: 2
        },
        {
          id: "item-13",
          title: "Revoke high-level access and credentials",
          description: "Remove executive-level system access, signing authority, and security clearances",
          category: "Security",
          priority: "Critical",
          estimatedDays: 1,
          isCompleted: false,
          assignedTo: "IT Security/Legal",
          order: 3
        }
      ]
    }
  ]);

  const [offboardingEmployees, setOffboardingEmployees] = useState<OffboardingEmployee[]>([
    {
      id: "emp-1",
      name: "Michael Thompson",
      email: "michael.thompson@company.com",
      position: "Senior Developer",
      department: "Engineering",
      lastWorkingDay: "2024-03-01",
      resignationDate: "2024-02-15",
      reason: "Resignation",
      templateId: "template-1",
      assignedManager: "Sarah Wilson",
      status: "In Progress",
      progress: 40,
      exitInterviewCompleted: false,
      accessRevoked: true,
      equipmentReturned: false,
      finalPayProcessed: false,
      handoverCompleted: false,
      checklist: [
        {
          id: "item-1",
          title: "Receive resignation letter and acknowledge",
          description: "Formally acknowledge receipt of resignation and confirm last working day",
          category: "HR",
          priority: "High",
          estimatedDays: 1,
          isCompleted: true,
          completedDate: "2024-02-15",
          assignedTo: "HR Team",
          order: 1
        },
        {
          id: "item-2",
          title: "Schedule exit interview",
          description: "Book exit interview session to gather feedback and insights",
          category: "HR",
          priority: "Medium",
          estimatedDays: 2,
          isCompleted: true,
          completedDate: "2024-02-16",
          assignedTo: "HR Team",
          order: 2
        },
        {
          id: "item-3",
          title: "Disable system access and accounts",
          description: "Revoke access to all systems, email, VPN, and applications",
          category: "IT",
          priority: "Critical",
          estimatedDays: 1,
          isCompleted: true,
          completedDate: "2024-02-16",
          assignedTo: "IT Security",
          order: 3
        },
        {
          id: "item-4",
          title: "Collect company equipment",
          description: "Retrieve laptop, monitor, phone, access cards, and other company property",
          category: "IT",
          priority: "High",
          estimatedDays: 1,
          isCompleted: true,
          completedDate: "2024-02-17",
          assignedTo: "IT Support",
          order: 4
        },
        {
          id: "item-5",
          title: "Knowledge transfer and handover",
          description: "Document and transfer ongoing projects and responsibilities",
          category: "Manager",
          priority: "High",
          estimatedDays: 5,
          isCompleted: false,
          assignedTo: "Direct Manager",
          order: 5
        },
        {
          id: "item-6",
          title: "Process final payroll and benefits",
          description: "Calculate final salary, unused leave, and benefits settlement",
          category: "Finance",
          priority: "High",
          estimatedDays: 3,
          isCompleted: false,
          assignedTo: "Finance Team",
          order: 6
        },
        {
          id: "item-7",
          title: "Return security access cards and keys",
          description: "Collect all physical access cards, keys, and security tokens",
          category: "Security",
          priority: "High",
          estimatedDays: 1,
          isCompleted: false,
          assignedTo: "Security Team",
          order: 7
        },
        {
          id: "item-8",
          title: "Update organizational chart and team structure",
          description: "Remove from team listings and update reporting structures",
          category: "HR",
          priority: "Medium",
          estimatedDays: 1,
          isCompleted: false,
          assignedTo: "HR Team",
          order: 8
        },
        {
          id: "item-9",
          title: "Conduct exit interview",
          description: "Complete formal exit interview and document feedback",
          category: "HR",
          priority: "Medium",
          estimatedDays: 1,
          isCompleted: false,
          assignedTo: "HR Manager",
          order: 9
        },
        {
          id: "item-10",
          title: "Process legal documentation",
          description: "Handle non-disclosure agreements, return policies, and legal clearance",
          category: "Legal",
          priority: "Medium",
          estimatedDays: 2,
          isCompleted: false,
          assignedTo: "Legal Team",
          order: 10
        }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [reasonFilter, setReasonFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("employees");
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isEditTemplateOpen, setIsEditTemplateOpen] = useState(false);
  const [isChecklistItemOpen, setIsChecklistItemOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<OffboardingTemplate | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<OffboardingEmployee | null>(null);

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    department: "",
    position: ""
  });

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    lastWorkingDay: "",
    resignationDate: "",
    reason: "Resignation",
    templateId: "",
    assignedManager: ""
  });

  const [newChecklistItem, setNewChecklistItem] = useState({
    title: "",
    description: "",
    category: "HR",
    priority: "Medium",
    estimatedDays: "",
    assignedTo: ""
  });

  const departments = ["All", "Engineering", "Design", "Marketing", "Sales", "HR", "Finance", "Executive"];
  const categories = ["HR", "IT", "Manager", "Finance", "Legal", "Security", "Facilities"];
  const reasons = ["All", "Resignation", "Termination", "Retirement", "Contract End", "Layoff"];

  const filteredEmployees = offboardingEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === "All" || employee.department === departmentFilter;
    const matchesStatus = statusFilter === "All" || employee.status === statusFilter;
    const matchesReason = reasonFilter === "All" || employee.reason === reasonFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesReason;
  });

  const filteredTemplates = offboardingTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === "All" || template.department === departmentFilter || template.department === "All";
    
    return matchesSearch && matchesDepartment;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "HR": return "bg-blue-100 text-blue-800";
      case "IT": return "bg-green-100 text-green-800";
      case "Manager": return "bg-purple-100 text-purple-800";
      case "Finance": return "bg-orange-100 text-orange-800";
      case "Legal": return "bg-red-100 text-red-800";
      case "Security": return "bg-yellow-100 text-yellow-800";
      case "Facilities": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
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

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case "Resignation": return "bg-blue-100 text-blue-800";
      case "Termination": return "bg-red-100 text-red-800";
      case "Retirement": return "bg-green-100 text-green-800";
      case "Contract End": return "bg-yellow-100 text-yellow-800";
      case "Layoff": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.department || !newTemplate.position) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const template: OffboardingTemplate = {
      id: Date.now().toString(),
      ...newTemplate,
      checklist: [],
      isDefault: false,
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setOffboardingTemplates([...offboardingTemplates, template]);
    setNewTemplate({ name: "", description: "", department: "", position: "" });
    setIsCreateTemplateOpen(false);

    toast({
      title: "Template Created",
      description: `Offboarding template "${template.name}" has been created.`,
    });
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.lastWorkingDay || !newEmployee.templateId) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const template = offboardingTemplates.find(t => t.id === newEmployee.templateId);
    if (!template) return;

    const employee: OffboardingEmployee = {
      id: Date.now().toString(),
      ...newEmployee,
      checklist: template.checklist.map(item => ({ ...item, isCompleted: false })),
      progress: 0,
      status: "Pending",
      exitInterviewCompleted: false,
      accessRevoked: false,
      equipmentReturned: false,
      finalPayProcessed: false,
      handoverCompleted: false
    };

    setOffboardingEmployees([...offboardingEmployees, employee]);
    setNewEmployee({
      name: "", email: "", position: "", department: "", lastWorkingDay: "",
      resignationDate: "", reason: "Resignation", templateId: "", assignedManager: ""
    });
    setIsAddEmployeeOpen(false);

    toast({
      title: "Employee Added",
      description: `${employee.name} has been added to the offboarding process.`,
    });
  };

  const handleAddChecklistItem = () => {
    if (!selectedTemplate || !newChecklistItem.title || !newChecklistItem.assignedTo) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const checklistItem: OffboardingChecklistItem = {
      id: Date.now().toString(),
      ...newChecklistItem,
      estimatedDays: parseInt(newChecklistItem.estimatedDays) || 1,
      isCompleted: false,
      order: selectedTemplate.checklist.length + 1
    };

    setOffboardingTemplates(prev => prev.map(template =>
      template.id === selectedTemplate.id
        ? { 
            ...template, 
            checklist: [...template.checklist, checklistItem],
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : template
    ));

    setNewChecklistItem({
      title: "", description: "", category: "HR", priority: "Medium",
      estimatedDays: "", assignedTo: ""
    });
    setIsChecklistItemOpen(false);

    toast({
      title: "Checklist Item Added",
      description: "New item has been added to the template.",
    });
  };

  const handleToggleChecklistItem = (employeeId: string, itemId: string) => {
    setOffboardingEmployees(prev => prev.map(employee =>
      employee.id === employeeId
        ? {
            ...employee,
            checklist: employee.checklist.map(item =>
              item.id === itemId
                ? {
                    ...item,
                    isCompleted: !item.isCompleted,
                    completedDate: !item.isCompleted ? new Date().toISOString().split('T')[0] : undefined
                  }
                : item
            ),
            progress: Math.round(((employee.checklist.filter(i => i.id === itemId ? !i.isCompleted : i.isCompleted).length) / employee.checklist.length) * 100),
            status: employee.checklist.filter(i => i.id === itemId ? !i.isCompleted : i.isCompleted).length === employee.checklist.length ? "Completed" : "In Progress"
          }
        : employee
    ));

    toast({
      title: "Progress Updated",
      description: "Checklist item has been updated.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Offboarding Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage offboarding templates and track employee departures
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <UserMinus className="mr-2 h-4 w-4" />
                  Add Departure
                </Button>
              </DialogTrigger>
            </Dialog>
            <Dialog open={isCreateTemplateOpen} onOpenChange={setIsCreateTemplateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
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
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={reasonFilter} onValueChange={setReasonFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by reason" />
                </SelectTrigger>
                <SelectContent>
                  {reasons.map(reason => (
                    <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <span className="text-sm text-muted-foreground self-center">
                {activeTab === "employees" ? `${filteredEmployees.length} departures` : `${filteredTemplates.length} templates`}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Offboardings</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {offboardingEmployees.filter(e => e.status === "In Progress").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently in progress
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {offboardingEmployees.filter(e => e.status === "Completed").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Successfully offboarded
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Access Revoked</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {offboardingEmployees.filter(e => e.accessRevoked).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Security cleared
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Equipment Returned</CardTitle>
              <Laptop className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {offboardingEmployees.filter(e => e.equipmentReturned).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Assets recovered
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {offboardingEmployees.length > 0 
                  ? Math.round(offboardingEmployees.reduce((sum, e) => sum + e.progress, 0) / offboardingEmployees.length)
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Across all departures
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="employees">Departing Employees</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          {/* Departing Employees Tab */}
          <TabsContent value="employees" className="space-y-4">
            <div className="grid gap-4">
              {filteredEmployees.map((employee) => (
                <Card key={employee.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">{employee.name}</h3>
                            <p className="text-muted-foreground">{employee.position} • {employee.department}</p>
                            <p className="text-sm text-muted-foreground">{employee.email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={
                              employee.status === "Completed" ? "default" :
                              employee.status === "In Progress" ? "secondary" : "outline"
                            }>
                              {employee.status}
                            </Badge>
                            <Badge className={getReasonColor(employee.reason)}>
                              {employee.reason}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground">Last Working Day</Label>
                            <p className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3" />
                              {new Date(employee.lastWorkingDay).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground">Resignation Date</Label>
                            <p>{new Date(employee.resignationDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground">Manager</Label>
                            <p>{employee.assignedManager}</p>
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground">Days Remaining</Label>
                            <p className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {Math.max(0, Math.ceil((new Date(employee.lastWorkingDay).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days
                            </p>
                          </div>
                        </div>

                        {/* Quick Status Indicators */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Checkbox checked={employee.exitInterviewCompleted} readOnly />
                            <span className="text-xs">Exit Interview</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox checked={employee.accessRevoked} readOnly />
                            <span className="text-xs">Access Revoked</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox checked={employee.equipmentReturned} readOnly />
                            <span className="text-xs">Equipment Returned</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox checked={employee.handoverCompleted} readOnly />
                            <span className="text-xs">Handover Complete</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox checked={employee.finalPayProcessed} readOnly />
                            <span className="text-xs">Final Pay Processed</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Progress</span>
                            <span className="font-medium">{employee.progress}%</span>
                          </div>
                          <Progress value={employee.progress} className="h-2" />
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                              {employee.checklist.filter(c => c.isCompleted).length} of {employee.checklist.length} completed
                            </span>
                            <span>
                              {employee.checklist.reduce((sum, c) => sum + c.estimatedDays, 0)} days estimated
                            </span>
                          </div>
                        </div>

                        {/* Checklist Preview */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Checklist Progress</Label>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {employee.checklist.slice(0, 4).map((item) => (
                              <div key={item.id} className="flex items-center gap-3 p-2 border rounded text-sm">
                                <Checkbox
                                  checked={item.isCompleted}
                                  onCheckedChange={() => handleToggleChecklistItem(employee.id, item.id)}
                                />
                                <div className="flex-1">
                                  <div className={`font-medium ${item.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                                    {item.title}
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Badge className={getCategoryColor(item.category)} variant="outline">
                                      {item.category}
                                    </Badge>
                                    {item.priority === "Critical" && (
                                      <AlertTriangle className="h-3 w-3 text-red-500" />
                                    )}
                                    <span>{item.estimatedDays} days</span>
                                    <span>{item.assignedTo}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {employee.checklist.length > 4 && (
                              <p className="text-xs text-muted-foreground text-center">
                                +{employee.checklist.length - 4} more items
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedEmployee(employee)}
                        >
                          View Details
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Employee
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Exit Interview
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove Employee
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-4">
            <div className="grid gap-4">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{template.name}</h3>
                          {template.isDefault && (
                            <Badge variant="secondary">Default</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground">{template.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground">Department</Label>
                            <p>{template.department}</p>
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground">Position</Label>
                            <p>{template.position}</p>
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground">Checklist Items</Label>
                            <p>{template.checklist.length} items</p>
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground">Last Updated</Label>
                            <p>{new Date(template.lastUpdated).toLocaleDateString()}</p>
                          </div>
                        </div>

                        {/* Category Breakdown */}
                        <div className="flex flex-wrap gap-2">
                          {categories.map(category => {
                            const count = template.checklist.filter(item => item.category === category).length;
                            return count > 0 ? (
                              <Badge key={category} className={getCategoryColor(category)} variant="outline">
                                {category}: {count}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedTemplate(template);
                            setIsEditTemplateOpen(true);
                          }}
                        >
                          View/Edit
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Template
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Target className="mr-2 h-4 w-4" />
                              Set as Default
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Template
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Create Template Dialog */}
        <Dialog open={isCreateTemplateOpen} onOpenChange={setIsCreateTemplateOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Offboarding Template</DialogTitle>
              <DialogDescription>
                Create a new offboarding template for specific roles
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="templateName">Template Name *</Label>
                <Input 
                  id="templateName" 
                  placeholder="e.g., Executive Offboarding" 
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="templateDescription">Description</Label>
                <Textarea
                  id="templateDescription"
                  placeholder="Describe the offboarding process..."
                  rows={3}
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="templateDepartment">Department *</Label>
                  <Select value={newTemplate.department} onValueChange={(value) => setNewTemplate(prev => ({ ...prev, department: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.filter(d => d !== "All").map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="templatePosition">Position *</Label>
                  <Input
                    id="templatePosition"
                    placeholder="e.g., Senior Manager"
                    value={newTemplate.position}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, position: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateTemplateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTemplate}>Create Template</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Employee Dialog */}
        <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Departing Employee</DialogTitle>
              <DialogDescription>
                Add an employee to the offboarding process
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="employeeName">Employee Name *</Label>
                <Input 
                  id="employeeName" 
                  placeholder="Full name" 
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="employeeEmail">Email *</Label>
                <Input
                  id="employeeEmail"
                  type="email"
                  placeholder="email@company.com"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="employeePosition">Position</Label>
                  <Input
                    id="employeePosition"
                    placeholder="Job title"
                    value={newEmployee.position}
                    onChange={(e) => setNewEmployee(prev => ({ ...prev, position: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="employeeDepartment">Department</Label>
                  <Select value={newEmployee.department} onValueChange={(value) => setNewEmployee(prev => ({ ...prev, department: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.filter(d => d !== "All").map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="resignationDate">Resignation Date</Label>
                  <Input
                    id="resignationDate"
                    type="date"
                    value={newEmployee.resignationDate}
                    onChange={(e) => setNewEmployee(prev => ({ ...prev, resignationDate: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastWorkingDay">Last Working Day *</Label>
                  <Input
                    id="lastWorkingDay"
                    type="date"
                    value={newEmployee.lastWorkingDay}
                    onChange={(e) => setNewEmployee(prev => ({ ...prev, lastWorkingDay: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="employeeReason">Reason for Leaving</Label>
                  <Select value={newEmployee.reason} onValueChange={(value) => setNewEmployee(prev => ({ ...prev, reason: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {reasons.filter(r => r !== "All").map(reason => (
                        <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="employeeTemplate">Offboarding Template *</Label>
                  <Select value={newEmployee.templateId} onValueChange={(value) => setNewEmployee(prev => ({ ...prev, templateId: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {offboardingTemplates.map(template => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name} ({template.department})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="employeeManager">Assigned Manager</Label>
                <Input
                  id="employeeManager"
                  placeholder="Manager name"
                  value={newEmployee.assignedManager}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, assignedManager: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddEmployeeOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEmployee}>Add Employee</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Template Dialog */}
        <Dialog open={isEditTemplateOpen} onOpenChange={setIsEditTemplateOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Template: {selectedTemplate?.name}</DialogTitle>
              <DialogDescription>
                Manage checklist items for this offboarding template
              </DialogDescription>
            </DialogHeader>
            {selectedTemplate && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Checklist Items ({selectedTemplate.checklist.length})</h3>
                    <p className="text-sm text-muted-foreground">
                      Estimated total: {selectedTemplate.checklist.reduce((sum, item) => sum + item.estimatedDays, 0)} days
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setIsChecklistItemOpen(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>

                <div className="space-y-3">
                  {selectedTemplate.checklist
                    .sort((a, b) => a.order - b.order)
                    .map((item, index) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 border rounded">
                      <div className="text-sm font-medium text-muted-foreground w-8">
                        {index + 1}.
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge className={getCategoryColor(item.category)} variant="outline">
                            {item.category}
                          </Badge>
                          <Badge variant={getPriorityColor(item.priority)}>
                            {item.priority}
                          </Badge>
                          {item.priority === "Critical" && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-xs text-muted-foreground">
                            {item.estimatedDays} days • {item.assignedTo}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {selectedTemplate.checklist.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No checklist items yet. Add your first item above.
                    </div>
                  )}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditTemplateOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Checklist Item Dialog */}
        <Dialog open={isChecklistItemOpen} onOpenChange={setIsChecklistItemOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Checklist Item</DialogTitle>
              <DialogDescription>
                Add a new item to the offboarding checklist
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="itemTitle">Title *</Label>
                <Input 
                  id="itemTitle" 
                  placeholder="Checklist item title" 
                  value={newChecklistItem.title}
                  onChange={(e) => setNewChecklistItem(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="itemDescription">Description</Label>
                <Textarea
                  id="itemDescription"
                  placeholder="Detailed description of the task..."
                  rows={3}
                  value={newChecklistItem.description}
                  onChange={(e) => setNewChecklistItem(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="itemCategory">Category *</Label>
                  <Select value={newChecklistItem.category} onValueChange={(value) => setNewChecklistItem(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="itemPriority">Priority</Label>
                  <Select value={newChecklistItem.priority} onValueChange={(value) => setNewChecklistItem(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="itemDays">Estimated Days *</Label>
                  <Input
                    id="itemDays"
                    type="number"
                    placeholder="Number of days"
                    value={newChecklistItem.estimatedDays}
                    onChange={(e) => setNewChecklistItem(prev => ({ ...prev, estimatedDays: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="itemAssignedTo">Assigned To *</Label>
                  <Input
                    id="itemAssignedTo"
                    placeholder="Person/role responsible"
                    value={newChecklistItem.assignedTo}
                    onChange={(e) => setNewChecklistItem(prev => ({ ...prev, assignedTo: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsChecklistItemOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddChecklistItem}>Add Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Offboarding;
