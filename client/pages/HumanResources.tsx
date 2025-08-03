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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  UserPlus,
  UserMinus,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Calendar,
  FileText,
  Mail,
  Phone,
  MapPin,
  Building,
  CreditCard,
  Key,
  Shield,
  Settings,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  BookOpen,
  GraduationCap,
  Briefcase,
  Home,
  Car,
  Heart,
  DollarSign,
  Calculator,
  UserCheck,
  Activity,
  Clipboard,
  CheckSquare,
  FileCheck,
  Send,
  Printer,
  Archive,
  Bell,
  MessageSquare,
  Video,
  Calendar as CalendarIcon,
  Laptop,
  Monitor,
  Smartphone,
  Headphones,
  Package,
  Truck,
  Globe,
  Lock,
  Unlock,
  Star,
  Target,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  startDate: string;
  endDate?: string;
  status: "onboarding" | "active" | "offboarding" | "terminated" | "resigned";
  manager: string;
  location: string;
  profileImage?: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  documents: {
    idType: string;
    idNumber: string;
    resume: boolean;
    contracts: boolean;
    taxForms: boolean;
    bankDetails: boolean;
    medicalClearance: boolean;
    backgroundCheck: boolean;
  };
  onboardingProgress: number;
  offboardingProgress: number;
}

interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  category: "documentation" | "equipment" | "training" | "orientation" | "system_access";
  priority: "low" | "medium" | "high" | "critical";
  status: "pending" | "in_progress" | "completed" | "overdue";
  assignedTo: string;
  dueDate: string;
  completedDate?: string;
  notes?: string;
  requiresApproval: boolean;
  approvedBy?: string;
  dependencies: string[];
  estimatedHours: number;
  actualHours?: number;
}

interface OffboardingTask {
  id: string;
  title: string;
  description: string;
  category: "equipment_return" | "access_revocation" | "documentation" | "knowledge_transfer" | "exit_interview";
  priority: "low" | "medium" | "high" | "critical";
  status: "pending" | "in_progress" | "completed" | "overdue";
  assignedTo: string;
  dueDate: string;
  completedDate?: string;
  notes?: string;
  requiresApproval: boolean;
  approvedBy?: string;
  dependencies: string[];
  estimatedHours: number;
  actualHours?: number;
}

interface Equipment {
  id: string;
  name: string;
  type: "laptop" | "desktop" | "monitor" | "phone" | "tablet" | "accessories" | "software";
  serialNumber: string;
  brand: string;
  model: string;
  value: number;
  status: "available" | "assigned" | "maintenance" | "damaged" | "retired";
  assignedTo?: string;
  assignedDate?: string;
  location: string;
  notes?: string;
}

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: "safety" | "compliance" | "technical" | "soft_skills" | "company_culture";
  duration: number; // in hours
  mandatory: boolean;
  prerequisites: string[];
  status: "pending" | "in_progress" | "completed";
  progress: number;
  completionDate?: string;
  certificateRequired: boolean;
  instructor?: string;
  materials: string[];
}

const HumanResources = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      employeeId: "EMP-001",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@company.com",
      phone: "+234-801-234-5678",
      department: "Engineering",
      position: "Senior Software Engineer",
      startDate: "2024-01-15",
      status: "onboarding",
      manager: "Jane Smith",
      location: "Lagos Office",
      emergencyContact: {
        name: "Jane Doe",
        relationship: "Spouse",
        phone: "+234-802-234-5678",
        email: "jane.doe@gmail.com",
      },
      documents: {
        idType: "National ID",
        idNumber: "12345678901",
        resume: true,
        contracts: true,
        taxForms: false,
        bankDetails: true,
        medicalClearance: false,
        backgroundCheck: true,
      },
      onboardingProgress: 65,
      offboardingProgress: 0,
    },
    {
      id: "2",
      employeeId: "EMP-002",
      firstName: "Sarah",
      lastName: "Wilson",
      email: "sarah.wilson@company.com",
      phone: "+234-803-234-5678",
      department: "Design",
      position: "UI/UX Designer",
      startDate: "2023-06-01",
      status: "active",
      manager: "Mark Johnson",
      location: "Abuja Office",
      emergencyContact: {
        name: "Michael Wilson",
        relationship: "Brother",
        phone: "+234-804-234-5678",
        email: "michael.wilson@gmail.com",
      },
      documents: {
        idType: "International Passport",
        idNumber: "A1234567",
        resume: true,
        contracts: true,
        taxForms: true,
        bankDetails: true,
        medicalClearance: true,
        backgroundCheck: true,
      },
      onboardingProgress: 100,
      offboardingProgress: 0,
    },
    {
      id: "3",
      employeeId: "EMP-003",
      firstName: "Mike",
      lastName: "Chen",
      email: "mike.chen@company.com",
      phone: "+234-805-234-5678",
      department: "Marketing",
      position: "Marketing Manager",
      startDate: "2022-03-15",
      endDate: "2024-02-15",
      status: "offboarding",
      manager: "Lisa Brown",
      location: "Lagos Office",
      emergencyContact: {
        name: "Linda Chen",
        relationship: "Sister",
        phone: "+234-806-234-5678",
        email: "linda.chen@gmail.com",
      },
      documents: {
        idType: "Driver's License",
        idNumber: "LAG/123456",
        resume: true,
        contracts: true,
        taxForms: true,
        bankDetails: true,
        medicalClearance: true,
        backgroundCheck: true,
      },
      onboardingProgress: 100,
      offboardingProgress: 45,
    },
  ]);

  const [onboardingTasks, setOnboardingTasks] = useState<OnboardingTask[]>([
    {
      id: "OB-001",
      title: "Complete Employment Contract",
      description: "Review and sign employment contract and company policies",
      category: "documentation",
      priority: "critical",
      status: "completed",
      assignedTo: "EMP-001",
      dueDate: "2024-01-17",
      completedDate: "2024-01-16",
      requiresApproval: true,
      approvedBy: "HR-001",
      dependencies: [],
      estimatedHours: 2,
      actualHours: 1.5,
    },
    {
      id: "OB-002",
      title: "Submit Tax Forms (TIN Certificate)",
      description: "Provide Tax Identification Number certificate for payroll setup",
      category: "documentation",
      priority: "high",
      status: "pending",
      assignedTo: "EMP-001",
      dueDate: "2024-01-20",
      requiresApproval: true,
      dependencies: ["OB-001"],
      estimatedHours: 1,
    },
    {
      id: "OB-003",
      title: "Medical Clearance",
      description: "Complete medical examination and submit health clearance certificate",
      category: "documentation",
      priority: "high",
      status: "in_progress",
      assignedTo: "EMP-001",
      dueDate: "2024-01-22",
      requiresApproval: true,
      dependencies: [],
      estimatedHours: 4,
    },
    {
      id: "OB-004",
      title: "Equipment Assignment",
      description: "Assign laptop, phone, and other necessary equipment",
      category: "equipment",
      priority: "high",
      status: "pending",
      assignedTo: "IT-001",
      dueDate: "2024-01-18",
      requiresApproval: false,
      dependencies: ["OB-001"],
      estimatedHours: 2,
    },
    {
      id: "OB-005",
      title: "System Access Setup",
      description: "Create accounts and assign permissions for company systems",
      category: "system_access",
      priority: "critical",
      status: "pending",
      assignedTo: "IT-001",
      dueDate: "2024-01-19",
      requiresApproval: true,
      dependencies: ["OB-001", "OB-003"],
      estimatedHours: 3,
    },
    {
      id: "OB-006",
      title: "Safety Training",
      description: "Complete mandatory workplace safety orientation",
      category: "training",
      priority: "high",
      status: "pending",
      assignedTo: "EMP-001",
      dueDate: "2024-01-25",
      requiresApproval: false,
      dependencies: ["OB-005"],
      estimatedHours: 4,
    },
    {
      id: "OB-007",
      title: "Company Orientation",
      description: "Attend new employee orientation session",
      category: "orientation",
      priority: "medium",
      status: "pending",
      assignedTo: "EMP-001",
      dueDate: "2024-01-23",
      requiresApproval: false,
      dependencies: ["OB-005"],
      estimatedHours: 8,
    },
  ]);

  const [offboardingTasks, setOffboardingTasks] = useState<OffboardingTask[]>([
    {
      id: "OFF-001",
      title: "Equipment Return",
      description: "Return all company equipment including laptop, phone, and accessories",
      category: "equipment_return",
      priority: "critical",
      status: "in_progress",
      assignedTo: "EMP-003",
      dueDate: "2024-02-10",
      requiresApproval: true,
      dependencies: [],
      estimatedHours: 2,
    },
    {
      id: "OFF-002",
      title: "System Access Revocation",
      description: "Revoke all system access including email, databases, and applications",
      category: "access_revocation",
      priority: "critical",
      status: "pending",
      assignedTo: "IT-001",
      dueDate: "2024-02-15",
      requiresApproval: true,
      dependencies: ["OFF-001"],
      estimatedHours: 2,
    },
    {
      id: "OFF-003",
      title: "Knowledge Transfer",
      description: "Complete handover of projects and responsibilities to team members",
      category: "knowledge_transfer",
      priority: "high",
      status: "completed",
      assignedTo: "EMP-003",
      dueDate: "2024-02-05",
      completedDate: "2024-02-04",
      requiresApproval: true,
      approvedBy: "MGR-001",
      dependencies: [],
      estimatedHours: 16,
      actualHours: 18,
    },
    {
      id: "OFF-004",
      title: "Exit Interview",
      description: "Conduct comprehensive exit interview to gather feedback",
      category: "exit_interview",
      priority: "medium",
      status: "pending",
      assignedTo: "HR-001",
      dueDate: "2024-02-12",
      requiresApproval: false,
      dependencies: ["OFF-003"],
      estimatedHours: 2,
    },
    {
      id: "OFF-005",
      title: "Final Documentation",
      description: "Complete final paperwork including clearance certificate and pension transfer",
      category: "documentation",
      priority: "high",
      status: "pending",
      assignedTo: "HR-001",
      dueDate: "2024-02-14",
      requiresApproval: true,
      dependencies: ["OFF-001", "OFF-002", "OFF-004"],
      estimatedHours: 3,
    },
  ]);

  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: "EQ-001",
      name: "MacBook Pro 16\"",
      type: "laptop",
      serialNumber: "MBA123456789",
      brand: "Apple",
      model: "MacBook Pro 16\" M2",
      value: 450000, // Nigerian Naira
      status: "assigned",
      assignedTo: "EMP-002",
      assignedDate: "2023-06-01",
      location: "Abuja Office",
      notes: "Primary development machine",
    },
    {
      id: "EQ-002",
      name: "iPhone 14 Pro",
      type: "phone",
      serialNumber: "IPH987654321",
      brand: "Apple",
      model: "iPhone 14 Pro",
      value: 220000,
      status: "assigned",
      assignedTo: "EMP-003",
      assignedDate: "2022-03-15",
      location: "Lagos Office",
    },
    {
      id: "EQ-003",
      name: "Dell UltraSharp Monitor",
      type: "monitor",
      serialNumber: "DELL123789456",
      brand: "Dell",
      model: "UltraSharp 27\" 4K",
      value: 85000,
      status: "available",
      location: "IT Storage",
    },
    {
      id: "EQ-004",
      name: "Lenovo ThinkPad X1",
      type: "laptop",
      serialNumber: "LEN456789123",
      brand: "Lenovo",
      model: "ThinkPad X1 Carbon",
      value: 380000,
      status: "available",
      location: "Lagos Office",
      notes: "Ready for new employee assignment",
    },
  ]);

  const [trainingModules, setTrainingModules] = useState<TrainingModule[]>([
    {
      id: "TM-001",
      title: "Workplace Safety and Emergency Procedures",
      description: "Comprehensive safety training covering fire evacuation, first aid, and emergency protocols",
      category: "safety",
      duration: 4,
      mandatory: true,
      prerequisites: [],
      status: "pending",
      progress: 0,
      certificateRequired: true,
      instructor: "Safety Officer",
      materials: ["Safety Manual", "Emergency Procedures Video", "First Aid Guide"],
    },
    {
      id: "TM-002",
      title: "Code of Conduct and Ethics",
      description: "Training on company values, ethical standards, and professional conduct",
      category: "compliance",
      duration: 2,
      mandatory: true,
      prerequisites: [],
      status: "completed",
      progress: 100,
      completionDate: "2024-01-16",
      certificateRequired: true,
      instructor: "HR Manager",
      materials: ["Employee Handbook", "Ethics Policy", "Code of Conduct"],
    },
    {
      id: "TM-003",
      title: "Technical Skills - React Development",
      description: "Advanced React development training for engineering team",
      category: "technical",
      duration: 16,
      mandatory: false,
      prerequisites: ["JavaScript Fundamentals"],
      status: "in_progress",
      progress: 35,
      certificateRequired: false,
      instructor: "Senior Developer",
      materials: ["React Documentation", "Practice Projects", "Code Reviews"],
    },
    {
      id: "TM-004",
      title: "Communication and Teamwork",
      description: "Soft skills training focusing on effective communication and collaboration",
      category: "soft_skills",
      duration: 8,
      mandatory: true,
      prerequisites: [],
      status: "pending",
      progress: 0,
      certificateRequired: false,
      instructor: "Training Coordinator",
      materials: ["Communication Handbook", "Team Building Exercises", "Presentation Skills"],
    },
    {
      id: "TM-005",
      title: "Company Culture and Values",
      description: "Introduction to company culture, mission, vision, and core values",
      category: "company_culture",
      duration: 6,
      mandatory: true,
      prerequisites: [],
      status: "completed",
      progress: 100,
      completionDate: "2024-01-17",
      certificateRequired: false,
      instructor: "CEO",
      materials: ["Culture Guide", "Company History", "Values Workshop"],
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showOnboardingDialog, setShowOnboardingDialog] = useState(false);
  const [showOffboardingDialog, setShowOffboardingDialog] = useState(false);
  const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [showEquipmentDialog, setShowEquipmentDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");

  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    startDate: "",
    manager: "",
    location: "",
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
      email: "",
    },
  });

  const departments = ["Engineering", "Design", "Marketing", "Sales", "HR", "Finance", "Operations"];
  const locations = ["Lagos Office", "Abuja Office", "Port Harcourt Office", "Remote"];
  const managers = ["Jane Smith", "Mark Johnson", "Lisa Brown", "David Wilson", "Sarah Connor"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "onboarding": return "bg-blue-100 text-blue-800";
      case "active": return "bg-green-100 text-green-800";
      case "offboarding": return "bg-yellow-100 text-yellow-800";
      case "terminated": return "bg-red-100 text-red-800";
      case "resigned": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-gray-100 text-gray-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low": return "bg-gray-100 text-gray-800";
      case "medium": return "bg-blue-100 text-blue-800";
      case "high": return "bg-yellow-100 text-yellow-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getEquipmentStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "assigned": return "bg-blue-100 text-blue-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      case "damaged": return "bg-red-100 text-red-800";
      case "retired": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const addEmployee = () => {
    if (!newEmployee.firstName || !newEmployee.lastName || !newEmployee.email || !newEmployee.department) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const employee: Employee = {
      id: `${Date.now()}`,
      employeeId: `EMP-${String(employees.length + 1).padStart(3, '0')}`,
      ...newEmployee,
      status: "onboarding",
      documents: {
        idType: "",
        idNumber: "",
        resume: false,
        contracts: false,
        taxForms: false,
        bankDetails: false,
        medicalClearance: false,
        backgroundCheck: false,
      },
      onboardingProgress: 0,
      offboardingProgress: 0,
    };

    setEmployees(prev => [...prev, employee]);
    setNewEmployee({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      startDate: "",
      manager: "",
      location: "",
      emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
        email: "",
      },
    });
    setShowEmployeeDialog(false);

    toast({
      title: "Employee Added",
      description: `${employee.firstName} ${employee.lastName} has been added to the onboarding process.`,
    });
  };

  const startOffboarding = (employeeId: string) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === employeeId 
        ? { ...emp, status: "offboarding" as const, endDate: new Date().toISOString().split('T')[0] }
        : emp
    ));
    
    toast({
      title: "Offboarding Started",
      description: "Employee has been moved to offboarding process.",
    });
  };

  const completeOnboarding = (employeeId: string) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === employeeId 
        ? { ...emp, status: "active" as const, onboardingProgress: 100 }
        : emp
    ));
    
    toast({
      title: "Onboarding Completed",
      description: "Employee is now active.",
    });
  };

  const completeOffboarding = (employeeId: string) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === employeeId 
        ? { ...emp, status: "resigned" as const, offboardingProgress: 100 }
        : emp
    ));
    
    toast({
      title: "Offboarding Completed",
      description: "Employee has been successfully offboarded.",
    });
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || employee.status === filterStatus;
    const matchesDepartment = filterDepartment === "all" || employee.department === filterDepartment;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const onboardingStats = {
    total: employees.filter(e => e.status === "onboarding").length,
    pending: onboardingTasks.filter(t => t.status === "pending").length,
    inProgress: onboardingTasks.filter(t => t.status === "in_progress").length,
    completed: onboardingTasks.filter(t => t.status === "completed").length,
    overdue: onboardingTasks.filter(t => t.status === "overdue").length,
  };

  const offboardingStats = {
    total: employees.filter(e => e.status === "offboarding").length,
    pending: offboardingTasks.filter(t => t.status === "pending").length,
    inProgress: offboardingTasks.filter(t => t.status === "in_progress").length,
    completed: offboardingTasks.filter(t => t.status === "completed").length,
    overdue: offboardingTasks.filter(t => t.status === "overdue").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Human Resources</h1>
          <p className="text-muted-foreground">
            Comprehensive employee onboarding and offboarding management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={showEmployeeDialog} onOpenChange={setShowEmployeeDialog}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>
                  Start the onboarding process for a new employee
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={newEmployee.firstName}
                      onChange={(e) => setNewEmployee({...newEmployee, firstName: e.target.value})}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={newEmployee.lastName}
                      onChange={(e) => setNewEmployee({...newEmployee, lastName: e.target.value})}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                      placeholder="employee@company.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                      placeholder="+234-XXX-XXX-XXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Department *</Label>
                    <Select 
                      value={newEmployee.department} 
                      onValueChange={(value) => setNewEmployee({...newEmployee, department: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={newEmployee.position}
                      onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                      placeholder="Job title"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newEmployee.startDate}
                      onChange={(e) => setNewEmployee({...newEmployee, startDate: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Manager</Label>
                    <Select 
                      value={newEmployee.manager} 
                      onValueChange={(value) => setNewEmployee({...newEmployee, manager: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select manager" />
                      </SelectTrigger>
                      <SelectContent>
                        {managers.map((manager) => (
                          <SelectItem key={manager} value={manager}>{manager}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Location</Label>
                  <Select 
                    value={newEmployee.location} 
                    onValueChange={(value) => setNewEmployee({...newEmployee, location: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Emergency Contact</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="emergencyName">Contact Name</Label>
                      <Input
                        id="emergencyName"
                        value={newEmployee.emergencyContact.name}
                        onChange={(e) => setNewEmployee({
                          ...newEmployee,
                          emergencyContact: {...newEmployee.emergencyContact, name: e.target.value}
                        })}
                        placeholder="Full name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="emergencyRelationship">Relationship</Label>
                      <Input
                        id="emergencyRelationship"
                        value={newEmployee.emergencyContact.relationship}
                        onChange={(e) => setNewEmployee({
                          ...newEmployee,
                          emergencyContact: {...newEmployee.emergencyContact, relationship: e.target.value}
                        })}
                        placeholder="e.g. Spouse, Parent"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="emergencyPhone">Phone Number</Label>
                      <Input
                        id="emergencyPhone"
                        value={newEmployee.emergencyContact.phone}
                        onChange={(e) => setNewEmployee({
                          ...newEmployee,
                          emergencyContact: {...newEmployee.emergencyContact, phone: e.target.value}
                        })}
                        placeholder="+234-XXX-XXX-XXXX"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="emergencyEmail">Email Address</Label>
                      <Input
                        id="emergencyEmail"
                        type="email"
                        value={newEmployee.emergencyContact.email}
                        onChange={(e) => setNewEmployee({
                          ...newEmployee,
                          emergencyContact: {...newEmployee.emergencyContact, email: e.target.value}
                        })}
                        placeholder="contact@email.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEmployeeDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={addEmployee}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                <div className="text-2xl font-bold">{employees.length}</div>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Onboarding</p>
                <div className="text-2xl font-bold text-blue-600">{onboardingStats.total}</div>
              </div>
              <UserPlus className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <div className="text-2xl font-bold text-green-600">
                  {employees.filter(e => e.status === "active").length}
                </div>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Offboarding</p>
                <div className="text-2xl font-bold text-yellow-600">{offboardingStats.total}</div>
              </div>
              <UserMinus className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="employees" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="offboarding">Offboarding</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="onboarding">Onboarding</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="offboarding">Offboarding</SelectItem>
                    <SelectItem value="terminated">Terminated</SelectItem>
                    <SelectItem value="resigned">Resigned</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Employee Table */}
          <Card>
            <CardHeader>
              <CardTitle>Employee Directory</CardTitle>
              <CardDescription>
                Comprehensive employee management with onboarding and offboarding tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Manager</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={employee.profileImage} />
                            <AvatarFallback>
                              {employee.firstName[0]}{employee.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{employee.firstName} {employee.lastName}</div>
                            <div className="text-sm text-muted-foreground">{employee.employeeId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.manager}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(employee.status)}>
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {employee.status === "onboarding" && (
                            <>
                              <div className="text-sm">Onboarding: {employee.onboardingProgress}%</div>
                              <Progress value={employee.onboardingProgress} className="w-20" />
                            </>
                          )}
                          {employee.status === "offboarding" && (
                            <>
                              <div className="text-sm">Offboarding: {employee.offboardingProgress}%</div>
                              <Progress value={employee.offboardingProgress} className="w-20" />
                            </>
                          )}
                          {employee.status === "active" && (
                            <div className="text-sm text-green-600">Complete</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedEmployee(employee)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          {employee.status === "onboarding" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => completeOnboarding(employee.id)}
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                          )}
                          {employee.status === "active" && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => startOffboarding(employee.id)}
                            >
                              <UserMinus className="h-3 w-3" />
                            </Button>
                          )}
                          {employee.status === "offboarding" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => completeOffboarding(employee.id)}
                            >
                              <Archive className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Tasks</p>
                    <div className="text-2xl font-bold text-orange-600">{onboardingStats.pending}</div>
                  </div>
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                    <div className="text-2xl font-bold text-blue-600">{onboardingStats.inProgress}</div>
                  </div>
                  <Activity className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <div className="text-2xl font-bold text-green-600">{onboardingStats.completed}</div>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                    <div className="text-2xl font-bold text-red-600">{onboardingStats.overdue}</div>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Onboarding Tasks</CardTitle>
              <CardDescription>
                Track and manage onboarding tasks for new employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {onboardingTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{task.title}</div>
                          <div className="text-sm text-muted-foreground">{task.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {task.category.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{task.assignedTo}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getTaskStatusColor(task.status)}>
                          {task.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{task.estimatedHours}h est.</span>
                          {task.actualHours && (
                            <span className="text-sm text-muted-foreground">
                              ({task.actualHours}h actual)
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          {task.status !== "completed" && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setOnboardingTasks(prev => prev.map(t => 
                                  t.id === task.id 
                                    ? { ...t, status: "completed", completedDate: new Date().toISOString() }
                                    : t
                                ));
                                toast({
                                  title: "Task Completed",
                                  description: `${task.title} has been marked as completed.`,
                                });
                              }}
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offboarding" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Tasks</p>
                    <div className="text-2xl font-bold text-orange-600">{offboardingStats.pending}</div>
                  </div>
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                    <div className="text-2xl font-bold text-blue-600">{offboardingStats.inProgress}</div>
                  </div>
                  <Activity className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <div className="text-2xl font-bold text-green-600">{offboardingStats.completed}</div>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                    <div className="text-2xl font-bold text-red-600">{offboardingStats.overdue}</div>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Offboarding Tasks</CardTitle>
              <CardDescription>
                Manage offboarding tasks for departing employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {offboardingTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{task.title}</div>
                          <div className="text-sm text-muted-foreground">{task.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {task.category.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{task.assignedTo}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getTaskStatusColor(task.status)}>
                          {task.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{task.estimatedHours}h est.</span>
                          {task.actualHours && (
                            <span className="text-sm text-muted-foreground">
                              ({task.actualHours}h actual)
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          {task.status !== "completed" && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setOffboardingTasks(prev => prev.map(t => 
                                  t.id === task.id 
                                    ? { ...t, status: "completed", completedDate: new Date().toISOString() }
                                    : t
                                ));
                                toast({
                                  title: "Task Completed",
                                  description: `${task.title} has been marked as completed.`,
                                });
                              }}
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Training Modules</CardTitle>
              <CardDescription>
                Manage employee training and development programs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trainingModules.map((module) => (
                  <Card key={module.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{module.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="capitalize">
                              {module.category.replace('_', ' ')}
                            </Badge>
                            {module.mandatory && (
                              <Badge className="bg-red-100 text-red-800">Mandatory</Badge>
                            )}
                            {module.certificateRequired && (
                              <Badge variant="outline">
                                <GraduationCap className="h-3 w-3 mr-1" />
                                Certificate
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Badge className={getTaskStatusColor(module.status)}>
                          {module.status.replace('_', ' ')}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Duration:</span>
                          <span>{module.duration} hours</span>
                        </div>
                        {module.instructor && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Instructor:</span>
                            <span>{module.instructor}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress:</span>
                          <span>{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} />
                        
                        {module.completionDate && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Completed:</span>
                            <span>{new Date(module.completionDate).toLocaleDateString()}</span>
                          </div>
                        )}

                        {module.prerequisites.length > 0 && (
                          <div>
                            <span className="text-sm text-muted-foreground">Prerequisites:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {module.prerequisites.map((prereq, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {prereq}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 pt-3">
                          <Button size="sm" variant="outline" className="flex-1">
                            <BookOpen className="h-3 w-3 mr-1" />
                            View Materials
                          </Button>
                          {module.status !== "completed" && (
                            <Button size="sm" className="flex-1">
                              <Star className="h-3 w-3 mr-1" />
                              Start Training
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Equipment Management</h2>
              <p className="text-muted-foreground">Track and manage company equipment and assets</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Equipment
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Equipment</p>
                    <div className="text-2xl font-bold">{equipment.length}</div>
                  </div>
                  <Package className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Available</p>
                    <div className="text-2xl font-bold text-green-600">
                      {equipment.filter(e => e.status === "available").length}
                    </div>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Assigned</p>
                    <div className="text-2xl font-bold text-blue-600">
                      {equipment.filter(e => e.status === "assigned").length}
                    </div>
                  </div>
                  <UserCheck className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(equipment.reduce((sum, item) => sum + item.value, 0))}
                    </div>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Serial Number</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {equipment.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.brand} {item.model}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {item.type === "laptop" && <Laptop className="h-4 w-4" />}
                          {item.type === "desktop" && <Monitor className="h-4 w-4" />}
                          {item.type === "phone" && <Smartphone className="h-4 w-4" />}
                          {item.type === "monitor" && <Monitor className="h-4 w-4" />}
                          {item.type === "accessories" && <Headphones className="h-4 w-4" />}
                          <span className="capitalize">{item.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {item.serialNumber}
                        </code>
                      </TableCell>
                      <TableCell>{formatCurrency(item.value)}</TableCell>
                      <TableCell>
                        <Badge className={getEquipmentStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.assignedTo ? (
                          <div>
                            <div className="font-medium">{item.assignedTo}</div>
                            {item.assignedDate && (
                              <div className="text-sm text-muted-foreground">
                                Since {new Date(item.assignedDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {item.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          {item.status === "assigned" ? (
                            <Button size="sm" variant="outline">
                              <Truck className="h-3 w-3" />
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline">
                              <UserCheck className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Onboarding Metrics</CardTitle>
                <CardDescription>Performance metrics for employee onboarding</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Onboarding Time</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">12 days</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Task Completion Rate</span>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">94%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Employee Satisfaction</span>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">4.7/5</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Time to Productivity</span>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">18 days</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Offboarding Metrics</CardTitle>
                <CardDescription>Performance metrics for employee offboarding</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Offboarding Time</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium">8 days</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Knowledge Transfer Rate</span>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">89%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Equipment Recovery Rate</span>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">98%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Exit Interview Completion</span>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">76%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Department Overview</CardTitle>
              <CardDescription>Employee distribution and status by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departments.map((dept) => {
                  const deptEmployees = employees.filter(e => e.department === dept);
                  const onboarding = deptEmployees.filter(e => e.status === "onboarding").length;
                  const active = deptEmployees.filter(e => e.status === "active").length;
                  const offboarding = deptEmployees.filter(e => e.status === "offboarding").length;
                  
                  return (
                    <div key={dept} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold">{dept}</h3>
                        <span className="text-sm text-muted-foreground">
                          {deptEmployees.length} employees
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-blue-600 font-medium">{onboarding}</div>
                          <div className="text-muted-foreground">Onboarding</div>
                        </div>
                        <div className="text-center">
                          <div className="text-green-600 font-medium">{active}</div>
                          <div className="text-muted-foreground">Active</div>
                        </div>
                        <div className="text-center">
                          <div className="text-yellow-600 font-medium">{offboarding}</div>
                          <div className="text-muted-foreground">Offboarding</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HumanResources;
