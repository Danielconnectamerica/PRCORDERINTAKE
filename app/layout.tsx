import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "PRC Inventory Order Intake",
  description: " PRC Internal inventory order request form"
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
