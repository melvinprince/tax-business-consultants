import Header from "@/components/header/Header";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import ContactButtons from "@/components/ContactButtons";

export const metadata = {
  title: "Tax Business Consultants",
  description: "Startup Consultants & Company Formation in Qatar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <ContactButtons />
        <Footer />
      </body>
    </html>
  );
}
