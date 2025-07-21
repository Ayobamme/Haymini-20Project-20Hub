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
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Target,
  Users,
  Calendar,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Clock,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Eye,
  User,
  Building,
  Flag,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { toast } from "@/hooks/use-toast";

interface KeyResult {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  dueDate: string;
  milestones: Milestone[];
}

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: Date;
}

interface OKR {
  id: string;
  title: string;
  description: string;
  type: "team" | "individual";
  assignedTo: string; // Team name or individual email
  assigneeName: string;
  quarter: string;
  year: number;
  status: "draft" | "active" | "completed" | "paused";
  priority: "low" | "medium" | "high" | "critical";
  keyResults: KeyResult[];
  comments: Comment[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

const OKRs = () => {
  const [okrs, setOKRs] = useState<OKR[]>([
    {
      id: "OKR-001",
      title: "Increase Customer Satisfaction",
      description: "Improve overall customer satisfaction scores and reduce churn rate for Q1 2024",
      type: "team",
      assignedTo: "customer-support",
      assigneeName: "Customer Support Team",
      quarter: "Q1",
      year: 2024,
      status: "active",
      priority: "high",
      keyResults: [
        {
          id: "KR-001",
          title: "Achieve 90% Customer Satisfaction Score",
          description: "Improve CSAT score from 85% to 90%",
          targetValue: 90,
          currentValue: 87,
          unit: "%",
          dueDate: "2024-03-31",
          milestones: [
            { id: "M-001", title: "Implement feedback system", completed: true, dueDate: "2024-02-15" },
            { id: "M-002", title: "Train support team", completed: true, dueDate: "2024-02-28" },
            { id: "M-003", title: "Launch customer portal", completed: false, dueDate: "2024-03-15" },
          ],
        },
        {
          id: "KR-002",
          title: "Reduce Response Time to 2 Hours",
          description: "Decrease average response time from 4 hours to 2 hours",
          targetValue: 2,
          currentValue: 2.5,
          unit: "hours",
          dueDate: "2024-03-31",
          milestones: [
            { id: "M-004", title: "Optimize ticket routing", completed: true, dueDate: "2024-02-10" },
            { id: "M-005", title: "Add more support agents", completed: false, dueDate: "2024-03-01" },
          ],
        },
      ],
      comments: [
        {
          id: "C-001",
          author: "Admin User",
          content: "Great progress on the satisfaction score! Keep up the good work.",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
      ],
      createdBy: "Admin User",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      tags: ["customer", "satisfaction", "support"],
    },
    {
      id: "OKR-002",
      title: "Develop Mobile App MVP",
      description: "Complete development of mobile application MVP with core features",
      type: "individual",
      assignedTo: "sarah@company.com",
      assigneeName: "Sarah Wilson",
      quarter: "Q1",
      year: 2024,
      status: "active",
      priority: "critical",
      keyResults: [
        {
          id: "KR-003",
          title: "Complete 100% of Core Features",
          description: "Implement all essential features for MVP",
          targetValue: 100,
          currentValue: 75,
          unit: "%",
          dueDate: "2024-03-31",
          milestones: [
            { id: "M-006", title: "User authentication", completed: true, dueDate: "2024-02-05" },
            { id: "M-007", title: "Core dashboard", completed: true, dueDate: "2024-02-20" },
            { id: "M-008", title: "Payment integration", completed: false, dueDate: "2024-03-10" },
            { id: "M-009", title: "Testing and QA", completed: false, dueDate: "2024-03-25" },
          ],
        },
      ],
      comments: [],
      createdBy: "Admin User",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date(Date.now() - 30 * 60 * 1000),
      tags: ["mobile", "development", "mvp"],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedOKR, setSelectedOKR] = useState<OKR | null>(null);
  const [showCreateOKR, setShowCreateOKR] = useState(false);
  const [newComment, setNewComment] = useState("");
  
  // New OKR form state
  const [newOKR, setNewOKR] = useState({
    title: "",
    description: "",
    type: "team" as "team" | "individual",
    assignedTo: "",
    quarter: "Q1",
    year: 2024,
    priority: "medium" as "low" | "medium" | "high" | "critical",
    tags: [] as string[],
    keyResults: [] as Omit<KeyResult, "id">[],
  });
  const [newTag, setNewTag] = useState("");
  const [newKeyResult, setNewKeyResult] = useState({
    title: "",
    description: "",
    targetValue: 0,
    unit: "",
    dueDate: "",
    milestones: [] as Omit<Milestone, "id">[],
  });
  const [newMilestone, setNewMilestone] = useState({ title: "", dueDate: "" });

  // Available teams and individuals
  const availableTeams = [
    { id: "customer-support", name: "Customer Support Team" },
    { id: "engineering", name: "Engineering Team" },
    { id: "marketing", name: "Marketing Team" },
    { id: "sales", name: "Sales Team" },
    { id: "design", name: "Design Team" },
  ];

  const availableIndividuals = [
    { email: "john@company.com", name: "John Doe", role: "Project Manager" },
    { email: "sarah@company.com", name: "Sarah Wilson", role: "Lead Developer" },
    { email: "mike@company.com", name: "Mike Chen", role: "UI/UX Designer" },
    { email: "alex@company.com", name: "Alex Rodriguez", role: "Backend Developer" },
    { email: "emma@company.com", name: "Emma Davis", role: "QA Engineer" },
  ];

  const calculateOKRProgress = (okr: OKR) => {
    if (okr.keyResults.length === 0) return 0;
    const totalProgress = okr.keyResults.reduce((sum, kr) => {
      return sum + (kr.currentValue / kr.targetValue) * 100;
    }, 0);
    return Math.min(100, Math.round(totalProgress / okr.keyResults.length));
  };

  const calculateKeyResultProgress = (keyResult: KeyResult) => {
    return Math.min(100, Math.round((keyResult.currentValue / keyResult.targetValue) * 100));
  };

  const calculateMilestoneProgress = (milestones: Milestone[]) => {
    if (milestones.length === 0) return 0;
    const completed = milestones.filter(m => m.completed).length;
    return Math.round((completed / milestones.length) * 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-gray-100 text-gray-800";
      case "active": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "paused": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low": return "bg-green-100 text-green-800 border-green-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const addComment = (okrId: string) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `C-${Date.now()}`,
      author: "Admin User",
      content: newComment.trim(),
      timestamp: new Date(),
    };

    setOKRs(okrs.map(okr => 
      okr.id === okrId 
        ? { ...okr, comments: [...okr.comments, comment] }
        : okr
    ));

    setNewComment("");
    toast({
      title: "Comment Added",
      description: "Your comment has been added to the OKR.",
    });
  };

  const toggleMilestone = (okrId: string, keyResultId: string, milestoneId: string) => {
    setOKRs(okrs.map(okr => {
      if (okr.id === okrId) {
        const updatedKeyResults = okr.keyResults.map(kr => {
          if (kr.id === keyResultId) {
            const updatedMilestones = kr.milestones.map(m => 
              m.id === milestoneId ? { ...m, completed: !m.completed } : m
            );
            return { ...kr, milestones: updatedMilestones };
          }
          return kr;
        });
        return { ...okr, keyResults: updatedKeyResults };
      }
      return okr;
    }));

    toast({
      title: "Milestone Updated",
      description: "Milestone status has been updated.",
    });
  };

  const createOKR = () => {
    if (!newOKR.title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter an OKR title.",
        variant: "destructive",
      });
      return;
    }

    if (!newOKR.assignedTo) {
      toast({
        title: "Assignment Required",
        description: "Please assign the OKR to a team or individual.",
        variant: "destructive",
      });
      return;
    }

    let assigneeName = "";
    if (newOKR.type === "team") {
      const team = availableTeams.find(t => t.id === newOKR.assignedTo);
      assigneeName = team?.name || "";
    } else {
      const individual = availableIndividuals.find(i => i.email === newOKR.assignedTo);
      assigneeName = individual?.name || "";
    }

    const okr: OKR = {
      id: `OKR-${String(okrs.length + 1).padStart(3, "0")}`,
      title: newOKR.title,
      description: newOKR.description,
      type: newOKR.type,
      assignedTo: newOKR.assignedTo,
      assigneeName,
      quarter: newOKR.quarter,
      year: newOKR.year,
      status: "draft",
      priority: newOKR.priority,
      keyResults: newOKR.keyResults.map((kr, index) => ({
        ...kr,
        id: `KR-${Date.now()}-${index}`,
        currentValue: 0,
        milestones: kr.milestones.map((m, mIndex) => ({
          ...m,
          id: `M-${Date.now()}-${mIndex}`,
          completed: false,
        })),
      })),
      comments: [],
      createdBy: "Admin User",
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: newOKR.tags,
    };

    setOKRs([...okrs, okr]);
    setShowCreateOKR(false);
    
    // Reset form
    setNewOKR({
      title: "",
      description: "",
      type: "team",
      assignedTo: "",
      quarter: "Q1",
      year: 2024,
      priority: "medium",
      tags: [],
      keyResults: [],
    });

    toast({
      title: "OKR Created",
      description: `OKR "${okr.title}" has been created successfully.`,
    });
  };

  // KPI Data
  const kpiData = {
    totalOKRs: okrs.length,
    activeOKRs: okrs.filter(o => o.status === "active").length,
    completedOKRs: okrs.filter(o => o.status === "completed").length,
    averageProgress: Math.round(okrs.reduce((sum, o) => sum + calculateOKRProgress(o), 0) / okrs.length),
    teamOKRs: okrs.filter(o => o.type === "team").length,
    individualOKRs: okrs.filter(o => o.type === "individual").length,
  };

  const progressData = okrs.map(okr => ({
    name: okr.title.substring(0, 20) + "...",
    progress: calculateOKRProgress(okr),
    status: okr.status,
  }));

  const filteredOKRs = okrs.filter(okr => {
    const matchesSearch = okr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         okr.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         okr.assigneeName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || okr.status === statusFilter;
    const matchesType = typeFilter === "all" || okr.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">OKRs Management</h1>
          <p className="text-muted-foreground">
            Create and track Objectives and Key Results for teams and individuals
          </p>
        </div>
        <Dialog open={showCreateOKR} onOpenChange={setShowCreateOKR}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create OKR
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New OKR</DialogTitle>
              <DialogDescription>
                Set objectives and key results for teams or individuals
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="objective" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="objective">Objective</TabsTrigger>
                <TabsTrigger value="keyresults">Key Results</TabsTrigger>
                <TabsTrigger value="assignment">Assignment</TabsTrigger>
              </TabsList>
              
              <TabsContent value="objective" className="space-y-4 mt-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="okrTitle">Objective Title *</Label>
                    <Input
                      id="okrTitle"
                      placeholder="Enter objective title"
                      value={newOKR.title}
                      onChange={(e) => setNewOKR({ ...newOKR, title: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="okrDescription">Description</Label>
                    <Textarea
                      id="okrDescription"
                      placeholder="Describe the objective..."
                      value={newOKR.description}
                      onChange={(e) => setNewOKR({ ...newOKR, description: e.target.value })}
                      rows={4}
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label>Priority</Label>
                      <Select value={newOKR.priority} onValueChange={(value) => setNewOKR({ ...newOKR, priority: value as any })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Quarter</Label>
                      <Select value={newOKR.quarter} onValueChange={(value) => setNewOKR({ ...newOKR, quarter: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Q1">Q1</SelectItem>
                          <SelectItem value="Q2">Q2</SelectItem>
                          <SelectItem value="Q3">Q3</SelectItem>
                          <SelectItem value="Q4">Q4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Year</Label>
                      <Input
                        type="number"
                        value={newOKR.year}
                        onChange={(e) => setNewOKR({ ...newOKR, year: parseInt(e.target.value) || 2024 })}
                        min="2024"
                        max="2030"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="keyresults" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <Label>Key Results</Label>
                  
                  {newOKR.keyResults.map((kr, index) => (
                    <Card key={index} className="border border-muted">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <h4 className="font-medium">{kr.title}</h4>
                            <p className="text-sm text-muted-foreground">{kr.description}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span>Target: {kr.targetValue} {kr.unit}</span>
                              <span>Due: {new Date(kr.dueDate).toLocaleDateString()}</span>
                              <span>Milestones: {kr.milestones.length}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setNewOKR({
                              ...newOKR,
                              keyResults: newOKR.keyResults.filter((_, i) => i !== index)
                            })}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Key Result
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Key Result</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label>Title *</Label>
                          <Input
                            value={newKeyResult.title}
                            onChange={(e) => setNewKeyResult({ ...newKeyResult, title: e.target.value })}
                            placeholder="Enter key result title"
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label>Description</Label>
                          <Textarea
                            value={newKeyResult.description}
                            onChange={(e) => setNewKeyResult({ ...newKeyResult, description: e.target.value })}
                            placeholder="Describe the key result..."
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label>Target Value *</Label>
                            <Input
                              type="number"
                              value={newKeyResult.targetValue || ""}
                              onChange={(e) => setNewKeyResult({ ...newKeyResult, targetValue: parseFloat(e.target.value) || 0 })}
                              placeholder="100"
                            />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label>Unit</Label>
                            <Input
                              value={newKeyResult.unit}
                              onChange={(e) => setNewKeyResult({ ...newKeyResult, unit: e.target.value })}
                              placeholder="%"
                            />
                          </div>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label>Due Date</Label>
                          <Input
                            type="date"
                            value={newKeyResult.dueDate}
                            onChange={(e) => setNewKeyResult({ ...newKeyResult, dueDate: e.target.value })}
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label>Milestones</Label>
                          {newKeyResult.milestones.map((milestone, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded">
                              <div>
                                <div className="text-sm font-medium">{milestone.title}</div>
                                <div className="text-xs text-muted-foreground">
                                  Due: {new Date(milestone.dueDate).toLocaleDateString()}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setNewKeyResult({
                                  ...newKeyResult,
                                  milestones: newKeyResult.milestones.filter((_, i) => i !== index)
                                })}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              placeholder="Milestone title"
                              value={newMilestone.title}
                              onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                            />
                            <Input
                              type="date"
                              value={newMilestone.dueDate}
                              onChange={(e) => setNewMilestone({ ...newMilestone, dueDate: e.target.value })}
                            />
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (newMilestone.title && newMilestone.dueDate) {
                                setNewKeyResult({
                                  ...newKeyResult,
                                  milestones: [...newKeyResult.milestones, newMilestone]
                                });
                                setNewMilestone({ title: "", dueDate: "" });
                              }
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Milestone
                          </Button>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={() => {
                            if (newKeyResult.title && newKeyResult.targetValue > 0) {
                              setNewOKR({
                                ...newOKR,
                                keyResults: [...newOKR.keyResults, newKeyResult]
                              });
                              setNewKeyResult({
                                title: "",
                                description: "",
                                targetValue: 0,
                                unit: "",
                                dueDate: "",
                                milestones: [],
                              });
                            }
                          }}
                        >
                          Add Key Result
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </TabsContent>
              
              <TabsContent value="assignment" className="space-y-4 mt-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Assignment Type</Label>
                    <Select value={newOKR.type} onValueChange={(value) => setNewOKR({ ...newOKR, type: value as any, assignedTo: "" })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="team">Team</SelectItem>
                        <SelectItem value="individual">Individual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Assign To *</Label>
                    <Select value={newOKR.assignedTo} onValueChange={(value) => setNewOKR({ ...newOKR, assignedTo: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${newOKR.type}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {newOKR.type === "team" 
                          ? availableTeams.map(team => (
                              <SelectItem key={team.id} value={team.id}>
                                <div className="flex items-center gap-2">
                                  <Building className="h-4 w-4" />
                                  {team.name}
                                </div>
                              </SelectItem>
                            ))
                          : availableIndividuals.map(individual => (
                              <SelectItem key={individual.email} value={individual.email}>
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4" />
                                  <div>
                                    <div className="font-medium">{individual.name}</div>
                                    <div className="text-xs text-muted-foreground">{individual.role}</div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setShowCreateOKR(false)}>
                Cancel
              </Button>
              <Button onClick={createOKR} disabled={!newOKR.title.trim() || !newOKR.assignedTo}>
                <Target className="h-4 w-4 mr-2" />
                Create OKR
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="okrs">OKRs</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="kpis">KPIs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{kpiData.totalOKRs}</div>
                <div className="text-xs text-muted-foreground">Total OKRs</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Activity className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{kpiData.activeOKRs}</div>
                <div className="text-xs text-muted-foreground">Active</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-emerald-500" />
                <div className="text-2xl font-bold">{kpiData.completedOKRs}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                <div className="text-2xl font-bold">{kpiData.averageProgress}%</div>
                <div className="text-xs text-muted-foreground">Avg Progress</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold">{kpiData.teamOKRs}</div>
                <div className="text-xs text-muted-foreground">Team OKRs</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <User className="h-8 w-8 mx-auto mb-2 text-cyan-500" />
                <div className="text-2xl font-bold">{kpiData.individualOKRs}</div>
                <div className="text-xs text-muted-foreground">Individual</div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>OKR Progress Overview</CardTitle>
              <CardDescription>Progress tracking across all active OKRs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="okrs" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search OKRs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* OKRs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOKRs.map((okr) => {
              const progress = calculateOKRProgress(okr);
              return (
                <Card key={okr.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{okr.title}</CardTitle>
                          {okr.type === "team" ? (
                            <Building className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <User className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(okr.status)}>
                            {okr.status}
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(okr.priority)}>
                            {okr.priority}
                          </Badge>
                          <Badge variant="secondary">{okr.quarter} {okr.year}</Badge>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedOKR(okr)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit OKR
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete OKR
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {okr.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Overall Progress</span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Assigned to</span>
                        <span className="font-medium">{okr.assigneeName}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Key Results</span>
                        <span className="font-medium">{okr.keyResults.length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Comments</span>
                        <span className="font-medium">{okr.comments.length}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setSelectedOKR(okr)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {okrs.map((okr) => (
              <Card key={okr.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{okr.title}</span>
                    <Badge className={getStatusColor(okr.status)}>{okr.status}</Badge>
                  </CardTitle>
                  <CardDescription>{okr.assigneeName}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {okr.keyResults.map((kr) => {
                    const krProgress = calculateKeyResultProgress(kr);
                    const milestoneProgress = calculateMilestoneProgress(kr.milestones);
                    
                    return (
                      <div key={kr.id} className="space-y-3 p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{kr.title}</h4>
                          <span className="text-xs text-muted-foreground">
                            {kr.currentValue}/{kr.targetValue} {kr.unit}
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{krProgress}%</span>
                          </div>
                          <Progress value={krProgress} className="h-1" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Milestones</span>
                            <span>{milestoneProgress}%</span>
                          </div>
                          <Progress value={milestoneProgress} className="h-1" />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="kpis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>OKR Distribution</CardTitle>
                <CardDescription>Breakdown by status and type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active OKRs</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(kpiData.activeOKRs / kpiData.totalOKRs) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{kpiData.activeOKRs}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Team OKRs</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(kpiData.teamOKRs / kpiData.totalOKRs) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{kpiData.teamOKRs}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Individual OKRs</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${(kpiData.individualOKRs / kpiData.totalOKRs) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{kpiData.individualOKRs}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Progress Analytics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{kpiData.averageProgress}%</div>
                    <div className="text-sm text-muted-foreground">Average Progress</div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>On Track OKRs</span>
                      <span className="font-medium text-green-600">
                        {okrs.filter(o => calculateOKRProgress(o) >= 70).length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>At Risk OKRs</span>
                      <span className="font-medium text-yellow-600">
                        {okrs.filter(o => calculateOKRProgress(o) >= 40 && calculateOKRProgress(o) < 70).length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Behind OKRs</span>
                      <span className="font-medium text-red-600">
                        {okrs.filter(o => calculateOKRProgress(o) < 40).length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* OKR Detail Dialog */}
      <Dialog open={selectedOKR !== null} onOpenChange={() => setSelectedOKR(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedOKR && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-xl">{selectedOKR.title}</DialogTitle>
                    <DialogDescription>{selectedOKR.description}</DialogDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(selectedOKR.status)}>
                      {selectedOKR.status}
                    </Badge>
                    <Badge variant="outline" className={getPriorityColor(selectedOKR.priority)}>
                      {selectedOKR.priority}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="milestones">Milestones</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 mt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Assigned To</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedOKR.assigneeName} ({selectedOKR.type})
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Timeline</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedOKR.quarter} {selectedOKR.year}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Key Results</Label>
                    {selectedOKR.keyResults.map((kr) => {
                      const progress = calculateKeyResultProgress(kr);
                      return (
                        <Card key={kr.id} className="border border-muted">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-medium">{kr.title}</h4>
                                  <p className="text-sm text-muted-foreground">{kr.description}</p>
                                </div>
                                <Badge variant="outline">
                                  {kr.currentValue}/{kr.targetValue} {kr.unit}
                                </Badge>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Progress</span>
                                  <span>{progress}%</span>
                                </div>
                                <Progress value={progress} className="h-2" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="milestones" className="space-y-4 mt-6">
                  {selectedOKR.keyResults.map((kr) => (
                    <Card key={kr.id} className="border border-muted">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">{kr.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {kr.milestones.map((milestone) => (
                            <div key={milestone.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                              <Checkbox
                                checked={milestone.completed}
                                onCheckedChange={() => toggleMilestone(selectedOKR.id, kr.id, milestone.id)}
                              />
                              <div className="flex-1">
                                <span className={`text-sm ${milestone.completed ? "line-through text-muted-foreground" : ""}`}>
                                  {milestone.title}
                                </span>
                                <div className="text-xs text-muted-foreground">
                                  Due: {new Date(milestone.dueDate).toLocaleDateString()}
                                </div>
                              </div>
                              {milestone.completed && (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="comments" className="space-y-4 mt-6">
                  <div className="space-y-4 max-h-60 overflow-y-auto">
                    {selectedOKR.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.avatar} />
                          <AvatarFallback className="text-xs">
                            {comment.author.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">
                              {comment.timestamp.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                    />
                    <Button
                      size="sm"
                      onClick={() => addComment(selectedOKR.id)}
                      disabled={!newComment.trim()}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Add Comment
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OKRs;
