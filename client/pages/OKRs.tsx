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
  Target,
  Users,
  Calendar,
  BarChart3,
  Edit,
  MessageSquare,
  AtSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Building,
  User,
  FileText,
  Download,
  Filter,
  Search,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completed: boolean;
  completedDate?: string;
}

interface KeyResult {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  weight: number;
  milestones: Milestone[];
}

interface OKR {
  id: string;
  title: string;
  description: string;
  objective: string;
  keyResults: KeyResult[];
  assignedTo: string[];
  assignedTeams: string[];
  assignedDepartments: string[];
  quarter: string;
  year: number;
  startDate: string;
  endDate: string;
  status: "draft" | "active" | "completed" | "cancelled";
  progress: number;
  comments: Comment[];
  createdBy: string;
  createdDate: string;
  lastUpdated: string;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  taggedUsers: string[];
  timestamp: string;
}

interface KPI {
  id: string;
  name: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  category: "individual" | "team" | "department";
  assignedTo: string;
  period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
  trend: "up" | "down" | "stable";
  lastUpdated: string;
}

const OKRs = () => {
  const [okrs, setOkrs] = useState<OKR[]>([
    {
      id: "OKR-001",
      title: "Increase Customer Satisfaction",
      description:
        "Improve overall customer satisfaction scores and reduce response times",
      objective: "Achieve 95% customer satisfaction rating",
      keyResults: [
        {
          id: "KR-001",
          title: "Customer Satisfaction Score",
          description: "Achieve 95% customer satisfaction rating",
          targetValue: 95,
          currentValue: 87,
          unit: "%",
          weight: 40,
          milestones: [
            {
              id: "MS-001",
              title: "Implement new feedback system",
              description: "Deploy customer feedback collection system",
              targetDate: "2024-02-15",
              completed: true,
              completedDate: "2024-02-10",
            },
            {
              id: "MS-002",
              title: "Train support team",
              description:
                "Complete customer service training for all support staff",
              targetDate: "2024-03-01",
              completed: false,
            },
          ],
        },
        {
          id: "KR-002",
          title: "Response Time",
          description: "Reduce average response time to under 2 hours",
          targetValue: 2,
          currentValue: 3.5,
          unit: "hours",
          weight: 35,
          milestones: [],
        },
      ],
      assignedTo: ["john.doe", "sarah.wilson"],
      assignedTeams: ["Customer Success"],
      assignedDepartments: ["Customer Support"],
      quarter: "Q1",
      year: 2024,
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      status: "active",
      progress: 65,
      comments: [
        {
          id: "C-001",
          author: "Admin User",
          content:
            "Great progress on the feedback system! @john.doe please update on training progress.",
          taggedUsers: ["john.doe"],
          timestamp: "2024-01-15T10:30:00Z",
        },
      ],
      createdBy: "Admin User",
      createdDate: "2024-01-01",
      lastUpdated: "2024-01-15",
    },
  ]);

  const [kpis, setKpis] = useState<KPI[]>([
    {
      id: "KPI-001",
      name: "Customer Satisfaction",
      description: "Overall customer satisfaction percentage",
      targetValue: 95,
      currentValue: 87,
      unit: "%",
      category: "department",
      assignedTo: "Customer Support",
      period: "monthly",
      trend: "up",
      lastUpdated: "2024-01-15",
    },
    {
      id: "KPI-002",
      name: "Response Time",
      description: "Average customer response time",
      targetValue: 2,
      currentValue: 3.5,
      unit: "hours",
      category: "team",
      assignedTo: "Customer Success",
      period: "weekly",
      trend: "down",
      lastUpdated: "2024-01-15",
    },
  ]);

  const [showOKRDialog, setShowOKRDialog] = useState(false);
  const [showKPIDialog, setShowKPIDialog] = useState(false);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [selectedOKR, setSelectedOKR] = useState<OKR | null>(null);
  const [editingOKR, setEditingOKR] = useState<OKR | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [quarterFilter, setQuarterFilter] = useState("all");

  const [newOKR, setNewOKR] = useState<Partial<OKR>>({
    title: "",
    description: "",
    objective: "",
    keyResults: [],
    assignedTo: [],
    assignedTeams: [],
    assignedDepartments: [],
    quarter: "Q1",
    year: 2024,
    startDate: "",
    endDate: "",
    status: "draft",
  });

  const [newComment, setNewComment] = useState({
    content: "",
    taggedUsers: [] as string[],
  });

  const [newKeyResult, setNewKeyResult] = useState<Partial<KeyResult>>({
    title: "",
    description: "",
    targetValue: 0,
    currentValue: 0,
    unit: "",
    weight: 0,
    milestones: [],
  });

  const teamMembers = [
    { id: "john.doe", name: "John Doe", department: "Engineering" },
    { id: "sarah.wilson", name: "Sarah Wilson", department: "Design" },
    { id: "mike.chen", name: "Mike Chen", department: "Marketing" },
    { id: "alex.rodriguez", name: "Alex Rodriguez", department: "Sales" },
  ];

  const teams = [
    "Engineering",
    "Design",
    "Marketing",
    "Sales",
    "Customer Success",
  ];
  const departments = [
    "Engineering",
    "Design",
    "Marketing",
    "Sales",
    "Customer Support",
    "HR",
    "Finance",
  ];

  const calculateOKRProgress = (okr: OKR) => {
    const totalWeight = okr.keyResults.reduce((sum, kr) => sum + kr.weight, 0);
    const weightedProgress = okr.keyResults.reduce((sum, kr) => {
      const progress = (kr.currentValue / kr.targetValue) * 100;
      return sum + (progress * kr.weight) / 100;
    }, 0);
    return totalWeight > 0 ? (weightedProgress / totalWeight) * 100 : 0;
  };

  const saveOKR = () => {
    if (
      !newOKR.title ||
      !newOKR.objective ||
      !newOKR.startDate ||
      !newOKR.endDate
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const okr: OKR = {
      id: editingOKR ? editingOKR.id : `OKR-${Date.now().toString().slice(-3)}`,
      ...newOKR,
      keyResults: newOKR.keyResults || [],
      assignedTo: newOKR.assignedTo || [],
      assignedTeams: newOKR.assignedTeams || [],
      assignedDepartments: newOKR.assignedDepartments || [],
      progress: 0,
      comments: editingOKR?.comments || [],
      createdBy: "Admin User",
      createdDate:
        editingOKR?.createdDate || new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
    } as OKR;

    okr.progress = calculateOKRProgress(okr);

    if (editingOKR) {
      setOkrs(okrs.map((o) => (o.id === editingOKR.id ? okr : o)));
      toast({
        title: "OKR Updated",
        description: `OKR "${okr.title}" has been updated successfully.`,
      });
    } else {
      setOkrs([...okrs, okr]);
      toast({
        title: "OKR Created",
        description: `OKR "${okr.title}" has been created successfully.`,
      });
    }

    setShowOKRDialog(false);
    setEditingOKR(null);
    setNewOKR({
      title: "",
      description: "",
      objective: "",
      keyResults: [],
      assignedTo: [],
      assignedTeams: [],
      assignedDepartments: [],
      quarter: "Q1",
      year: 2024,
      startDate: "",
      endDate: "",
      status: "draft",
    });
  };

  const addKeyResult = () => {
    if (!newKeyResult.title || !newKeyResult.targetValue) {
      toast({
        title: "Missing Information",
        description: "Please fill in key result title and target value.",
        variant: "destructive",
      });
      return;
    }

    const keyResult: KeyResult = {
      id: `KR-${Date.now().toString().slice(-3)}`,
      ...newKeyResult,
      milestones: [],
    } as KeyResult;

    setNewOKR({
      ...newOKR,
      keyResults: [...(newOKR.keyResults || []), keyResult],
    });

    setNewKeyResult({
      title: "",
      description: "",
      targetValue: 0,
      currentValue: 0,
      unit: "",
      weight: 0,
      milestones: [],
    });
  };

  const addComment = () => {
    if (!newComment.content || !selectedOKR) return;

    const comment: Comment = {
      id: `C-${Date.now()}`,
      author: "Admin User",
      content: newComment.content,
      taggedUsers: newComment.taggedUsers,
      timestamp: new Date().toISOString(),
    };

    const updatedOKR = {
      ...selectedOKR,
      comments: [...selectedOKR.comments, comment],
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setOkrs(okrs.map((okr) => (okr.id === selectedOKR.id ? updatedOKR : okr)));
    setSelectedOKR(updatedOKR);

    setNewComment({ content: "", taggedUsers: [] });

    toast({
      title: "Comment Added",
      description: "Your comment has been added to the OKR.",
    });
  };

  const editOKR = (okr: OKR) => {
    setEditingOKR(okr);
    setNewOKR(okr);
    setShowOKRDialog(true);
  };

  const generateKPIs = () => {
    const newKPIs: KPI[] = [];

    okrs.forEach((okr) => {
      okr.keyResults.forEach((kr) => {
        const kpi: KPI = {
          id: `KPI-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: kr.title,
          description: kr.description,
          targetValue: kr.targetValue,
          currentValue: kr.currentValue,
          unit: kr.unit,
          category:
            okr.assignedDepartments.length > 0
              ? "department"
              : okr.assignedTeams.length > 0
                ? "team"
                : "individual",
          assignedTo:
            okr.assignedDepartments[0] ||
            okr.assignedTeams[0] ||
            okr.assignedTo[0] ||
            "",
          period: "monthly",
          trend:
            kr.currentValue >= kr.targetValue * 0.8
              ? "up"
              : kr.currentValue >= kr.targetValue * 0.5
                ? "stable"
                : "down",
          lastUpdated: new Date().toISOString().split("T")[0],
        };
        newKPIs.push(kpi);
      });
    });

    setKpis([...kpis, ...newKPIs]);

    toast({
      title: "KPIs Generated",
      description: `Generated ${newKPIs.length} KPIs from active OKRs.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0";
      case "active":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0";
      case "completed":
        return "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0";
      case "cancelled":
        return "bg-gradient-to-r from-red-500 to-red-600 text-white border-0";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "stable":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredOKRs = okrs.filter((okr) => {
    const matchesSearch =
      okr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      okr.objective.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || okr.status === statusFilter;
    const matchesQuarter =
      quarterFilter === "all" || okr.quarter === quarterFilter;

    return matchesSearch && matchesStatus && matchesQuarter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              OKRs Management
            </h1>
            <p className="text-lg text-slate-600">
              Manage Objectives and Key Results with team assignments and KPI
              generation
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={generateKPIs}
              className="border-2 border-amber-300 hover:bg-amber-50 text-amber-700"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate KPIs
            </Button>
            <Dialog open={showOKRDialog} onOpenChange={setShowOKRDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Create OKR
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl bg-gradient-to-br from-white to-slate-50">
                <DialogHeader>
                  <DialogTitle className="text-2xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    {editingOKR ? "Edit OKR" : "Create New OKR"}
                  </DialogTitle>
                  <DialogDescription className="text-slate-600">
                    Define objectives, key results, and assign to team members
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="title" className="text-slate-700 font-medium">OKR Title *</Label>
                      <Input
                        id="title"
                        value={newOKR.title}
                        onChange={(e) =>
                          setNewOKR({ ...newOKR, title: e.target.value })
                        }
                        placeholder="Enter OKR title"
                        className="border-2 border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="objective" className="text-slate-700 font-medium">Main Objective *</Label>
                      <Textarea
                        id="objective"
                        value={newOKR.objective}
                        onChange={(e) =>
                          setNewOKR({ ...newOKR, objective: e.target.value })
                        }
                        placeholder="Define the main objective..."
                        rows={3}
                        className="border-2 border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="description" className="text-slate-700 font-medium">Description</Label>
                      <Textarea
                        id="description"
                        value={newOKR.description}
                        onChange={(e) =>
                          setNewOKR({ ...newOKR, description: e.target.value })
                        }
                        placeholder="Provide additional context..."
                        rows={2}
                        className="border-2 border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quarter" className="text-slate-700 font-medium">Quarter</Label>
                      <Select
                        value={newOKR.quarter}
                        onValueChange={(value) =>
                          setNewOKR({ ...newOKR, quarter: value })
                        }
                      >
                        <SelectTrigger className="border-2 border-slate-200 focus:border-amber-400">
                          <SelectValue placeholder="Select quarter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Q1">Q1 2024</SelectItem>
                          <SelectItem value="Q2">Q2 2024</SelectItem>
                          <SelectItem value="Q3">Q3 2024</SelectItem>
                          <SelectItem value="Q4">Q4 2024</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status" className="text-slate-700 font-medium">Status</Label>
                      <Select
                        value={newOKR.status}
                        onValueChange={(value) =>
                          setNewOKR({ ...newOKR, status: value as any })
                        }
                      >
                        <SelectTrigger className="border-2 border-slate-200 focus:border-amber-400">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="startDate" className="text-slate-700 font-medium">Start Date *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newOKR.startDate}
                        onChange={(e) =>
                          setNewOKR({ ...newOKR, startDate: e.target.value })
                        }
                        className="border-2 border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate" className="text-slate-700 font-medium">End Date *</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={newOKR.endDate}
                        onChange={(e) =>
                          setNewOKR({ ...newOKR, endDate: e.target.value })
                        }
                        className="border-2 border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                      />
                    </div>
                  </div>

                  {/* Team Assignment */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800">Assignment</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-slate-700 font-medium">Team Members</Label>
                        <div className="border-2 border-slate-200 rounded-lg p-3 max-h-32 overflow-y-auto bg-gradient-to-r from-slate-50 to-slate-100">
                          {teamMembers.map((member) => (
                            <div
                              key={member.id}
                              className="flex items-center space-x-2 mb-2"
                            >
                              <Checkbox
                                checked={newOKR.assignedTo?.includes(member.id)}
                                onCheckedChange={(checked) => {
                                  const assignedTo = newOKR.assignedTo || [];
                                  if (checked) {
                                    setNewOKR({
                                      ...newOKR,
                                      assignedTo: [...assignedTo, member.id],
                                    });
                                  } else {
                                    setNewOKR({
                                      ...newOKR,
                                      assignedTo: assignedTo.filter(
                                        (id) => id !== member.id,
                                      ),
                                    });
                                  }
                                }}
                              />
                              <Label className="text-sm">{member.name}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-slate-700 font-medium">Teams</Label>
                        <div className="border-2 border-slate-200 rounded-lg p-3 max-h-32 overflow-y-auto bg-gradient-to-r from-slate-50 to-slate-100">
                          {teams.map((team) => (
                            <div
                              key={team}
                              className="flex items-center space-x-2 mb-2"
                            >
                              <Checkbox
                                checked={newOKR.assignedTeams?.includes(team)}
                                onCheckedChange={(checked) => {
                                  const assignedTeams =
                                    newOKR.assignedTeams || [];
                                  if (checked) {
                                    setNewOKR({
                                      ...newOKR,
                                      assignedTeams: [...assignedTeams, team],
                                    });
                                  } else {
                                    setNewOKR({
                                      ...newOKR,
                                      assignedTeams: assignedTeams.filter(
                                        (t) => t !== team,
                                      ),
                                    });
                                  }
                                }}
                              />
                              <Label className="text-sm">{team}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-slate-700 font-medium">Departments</Label>
                        <div className="border-2 border-slate-200 rounded-lg p-3 max-h-32 overflow-y-auto bg-gradient-to-r from-slate-50 to-slate-100">
                          {departments.map((dept) => (
                            <div
                              key={dept}
                              className="flex items-center space-x-2 mb-2"
                            >
                              <Checkbox
                                checked={newOKR.assignedDepartments?.includes(
                                  dept,
                                )}
                                onCheckedChange={(checked) => {
                                  const assignedDepartments =
                                    newOKR.assignedDepartments || [];
                                  if (checked) {
                                    setNewOKR({
                                      ...newOKR,
                                      assignedDepartments: [
                                        ...assignedDepartments,
                                        dept,
                                      ],
                                    });
                                  } else {
                                    setNewOKR({
                                      ...newOKR,
                                      assignedDepartments:
                                        assignedDepartments.filter(
                                          (d) => d !== dept,
                                        ),
                                    });
                                  }
                                }}
                              />
                              <Label className="text-sm">{dept}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Results */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800">Key Results</h3>
                    <div className="border-2 border-amber-200 rounded-lg p-4 bg-gradient-to-r from-amber-50 to-orange-50">
                      <h4 className="font-medium mb-3 text-amber-800">Add Key Result</h4>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <Input
                          placeholder="Key Result Title"
                          value={newKeyResult.title}
                          onChange={(e) =>
                            setNewKeyResult({
                              ...newKeyResult,
                              title: e.target.value,
                            })
                          }
                          className="border-2 border-amber-200 focus:border-amber-400"
                        />
                        <Input
                          placeholder="Description"
                          value={newKeyResult.description}
                          onChange={(e) =>
                            setNewKeyResult({
                              ...newKeyResult,
                              description: e.target.value,
                            })
                          }
                          className="border-2 border-amber-200 focus:border-amber-400"
                        />
                        <Input
                          type="number"
                          placeholder="Target Value"
                          value={newKeyResult.targetValue}
                          onChange={(e) =>
                            setNewKeyResult({
                              ...newKeyResult,
                              targetValue: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="border-2 border-amber-200 focus:border-amber-400"
                        />
                        <Input
                          type="number"
                          placeholder="Current Value"
                          value={newKeyResult.currentValue}
                          onChange={(e) =>
                            setNewKeyResult({
                              ...newKeyResult,
                              currentValue: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="border-2 border-amber-200 focus:border-amber-400"
                        />
                        <Input
                          placeholder="Unit (%, hours, etc.)"
                          value={newKeyResult.unit}
                          onChange={(e) =>
                            setNewKeyResult({
                              ...newKeyResult,
                              unit: e.target.value,
                            })
                          }
                          className="border-2 border-amber-200 focus:border-amber-400"
                        />
                        <Input
                          type="number"
                          placeholder="Weight (%)"
                          value={newKeyResult.weight}
                          onChange={(e) =>
                            setNewKeyResult({
                              ...newKeyResult,
                              weight: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="border-2 border-amber-200 focus:border-amber-400"
                        />
                      </div>
                      <Button
                        onClick={addKeyResult}
                        size="sm"
                        className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Key Result
                      </Button>
                    </div>

                    {/* Display Added Key Results */}
                    {newOKR.keyResults && newOKR.keyResults.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-slate-800">Added Key Results:</h4>
                        {newOKR.keyResults.map((kr, index) => (
                          <div key={index} className="border-2 border-slate-200 rounded-lg p-3 bg-gradient-to-r from-white to-slate-50">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium text-slate-800">{kr.title}</div>
                                <div className="text-sm text-muted-foreground">
                                  {kr.description}
                                </div>
                                <div className="text-sm">
                                  Target: {kr.targetValue} {kr.unit} | Current:{" "}
                                  {kr.currentValue} {kr.unit} | Weight:{" "}
                                  {kr.weight}%
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const updatedKRs =
                                    newOKR.keyResults?.filter(
                                      (_, i) => i !== index,
                                    ) || [];
                                  setNewOKR({
                                    ...newOKR,
                                    keyResults: updatedKRs,
                                  });
                                }}
                                className="border-2 border-red-300 hover:bg-red-50 text-red-700"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowOKRDialog(false);
                      setEditingOKR(null);
                    }}
                    className="border-2 border-slate-300 hover:bg-slate-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={saveOKR}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0"
                  >
                    {editingOKR ? "Update" : "Create"} OKR
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-100">
                    Total OKRs
                  </p>
                  <div className="text-3xl font-bold">{okrs.length}</div>
                </div>
                <Target className="h-8 w-8 text-amber-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-100">
                    Active OKRs
                  </p>
                  <div className="text-3xl font-bold">
                    {okrs.filter((okr) => okr.status === "active").length}
                  </div>
                </div>
                <CheckCircle className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-100">
                    Average Progress
                  </p>
                  <div className="text-3xl font-bold">
                    {Math.round(
                      okrs.reduce((sum, okr) => sum + okr.progress, 0) /
                        okrs.length,
                    )}
                    %
                  </div>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-500 to-violet-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-100">
                    Generated KPIs
                  </p>
                  <div className="text-3xl font-bold">
                    {kpis.length}
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="okrs" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl p-1 h-12">
            <TabsTrigger value="okrs" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white rounded-lg">OKRs Overview</TabsTrigger>
            <TabsTrigger value="kpis" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white rounded-lg">KPIs Dashboard</TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white rounded-lg">Progress Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="okrs" className="space-y-6">
            {/* Filters */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-slate-50">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search OKRs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-2 border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full lg:w-[180px] border-2 border-slate-200 focus:border-amber-400">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={quarterFilter} onValueChange={setQuarterFilter}>
                    <SelectTrigger className="w-full lg:w-[180px] border-2 border-slate-200 focus:border-amber-400">
                      <SelectValue placeholder="Filter by quarter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Quarters</SelectItem>
                      <SelectItem value="Q1">Q1 2024</SelectItem>
                      <SelectItem value="Q2">Q2 2024</SelectItem>
                      <SelectItem value="Q3">Q3 2024</SelectItem>
                      <SelectItem value="Q4">Q4 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* OKRs List */}
            <div className="grid gap-6">
              {filteredOKRs.map((okr) => (
                <Card key={okr.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg text-slate-800">{okr.title}</CardTitle>
                          <Badge className={getStatusColor(okr.status)}>
                            {okr.status}
                          </Badge>
                          <Badge className="bg-gradient-to-r from-violet-100 to-purple-200 text-violet-700 border-0">
                            {okr.quarter} {okr.year}
                          </Badge>
                        </div>
                        <CardDescription className="text-base text-slate-600">
                          {okr.objective}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedOKR(okr);
                            setShowCommentDialog(true);
                          }}
                          className="border-2 border-slate-300 hover:bg-slate-100"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => editOKR(okr)}
                          className="border-2 border-amber-300 hover:bg-amber-50 text-amber-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Overall Progress</span>
                          <span className="font-medium">
                            {Math.round(okr.progress)}%
                          </span>
                        </div>
                        <Progress
                          value={okr.progress}
                          className="h-3 bg-gradient-to-r from-amber-200 to-orange-200"
                        />
                      </div>

                      {/* Key Results */}
                      <div>
                        <h4 className="font-medium mb-3 text-slate-800">Key Results</h4>
                        <div className="space-y-3">
                          {okr.keyResults.map((kr) => (
                            <div key={kr.id} className="border-2 border-slate-200 rounded-lg p-3 bg-gradient-to-r from-white to-slate-50">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                  <div className="font-medium text-sm text-slate-800">
                                    {kr.title}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {kr.description}
                                  </div>
                                </div>
                                <div className="text-sm font-medium text-amber-700">
                                  {kr.currentValue}/{kr.targetValue} {kr.unit}
                                </div>
                              </div>
                              <Progress
                                value={(kr.currentValue / kr.targetValue) * 100}
                                className="h-2 bg-gradient-to-r from-amber-200 to-orange-200"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Assignments */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        {okr.assignedTo.length > 0 && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Members:
                            </span>
                            <div className="flex gap-1">
                              {okr.assignedTo.map((memberId) => {
                                const member = teamMembers.find(
                                  (m) => m.id === memberId,
                                );
                                return member ? (
                                  <Badge
                                    key={memberId}
                                    className="bg-gradient-to-r from-blue-100 to-indigo-200 text-blue-700 border-0 text-xs"
                                  >
                                    {member.name}
                                  </Badge>
                                ) : null;
                              })}
                            </div>
                          </div>
                        )}

                        {okr.assignedTeams.length > 0 && (
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Teams:</span>
                            <div className="flex gap-1">
                              {okr.assignedTeams.map((team) => (
                                <Badge
                                  key={team}
                                  className="bg-gradient-to-r from-green-100 to-emerald-200 text-green-700 border-0 text-xs"
                                >
                                  {team}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {okr.assignedDepartments.length > 0 && (
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Departments:
                            </span>
                            <div className="flex gap-1">
                              {okr.assignedDepartments.map((dept) => (
                                <Badge
                                  key={dept}
                                  className="bg-gradient-to-r from-purple-100 to-violet-200 text-purple-700 border-0 text-xs"
                                >
                                  {dept}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Comments Preview */}
                      {okr.comments.length > 0 && (
                        <div className="border-t pt-3">
                          <div className="text-sm text-muted-foreground mb-2">
                            Latest Comment ({okr.comments.length} total)
                          </div>
                          <div className="text-sm bg-gradient-to-r from-slate-50 to-slate-100 p-3 rounded-lg">
                            <span className="font-medium text-slate-800">
                              {okr.comments[okr.comments.length - 1].author}:
                            </span>
                            <span className="ml-2">
                              {okr.comments[okr.comments.length - 1].content}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="kpis" className="space-y-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-800">KPIs Dashboard</CardTitle>
                    <CardDescription>
                      Key Performance Indicators generated from OKRs
                    </CardDescription>
                  </div>
                  <Button
                    onClick={generateKPIs}
                    className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white border-0"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Refresh KPIs
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {kpis.map((kpi) => (
                    <div key={kpi.id} className="border-2 border-slate-200 rounded-lg p-4 bg-gradient-to-r from-white to-slate-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-slate-800">{kpi.name}</h4>
                            <Badge className="bg-gradient-to-r from-cyan-100 to-blue-200 text-cyan-700 border-0 capitalize">
                              {kpi.category}
                            </Badge>
                            {getTrendIcon(kpi.trend)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {kpi.description}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Assigned to: {kpi.assignedTo} • {kpi.period}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-slate-800">
                            {kpi.currentValue}/{kpi.targetValue} {kpi.unit}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {Math.round(
                              (kpi.currentValue / kpi.targetValue) * 100,
                            )}
                            %
                          </div>
                        </div>
                      </div>
                      <Progress
                        value={(kpi.currentValue / kpi.targetValue) * 100}
                        className="h-3 bg-gradient-to-r from-indigo-200 to-purple-200"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
              <CardHeader>
                <CardTitle className="text-slate-800">Progress Tracking</CardTitle>
                <CardDescription>
                  Detailed progress analysis across all OKRs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>OKR</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Key Results</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {okrs.map((okr) => (
                      <TableRow key={okr.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-slate-800">{okr.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {okr.quarter} {okr.year}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(okr.status)}>
                            {okr.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={okr.progress} className="h-2 w-20 bg-gradient-to-r from-amber-200 to-orange-200" />
                            <span className="text-sm font-medium">
                              {Math.round(okr.progress)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {okr.keyResults.length} key results
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {okr.assignedTo.length > 0 && (
                              <div className="text-xs">
                                {okr.assignedTo.length} members
                              </div>
                            )}
                            {okr.assignedTeams.length > 0 && (
                              <div className="text-xs">
                                {okr.assignedTeams.length} teams
                              </div>
                            )}
                            {okr.assignedDepartments.length > 0 && (
                              <div className="text-xs">
                                {okr.assignedDepartments.length} departments
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {new Date(okr.lastUpdated).toLocaleDateString()}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Comment Dialog */}
        <Dialog open={showCommentDialog} onOpenChange={setShowCommentDialog}>
          <DialogContent className="max-w-2xl border-0 shadow-2xl bg-gradient-to-br from-white to-slate-50">
            <DialogHeader>
              <DialogTitle className="text-xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                OKR Comments & Discussion
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                Add comments and tag team members for collaboration
              </DialogDescription>
            </DialogHeader>
            {selectedOKR && (
              <div className="space-y-4">
                <div className="max-h-64 overflow-y-auto space-y-3">
                  {selectedOKR.comments.map((comment) => (
                    <div key={comment.id} className="border-2 border-slate-200 rounded-lg p-3 bg-gradient-to-r from-white to-slate-50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-sm text-slate-800">
                          {comment.author}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(comment.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-sm">{comment.content}</div>
                      {comment.taggedUsers.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {comment.taggedUsers.map((userId) => {
                            const member = teamMembers.find(
                              (m) => m.id === userId,
                            );
                            return member ? (
                              <Badge
                                key={userId}
                                className="bg-gradient-to-r from-amber-100 to-orange-200 text-amber-700 border-0 text-xs"
                              >
                                @{member.name}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment.content}
                    onChange={(e) =>
                      setNewComment({ ...newComment, content: e.target.value })
                    }
                    rows={3}
                    className="border-2 border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  />
                  <div>
                    <Label className="text-sm text-slate-700 font-medium">Tag Team Members</Label>
                    <div className="border-2 border-slate-200 rounded-lg p-3 max-h-32 overflow-y-auto bg-gradient-to-r from-slate-50 to-slate-100">
                      {teamMembers.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center space-x-2 mb-2"
                        >
                          <Checkbox
                            checked={newComment.taggedUsers.includes(member.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setNewComment({
                                  ...newComment,
                                  taggedUsers: [
                                    ...newComment.taggedUsers,
                                    member.id,
                                  ],
                                });
                              } else {
                                setNewComment({
                                  ...newComment,
                                  taggedUsers: newComment.taggedUsers.filter(
                                    (id) => id !== member.id,
                                  ),
                                });
                              }
                            }}
                          />
                          <Label className="text-sm">{member.name}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowCommentDialog(false)}
                className="border-2 border-slate-300 hover:bg-slate-100"
              >
                Cancel
              </Button>
              <Button
                onClick={addComment}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Add Comment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default OKRs;
