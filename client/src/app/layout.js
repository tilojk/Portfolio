import { Quicksand, Knewave } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const knewave = Knewave({
  variable: "--font-knewave",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Tilo's Portfolio",
  description: "Portfolio-Website von Tilo Jäkel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.className} ${knewave.variable} antialiased`}
      >
        <div className="flex min-h-screen w-full flex-col bg-neutral-6">
          <NavBar />
          <div className="w-full overflow-x-hidden">
            {children}
          </div>
          <Footer />
        </div>
      </body>
      
    </html>

  );
}
