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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Download,
  Upload,
  Users,
  DollarSign,
  TrendingUp,
  Phone,
  Mail,
  FileText,
  UserCheck,
  MapPin,
  Target,
  Activity,
  Award,
  Calendar,
  Flag,
  Eye,
  ArrowRight,
  AlertTriangle,
  CalendarPlus,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { toast } from "@/hooks/use-toast";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "Lead" | "Qualified" | "Proposal" | "Negotiation" | "Closed-Won" | "Closed-Lost" | "Churned";
  estimatedValue: number;
  lastContact: string;
  source: string;
  assignedTo: string;
  notes: string;
  isFlagged: boolean;
  churnRisk: "Low" | "Medium" | "High";
  lastActivity: string;
  engagementScore: number;
  meetingHistory: Meeting[];
  tags: string[];
}

interface Meeting {
  id: string;
  title: string;
  date: string;
  type: "call" | "meeting" | "email" | "demo";
  notes: string;
}

interface TeamMemberStats {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  coldCalls: number;
  emailsSent: number;
  meetings: number;
  dealsWon: number;
  revenue: number;
  target: number;
}

const SalesManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@company.com",
      phone: "+234 901 234 5678",
      company: "TechCorp Ltd",
      status: "Qualified",
      estimatedValue: 25000,
      lastContact: "2024-01-15",
      source: "Website",
      assignedTo: "Sarah Johnson",
      notes: "Interested in enterprise package",
      isFlagged: false,
      churnRisk: "Low",
      lastActivity: "2024-01-15",
      engagementScore: 85,
      meetingHistory: [
        { id: "m1", title: "Initial Discovery Call", date: "2024-01-10", type: "call", notes: "Great initial conversation" },
        { id: "m2", title: "Product Demo", date: "2024-01-13", type: "demo", notes: "Showed enterprise features" }
      ],
      tags: ["Enterprise", "High-Value"]
    },
    {
      id: "2",
      name: "Mary Johnson",
      email: "mary@startup.co",
      phone: "+234 902 345 6789",
      company: "StartupCo",
      status: "Proposal",
      estimatedValue: 15000,
      lastContact: "2024-01-14",
      source: "Referral",
      assignedTo: "Michael Chen",
      notes: "Ready to sign contract next week",
      isFlagged: true,
      churnRisk: "Medium",
      lastActivity: "2024-01-14",
      engagementScore: 70,
      meetingHistory: [
        { id: "m3", title: "Requirements Gathering", date: "2024-01-08", type: "meeting", notes: "Discussed specific needs" }
      ],
      tags: ["Startup", "Quick-Close"]
    },
    {
      id: "3",
      name: "Robert Wilson",
      email: "rob@innovate.ng",
      phone: "+234 903 456 7890",
      company: "Innovate Nigeria",
      status: "Closed-Won",
      estimatedValue: 45000,
      lastContact: "2024-01-13",
      source: "LinkedIn",
      assignedTo: "Sarah Johnson",
      notes: "Successfully closed. Looking to upgrade plan",
      isFlagged: false,
      churnRisk: "Low",
      lastActivity: "2024-01-13",
      engagementScore: 95,
      meetingHistory: [
        { id: "m4", title: "Contract Signing", date: "2024-01-12", type: "meeting", notes: "Signed annual contract" }
      ],
      tags: ["Closed", "Upsell-Opportunity"]
    },
    {
      id: "4",
      name: "Lisa Chen",
      email: "lisa@oldclient.com",
      phone: "+234 904 567 8901",
      company: "Old Client Corp",
      status: "Churned",
      estimatedValue: 30000,
      lastContact: "2023-12-15",
      source: "Cold Call",
      assignedTo: "Emily Davis",
      notes: "Contract expired, did not renew due to budget constraints",
      isFlagged: true,
      churnRisk: "High",
      lastActivity: "2023-12-15",
      engagementScore: 25,
      meetingHistory: [
        { id: "m5", title: "Renewal Discussion", date: "2023-12-10", type: "call", notes: "Budget concerns raised" }
      ],
      tags: ["Churned", "Re-engagement"]
    }
  ]);

  const [teamStats] = useState<TeamMemberStats[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "",
      role: "Senior Sales Manager",
      coldCalls: 45,
      emailsSent: 120,
      meetings: 15,
      dealsWon: 8,
      revenue: 180000,
      target: 200000
    },
    {
      id: "2", 
      name: "Michael Chen",
      avatar: "",
      role: "Sales Representative",
      coldCalls: 38,
      emailsSent: 95,
      meetings: 12,
      dealsWon: 6,
      revenue: 145000,
      target: 150000
    },
    {
      id: "3",
      name: "Emily Davis",
      avatar: "",
      role: "Account Executive", 
      coldCalls: 52,
      emailsSent: 140,
      meetings: 18,
      dealsWon: 10,
      revenue: 220000,
      target: 180000
    }
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isCustomerDetailOpen, setIsCustomerDetailOpen] = useState(false);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isEditCustomerOpen, setIsEditCustomerOpen] = useState(false);
  const [isScheduleMeetingOpen, setIsScheduleMeetingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pipeline");

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Lead",
    estimatedValue: "",
    source: "",
    assignedTo: "",
    notes: "",
    tags: ""
  });

  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);

  const [newMeeting, setNewMeeting] = useState({
    title: "",
    date: "",
    time: "",
    type: "meeting",
    notes: "",
    customerId: ""
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [churnRiskFilter, setChurnRiskFilter] = useState("All");

  const salesStages = [
    { name: "Lead", count: customers.filter(c => c.status === "Lead").length, color: "#94a3b8" },
    { name: "Qualified", count: customers.filter(c => c.status === "Qualified").length, color: "#3b82f6" },
    { name: "Proposal", count: customers.filter(c => c.status === "Proposal").length, color: "#f59e0b" },
    { name: "Negotiation", count: customers.filter(c => c.status === "Negotiation").length, color: "#8b5cf6" },
    { name: "Closed-Won", count: customers.filter(c => c.status === "Closed-Won").length, color: "#22c55e" },
    { name: "Closed-Lost", count: customers.filter(c => c.status === "Closed-Lost").length, color: "#ef4444" },
    { name: "Churned", count: customers.filter(c => c.status === "Churned").length, color: "#dc2626" }
  ];

  const churnData = [
    { month: "Jan", total: 120, churned: 8, churnRate: 6.7 },
    { month: "Feb", total: 125, churned: 10, churnRate: 8.0 },
    { month: "Mar", total: 130, churned: 6, churnRate: 4.6 },
    { month: "Apr", total: 135, churned: 12, churnRate: 8.9 },
    { month: "May", total: 140, churned: 7, churnRate: 5.0 },
    { month: "Jun", total: 145, churned: 9, churnRate: 6.2 }
  ];

  const salesData = [
    { month: "Jan", revenue: 145000, target: 150000 },
    { month: "Feb", revenue: 168000, target: 160000 },
    { month: "Mar", revenue: 180000, target: 170000 },
    { month: "Apr", revenue: 195000, target: 180000 },
    { month: "May", revenue: 220000, target: 200000 },
    { month: "Jun", revenue: 245000, target: 220000 }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || customer.status === statusFilter;
    const matchesChurnRisk = churnRiskFilter === "All" || customer.churnRisk === churnRiskFilter;
    return matchesSearch && matchesStatus && matchesChurnRisk;
  });

  const getStatusVariant = (status: Customer["status"]) => {
    switch (status) {
      case "Lead": return "outline";
      case "Qualified": return "default";
      case "Proposal": return "secondary";
      case "Negotiation": return "default";
      case "Closed-Won": return "default";
      case "Closed-Lost": return "destructive";
      case "Churned": return "destructive";
      default: return "outline";
    }
  };

  const getChurnRiskVariant = (risk: Customer["churnRisk"]) => {
    switch (risk) {
      case "Low": return "secondary";
      case "Medium": return "default";
      case "High": return "destructive";
      default: return "outline";
    }
  };

  const getEngagementColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.company) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const customer: Customer = {
      id: Date.now().toString(),
      ...newCustomer,
      estimatedValue: parseInt(newCustomer.estimatedValue) || 0,
      lastContact: new Date().toISOString().split('T')[0],
      status: newCustomer.status as Customer["status"],
      isFlagged: false,
      churnRisk: "Low",
      lastActivity: new Date().toISOString().split('T')[0],
      engagementScore: 50,
      meetingHistory: [],
      tags: newCustomer.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    setCustomers([...customers, customer]);
    setNewCustomer({
      name: "", email: "", phone: "", company: "", status: "Lead",
      estimatedValue: "", source: "", assignedTo: "", notes: "", tags: ""
    });
    setIsAddCustomerOpen(false);

    toast({
      title: "Customer Added",
      description: `${customer.name} has been added to the sales pipeline.`,
    });
  };

  const handleEditCustomer = () => {
    if (!editCustomer) return;

    setCustomers(prev => prev.map(customer =>
      customer.id === editCustomer.id ? editCustomer : customer
    ));
    setIsEditCustomerOpen(false);
    setEditCustomer(null);

    toast({
      title: "Customer Updated",
      description: "Customer information has been updated.",
    });
  };

  const handleMoveStage = (customerId: string, newStatus: Customer["status"]) => {
    setCustomers(prev => prev.map(customer =>
      customer.id === customerId ? { ...customer, status: newStatus } : customer
    ));

    toast({
      title: "Stage Updated",
      description: `Customer moved to ${newStatus} stage.`,
    });
  };

  const handleToggleFlag = (customerId: string) => {
    setCustomers(prev => prev.map(customer =>
      customer.id === customerId ? { ...customer, isFlagged: !customer.isFlagged } : customer
    ));

    const customer = customers.find(c => c.id === customerId);
    toast({
      title: customer?.isFlagged ? "Flag Removed" : "Customer Flagged",
      description: customer?.isFlagged ? 
        "Customer has been unflagged." : 
        "Customer has been flagged for attention.",
    });
  };

  const handleScheduleMeeting = () => {
    if (!newMeeting.title || !newMeeting.date || !newMeeting.customerId) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would integrate with the meeting management system
    toast({
      title: "Meeting Scheduled",
      description: `Meeting "${newMeeting.title}" has been scheduled and added to meeting management.`,
    });

    setNewMeeting({
      title: "", date: "", time: "", type: "meeting", notes: "", customerId: ""
    });
    setIsScheduleMeetingOpen(false);
  };

  const totalRevenue = teamStats.reduce((sum, member) => sum + member.revenue, 0);
  const totalTarget = teamStats.reduce((sum, member) => sum + member.target, 0);
  const achievementRate = Math.round((totalRevenue / totalTarget) * 100);
  const churnRate = (customers.filter(c => c.status === "Churned").length / customers.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Sales Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage sales pipeline, track customer journey, and monitor churn risk
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Dialog open={isScheduleMeetingOpen} onOpenChange={setIsScheduleMeetingOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
              </DialogTrigger>
            </Dialog>
            <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Customer
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{(totalRevenue / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">
                {achievementRate}% of target achieved
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.filter(c => c.status !== "Churned" && c.status !== "Closed-Lost").length}</div>
              <p className="text-xs text-muted-foreground">
                {customers.filter(c => c.status === "Closed-Won").length} paying customers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24%</div>
              <p className="text-xs text-muted-foreground">
                +2% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{churnRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                {customers.filter(c => c.churnRisk === "High").length} high risk
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Flagged Customers</CardTitle>
              <Flag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.filter(c => c.isFlagged).length}</div>
              <p className="text-xs text-muted-foreground">
                Need attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pipeline">Sales Pipeline</TabsTrigger>
            <TabsTrigger value="customers">Customer Management</TabsTrigger>
            <TabsTrigger value="churn">Churn Analysis</TabsTrigger>
            <TabsTrigger value="team">Team Performance</TabsTrigger>
          </TabsList>

          {/* Sales Pipeline Tab */}
          <TabsContent value="pipeline" className="space-y-6">
            {/* Sales Stages */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Pipeline Stages</CardTitle>
                <CardDescription>Customer distribution across sales stages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                  {salesStages.map((stage, index) => (
                    <div key={stage.name} className="relative">
                      <Card className="hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => setStatusFilter(stage.name)}>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold" style={{ color: stage.color }}>
                            {stage.count}
                          </div>
                          <div className="text-sm font-medium">{stage.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {((stage.count / customers.length) * 100).toFixed(1)}%
                          </div>
                        </CardContent>
                      </Card>
                      {index < salesStages.length - 1 && (
                        <ArrowRight className="absolute top-1/2 -right-2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hidden md:block" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pipeline Visualization */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue vs Target</CardTitle>
                  <CardDescription>Monthly performance tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₦${(value as number / 1000).toFixed(0)}K`, ""]} />
                      <Legend />
                      <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                      <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Stage Distribution</CardTitle>
                  <CardDescription>Customer distribution by stage</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={salesStages}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="count"
                      >
                        {salesStages.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {salesStages.map((item) => (
                      <div key={item.name} className="flex items-center gap-2 text-sm">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name}: {item.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Customer Management Tab */}
          <TabsContent value="customers" className="space-y-4">
            {/* Filters */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-80"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    {salesStages.map(stage => (
                      <SelectItem key={stage.name} value={stage.name}>{stage.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={churnRiskFilter} onValueChange={setChurnRiskFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Churn risk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Risk Levels</SelectItem>
                    <SelectItem value="Low">Low Risk</SelectItem>
                    <SelectItem value="Medium">Medium Risk</SelectItem>
                    <SelectItem value="High">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Customer List */}
            <div className="grid gap-4">
              {filteredCustomers.map((customer) => (
                <Card key={customer.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{customer.name}</h3>
                            {customer.isFlagged && (
                              <Flag className="h-4 w-4 text-red-500 fill-current" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{customer.company}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {customer.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {customer.phone}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusVariant(customer.status)}>
                            {customer.status}
                          </Badge>
                          <Badge variant={getChurnRiskVariant(customer.churnRisk)}>
                            {customer.churnRisk} Risk
                          </Badge>
                        </div>
                        <div className="text-lg font-bold">₦{customer.estimatedValue.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          Engagement: <span className={getEngagementColor(customer.engagementScore)}>{customer.engagementScore}%</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last contact: {new Date(customer.lastContact).toLocaleDateString()}
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => {
                            setSelectedCustomer(customer);
                            setIsCustomerDetailOpen(true);
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setEditCustomer(customer);
                            setIsEditCustomerOpen(true);
                          }}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Customer
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleFlag(customer.id)}>
                            <Flag className="mr-2 h-4 w-4" />
                            {customer.isFlagged ? 'Remove Flag' : 'Flag Customer'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setNewMeeting(prev => ({ ...prev, customerId: customer.id }));
                            setIsScheduleMeetingOpen(true);
                          }}>
                            <CalendarPlus className="mr-2 h-4 w-4" />
                            Schedule Meeting
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Move to Stage</DropdownMenuLabel>
                          {salesStages.slice(0, -1).map(stage => (
                            <DropdownMenuItem 
                              key={stage.name}
                              onClick={() => handleMoveStage(customer.id, stage.name as Customer["status"])}
                              disabled={customer.status === stage.name}
                            >
                              <ArrowRight className="mr-2 h-4 w-4" />
                              {stage.name}
                            </DropdownMenuItem>
                          ))}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            Make Call
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Customer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {customer.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {customer.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {customer.notes && (
                      <div className="mt-4 p-3 bg-muted rounded-md">
                        <p className="text-sm"><strong>Notes:</strong> {customer.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Churn Analysis Tab */}
          <TabsContent value="churn" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Churn Rate Trend</CardTitle>
                  <CardDescription>Monthly churn rate tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={churnData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [
                        name === 'churnRate' ? `${value}%` : value,
                        name === 'churnRate' ? 'Churn Rate' : name
                      ]} />
                      <Line type="monotone" dataKey="churnRate" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Churn Risk Distribution</CardTitle>
                  <CardDescription>Customer risk assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Low", "Medium", "High"].map((risk) => {
                      const count = customers.filter(c => c.churnRisk === risk).length;
                      const percentage = customers.length > 0 ? (count / customers.length) * 100 : 0;
                      
                      return (
                        <div key={risk} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{risk} Risk</span>
                            <span className="text-sm text-muted-foreground">{count} customers</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* High Risk Customers */}
            <Card>
              <CardHeader>
                <CardTitle>High Risk Customers</CardTitle>
                <CardDescription>Customers requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {customers.filter(c => c.churnRisk === "High").map((customer) => (
                    <div key={customer.id} className="flex items-center justify-between p-3 border rounded-lg bg-red-50 border-red-200">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive" className="text-xs">High Risk</Badge>
                        <span className="text-sm text-red-600">{customer.engagementScore}% engagement</span>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="mr-1 h-3 w-3" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Performance Tab */}
          <TabsContent value="team" className="space-y-4">
            <div className="grid gap-4">
              {teamStats.map((member) => (
                <Card key={member.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-8 text-center">
                        <div>
                          <div className="text-lg font-bold">{member.coldCalls}</div>
                          <div className="text-xs text-muted-foreground">Cold Calls</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">{member.emailsSent}</div>
                          <div className="text-xs text-muted-foreground">Emails Sent</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">{member.meetings}</div>
                          <div className="text-xs text-muted-foreground">Meetings</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">{member.dealsWon}</div>
                          <div className="text-xs text-muted-foreground">Deals Won</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">₦{(member.revenue / 1000).toFixed(0)}K</div>
                          <div className="text-xs text-muted-foreground">Revenue</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">{Math.round((member.revenue / member.target) * 100)}%</div>
                          <div className="text-xs text-muted-foreground">Target Achievement</div>
                          <Progress value={(member.revenue / member.target) * 100} className="mt-1" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Customer Detail Dialog */}
        <Dialog open={isCustomerDetailOpen} onOpenChange={setIsCustomerDetailOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedCustomer?.name}
                {selectedCustomer?.isFlagged && (
                  <Flag className="h-4 w-4 text-red-500 fill-current" />
                )}
              </DialogTitle>
              <DialogDescription>
                Customer details and interaction history
              </DialogDescription>
            </DialogHeader>
            {selectedCustomer && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Contact Information</Label>
                      <div className="mt-2 space-y-1 text-sm">
                        <p><strong>Email:</strong> {selectedCustomer.email}</p>
                        <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                        <p><strong>Company:</strong> {selectedCustomer.company}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Sales Information</Label>
                      <div className="mt-2 space-y-1 text-sm">
                        <p><strong>Assigned to:</strong> {selectedCustomer.assignedTo}</p>
                        <p><strong>Source:</strong> {selectedCustomer.source}</p>
                        <p><strong>Estimated Value:</strong> ₦{selectedCustomer.estimatedValue.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Status & Risk</Label>
                      <div className="mt-2 space-y-2">
                        <div className="flex gap-2">
                          <Badge variant={getStatusVariant(selectedCustomer.status)}>
                            {selectedCustomer.status}
                          </Badge>
                          <Badge variant={getChurnRiskVariant(selectedCustomer.churnRisk)}>
                            {selectedCustomer.churnRisk} Risk
                          </Badge>
                        </div>
                        <div className="text-sm">
                          <span>Engagement Score: </span>
                          <span className={getEngagementColor(selectedCustomer.engagementScore)}>
                            {selectedCustomer.engagementScore}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Activity</Label>
                      <div className="mt-2 space-y-1 text-sm">
                        <p><strong>Last Contact:</strong> {new Date(selectedCustomer.lastContact).toLocaleDateString()}</p>
                        <p><strong>Last Activity:</strong> {new Date(selectedCustomer.lastActivity).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedCustomer.tags.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">Tags</Label>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedCustomer.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium">Notes</Label>
                  <div className="mt-2 p-3 bg-muted rounded-md">
                    <p className="text-sm">{selectedCustomer.notes || "No notes available"}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Meeting History ({selectedCustomer.meetingHistory.length})</Label>
                  <div className="mt-3 space-y-2">
                    {selectedCustomer.meetingHistory.map((meeting) => (
                      <div key={meeting.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{meeting.title}</h4>
                            <p className="text-sm text-muted-foreground">{meeting.notes}</p>
                          </div>
                          <div className="text-right text-sm text-muted-foreground">
                            <p>{new Date(meeting.date).toLocaleDateString()}</p>
                            <Badge variant="outline" className="text-xs mt-1">
                              {meeting.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCustomerDetailOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                if (selectedCustomer) {
                  setEditCustomer(selectedCustomer);
                  setIsCustomerDetailOpen(false);
                  setIsEditCustomerOpen(true);
                }
              }}>
                <Edit className="mr-1 h-3 w-3" />
                Edit Customer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Customer Dialog */}
        <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>
                Add a new customer to your sales pipeline
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter customer name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={newCustomer.company}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Enter company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Initial Status</Label>
                <Select value={newCustomer.status} onValueChange={(value) => setNewCustomer(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lead">Lead</SelectItem>
                    <SelectItem value="Qualified">Qualified</SelectItem>
                    <SelectItem value="Proposal">Proposal</SelectItem>
                    <SelectItem value="Negotiation">Negotiation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedValue">Estimated Value (₦)</Label>
                <Input
                  id="estimatedValue"
                  type="number"
                  value={newCustomer.estimatedValue}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, estimatedValue: e.target.value }))}
                  placeholder="Enter estimated value"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Select value={newCustomer.source} onValueChange={(value) => setNewCustomer(prev => ({ ...prev, source: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Referral">Referral</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Cold Call">Cold Call</SelectItem>
                    <SelectItem value="Email Campaign">Email Campaign</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignedTo">Assigned To</Label>
                <Select value={newCustomer.assignedTo} onValueChange={(value) => setNewCustomer(prev => ({ ...prev, assignedTo: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamStats.map((member) => (
                      <SelectItem key={member.id} value={member.name}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={newCustomer.tags}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="e.g., Enterprise, High-Value"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newCustomer.notes}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes about the customer"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddCustomerOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCustomer}>Add Customer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Customer Dialog */}
        <Dialog open={isEditCustomerOpen} onOpenChange={setIsEditCustomerOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Customer</DialogTitle>
              <DialogDescription>
                Update customer information
              </DialogDescription>
            </DialogHeader>
            {editCustomer && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editName">Full Name</Label>
                  <Input
                    id="editName"
                    value={editCustomer.name}
                    onChange={(e) => setEditCustomer(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editEmail">Email Address</Label>
                  <Input
                    id="editEmail"
                    value={editCustomer.email}
                    onChange={(e) => setEditCustomer(prev => prev ? ({ ...prev, email: e.target.value }) : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editPhone">Phone Number</Label>
                  <Input
                    id="editPhone"
                    value={editCustomer.phone}
                    onChange={(e) => setEditCustomer(prev => prev ? ({ ...prev, phone: e.target.value }) : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editCompany">Company</Label>
                  <Input
                    id="editCompany"
                    value={editCustomer.company}
                    onChange={(e) => setEditCustomer(prev => prev ? ({ ...prev, company: e.target.value }) : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editStatus">Status</Label>
                  <Select value={editCustomer.status} onValueChange={(value) => setEditCustomer(prev => prev ? ({ ...prev, status: value as Customer["status"] }) : null)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {salesStages.map(stage => (
                        <SelectItem key={stage.name} value={stage.name}>{stage.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editChurnRisk">Churn Risk</Label>
                  <Select value={editCustomer.churnRisk} onValueChange={(value) => setEditCustomer(prev => prev ? ({ ...prev, churnRisk: value as Customer["churnRisk"] }) : null)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editEstimatedValue">Estimated Value (₦)</Label>
                  <Input
                    id="editEstimatedValue"
                    type="number"
                    value={editCustomer.estimatedValue}
                    onChange={(e) => setEditCustomer(prev => prev ? ({ ...prev, estimatedValue: parseInt(e.target.value) || 0 }) : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editEngagementScore">Engagement Score (%)</Label>
                  <Input
                    id="editEngagementScore"
                    type="number"
                    min="0"
                    max="100"
                    value={editCustomer.engagementScore}
                    onChange={(e) => setEditCustomer(prev => prev ? ({ ...prev, engagementScore: parseInt(e.target.value) || 0 }) : null)}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="editTags">Tags (comma-separated)</Label>
                  <Input
                    id="editTags"
                    value={editCustomer.tags.join(', ')}
                    onChange={(e) => setEditCustomer(prev => prev ? ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean) }) : null)}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="editNotes">Notes</Label>
                  <Textarea
                    id="editNotes"
                    value={editCustomer.notes}
                    onChange={(e) => setEditCustomer(prev => prev ? ({ ...prev, notes: e.target.value }) : null)}
                    rows={3}
                  />
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  <Checkbox
                    id="editFlagged"
                    checked={editCustomer.isFlagged}
                    onCheckedChange={(checked) => setEditCustomer(prev => prev ? ({ ...prev, isFlagged: checked as boolean }) : null)}
                  />
                  <Label htmlFor="editFlagged">Flag this customer for attention</Label>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditCustomerOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditCustomer}>Update Customer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Schedule Meeting Dialog */}
        <Dialog open={isScheduleMeetingOpen} onOpenChange={setIsScheduleMeetingOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule Meeting</DialogTitle>
              <DialogDescription>
                Schedule a meeting with a customer (integrated with Meeting Management)
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meetingCustomer">Customer</Label>
                <Select value={newMeeting.customerId} onValueChange={(value) => setNewMeeting(prev => ({ ...prev, customerId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.filter(c => c.status !== "Churned" && c.status !== "Closed-Lost").map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name} - {customer.company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meetingTitle">Meeting Title</Label>
                <Input
                  id="meetingTitle"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter meeting title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meetingDate">Date</Label>
                <Input
                  id="meetingDate"
                  type="date"
                  value={newMeeting.date}
                  onChange={(e) => setNewMeeting(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meetingTime">Time</Label>
                <Input
                  id="meetingTime"
                  type="time"
                  value={newMeeting.time}
                  onChange={(e) => setNewMeeting(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meetingType">Meeting Type</Label>
                <Select value={newMeeting.type} onValueChange={(value) => setNewMeeting(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="call">Phone Call</SelectItem>
                    <SelectItem value="meeting">In-Person Meeting</SelectItem>
                    <SelectItem value="demo">Product Demo</SelectItem>
                    <SelectItem value="email">Email Follow-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meetingNotes">Notes</Label>
                <Textarea
                  id="meetingNotes"
                  value={newMeeting.notes}
                  onChange={(e) => setNewMeeting(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Meeting agenda or notes"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsScheduleMeetingOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleScheduleMeeting}>
                <CalendarPlus className="mr-1 h-3 w-3" />
                Schedule Meeting
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SalesManagement;
