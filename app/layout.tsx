import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Inventory Order Intake",
  description: "Internal inventory order request form"
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
