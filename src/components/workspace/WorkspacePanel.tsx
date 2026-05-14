import React from "react";

export function WorkspacePanel({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden ${className || ''}`}>
      {children}
    </section>
  );
}
