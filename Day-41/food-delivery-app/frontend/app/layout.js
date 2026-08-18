import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navabar from "@/components/Navbar";
import { ResturantProvider } from "@/context/RestaurantContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Food delivery",
  description: "Food delivery app ",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body>
        <AuthProvider>
          <Navabar/>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
