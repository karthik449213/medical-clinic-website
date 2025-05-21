import React, { useState, useEffect } from "react";

// Main App Component
const App = () => {
  // State to manage the current section for smooth scrolling
  const [activeSection, setActiveSection] = useState("home");
  // State to manage Firebase and user authentication readiness
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Initialize Firebase and set up auth listener
  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        // Firebase configuration and initialization (provided globally by Canvas)
        const firebaseConfig =
          typeof __firebase_config !== "undefined"
            ? JSON.parse(__firebase_config)
            : {};
        const app = firebase.initializeApp(firebaseConfig);
        const firestoreDb = firebase.firestore.getFirestore(app);
        const firebaseAuth = firebase.auth.getAuth(app);

        setDb(firestoreDb);
        setAuth(firebaseAuth);

        // Sign in with custom token or anonymously
        const initialAuthToken =
          typeof __initial_auth_token !== "undefined"
            ? __initial_auth_token
            : null;
        if (initialAuthToken) {
          await firebase.auth.signInWithCustomToken(
            firebaseAuth,
            initialAuthToken
          );
        } else {
          await firebase.auth.signInAnonymously(firebaseAuth);
        }

        // Listen for auth state changes
        firebase.auth.onAuthStateChanged(firebaseAuth, (user) => {
          if (user) {
            setUserId(user.uid);
          } else {
            setUserId(crypto.randomUUID()); // Anonymous user ID
          }
          setIsAuthReady(true);
        });
      } catch (error) {
        console.error("Error initializing Firebase:", error);
      }
    };

    initializeFirebase();
  }, []); // Run only once on component mount

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="font-inter antialiased text-gray-800 bg-white">
      {/* Tailwind CSS CDN - Assumed available in sandbox or pre-configured */}
      {/* <script src="https://cdn.tailwindcss.com"></script> */}

      {/* Header */}
      <header className="fixed w-full bg-white shadow-md z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a
            href="#home"
            className="text-2xl font-bold text-blue-700 rounded-md p-2 hover:bg-blue-50 transition duration-300"
          >
            MediClinic
          </a>
          <div className="hidden md:flex space-x-6">
            <a
              href="#home"
              onClick={() => scrollToSection("home")}
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-300 rounded-md px-3 py-2"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-300 rounded-md px-3 py-2"
            >
              About Us
            </a>
            <a
              href="#services"
              onClick={() => scrollToSection("services")}
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-300 px-3 py-2"
            >
              Services
            </a>
            <a
              href="#testimonials"
              onClick={() => scrollToSection("testimonials")}
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-300 px-3 py-2"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-300 px-3 py-2"
            >
              Contact
            </a>
          </div>
          {/* Mobile menu button (for future expansion) */}
          <button className="md:hidden text-gray-700 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </nav>
      </header>

      <main className="pt-20">
        {" "}
        {/* Padding top to account for fixed header */}
        {/* User ID Display (for collaborative apps, as per instructions) */}
        {isAuthReady && userId && (
          <div className="fixed top-2 right-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full z-50">
            User ID: {userId}
          </div>
        )}
        {/* Hero Section */}
        <section
          id="home"
          className="relative bg-blue-50 py-20 md:py-32 overflow-hidden rounded-bl-3xl rounded-br-3xl"
        >
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
              <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 leading-tight mb-6">
                Your Health, Our Priority
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-md mx-auto md:mx-0">
                Providing compassionate and comprehensive healthcare services
                for your entire family.
              </p>
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
              >
                Book an Appointment
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <img
                src="https://placehold.co/600x400/ADD8E6/000000?text=Professional+Medical+Team"
                alt="Professional Medical Team"
                className="rounded-xl shadow-2xl max-w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/ADD8E6/000000?text=Image+Not+Found";
                }}
              />
            </div>
          </div>
        </section>
        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">
              About Our Clinic
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <img
                  src="https://placehold.co/600x400/ADD8E6/000000?text=Clinic+Interior"
                  alt="Clinic Interior"
                  className="rounded-xl shadow-lg max-w-full h-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/600x400/ADD8E6/000000?text=Image+Not+Found";
                  }}
                />
              </div>
              <div className="md:w-1/2 text-center md:text-left">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  For over 20 years, MediClinic has been dedicated to providing
                  exceptional healthcare services to our community. Our
                  commitment to patient-centered care, combined with our team's
                  extensive expertise, ensures that every patient receives the
                  highest standard of treatment.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  We believe in a holistic approach to health, focusing not just
                  on treating illnesses but also on promoting overall well-being
                  and preventive care. Our state-of-the-art facilities and
                  compassionate staff are here to support you on your health
                  journey.
                </p>
                <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
                  <li>Experienced and caring medical professionals</li>
                  <li>Modern facilities and advanced diagnostic tools</li>
                  <li>Personalized treatment plans</li>
                  <li>Commitment to patient education</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* Services Section */}
        <section
          id="services"
          className="py-16 md:py-24 bg-blue-50 rounded-tl-3xl rounded-tr-3xl"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service Card 1 */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                  General Check-ups
                </h3>
                <p className="text-gray-700">
                  Comprehensive health assessments, routine physicals, and
                  preventive care to keep you healthy.
                </p>
              </div>
              {/* Service Card 2 */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                  Pediatrics
                </h3>
                <p className="text-gray-700">
                  Specialized care for infants, children, and adolescents,
                  including vaccinations and developmental checks.
                </p>
              </div>
              {/* Service Card 3 */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                  Dermatology
                </h3>
                <p className="text-gray-700">
                  Diagnosis and treatment of skin conditions, including acne,
                  eczema, and skin cancer screenings.
                </p>
              </div>
              {/* Service Card 4 */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                  Diagnostics
                </h3>
                <p className="text-gray-700">
                  On-site laboratory services, X-rays, and other diagnostic
                  tests for accurate and timely results.
                </p>
              </div>
              {/* Service Card 5 */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                  Cardiology
                </h3>
                <p className="text-gray-700">
                  Expert care for heart health, including risk assessment,
                  management of heart conditions, and rehabilitation.
                </p>
              </div>
              {/* Service Card 6 */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">
                  Orthopedics
                </h3>
                <p className="text-gray-700">
                  Treatment for musculoskeletal conditions, injuries, and joint
                  pain, helping you regain mobility.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">
              What Our Patients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial Card 1 */}
              <div className="bg-blue-50 p-8 rounded-xl shadow-lg">
                <p className="text-gray-700 italic mb-4">
                  "MediClinic provides outstanding care. The doctors are
                  incredibly knowledgeable and the staff is always so friendly
                  and helpful. I highly recommend them!"
                </p>
                <p className="font-semibold text-blue-700">- Sarah L.</p>
              </div>
              {/* Testimonial Card 2 */}
              <div className="bg-blue-50 p-8 rounded-xl shadow-lg">
                <p className="text-gray-700 italic mb-4">
                  "I've been bringing my kids here for years. The pediatricians
                  are wonderful, and they make every visit comfortable and
                  reassuring for the children."
                </p>
                <p className="font-semibold text-blue-700">- Mark T.</p>
              </div>
              {/* Testimonial Card 3 */}
              <div className="bg-blue-50 p-8 rounded-xl shadow-lg">
                <p className="text-gray-700 italic mb-4">
                  "The diagnostic services are top-notch. I got my results
                  quickly, and the doctor explained everything clearly. A truly
                  professional and caring clinic."
                </p>
                <p className="font-semibold text-blue-700">- Emily R.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section
          id="contact"
          className="py-16 md:py-24 bg-blue-700 text-white rounded-tl-3xl rounded-tr-3xl"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
            <div className="flex flex-col md:flex-row items-start justify-between gap-12">
              <div className="md:w-1/2 space-y-6 text-center md:text-left">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Our Location</h3>
                  <p className="text-lg">
                    123 Health Avenue, Medical City, 12345
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Phone</h3>
                  <p className="text-lg">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Email</h3>
                  <p className="text-lg">info@mediclinic.com</p>
                </div>
                {/* Placeholder for a contact form if needed later */}
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold mb-4">
                    Send Us a Message
                  </h3>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full p-3 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full p-3 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <textarea
                      placeholder="Your Message"
                      rows="5"
                      className="w-full p-3 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
              <div className="md:w-1/2 w-full h-80 md:h-96 bg-gray-200 rounded-xl overflow-hidden shadow-lg">
                {/* Google Maps Embed - Replace with your clinic's actual map embed code */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.292276527299!2d144.9630573153177!3d-37.81720997975176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce1c0!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1678901234567!5m2!1sen!2sau"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Clinic Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center rounded-t-3xl">
        <div className="container mx-auto px-4">
          <p>
            &copy; {new Date().getFullYear()} MediClinic. All rights reserved.
          </p>
          <p className="text-sm mt-2">Designed with care for your health.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
