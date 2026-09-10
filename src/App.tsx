import AppBar from "./components/AppBar"
import Badge from "./components/Badge"
import Button from "./components/Button"
import Checkline from "./components/Checkline"
import FlagZA from "./components/FlagZA"
import ImageSlot from "./components/ImageSlot"
import SectionHeading from "./components/SectionHeading"
import "./App.css"

function App() {
  return (
    <div className="app">
      <AppBar />

      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div className="slides">
            <img
              className="on"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKlcz0ZIsc6mNmFfD24QsJ5eX6f9Vtewn_Z8CFD2K3MUYP-NDQU3nShEjG&s=10"
              alt="Business workspace"
            />

            <div className="dots">
              <button
                type="button"
                aria-current="true"
                aria-label="Slide 1"
              />
            </div>
          </div>

          <div className="wrap hero-copy">
            <Badge>
              <FlagZA /> South African owned
            </Badge>

            <h1>
              Building better digital experiences
            </h1>

            <p className="lead">
              Modern websites and technology solutions
              built for growing businesses.
            </p>

            <Button variant="solid">
              Get a quote
            </Button>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section">
          <div className="wrap">
            <SectionHeading
              eyebrow="About us"
              title="Built with purpose"
            />

            <div className="about-grid">
              <div className="portrait">
                <ImageSlot
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKlcz0ZIsc6mNmFfD24QsJ5eX6f9Vtewn_Z8CFD2K3MUYP-NDQU3nShEjG&s=10"
                  alt="Business team"
                />
              </div>

              <div>
                <p>
                  We help businesses establish a stronger
                  digital presence through practical,
                  reliable and modern technology solutions.
                </p>

                <p>
                  We focus on solutions that help businesses
                  communicate, operate and grow.
                </p>

                <Checkline
                  label="South African owned"
                  checked={true}
                  onChange={() => {}}
                />

                <Checkline
                  label="Digital-first solutions"
                  checked={true}
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section">
          <div className="wrap">
            <SectionHeading
              eyebrow="Services"
              title="What we do"
            />

            <div className="cards">
              <article className="card">
                <ImageSlot
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKlcz0ZIsc6mNmFfD24QsJ5eX6f9Vtewn_Z8CFD2K3MUYP-NDQU3nShEjG&s=10"
                  alt="Website development"
                />

                <div className="card-body">
                  <h3>Website Development</h3>

                  <p>
                    Responsive websites designed around
                    your business needs.
                  </p>
                </div>
              </article>

              <article className="card">
                <ImageSlot
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKlcz0ZIsc6mNmFfD24QsJ5eX6f9Vtewn_Z8CFD2K3MUYP-NDQU3nShEjG&s=10"
                  alt="Software solutions"
                />

                <div className="card-body">
                  <h3>Software Solutions</h3>

                  <p>
                    Custom technology solutions for
                    everyday business challenges.
                  </p>
                </div>
              </article>

              <article className="card">
                <ImageSlot
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKlcz0ZIsc6mNmFfD24QsJ5eX6f9Vtewn_Z8CFD2K3MUYP-NDQU3nShEjG&s=10"
                  alt="Data and technology"
                />

                <div className="card-body">
                  <h3>Data & Technology</h3>

                  <p>
                    Practical data and technology services
                    to support better decisions.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="section">
          <div className="wrap">
            <SectionHeading
              eyebrow="Gallery"
              title="Our work"
            />

            <div className="gallery">
              <figure>
                <ImageSlot
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKlcz0ZIsc6mNmFfD24QsJ5eX6f9Vtewn_Z8CFD2K3MUYP-NDQU3nShEjG&s=10"
                  alt="Office"
                />
                <figcaption>Office</figcaption>
              </figure>

              <figure>
                <ImageSlot
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKlcz0ZIsc6mNmFfD24QsJ5eX6f9Vtewn_Z8CFD2K3MUYP-NDQU3nShEjG&s=10"
                  alt="Workspace"
                />
                <figcaption>Workspace</figcaption>
              </figure>

              <figure>
                <ImageSlot
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKlcz0ZIsc6mNmFfD24QsJ5eX6f9Vtewn_Z8CFD2K3MUYP-NDQU3nShEjG&s=10"
                  alt="Team working"
                />
                <figcaption>Team working</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="section"
        >
          <div className="wrap">
            <SectionHeading
              eyebrow="Contact"
              title="Let's work together"
            />

            <div className="contact-cols">
              <ul className="contact-list">
                <li>
                  <span className="label">
                    Phone
                  </span>

                  <span className="value">
                    0123456789
                  </span>
                </li>

                <li>
                  <span className="label">
                    Email
                  </span>

                  <span className="value">
                    hello@example.com
                  </span>
                </li>

                <li>
                  <span className="label">
                    Location
                  </span>

                  <span className="value">
                    KwaZulu-Natal, South Africa
                  </span>
                </li>
              </ul>

              <div>
                <h3>Let's connect</h3>

                <p>
                  Get in touch to discuss your next
                  project.
                </p>

                <Button variant="solid">
                  WhatsApp us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="foot-cols">
            <div>
              <div className="foot-brand">
                <strong>
                  SM Data & Tech
                </strong>
              </div>

              <p className="foot-address">
                <FlagZA />
                <span>
                  KwaZulu-Natal, South Africa
                </span>
              </p>
            </div>

            <div className="compliance">
              <div className="badges">
                <Badge>
                  <FlagZA /> South African owned
                </Badge>

                <Badge>
                  B-BBEE
                </Badge>
              </div>
            </div>
          </div>

          <div className="credit">
            <div className="credit-row">
              <span>
                © 2026 SM Data & Tech
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App