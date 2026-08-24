import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agus Garate — Software Developer",
  description: "Portfolio de desarrollo de software, mobile y productos digitales.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
