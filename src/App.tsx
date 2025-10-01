import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BudgetProvider } from "@/contexts/BudgetContext";
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
import AddTransactionPage from "./pages/AddTransactionPage";
import TransactionsPage from "./pages/TransactionsPage";
import ReportsPage from "./pages/ReportsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BudgetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-6">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/add" element={<AddTransactionPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </BudgetProvider>
  </QueryClientProvider>
);

export default App;
