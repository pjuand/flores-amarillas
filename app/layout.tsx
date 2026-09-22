import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unas flores para ti",
  description: "Un pequeño regalo que florece despacio.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
