"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { CompareProvider } from "@/context/CompareContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <CompareProvider>

                {children}
            </CompareProvider>
        </QueryClientProvider>
    );
};

export default Providers;
