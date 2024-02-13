'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Container, StyledEngineProvider } from "@mui/material";
import HeaderInput from "./(components)/header-input/HeaderInput";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledEngineProvider injectFirst>
      <html lang="en">
        <DndProvider backend={HTML5Backend}>
          <body className={inter.className}> <Container><HeaderInput />{children}</Container></body>
        </DndProvider>
      </html>
    </StyledEngineProvider>
  );
}
