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
  Package,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Truck,
  Warehouse,
  BarChart3,
  ShoppingCart,
  Eye,
  Calendar,
  DollarSign,
  Archive,
  RefreshCw,
} from "lucide-react";

const inventoryItems = [
  {
    id: "ITM-001",
    name: 'MacBook Pro 16"',
    description: "Apple MacBook Pro 16-inch with M2 Pro chip",
    category: "Electronics",
    sku: "MBP-16-M2-001",
    currentStock: 12,
    minStock: 5,
    maxStock: 25,
    unitPrice: 2499.0,
    totalValue: 29988.0,
    supplier: "Apple Inc.",
    location: "Warehouse A - Section 2",
    lastRestocked: "2024-01-20",
    nextReorderDate: "2024-02-15",
    status: "In Stock",
    tags: ["laptop", "computer", "apple"],
    reorderPoint: 8,
    leadTime: 7, // days
    avgUsage: 2, // per month
  },
  {
    id: "ITM-002",
    name: "Wireless Mouse",
    description: "Logitech MX Master 3 wireless mouse",
    category: "Peripherals",
    sku: "LGT-MX3-001",
    currentStock: 3,
    minStock: 10,
    maxStock: 50,
    unitPrice: 99.99,
    totalValue: 299.97,
    supplier: "Logitech",
    location: "Warehouse B - Section 1",
    lastRestocked: "2024-01-15",
    nextReorderDate: "2024-01-28",
    status: "Low Stock",
    tags: ["mouse", "wireless", "peripheral"],
    reorderPoint: 10,
    leadTime: 3,
    avgUsage: 5,
  },
  {
    id: "ITM-003",
    name: "Office Chair",
    description: "Herman Miller Aeron ergonomic office chair",
    category: "Furniture",
    sku: "HM-AERON-001",
    currentStock: 8,
    minStock: 3,
    maxStock: 15,
    unitPrice: 1395.0,
    totalValue: 11160.0,
    supplier: "Herman Miller",
    location: "Warehouse A - Section 5",
    lastRestocked: "2024-01-10",
    nextReorderDate: "2024-03-01",
    status: "In Stock",
    tags: ["chair", "furniture", "ergonomic"],
    reorderPoint: 5,
    leadTime: 14,
    avgUsage: 1,
  },
  {
    id: "ITM-004",
    name: "USB-C Hub",
    description: "Multi-port USB-C hub with HDMI and USB ports",
    category: "Peripherals",
    sku: "USB-HUB-001",
    currentStock: 0,
    minStock: 15,
    maxStock: 40,
    unitPrice: 79.99,
    totalValue: 0.0,
    supplier: "Anker",
    location: "Warehouse B - Section 3",
    lastRestocked: "2023-12-20",
    nextReorderDate: "2024-01-26",
    status: "Out of Stock",
    tags: ["hub", "usb-c", "adapter"],
    reorderPoint: 20,
    leadTime: 5,
    avgUsage: 8,
  },
  {
    id: "ITM-005",
    name: "Monitor Stand",
    description: "Adjustable dual monitor stand with cable management",
    category: "Peripherals",
    sku: "MON-STAND-001",
    currentStock: 15,
    minStock: 8,
    maxStock: 30,
    unitPrice: 149.99,
    totalValue: 2249.85,
    supplier: "VIVO",
    location: "Warehouse A - Section 3",
    lastRestocked: "2024-01-22",
    nextReorderDate: "2024-02-20",
    status: "In Stock",
    tags: ["stand", "monitor", "adjustable"],
    reorderPoint: 10,
    leadTime: 7,
    avgUsage: 3,
  },
];

const suppliers = [
  {
    id: "SUP-001",
    name: "Apple Inc.",
    contactPerson: "John Smith",
    email: "orders@apple.com",
    phone: "+1-800-APL-CARE",
    address: "1 Apple Park Way, Cupertino, CA 95014",
    items: ['MacBook Pro 16"', 'iMac 24"', "iPad Pro"],
    rating: 4.8,
    leadTime: 7,
    paymentTerms: "Net 30",
    status: "Active",
  },
  {
    id: "SUP-002",
    name: "Logitech",
    contactPerson: "Sarah Wilson",
    email: "b2b@logitech.com",
    phone: "+1-510-795-8500",
    address: "7700 Gateway Blvd, Newark, CA 94560",
    items: ["Wireless Mouse", "Keyboard", "Webcam"],
    rating: 4.5,
    leadTime: 3,
    paymentTerms: "Net 15",
    status: "Active",
  },
  {
    id: "SUP-003",
    name: "Herman Miller",
    contactPerson: "Mike Johnson",
    email: "commercial@hermanmiller.com",
    phone: "+1-616-654-3000",
    address: "855 E Main Ave, Zeeland, MI 49464",
    items: ["Office Chair", "Desk", "Storage"],
    rating: 4.9,
    leadTime: 14,
    paymentTerms: "Net 45",
    status: "Active",
  },
];

const stockMovements = [
  {
    id: "MOV-001",
    item: 'MacBook Pro 16"',
    type: "Inbound",
    quantity: 10,
    date: "2024-01-20",
    reference: "PO-2024-001",
    notes: "Regular restock order",
    user: "Admin User",
  },
  {
    id: "MOV-002",
    item: "Wireless Mouse",
    type: "Outbound",
    quantity: -2,
    date: "2024-01-25",
    reference: "REQ-2024-015",
    notes: "Equipment request for new employees",
    user: "John Doe",
  },
  {
    id: "MOV-003",
    item: "USB-C Hub",
    type: "Outbound",
    quantity: -5,
    date: "2024-01-24",
    reference: "REQ-2024-014",
    notes: "Team equipment upgrade",
    user: "Sarah Wilson",
  },
  {
    id: "MOV-004",
    item: "Monitor Stand",
    type: "Inbound",
    quantity: 8,
    date: "2024-01-22",
    reference: "PO-2024-003",
    notes: "New office setup",
    user: "Admin User",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Stock":
      return "success";
    case "Low Stock":
      return "default";
    case "Out of Stock":
      return "destructive";
    case "Overstock":
      return "secondary";
    default:
      return "secondary";
  }
};

const getMovementTypeColor = (type: string) => {
  switch (type) {
    case "Inbound":
      return "success";
    case "Outbound":
      return "destructive";
    case "Transfer":
      return "default";
    case "Adjustment":
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
    minimumFractionDigits: 2,
  }).format(amount);
};

export default function Inventory() {
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    const matchesLocation =
      locationFilter === "all" || item.location.includes(locationFilter);
    return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
  });

  const inventoryStats = {
    totalItems: inventoryItems.length,
    totalValue: inventoryItems.reduce((acc, item) => acc + item.totalValue, 0),
    lowStockItems: inventoryItems.filter((item) => item.status === "Low Stock")
      .length,
    outOfStockItems: inventoryItems.filter(
      (item) => item.status === "Out of Stock",
    ).length,
    totalSuppliers: suppliers.length,
    avgStockLevel: Math.round(
      inventoryItems.reduce(
        (acc, item) => acc + (item.currentStock / item.maxStock) * 100,
        0,
      ) / inventoryItems.length,
    ),
  };

  const lowStockAlerts = inventoryItems.filter(
    (item) => item.currentStock <= item.reorderPoint,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Inventory Management
          </h1>
          <p className="text-muted-foreground">
            Track stock levels, manage suppliers, and monitor inventory health.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isAddSupplierOpen} onOpenChange={setIsAddSupplierOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Truck className="mr-2 h-4 w-4" />
                Add Supplier
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Supplier</DialogTitle>
                <DialogDescription>
                  Add a new supplier to your vendor network.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="supplierName">Supplier Name *</Label>
                  <Input id="supplierName" placeholder="Enter supplier name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      placeholder="Contact person name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Phone number" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Email address" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Full address" rows={2} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="leadTime">Lead Time (days)</Label>
                    <Input id="leadTime" type="number" placeholder="0" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="paymentTerms">Payment Terms</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="net15">Net 15</SelectItem>
                        <SelectItem value="net30">Net 30</SelectItem>
                        <SelectItem value="net45">Net 45</SelectItem>
                        <SelectItem value="net60">Net 60</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddSupplierOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Supplier</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
                <DialogDescription>
                  Add a new item to your inventory with details and stock
                  levels.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[500px] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="itemName">Item Name *</Label>
                    <Input id="itemName" placeholder="Enter item name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sku">SKU *</Label>
                    <Input id="sku" placeholder="Stock keeping unit" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Item description"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="peripherals">Peripherals</SelectItem>
                        <SelectItem value="office-supplies">
                          Office Supplies
                        </SelectItem>
                        <SelectItem value="software">Software</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="supplier">Supplier</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map((supplier) => (
                          <SelectItem key={supplier.id} value={supplier.name}>
                            {supplier.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="unitPrice">Unit Price ($)</Label>
                    <Input
                      id="unitPrice"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="currentStock">Current Stock</Label>
                    <Input
                      id="currentStock"
                      type="number"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="minStock">Min Stock</Label>
                    <Input
                      id="minStock"
                      type="number"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="maxStock">Max Stock</Label>
                    <Input
                      id="maxStock"
                      type="number"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reorderPoint">Reorder Point</Label>
                    <Input
                      id="reorderPoint"
                      type="number"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="leadTime">Lead Time (days)</Label>
                    <Input
                      id="leadTime"
                      type="number"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Warehouse A - Section 1"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    placeholder="e.g., laptop, computer, apple"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddItemOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Inventory Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inventoryStats.totalItems}
            </div>
            <p className="text-xs text-muted-foreground">In inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(inventoryStats.totalValue)}
            </div>
            <p className="text-xs text-muted-foreground">Current value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {inventoryStats.lowStockItems}
            </div>
            <p className="text-xs text-muted-foreground">Need reorder</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {inventoryStats.outOfStockItems}
            </div>
            <p className="text-xs text-muted-foreground">Urgent reorder</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suppliers</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inventoryStats.totalSuppliers}
            </div>
            <p className="text-xs text-muted-foreground">Active vendors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Stock</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inventoryStats.avgStockLevel}%
            </div>
            <p className="text-xs text-muted-foreground">Stock level</p>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      {lowStockAlerts.length > 0 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-destructive">
                Low Stock Alerts ({lowStockAlerts.length})
              </CardTitle>
            </div>
            <CardDescription>
              The following items need immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {lowStockAlerts.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 border rounded-lg bg-background"
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Stock: {item.currentStock} / Min: {item.minStock}
                    </div>
                  </div>
                  <Badge variant="destructive">{item.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs defaultValue="items">
        <TabsList>
          <TabsTrigger value="items">Inventory Items</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="movements">Stock Movements</TabsTrigger>
        </TabsList>

        <TabsContent value="items">
          {/* Filters and Search */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 max-w-sm">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search items..."
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
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Furniture">Furniture</SelectItem>
                  <SelectItem value="Peripherals">Peripherals</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg line-clamp-1">
                          {item.name}
                        </CardTitle>
                        <Badge variant={getStatusColor(item.status) as any}>
                          {item.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        SKU: {item.sku}
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
                          Edit Item
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Reorder Now
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="text-sm line-clamp-2">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Stock Level */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Stock Level</span>
                      <span className="font-medium">
                        {item.currentStock} / {item.maxStock}
                      </span>
                    </div>
                    <Progress
                      value={(item.currentStock / item.maxStock) * 100}
                      className="w-full"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Unit Price</div>
                      <div className="font-medium">
                        {formatCurrency(item.unitPrice)}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Total Value</div>
                      <div className="font-medium">
                        {formatCurrency(item.totalValue)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Category</div>
                      <div className="font-medium">{item.category}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Supplier</div>
                      <div className="font-medium">{item.supplier}</div>
                    </div>
                  </div>

                  {/* Location and Dates */}
                  <div className="space-y-2 text-sm">
                    <div>
                      <div className="text-muted-foreground">Location</div>
                      <div className="font-medium">{item.location}</div>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Last restocked: {formatDate(item.lastRestocked)}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Reorder Info */}
                  {item.currentStock <= item.reorderPoint && (
                    <div className="p-2 bg-destructive/10 rounded border border-destructive/20">
                      <div className="text-sm text-destructive font-medium">
                        Reorder Alert
                      </div>
                      <div className="text-xs text-destructive">
                        Next reorder: {formatDate(item.nextReorderDate)}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suppliers">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {suppliers.map((supplier) => (
              <Card
                key={supplier.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-lg">{supplier.name}</CardTitle>
                      <Badge
                        variant={
                          supplier.status === "Active" ? "success" : "secondary"
                        }
                      >
                        {supplier.status}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Supplier
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Create Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm">
                      <div className="text-muted-foreground">
                        Contact Person
                      </div>
                      <div className="font-medium">
                        {supplier.contactPerson}
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="text-muted-foreground">Email</div>
                      <div className="font-medium">{supplier.email}</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-muted-foreground">Phone</div>
                      <div className="font-medium">{supplier.phone}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Rating</div>
                      <div className="font-medium">{supplier.rating}/5.0</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Lead Time</div>
                      <div className="font-medium">
                        {supplier.leadTime} days
                      </div>
                    </div>
                  </div>

                  <div className="text-sm">
                    <div className="text-muted-foreground">Payment Terms</div>
                    <div className="font-medium">{supplier.paymentTerms}</div>
                  </div>

                  <div className="text-sm">
                    <div className="text-muted-foreground">
                      Items ({supplier.items.length})
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {supplier.items.slice(0, 3).map((item, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {item}
                        </Badge>
                      ))}
                      {supplier.items.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{supplier.items.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="movements">
          <Card>
            <CardHeader>
              <CardTitle>Stock Movements</CardTitle>
              <CardDescription>
                Track all inventory movements and transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stockMovements.map((movement) => (
                  <div
                    key={movement.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          movement.type === "Inbound"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                      <div>
                        <div className="font-medium">{movement.item}</div>
                        <div className="text-sm text-muted-foreground">
                          {movement.notes}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={getMovementTypeColor(movement.type) as any}
                        >
                          {movement.type}
                        </Badge>
                        <span
                          className={`font-medium ${
                            movement.quantity > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {movement.quantity > 0 ? "+" : ""}
                          {movement.quantity}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(movement.date)} • {movement.user}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
