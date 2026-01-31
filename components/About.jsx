// components/About.jsx
export default function About() {
  return (
    <section className="about" id="about">
      <h2 className="section-title">About REI</h2>
      <div className="about-content">
        <div className="about-text">
          <h2>
            Consulate with Professionals
          </h2>
          <p>
            Proper Consultation with the editor to make the project fully satisfying for the clients.
          </p>
        </div>

        <div className="about-visual">
          <div className="about-graphic" />
        </div>
      </div>

      <div className="about-content" style={{ marginTop: 80 }}>
        <div className="about-visual">
          <div className="about-graphic-alt">
            <div className="hexagon" />
            <div className="hexagon" />
            <div className="hexagon" />
          </div>
        </div>

        <div className="about-text">
          <h2>AI Videos</h2>
          <p>
            Creative editor crafting AI-generated videos that blend automation, storytelling, and visual precision to elevate brand content for clients.
          </p>
        </div>
      </div>
    </section>
  );
}
