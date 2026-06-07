import React from 'react'

export default function Footer() {
  // روابط السوشيال ميديا
  const socialLinks = {
    youtube: "https://www.youtube.com/@ToyotaGlobal",
    facebook: "https://www.facebook.com/ToyotaEgypt",
    instagram: "https://www.instagram.com/toyotaegypt/",
    linkedin: "https://www.linkedin.com/company/toyota-egypt/",
    whatsapp: "https://wa.me/201113793716",
  };

  // بيانات الاتصال
  const contactInfo = {
    address: "محور 26 يوليو، قدام مدخل الشيخ زايد (محطة Chill Out)",
    hotline: "16550",
    phone: "02 24883500",
    email: "info@toyota-egypt.com",
    workingHours: "السبت - الخميس: 9ص - 9م"
  };

  const handleSocialClick = (url) => {
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <footer className="footer-premium">
        <div className="footer-animated-bg">
          <div className="floating-shape shape-f1"></div>
          <div className="floating-shape shape-f2"></div>
          <div className="floating-shape shape-f3"></div>
          <div className="floating-shape shape-f4"></div>
        </div>
        
        <div className="footer-top-premium">
          <div className="footer-container-premium">
            
            {/* القسم الأول - موقع المركز */}
            <div className="footer-section-premium">
              <div className="section-card">
                <div className="section-icon-wrapper">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="icon-pulse"></div>
                </div>
                <h3 className="section-title-premium">موقع المركز</h3>
                <div className="section-divider-premium"></div>
                <p className="section-text-premium">
                  <i className="fas fa-location-dot"></i>
                  {contactInfo.address}
                </p>
                <div className="contact-details-premium">
                  <p className="section-text-premium">
                    <i className="fas fa-phone-alt"></i>
                    الخط الساخن: <a href={`tel:${contactInfo.hotline}`} className="contact-link-premium">{contactInfo.hotline}</a>
                  </p>
                  <p className="section-text-premium">
                    <i className="fas fa-mobile-alt"></i>
                    <a href={`tel:${contactInfo.phone}`} className="contact-link-premium">{contactInfo.phone}</a>
                  </p>
                  <p className="section-text-premium">
                    <i className="fas fa-envelope"></i>
                    <a href={`mailto:${contactInfo.email}`} className="contact-link-premium">{contactInfo.email}</a>
                  </p>
                  <p className="section-text-premium">
                    <i className="fas fa-clock"></i>
                    {contactInfo.workingHours}
                  </p>
                </div>
              </div>
            </div>

            {/* القسم الثاني - وسائل التواصل */}
            <div className="footer-section-premium">
              <div className="section-card">
                <div className="section-icon-wrapper">
                  <i className="fas fa-share-alt"></i>
                  <div className="icon-pulse"></div>
                </div>
                <h3 className="section-title-premium">تابعنا</h3>
                <div className="section-divider-premium"></div>
                <div className="social-icons-premium">
                  <a 
                    href="#" 
                    className="social-icon-premium"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSocialClick(socialLinks.youtube);
                    }}
                    aria-label="يوتيوب"
                  >
                    <i className="fab fa-youtube"></i>
                    <span className="social-tooltip">يوتيوب</span>
                  </a>
                  <a 
                    href="#" 
                    className="social-icon-premium"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSocialClick(socialLinks.facebook);
                    }}
                    aria-label="فيسبوك"
                  >
                    <i className="fab fa-facebook-f"></i>
                    <span className="social-tooltip">فيسبوك</span>
                  </a>
                  <a 
                    href="#" 
                    className="social-icon-premium"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSocialClick(socialLinks.instagram);
                    }}
                    aria-label="إنستقرام"
                  >
                    <i className="fab fa-instagram"></i>
                    <span className="social-tooltip">إنستقرام</span>
                  </a>
                  <a 
                    href="#" 
                    className="social-icon-premium"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSocialClick(socialLinks.linkedin);
                    }}
                    aria-label="لينكد إن"
                  >
                    <i className="fab fa-linkedin-in"></i>
                    <span className="social-tooltip">لينكد إن</span>
                  </a>
                  <a 
                    href="#" 
                    className="social-icon-premium"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSocialClick(socialLinks.whatsapp);
                    }}
                    aria-label="واتساب"
                  >
                    <i className="fab fa-whatsapp"></i>
                    <span className="social-tooltip">واتساب</span>
                  </a>
                </div>
                <div className="visit-us-premium">
                  <p className="visit-text-premium">
                    <i className="fas fa-car"></i>
                    زورونا على جوجل ماب
                  </p>
                  <a 
                    href="https://maps.google.com/?q=29.9965,31.0234" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="map-link-premium"
                  >
                    <i className="fas fa-map-marked-alt"></i>
                    افتح الخريطة
                    <div className="map-glow"></div>
                  </a>
                </div>
              </div>
            </div>

            {/* القسم الثالث - عن المركز */}
            <div className="footer-section-premium">
              <div className="section-card">
                <div className="section-icon-wrapper">
                  <i className="fas fa-info-circle"></i>
                  <div className="icon-pulse"></div>
                </div>
                <h3 className="section-title-premium">عن المركز</h3>
                <div className="section-divider-premium"></div>
                <p className="section-text-premium">
                  مركز تويوتا المعتمد في الشيخ زايد، نقدم خدمات الصيانة الدورية والميكانيكية والكهربائية
                  باستخدام أحدث أجهزة تشخيص تويوتا العالمية وقطع الغيار الأصلية 100%.
                </p>
                <div className="features-list-premium">
                  <span className="feature-badge-premium">
                    <i className="fas fa-check-circle"></i> فنيين معتمدين
                  </span>
                  <span className="feature-badge-premium">
                    <i className="fas fa-check-circle"></i> قطع غيار أصلية
                  </span>
                  <span className="feature-badge-premium">
                    <i className="fas fa-check-circle"></i> ضمان لمدة سنة
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="footer-bottom-premium">
          <div className="footer-bottom-container-premium">
            <p className="copyright-premium">
              <i className="far fa-copyright"></i> {new Date().getFullYear()} تويوتا موتور مصر - جميع الحقوق محفوظة
            </p>
            <p className="designer-premium">
              مركز خدمة عملاء تويوتا: <a href="tel:16550" className="hotline-link-premium">16550</a>
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap');

        .footer-premium {
          font-family: 'Cairo', sans-serif;
          direction: rtl;
          background: radial-gradient(circle at 20% 30%, #0f172a, #020617);
          position: relative;
          margin-top: 0;
          overflow: hidden;
        }

        /* ========== Animated Background ========== */
        .footer-animated-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .floating-shape {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(227,24,55,0.15), transparent 70%);
          filter: blur(50px);
          animation: floatShape 18s ease-in-out infinite;
        }

        .shape-f1 { width: 400px; height: 400px; top: -100px; left: -120px; animation-duration: 22s; }
        .shape-f2 { width: 350px; height: 350px; bottom: -80px; right: -80px; animation-duration: 25s; animation-delay: -5s; }
        .shape-f3 { width: 250px; height: 250px; top: 30%; right: 15%; animation-duration: 19s; animation-delay: -8s; }
        .shape-f4 { width: 200px; height: 200px; bottom: 20%; left: 5%; animation-duration: 21s; animation-delay: -12s; }

        @keyframes floatShape {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          50% { transform: translate(-20px, 30px) scale(1.2); opacity: 0.7; }
        }

        /* ========== Top Footer ========== */
        .footer-top-premium {
          position: relative;
          padding: 70px 0 50px;
          z-index: 2;
        }

        .footer-top-premium::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #E31837, #d4af37, #E31837, transparent);
          animation: borderFlow 3s linear infinite;
          background-size: 200% 100%;
        }

        @keyframes borderFlow {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }

        .footer-container-premium {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 25px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 40px;
        }

        /* ========== Section Cards (Glassmorphism) ========== */
        .footer-section-premium {
          flex: 1;
          min-width: 280px;
          max-width: 350px;
        }

        .section-card {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(16px);
          border-radius: 40px;
          padding: 30px 20px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .section-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 20%, rgba(227,24,55,0.1), transparent);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }

        .section-card:hover {
          transform: translateY(-8px);
          border-color: rgba(227,24,55,0.5);
          box-shadow: 0 20px 35px -15px rgba(0,0,0,0.5);
        }

        .section-card:hover::after {
          opacity: 1;
        }

        /* Section Icon */
        .section-icon-wrapper {
          position: relative;
          width: 65px;
          height: 65px;
          background: linear-gradient(135deg, rgba(227,24,55,0.2), rgba(212,175,55,0.1));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          border: 1px solid rgba(227,24,55,0.4);
        }

        .section-icon-wrapper i {
          font-size: 28px;
          color: #E31837;
          transition: transform 0.3s;
        }

        .section-card:hover .section-icon-wrapper i {
          transform: scale(1.1);
        }

        .icon-pulse {
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 1px solid #E31837;
          animation: iconPulse 2s infinite;
        }

        @keyframes iconPulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        .section-title-premium {
          font-size: 22px;
          font-weight: 700;
          background: linear-gradient(135deg, #fff, #E31837);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
        }

        .section-divider-premium {
          width: 70px;
          height: 3px;
          background: linear-gradient(90deg, #E31837, #d4af37);
          margin: 15px auto;
          border-radius: 3px;
          transition: width 0.3s;
        }

        .section-card:hover .section-divider-premium {
          width: 100px;
        }

        .section-text-premium {
          color: rgba(255,255,255,0.8);
          font-size: 14px;
          line-height: 1.7;
          margin: 12px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .section-text-premium i {
          color: #E31837;
          width: 22px;
        }

        .contact-link-premium {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          transition: color 0.3s;
        }

        .contact-link-premium:hover {
          color: #E31837;
        }

        /* ========== Social Icons ========== */
        .social-icons-premium {
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
          margin: 25px 0;
        }

        .social-icon-premium {
          position: relative;
          width: 50px;
          height: 50px;
          background: rgba(255,255,255,0.05);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.2);
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
        }

        .social-icon-premium:hover {
          background: linear-gradient(135deg, #E31837, #b01030);
          transform: translateY(-7px) rotate(360deg);
          border-color: transparent;
          box-shadow: 0 10px 25px rgba(227,24,55,0.5);
        }

        .social-icon-premium:hover i {
          color: white;
          transform: scale(1.1);
        }

        .social-tooltip {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%) scale(0);
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(8px);
          color: white;
          font-size: 10px;
          padding: 4px 8px;
          border-radius: 20px;
          white-space: nowrap;
          transition: transform 0.3s;
          pointer-events: none;
          z-index: 10;
        }

        .social-icon-premium:hover .social-tooltip {
          transform: translateX(-50%) scale(1);
        }

        /* Visit Us */
        .visit-us-premium {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .visit-text-premium {
          color: rgba(255,255,255,0.7);
          font-size: 13px;
          margin-bottom: 12px;
        }

        .visit-text-premium i {
          color: #E31837;
          margin-left: 5px;
        }

        .map-link-premium {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(227,24,55,0.15);
          color: #E31837;
          padding: 10px 25px;
          border-radius: 50px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s;
          border: 1px solid rgba(227,24,55,0.4);
          overflow: hidden;
        }

        .map-link-premium:hover {
          background: #E31837;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(227,24,55,0.4);
        }

        .map-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s;
        }

        .map-link-premium:hover .map-glow {
          left: 150%;
        }

        /* Features List */
        .features-list-premium {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin-top: 20px;
        }

        .feature-badge-premium {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.06);
          padding: 6px 14px;
          border-radius: 40px;
          font-size: 11px;
          color: rgba(255,255,255,0.85);
          transition: all 0.3s;
        }

        .feature-badge-premium i {
          color: #27ae60;
          font-size: 11px;
        }

        .feature-badge-premium:hover {
          background: rgba(227,24,55,0.2);
          transform: translateY(-2px);
        }

        /* ========== Footer Bottom ========== */
        .footer-bottom-premium {
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(10px);
          padding: 20px 0;
          border-top: 1px solid rgba(255,255,255,0.05);
          position: relative;
          z-index: 2;
        }

        .footer-bottom-container-premium {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }

        .copyright-premium {
          color: rgba(255,255,255,0.5);
          font-size: 13px;
          margin: 0;
        }

        .copyright-premium i {
          margin-left: 5px;
          color: #E31837;
        }

        .designer-premium {
          color: rgba(255,255,255,0.5);
          font-size: 13px;
          margin: 0;
        }

        .hotline-link-premium {
          color: #E31837;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s;
        }

        .hotline-link-premium:hover {
          color: #ff6b6b;
        }

        /* ========== Responsive ========== */
        @media (max-width: 992px) {
          .footer-container-premium {
            gap: 30px;
          }
          .footer-section-premium {
            min-width: 260px;
          }
        }

        @media (max-width: 768px) {
          .footer-top-premium {
            padding: 50px 0 30px;
          }
          .footer-container-premium {
            flex-direction: column;
            align-items: center;
          }
          .footer-section-premium {
            width: 100%;
            max-width: 400px;
          }
          .section-card {
            padding: 25px 15px;
          }
          .social-icon-premium {
            width: 45px;
            height: 45px;
            font-size: 18px;
          }
          .footer-bottom-container-premium {
            flex-direction: column;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .section-title-premium {
            font-size: 20px;
          }
          .section-text-premium {
            font-size: 12px;
          }
          .map-link-premium {
            padding: 8px 20px;
            font-size: 12px;
          }
          .feature-badge-premium {
            font-size: 10px;
            padding: 4px 10px;
          }
          .social-icon-premium {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }
        }
      `}</style>
    </>
  )
}