import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const OKRs = () => {
  const [okrs] = useState([]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">OKRs Management</h1>
          <p className="text-muted-foreground">
            Create and track Objectives and Key Results for teams and individuals
          </p>
        </div>
        <Button
          onClick={() => toast({
            title: "OKRs System",
            description: "Full OKRs implementation coming soon!",
          })}
        >
          <Target className="h-4 w-4 mr-2" />
          Create OKR
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>OKRs Overview</CardTitle>
          <CardDescription>
            Objectives and Key Results management system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Target className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">OKRs System</h3>
            <p className="text-muted-foreground">
              The OKRs system is being set up. You can create objectives and key results here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OKRs;
