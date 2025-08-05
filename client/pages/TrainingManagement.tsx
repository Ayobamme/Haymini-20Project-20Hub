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
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, Plus, Users, User, Building, Calendar, Clock, BookOpen, Award, CheckCircle, PlayCircle, PauseCircle, FileText } from "lucide-react";

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: "technical" | "soft-skills" | "compliance" | "onboarding" | "leadership";
  duration: number; // in hours
  level: "beginner" | "intermediate" | "advanced";
  instructor: string;
  format: "online" | "in-person" | "hybrid";
  status: "draft" | "active" | "completed" | "archived";
  maxParticipants?: number;
  completionRate: number;
  materials: string[];
  prerequisites: string[];
  createdDate: string;
}

interface TrainingAssignment {
  id: string;
  moduleId: string;
  assignedTo: string; // staff ID, team ID, or department ID
  assignedType: "staff" | "team" | "department";
  assignedBy: string;
  dueDate: string;
  status: "assigned" | "in-progress" | "completed" | "overdue";
  progress: number;
  startDate?: string;
  completionDate?: string;
  score?: number;
}

interface Staff {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  team: string;
  avatar?: string;
}

const TrainingManagement = () => {
  const [activeTab, setActiveTab] = useState("modules");
  const [isCreateModuleOpen, setIsCreateModuleOpen] = useState(false);
  const [isAssignTrainingOpen, setIsAssignTrainingOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);

  const [trainingModules, setTrainingModules] = useState<TrainingModule[]>([
    {
      id: "1",
      title: "React Advanced Patterns",
      description: "Learn advanced React patterns including hooks, context, and performance optimization",
      category: "technical",
      duration: 16,
      level: "advanced",
      instructor: "Sarah Johnson",
      format: "online",
      status: "active",
      maxParticipants: 20,
      completionRate: 85,
      materials: ["Video tutorials", "Code examples", "Practice exercises"],
      prerequisites: ["Basic React knowledge", "JavaScript ES6+"],
      createdDate: "2024-01-15"
    },
    {
      id: "2",
      title: "Leadership Fundamentals",
      description: "Essential leadership skills for managers and team leads",
      category: "leadership",
      duration: 12,
      level: "intermediate",
      instructor: "Michael Chen",
      format: "hybrid",
      status: "active",
      maxParticipants: 15,
      completionRate: 92,
      materials: ["Workbook", "Case studies", "Assessment tools"],
      prerequisites: ["1+ years management experience"],
      createdDate: "2024-01-10"
    },
    {
      id: "3",
      title: "Data Protection & GDPR Compliance",
      description: "Understanding data protection laws and compliance requirements",
      category: "compliance",
      duration: 4,
      level: "beginner",
      instructor: "Emily Davis",
      format: "online",
      status: "active",
      maxParticipants: 100,
      completionRate: 78,
      materials: ["Presentation slides", "Compliance checklist", "Quiz"],
      prerequisites: [],
      createdDate: "2024-01-05"
    }
  ]);

  const [assignments, setAssignments] = useState<TrainingAssignment[]>([
    {
      id: "1",
      moduleId: "1",
      assignedTo: "EMP001",
      assignedType: "staff",
      assignedBy: "HR Manager",
      dueDate: "2024-02-15",
      status: "in-progress",
      progress: 65,
      startDate: "2024-01-20"
    },
    {
      id: "2",
      moduleId: "2",
      assignedTo: "TEAM-ENG",
      assignedType: "team",
      assignedBy: "Engineering Manager",
      dueDate: "2024-02-28",
      status: "assigned",
      progress: 0
    },
    {
      id: "3",
      moduleId: "3",
      assignedTo: "DEPT-ALL",
      assignedType: "department",
      assignedBy: "Compliance Officer",
      dueDate: "2024-01-31",
      status: "overdue",
      progress: 45
    }
  ]);

  const [newModule, setNewModule] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    level: "",
    instructor: "",
    format: "",
    maxParticipants: "",
    materials: "",
    prerequisites: ""
  });

  const [newAssignment, setNewAssignment] = useState({
    moduleId: "",
    assignedTo: "",
    assignedType: "staff",
    dueDate: ""
  });

  // Mock data for staff, teams, and departments
  const staffMembers: Staff[] = [
    { id: "EMP001", name: "John Smith", email: "john@company.com", position: "Senior Developer", department: "Engineering", team: "Frontend" },
    { id: "EMP002", name: "Alice Johnson", email: "alice@company.com", position: "Product Manager", department: "Product", team: "Core" },
    { id: "EMP003", name: "Bob Wilson", email: "bob@company.com", position: "Designer", department: "Design", team: "UX" }
  ];

  const teams = [
    { id: "TEAM-ENG", name: "Engineering Team", department: "Engineering" },
    { id: "TEAM-PRODUCT", name: "Product Team", department: "Product" },
    { id: "TEAM-DESIGN", name: "Design Team", department: "Design" }
  ];

  const departments = [
    { id: "DEPT-ENG", name: "Engineering" },
    { id: "DEPT-PRODUCT", name: "Product" },
    { id: "DEPT-DESIGN", name: "Design" },
    { id: "DEPT-ALL", name: "All Departments" }
  ];

  const getCategoryVariant = (category: TrainingModule["category"]) => {
    switch (category) {
      case "technical": return "default";
      case "soft-skills": return "secondary";
      case "compliance": return "destructive";
      case "onboarding": return "outline";
      case "leadership": return "default";
      default: return "outline";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active": case "in-progress": return "default";
      case "assigned": return "secondary";
      case "completed": return "secondary";
      case "overdue": return "destructive";
      case "draft": return "outline";
      default: return "outline";
    }
  };

  const getLevelVariant = (level: TrainingModule["level"]) => {
    switch (level) {
      case "beginner": return "secondary";
      case "intermediate": return "default";
      case "advanced": return "destructive";
      default: return "outline";
    }
  };

  const handleCreateModule = () => {
    const module: TrainingModule = {
      id: Date.now().toString(),
      ...newModule,
      duration: parseInt(newModule.duration),
      maxParticipants: newModule.maxParticipants ? parseInt(newModule.maxParticipants) : undefined,
      materials: newModule.materials.split(',').map(m => m.trim()).filter(Boolean),
      prerequisites: newModule.prerequisites.split(',').map(p => p.trim()).filter(Boolean),
      status: "draft",
      completionRate: 0,
      createdDate: new Date().toISOString().split('T')[0]
    } as TrainingModule;
    
    setTrainingModules([...trainingModules, module]);
    setNewModule({
      title: "", description: "", category: "", duration: "", level: "", instructor: "",
      format: "", maxParticipants: "", materials: "", prerequisites: ""
    });
    setIsCreateModuleOpen(false);
  };

  const handleAssignTraining = () => {
    const assignment: TrainingAssignment = {
      id: Date.now().toString(),
      ...newAssignment,
      assignedBy: "Current User",
      status: "assigned",
      progress: 0
    };
    
    setAssignments([...assignments, assignment]);
    setNewAssignment({ moduleId: "", assignedTo: "", assignedType: "staff", dueDate: "" });
    setIsAssignTrainingOpen(false);
  };

  const getAssignmentTargetName = (assignment: TrainingAssignment) => {
    switch (assignment.assignedType) {
      case "staff":
        return staffMembers.find(s => s.id === assignment.assignedTo)?.name || assignment.assignedTo;
      case "team":
        return teams.find(t => t.id === assignment.assignedTo)?.name || assignment.assignedTo;
      case "department":
        return departments.find(d => d.id === assignment.assignedTo)?.name || assignment.assignedTo;
      default:
        return assignment.assignedTo;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Training Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Create training modules and assign to staff, teams, and departments
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isCreateModuleOpen} onOpenChange={setIsCreateModuleOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Module
                </Button>
              </DialogTrigger>
            </Dialog>
            <Dialog open={isAssignTrainingOpen} onOpenChange={setIsAssignTrainingOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Assign Training
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="modules">Training Modules</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Training Modules Tab */}
          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="grid gap-4">
                  {trainingModules.map((module) => (
                    <Card key={module.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <CardTitle className="text-lg">{module.title}</CardTitle>
                            <CardDescription>{module.description}</CardDescription>
                            <div className="flex items-center gap-2">
                              <Badge variant={getCategoryVariant(module.category)}>
                                {module.category.replace('-', ' ')}
                              </Badge>
                              <Badge variant={getLevelVariant(module.level)}>
                                {module.level}
                              </Badge>
                              <Badge variant={getStatusVariant(module.status)}>
                                {module.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">{module.completionRate}%</div>
                            <div className="text-sm text-muted-foreground">Completion</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{module.duration} hours</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{module.instructor}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                              <span className="capitalize">{module.format}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>Max: {module.maxParticipants || 'Unlimited'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Created: {new Date(module.createdDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        {module.materials.length > 0 && (
                          <div className="mt-4">
                            <Label className="text-sm font-medium">Materials:</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {module.materials.map((material, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {material}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {module.prerequisites.length > 0 && (
                          <div className="mt-2">
                            <Label className="text-sm font-medium">Prerequisites:</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {module.prerequisites.map((prereq, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {prereq}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="mr-1 h-3 w-3" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedModule(module);
                              setIsAssignTrainingOpen(true);
                              setNewAssignment(prev => ({ ...prev, moduleId: module.id }));
                            }}
                          >
                            <Users className="mr-1 h-3 w-3" />
                            Assign
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Summary Stats */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Training Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Total Modules</span>
                        <span className="text-2xl font-bold">{trainingModules.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Active</span>
                        <span className="text-xl font-semibold">
                          {trainingModules.filter(m => m.status === "active").length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Avg Completion</span>
                        <span className="text-xl font-semibold">
                          {Math.round(trainingModules.reduce((acc, m) => acc + m.completionRate, 0) / trainingModules.length)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {["technical", "soft-skills", "compliance", "onboarding", "leadership"].map(category => {
                        const count = trainingModules.filter(m => m.category === category).length;
                        return (
                          <div key={category} className="flex justify-between items-center text-sm">
                            <span className="capitalize">{category.replace('-', ' ')}</span>
                            <Badge variant="secondary">{count}</Badge>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-6">
            <div className="grid gap-4">
              {assignments.map((assignment) => {
                const module = trainingModules.find(m => m.id === assignment.moduleId);
                return (
                  <Card key={assignment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{module?.title || "Unknown Module"}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Assigned to: <strong>{getAssignmentTargetName(assignment)}</strong></span>
                            <span>Type: <Badge variant="outline" className="text-xs">{assignment.assignedType}</Badge></span>
                            <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getStatusVariant(assignment.status)}>
                              {assignment.status.replace('-', ' ')}
                            </Badge>
                            {assignment.assignedType === "staff" && (
                              <span className="text-sm text-muted-foreground">
                                Assigned by: {assignment.assignedBy}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="flex items-center gap-2">
                            <Progress value={assignment.progress} className="w-24" />
                            <span className="text-sm font-medium">{assignment.progress}%</span>
                          </div>
                          {assignment.score && (
                            <div className="flex items-center gap-1">
                              <Award className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm">Score: {assignment.score}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">Total Assignments</p>
                      <p className="text-2xl font-bold">{assignments.length}</p>
                    </div>
                    <GraduationCap className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold">
                        {assignments.filter(a => a.status === "completed").length}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">In Progress</p>
                      <p className="text-2xl font-bold">
                        {assignments.filter(a => a.status === "in-progress").length}
                      </p>
                    </div>
                    <PlayCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">Overdue</p>
                      <p className="text-2xl font-bold">
                        {assignments.filter(a => a.status === "overdue").length}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Create Module Dialog */}
        <Dialog open={isCreateModuleOpen} onOpenChange={setIsCreateModuleOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Training Module</DialogTitle>
              <DialogDescription>
                Create a new training module to assign to staff, teams, or departments
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Module Title</Label>
                <Input
                  id="title"
                  value={newModule.title}
                  onChange={(e) => setNewModule(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter module title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={newModule.instructor}
                  onChange={(e) => setNewModule(prev => ({ ...prev, instructor: e.target.value }))}
                  placeholder="Enter instructor name"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newModule.description}
                  onChange={(e) => setNewModule(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter module description"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newModule.category} onValueChange={(value) => setNewModule(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="soft-skills">Soft Skills</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="onboarding">Onboarding</SelectItem>
                    <SelectItem value="leadership">Leadership</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select value={newModule.level} onValueChange={(value) => setNewModule(prev => ({ ...prev, level: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (hours)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newModule.duration}
                  onChange={(e) => setNewModule(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="Enter duration in hours"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="format">Format</Label>
                <Select value={newModule.format} onValueChange={(value) => setNewModule(prev => ({ ...prev, format: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="in-person">In-Person</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Max Participants (optional)</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  value={newModule.maxParticipants}
                  onChange={(e) => setNewModule(prev => ({ ...prev, maxParticipants: e.target.value }))}
                  placeholder="Leave empty for unlimited"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="materials">Materials (comma-separated)</Label>
                <Input
                  id="materials"
                  value={newModule.materials}
                  onChange={(e) => setNewModule(prev => ({ ...prev, materials: e.target.value }))}
                  placeholder="e.g., Video tutorials, Workbook, Quiz"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="prerequisites">Prerequisites (comma-separated)</Label>
                <Input
                  id="prerequisites"
                  value={newModule.prerequisites}
                  onChange={(e) => setNewModule(prev => ({ ...prev, prerequisites: e.target.value }))}
                  placeholder="e.g., Basic programming knowledge, 1+ years experience"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateModuleOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateModule}>
                Create Module
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Assign Training Dialog */}
        <Dialog open={isAssignTrainingOpen} onOpenChange={setIsAssignTrainingOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Assign Training</DialogTitle>
              <DialogDescription>
                Assign training module to staff, team, or department
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="moduleSelect">Training Module</Label>
                <Select value={newAssignment.moduleId} onValueChange={(value) => setNewAssignment(prev => ({ ...prev, moduleId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select module" />
                  </SelectTrigger>
                  <SelectContent>
                    {trainingModules.filter(m => m.status === "active").map((module) => (
                      <SelectItem key={module.id} value={module.id}>
                        {module.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignType">Assignment Type</Label>
                <Select value={newAssignment.assignedType} onValueChange={(value) => setNewAssignment(prev => ({ ...prev, assignedType: value as any, assignedTo: "" }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staff">Individual Staff</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="department">Department</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignTo">Assign To</Label>
                <Select value={newAssignment.assignedTo} onValueChange={(value) => setNewAssignment(prev => ({ ...prev, assignedTo: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target" />
                  </SelectTrigger>
                  <SelectContent>
                    {newAssignment.assignedType === "staff" && staffMembers.map((staff) => (
                      <SelectItem key={staff.id} value={staff.id}>
                        {staff.name} - {staff.position}
                      </SelectItem>
                    ))}
                    {newAssignment.assignedType === "team" && teams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                    {newAssignment.assignedType === "department" && departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAssignTrainingOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAssignTraining}>
                Assign Training
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TrainingManagement;
