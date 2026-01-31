// app/layout.jsx
import "./globalsv2.css";
import Head from "next/head";
import Header from "../components/v2/Header"
import Footer from "../components/Footer";

export const metadata = {
  title: "Rei Video Editor",
  description: "Professional video editing made easy with Rei Video Editor.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
