import React from "react";

export function StatsBar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 gap-6 xl:grid-cols-4 mb-8">
      {children}
    </section>
  );
}
