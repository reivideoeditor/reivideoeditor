import Header from "@/components/v2/Header";
import Hero from "@/components/v2/Hero";
import BeforeAfter from "../../components/v2/before_after";
import RecentProjects from "../../components/v2/recent_videos";
import OurGraphics from "../../components/v2/graphics";
import OurServices from "../../components/v2/services";
import OurClients from "../../components/v2/client";
import ContactSection from "../../components/v2/contact";
import Footer from "../../components/Footer";

export default function Page() {
  return (
    <div className="main-bg">
      <Header />
      <Hero />
      <BeforeAfter />
      <RecentProjects />
      <OurGraphics />
      <OurServices />
      <OurClients />
      <ContactSection />
      <Footer />
    </div>
  );
}
