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
  TrendingUp,
  TrendingDown,
  DollarSign,
  UserPlus,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  Target,
  Activity,
  BarChart3,
  PieChart,
  FileText,
  Eye,
  MoveRight,
} from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";

const customers = [
  {
    id: "LEAD-001",
    name: "John Anderson",
    email: "john.anderson@techcorp.com",
    phone: "+1-555-0123",
    company: "TechCorp Solutions",
    status: "Lead",
    source: "Website",
    value: 15000,
    createdDate: "2024-01-25",
    lastContact: "2024-01-26",
    nextFollowUp: "2024-01-28",
    assignedTo: "Sarah Wilson",
    tags: ["enterprise", "tech"],
    notes: "Interested in project management solution for 50+ team",
  },
  {
    id: "ONBOARD-001",
    name: "Emily Chen",
    email: "emily.chen@innovate.com",
    phone: "+1-555-0124",
    company: "Innovate Labs",
    status: "Onboarding",
    source: "Referral",
    value: 25000,
    createdDate: "2024-01-20",
    lastContact: "2024-01-25",
    nextFollowUp: "2024-01-30",
    assignedTo: "John Doe",
    tags: ["startup", "innovation"],
    notes: "Signed contract, setting up initial project structure",
  },
  {
    id: "PAYING-001",
    name: "Michael Torres",
    email: "michael.torres@globalinc.com",
    phone: "+1-555-0125",
    company: "Global Inc",
    status: "Paying Customer",
    source: "Direct Sales",
    value: 45000,
    createdDate: "2024-01-15",
    lastContact: "2024-01-26",
    nextFollowUp: "2024-02-15",
    assignedTo: "Alex Rodriguez",
    tags: ["enterprise", "global"],
    notes: "Active subscription, considering expansion",
  },
  {
    id: "RETURN-001",
    name: "Lisa Rodriguez",
    email: "lisa.rodriguez@design.studio",
    phone: "+1-555-0126",
    company: "Creative Design Studio",
    status: "Returning Customer",
    source: "Previous Client",
    value: 12000,
    createdDate: "2023-11-10",
    lastContact: "2024-01-24",
    nextFollowUp: "2024-02-01",
    assignedTo: "Emma Thompson",
    tags: ["creative", "returning"],
    notes: "Previous client returning for new project",
  },
  {
    id: "LEAD-002",
    name: "David Park",
    email: "david.park@startup.co",
    phone: "+1-555-0127",
    company: "StartupCo",
    status: "Lead",
    source: "Social Media",
    value: 8000,
    createdDate: "2024-01-24",
    lastContact: "2024-01-25",
    nextFollowUp: "2024-01-29",
    assignedTo: "Sarah Wilson",
    tags: ["startup", "small"],
    notes: "Early stage startup, budget conscious",
  },
];

const salesFunnelData = [
  { name: "Leads", value: 150, fill: "#8884d8" },
  { name: "Qualified", value: 80, fill: "#82ca9d" },
  { name: "Proposal", value: 40, fill: "#ffc658" },
  { name: "Negotiation", value: 20, fill: "#ff7300" },
  { name: "Closed Won", value: 12, fill: "#00ff00" },
];

const salesMetrics = [
  { month: "Oct", leads: 120, onboarding: 15, paying: 45, returning: 8 },
  { month: "Nov", leads: 135, onboarding: 18, paying: 52, returning: 12 },
  { month: "Dec", leads: 140, onboarding: 22, paying: 58, returning: 15 },
  { month: "Jan", leads: 150, onboarding: 25, paying: 63, returning: 18 },
];

const revenueData = [
  { month: "Oct", revenue: 145000, target: 150000 },
  { month: "Nov", revenue: 162000, target: 160000 },
  { month: "Dec", revenue: 178000, target: 170000 },
  { month: "Jan", revenue: 195000, target: 180000 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Lead":
      return "secondary";
    case "Onboarding":
      return "default";
    case "Paying Customer":
      return "success";
    case "Returning Customer":
      return "info";
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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function SalesManagement() {
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isUploadLeadsOpen, setIsUploadLeadsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;
    const matchesSource =
      sourceFilter === "all" || customer.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const salesStats = {
    totalLeads: customers.filter((c) => c.status === "Lead").length,
    onboarding: customers.filter((c) => c.status === "Onboarding").length,
    payingCustomers: customers.filter((c) => c.status === "Paying Customer")
      .length,
    returningCustomers: customers.filter(
      (c) => c.status === "Returning Customer",
    ).length,
    totalValue: customers.reduce((acc, c) => acc + c.value, 0),
    avgDealSize: Math.round(
      customers.reduce((acc, c) => acc + c.value, 0) / customers.length,
    ),
  };

  const conversionRate = Math.round(
    (salesStats.payingCustomers / salesStats.totalLeads) * 100,
  );

  const generateCSVTemplate = () => {
    const csvContent = "Name,Email,Phone,Company,Source,Value,Notes\n";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customer_leads_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const moveCustomerStatus = (customerId: string, newStatus: string) => {
    // In a real app, this would make an API call
    console.log(`Moving customer ${customerId} to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Sales Management
          </h1>
          <p className="text-muted-foreground">
            Manage customer pipeline from leads to paying customers.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={generateCSVTemplate}>
            <Download className="mr-2 h-4 w-4" />
            CSV Template
          </Button>
          <Dialog open={isUploadLeadsOpen} onOpenChange={setIsUploadLeadsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Leads
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Upload Customer Leads</DialogTitle>
                <DialogDescription>
                  Upload a CSV file with customer lead information.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="csvFile">CSV File</Label>
                  <Input id="csvFile" type="file" accept=".csv" />
                  <p className="text-sm text-muted-foreground">
                    Upload a CSV file with columns: Name, Email, Phone, Company,
                    Source, Value, Notes
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateCSVTemplate}
                  >
                    <Download className="mr-2 h-3 w-3" />
                    Download Template
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsUploadLeadsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Upload Leads</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Customer Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Customer Lead</DialogTitle>
                <DialogDescription>
                  Add a new customer lead to your sales pipeline.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="customerName">Name *</Label>
                    <Input id="customerName" placeholder="Customer name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="customerCompany">Company</Label>
                    <Input id="customerCompany" placeholder="Company name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="customerEmail">Email *</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      placeholder="email@company.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="customerPhone">Phone Number *</Label>
                    <Input
                      id="customerPhone"
                      placeholder="+1-555-0123"
                      type="tel"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="leadSource">Lead Source</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="social-media">
                          Social Media
                        </SelectItem>
                        <SelectItem value="direct-sales">
                          Direct Sales
                        </SelectItem>
                        <SelectItem value="advertising">Advertising</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="estimatedValue">Estimated Value ($)</Label>
                    <Input
                      id="estimatedValue"
                      type="number"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignTo">Assign To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Doe</SelectItem>
                      <SelectItem value="sarah">Sarah Wilson</SelectItem>
                      <SelectItem value="alex">Alex Rodriguez</SelectItem>
                      <SelectItem value="emma">Emma Thompson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional information about the lead"
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    placeholder="e.g., enterprise, tech, startup"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddCustomerOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Lead</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Sales Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesStats.totalLeads}</div>
            <p className="text-xs text-muted-foreground">New prospects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Onboarding</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {salesStats.onboarding}
            </div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Paying Customers
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {salesStats.payingCustomers}
            </div>
            <p className="text-xs text-muted-foreground">Active revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Returning Customers
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">
              {salesStats.returningCustomers}
            </div>
            <p className="text-xs text-muted-foreground">Repeat business</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(salesStats.totalValue)}
            </div>
            <p className="text-xs text-muted-foreground">Pipeline value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Lead to customer</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Funnel and Analytics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Sales Pipeline Trends</CardTitle>
            <CardDescription>
              Customer progression through sales stages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="leads" fill="hsl(var(--primary))" name="Leads" />
                <Bar
                  dataKey="onboarding"
                  fill="hsl(var(--secondary))"
                  name="Onboarding"
                />
                <Bar
                  dataKey="paying"
                  fill="hsl(var(--success))"
                  name="Paying"
                />
                <Bar
                  dataKey="returning"
                  fill="hsl(var(--info))"
                  name="Returning"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Funnel</CardTitle>
            <CardDescription>Conversion rates by stage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={salesFunnelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {salesFunnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {salesFunnelData.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Target</CardTitle>
          <CardDescription>Monthly revenue performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [formatCurrency(value as number), ""]}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--success))"
                strokeWidth={3}
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Target"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Customer Pipeline */}
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Customers</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
            <TabsTrigger value="paying">Paying</TabsTrigger>
            <TabsTrigger value="returning">Returning</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-4">
            <div className="flex-1 max-w-sm">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="Website">Website</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
                <SelectItem value="Social Media">Social Media</SelectItem>
                <SelectItem value="Direct Sales">Direct Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all">
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" alt={customer.name} />
                        <AvatarFallback>
                          {getInitials(customer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          {customer.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {customer.company}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {customer.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge variant={getStatusColor(customer.status) as any}>
                          {customer.status}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">
                          {formatCurrency(customer.value)}
                        </div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div>Assigned to: {customer.assignedTo}</div>
                        <div>Source: {customer.source}</div>
                        <div>Next: {formatDate(customer.nextFollowUp)}</div>
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
                            Edit Customer
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              moveCustomerStatus(customer.id, "Onboarding")
                            }
                          >
                            <MoveRight className="mr-2 h-4 w-4" />
                            Move to Onboarding
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              moveCustomerStatus(customer.id, "Paying Customer")
                            }
                          >
                            <MoveRight className="mr-2 h-4 w-4" />
                            Move to Paying
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              moveCustomerStatus(
                                customer.id,
                                "Returning Customer",
                              )
                            }
                          >
                            <MoveRight className="mr-2 h-4 w-4" />
                            Move to Returning
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  {customer.notes && (
                    <div className="mt-4 text-sm text-muted-foreground">
                      <strong>Notes:</strong> {customer.notes}
                    </div>
                  )}
                  {customer.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {customer.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Similar content for other tabs but filtered by status */}
        <TabsContent value="leads">
          <div className="space-y-4">
            {filteredCustomers
              .filter((c) => c.status === "Lead")
              .map((customer) => (
                <Card key={customer.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="" alt={customer.name} />
                          <AvatarFallback>
                            {getInitials(customer.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">
                            {customer.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {customer.company}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {customer.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {customer.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge
                            variant={getStatusColor(customer.status) as any}
                          >
                            {customer.status}
                          </Badge>
                          <div className="text-sm text-muted-foreground mt-1">
                            {formatCurrency(customer.value)}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() =>
                            moveCustomerStatus(customer.id, "Onboarding")
                          }
                        >
                          <ArrowRight className="mr-2 h-4 w-4" />
                          Move to Onboarding
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* Add similar TabsContent for other statuses */}
      </Tabs>
    </div>
  );
}
