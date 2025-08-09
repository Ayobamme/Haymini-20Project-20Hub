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
  attendanceData: {
    totalDaysWorked: number;
    presentDays: number;
    lateDays: number;
    absentDays: number;
    leavesTaken: number;
    attendanceRate: number;
    currentStatus: "present" | "absent" | "on_leave" | "late";
    lastClockIn?: string;
    lastClockOut?: string;
  };
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
      attendanceData: {
        totalDaysWorked: 15,
        presentDays: 13,
        lateDays: 2,
        absentDays: 0,
        leavesTaken: 0,
        attendanceRate: 86.7,
        currentStatus: "present",
        lastClockIn: "09:15 AM",
        lastClockOut: "06:30 PM",
      },
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
      attendanceData: {
        totalDaysWorked: 180,
        presentDays: 175,
        lateDays: 3,
        absentDays: 2,
        leavesTaken: 5,
        attendanceRate: 97.2,
        currentStatus: "present",
        lastClockIn: "08:45 AM",
        lastClockOut: "05:45 PM",
      },
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
      attendanceData: {
        totalDaysWorked: 240,
        presentDays: 225,
        lateDays: 8,
        absentDays: 7,
        leavesTaken: 10,
        attendanceRate: 93.8,
        currentStatus: "on_leave",
        lastClockIn: "08:30 AM",
        lastClockOut: "05:30 PM",
      },
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
      case "onboarding": return "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0";
      case "active": return "bg-gradient-to-r from-green-500 to-green-600 text-white border-0";
      case "offboarding": return "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0";
      case "terminated": return "bg-gradient-to-r from-red-500 to-red-600 text-white border-0";
      case "resigned": return "bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0";
      default: return "bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0";
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-gradient-to-r from-orange-400 to-orange-500 text-white border-0";
      case "in_progress": return "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0";
      case "completed": return "bg-gradient-to-r from-green-500 to-green-600 text-white border-0";
      case "overdue": return "bg-gradient-to-r from-red-500 to-red-600 text-white border-0";
      default: return "bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low": return "bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0";
      case "medium": return "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white border-0";
      case "high": return "bg-gradient-to-r from-orange-500 to-red-500 text-white border-0";
      case "critical": return "bg-gradient-to-r from-red-600 to-red-700 text-white border-0";
      default: return "bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0";
    }
  };

  const getEquipmentStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-gradient-to-r from-green-500 to-green-600 text-white border-0";
      case "assigned": return "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0";
      case "maintenance": return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0";
      case "damaged": return "bg-gradient-to-r from-red-500 to-red-600 text-white border-0";
      case "retired": return "bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0";
      default: return "bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "safety": return "bg-gradient-to-r from-red-400 to-red-500 text-white";
      case "compliance": return "bg-gradient-to-r from-blue-400 to-blue-500 text-white";
      case "technical": return "bg-gradient-to-r from-purple-400 to-purple-500 text-white";
      case "soft_skills": return "bg-gradient-to-r from-green-400 to-green-500 text-white";
      case "company_culture": return "bg-gradient-to-r from-indigo-400 to-indigo-500 text-white";
      case "documentation": return "bg-gradient-to-r from-cyan-400 to-cyan-500 text-white";
      case "equipment": return "bg-gradient-to-r from-orange-400 to-orange-500 text-white";
      case "training": return "bg-gradient-to-r from-teal-400 to-teal-500 text-white";
      case "orientation": return "bg-gradient-to-r from-pink-400 to-pink-500 text-white";
      case "system_access": return "bg-gradient-to-r from-violet-400 to-violet-500 text-white";
      case "equipment_return": return "bg-gradient-to-r from-amber-400 to-amber-500 text-white";
      case "access_revocation": return "bg-gradient-to-r from-red-400 to-red-500 text-white";
      case "knowledge_transfer": return "bg-gradient-to-r from-emerald-400 to-emerald-500 text-white";
      case "exit_interview": return "bg-gradient-to-r from-slate-400 to-slate-500 text-white";
      default: return "bg-gradient-to-r from-gray-400 to-gray-500 text-white";
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Human Resources
            </h1>
            <p className="text-lg text-slate-600">
              Comprehensive employee onboarding and offboarding management
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={showEmployeeDialog} onOpenChange={setShowEmployeeDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl border-0 shadow-2xl bg-gradient-to-br from-white to-slate-50">
                <DialogHeader>
                  <DialogTitle className="text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Add New Employee
                  </DialogTitle>
                  <DialogDescription className="text-slate-600">
                    Start the onboarding process for a new employee
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName" className="text-slate-700 font-medium">First Name *</Label>
                      <Input
                        id="firstName"
                        value={newEmployee.firstName}
                        onChange={(e) => setNewEmployee({...newEmployee, firstName: e.target.value})}
                        placeholder="Enter first name"
                        className="border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName" className="text-slate-700 font-medium">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={newEmployee.lastName}
                        onChange={(e) => setNewEmployee({...newEmployee, lastName: e.target.value})}
                        placeholder="Enter last name"
                        className="border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="text-slate-700 font-medium">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                        placeholder="employee@company.com"
                        className="border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone" className="text-slate-700 font-medium">Phone Number</Label>
                      <Input
                        id="phone"
                        value={newEmployee.phone}
                        onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                        placeholder="+234-XXX-XXX-XXXX"
                        className="border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label className="text-slate-700 font-medium">Department *</Label>
                      <Select 
                        value={newEmployee.department} 
                        onValueChange={(value) => setNewEmployee({...newEmployee, department: value})}
                      >
                        <SelectTrigger className="border-2 border-slate-200 focus:border-blue-400">
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
                      <Label htmlFor="position" className="text-slate-700 font-medium">Position</Label>
                      <Input
                        id="position"
                        value={newEmployee.position}
                        onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                        placeholder="Job title"
                        className="border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="startDate" className="text-slate-700 font-medium">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newEmployee.startDate}
                        onChange={(e) => setNewEmployee({...newEmployee, startDate: e.target.value})}
                        className="border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-slate-700 font-medium">Manager</Label>
                      <Select 
                        value={newEmployee.manager} 
                        onValueChange={(value) => setNewEmployee({...newEmployee, manager: value})}
                      >
                        <SelectTrigger className="border-2 border-slate-200 focus:border-blue-400">
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
                    <Label className="text-slate-700 font-medium">Location</Label>
                    <Select 
                      value={newEmployee.location} 
                      onValueChange={(value) => setNewEmployee({...newEmployee, location: value})}
                    >
                      <SelectTrigger className="border-2 border-slate-200 focus:border-blue-400">
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
                    <Label className="text-slate-700 font-medium">Emergency Contact</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="emergencyName" className="text-slate-700 font-medium">Contact Name</Label>
                        <Input
                          id="emergencyName"
                          value={newEmployee.emergencyContact.name}
                          onChange={(e) => setNewEmployee({
                            ...newEmployee,
                            emergencyContact: {...newEmployee.emergencyContact, name: e.target.value}
                          })}
                          placeholder="Full name"
                          className="border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="emergencyRelationship" className="text-slate-700 font-medium">Relationship</Label>
                        <Input
                          id="emergencyRelationship"
                          value={newEmployee.emergencyContact.relationship}
                          onChange={(e) => setNewEmployee({
                            ...newEmployee,
                            emergencyContact: {...newEmployee.emergencyContact, relationship: e.target.value}
                          })}
                          placeholder="e.g. Spouse, Parent"
                          className="border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="emergencyPhone" className="text-slate-700 font-medium">Phone Number</Label>
                        <Input
                          id="emergencyPhone"
                          value={newEmployee.emergencyContact.phone}
                          onChange={(e) => setNewEmployee({
                            ...newEmployee,
                            emergencyContact: {...newEmployee.emergencyContact, phone: e.target.value}
                          })}
                          placeholder="+234-XXX-XXX-XXXX"
                          className="border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="emergencyEmail" className="text-slate-700 font-medium">Email Address</Label>
                        <Input
                          id="emergencyEmail"
                          type="email"
                          value={newEmployee.emergencyContact.email}
                          onChange={(e) => setNewEmployee({
                            ...newEmployee,
                            emergencyContact: {...newEmployee.emergencyContact, email: e.target.value}
                          })}
                          placeholder="contact@email.com"
                          className="border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowEmployeeDialog(false)} className="border-2 border-slate-300 hover:bg-slate-100">
                    Cancel
                  </Button>
                  <Button onClick={addEmployee} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Employee
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards with Vibrant Colors */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Employees</p>
                  <div className="text-3xl font-bold">{employees.length}</div>
                </div>
                <Users className="h-10 w-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Onboarding</p>
                  <div className="text-3xl font-bold">{onboardingStats.total}</div>
                </div>
                <UserPlus className="h-10 w-10 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Active</p>
                  <div className="text-3xl font-bold">
                    {employees.filter(e => e.status === "active").length}
                  </div>
                </div>
                <UserCheck className="h-10 w-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-500 to-orange-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-medium">Offboarding</p>
                  <div className="text-3xl font-bold">{offboardingStats.total}</div>
                </div>
                <UserMinus className="h-10 w-10 text-amber-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="employees" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl p-1 h-12">
            <TabsTrigger value="employees" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300">Employees</TabsTrigger>
            <TabsTrigger value="onboarding" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white rounded-lg transition-all duration-300">Onboarding</TabsTrigger>
            <TabsTrigger value="offboarding" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white rounded-lg transition-all duration-300">Offboarding</TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-600 data-[state=active]:text-white rounded-lg transition-all duration-300">Training</TabsTrigger>
            <TabsTrigger value="equipment" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg transition-all duration-300">Equipment</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="employees" className="space-y-6 mt-6">
            {/* Filters */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-slate-50">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full lg:w-[180px] border-2 border-slate-200 focus:border-blue-400">
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
                    <SelectTrigger className="w-full lg:w-[180px] border-2 border-slate-200 focus:border-blue-400">
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
                  Comprehensive employee management with attendance tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Manager</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.map((employee) => (
                      <TableRow key={employee.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                              <AvatarImage src={employee.profileImage} />
                              <AvatarFallback className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white font-semibold">
                                {employee.firstName[0]}{employee.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold text-slate-800">{employee.firstName} {employee.lastName}</div>
                              <div className="text-sm text-slate-500">{employee.employeeId}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-slate-700">{employee.department}</TableCell>
                        <TableCell className="text-slate-600">{employee.position}</TableCell>
                        <TableCell className="text-slate-600">{employee.manager}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(employee.status)}>
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {employee.status === "onboarding" && (
                              <>
                                <div className="text-sm font-medium text-blue-600">Onboarding: {employee.onboardingProgress}%</div>
                                <Progress value={employee.onboardingProgress} className="w-24 h-2" />
                              </>
                            )}
                            {employee.status === "offboarding" && (
                              <>
                                <div className="text-sm font-medium text-orange-600">Offboarding: {employee.offboardingProgress}%</div>
                                <Progress value={employee.offboardingProgress} className="w-24 h-2" />
                              </>
                            )}
                            {employee.status === "active" && (
                              <div className="text-sm font-medium text-green-600">Complete</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedEmployee(employee)}
                              className="border-2 border-blue-200 hover:bg-blue-50"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            {employee.status === "onboarding" && (
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0"
                                onClick={() => completeOnboarding(employee.id)}
                              >
                                <CheckCircle className="h-3 w-3" />
                              </Button>
                            )}
                            {employee.status === "active" && (
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0"
                                onClick={() => startOffboarding(employee.id)}
                              >
                                <UserMinus className="h-3 w-3" />
                              </Button>
                            )}
                            {employee.status === "offboarding" && (
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0"
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

          <TabsContent value="onboarding" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">Pending Tasks</p>
                      <div className="text-3xl font-bold">{onboardingStats.pending}</div>
                    </div>
                    <Clock className="h-10 w-10 text-orange-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">In Progress</p>
                      <div className="text-3xl font-bold">{onboardingStats.inProgress}</div>
                    </div>
                    <Activity className="h-10 w-10 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Completed</p>
                      <div className="text-3xl font-bold">{onboardingStats.completed}</div>
                    </div>
                    <CheckCircle className="h-10 w-10 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-red-500 to-pink-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-100 text-sm font-medium">Overdue</p>
                      <div className="text-3xl font-bold">{onboardingStats.overdue}</div>
                    </div>
                    <AlertTriangle className="h-10 w-10 text-red-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
                <CardTitle className="text-xl">Onboarding Tasks</CardTitle>
                <CardDescription className="text-emerald-100">
                  Track and manage onboarding tasks for new employees
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100">
                      <TableHead className="font-semibold text-slate-700">Task</TableHead>
                      <TableHead className="font-semibold text-slate-700">Category</TableHead>
                      <TableHead className="font-semibold text-slate-700">Assigned To</TableHead>
                      <TableHead className="font-semibold text-slate-700">Priority</TableHead>
                      <TableHead className="font-semibold text-slate-700">Due Date</TableHead>
                      <TableHead className="font-semibold text-slate-700">Status</TableHead>
                      <TableHead className="font-semibold text-slate-700">Progress</TableHead>
                      <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {onboardingTasks.map((task) => (
                      <TableRow key={task.id} className="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-200">
                        <TableCell>
                          <div>
                            <div className="font-semibold text-slate-800">{task.title}</div>
                            <div className="text-sm text-slate-500">{task.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getCategoryColor(task.category)}>
                            {task.category.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-slate-700">{task.assignedTo}</TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600">{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge className={getTaskStatusColor(task.status)}>
                            {task.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-600">{task.estimatedHours}h est.</span>
                            {task.actualHours && (
                              <span className="text-sm text-slate-400">
                                ({task.actualHours}h actual)
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="border-2 border-blue-200 hover:bg-blue-50">
                              <Edit className="h-3 w-3" />
                            </Button>
                            {task.status !== "completed" && (
                              <Button 
                                size="sm" 
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0"
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

          <TabsContent value="offboarding" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">Pending Tasks</p>
                      <div className="text-3xl font-bold">{offboardingStats.pending}</div>
                    </div>
                    <Clock className="h-10 w-10 text-orange-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">In Progress</p>
                      <div className="text-3xl font-bold">{offboardingStats.inProgress}</div>
                    </div>
                    <Activity className="h-10 w-10 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Completed</p>
                      <div className="text-3xl font-bold">{offboardingStats.completed}</div>
                    </div>
                    <CheckCircle className="h-10 w-10 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-red-500 to-pink-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-100 text-sm font-medium">Overdue</p>
                      <div className="text-3xl font-bold">{offboardingStats.overdue}</div>
                    </div>
                    <AlertTriangle className="h-10 w-10 text-red-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
              <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
                <CardTitle className="text-xl">Offboarding Tasks</CardTitle>
                <CardDescription className="text-amber-100">
                  Manage offboarding tasks for departing employees
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100">
                      <TableHead className="font-semibold text-slate-700">Task</TableHead>
                      <TableHead className="font-semibold text-slate-700">Category</TableHead>
                      <TableHead className="font-semibold text-slate-700">Assigned To</TableHead>
                      <TableHead className="font-semibold text-slate-700">Priority</TableHead>
                      <TableHead className="font-semibold text-slate-700">Due Date</TableHead>
                      <TableHead className="font-semibold text-slate-700">Status</TableHead>
                      <TableHead className="font-semibold text-slate-700">Progress</TableHead>
                      <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {offboardingTasks.map((task) => (
                      <TableRow key={task.id} className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-200">
                        <TableCell>
                          <div>
                            <div className="font-semibold text-slate-800">{task.title}</div>
                            <div className="text-sm text-slate-500">{task.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getCategoryColor(task.category)}>
                            {task.category.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-slate-700">{task.assignedTo}</TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600">{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge className={getTaskStatusColor(task.status)}>
                            {task.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-600">{task.estimatedHours}h est.</span>
                            {task.actualHours && (
                              <span className="text-sm text-slate-400">
                                ({task.actualHours}h actual)
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="border-2 border-blue-200 hover:bg-blue-50">
                              <Edit className="h-3 w-3" />
                            </Button>
                            {task.status !== "completed" && (
                              <Button 
                                size="sm" 
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0"
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

          <TabsContent value="training" className="space-y-6 mt-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
              <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-t-lg">
                <CardTitle className="text-xl">Training Modules</CardTitle>
                <CardDescription className="text-pink-100">
                  Manage employee training and development programs
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {trainingModules.map((module) => (
                    <Card key={module.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{module.title}</h3>
                            <p className="text-sm text-slate-600 mb-3">{module.description}</p>
                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                              <Badge className={getCategoryColor(module.category)}>
                                {module.category.replace('_', ' ')}
                              </Badge>
                              {module.mandatory && (
                                <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">Mandatory</Badge>
                              )}
                              {module.certificateRequired && (
                                <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-0">
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
                            <span className="text-slate-600 font-medium">Duration:</span>
                            <span className="font-medium text-slate-800">{module.duration} hours</span>
                          </div>
                          {module.instructor && (
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-600 font-medium">Instructor:</span>
                              <span className="font-medium text-slate-800">{module.instructor}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600 font-medium">Progress:</span>
                            <span className="font-medium text-slate-800">{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-3" />
                          
                          {module.completionDate && (
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-600 font-medium">Completed:</span>
                              <span className="font-medium text-green-600">{new Date(module.completionDate).toLocaleDateString()}</span>
                            </div>
                          )}

                          {module.prerequisites.length > 0 && (
                            <div>
                              <span className="text-sm text-slate-600 font-medium">Prerequisites:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {module.prerequisites.map((prereq, index) => (
                                  <Badge key={index} variant="outline" className="text-xs border-2 border-slate-300 text-slate-600">
                                    {prereq}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex gap-2 pt-3">
                            <Button size="sm" variant="outline" className="flex-1 border-2 border-blue-200 hover:bg-blue-50">
                              <BookOpen className="h-3 w-3 mr-1" />
                              View Materials
                            </Button>
                            {module.status !== "completed" && (
                              <Button size="sm" className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0">
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

          <TabsContent value="equipment" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Equipment Management
                </h2>
                <p className="text-slate-600 text-lg">Track and manage company equipment and assets</p>
              </div>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Add Equipment
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cyan-100 text-sm font-medium">Total Equipment</p>
                      <div className="text-3xl font-bold">{equipment.length}</div>
                    </div>
                    <Package className="h-10 w-10 text-cyan-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Available</p>
                      <div className="text-3xl font-bold">
                        {equipment.filter(e => e.status === "available").length}
                      </div>
                    </div>
                    <CheckCircle className="h-10 w-10 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Assigned</p>
                      <div className="text-3xl font-bold">
                        {equipment.filter(e => e.status === "assigned").length}
                      </div>
                    </div>
                    <UserCheck className="h-10 w-10 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-emerald-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100 text-sm font-medium">Total Value</p>
                      <div className="text-2xl font-bold">
                        {formatCurrency(equipment.reduce((sum, item) => sum + item.value, 0))}
                      </div>
                    </div>
                    <DollarSign className="h-10 w-10 text-emerald-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
              <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-xl">Equipment Inventory</CardTitle>
                <CardDescription className="text-cyan-100">
                  Comprehensive equipment tracking and assignment
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100">
                      <TableHead className="font-semibold text-slate-700">Equipment</TableHead>
                      <TableHead className="font-semibold text-slate-700">Type</TableHead>
                      <TableHead className="font-semibold text-slate-700">Serial Number</TableHead>
                      <TableHead className="font-semibold text-slate-700">Value</TableHead>
                      <TableHead className="font-semibold text-slate-700">Status</TableHead>
                      <TableHead className="font-semibold text-slate-700">Assigned To</TableHead>
                      <TableHead className="font-semibold text-slate-700">Location</TableHead>
                      <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {equipment.map((item) => (
                      <TableRow key={item.id} className="hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-200">
                        <TableCell>
                          <div>
                            <div className="font-semibold text-slate-800">{item.name}</div>
                            <div className="text-sm text-slate-500">{item.brand} {item.model}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {item.type === "laptop" && <Laptop className="h-4 w-4 text-blue-500" />}
                            {item.type === "desktop" && <Monitor className="h-4 w-4 text-green-500" />}
                            {item.type === "phone" && <Smartphone className="h-4 w-4 text-purple-500" />}
                            {item.type === "monitor" && <Monitor className="h-4 w-4 text-cyan-500" />}
                            {item.type === "accessories" && <Headphones className="h-4 w-4 text-orange-500" />}
                            <span className="capitalize font-medium text-slate-700">{item.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="text-sm bg-gradient-to-r from-slate-100 to-slate-200 px-3 py-1 rounded-md font-mono">
                            {item.serialNumber}
                          </code>
                        </TableCell>
                        <TableCell className="font-semibold text-emerald-600">{formatCurrency(item.value)}</TableCell>
                        <TableCell>
                          <Badge className={getEquipmentStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {item.assignedTo ? (
                            <div>
                              <div className="font-semibold text-slate-800">{item.assignedTo}</div>
                              {item.assignedDate && (
                                <div className="text-sm text-slate-500">
                                  Since {new Date(item.assignedDate).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400 italic">Unassigned</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-600">{item.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="border-2 border-blue-200 hover:bg-blue-50">
                              <Edit className="h-3 w-3" />
                            </Button>
                            {item.status === "assigned" ? (
                              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0">
                                <Truck className="h-3 w-3" />
                              </Button>
                            ) : (
                              <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0">
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

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
                <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="text-xl">Onboarding Metrics</CardTitle>
                  <CardDescription className="text-violet-100">Performance metrics for employee onboarding</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
                      <span className="text-sm font-medium text-slate-700">Average Onboarding Time</span>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-bold text-green-600">12 days</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                      <span className="text-sm font-medium text-slate-700">Task Completion Rate</span>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-bold text-blue-600">94%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-amber-50">
                      <span className="text-sm font-medium text-slate-700">Employee Satisfaction</span>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-bold text-yellow-600">4.7/5</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-purple-50 to-violet-50">
                      <span className="text-sm font-medium text-slate-700">Time to Productivity</span>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-bold text-purple-600">18 days</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                  <CardTitle className="text-xl">Offboarding Metrics</CardTitle>
                  <CardDescription className="text-orange-100">Performance metrics for employee offboarding</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50">
                      <span className="text-sm font-medium text-slate-700">Average Offboarding Time</span>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-bold text-orange-600">8 days</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
                      <span className="text-sm font-medium text-slate-700">Knowledge Transfer Rate</span>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-bold text-green-600">89%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50">
                      <span className="text-sm font-medium text-slate-700">Equipment Recovery Rate</span>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-bold text-blue-600">98%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                      <span className="text-sm font-medium text-slate-700">Exit Interview Completion</span>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-bold text-purple-600">76%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-xl">Department Overview</CardTitle>
                <CardDescription className="text-indigo-100">Employee distribution and status by department</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {departments.map((dept) => {
                    const deptEmployees = employees.filter(e => e.department === dept);
                    const onboarding = deptEmployees.filter(e => e.status === "onboarding").length;
                    const active = deptEmployees.filter(e => e.status === "active").length;
                    const offboarding = deptEmployees.filter(e => e.status === "offboarding").length;
                    
                    return (
                      <div key={dept} className="border-2 border-slate-200 rounded-xl p-4 bg-gradient-to-r from-slate-50 to-white hover:shadow-md transition-all duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-bold text-lg text-slate-800">{dept}</h3>
                          <span className="text-sm text-slate-500 font-medium">
                            {deptEmployees.length} employees
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center p-3 rounded-lg bg-gradient-to-r from-blue-100 to-blue-200">
                            <div className="text-blue-700 font-bold text-lg">{onboarding}</div>
                            <div className="text-blue-600 font-medium">Onboarding</div>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-gradient-to-r from-green-100 to-green-200">
                            <div className="text-green-700 font-bold text-lg">{active}</div>
                            <div className="text-green-600 font-medium">Active</div>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-gradient-to-r from-yellow-100 to-orange-200">
                            <div className="text-orange-700 font-bold text-lg">{offboarding}</div>
                            <div className="text-orange-600 font-medium">Offboarding</div>
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
    </div>
  );
};

export default HumanResources;
