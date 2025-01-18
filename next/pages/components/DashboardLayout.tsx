import React from "react";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside
        style={{ width: "250px", backgroundColor: "#f0f0f0", padding: "1rem" }}
      >
        <nav>
          <Image
            src="https://placehold.co/600x400"
            alt="Picture of the author"
            width={300}
            height={100}
          />
          <ul>
            <li>
              <a href="/dashboard">Dashboard Home</a>
            </li>
            <li>
              <a href="/dashboard/subpage">Subpage</a>
            </li>
          </ul>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: "1rem" }}>{children}</main>
    </div>
  );
}
