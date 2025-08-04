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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Building,
  Users,
  DollarSign,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  Filter,
  Download,
  BarChart3,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  salary: number;
  startDate: string;
  status: "active" | "inactive";
}

interface Team {
  id: string;
  name: string;
  description: string;
  leadId: string;
  memberIds: string[];
  projectIds: string[];
}

interface BudgetEntry {
  id: string;
  description: string;
  amount: number;
  type: "allocation" | "deduction" | "project_allocation";
  category: string;
  date: string;
  projectId?: string;
  approvedBy: string;
}

interface Department {
  id: string;
  name: string;
  description: string;
  headId: string;
  employees: Employee[];
  teams: Team[];
  budget: {
    daily: number;
    weekly: number;
    monthly: number;
    quarterly: number;
    yearly: number;
    allocated: number;
    spent: number;
    remaining: number;
    entries: BudgetEntry[];
  };
  location: string;
  establishedDate: string;
  status: "active" | "inactive";
  kpis: {
    productivity: number;
    satisfaction: number;
    retention: number;
  };
}

const Departments = () => {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "DEPT-001",
      name: "Engineering",
      description: "Software development and technical innovation",
      headId: "EMP-001",
      employees: [
        {
          id: "EMP-001",
          name: "John Doe",
          email: "john.doe@company.com",
          position: "Senior Developer",
          salary: 12000000,
          startDate: "2024-01-15",
          status: "active",
        },
        {
          id: "EMP-002",
          name: "Jane Smith",
          email: "jane.smith@company.com",
          position: "Frontend Developer",
          salary: 9600000,
          startDate: "2024-02-01",
          status: "active",
        },
      ],
      teams: [
        {
          id: "TEAM-001",
          name: "Frontend Team",
          description: "React and UI development",
          leadId: "EMP-002",
          memberIds: ["EMP-001", "EMP-002"],
          projectIds: ["PRJ-001"],
        },
      ],
      budget: {
        daily: 100000,
        weekly: 700000,
        monthly: 3000000,
        quarterly: 9000000,
        yearly: 36000000,
        allocated: 36000000,
        spent: 12500000,
        remaining: 23500000,
        entries: [
          {
            id: "BDG-001",
            description: "Initial yearly allocation",
            amount: 36000000,
            type: "allocation",
            category: "Budget Allocation",
            date: "2024-01-01",
            approvedBy: "Admin User",
          },
          {
            id: "BDG-002",
            description: "Project Alpha development",
            amount: -5000000,
            type: "project_allocation",
            category: "Project Funding",
            date: "2024-01-15",
            projectId: "PRJ-001",
            approvedBy: "Admin User",
          },
        ],
      },
      location: "Lagos Office",
      establishedDate: "2023-01-01",
      status: "active",
      kpis: {
        productivity: 88,
        satisfaction: 92,
        retention: 95,
      },
    },
    {
      id: "DEPT-002",
      name: "Design",
      description: "User experience and visual design",
      headId: "EMP-003",
      employees: [
        {
          id: "EMP-003",
          name: "Sarah Wilson",
          email: "sarah.wilson@company.com",
          position: "Lead Designer",
          salary: 10800000,
          startDate: "2024-01-20",
          status: "active",
        },
      ],
      teams: [
        {
          id: "TEAM-002",
          name: "UX Team",
          description: "User experience research and design",
          leadId: "EMP-003",
          memberIds: ["EMP-003"],
          projectIds: ["PRJ-002"],
        },
      ],
      budget: {
        daily: 75000,
        weekly: 525000,
        monthly: 2250000,
        quarterly: 6750000,
        yearly: 27000000,
        allocated: 27000000,
        spent: 8200000,
        remaining: 18800000,
        entries: [
          {
            id: "BDG-003",
            description: "Initial yearly allocation",
            amount: 27000000,
            type: "allocation",
            category: "Budget Allocation",
            date: "2024-01-01",
            approvedBy: "Admin User",
          },
        ],
      },
      location: "Lagos Office",
      establishedDate: "2023-02-01",
      status: "active",
      kpis: {
        productivity: 85,
        satisfaction: 89,
        retention: 88,
      },
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDepartmentDialog, setShowDepartmentDialog] = useState(false);
  const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);
  const [showBudgetDialog, setShowBudgetDialog] = useState(false);
  const [showTeamDialog, setShowTeamDialog] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null,
  );
  const [isEditMode, setIsEditMode] = useState(false);

  const [newDepartment, setNewDepartment] = useState<Partial<Department>>({
    name: "",
    description: "",
    headId: "",
    location: "",
    establishedDate: "",
    status: "active",
  });

  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
    name: "",
    email: "",
    position: "",
    salary: 0,
    startDate: "",
    status: "active",
  });

  const [newBudgetEntry, setNewBudgetEntry] = useState<Partial<BudgetEntry>>({
    description: "",
    amount: 0,
    type: "allocation",
    category: "",
    date: "",
  });

  const [newTeam, setNewTeam] = useState<Partial<Team>>({
    name: "",
    description: "",
    leadId: "",
    memberIds: [],
    projectIds: [],
  });

  const saveDepartment = () => {
    if (!newDepartment.name || !newDepartment.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const department: Department = {
      id: editingDepartment
        ? editingDepartment.id
        : `DEPT-${Date.now().toString().slice(-3)}`,
      ...newDepartment,
      employees: editingDepartment?.employees || [],
      teams: editingDepartment?.teams || [],
      budget: editingDepartment?.budget || {
        daily: 0,
        weekly: 0,
        monthly: 0,
        quarterly: 0,
        yearly: 0,
        allocated: 0,
        spent: 0,
        remaining: 0,
        entries: [],
      },
      kpis: editingDepartment?.kpis || {
        productivity: 0,
        satisfaction: 0,
        retention: 0,
      },
    } as Department;

    if (editingDepartment) {
      setDepartments(
        departments.map((dept) =>
          dept.id === editingDepartment.id ? department : dept,
        ),
      );
      toast({
        title: "Department Updated",
        description: `${department.name} has been updated successfully.`,
      });
    } else {
      setDepartments([...departments, department]);
      toast({
        title: "Department Created",
        description: `${department.name} has been created successfully.`,
      });
    }

    setShowDepartmentDialog(false);
    setEditingDepartment(null);
    setIsEditMode(false);
    setNewDepartment({
      name: "",
      description: "",
      headId: "",
      location: "",
      establishedDate: "",
      status: "active",
    });
  };

  const addEmployeeToDepartment = () => {
    if (!selectedDepartment || !newEmployee.name || !newEmployee.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const employee: Employee = {
      id: `EMP-${Date.now().toString().slice(-3)}`,
      ...newEmployee,
    } as Employee;

    const updatedDepartment = {
      ...selectedDepartment,
      employees: [...selectedDepartment.employees, employee],
    };

    setDepartments(
      departments.map((dept) =>
        dept.id === selectedDepartment.id ? updatedDepartment : dept,
      ),
    );
    setSelectedDepartment(updatedDepartment);

    toast({
      title: "Employee Added",
      description: `${employee.name} has been added to ${selectedDepartment.name}.`,
    });

    setShowEmployeeDialog(false);
    setNewEmployee({
      name: "",
      email: "",
      position: "",
      salary: 0,
      startDate: "",
      status: "active",
    });
  };

  const addBudgetEntry = () => {
    if (
      !selectedDepartment ||
      !newBudgetEntry.description ||
      !newBudgetEntry.amount
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const budgetEntry: BudgetEntry = {
      id: `BDG-${Date.now()}`,
      ...newBudgetEntry,
      date: newBudgetEntry.date || new Date().toISOString().split("T")[0],
      approvedBy: "Admin User",
    } as BudgetEntry;

    const updatedBudget = {
      ...selectedDepartment.budget,
      entries: [...selectedDepartment.budget.entries, budgetEntry],
    };

    // Update budget totals
    if (budgetEntry.type === "allocation") {
      updatedBudget.allocated += budgetEntry.amount;
      updatedBudget.remaining += budgetEntry.amount;
    } else {
      updatedBudget.spent += Math.abs(budgetEntry.amount);
      updatedBudget.remaining -= Math.abs(budgetEntry.amount);
    }

    const updatedDepartment = {
      ...selectedDepartment,
      budget: updatedBudget,
    };

    setDepartments(
      departments.map((dept) =>
        dept.id === selectedDepartment.id ? updatedDepartment : dept,
      ),
    );
    setSelectedDepartment(updatedDepartment);

    toast({
      title: "Budget Entry Added",
      description: `Budget entry has been added successfully.`,
    });

    setShowBudgetDialog(false);
    setNewBudgetEntry({
      description: "",
      amount: 0,
      type: "allocation",
      category: "",
      date: "",
    });
  };

  const deleteDepartment = (departmentId: string) => {
    const department = departments.find((dept) => dept.id === departmentId);
    if (!department) return;

    setDepartments(departments.filter((dept) => dept.id !== departmentId));

    toast({
      title: "Department Deleted",
      description: `${department.name} has been deleted successfully.`,
    });
  };

  const editDepartment = (department: Department) => {
    setEditingDepartment(department);
    setNewDepartment(department);
    setIsEditMode(true);
    setShowDepartmentDialog(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0";
      case "inactive":
        return "bg-gradient-to-r from-red-500 to-red-600 text-white border-0";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0";
    }
  };

  const getBudgetUtilization = (budget: Department["budget"]) => {
    return budget.allocated > 0 ? (budget.spent / budget.allocated) * 100 : 0;
  };

  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch =
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || dept.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Departments Management
            </h1>
            <p className="text-lg text-slate-600">
              Manage departments, teams, employees, and budgets
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog
              open={showDepartmentDialog}
              onOpenChange={setShowDepartmentDialog}
            >
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Department
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl border-0 shadow-2xl bg-gradient-to-br from-white to-slate-50">
                <DialogHeader>
                  <DialogTitle className="text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {isEditMode ? "Edit Department" : "Create New Department"}
                  </DialogTitle>
                  <DialogDescription className="text-slate-600">
                    Set up department details and organizational structure
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-slate-700 font-medium">Department Name *</Label>
                      <Input
                        id="name"
                        value={newDepartment.name}
                        onChange={(e) =>
                          setNewDepartment({
                            ...newDepartment,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter department name"
                        className="border-2 border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-slate-700 font-medium">Location</Label>
                      <Input
                        id="location"
                        value={newDepartment.location}
                        onChange={(e) =>
                          setNewDepartment({
                            ...newDepartment,
                            location: e.target.value,
                          })
                        }
                        placeholder="Office location"
                        className="border-2 border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="description" className="text-slate-700 font-medium">Description *</Label>
                      <Textarea
                        id="description"
                        value={newDepartment.description}
                        onChange={(e) =>
                          setNewDepartment({
                            ...newDepartment,
                            description: e.target.value,
                          })
                        }
                        placeholder="Department description and objectives..."
                        rows={3}
                        className="border-2 border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="establishedDate" className="text-slate-700 font-medium">Established Date</Label>
                      <Input
                        id="establishedDate"
                        type="date"
                        value={newDepartment.establishedDate}
                        onChange={(e) =>
                          setNewDepartment({
                            ...newDepartment,
                            establishedDate: e.target.value,
                          })
                        }
                        className="border-2 border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="status" className="text-slate-700 font-medium">Status</Label>
                      <Select
                        value={newDepartment.status}
                        onValueChange={(value) =>
                          setNewDepartment({
                            ...newDepartment,
                            status: value as any,
                          })
                        }
                      >
                        <SelectTrigger className="border-2 border-slate-200 focus:border-indigo-400">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowDepartmentDialog(false);
                      setEditingDepartment(null);
                      setIsEditMode(false);
                    }}
                    className="border-2 border-slate-300 hover:bg-slate-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={saveDepartment}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0"
                  >
                    {isEditMode ? "Update" : "Create"} Department
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-indigo-100">
                    Total Departments
                  </p>
                  <div className="text-3xl font-bold">{departments.length}</div>
                </div>
                <Building className="h-8 w-8 text-indigo-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-100">
                    Total Employees
                  </p>
                  <div className="text-3xl font-bold">
                    {departments.reduce(
                      (sum, dept) => sum + dept.employees.length,
                      0,
                    )}
                  </div>
                </div>
                <Users className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-500 to-violet-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-100">
                    Total Budget
                  </p>
                  <div className="text-3xl font-bold">
                    ₦
                    {(
                      departments.reduce(
                        (sum, dept) => sum + dept.budget.allocated,
                        0,
                      ) / 1000000
                    ).toFixed(1)}
                    M
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-100">
                    Avg Productivity
                  </p>
                  <div className="text-3xl font-bold">
                    {Math.round(
                      departments.reduce(
                        (sum, dept) => sum + dept.kpis.productivity,
                        0,
                      ) / departments.length,
                    )}
                    %
                  </div>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-slate-50">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search departments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-[180px] border-2 border-slate-200 focus:border-indigo-400">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Departments Grid */}
        <div className="grid gap-6">
          {filteredDepartments.map((department) => (
            <Card key={department.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl text-slate-800">{department.name}</CardTitle>
                      <Badge className={getStatusColor(department.status)}>
                        {department.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-base text-slate-600">
                      {department.description}
                    </CardDescription>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>📍 {department.location}</span>
                      <span>
                        📅 Est.{" "}
                        {new Date(department.establishedDate).getFullYear()}
                      </span>
                      <span>👥 {department.employees.length} employees</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedDepartment(department)}
                      className="border-2 border-indigo-300 hover:bg-indigo-50 text-indigo-700"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => editDepartment(department)}
                      className="border-2 border-purple-300 hover:bg-purple-50 text-purple-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteDepartment(department.id)}
                      className="border-2 border-red-300 hover:bg-red-50 text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Budget Overview */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-slate-800">Budget Overview</h4>
                      <div className="text-sm font-medium text-indigo-600">
                        ₦{(department.budget.remaining / 1000000).toFixed(1)}M
                        remaining
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>
                          Allocated: ₦
                          {(department.budget.allocated / 1000000).toFixed(1)}M
                        </span>
                        <span>
                          Spent: ₦{(department.budget.spent / 1000000).toFixed(1)}
                          M
                        </span>
                      </div>
                      <Progress
                        value={getBudgetUtilization(department.budget)}
                        className="h-3 bg-gradient-to-r from-indigo-200 to-purple-200"
                      />
                      <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground">
                        <div className="text-center p-2 rounded-lg bg-gradient-to-r from-blue-100 to-indigo-100">
                          <div className="font-semibold text-blue-700">Daily</div>
                          <div className="text-blue-600">₦{(department.budget.daily / 1000).toFixed(0)}K</div>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100">
                          <div className="font-semibold text-green-700">Weekly</div>
                          <div className="text-green-600">₦{(department.budget.weekly / 1000).toFixed(0)}K</div>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-gradient-to-r from-purple-100 to-violet-100">
                          <div className="font-semibold text-purple-700">Monthly</div>
                          <div className="text-purple-600">₦
                            {(department.budget.monthly / 1000000).toFixed(1)}M</div>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-gradient-to-r from-orange-100 to-red-100">
                          <div className="font-semibold text-orange-700">Quarterly</div>
                          <div className="text-orange-600">₦
                            {(department.budget.quarterly / 1000000).toFixed(1)}M</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* KPIs */}
                  <div>
                    <h4 className="font-medium mb-3 text-slate-800">Performance KPIs</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-lg bg-gradient-to-r from-blue-100 to-indigo-200">
                        <div className="text-2xl font-bold text-blue-700">
                          {department.kpis.productivity}%
                        </div>
                        <div className="text-xs text-blue-600 font-medium">
                          Productivity
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-gradient-to-r from-green-100 to-emerald-200">
                        <div className="text-2xl font-bold text-green-700">
                          {department.kpis.satisfaction}%
                        </div>
                        <div className="text-xs text-green-600 font-medium">
                          Satisfaction
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-gradient-to-r from-purple-100 to-violet-200">
                        <div className="text-2xl font-bold text-purple-700">
                          {department.kpis.retention}%
                        </div>
                        <div className="text-xs text-purple-600 font-medium">
                          Retention
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedDepartment(department);
                        setShowEmployeeDialog(true);
                      }}
                      className="border-2 border-green-300 hover:bg-green-50 text-green-700"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Employee
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedDepartment(department);
                        setShowBudgetDialog(true);
                      }}
                      className="border-2 border-purple-300 hover:bg-purple-50 text-purple-700"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Manage Budget
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedDepartment(department);
                        setShowTeamDialog(true);
                      }}
                      className="border-2 border-indigo-300 hover:bg-indigo-50 text-indigo-700"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Manage Teams
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Department Details Dialog */}
        {selectedDepartment && (
          <Dialog
            open={!!selectedDepartment}
            onOpenChange={() => setSelectedDepartment(null)}
          >
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl bg-gradient-to-br from-white to-slate-50">
              <DialogHeader>
                <DialogTitle className="text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {selectedDepartment.name} - Department Details
                </DialogTitle>
                <DialogDescription className="text-slate-600">
                  Comprehensive view of department information and management
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl p-1 h-12">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">Overview</TabsTrigger>
                  <TabsTrigger value="employees" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">Employees</TabsTrigger>
                  <TabsTrigger value="teams" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">Teams</TabsTrigger>
                  <TabsTrigger value="budget" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">Budget</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-slate-700">
                        Department Name
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {selectedDepartment.name}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Status</Label>
                      <Badge
                        className={getStatusColor(selectedDepartment.status)}
                      >
                        {selectedDepartment.status}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Location</Label>
                      <p className="text-sm text-muted-foreground">
                        {selectedDepartment.location}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Established</Label>
                      <p className="text-sm text-muted-foreground">
                        {new Date(
                          selectedDepartment.establishedDate,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-sm font-medium text-slate-700">Description</Label>
                      <p className="text-sm text-muted-foreground">
                        {selectedDepartment.description}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="employees" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-slate-800">Department Employees</h4>
                    <Button
                      size="sm"
                      onClick={() => setShowEmployeeDialog(true)}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Employee
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Salary</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedDepartment.employees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white">
                                  {employee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-slate-800">{employee.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {employee.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{employee.position}</TableCell>
                          <TableCell>
                            ₦{employee.salary.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {new Date(employee.startDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(employee.status)}>
                              {employee.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="teams" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-slate-800">Department Teams</h4>
                    <Button
                      size="sm"
                      onClick={() => setShowTeamDialog(true)}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Team
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {selectedDepartment.teams.map((team) => (
                      <Card key={team.id} className="border-2 border-slate-200 bg-gradient-to-r from-white to-slate-50">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium text-slate-800">{team.name}</h5>
                              <p className="text-sm text-muted-foreground">
                                {team.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                <span>
                                  👤 Lead:{" "}
                                  {
                                    selectedDepartment.employees.find(
                                      (emp) => emp.id === team.leadId,
                                    )?.name
                                  }
                                </span>
                                <span>👥 {team.memberIds.length} members</span>
                                <span>📋 {team.projectIds.length} projects</span>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-2 border-purple-300 hover:bg-purple-50 text-purple-700"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="budget" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-slate-800">Budget Management</h4>
                    <Button
                      size="sm"
                      onClick={() => setShowBudgetDialog(true)}
                      className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white border-0"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Entry
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-700">
                          ₦
                          {(
                            selectedDepartment.budget.allocated / 1000000
                          ).toFixed(1)}
                          M
                        </div>
                        <div className="text-sm text-green-600 font-medium">
                          Total Allocated
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-red-700">
                          ₦
                          {(selectedDepartment.budget.spent / 1000000).toFixed(1)}
                          M
                        </div>
                        <div className="text-sm text-red-600 font-medium">
                          Total Spent
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center p-3 rounded-lg bg-gradient-to-r from-blue-100 to-indigo-200">
                      <div className="font-medium text-blue-700">
                        ₦{(selectedDepartment.budget.daily / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-blue-600">Daily</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-gradient-to-r from-green-100 to-emerald-200">
                      <div className="font-medium text-green-700">
                        ₦{(selectedDepartment.budget.weekly / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-green-600">Weekly</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-gradient-to-r from-purple-100 to-violet-200">
                      <div className="font-medium text-purple-700">
                        ₦
                        {(selectedDepartment.budget.monthly / 1000000).toFixed(1)}
                        M
                      </div>
                      <div className="text-xs text-purple-600">Monthly</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-gradient-to-r from-orange-100 to-red-200">
                      <div className="font-medium text-orange-700">
                        ₦
                        {(selectedDepartment.budget.quarterly / 1000000).toFixed(
                          1,
                        )}
                        M
                      </div>
                      <div className="text-xs text-orange-600">
                        Quarterly
                      </div>
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Approved By</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedDepartment.budget.entries.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell>{entry.description}</TableCell>
                          <TableCell>
                            <Badge className="bg-gradient-to-r from-cyan-100 to-blue-200 text-cyan-700 border-0 capitalize">
                              {entry.type.replace("_", " ")}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div
                              className={`flex items-center gap-1 ${entry.amount > 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {entry.amount > 0 ? (
                                <TrendingUp className="h-4 w-4" />
                              ) : (
                                <TrendingDown className="h-4 w-4" />
                              )}
                              ₦{Math.abs(entry.amount).toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(entry.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{entry.approvedBy}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button
                  onClick={() => setSelectedDepartment(null)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0"
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Add Employee Dialog */}
        <Dialog open={showEmployeeDialog} onOpenChange={setShowEmployeeDialog}>
          <DialogContent className="border-0 shadow-2xl bg-gradient-to-br from-white to-slate-50">
            <DialogHeader>
              <DialogTitle className="text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Add Employee to {selectedDepartment?.name}
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                Add a new employee to this department
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="empName" className="text-slate-700 font-medium">Employee Name *</Label>
                  <Input
                    id="empName"
                    value={newEmployee.name}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, name: e.target.value })
                    }
                    placeholder="Enter full name"
                    className="border-2 border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                  />
                </div>
                <div>
                  <Label htmlFor="empEmail" className="text-slate-700 font-medium">Email Address *</Label>
                  <Input
                    id="empEmail"
                    type="email"
                    value={newEmployee.email}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, email: e.target.value })
                    }
                    placeholder="Enter email address"
                    className="border-2 border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                  />
                </div>
                <div>
                  <Label htmlFor="empPosition" className="text-slate-700 font-medium">Position</Label>
                  <Input
                    id="empPosition"
                    value={newEmployee.position}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, position: e.target.value })
                    }
                    placeholder="Job position"
                    className="border-2 border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                  />
                </div>
                <div>
                  <Label htmlFor="empSalary" className="text-slate-700 font-medium">Annual Salary (₦)</Label>
                  <Input
                    id="empSalary"
                    type="number"
                    value={newEmployee.salary}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        salary: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="Annual salary"
                    className="border-2 border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                  />
                </div>
                <div>
                  <Label htmlFor="empStartDate" className="text-slate-700 font-medium">Start Date</Label>
                  <Input
                    id="empStartDate"
                    type="date"
                    value={newEmployee.startDate}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        startDate: e.target.value,
                      })
                    }
                    className="border-2 border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                  />
                </div>
                <div>
                  <Label htmlFor="empStatus" className="text-slate-700 font-medium">Status</Label>
                  <Select
                    value={newEmployee.status}
                    onValueChange={(value) =>
                      setNewEmployee({ ...newEmployee, status: value as any })
                    }
                  >
                    <SelectTrigger className="border-2 border-slate-200 focus:border-green-400">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowEmployeeDialog(false)}
                className="border-2 border-slate-300 hover:bg-slate-100"
              >
                Cancel
              </Button>
              <Button
                onClick={addEmployeeToDepartment}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0"
              >
                Add Employee
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Budget Management Dialog */}
        <Dialog open={showBudgetDialog} onOpenChange={setShowBudgetDialog}>
          <DialogContent className="border-0 shadow-2xl bg-gradient-to-br from-white to-slate-50">
            <DialogHeader>
              <DialogTitle className="text-xl bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                Budget Management - {selectedDepartment?.name}
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                Add budget allocation, deduction, or project funding
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="budgetDesc" className="text-slate-700 font-medium">Description *</Label>
                  <Input
                    id="budgetDesc"
                    value={newBudgetEntry.description}
                    onChange={(e) =>
                      setNewBudgetEntry({
                        ...newBudgetEntry,
                        description: e.target.value,
                      })
                    }
                    placeholder="Budget entry description"
                    className="border-2 border-slate-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                  />
                </div>
                <div>
                  <Label htmlFor="budgetType" className="text-slate-700 font-medium">Type *</Label>
                  <Select
                    value={newBudgetEntry.type}
                    onValueChange={(value) =>
                      setNewBudgetEntry({ ...newBudgetEntry, type: value as any })
                    }
                  >
                    <SelectTrigger className="border-2 border-slate-200 focus:border-purple-400">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="allocation">
                        Budget Allocation
                      </SelectItem>
                      <SelectItem value="deduction">Budget Deduction</SelectItem>
                      <SelectItem value="project_allocation">
                        Project Funding
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="budgetAmount" className="text-slate-700 font-medium">Amount (₦) *</Label>
                  <Input
                    id="budgetAmount"
                    type="number"
                    value={newBudgetEntry.amount}
                    onChange={(e) => {
                      const amount = parseInt(e.target.value) || 0;
                      const finalAmount =
                        newBudgetEntry.type === "deduction" ||
                        newBudgetEntry.type === "project_allocation"
                          ? -Math.abs(amount)
                          : Math.abs(amount);
                      setNewBudgetEntry({
                        ...newBudgetEntry,
                        amount: finalAmount,
                      });
                    }}
                    placeholder="Enter amount"
                    className="border-2 border-slate-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                  />
                </div>
                <div>
                  <Label htmlFor="budgetCategory" className="text-slate-700 font-medium">Category</Label>
                  <Input
                    id="budgetCategory"
                    value={newBudgetEntry.category}
                    onChange={(e) =>
                      setNewBudgetEntry({
                        ...newBudgetEntry,
                        category: e.target.value,
                      })
                    }
                    placeholder="Budget category"
                    className="border-2 border-slate-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                  />
                </div>
                <div>
                  <Label htmlFor="budgetDate" className="text-slate-700 font-medium">Date</Label>
                  <Input
                    id="budgetDate"
                    type="date"
                    value={newBudgetEntry.date}
                    onChange={(e) =>
                      setNewBudgetEntry({
                        ...newBudgetEntry,
                        date: e.target.value,
                      })
                    }
                    className="border-2 border-slate-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowBudgetDialog(false)}
                className="border-2 border-slate-300 hover:bg-slate-100"
              >
                Cancel
              </Button>
              <Button
                onClick={addBudgetEntry}
                className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white border-0"
              >
                Add Budget Entry
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Departments;
