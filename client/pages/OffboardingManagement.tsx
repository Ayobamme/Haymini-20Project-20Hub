import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  UserMinus,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Mail,
  Phone,
  Building,
  Archive,
  FileText,
  Key,
  CreditCard,
  Laptop,
} from "lucide-react";

interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  joinDate: string;
  lastWorkingDay: string;
  reason: "resignation" | "termination" | "retirement" | "contract-end";
  status:
    | "initiated"
    | "clearance"
    | "documentation"
    | "exit-interview"
    | "archived";
  progress: number;
  avatar?: string;
  manager: string;
  salary: string;
  notes: string;
}

interface ClearanceItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
  category: "clearance" | "documentation" | "exit-interview" | "assets";
  assignedTo?: string;
}

const OffboardingManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      employeeId: "EMP001",
      name: "John Smith",
      email: "john.smith@company.com",
      phone: "+234 901 234 5678",
      position: "Senior Developer",
      department: "Engineering",
      joinDate: "2022-03-15",
      lastWorkingDay: "2024-02-15",
      reason: "resignation",
      status: "clearance",
      progress: 60,
      manager: "Sarah Wilson",
      salary: "₦2,500,000",
      notes: "Relocating to another city",
    },
    {
      id: "2",
      employeeId: "EMP002",
      name: "Emily Davis",
      email: "emily.davis@company.com",
      phone: "+234 902 345 6789",
      position: "Marketing Manager",
      department: "Marketing",
      joinDate: "2021-07-20",
      lastWorkingDay: "2024-01-31",
      reason: "contract-end",
      status: "documentation",
      progress: 80,
      manager: "Michael Johnson",
      salary: "₦1,800,000",
      notes: "Contract completion, potential for renewal",
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isClearanceOpen, setIsClearanceOpen] = useState(false);

  const [clearanceItems, setClearanceItems] = useState<ClearanceItem[]>([
    {
      id: "1",
      title: "IT Equipment Return",
      description: "Return laptop, monitor, accessories",
      completed: true,
      required: true,
      category: "assets",
      assignedTo: "IT Department",
    },
    {
      id: "2",
      title: "Access Card Return",
      description: "Return building access card and keys",
      completed: true,
      required: true,
      category: "assets",
      assignedTo: "Security",
    },
    {
      id: "3",
      title: "HR Documentation",
      description: "Complete final HR paperwork and documentation",
      completed: false,
      required: true,
      category: "documentation",
      assignedTo: "HR Team",
    },
    {
      id: "4",
      title: "Knowledge Transfer",
      description: "Complete handover of projects and responsibilities",
      completed: false,
      required: true,
      category: "clearance",
      assignedTo: "Direct Manager",
    },
    {
      id: "5",
      title: "Finance Clearance",
      description: "Settle outstanding expenses and benefits",
      completed: false,
      required: true,
      category: "clearance",
      assignedTo: "Finance Team",
    },
    {
      id: "6",
      title: "Exit Interview",
      description: "Conduct comprehensive exit interview",
      completed: false,
      required: true,
      category: "exit-interview",
      assignedTo: "HR Manager",
    },
    {
      id: "7",
      title: "Final Payslip",
      description: "Process final salary and benefits payment",
      completed: false,
      required: true,
      category: "documentation",
      assignedTo: "Payroll",
    },
    {
      id: "8",
      title: "Reference Letter",
      description: "Prepare employment reference letter",
      completed: false,
      required: false,
      category: "documentation",
      assignedTo: "HR Team",
    },
  ]);

  const [newOffboarding, setNewOffboarding] = useState({
    employeeId: "",
    lastWorkingDay: "",
    reason: "",
    notes: "",
  });

  // Mock employee data for selection
  const availableEmployees = [
    {
      id: "EMP003",
      name: "Alice Johnson",
      position: "UX Designer",
      department: "Design",
    },
    {
      id: "EMP004",
      name: "Robert Brown",
      position: "Data Analyst",
      department: "Analytics",
    },
    {
      id: "EMP005",
      name: "Lisa Wilson",
      position: "HR Specialist",
      department: "HR",
    },
  ];

  const getStatusVariant = (status: Employee["status"]) => {
    switch (status) {
      case "initiated":
        return "default";
      case "clearance":
        return "secondary";
      case "documentation":
        return "outline";
      case "exit-interview":
        return "default";
      case "archived":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getReasonVariant = (reason: Employee["reason"]) => {
    switch (reason) {
      case "resignation":
        return "default";
      case "termination":
        return "destructive";
      case "retirement":
        return "secondary";
      case "contract-end":
        return "outline";
      default:
        return "outline";
    }
  };

  const handleAddOffboarding = () => {
    const selectedEmp = availableEmployees.find(
      (emp) => emp.id === newOffboarding.employeeId,
    );
    if (!selectedEmp) return;

    const employee: Employee = {
      id: Date.now().toString(),
      employeeId: selectedEmp.id,
      name: selectedEmp.name,
      email: `${selectedEmp.name.toLowerCase().replace(" ", ".")}@company.com`,
      phone: "+234 90X XXX XXXX",
      position: selectedEmp.position,
      department: selectedEmp.department,
      joinDate: "2023-01-01", // This would be populated from employee database
      lastWorkingDay: newOffboarding.lastWorkingDay,
      reason: newOffboarding.reason as Employee["reason"],
      status: "initiated",
      progress: 0,
      manager: "TBD", // This would be populated from employee database
      salary: "₦X,XXX,XXX", // This would be populated from employee database
      notes: newOffboarding.notes,
    };

    setEmployees([...employees, employee]);
    setNewOffboarding({
      employeeId: "",
      lastWorkingDay: "",
      reason: "",
      notes: "",
    });
    setIsAddEmployeeOpen(false);
  };

  const handleClearanceUpdate = (itemId: string, completed: boolean) => {
    setClearanceItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, completed } : item)),
    );

    // Update employee progress
    if (selectedEmployee) {
      const totalItems = clearanceItems.filter((item) => item.required).length;
      const completedItems = clearanceItems.filter(
        (item) =>
          item.required && (item.id === itemId ? completed : item.completed),
      ).length;
      const progress = Math.round((completedItems / totalItems) * 100);

      setEmployees((prev) =>
        prev.map((employee) =>
          employee.id === selectedEmployee.id
            ? { ...employee, progress }
            : employee,
        ),
      );
    }
  };

  const archiveEmployee = (employeeId: string) => {
    setEmployees((prev) =>
      prev.map((employee) =>
        employee.id === employeeId
          ? { ...employee, status: "archived", progress: 100 }
          : employee,
      ),
    );
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
              Manage employee offboarding from clearance to archival
            </p>
          </div>
          <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserMinus className="mr-2 h-4 w-4" />
                Add to Offboarding
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Employee to Offboarding</DialogTitle>
                <DialogDescription>
                  Initiate offboarding process for an employee
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="employee">Select Employee</Label>
                  <Select
                    value={newOffboarding.employeeId}
                    onValueChange={(value) =>
                      setNewOffboarding((prev) => ({
                        ...prev,
                        employeeId: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableEmployees.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.name} - {emp.position} ({emp.department})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastWorkingDay">Last Working Day</Label>
                  <Input
                    id="lastWorkingDay"
                    type="date"
                    value={newOffboarding.lastWorkingDay}
                    onChange={(e) =>
                      setNewOffboarding((prev) => ({
                        ...prev,
                        lastWorkingDay: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Leaving</Label>
                  <Select
                    value={newOffboarding.reason}
                    onValueChange={(value) =>
                      setNewOffboarding((prev) => ({ ...prev, reason: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="resignation">Resignation</SelectItem>
                      <SelectItem value="termination">Termination</SelectItem>
                      <SelectItem value="retirement">Retirement</SelectItem>
                      <SelectItem value="contract-end">Contract End</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newOffboarding.notes}
                    onChange={(e) =>
                      setNewOffboarding((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    placeholder="Additional notes about the offboarding"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddEmployeeOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddOffboarding}>
                  Initiate Offboarding
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Offboarding Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Employees List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserMinus className="h-5 w-5" />
                  Offboarding Pipeline
                </CardTitle>
                <CardDescription>
                  Track employees through the offboarding process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employees.map((employee) => (
                    <div
                      key={employee.id}
                      className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={employee.avatar}
                              alt={employee.name}
                            />
                            <AvatarFallback>
                              {employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{employee.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {employee.position} • {employee.department}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">
                                ID: {employee.employeeId}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                •
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {employee.email}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="flex gap-2">
                            <Badge variant={getStatusVariant(employee.status)}>
                              <span className="capitalize">
                                {employee.status.replace("-", " ")}
                              </span>
                            </Badge>
                            <Badge variant={getReasonVariant(employee.reason)}>
                              {employee.reason.replace("-", " ")}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={employee.progress}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">
                              {employee.progress}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>Last Working Day:</span>
                          </div>
                          <span className="font-medium">
                            {new Date(
                              employee.lastWorkingDay,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Building className="h-3 w-3" />
                            <span>Manager:</span>
                          </div>
                          <span className="font-medium">
                            {employee.manager}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            <span>Phone:</span>
                          </div>
                          <span className="font-medium">{employee.phone}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <CreditCard className="h-3 w-3" />
                            <span>Salary:</span>
                          </div>
                          <span className="font-medium">{employee.salary}</span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <strong>Tenure:</strong>{" "}
                          {new Date(employee.joinDate).toLocaleDateString()} to{" "}
                          {new Date(
                            employee.lastWorkingDay,
                          ).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedEmployee(employee);
                              setIsClearanceOpen(true);
                            }}
                          >
                            View Clearance
                          </Button>
                          {employee.progress === 100 &&
                            employee.status !== "archived" && (
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => archiveEmployee(employee.id)}
                              >
                                <Archive className="mr-1 h-3 w-3" />
                                Archive
                              </Button>
                            )}
                        </div>
                      </div>

                      {employee.notes && (
                        <div className="mt-2 p-2 bg-muted rounded text-sm">
                          <strong>Notes:</strong> {employee.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Stats */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Offboarding Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Total Offboarding</span>
                    <span className="text-2xl font-bold">
                      {employees.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>In Progress</span>
                    <span className="text-xl font-semibold">
                      {employees.filter((e) => e.status !== "archived").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Archived</span>
                    <span className="text-xl font-semibold">
                      {employees.filter((e) => e.status === "archived").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    "initiated",
                    "clearance",
                    "documentation",
                    "exit-interview",
                    "archived",
                  ].map((status) => {
                    const count = employees.filter(
                      (e) => e.status === status,
                    ).length;
                    return (
                      <div
                        key={status}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="capitalize">
                          {status.replace("-", " ")}
                        </span>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Leaving Reasons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    "resignation",
                    "termination",
                    "retirement",
                    "contract-end",
                  ].map((reason) => {
                    const count = employees.filter(
                      (e) => e.reason === reason,
                    ).length;
                    return (
                      <div
                        key={reason}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="capitalize">
                          {reason.replace("-", " ")}
                        </span>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Clearance Dialog */}
        <Dialog open={isClearanceOpen} onOpenChange={setIsClearanceOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Clearance Checklist - {selectedEmployee?.name}
              </DialogTitle>
              <DialogDescription>
                Track progress through the offboarding clearance process
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="clearance" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="clearance">Clearance</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
                <TabsTrigger value="exit-interview">Exit Interview</TabsTrigger>
                <TabsTrigger value="assets">Asset Return</TabsTrigger>
              </TabsList>

              {["clearance", "documentation", "exit-interview", "assets"].map(
                (category) => (
                  <TabsContent
                    key={category}
                    value={category}
                    className="space-y-3"
                  >
                    {clearanceItems
                      .filter((item) => item.category === category)
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start space-x-3 p-3 border rounded-lg"
                        >
                          <Checkbox
                            id={item.id}
                            checked={item.completed}
                            onCheckedChange={(checked) =>
                              handleClearanceUpdate(item.id, checked as boolean)
                            }
                            className="mt-1"
                          />
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <label
                                  htmlFor={item.id}
                                  className="text-sm font-medium cursor-pointer"
                                >
                                  {item.title}
                                </label>
                                {item.required && (
                                  <Badge
                                    variant="destructive"
                                    className="text-xs"
                                  >
                                    Required
                                  </Badge>
                                )}
                              </div>
                              {item.assignedTo && (
                                <Badge variant="outline" className="text-xs">
                                  {item.assignedTo}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                  </TabsContent>
                ),
              )}
            </Tabs>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsClearanceOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default OffboardingManagement;
