import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./style.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QR-Code",
  description: "An easy access QR-Code app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins} antialiased`}>{children}</body>
    </html>
  );
}
