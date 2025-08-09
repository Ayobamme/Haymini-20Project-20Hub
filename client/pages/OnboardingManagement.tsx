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
  UserPlus,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  FileText,
  Users,
} from "lucide-react";

interface Prospect {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status:
    | "interview"
    | "documentation"
    | "background-check"
    | "onboarding"
    | "completed";
  startDate: string;
  progress: number;
  avatar?: string;
  notes: string;
}

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
  category: "interview" | "documentation" | "background-check" | "onboarding";
}

const OnboardingManagement = () => {
  const [prospects, setProspects] = useState<Prospect[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+234 901 234 5678",
      position: "Software Engineer",
      department: "Engineering",
      status: "onboarding",
      startDate: "2024-01-15",
      progress: 75,
      notes: "Strong technical background, excited to join the team",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+234 902 345 6789",
      position: "Product Manager",
      department: "Product",
      status: "documentation",
      startDate: "2024-01-20",
      progress: 45,
      notes: "Previous experience at tech startups",
    },
  ]);

  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(
    null,
  );
  const [isAddProspectOpen, setIsAddProspectOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    {
      id: "1",
      title: "Initial Interview",
      description: "Conduct technical and cultural fit interview",
      completed: true,
      required: true,
      category: "interview",
    },
    {
      id: "2",
      title: "Background Verification",
      description: "Verify employment history and references",
      completed: true,
      required: true,
      category: "background-check",
    },
    {
      id: "3",
      title: "Offer Letter Signed",
      description: "Candidate has signed and returned offer letter",
      completed: true,
      required: true,
      category: "documentation",
    },
    {
      id: "4",
      title: "Contract Documentation",
      description: "Employment contract and policies signed",
      completed: false,
      required: true,
      category: "documentation",
    },
    {
      id: "5",
      title: "IT Setup Request",
      description: "Request laptop, accounts, and access permissions",
      completed: false,
      required: true,
      category: "onboarding",
    },
    {
      id: "6",
      title: "Workspace Assignment",
      description: "Assign desk/office space and equipment",
      completed: false,
      required: true,
      category: "onboarding",
    },
    {
      id: "7",
      title: "Orientation Schedule",
      description: "Schedule first week orientation sessions",
      completed: false,
      required: true,
      category: "onboarding",
    },
    {
      id: "8",
      title: "Buddy Assignment",
      description: "Assign workplace buddy/mentor",
      completed: false,
      required: false,
      category: "onboarding",
    },
  ]);

  const [newProspect, setNewProspect] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    startDate: "",
    notes: "",
  });

  const getStatusVariant = (status: Prospect["status"]) => {
    switch (status) {
      case "interview":
        return "default";
      case "documentation":
        return "secondary";
      case "background-check":
        return "outline";
      case "onboarding":
        return "default";
      case "completed":
        return "default";
      default:
        return "outline";
    }
  };

  const handleAddProspect = () => {
    const prospect: Prospect = {
      id: Date.now().toString(),
      ...newProspect,
      status: "interview",
      progress: 0,
    };
    setProspects([...prospects, prospect]);
    setNewProspect({
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      startDate: "",
      notes: "",
    });
    setIsAddProspectOpen(false);
  };

  const handleChecklistUpdate = (itemId: string, completed: boolean) => {
    setChecklistItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, completed } : item)),
    );

    // Update prospect progress
    if (selectedProspect) {
      const totalItems = checklistItems.filter((item) => item.required).length;
      const completedItems = checklistItems.filter(
        (item) =>
          item.required && (item.id === itemId ? completed : item.completed),
      ).length;
      const progress = Math.round((completedItems / totalItems) * 100);

      setProspects((prev) =>
        prev.map((prospect) =>
          prospect.id === selectedProspect.id
            ? { ...prospect, progress }
            : prospect,
        ),
      );
    }
  };

  const graduateToEmployee = (prospectId: string) => {
    const prospect = prospects.find(p => p.id === prospectId);
    if (!prospect) return;

    // Create employee record (in real app, this would integrate with HR system)
    const employeeData = {
      employeeId: `EMP${Date.now().toString().slice(-3)}`,
      name: prospect.name,
      email: prospect.email,
      phone: prospect.phone,
      position: prospect.position,
      department: prospect.department,
      startDate: prospect.startDate,
      status: "Active",
      onboardingCompleted: true,
      linkedInProfile: `https://linkedin.com/in/${prospect.name.toLowerCase().replace(' ', '-')}` // Mock LinkedIn URL
    };

    // Update prospect status
    setProspects((prev) =>
      prev.map((p) =>
        p.id === prospectId
          ? { ...p, status: "completed", progress: 100 }
          : p,
      ),
    );

    // In real implementation, this would:
    // 1. Add to employee database
    // 2. Create HR profile with LinkedIn integration
    // 3. Setup system access
    // 4. Trigger welcome email
    // 5. Update attendance tracking
    // 6. Link to LinkedIn profile for professional networking

    toast({
      title: "Employee Created Successfully!",
      description: `${prospect.name} has been converted to employee ${employeeData.employeeId} and added to HR system with LinkedIn integration.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Onboarding Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage prospect onboarding from interview to employee graduation
            </p>
          </div>
          <Dialog open={isAddProspectOpen} onOpenChange={setIsAddProspectOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Prospect
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Prospect</DialogTitle>
                <DialogDescription>
                  Add a new prospect to the onboarding pipeline
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newProspect.name}
                    onChange={(e) =>
                      setNewProspect((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newProspect.email}
                    onChange={(e) =>
                      setNewProspect((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newProspect.phone}
                    onChange={(e) =>
                      setNewProspect((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={newProspect.position}
                    onChange={(e) =>
                      setNewProspect((prev) => ({
                        ...prev,
                        position: e.target.value,
                      }))
                    }
                    placeholder="Enter position title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={newProspect.department}
                    onValueChange={(value) =>
                      setNewProspect((prev) => ({ ...prev, department: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="HR">Human Resources</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Expected Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newProspect.startDate}
                    onChange={(e) =>
                      setNewProspect((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newProspect.notes}
                    onChange={(e) =>
                      setNewProspect((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    placeholder="Additional notes about the prospect"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddProspectOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddProspect}>Add Prospect</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Onboarding Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Prospects List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Onboarding Pipeline
                </CardTitle>
                <CardDescription>
                  Track prospects through the onboarding process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prospects.map((prospect) => (
                    <div
                      key={prospect.id}
                      className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={prospect.avatar}
                              alt={prospect.name}
                            />
                            <AvatarFallback>
                              {prospect.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{prospect.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {prospect.position} • {prospect.department}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {prospect.email}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <Badge variant={getStatusVariant(prospect.status)}>
                            <span className="capitalize">
                              {prospect.status.replace("-", " ")}
                            </span>
                          </Badge>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={prospect.progress}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">
                              {prospect.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Start:{" "}
                            {new Date(prospect.startDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {prospect.phone}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedProspect(prospect);
                              setIsChecklistOpen(true);
                            }}
                          >
                            View Checklist
                          </Button>
                          {prospect.progress === 100 &&
                            prospect.status !== "completed" && (
                              <Button
                                size="sm"
                                onClick={() => graduateToEmployee(prospect.id)}
                              >
                                <GraduationCap className="mr-1 h-3 w-3" />
                                Graduate to Employee
                              </Button>
                            )}
                        </div>
                      </div>
                      {prospect.notes && (
                        <div className="mt-2 p-2 bg-muted rounded text-sm">
                          <strong>Notes:</strong> {prospect.notes}
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
                <CardTitle>Pipeline Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Total Prospects</span>
                    <span className="text-2xl font-bold">
                      {prospects.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>In Progress</span>
                    <span className="text-xl font-semibold">
                      {prospects.filter((p) => p.status !== "completed").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Completed</span>
                    <span className="text-xl font-semibold">
                      {prospects.filter((p) => p.status === "completed").length}
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
                    "interview",
                    "documentation",
                    "background-check",
                    "onboarding",
                    "completed",
                  ].map((status) => {
                    const count = prospects.filter(
                      (p) => p.status === status,
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
          </div>
        </div>

        {/* Checklist Dialog */}
        <Dialog open={isChecklistOpen} onOpenChange={setIsChecklistOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Onboarding Checklist - {selectedProspect?.name}
              </DialogTitle>
              <DialogDescription>
                Track progress through the onboarding process
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="interview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="interview">Interview</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
                <TabsTrigger value="background-check">Background</TabsTrigger>
                <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
              </TabsList>

              {[
                "interview",
                "documentation",
                "background-check",
                "onboarding",
              ].map((category) => (
                <TabsContent
                  key={category}
                  value={category}
                  className="space-y-3"
                >
                  {checklistItems
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
                            handleChecklistUpdate(item.id, checked as boolean)
                          }
                          className="mt-1"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <label
                              htmlFor={item.id}
                              className="text-sm font-medium cursor-pointer"
                            >
                              {item.title}
                            </label>
                            {item.required && (
                              <Badge variant="destructive" className="text-xs">
                                Required
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
              ))}
            </Tabs>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsChecklistOpen(false)}
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

export default OnboardingManagement;
