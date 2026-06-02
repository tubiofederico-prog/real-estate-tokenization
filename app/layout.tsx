import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RE Bank - Plataforma de Tokenización Inmobiliaria",
  description: "Banco Inmobiliario Digital - Invierte en proyectos inmobiliarios tokenizados",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}
