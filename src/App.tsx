import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// --- Shared Layout Components ---

const Header: React.FC = () => {
  const location = useLocation();
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
          Acme Inc.
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium transition-colors ${location.pathname === '/about' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Acme Inc. All rights reserved.
      </p>
      <div className="flex gap-6">
        <Link to="/about" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
          About
        </Link>
        <Link to="/contact" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
          Contact
        </Link>
      </div>
    </div>
  </footer>
);

// --- Page: Home (placeholder) ---

const HomePage: React.FC = () => (
  <main className="flex-1 flex items-center justify-center py-24">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900">Welcome to Acme Inc.</h1>
      <p className="mt-4 text-lg text-gray-600">This is the home page placeholder.</p>
    </div>
  </main>
);

// --- Page: Contact (placeholder) ---

const ContactPage: React.FC = () => (
  <main className="flex-1 flex items-center justify-center py-24">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
      <p className="mt-4 text-lg text-gray-600">This is the contact page placeholder.</p>
    </div>
  </main>
);

// --- Page: About Us ---

const AboutPage: React.FC = () => {
  // Data for sections
  const keyPoints = [
    {
      title: 'Industry Expertise',
      description: 'Over a decade of experience delivering solutions across multiple industries. Our team understands your challenges and provides tailored strategies.',
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Customer-Centric Approach',
      description: 'Your success is our priority. We work closely with you to understand your needs and deliver solutions that exceed expectations.',
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Innovative Solutions',
      description: 'We stay ahead of the curve, leveraging the latest technologies to provide cutting-edge solutions that drive your business forward.',
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Dedicated Support',
      description: 'Our support team is available around the clock to ensure your operations run smoothly without interruption.',
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
            About Us
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed">
            We are a passionate team of innovators, problem-solvers, and creators dedicated to helping businesses thrive in a digital-first world. Since 2010, we've been delivering exceptional solutions that drive growth and success.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2010, Acme Inc. has grown from a small startup to a leading provider of innovative business solutions. Our journey has been defined by a relentless commitment to excellence and a deep understanding of our clients' needs.
                </p>
                <p>
                  With a team of over 50 dedicated professionals across multiple disciplines, we combine technical expertise with creative thinking to solve complex challenges. Our diverse client base spans industries from technology and finance to healthcare and retail.
                </p>
                <p>
                  We believe that lasting partnerships are built on trust, transparency, and results. That's why we measure our success not just by the projects we deliver, but by the long-term value we create for our clients.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-100 aspect-w-16 aspect-h-9">
              {/* Placeholder for company image - using a gradient to avoid binary */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-cyan-100 flex items-center justify-center">
                <svg className="w-24 h-24 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Mission & Vision</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Driving innovation and creating lasting value for our clients and communities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-md p-8 sm:p-10 border border-gray-100">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower businesses of all sizes with transformative solutions that simplify complexity, unlock potential, and accelerate growth. We are committed to delivering excellence in every project, every interaction, and every relationship.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-8 sm:p-10 border border-gray-100">
              <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the most trusted partner for businesses seeking innovation and growth, recognized globally for our commitment to quality, integrity, and client success. We envision a future where technology seamlessly enables human potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Why Choose Us</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              What sets us apart and makes us the ideal partner for your business.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyPoints.map((point) => (
              <div
                key={point.title}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                  {point.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{point.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-600 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-indigo-100 mb-8">
            Let's discuss how we can help you achieve your goals. Get in touch with our team today.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-indigo-600 bg-white hover:bg-indigo-50 transition-colors duration-200 shadow-sm"
          >
            Contact Us
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
};

// --- Layout Wrapper ---

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-white">
    <Header />
    {children}
    <Footer />
  </div>
);

// --- Main App with Routing ---

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
