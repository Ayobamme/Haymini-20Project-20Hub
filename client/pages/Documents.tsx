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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Download,
  Share,
  FolderPlus,
  Upload,
  File,
  Folder,
  Image,
  FileText,
  Archive,
  Eye,
  EyeOff,
  Users,
  Calendar,
  Clock,
  Star,
  Grid,
  List,
} from "lucide-react";

const folders = [
  {
    id: "FOLD-001",
    name: "Project Assets",
    description: "Visual assets and design files for all projects",
    documentsCount: 24,
    isPrivate: false,
    assignedTeams: ["Frontend Development", "Marketing & Growth"],
    assignedMembers: ["John Doe", "Sarah Wilson"],
    createdBy: "Admin User",
    createdAt: "2024-01-15",
    lastModified: "2024-01-25",
  },
  {
    id: "FOLD-002",
    name: "Technical Documentation",
    description: "API docs, technical specifications, and system architecture",
    documentsCount: 18,
    isPrivate: true,
    assignedTeams: ["Backend Development"],
    assignedMembers: ["Alex Rodriguez", "Emma Thompson"],
    createdBy: "Alex Rodriguez",
    createdAt: "2024-01-10",
    lastModified: "2024-01-24",
  },
  {
    id: "FOLD-003",
    name: "Marketing Materials",
    description: "Campaign assets, presentations, and marketing resources",
    documentsCount: 32,
    isPrivate: false,
    assignedTeams: ["Marketing & Growth"],
    assignedMembers: ["Lisa Park", "David Kim", "Rachel Green"],
    createdBy: "Lisa Park",
    createdAt: "2024-01-20",
    lastModified: "2024-01-26",
  },
];

const documents = [
  {
    id: "DOC-001",
    name: "Homepage Wireframes.fig",
    type: "design",
    size: "2.4 MB",
    folder: "Project Assets",
    uploadedBy: "John Doe",
    uploadedAt: "2024-01-25",
    isPrivate: false,
    assignedTeams: ["Frontend Development"],
    assignedMembers: ["Sarah Wilson", "Mike Chen"],
    tags: ["wireframes", "homepage", "UI"],
    project: "E-commerce Platform Redesign",
    task: "Review user interface mockups",
    downloads: 8,
    lastAccessed: "2024-01-26",
  },
  {
    id: "DOC-002",
    name: "API Documentation.pdf",
    type: "document",
    size: "1.8 MB",
    folder: "Technical Documentation",
    uploadedBy: "Alex Rodriguez",
    uploadedAt: "2024-01-24",
    isPrivate: true,
    assignedTeams: ["Backend Development"],
    assignedMembers: ["Emma Thompson"],
    tags: ["API", "documentation", "backend"],
    project: "Mobile App Development",
    task: "Implement payment gateway integration",
    downloads: 12,
    lastAccessed: "2024-01-25",
  },
  {
    id: "DOC-003",
    name: "Q1 Campaign Strategy.pptx",
    type: "presentation",
    size: "5.2 MB",
    folder: "Marketing Materials",
    uploadedBy: "Lisa Park",
    uploadedAt: "2024-01-23",
    isPrivate: false,
    assignedTeams: ["Marketing & Growth"],
    assignedMembers: ["David Kim", "Rachel Green"],
    tags: ["strategy", "Q1", "campaign"],
    project: "Marketing Campaign Q1",
    task: "Content strategy meeting preparation",
    downloads: 15,
    lastAccessed: "2024-01-26",
  },
  {
    id: "DOC-004",
    name: "Database Schema.sql",
    type: "code",
    size: "0.8 MB",
    folder: "Technical Documentation",
    uploadedBy: "Emma Thompson",
    uploadedAt: "2024-01-22",
    isPrivate: true,
    assignedTeams: ["Backend Development"],
    assignedMembers: ["Alex Rodriguez"],
    tags: ["database", "schema", "SQL"],
    project: "Database Migration",
    task: "Database performance optimization",
    downloads: 6,
    lastAccessed: "2024-01-24",
  },
  {
    id: "DOC-005",
    name: "Brand Guidelines.pdf",
    type: "document",
    size: "3.1 MB",
    folder: "Marketing Materials",
    uploadedBy: "David Kim",
    uploadedAt: "2024-01-21",
    isPrivate: false,
    assignedTeams: ["Marketing & Growth", "Frontend Development"],
    assignedMembers: ["John Doe", "Mike Chen", "Rachel Green"],
    tags: ["brand", "guidelines", "design"],
    project: "Marketing Campaign Q1",
    task: null,
    downloads: 20,
    lastAccessed: "2024-01-25",
  },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "design":
      return Image;
    case "document":
      return FileText;
    case "presentation":
      return FileText;
    case "code":
      return File;
    default:
      return File;
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

const formatFileSize = (size: string) => {
  return size;
};

export default function Documents() {
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [isUploadDocumentOpen, setIsUploadDocumentOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [folderFilter, setFolderFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState("folders");

  const filteredFolders = folders.filter((folder) => {
    const matchesSearch = folder.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFolder = folderFilter === "all" || doc.folder === folderFilter;
    const matchesType = typeFilter === "all" || doc.type === typeFilter;
    return matchesSearch && matchesFolder && matchesType;
  });

  const documentStats = {
    totalDocuments: documents.length,
    totalFolders: folders.length,
    privateDocuments: documents.filter((d) => d.isPrivate).length,
    totalDownloads: documents.reduce((acc, doc) => acc + doc.downloads, 0),
    totalSize: "15.3 MB",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">
            Organize and manage all your project documents and files.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog
            open={isCreateFolderOpen}
            onOpenChange={setIsCreateFolderOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline">
                <FolderPlus className="mr-2 h-4 w-4" />
                New Folder
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
                <DialogDescription>
                  Create a new folder to organize your documents.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="folderName">Folder Name *</Label>
                  <Input id="folderName" placeholder="Enter folder name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="folderDescription">Description</Label>
                  <Textarea
                    id="folderDescription"
                    placeholder="Describe the purpose of this folder"
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignTeams">Assign to Teams</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select teams" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">
                        Frontend Development
                      </SelectItem>
                      <SelectItem value="backend">
                        Backend Development
                      </SelectItem>
                      <SelectItem value="marketing">
                        Marketing & Growth
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignMembers">Assign to Members</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select members" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Doe</SelectItem>
                      <SelectItem value="sarah">Sarah Wilson</SelectItem>
                      <SelectItem value="alex">Alex Rodriguez</SelectItem>
                      <SelectItem value="emma">Emma Thompson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="private" />
                  <Label htmlFor="private">Make this folder private</Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateFolderOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Folder</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isUploadDocumentOpen}
            onOpenChange={setIsUploadDocumentOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
                <DialogDescription>
                  Upload a new document and assign it to teams or projects.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[500px] overflow-y-auto">
                <div className="grid gap-2">
                  <Label htmlFor="file">File *</Label>
                  <Input id="file" type="file" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="folder">Folder</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select folder" />
                      </SelectTrigger>
                      <SelectContent>
                        {folders.map((folder) => (
                          <SelectItem key={folder.id} value={folder.name}>
                            {folder.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project">Project (Optional)</Label>
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
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="task">Task (Optional)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select task" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="task1">
                        Review user interface mockups
                      </SelectItem>
                      <SelectItem value="task2">
                        Implement payment gateway integration
                      </SelectItem>
                      <SelectItem value="task3">
                        Content strategy meeting preparation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignTeamsDoc">Assign to Teams</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select teams" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">
                        Frontend Development
                      </SelectItem>
                      <SelectItem value="backend">
                        Backend Development
                      </SelectItem>
                      <SelectItem value="marketing">
                        Marketing & Growth
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignMembersDoc">Assign to Members</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select members" />
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
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    placeholder="e.g., wireframes, design, API"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="privateDoc" />
                  <Label htmlFor="privateDoc">Make this document private</Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsUploadDocumentOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Upload Document</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Document Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Documents
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documentStats.totalDocuments}
            </div>
            <p className="text-xs text-muted-foreground">Across all folders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Folders</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documentStats.totalFolders}
            </div>
            <p className="text-xs text-muted-foreground">Organized structure</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Private Documents
            </CardTitle>
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documentStats.privateDocuments}
            </div>
            <p className="text-xs text-muted-foreground">Restricted access</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documentStats.totalDownloads}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documentStats.totalSize}</div>
            <p className="text-xs text-muted-foreground">Total file size</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="folders">Folders</TabsTrigger>
          <TabsTrigger value="documents">All Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="folders">
          {/* Filters and Search for Folders */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 max-w-sm">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search folders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Folders Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredFolders.map((folder) => (
              <Card
                key={folder.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <Folder className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg line-clamp-1">
                          {folder.name}
                        </CardTitle>
                        {folder.isPrivate && (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <Badge variant="outline">
                        {folder.documentsCount} documents
                      </Badge>
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
                          Open Folder
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Folder
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="mr-2 h-4 w-4" />
                          Share
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
                    {folder.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Assigned Teams */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Assigned Teams</div>
                    <div className="flex flex-wrap gap-1">
                      {folder.assignedTeams.map((team) => (
                        <Badge
                          key={team}
                          variant="secondary"
                          className="text-xs"
                        >
                          {team}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Assigned Members */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Members</div>
                    <div className="flex items-center -space-x-2">
                      {folder.assignedMembers
                        .slice(0, 3)
                        .map((member, index) => (
                          <Avatar
                            key={index}
                            className="h-8 w-8 border-2 border-background"
                          >
                            <AvatarImage src="" alt={member} />
                            <AvatarFallback className="text-xs">
                              {getInitials(member)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      {folder.assignedMembers.length > 3 && (
                        <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                          +{folder.assignedMembers.length - 3}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Folder Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>
                      <div>Created by</div>
                      <div className="font-medium text-foreground">
                        {folder.createdBy}
                      </div>
                    </div>
                    <div>
                      <div>Last modified</div>
                      <div className="font-medium text-foreground">
                        {formatDate(folder.lastModified)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents">
          {/* Filters and Search for Documents */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 max-w-sm">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={folderFilter} onValueChange={setFolderFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Folders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Folders</SelectItem>
                  {folders.map((folder) => (
                    <SelectItem key={folder.id} value={folder.name}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="File Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="presentation">Presentation</SelectItem>
                  <SelectItem value="code">Code</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Tabs
              value={viewMode}
              onValueChange={(value) => setViewMode(value as "grid" | "list")}
            >
              <TabsList>
                <TabsTrigger value="grid">
                  <Grid className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list">
                  <List className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Documents */}
          {viewMode === "grid" ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredDocuments.map((doc) => {
                const FileIcon = getFileIcon(doc.type);
                return (
                  <Card
                    key={doc.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <FileIcon className="h-5 w-5 text-primary" />
                            <CardTitle className="text-sm line-clamp-1">
                              {doc.name}
                            </CardTitle>
                            {doc.isPrivate && (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {formatFileSize(doc.size)}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {doc.type}
                            </Badge>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                            >
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="mr-2 h-3 w-3" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share className="mr-2 h-3 w-3" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-3 w-3" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Archive className="mr-2 h-3 w-3" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-3 w-3" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="text-xs text-muted-foreground">
                        <div>Folder: {doc.folder}</div>
                        {doc.project && <div>Project: {doc.project}</div>}
                        {doc.task && <div>Task: {doc.task}</div>}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {doc.downloads}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(doc.uploadedAt)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="" alt={doc.uploadedBy} />
                          <AvatarFallback className="text-xs">
                            {getInitials(doc.uploadedBy)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-xs text-muted-foreground">
                          {doc.uploadedBy}
                        </div>
                      </div>

                      {doc.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {doc.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {doc.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{doc.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Documents List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredDocuments.map((doc) => {
                    const FileIcon = getFileIcon(doc.type);
                    return (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          <FileIcon className="h-6 w-6 text-primary" />
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{doc.name}</h3>
                              {doc.isPrivate && (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Folder: {doc.folder}</span>
                              <span>Size: {formatFileSize(doc.size)}</span>
                              <span>Downloads: {doc.downloads}</span>
                              <span>
                                Uploaded: {formatDate(doc.uploadedAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="" alt={doc.uploadedBy} />
                            <AvatarFallback className="text-xs">
                              {getInitials(doc.uploadedBy)}
                            </AvatarFallback>
                          </Avatar>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share className="mr-2 h-4 w-4" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
