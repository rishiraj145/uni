import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { PickingLandingPage } from "@/pages/PickingLandingPage";
import { B2BPackingPage } from "@/pages/B2BPackingPage";
import { PicklistDetailPage } from "@/pages/PicklistDetailPage";

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
      <Route path="/" component={PickingLandingPage} />
      <Route path="/b2b-packing" component={B2BPackingPage} />
      <Route path="/picklist/:id" component={PicklistDetailPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
