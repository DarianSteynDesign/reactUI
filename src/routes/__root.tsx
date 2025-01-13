import { createRootRoute } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from "../components/Navbar";

const queryClient = new QueryClient();
//Covered: File Routing - Tanstack Router
export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <Navbar />
    </QueryClientProvider>
  ),
});
