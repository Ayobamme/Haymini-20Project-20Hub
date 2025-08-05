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
      status: "Leads",
      estimatedValue: 25000,
      lastContact: "2024-01-15",
      source: "Website",
      assignedTo: "Sarah Johnson",
      notes: "Interested in enterprise package",
    },
    {
      id: "2",
      name: "Mary Johnson",
      email: "mary@startup.co",
      phone: "+234 902 345 6789",
      company: "StartupCo",
      status: "Onboarding",
      estimatedValue: 15000,
      lastContact: "2024-01-14",
      source: "Referral",
      assignedTo: "Michael Chen",
      notes: "Ready to sign contract next week",
    },
    {
      id: "3",
      name: "Robert Wilson",
      email: "rob@innovate.ng",
      phone: "+234 903 456 7890",
      company: "Innovate Nigeria",
      status: "Paying",
      estimatedValue: 45000,
      lastContact: "2024-01-13",
      source: "LinkedIn",
      assignedTo: "Sarah Johnson",
      notes: "Looking to upgrade plan",
    },
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
      target: 200000,
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
      target: 150000,
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
      target: 180000,
    },
  ]);

  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Leads",
    estimatedValue: "",
    source: "",
    assignedTo: "",
    notes: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const salesData = [
    { month: "Jan", revenue: 145000, target: 150000 },
    { month: "Feb", revenue: 168000, target: 160000 },
    { month: "Mar", revenue: 180000, target: 170000 },
    { month: "Apr", revenue: 195000, target: 180000 },
    { month: "May", revenue: 220000, target: 200000 },
    { month: "Jun", revenue: 245000, target: 220000 },
  ];

  const statusDistribution = [
    { name: "Leads", value: 45, color: "#3b82f6" },
    { name: "Onboarding", value: 25, color: "#f59e0b" },
    { name: "Paying", value: 20, color: "#22c55e" },
    { name: "Returning", value: 10, color: "#8b5cf6" },
  ];

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: Customer["status"]) => {
    switch (status) {
      case "Leads":
        return "default";
      case "Onboarding":
        return "secondary";
      case "Paying":
        return "default";
      case "Returning":
        return "outline";
      default:
        return "outline";
    }
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
      lastContact: new Date().toISOString().split("T")[0],
      status: newCustomer.status as Customer["status"],
    };

    setCustomers([...customers, customer]);
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "Leads",
      estimatedValue: "",
      source: "",
      assignedTo: "",
      notes: "",
    });
    setIsAddCustomerOpen(false);

    toast({
      title: "Customer Added",
      description: `${customer.name} has been added to the sales pipeline.`,
    });
  };

  const totalRevenue = teamStats.reduce(
    (sum, member) => sum + member.revenue,
    0,
  );
  const totalTarget = teamStats.reduce((sum, member) => sum + member.target, 0);
  const achievementRate = Math.round((totalRevenue / totalTarget) * 100);

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
              Track sales performance, manage customer relationships, and
              monitor team activities
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Dialog
              open={isAddCustomerOpen}
              onOpenChange={setIsAddCustomerOpen}
            >
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₦{(totalRevenue / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">
                {achievementRate}% of target achieved
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Customers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
              <p className="text-xs text-muted-foreground">
                {customers.filter((c) => c.status === "Paying").length} paying
                customers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Conversion Rate
              </CardTitle>
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
              <CardTitle className="text-sm font-medium">
                Team Performance
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{achievementRate}%</div>
              <p className="text-xs text-muted-foreground">
                Target achievement rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Revenue vs Target</CardTitle>
              <CardDescription>
                Monthly revenue performance against targets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [
                      `₦${((value as number) / 1000).toFixed(0)}K`,
                      "",
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                  <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Status</CardTitle>
              <CardDescription>
                Distribution of customer pipeline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {statusDistribution.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="customers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="team">Team Performance</TabsTrigger>
          </TabsList>

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
                    <SelectItem value="Leads">Leads</SelectItem>
                    <SelectItem value="Onboarding">Onboarding</SelectItem>
                    <SelectItem value="Paying">Paying</SelectItem>
                    <SelectItem value="Returning">Returning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Customer List */}
            <div className="grid gap-4">
              {filteredCustomers.map((customer) => (
                <Card
                  key={customer.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h3 className="font-semibold">{customer.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {customer.company}
                          </p>
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
                        </div>
                        <div className="text-lg font-bold">
                          ₦{customer.estimatedValue.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Assigned to: {customer.assignedTo}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last contact:{" "}
                          {new Date(customer.lastContact).toLocaleDateString()}
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Customer
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            Schedule Call
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Customer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    {customer.notes && (
                      <div className="mt-4 p-3 bg-muted rounded-md">
                        <p className="text-sm">
                          <strong>Notes:</strong> {customer.notes}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <div className="grid gap-4">
              {teamStats.map((member) => (
                <Card
                  key={member.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {member.role}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-8 text-center">
                        <div>
                          <div className="text-lg font-bold">
                            {member.coldCalls}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Cold Calls
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">
                            {member.emailsSent}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Emails Sent
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">
                            {member.meetings}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Meetings
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">
                            {member.dealsWon}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Deals Won
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">
                            ₦{(member.revenue / 1000).toFixed(0)}K
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Revenue
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">
                            {Math.round((member.revenue / member.target) * 100)}
                            %
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Target Achievement
                          </div>
                          <Progress
                            value={(member.revenue / member.target) * 100}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

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
                  onChange={(e) =>
                    setNewCustomer((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Enter customer name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) =>
                    setNewCustomer((prev) => ({
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
                  value={newCustomer.phone}
                  onChange={(e) =>
                    setNewCustomer((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={newCustomer.company}
                  onChange={(e) =>
                    setNewCustomer((prev) => ({
                      ...prev,
                      company: e.target.value,
                    }))
                  }
                  placeholder="Enter company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newCustomer.status}
                  onValueChange={(value) =>
                    setNewCustomer((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Leads">Leads</SelectItem>
                    <SelectItem value="Onboarding">Onboarding</SelectItem>
                    <SelectItem value="Paying">Paying</SelectItem>
                    <SelectItem value="Returning">Returning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedValue">Estimated Value (₦)</Label>
                <Input
                  id="estimatedValue"
                  type="number"
                  value={newCustomer.estimatedValue}
                  onChange={(e) =>
                    setNewCustomer((prev) => ({
                      ...prev,
                      estimatedValue: e.target.value,
                    }))
                  }
                  placeholder="Enter estimated value"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Select
                  value={newCustomer.source}
                  onValueChange={(value) =>
                    setNewCustomer((prev) => ({ ...prev, source: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Referral">Referral</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Cold Call">Cold Call</SelectItem>
                    <SelectItem value="Email Campaign">
                      Email Campaign
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignedTo">Assigned To</Label>
                <Select
                  value={newCustomer.assignedTo}
                  onValueChange={(value) =>
                    setNewCustomer((prev) => ({ ...prev, assignedTo: value }))
                  }
                >
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
              <div className="col-span-2 space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newCustomer.notes}
                  onChange={(e) =>
                    setNewCustomer((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  placeholder="Additional notes about the customer"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddCustomerOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddCustomer}>Add Customer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SalesManagement;
