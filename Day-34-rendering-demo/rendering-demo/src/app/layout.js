import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Rendering Playground",
  description: "SSR SSG ISR Demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main
          style={{
            padding: "20px",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}