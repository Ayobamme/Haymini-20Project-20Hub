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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Calendar,
  TrendingUp,
  TrendingDown,
  Activity,
  Eye,
  Target,
  FileText,
} from "lucide-react";

const risks = [
  {
    id: "RISK-001",
    title: "Database Server Failure",
    description:
      "Critical database server could fail due to hardware issues or overload, causing complete system downtime and data loss.",
    category: "Technical",
    probability: "Medium",
    impact: "High",
    riskScore: 75,
    riskLevel: "High",
    status: "Active",
    project: "Database Migration",
    owner: "Alex Rodriguez",
    identifiedBy: "Emma Thompson",
    identifiedDate: "2024-01-20",
    lastReviewed: "2024-01-25",
    dueDate: "2024-02-15",
    mitigation: {
      strategy: "Transfer",
      description:
        "Implement automated backup systems, failover mechanisms, and cloud redundancy to minimize impact.",
      actions: [
        "Set up automated daily backups",
        "Configure hot standby server",
        "Implement real-time monitoring",
        "Create disaster recovery plan",
      ],
      progress: 60,
      cost: 15000,
      responsible: "Alex Rodriguez",
      deadline: "2024-02-10",
    },
    tags: ["database", "downtime", "critical"],
    attachments: 3,
    comments: 8,
  },
  {
    id: "RISK-002",
    title: "Key Team Member Departure",
    description:
      "Loss of senior developers with critical project knowledge could delay deliverables and impact team productivity.",
    category: "Human Resources",
    probability: "Low",
    impact: "High",
    riskScore: 45,
    riskLevel: "Medium",
    status: "Active",
    project: "E-commerce Platform Redesign",
    owner: "Lisa Park",
    identifiedBy: "John Doe",
    identifiedDate: "2024-01-18",
    lastReviewed: "2024-01-24",
    dueDate: "2024-03-01",
    mitigation: {
      strategy: "Accept",
      description:
        "Implement knowledge sharing sessions, documentation, and cross-training to reduce dependency on individual team members.",
      actions: [
        "Create comprehensive documentation",
        "Conduct weekly knowledge sharing sessions",
        "Cross-train team members",
        "Implement mentorship program",
      ],
      progress: 30,
      cost: 5000,
      responsible: "Lisa Park",
      deadline: "2024-02-20",
    },
    tags: ["team", "knowledge", "dependency"],
    attachments: 2,
    comments: 5,
  },
  {
    id: "RISK-003",
    title: "Security Breach",
    description:
      "Potential cybersecurity attack could compromise user data, system integrity, and company reputation.",
    category: "Security",
    probability: "Medium",
    impact: "Critical",
    riskScore: 85,
    riskLevel: "High",
    status: "Active",
    project: "Mobile App Development",
    owner: "Emma Thompson",
    identifiedBy: "Alex Rodriguez",
    identifiedDate: "2024-01-15",
    lastReviewed: "2024-01-26",
    dueDate: "2024-02-01",
    mitigation: {
      strategy: "Avoid",
      description:
        "Implement comprehensive security measures including encryption, access controls, and regular security audits.",
      actions: [
        "Conduct security audit",
        "Implement two-factor authentication",
        "Encrypt sensitive data",
        "Regular penetration testing",
        "Security training for all staff",
      ],
      progress: 80,
      cost: 25000,
      responsible: "Emma Thompson",
      deadline: "2024-01-30",
    },
    tags: ["security", "data", "breach"],
    attachments: 5,
    comments: 12,
  },
  {
    id: "RISK-004",
    title: "Budget Overrun",
    description:
      "Project costs may exceed allocated budget due to scope creep, unexpected requirements, or resource constraints.",
    category: "Financial",
    probability: "High",
    impact: "Medium",
    riskScore: 65,
    riskLevel: "Medium",
    status: "Mitigated",
    project: "Marketing Campaign Q1",
    owner: "David Kim",
    identifiedBy: "Lisa Park",
    identifiedDate: "2024-01-12",
    lastReviewed: "2024-01-23",
    dueDate: "2024-02-28",
    mitigation: {
      strategy: "Mitigate",
      description:
        "Implement strict budget monitoring, change control processes, and regular financial reviews.",
      actions: [
        "Weekly budget reviews",
        "Implement change control process",
        "Set spending approval limits",
        "Monitor resource utilization",
      ],
      progress: 90,
      cost: 2000,
      responsible: "David Kim",
      deadline: "2024-02-05",
    },
    tags: ["budget", "financial", "scope"],
    attachments: 4,
    comments: 6,
  },
  {
    id: "RISK-005",
    title: "Third-Party Service Disruption",
    description:
      "External API services or cloud providers could experience outages affecting system functionality.",
    category: "External",
    probability: "Medium",
    impact: "Medium",
    riskScore: 50,
    riskLevel: "Medium",
    status: "Active",
    project: "Mobile App Development",
    owner: "Sarah Wilson",
    identifiedBy: "Mike Chen",
    identifiedDate: "2024-01-22",
    lastReviewed: "2024-01-25",
    dueDate: "2024-03-15",
    mitigation: {
      strategy: "Transfer",
      description:
        "Implement backup service providers and fallback mechanisms to ensure service continuity.",
      actions: [
        "Identify alternative service providers",
        "Implement circuit breaker patterns",
        "Create fallback mechanisms",
        "Monitor service health",
      ],
      progress: 40,
      cost: 8000,
      responsible: "Sarah Wilson",
      deadline: "2024-03-01",
    },
    tags: ["external", "API", "service"],
    attachments: 1,
    comments: 3,
  },
];

const getRiskLevelColor = (level: string) => {
  switch (level) {
    case "Critical":
      return "destructive";
    case "High":
      return "destructive";
    case "Medium":
      return "default";
    case "Low":
      return "secondary";
    default:
      return "secondary";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "destructive";
    case "Mitigated":
      return "default";
    case "Resolved":
      return "success";
    case "Accepted":
      return "secondary";
    default:
      return "secondary";
  }
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
};

// Risk Assessment Matrix data
const riskMatrix = [
  {
    probability: "Very High",
    impact: ["Medium", "High", "High", "Critical", "Critical"],
  },
  {
    probability: "High",
    impact: ["Low", "Medium", "High", "High", "Critical"],
  },
  { probability: "Medium", impact: ["Low", "Low", "Medium", "High", "High"] },
  { probability: "Low", impact: ["Very Low", "Low", "Low", "Medium", "High"] },
  {
    probability: "Very Low",
    impact: ["Very Low", "Very Low", "Low", "Low", "Medium"],
  },
];

const impactLabels = ["Very Low", "Low", "Medium", "High", "Critical"];

export default function RiskManagement() {
  const [isCreateRiskOpen, setIsCreateRiskOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [projectFilter, setProjectFilter] = useState<string>("all");

  const filteredRisks = risks.filter((risk) => {
    const matchesSearch = risk.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || risk.category === categoryFilter;
    const matchesLevel =
      levelFilter === "all" || risk.riskLevel === levelFilter;
    const matchesStatus =
      statusFilter === "all" || risk.status === statusFilter;
    const matchesProject =
      projectFilter === "all" || risk.project === projectFilter;
    return (
      matchesSearch &&
      matchesCategory &&
      matchesLevel &&
      matchesStatus &&
      matchesProject
    );
  });

  const riskStats = {
    total: risks.length,
    active: risks.filter((r) => r.status === "Active").length,
    critical: risks.filter((r) => r.riskLevel === "High").length,
    mitigated: risks.filter((r) => r.status === "Mitigated").length,
    avgScore: Math.round(
      risks.reduce((acc, risk) => acc + risk.riskScore, 0) / risks.length,
    ),
    totalMitigationCost: risks.reduce(
      (acc, risk) => acc + risk.mitigation.cost,
      0,
    ),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Management</h1>
          <p className="text-muted-foreground">
            Identify, assess, and mitigate project risks with comprehensive
            tracking.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isCreateRiskOpen} onOpenChange={setIsCreateRiskOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Log Risk
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Log New Risk</DialogTitle>
                <DialogDescription>
                  Identify and assess a new project risk with mitigation
                  strategy.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[500px] overflow-y-auto">
                <div className="grid gap-2">
                  <Label htmlFor="riskTitle">Risk Title *</Label>
                  <Input id="riskTitle" placeholder="Enter risk title" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="riskDescription">Description *</Label>
                  <Textarea
                    id="riskDescription"
                    placeholder="Describe the risk and its potential impact"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="riskCategory">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="financial">Financial</SelectItem>
                        <SelectItem value="operational">Operational</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="external">External</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="riskProbability">Probability</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Probability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="very-low">Very Low</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="very-high">Very High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="riskImpact">Impact</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Impact" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="very-low">Very Low</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="riskProject">Project *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ecommerce">
                          E-commerce Platform Redesign
                        </SelectItem>
                        <SelectItem value="mobile">
                          Mobile App Development
                        </SelectItem>
                        <SelectItem value="marketing">
                          Marketing Campaign Q1
                        </SelectItem>
                        <SelectItem value="database">
                          Database Migration
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="riskOwner">Risk Owner</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select owner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Doe</SelectItem>
                        <SelectItem value="alex">Alex Rodriguez</SelectItem>
                        <SelectItem value="lisa">Lisa Park</SelectItem>
                        <SelectItem value="emma">Emma Thompson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="mitigationStrategy">
                    Mitigation Strategy
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="avoid">Avoid</SelectItem>
                      <SelectItem value="mitigate">Mitigate</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                      <SelectItem value="accept">Accept</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="mitigationDescription">
                    Mitigation Description
                  </Label>
                  <Textarea
                    id="mitigationDescription"
                    placeholder="Describe the mitigation plan and actions"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="mitigationCost">Mitigation Cost ($)</Label>
                    <Input
                      id="mitigationCost"
                      type="number"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="riskDueDate">Due Date</Label>
                    <Input id="riskDueDate" type="date" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="riskTags">Tags (comma-separated)</Label>
                  <Input
                    id="riskTags"
                    placeholder="e.g., security, database, critical"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateRiskOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Log Risk</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Risk Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Risks</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{riskStats.total}</div>
            <p className="text-xs text-muted-foreground">All projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Risks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {riskStats.active}
            </div>
            <p className="text-xs text-muted-foreground">Need monitoring</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {riskStats.critical}
            </div>
            <p className="text-xs text-muted-foreground">Critical attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mitigated</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {riskStats.mitigated}
            </div>
            <p className="text-xs text-muted-foreground">Under control</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{riskStats.avgScore}</div>
            <p className="text-xs text-muted-foreground">Risk exposure</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Mitigation Cost
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(riskStats.totalMitigationCost)}
            </div>
            <p className="text-xs text-muted-foreground">Investment required</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="risks">
        <TabsList>
          <TabsTrigger value="risks">Risk Register</TabsTrigger>
          <TabsTrigger value="matrix">Assessment Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="risks">
          {/* Filters and Search */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 max-w-sm">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search risks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                  <SelectItem value="Human Resources">HR</SelectItem>
                  <SelectItem value="External">External</SelectItem>
                </SelectContent>
              </Select>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Mitigated">Mitigated</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Risks List */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRisks.map((risk) => (
              <Card key={risk.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg line-clamp-1">
                          {risk.title}
                        </CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={getRiskLevelColor(risk.riskLevel) as any}
                        >
                          {risk.riskLevel} Risk
                        </Badge>
                        <Badge variant={getStatusColor(risk.status) as any}>
                          {risk.status}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Risk
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Target className="mr-2 h-4 w-4" />
                          Update Mitigation
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="text-sm line-clamp-2">
                    {risk.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Risk Score */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Risk Score</span>
                      <span className="font-medium">{risk.riskScore}/100</span>
                    </div>
                    <Progress value={risk.riskScore} className="w-full" />
                  </div>

                  {/* Risk Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Probability</div>
                      <div className="font-medium">{risk.probability}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Impact</div>
                      <div className="font-medium">{risk.impact}</div>
                    </div>
                  </div>

                  {/* Mitigation Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Mitigation Progress</span>
                      <span className="font-medium">
                        {risk.mitigation.progress}%
                      </span>
                    </div>
                    <Progress
                      value={risk.mitigation.progress}
                      className="w-full"
                    />
                  </div>

                  {/* Project and Owner */}
                  <div className="space-y-2">
                    <div className="text-sm">
                      <div className="text-muted-foreground">Project</div>
                      <div className="font-medium">{risk.project}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <div className="text-muted-foreground">Owner</div>
                        <div className="font-medium">{risk.owner}</div>
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt={risk.owner} />
                        <AvatarFallback className="text-xs">
                          {getInitials(risk.owner)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Due: {formatDate(risk.dueDate)}
                    </span>
                    <span>Cost: {formatCurrency(risk.mitigation.cost)}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {risk.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Mitigation Actions */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Mitigation Strategy: {risk.mitigation.strategy}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {risk.mitigation.actions.length} action items
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="matrix">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment Matrix</CardTitle>
              <CardDescription>
                Visual representation of risk probability vs impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-6 gap-2 min-w-[600px]">
                  {/* Header row */}
                  <div className="text-center font-medium text-sm p-2"></div>
                  {impactLabels.map((label) => (
                    <div
                      key={label}
                      className="text-center font-medium text-sm p-2"
                    >
                      {label}
                    </div>
                  ))}

                  {/* Matrix rows */}
                  {riskMatrix.map((row, rowIndex) => (
                    <>
                      <div
                        key={`prob-${rowIndex}`}
                        className="text-center font-medium text-sm p-2 flex items-center justify-center"
                      >
                        {row.probability}
                      </div>
                      {row.impact.map((level, colIndex) => {
                        const cellColor =
                          level === "Critical"
                            ? "bg-red-500"
                            : level === "High"
                              ? "bg-red-400"
                              : level === "Medium"
                                ? "bg-yellow-400"
                                : level === "Low"
                                  ? "bg-green-400"
                                  : "bg-green-300";

                        return (
                          <div
                            key={`cell-${rowIndex}-${colIndex}`}
                            className={`${cellColor} text-white text-center text-sm p-4 rounded font-medium min-h-[60px] flex items-center justify-center`}
                          >
                            {level}
                          </div>
                        );
                      })}
                    </>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm">Critical Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-400 rounded"></div>
                    <span className="text-sm">High Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                    <span className="text-sm">Medium Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-400 rounded"></div>
                    <span className="text-sm">Low Risk</span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>
                    The risk assessment matrix helps visualize the relationship
                    between probability and impact to determine overall risk
                    level. Use this matrix to prioritize risk mitigation efforts
                    and resource allocation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
