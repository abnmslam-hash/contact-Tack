import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import useimg from "../../assets/img.png";

export default function NavbarAoot() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredLink, setHoveredLink] = useState(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [tiltStyle, setTiltStyle] = useState({ transform: 'rotateX(0deg) rotateY(0deg)' });
  const navbarRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollPercent(scrolled);
    };
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleLogoMove = (e) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = (x / (rect.width / 2)) * 12;
    const rotateX = -(y / (rect.height / 2)) * 12;
    setTiltStyle({ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` });
  };
  const handleLogoLeave = () => setTiltStyle({ transform: 'rotateX(0deg) rotateY(0deg)' });

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { to: "/", name: "الرئيسية", icon: "fa-home", iconHover: "fa-rocket", color: "#ff6b6b", end: true },
    { to: "about", name: "صيانة دورية", icon: "fa-oil-can", iconHover: "fa-calendar-alt", color: "#4ecdc4" },
    { to: "portfolio", name: "ميكانيكية", icon: "fa-car", iconHover: "fa-cogs", color: "#ffe66d" },
    { to: "contact", name: "كهربائية", icon: "fa-bolt", iconHover: "fa-microchip", color: "#a8e6cf" },
    { to: "Oane", name: "حوادث", icon: "fa-tools", iconHover: "fa-wrench", color: "#ff9f1c" },
  ];

  return (
    <>
      <nav
        ref={navbarRef}
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        style={{ '--mouse-x': `${mousePosition.x}px`, '--mouse-y': `${mousePosition.y}px` }}
      >
        {/* خلفيات فاخرة محسنة */}
        <div className="nav-gradient-border"></div>
        <div className="nav-luxury-bg"></div>
        <div className="nav-glow-follow"></div>
        <div className="nav-aura"></div>
        
        {/* جزيئات متحركة ذهبية وحمراء */}
        <div className="nav-particles">
          {[...Array(60)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${Math.random() * 12 + 8}s`,
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              background: i % 4 === 0 ? '#E31837' : (i % 3 === 0 ? '#d4af37' : 'rgba(255,255,255,0.6)'),
              boxShadow: `0 0 ${Math.random() * 6 + 2}px ${i % 2 === 0 ? '#E31837' : '#d4af37'}`
            }}></div>
          ))}
        </div>
        
        <div className="nav-scan-wave"></div>
        <div className="shimmer-overlay"></div>
        <div className="nav-grain"></div>

        <div className="nav-container">
          {/* اللوجو - معزول تماماً عن تأثيرات active */}
          <NavLink 
            to="/" 
            className="logo" 
            onClick={handleLinkClick}
            onMouseMove={handleLogoMove}
            onMouseLeave={handleLogoLeave}
            ref={logoRef}
            end
          >
            <div className="logo-3d" style={tiltStyle}>
              <div className="logo-ring-outer"></div>
              <div className="logo-ring-inner"></div>
              <img src={useimg} alt="Toyota" />
              <div className="logo-pulse"></div>
              <div className="logo-golden-ring"></div>
              <div className="logo-sparkle"></div>
              <div className="logo-glow"></div>
            </div>
            <div className="logo-text">
              <span>تويوتا</span>
              <small>صناعة الثقة</small>
            </div>
          </NavLink>

          {/* الروابط الأساسية */}
          <div className="nav-links">
            {navLinks.map((link, idx) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end || false}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={handleLinkClick}
                onMouseEnter={() => setHoveredLink(idx)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{ '--link-color': link.color }}
              >
                <div className="link-icon-double">
                  <i className={`fas ${link.icon} icon-default`}></i>
                  <i className={`fas ${link.iconHover} icon-hover`}></i>
                </div>
                <span>{link.name}</span>
                <div className="link-hover-bg"></div>
                <div className="link-underline-premium"></div>
                <div className="link-shine-effect"></div>
                {hoveredLink === idx && (
                  <div className="link-energy-wave" style={{
                    left: `${mousePosition.x - (navbarRef.current?.getBoundingClientRect().left || 0)}px`
                  }}></div>
                )}
              </NavLink>
            ))}
          </div>

          {/* الأزرار الجانبية */}
          <div className="nav-actions">
            <a href="tel:0224883500" className="call-btn-premium">
              <i className="fas fa-phone-alt"></i>
              <span>02 24883500</span>
              <div className="call-ripple"></div>
              <div className="call-active-dot"></div>
            </a>
            <button
              className={`mobile-toggle ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="القائمة"
            >
              <div className="burger-menu">
                <span></span><span></span><span></span>
              </div>
            </button>
          </div>
        </div>

        {/* القائمة الجانبية للجوال المحسنة */}
        <div className={`mobile-sidebar ${isMenuOpen ? 'open' : ''}`}>
          <div className="sidebar-inner">
            <div className="sidebar-header">
              <div className="sidebar-logo">
                <img src={useimg} alt="Toyota" />
                <h4>تويوتا</h4>
              </div>
              <button className="sidebar-close" onClick={() => setIsMenuOpen(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="sidebar-links">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end || false}
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  <i className={`fas ${link.icon}`}></i>
                  <span>{link.name}</span>
                  <i className="fas fa-arrow-left arrow"></i>
                </NavLink>
              ))}
            </div>
            <div className="sidebar-social">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="#"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
        </div>
      </nav>

      {/* ========== شريط النسبة المئوية الفاخر (نسخة محسنة جداً) ========== */}
      <div className="progress-line">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${scrollPercent}%` }}>
            <div className="progress-shimmer"></div>
            <div className="progress-ripple"></div>
            <div className="progress-percent-bubble">
              <span className="percent-number">{Math.floor(scrollPercent)}</span>
              <span className="percent-symbol">%</span>
              <div className="bubble-arrow"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="navbar-spacer-ultra"></div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap');
        
        :root {
          --primary: #E31837;
          --primary-dark: #a50f2a;
          --gold: #d4af37;
          --gold-light: #f5e18b;
          --glass-ultra: rgba(5, 10, 18, 0.75);
          --shadow-ultra: 0 25px 45px -12px rgba(0,0,0,0.6);
        }

        * {
          font-family: 'Cairo', sans-serif;
        }

        /* ========== النافبار الرئيسي ========== */
        .navbar {
          position: fixed;
          top: 20px;
          left: 20px;
          right: 20px;
          z-index: 1000;
          background: var(--glass-ultra);
          backdrop-filter: blur(25px) saturate(200%);
          border-radius: 80px;
          transition: all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.2);
          overflow: hidden;
          box-shadow: var(--shadow-ultra);
          border: 1px solid rgba(255,255,255,0.12);
        }

        .navbar.scrolled {
          top: 0;
          left: 0;
          right: 0;
          border-radius: 0;
          background: rgba(5, 10, 18, 0.98);
          backdrop-filter: blur(30px);
          border-bottom: 1px solid rgba(212,175,55,0.5);
        }

        /* تحسينات الخلفيات والتأثيرات */
        .nav-gradient-border {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), var(--gold), var(--primary), transparent);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          animation: borderFlow 4s linear infinite;
          background-size: 200% 100%;
        }
        @keyframes borderFlow {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }

        .nav-luxury-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 20% 30%, rgba(227,24,55,0.2), transparent 70%),
                      radial-gradient(circle at 80% 70%, rgba(212,175,55,0.15), transparent 70%);
          pointer-events: none;
        }

        .nav-glow-follow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(227,24,55,0.35), transparent 75%);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
          mix-blend-mode: overlay;
        }
        .navbar:hover .nav-glow-follow { opacity: 1; }

        .nav-particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .particle {
          position: absolute;
          bottom: -30px;
          border-radius: 50%;
          opacity: 0;
          animation: floatParticle linear infinite;
        }
        @keyframes floatParticle {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.4; }
          100% { transform: translateY(-130vh) rotate(720deg); opacity: 0; }
        }

        .nav-scan-wave {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), var(--gold), var(--primary), transparent);
          animation: scanWave 5s linear infinite;
          z-index: 5;
        }
        @keyframes scanWave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .shimmer-overlay {
          position: absolute;
          top: 0;
          left: -100%;
          width: 40%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: skewX(-20deg);
          animation: shimmer 8s infinite;
          pointer-events: none;
        }
        @keyframes shimmer {
          0% { left: -100%; }
          20% { left: 150%; }
          100% { left: 150%; }
        }

        .nav-grain {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.2;
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 8px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 15;
        }

        /* ========== اللوجو (بدون أي تأثير active) ========== */
        .logo {
          display: flex;
          align-items: center;
          gap: 15px;
          text-decoration: none;
          background: transparent !important;
          box-shadow: none !important;
          border: none !important;
          outline: none !important;
          -webkit-tap-highlight-color: transparent;
        }
        .logo.active, .logo:active, .logo:focus {
          background: transparent !important;
          box-shadow: none !important;
          transform: none !important;
        }
        .logo-3d {
          position: relative;
          width: 52px;
          height: 52px;
          transition: transform 0.2s ease-out;
          transform-style: preserve-3d;
        }
        .logo-3d img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 0 0 2px rgba(227,24,55,0.8), 0 0 20px var(--gold-light);
          transition: all 0.3s;
        }
        .logo:hover .logo-3d img {
          transform: scale(1.05);
          box-shadow: 0 0 0 3px var(--gold), 0 0 35px var(--primary);
        }
        .logo-ring-outer, .logo-ring-inner {
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: var(--primary);
          border-right-color: var(--gold);
          animation: spinRing 1.6s linear infinite;
        }
        .logo-ring-inner {
          inset: -10px;
          border-top-color: var(--gold);
          border-right-color: var(--primary);
          animation-duration: 2s;
          animation-direction: reverse;
        }
        @keyframes spinRing { to { transform: rotate(360deg); } }
        .logo-pulse {
          position: absolute;
          inset: -15px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--primary), transparent);
          opacity: 0.2;
          animation: pulseBig 2s infinite;
        }
        @keyframes pulseBig {
          0%,100% { opacity: 0.1; transform: scale(0.9); }
          50% { opacity: 0.4; transform: scale(1.2); }
        }
        .logo-golden-ring {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, var(--primary), var(--gold), var(--gold), var(--primary));
          opacity: 0.4;
          filter: blur(6px);
          animation: rotateConic 4s linear infinite;
        }
        @keyframes rotateConic { to { transform: rotate(360deg); } }
        .logo-sparkle {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255,215,0,0.5), transparent 70%);
          opacity: 0;
          transition: 0.2s;
        }
        .logo:hover .logo-sparkle { opacity: 1; animation: sparkleFlash 0.6s; }
        @keyframes sparkleFlash {
          0% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(0.8); }
        }
        .logo-glow {
          position: absolute;
          inset: -20px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(227,24,55,0.3), transparent 70%);
          filter: blur(12px);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        .logo:hover .logo-glow { opacity: 1; }
        .logo-text span {
          font-size: 22px;
          font-weight: 800;
          background: linear-gradient(135deg, #fff, var(--primary), var(--gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .logo-text small {
          font-size: 9px;
          color: rgba(255,255,255,0.7);
          display: block;
          margin-top: 2px;
        }

        /* ========== الروابط ========== */
        .nav-links {
          display: flex;
          gap: 8px;
          background: rgba(0,0,0,0.3);
          padding: 5px 16px;
          border-radius: 60px;
          backdrop-filter: blur(8px);
        }
        .nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 22px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          color: rgba(255,255,255,0.9);
          transition: all 0.3s;
          overflow: hidden;
          cursor: pointer;
        }
        .link-icon-double {
          position: relative;
          width: 18px;
          height: 18px;
        }
        .icon-default, .icon-hover {
          position: absolute;
          transition: all 0.3s cubic-bezier(0.34, 1.2, 0.64, 1);
        }
        .icon-default { opacity: 1; transform: translateY(0); }
        .icon-hover { opacity: 0; transform: translateY(100%); }
        .nav-link:hover .icon-default { opacity: 0; transform: translateY(-100%); }
        .nav-link:hover .icon-hover { opacity: 1; transform: translateY(0); }
        
        .link-hover-bg {
          position: absolute;
          inset: 0;
          background: var(--link-color);
          opacity: 0;
          transition: opacity 0.3s;
          z-index: -1;
          border-radius: inherit;
        }
        .nav-link:hover .link-hover-bg { opacity: 0.2; }
        
        .link-underline-premium {
          position: absolute;
          bottom: 6px;
          left: 25%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--primary), var(--gold));
          border-radius: 2px;
          transition: width 0.35s;
        }
        .nav-link.active .link-underline-premium,
        .nav-link:hover .link-underline-premium { width: 50%; }
        
        .link-shine-effect {
          position: absolute;
          top: 0;
          left: -150%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: skewX(-20deg);
          transition: left 0.7s;
        }
        .nav-link:hover .link-shine-effect { left: 150%; }
        
        .link-energy-wave {
          position: absolute;
          top: 0;
          width: 100px;
          height: 100%;
          background: radial-gradient(ellipse at center, rgba(255,215,0,0.4), transparent);
          filter: blur(30px);
          transform: translateX(-50%);
          opacity: 0;
          animation: energyWave 0.6s ease-out;
          pointer-events: none;
        }
        @keyframes energyWave {
          0% { opacity: 0.8; width: 40px; }
          100% { opacity: 0; width: 200px; }
        }
        .nav-link.active {
          background: rgba(227,24,55,0.25);
          box-shadow: 0 0 15px rgba(227,24,55,0.4);
          transform: translateY(-1px);
        }

        /* ========== زر الاتصال ========== */
        .call-btn-premium {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          padding: 8px 24px;
          border-radius: 60px;
          color: white;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          transition: all 0.3s;
          box-shadow: 0 5px 15px rgba(227,24,55,0.5);
          border: 1px solid rgba(255,255,255,0.2);
        }
        .call-btn-premium:hover {
          transform: scale(1.02);
          filter: brightness(1.08);
          box-shadow: 0 8px 22px rgba(227,24,55,0.7);
        }
        .call-ripple {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          animation: rippleCall 1.8s infinite;
        }
        @keyframes rippleCall {
          0% { box-shadow: 0 0 0 0 rgba(227,24,55,0.6); }
          70% { box-shadow: 0 0 0 12px rgba(227,24,55,0); }
          100% { box-shadow: 0 0 0 0 rgba(227,24,55,0); }
        }
        .call-active-dot {
          position: absolute;
          top: -3px;
          right: -3px;
          width: 11px;
          height: 11px;
          background: #4caf50;
          border-radius: 50%;
          animation: blinkGreen 1s infinite;
          border: 1px solid white;
        }
        @keyframes blinkGreen {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }

        /* ========== شريط النسبة المئوية الفاخر جداً ========== */
        .progress-line {
          position: fixed;
          top: calc(20px + 72px);
          left: 20px;
          right: 20px;
          z-index: 999;
          direction: ltr;
          pointer-events: none;
        }
        .navbar.scrolled ~ .progress-line {
          top: 68px;
        }
        .progress-track {
          width: 100%;
          height: 10px;
          background: rgba(10, 15, 25, 0.55);
          backdrop-filter: blur(8px);
          border-radius: 20px;
          overflow: visible;
          box-shadow: 0 0 8px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255,255,255,0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .progress-fill {
          position: relative;
          height: 100%;
          border-radius: 20px;
          background: linear-gradient(90deg, #E31837, #d4af37, #ffecb3);
          background-size: 200% 100%;
          transition: width 0.12s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          box-shadow: 0 0 20px rgba(227, 24, 55, 0.8), 0 0 5px rgba(212, 175, 55, 1);
          min-width: 48px;
          animation: gradientMove 2s ease infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .progress-shimmer {
          position: absolute;
          top: 0;
          left: 0;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, 
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.5) 50%,
            rgba(255,255,255,0) 100%);
          transform: skewX(-20deg);
          animation: shimmerMove 2.2s infinite;
          pointer-events: none;
          border-radius: 20px;
        }
        @keyframes shimmerMove {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
        .progress-ripple {
          position: absolute;
          top: 0;
          right: 0;
          width: 6px;
          height: 100%;
          background: radial-gradient(circle, rgba(255,235,140,0.9) 0%, rgba(227,24,55,0) 80%);
          border-radius: 50%;
          transform-origin: right center;
          animation: rippleExpand 0.8s ease-out forwards;
          pointer-events: none;
          opacity: 0;
        }
        @keyframes rippleExpand {
          0% { width: 5px; opacity: 0.9; transform: scaleX(1); }
          70% { width: 80px; opacity: 0.5; transform: scaleX(1.5); }
          100% { width: 5px; opacity: 0; transform: scaleX(1); }
        }
        .progress-percent-bubble {
          position: absolute;
          right: -5px;
          top: 50%;
          transform: translateY(-50%);
          background: radial-gradient(circle at 30% 30%, rgba(20, 25, 40, 0.95), rgba(5, 10, 20, 0.98));
          backdrop-filter: blur(12px);
          border-radius: 60px;
          padding: 3px 12px;
          display: flex;
          align-items: baseline;
          gap: 2px;
          font-weight: 800;
          font-family: 'Cairo', monospace;
          letter-spacing: 1px;
          color: #ffecb3;
          text-shadow: 0 0 8px #E31837;
          border: 1px solid rgba(212, 175, 55, 0.7);
          box-shadow: 0 5px 18px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2);
          white-space: nowrap;
          transition: all 0.2s;
          animation: bubbleFloat 3s ease-in-out infinite;
        }
        @keyframes bubbleFloat {
          0% { transform: translateY(-50%) translateX(0); }
          50% { transform: translateY(-55%) translateX(-2px); }
          100% { transform: translateY(-50%) translateX(0); }
        }
        .percent-number {
          font-size: 16px;
          font-weight: 800;
          background: linear-gradient(135deg, #fff, #d4af37);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .percent-symbol {
          font-size: 12px;
          font-weight: 600;
          color: #d4af37;
        }
        .bubble-arrow {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 8px solid rgba(212, 175, 55, 0.9);
          filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));
        }
        .progress-line::before {
          content: '';
          position: absolute;
          top: -15px;
          left: 0;
          right: 0;
          height: 40px;
          background: radial-gradient(ellipse at center, rgba(212,175,55,0.2), transparent);
          pointer-events: none;
          filter: blur(6px);
          z-index: -1;
        }
        .progress-line::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 10%;
          width: 80%;
          height: 3px;
          background: linear-gradient(90deg, transparent, #d4af37, #E31837, transparent);
          border-radius: 100%;
          filter: blur(4px);
          opacity: 0.6;
          animation: glowSweep 4s linear infinite;
        }
        @keyframes glowSweep {
          0% { opacity: 0.2; width: 10%; left: 5%; }
          50% { opacity: 0.9; width: 80%; left: 10%; }
          100% { opacity: 0.2; width: 10%; left: 85%; }
        }

        /* ========== زر القائمة للجوال ========== */
        .mobile-toggle {
          display: none;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
        }
        .mobile-toggle:hover { background: var(--primary); transform: rotate(90deg); }
        .burger-menu {
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 20px;
        }
        .burger-menu span {
          height: 2px;
          background: white;
          transition: 0.3s;
          border-radius: 2px;
        }
        .mobile-toggle.active .burger-menu span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); width: 22px; }
        .mobile-toggle.active .burger-menu span:nth-child(2) { opacity: 0; }
        .mobile-toggle.active .burger-menu span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); width: 22px; }

        /* ========== القائمة الجانبية ========== */
        .mobile-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(5,10,18,0.98);
          backdrop-filter: blur(40px);
          z-index: 1001;
          transform: translateX(-100%);
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
          overflow-y: auto;
        }
        .mobile-sidebar.open { transform: translateX(0); }
        .sidebar-inner {
          padding: 35px 25px;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sidebar-logo img {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          border: 2px solid var(--primary);
        }
        .sidebar-logo h4 {
          font-size: 22px;
          background: linear-gradient(135deg, #fff, var(--gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .sidebar-close {
          background: rgba(255,255,255,0.05);
          border: none;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          color: white;
          font-size: 22px;
          cursor: pointer;
          transition: 0.3s;
        }
        .sidebar-close:hover { background: var(--primary); transform: rotate(90deg); }
        .sidebar-links {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 16px 20px;
          background: rgba(255,255,255,0.04);
          border-radius: 50px;
          color: white;
          text-decoration: none;
          font-weight: 600;
          transition: 0.3s;
        }
        .sidebar-link i:first-child {
          width: 30px;
          font-size: 20px;
          color: var(--gold);
        }
        .sidebar-link .arrow {
          margin-right: auto;
          opacity: 0;
          transition: 0.3s;
        }
        .sidebar-link.active, .sidebar-link:hover {
          background: rgba(227,24,55,0.2);
          transform: translateX(-8px);
        }
        .sidebar-link.active .arrow, .sidebar-link:hover .arrow {
          opacity: 1;
          transform: translateX(-5px);
        }
        .sidebar-social {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .sidebar-social a {
          width: 48px;
          height: 48px;
          background: rgba(255,255,255,0.05);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
          transition: 0.3s;
        }
        .sidebar-social a:hover {
          background: var(--primary);
          transform: translateY(-5px) rotate(360deg);
        }

        .navbar-spacer-ultra { height: 85px; }

        /* ========== الاستجابة ========== */
        @media (max-width: 1000px) {
          .nav-links { display: none; }
          .mobile-toggle { display: flex; }
          .call-btn-premium span { display: none; }
          .call-btn-premium { padding: 10px; border-radius: 50%; }
          .nav-container { padding: 6px 20px; }
          .navbar-spacer-ultra { height: 75px; }
          .progress-line { top: calc(20px + 66px); }
          .navbar.scrolled ~ .progress-line { top: 62px; }
          .progress-track { height: 7px; }
          .progress-fill { min-width: 40px; }
          .percent-number { font-size: 12px; }
          .percent-symbol { font-size: 10px; }
          .progress-percent-bubble { padding: 2px 8px; right: -2px; }
        }
        @media (max-width: 550px) {
          .navbar { top: 12px; left: 12px; right: 12px; }
          .logo-3d { width: 42px; height: 42px; }
          .logo-text span { font-size: 18px; }
          .navbar-spacer-ultra { height: 68px; }
          .progress-line { top: calc(12px + 60px); }
          .navbar.scrolled ~ .progress-line { top: 58px; }
          .progress-track { height: 5px; }
          .progress-fill { min-width: 32px; }
          .percent-number { font-size: 9px; }
          .progress-percent-bubble { padding: 1px 6px; right: -3px; }
          .bubble-arrow { border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 5px solid #d4af37; bottom: -6px; }
        }
        .progress-line:hover .progress-track {
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.7);
          transition: 0.2s;
        }
      `}</style>
    </>
  );
}