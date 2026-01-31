import Header from "@/components/v2/Header";
import Hero from "@/components/v2/Hero";
import BeforeAfter from "..//components/v2/before_after";
import RecentProjects from "../components/v2/recent_videos";
import GraphicsThumbnails from "../components/v2/graphics_thumbnail";
import GraphicsCarousels from "../components/v2/graphics_carausel";
import OurServices from "../components/v2/services";
import OurClients from "../components/v2/client";
import ContactSection from "../components/v2/contact";
import Footer from "../components/Footer";

export default function Page() {
  return (
    <div className="main">
      <div className="background"></div>
      <div className="main-bg">
        <div className="background-img">
          <div className="img-container"></div>
          <div className="content-container">

          <Hero />
          <BeforeAfter />
          </div>
        </div>

        <RecentProjects />
        <GraphicsThumbnails />
        <GraphicsCarousels />
        <OurServices />
        <OurClients />
        <ContactSection />
      </div>
    </div>
  );
}
