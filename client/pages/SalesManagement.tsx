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
  status: "Leads" | "Onboarding" | "Paying" | "Returning";
  estimatedValue: number;
  lastContact: string;
  source: string;
  assignedTo: string;
  notes: string;
}

interface TeamMemberStats {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  coldCalls: number;
  emailsSent: number;
  proposalsSent: number;
  customerVisits: number;
  leadsAssigned: number;
  conversions: number;
  revenue: number;
  efficiency: number;
}

const SalesManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "CUST-001",
      name: "Acme Corporation",
      email: "contact@acme.com",
      phone: "+234-801-234-5678",
      company: "Acme Corp",
      status: "Leads",
      estimatedValue: 250000,
      lastContact: "2024-01-20",
      source: "Website",
      assignedTo: "Sarah Johnson",
      notes: "Interested in enterprise package",
    },
    {
      id: "CUST-002",
      name: "Tech Solutions Ltd",
      email: "info@techsolutions.com",
      phone: "+234-802-345-6789",
      company: "Tech Solutions",
      status: "Onboarding",
      estimatedValue: 180000,
      lastContact: "2024-01-19",
      source: "Referral",
      assignedTo: "Michael Brown",
      notes: "Requires custom integration",
    },
    {
      id: "CUST-003",
      name: "Digital Innovations",
      email: "hello@digitalinnovations.com",
      phone: "+234-803-456-7890",
      company: "Digital Innovations",
      status: "Paying",
      estimatedValue: 320000,
      lastContact: "2024-01-18",
      source: "LinkedIn",
      assignedTo: "Alex Wilson",
      notes: "Monthly subscription active",
    },
    {
      id: "CUST-004",
      name: "Global Enterprises",
      email: "support@globalent.com",
      phone: "+234-804-567-8901",
      company: "Global Enterprises",
      status: "Returning",
      estimatedValue: 450000,
      lastContact: "2024-01-17",
      source: "Partnership",
      assignedTo: "Emma Davis",
      notes: "Looking to expand services",
    },
  ]);

  const [teamStats, setTeamStats] = useState<TeamMemberStats[]>([
    {
      id: "TM-001",
      name: "Sarah Johnson",
      avatar: "",
      role: "Senior Sales Representative",
      coldCalls: 145,
      emailsSent: 89,
      proposalsSent: 23,
      customerVisits: 12,
      leadsAssigned: 34,
      conversions: 8,
      revenue: 480000,
      efficiency: 85,
    },
    {
      id: "TM-002",
      name: "Michael Brown",
      avatar: "",
      role: "Sales Representative",
      coldCalls: 112,
      emailsSent: 67,
      proposalsSent: 18,
      customerVisits: 9,
      leadsAssigned: 28,
      conversions: 6,
      revenue: 320000,
      efficiency: 78,
    },
    {
      id: "TM-003",
      name: "Alex Wilson",
      avatar: "",
      role: "Sales Representative",
      coldCalls: 98,
      emailsSent: 72,
      proposalsSent: 15,
      customerVisits: 7,
      leadsAssigned: 25,
      conversions: 5,
      revenue: 275000,
      efficiency: 72,
    },
    {
      id: "TM-004",
      name: "Emma Davis",
      avatar: "",
      role: "Account Manager",
      coldCalls: 76,
      emailsSent: 95,
      proposalsSent: 21,
      customerVisits: 15,
      leadsAssigned: 30,
      conversions: 9,
      revenue: 550000,
      efficiency: 92,
    },
    {
      id: "TM-005",
      name: "David Chen",
      avatar: "",
      role: "Junior Sales Representative",
      coldCalls: 134,
      emailsSent: 58,
      proposalsSent: 12,
      customerVisits: 5,
      leadsAssigned: 22,
      conversions: 3,
      revenue: 165000,
      efficiency: 65,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [csvData, setCsvData] = useState("");

  // Sales Circle Data (previously Sales Funnel)
  const salesCircleData = [
    { name: "Leads", value: 45, fill: "#f59e0b" },
    { name: "Onboarding", value: 28, fill: "#3b82f6" },
    { name: "Paying", value: 18, fill: "#10b981" },
    { name: "Returning", value: 9, fill: "#8b5cf6" },
  ];

  const teamPerformanceData = teamStats.map((member) => ({
    name: member.name.split(" ")[0],
    coldCalls: member.coldCalls,
    emails: member.emailsSent,
    proposals: member.proposalsSent,
    visits: member.customerVisits,
    conversions: member.conversions,
    revenue: member.revenue / 1000, // Convert to thousands
  }));

  const revenueData = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 48000 },
    { month: "Apr", revenue: 65000 },
    { month: "May", revenue: 58000 },
    { month: "Jun", revenue: 72000 },
  ];

  const handleStatusChange = (
    customerId: string,
    newStatus: Customer["status"],
  ) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === customerId
          ? { ...customer, status: newStatus }
          : customer,
      ),
    );
    toast({
      title: "Customer Status Updated",
      description: `Customer moved to ${newStatus}`,
    });
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setCsvData(text);
        // Parse CSV and add to customers
        toast({
          title: "CSV Uploaded",
          description: `CSV file processed successfully`,
        });
      };
      reader.readAsText(file);
    }
  };

  const handleCSVDownload = () => {
    const csvContent = [
      "ID,Name,Email,Phone,Company,Status,Estimated Value,Last Contact,Source,Assigned To,Notes",
      ...customers.map(
        (customer) =>
          `${customer.id},${customer.name},${customer.email},${customer.phone},${customer.company},${customer.status},${customer.estimatedValue},${customer.lastContact},${customer.source},${customer.assignedTo},"${customer.notes}"`,
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customers.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "CSV Downloaded",
      description: "Customer data exported successfully",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Leads":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0";
      case "Onboarding":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0";
      case "Paying":
        return "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0";
      case "Returning":
        return "bg-gradient-to-r from-purple-500 to-violet-600 text-white border-0";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0";
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalLeads = customers.filter((c) => c.status === "Leads").length;
  const totalOnboarding = customers.filter(
    (c) => c.status === "Onboarding",
  ).length;
  const totalPaying = customers.filter((c) => c.status === "Paying").length;
  const totalReturning = customers.filter(
    (c) => c.status === "Returning",
  ).length;
  const totalRevenue = customers
    .filter((c) => c.status === "Paying" || c.status === "Returning")
    .reduce((sum, c) => sum + c.estimatedValue, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
              Sales Management
            </h1>
            <p className="text-lg text-slate-600">
              Manage customer relationships through the complete sales circle
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleCSVDownload}
              className="border-2 border-emerald-300 hover:bg-emerald-50 text-emerald-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-2 border-teal-300 hover:bg-teal-50 text-teal-700"
            >
              <label>
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="hidden"
                />
              </label>
            </Button>
            <Dialog open={showAddCustomer} onOpenChange={setShowAddCustomer}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Customer
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl border-0 shadow-2xl bg-gradient-to-br from-white to-slate-50">
                <DialogHeader>
                  <DialogTitle className="text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Add New Customer</DialogTitle>
                  <DialogDescription className="text-slate-600">
                    Add a new customer to your sales circle
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="customerName" className="text-slate-700 font-medium">Customer Name</Label>
                      <Input
                        id="customerName"
                        placeholder="Enter customer name"
                        className="border-2 border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="customerEmail" className="text-slate-700 font-medium">Email Address</Label>
                      <Input
                        id="customerEmail"
                        type="email"
                        placeholder="customer@company.com"
                        className="border-2 border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="customerPhone" className="text-slate-700 font-medium">Phone Number</Label>
                      <Input
                        id="customerPhone"
                        placeholder="+234-XXX-XXX-XXXX"
                        className="border-2 border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="customerCompany" className="text-slate-700 font-medium">Company</Label>
                      <Input
                        id="customerCompany"
                        placeholder="Company Name"
                        className="border-2 border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="estimatedValue" className="text-slate-700 font-medium">Estimated Value (₦)</Label>
                      <Input
                        id="estimatedValue"
                        type="number"
                        placeholder="0"
                        className="border-2 border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="source" className="text-slate-700 font-medium">Source</Label>
                      <Select>
                        <SelectTrigger className="border-2 border-slate-200 focus:border-emerald-400">
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="referral">Referral</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="cold-call">Cold Call</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes" className="text-slate-700 font-medium">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any relevant notes..."
                      rows={3}
                      className="border-2 border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddCustomer(false)}
                    className="border-2 border-slate-300 hover:bg-slate-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setShowAddCustomer(false)}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0"
                  >
                    Add Customer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl p-1 h-12">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white rounded-lg">Overview</TabsTrigger>
            <TabsTrigger value="customers" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white rounded-lg">Customers</TabsTrigger>
            <TabsTrigger value="team-reports" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white rounded-lg">Team Reports</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white rounded-lg">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Leads
                      </p>
                      <div className="text-2xl font-bold text-yellow-600">{totalLeads}</div>
                    </div>
                    <Target className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Onboarding
                      </p>
                      <div className="text-2xl font-bold text-blue-600">{totalOnboarding}</div>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Paying
                      </p>
                      <div className="text-2xl font-bold text-green-600">{totalPaying}</div>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Returning
                      </p>
                      <div className="text-2xl font-bold text-purple-600">{totalReturning}</div>
                    </div>
                    <Award className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Revenue
                      </p>
                      <div className="text-2xl font-bold text-emerald-600">
                        ₦{(totalRevenue / 1000000).toFixed(1)}M
                      </div>
                    </div>
                    <TrendingUp className="h-8 w-8 text-emerald-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sales Circle and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
                <CardHeader>
                  <CardTitle className="text-slate-800">Sales Circle</CardTitle>
                  <CardDescription>
                    Customer distribution across sales stages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={salesCircleData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {salesCircleData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
                <CardHeader>
                  <CardTitle className="text-slate-800">Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [
                          `₦${value.toLocaleString()}`,
                          "Revenue",
                        ]}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team-reports" className="space-y-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
              <CardHeader>
                <CardTitle className="text-slate-800">Team Member Sales Activity</CardTitle>
                <CardDescription>
                  Detailed performance metrics for each team member
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {teamStats.map((member) => (
                    <Card key={member.id} className="border-2 border-slate-200 bg-gradient-to-r from-white to-slate-50">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-semibold text-slate-800">
                                {member.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {member.role}
                              </p>
                            </div>
                          </div>
                          <Badge
                            className={
                              member.efficiency >= 80
                                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0"
                                : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
                            }
                          >
                            {member.efficiency}% Efficiency
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                          <div className="text-center p-3 rounded-lg bg-gradient-to-r from-blue-100 to-blue-200">
                            <div className="flex items-center justify-center mb-2">
                              <Phone className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="text-2xl font-bold text-blue-700">
                              {member.coldCalls}
                            </div>
                            <p className="text-xs text-blue-600 font-medium">
                              Cold Calls
                            </p>
                          </div>

                          <div className="text-center p-3 rounded-lg bg-gradient-to-r from-green-100 to-green-200">
                            <div className="flex items-center justify-center mb-2">
                              <Mail className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="text-2xl font-bold text-green-700">
                              {member.emailsSent}
                            </div>
                            <p className="text-xs text-green-600 font-medium">
                              Emails Sent
                            </p>
                          </div>

                          <div className="text-center p-3 rounded-lg bg-gradient-to-r from-orange-100 to-orange-200">
                            <div className="flex items-center justify-center mb-2">
                              <FileText className="h-5 w-5 text-orange-600" />
                            </div>
                            <div className="text-2xl font-bold text-orange-700">
                              {member.proposalsSent}
                            </div>
                            <p className="text-xs text-orange-600 font-medium">
                              Proposals
                            </p>
                          </div>

                          <div className="text-center p-3 rounded-lg bg-gradient-to-r from-purple-100 to-purple-200">
                            <div className="flex items-center justify-center mb-2">
                              <MapPin className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="text-2xl font-bold text-purple-700">
                              {member.customerVisits}
                            </div>
                            <p className="text-xs text-purple-600 font-medium">
                              Visits
                            </p>
                          </div>

                          <div className="text-center p-3 rounded-lg bg-gradient-to-r from-cyan-100 to-cyan-200">
                            <div className="flex items-center justify-center mb-2">
                              <UserCheck className="h-5 w-5 text-cyan-600" />
                            </div>
                            <div className="text-2xl font-bold text-cyan-700">
                              {member.leadsAssigned}
                            </div>
                            <p className="text-xs text-cyan-600 font-medium">Leads</p>
                          </div>

                          <div className="text-center p-3 rounded-lg bg-gradient-to-r from-red-100 to-red-200">
                            <div className="flex items-center justify-center mb-2">
                              <Target className="h-5 w-5 text-red-600" />
                            </div>
                            <div className="text-2xl font-bold text-red-700">
                              {member.conversions}
                            </div>
                            <p className="text-xs text-red-600 font-medium">
                              Conversions
                            </p>
                          </div>

                          <div className="text-center p-3 rounded-lg bg-gradient-to-r from-emerald-100 to-emerald-200">
                            <div className="flex items-center justify-center mb-2">
                              <DollarSign className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div className="text-2xl font-bold text-emerald-700">
                              ₦{(member.revenue / 1000).toFixed(0)}K
                            </div>
                            <p className="text-xs text-emerald-600 font-medium">
                              Revenue
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team Performance Chart */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
              <CardHeader>
                <CardTitle className="text-slate-800">Team Performance Comparison</CardTitle>
                <CardDescription>
                  Activity metrics comparison across team members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={teamPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="coldCalls" fill="#3b82f6" name="Cold Calls" />
                    <Bar dataKey="emails" fill="#10b981" name="Emails" />
                    <Bar dataKey="proposals" fill="#f59e0b" name="Proposals" />
                    <Bar dataKey="visits" fill="#8b5cf6" name="Visits" />
                    <Bar
                      dataKey="conversions"
                      fill="#ef4444"
                      name="Conversions"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            {/* Search and Filter */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-slate-50">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search customers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-2 border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px] border-2 border-slate-200 focus:border-emerald-400">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Leads">Leads</SelectItem>
                      <SelectItem value="Onboarding">Onboarding</SelectItem>
                      <SelectItem value="Paying">Paying</SelectItem>
                      <SelectItem value="Returning">Returning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Customers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCustomers.map((customer) => (
                <Card
                  key={customer.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-slate-800">{customer.name}</CardTitle>
                        <CardDescription className="text-slate-600">{customer.company}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Move to Stage</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(customer.id, "Leads")
                            }
                          >
                            Leads
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(customer.id, "Onboarding")
                            }
                          >
                            Onboarding
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(customer.id, "Paying")
                            }
                          >
                            Paying
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(customer.id, "Returning")
                            }
                          >
                            Returning
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status}
                      </Badge>
                      <span className="text-lg font-semibold text-emerald-600">
                        ₦{customer.estimatedValue.toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Assigned to {customer.assignedTo}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          Last contact:{" "}
                          {new Date(customer.lastContact).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {customer.notes}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
                <CardHeader>
                  <CardTitle className="text-slate-800">Conversion Rates</CardTitle>
                  <CardDescription>
                    Performance across sales stages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Leads to Onboarding</span>
                        <span className="font-medium">62%</span>
                      </div>
                      <Progress value={62} className="h-3 bg-gradient-to-r from-yellow-200 to-blue-200" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Onboarding to Paying</span>
                        <span className="font-medium">64%</span>
                      </div>
                      <Progress value={64} className="h-3 bg-gradient-to-r from-blue-200 to-green-200" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Paying to Returning</span>
                        <span className="font-medium">50%</span>
                      </div>
                      <Progress value={50} className="h-3 bg-gradient-to-r from-green-200 to-purple-200" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
                <CardHeader>
                  <CardTitle className="text-slate-800">Source Performance</CardTitle>
                  <CardDescription>
                    Customer acquisition by source
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Website", "Referral", "LinkedIn", "Partnership"].map(
                      (source, index) => {
                        const percentage = [35, 28, 22, 15][index];
                        const colors = [
                          "from-blue-200 to-cyan-200",
                          "from-green-200 to-emerald-200",
                          "from-purple-200 to-violet-200",
                          "from-orange-200 to-red-200"
                        ];
                        return (
                          <div key={source} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{source}</span>
                              <span className="font-medium">{percentage}%</span>
                            </div>
                            <Progress value={percentage} className={`h-3 bg-gradient-to-r ${colors[index]}`} />
                          </div>
                        );
                      },
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SalesManagement;
