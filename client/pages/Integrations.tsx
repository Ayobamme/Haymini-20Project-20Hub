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
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Settings,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Zap,
  Globe,
  Key,
  Webhook,
  Calendar,
  Mail,
  MessageSquare,
  FileText,
  BarChart3,
  Users,
  Database,
  Cloud,
  Shield,
  Activity,
  RefreshCw,
  Eye,
} from "lucide-react";

const availableIntegrations = [
  {
    id: "google-workspace",
    name: "Google Workspace",
    description:
      "Integrate with Gmail, Google Calendar, Google Drive, and Google Meet for seamless collaboration.",
    category: "Productivity",
    icon: "🔍",
    features: [
      "Gmail integration",
      "Calendar sync",
      "Drive file sharing",
      "Meet scheduling",
    ],
    pricing: "Free",
    status: "Available",
    isPopular: true,
  },
  {
    id: "microsoft-teams",
    name: "Microsoft Teams",
    description:
      "Connect with Microsoft Teams for chat, meetings, and file collaboration.",
    category: "Communication",
    icon: "💬",
    features: [
      "Teams chat",
      "Video meetings",
      "File sharing",
      "Channel integration",
    ],
    pricing: "Free",
    status: "Available",
    isPopular: true,
  },
  {
    id: "slack",
    name: "Slack",
    description:
      "Integrate with Slack for team communication and workflow automation.",
    category: "Communication",
    icon: "#️⃣",
    features: [
      "Channel notifications",
      "Direct messages",
      "Workflow automation",
      "App integrations",
    ],
    pricing: "Free",
    status: "Available",
    isPopular: true,
  },
  {
    id: "asana",
    name: "Asana",
    description:
      "Sync projects and tasks with Asana for enhanced project management.",
    category: "Project Management",
    icon: "📋",
    features: [
      "Project sync",
      "Task management",
      "Team collaboration",
      "Progress tracking",
    ],
    pricing: "Free",
    status: "Available",
    isPopular: false,
  },
  {
    id: "jira",
    name: "Jira",
    description:
      "Connect with Jira for issue tracking and agile project management.",
    category: "Development",
    icon: "🐛",
    features: [
      "Issue tracking",
      "Sprint planning",
      "Bug reporting",
      "Agile boards",
    ],
    pricing: "Paid",
    status: "Available",
    isPopular: false,
  },
  {
    id: "github",
    name: "GitHub",
    description:
      "Integrate with GitHub for code repository management and version control.",
    category: "Development",
    icon: "🐙",
    features: [
      "Repository sync",
      "Pull request tracking",
      "Issue management",
      "Code reviews",
    ],
    pricing: "Free",
    status: "Available",
    isPopular: false,
  },
  {
    id: "zoho",
    name: "Zoho CRM",
    description:
      "Connect with Zoho CRM for customer relationship management and sales tracking.",
    category: "CRM",
    icon: "👥",
    features: [
      "Contact management",
      "Sales pipeline",
      "Lead tracking",
      "Customer data",
    ],
    pricing: "Paid",
    status: "Available",
    isPopular: false,
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description:
      "Integrate with Salesforce for comprehensive customer relationship management.",
    category: "CRM",
    icon: "☁️",
    features: [
      "Lead management",
      "Opportunity tracking",
      "Customer insights",
      "Sales automation",
    ],
    pricing: "Paid",
    status: "Available",
    isPopular: false,
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description:
      "Connect with HubSpot for marketing automation and customer management.",
    category: "Marketing",
    icon: "🎯",
    features: [
      "Marketing automation",
      "Contact management",
      "Email campaigns",
      "Analytics",
    ],
    pricing: "Freemium",
    status: "Available",
    isPopular: false,
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Automate workflows and connect with 5000+ apps using Zapier.",
    category: "Automation",
    icon: "⚡",
    features: [
      "Workflow automation",
      "App connections",
      "Trigger actions",
      "Data sync",
    ],
    pricing: "Freemium",
    status: "Available",
    isPopular: true,
  },
];

const activeIntegrations = [
  {
    id: "google-workspace",
    name: "Google Workspace",
    status: "Connected",
    lastSync: "2024-01-26 15:30",
    dataPoints: 1250,
    health: "Healthy",
    config: {
      apiKey: "AIza***************xyz",
      endpoint: "https://www.googleapis.com/",
      syncFrequency: "Real-time",
    },
    features: ["Gmail", "Calendar", "Drive", "Meet"],
    usage: {
      emails: 45,
      events: 12,
      files: 89,
      meetings: 8,
    },
  },
  {
    id: "slack",
    name: "Slack",
    status: "Connected",
    lastSync: "2024-01-26 14:45",
    dataPoints: 850,
    health: "Healthy",
    config: {
      webhook: "https://hooks.slack.com/services/T****/B****/***",
      channels: ["#general", "#dev-team", "#project-alpha"],
      syncFrequency: "Every 5 minutes",
    },
    features: ["Notifications", "Channels", "Direct Messages"],
    usage: {
      messages: 120,
      notifications: 35,
      channels: 3,
      users: 25,
    },
  },
  {
    id: "github",
    name: "GitHub",
    status: "Connected",
    lastSync: "2024-01-26 16:00",
    dataPoints: 450,
    health: "Warning",
    config: {
      token: "ghp_***************xyz",
      repositories: ["project-alpha", "admin-dashboard"],
      syncFrequency: "Every 15 minutes",
    },
    features: ["Repositories", "Issues", "Pull Requests"],
    usage: {
      commits: 28,
      issues: 12,
      pullRequests: 8,
      repositories: 2,
    },
  },
  {
    id: "jira",
    name: "Jira",
    status: "Error",
    lastSync: "2024-01-25 09:20",
    dataPoints: 0,
    health: "Disconnected",
    config: {
      domain: "company.atlassian.net",
      username: "admin@company.com",
      syncFrequency: "Every 30 minutes",
    },
    features: ["Issues", "Projects", "Sprints"],
    usage: {
      issues: 0,
      projects: 0,
      sprints: 0,
      users: 0,
    },
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Connected":
      return "success";
    case "Error":
      return "destructive";
    case "Syncing":
      return "default";
    case "Disconnected":
      return "secondary";
    default:
      return "secondary";
  }
};

const getHealthColor = (health: string) => {
  switch (health) {
    case "Healthy":
      return "success";
    case "Warning":
      return "default";
    case "Critical":
      return "destructive";
    case "Disconnected":
      return "secondary";
    default:
      return "secondary";
  }
};

const getHealthIcon = (health: string) => {
  switch (health) {
    case "Healthy":
      return CheckCircle2;
    case "Warning":
      return AlertTriangle;
    case "Critical":
      return XCircle;
    case "Disconnected":
      return XCircle;
    default:
      return AlertTriangle;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Productivity":
      return FileText;
    case "Communication":
      return MessageSquare;
    case "Project Management":
      return BarChart3;
    case "Development":
      return Database;
    case "CRM":
      return Users;
    case "Marketing":
      return Mail;
    case "Automation":
      return Zap;
    default:
      return Globe;
  }
};

const formatDateTime = (dateTimeString: string) => {
  return new Date(dateTimeString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export default function Integrations() {
  const [isAddIntegrationOpen, setIsAddIntegrationOpen] = useState(false);
  const [isConfigureOpen, setIsConfigureOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredAvailableIntegrations = availableIntegrations.filter(
    (integration) => {
      const matchesSearch = integration.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || integration.category === categoryFilter;
      return matchesSearch && matchesCategory;
    },
  );

  const filteredActiveIntegrations = activeIntegrations.filter(
    (integration) => {
      const matchesSearch = integration.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || integration.status === statusFilter;
      return matchesSearch && matchesStatus;
    },
  );

  const integrationStats = {
    totalActive: activeIntegrations.length,
    healthy: activeIntegrations.filter((i) => i.health === "Healthy").length,
    warnings: activeIntegrations.filter((i) => i.health === "Warning").length,
    errors: activeIntegrations.filter(
      (i) => i.status === "Error" || i.health === "Disconnected",
    ).length,
    totalDataPoints: activeIntegrations.reduce(
      (acc, i) => acc + i.dataPoints,
      0,
    ),
    avgSyncTime: "2.3s",
  };

  const categories = [...new Set(availableIntegrations.map((i) => i.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground">
            Connect with external tools and services to streamline your
            workflow.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog
            open={isAddIntegrationOpen}
            onOpenChange={setIsAddIntegrationOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Integration
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Integration</DialogTitle>
                <DialogDescription>
                  Select and configure a new integration from available
                  services.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[400px] overflow-y-auto">
                <div className="grid gap-2">
                  <Label htmlFor="integrationSelect">Select Integration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an integration" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableIntegrations.map((integration) => (
                        <SelectItem key={integration.id} value={integration.id}>
                          {integration.icon} {integration.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="integrationName">Integration Name</Label>
                  <Input
                    id="integrationName"
                    placeholder="Custom name for this integration"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="apiKey">API Key / Token</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="Enter API key or authentication token"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endpoint">Endpoint URL (if applicable)</Label>
                  <Input id="endpoint" placeholder="https://api.example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="syncFrequency">Sync Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sync frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="5min">Every 5 minutes</SelectItem>
                      <SelectItem value="15min">Every 15 minutes</SelectItem>
                      <SelectItem value="30min">Every 30 minutes</SelectItem>
                      <SelectItem value="1hour">Every hour</SelectItem>
                      <SelectItem value="manual">Manual only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="autoSync" />
                  <Label htmlFor="autoSync">Enable automatic sync</Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddIntegrationOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Connect Integration</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Integration Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Integrations
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {integrationStats.totalActive}
            </div>
            <p className="text-xs text-muted-foreground">Connected services</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthy</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {integrationStats.healthy}
            </div>
            <p className="text-xs text-muted-foreground">Working properly</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {integrationStats.warnings}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {integrationStats.errors}
            </div>
            <p className="text-xs text-muted-foreground">
              Require immediate action
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Points</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {integrationStats.totalDataPoints.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Synced today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Sync Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {integrationStats.avgSyncTime}
            </div>
            <p className="text-xs text-muted-foreground">Response time</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Integrations</TabsTrigger>
          <TabsTrigger value="available">Available Integrations</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {/* Filters for Active Integrations */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 max-w-sm">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search integrations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Connected">Connected</SelectItem>
                  <SelectItem value="Error">Error</SelectItem>
                  <SelectItem value="Syncing">Syncing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Integrations Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredActiveIntegrations.map((integration) => {
              const HealthIcon = getHealthIcon(integration.health);
              return (
                <Card
                  key={integration.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">
                            {integration.name}
                          </CardTitle>
                          <Badge
                            variant={getStatusColor(integration.status) as any}
                          >
                            {integration.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <HealthIcon className="h-4 w-4" />
                          <span className="text-sm text-muted-foreground">
                            {integration.health}
                          </span>
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
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedIntegration(integration);
                              setIsConfigureOpen(true);
                            }}
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            Configure
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Sync Now
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Logs
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Disconnect
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Sync Info */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Last Sync</span>
                        <span className="font-medium">
                          {formatDateTime(integration.lastSync)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Data Points</span>
                        <span className="font-medium">
                          {integration.dataPoints.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Sync Frequency</span>
                        <span className="font-medium">
                          {integration.config.syncFrequency}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Features</div>
                      <div className="flex flex-wrap gap-1">
                        {integration.features.map((feature) => (
                          <Badge
                            key={feature}
                            variant="outline"
                            className="text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Usage Stats */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Today's Usage</div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(integration.usage).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between p-2 bg-muted rounded"
                            >
                              <span className="capitalize">
                                {key.replace(/([A-Z])/g, " $1")}
                              </span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Status Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setSelectedIntegration(integration);
                          setIsConfigureOpen(true);
                        }}
                      >
                        <Settings className="mr-2 h-3 w-3" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="available">
          {/* Filters for Available Integrations */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 max-w-sm">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search integrations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Available Integrations Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAvailableIntegrations.map((integration) => {
              const CategoryIcon = getCategoryIcon(integration.category);
              return (
                <Card
                  key={integration.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{integration.icon}</span>
                          <CardTitle className="text-lg">
                            {integration.name}
                          </CardTitle>
                          {integration.isPopular && (
                            <Badge variant="secondary">Popular</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {integration.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-sm">
                      {integration.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Features */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Features</div>
                      <ul className="text-sm space-y-1">
                        {integration.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-muted-foreground"
                          >
                            <CheckCircle2 className="h-3 w-3 text-success" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Pricing: </span>
                        <span className="font-medium">
                          {integration.pricing}
                        </span>
                      </div>
                      <Badge variant="outline">{integration.status}</Badge>
                    </div>

                    {/* Connect Button */}
                    <Button
                      className="w-full"
                      onClick={() => {
                        setSelectedIntegration(integration);
                        setIsAddIntegrationOpen(true);
                      }}
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="webhooks">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Management</CardTitle>
              <CardDescription>
                Configure webhooks for real-time data synchronization and event
                notifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">
                        Incoming Webhooks
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Project Updates</div>
                            <div className="text-sm text-muted-foreground">
                              /webhooks/projects
                            </div>
                          </div>
                          <Badge variant="success">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Task Events</div>
                            <div className="text-sm text-muted-foreground">
                              /webhooks/tasks
                            </div>
                          </div>
                          <Badge variant="success">Active</Badge>
                        </div>
                        <Button variant="outline" className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Webhook
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">
                        Outgoing Webhooks
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">
                              Slack Notifications
                            </div>
                            <div className="text-sm text-muted-foreground">
                              hooks.slack.com/...
                            </div>
                          </div>
                          <Badge variant="success">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Teams Updates</div>
                            <div className="text-sm text-muted-foreground">
                              outlook.office.com/...
                            </div>
                          </div>
                          <Badge variant="destructive">Failed</Badge>
                        </div>
                        <Button variant="outline" className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Webhook
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Webhook Logs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <div>
                            <div className="font-medium">
                              Project created: E-commerce Platform
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Sent to Slack • 2 minutes ago
                            </div>
                          </div>
                        </div>
                        <Badge variant="success">200</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <XCircle className="h-4 w-4 text-destructive" />
                          <div>
                            <div className="font-medium">
                              Task assignment notification
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Failed to Teams • 5 minutes ago
                            </div>
                          </div>
                        </div>
                        <Badge variant="destructive">404</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <div>
                            <div className="font-medium">
                              Issue resolved: Login page bug
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Sent to GitHub • 10 minutes ago
                            </div>
                          </div>
                        </div>
                        <Badge variant="success">200</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Configure Integration Dialog */}
      <Dialog open={isConfigureOpen} onOpenChange={setIsConfigureOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Configure {selectedIntegration?.name}</DialogTitle>
            <DialogDescription>
              Update integration settings and configuration.
            </DialogDescription>
          </DialogHeader>
          {selectedIntegration && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="configName">Integration Name</Label>
                <Input
                  id="configName"
                  defaultValue={selectedIntegration.name}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="configSync">Sync Frequency</Label>
                <Select defaultValue="15min">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="5min">Every 5 minutes</SelectItem>
                    <SelectItem value="15min">Every 15 minutes</SelectItem>
                    <SelectItem value="30min">Every 30 minutes</SelectItem>
                    <SelectItem value="1hour">Every hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="configKey">API Key / Token</Label>
                <Input
                  id="configKey"
                  type="password"
                  defaultValue="••••••••••••••••"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="configEndpoint">Endpoint</Label>
                <Input
                  id="configEndpoint"
                  defaultValue={selectedIntegration.config?.endpoint || ""}
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch id="autoSync" defaultChecked />
                  <Label htmlFor="autoSync">Enable automatic sync</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="notifications" defaultChecked />
                  <Label htmlFor="notifications">Send notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="logging" />
                  <Label htmlFor="logging">Enable detailed logging</Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline">
              Test Connection
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsConfigureOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
