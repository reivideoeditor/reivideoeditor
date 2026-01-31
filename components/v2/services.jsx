"use client";

export default function OurServices() {
  return (
    <section className="our-services" id="services">
      <h2 className="section-title">
        Our <span className="red">Services</span>
      </h2>

      <p className="services-subtitle">
        We are a <span className="red">Team of Exceptional Freelancers</span>{" "}
        that can handle all your requests at <span className="red">One Place.</span>
      </p>

      <div className="services-grid">
        {/* CARD 1 */}
        <div className="service-card">
          <img src="/images/premier.png" alt="video editing icon" className="service-icon video-editing-icon"/>

          <h3 className="service-title red">Video editing</h3>
          <p className="service-tagline">By Experts</p>

          <p className="service-desc">
            Editing your video with our skills and strategy skyrocket your growth
          </p>
        </div>

        {/* CARD 2 */}
        <div className="service-card">
          <img src="/images/pen.png" alt="video editing icon" className="service-icon video-editing-icon"/>


          <h3 className="service-title red">Graphic Design</h3>
          <p className="service-tagline">Modern and Optimized designs</p>

          <p className="service-desc">
            Get your Thumbnails & Carousels with our Professional graphic design
            artists, increase your reach with correct designs.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="service-card">
          <img src="/images/marketing.png" alt="video editing icon" className="service-icon video-editing-icon"/>


          <h3 className="service-title red">Content Management & Strategy</h3>
          <p className="service-tagline">Tailored to your Videos</p>

          <p className="service-desc">
            Managing your videos & socials and creating content strategy so you
            can grow your business without Trial & Error
          </p>
        </div>
      </div>
    </section>
  );
}
