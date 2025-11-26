// app/employer-dashboard/page.tsx
"use client";

import React from "react";
import CandidateDashboard from "@/components/CandidateDashboard";

export default function EmployerDashboardPage() {
  return (
    <CandidateDashboard onLogout={function (): void {
              throw new Error("Function not implemented.");
    } } />      
  );
}
