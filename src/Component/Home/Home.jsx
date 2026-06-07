import React, { useState, useEffect, useRef } from "react";
import "./Home.css"
import { useNavigate } from "react-router-dom";
import useimg from "../../assets/img.png";
import img1 from "../../assets/img-1.jpeg";
import img2 from "../../assets/img-2.jpeg";
import img3 from "../../assets/img-3.jpeg";
import img4 from "../../assets/img-4.jpeg";
import img5 from "../../assets/img-5.jpeg";
import img6 from "../../assets/img-6.jpeg";
import RepairForm from "../../RepairForm";

export default function Home() {
  const navigate = useNavigate();
  const [selectImg, setSelectImg] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [showAllRequests, setShowAllRequests] = useState(false);
  const [recentRequests, setRecentRequests] = useState([]);
  const sectionRefs = useRef([]);
  const [hoveredCard, setHoveredCard] = useState(null); // تم تصحيح هذا السطر
  const [selectedTimelineEvent, setSelectedTimelineEvent] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({ name: "", phone: "", carModel: "", date: "" });
  const repairFormRef = useRef(null);

  // Fetch recent requests
  useEffect(() => {
    fetchRecentRequests();
    const interval = setInterval(fetchRecentRequests, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchRecentRequests = async () => {
    try {
      const response = await fetch("http://localhost:3000/repair");
      if (response.ok) {
        const data = await response.json();
        const lastThree = [...data]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
        setRecentRequests(lastThree);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll to repair form section
  const scrollToRepairForm = () => {
    repairFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const images = [
    {
      src: img1,
      title: "تويوتا كورولا",
      description: "أكثر سيارة مبيعًا في تاريخ السيارات عالميًا",
      fullDesc: "تجاوزت مبيعاتها 50 مليون سيارة منذ إطلاقها عام 1966. تعتبر كورولا العمود الفقري لشركة تويوتا وأكثر السيارات مبيعًا في التاريخ. تتميز بموثوقيتها الأسطورية واقتصاديتها في استهلاك الوقود، مما جعلها الخيار الأول للعائلات حول العالم.",
      sales: "50+ مليون",
      year: "1966",
      type: "سيدان",
      color: "#E31837",
      features: ["اقتصادية", "موثوقة", "متوفرة عالميًا", "صيانة منخفضة"],
      generations: 12,
      engine: "1.8L 4 سلندر",
      fuel: "5.5 لتر/100كم",
    },
    {
      src: img2,
      title: "تويوتا كامري",
      description: "من أشهر سيارات السيدان في العالم",
      fullDesc: "تجاوزت مبيعاتها 21 مليون سيارة تقريبًا. تجمع كامري بين الفخامة والأداء المتميز، وهي الخيار الأول لعشاق السيدان العائلية. تتميز بتصميمها الأنيق ومقصورة فاخرة مع تقنيات أمان متقدمة.",
      sales: "21+ مليون",
      year: "1982",
      type: "سيدان",
      color: "#2C3E50",
      features: ["فاخرة", "مريحة", "أداء قوي", "تكنولوجيا متقدمة"],
      generations: 8,
      engine: "2.5L 4 سلندر / 3.5L V6",
      fuel: "7.5 لتر/100كم",
    },
    {
      src: img3,
      title: "تويوتا راف فور",
      description: "من أكثر سيارات الـ SUV مبيعًا عالميًا",
      fullDesc: "مبيعاتها أكثر من 15 مليون سيارة. راف فور هي رائدة سيارات الـ SUV المدمجة بفضل تصميمها العصري وأدائها الممتاز. توفر مساحة داخلية واسعة وراحة فائقة مع قدرات ممتازة على الطرقات الوعرة.",
      sales: "15+ مليون",
      year: "1994",
      type: "SUV",
      color: "#27AE60",
      features: ["عملية", "رياضية", "موفرة للوقود", "رحبة"],
      generations: 5,
      engine: "2.0L / 2.5L هايبرد",
      fuel: "6.5 لتر/100كم",
    },
    {
      src: img4,
      title: "تويوتا هايلكس",
      description: "شاحنة بيك أب قوية ومشهورة بالتحمل",
      fullDesc: "تجاوزت مبيعاتها 19 مليون سيارة. هايلكس أيقونة التحمل والقوة، اختيار أول لعشاق المغامرات والعمل الشاق. أثبتت جدارتها في أصعب الظروف المناخية والطرق الوعرة حول العالم.",
      sales: "19+ مليون",
      year: "1968",
      type: "بيك أب",
      color: "#F39C12",
      features: ["متينة", "قوية", "موثوقة", "تتحمل الصعاب"],
      generations: 8,
      engine: "2.8L ديزل",
      fuel: "8.5 لتر/100كم",
    },
    {
      src: img5,
      title: "تويوتا لاند كروزر",
      description: "من أشهر سيارات الدفع الرباعي في العالم",
      fullDesc: "مبيعاتها أكثر من 10 ملايين سيارة منذ 1951. لاند كروزر رمز الفخامة والقوة في عالم الـ SUV، اختيار الملوك والقادة. تتميز بقدراتها الخارقة على الطرقات الوعرة وفخامة لا تضاهى.",
      sales: "10+ مليون",
      year: "1951",
      type: "SUV",
      color: "#1ABC9C",
      features: ["فاخرة", "قوية", "مجهزة للطرق الوعرة", "مريحة"],
      generations: 9,
      engine: "3.5L V6 توين تيربو",
      fuel: "12 لتر/100كم",
    },
    {
      src: img6,
      title: "تويوتا بريوس",
      description: "أول سيارة هجينة ناجحة تجاريًا",
      fullDesc: "تجاوزت مبيعاتها 6 ملايين سيارة. بريوس غيرت مفهوم صناعة السيارات الهجينة وفتحت الباب لعصر السيارات الصديقة للبيئة. تعتبر أيقونة التكنولوجيا الخضراء والاستدامة.",
      sales: "6+ مليون",
      year: "1997",
      type: "هجينة",
      color: "#3498DB",
      features: ["صديقة للبيئة", "موفرة", "مبتكرة", "هادئة"],
      generations: 4,
      engine: "1.8L هايبرد",
      fuel: "3.5 لتر/100كم",
    },
  ];

  const achievements = [
    { number: "1", label: "أكبر صانع سيارات في العالم", icon: "fa-crown", desc: "ريادة عالمية في صناعة السيارات", fullDesc: "تويوتا تحتل المرتبة الأولى عالميًا في إنتاج السيارات منذ عام 2020، بإنتاج سنوي يتجاوز 10 ملايين سيارة." },
    { number: "1", label: "الأكثر مبيعًا على الإطلاق", icon: "fa-chart-line", desc: "أكثر من 50 مليون سيارة", fullDesc: "مجموع مبيعات تويوتا حول العالم تجاوز 250 مليون سيارة منذ تأسيسها، مع 50 مليون منها من موديل كورولا فقط." },
    { number: "100%", label: "جودة يابانية أصيلة", icon: "fa-gem", desc: "صناعة متقنة بأعلى المعايير", fullDesc: "نظام إنتاج تويوتا (TPS) هو معيار الجودة العالمي، مع نسبة أعطال أقل من 0.5% سنويًا." },
    { number: "50+", label: "عام من الريادة", icon: "fa-medal", desc: "عقود من التميز والابتكار", fullDesc: "أكثر من 85 عامًا من الابتكار في صناعة السيارات، مع أكثر من 50 عامًا من الريادة العالمية." },
  ];

  const timelineEvents = [
    { year: "1937", title: "تأسيس شركة تويوتا", desc: "انطلاقة عملاق السيارات", icon: "fa-flag-checkered", fullDesc: "تأسست شركة تويوتا للصناعات المحدودة على يد كييشيرو تويودا، انطلاقًا من مصانع النسيج العائلية." },
    { year: "1966", title: "إطلاق كورولا", desc: "أكثر سيارة مبيعًا في التاريخ", icon: "fa-car", fullDesc: "انطلقت تويوتا كورولا لتصبح الأسطورة التي غيرت مفهوم السيارات العائلية، وتصبح الأكثر مبيعًا في التاريخ." },
    { year: "1982", title: "إطلاق كامري", desc: "أيقونة السيدان العائلية", icon: "fa-car-side", fullDesc: "كامري جمعت بين الفخامة والأداء، لتصبح الخيار الأول للعائلات حول العالم." },
    { year: "1997", title: "إطلاق بريوس", desc: "أول سيارة هجينة في العالم", icon: "fa-leaf", fullDesc: "ثورة في عالم السيارات الهجينة، وبداية عصر السيارات الصديقة للبيئة." },
    { year: "2012", title: "ريادة الهايبرد", desc: "الرائدة في التكنولوجيا الخضراء", icon: "fa-bolt", fullDesc: "تويوتا تصبح الرائدة عالميًا في تكنولوجيا الهايبرد مع إطلاق 10 موديلات مختلفة." },
    { year: "2024", title: "الريادة العالمية", desc: "أكبر صانع سيارات في العالم", icon: "fa-trophy", fullDesc: "تويوتا تتصدر قائمة أكبر شركات صناعة السيارات عالميًا بأحدث التقنيات." },
  ];

  const scrollToSection = (index) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
    setActiveIndex(index);
  };

  const getRepairTypeName = (type) => {
    const types = {
      periodic: "🛢️ صيانة دورية",
      mechanical: "🔧 صيانة ميكانيكية",
      electrical: "⚡ صيانة كهربائية",
      accident: "🚗 صيانة حوادث"
    };
    return types[type] || type;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000 / 60);
    
    if (diff < 1) return "الآن";
    if (diff < 60) return `منذ ${diff} دقيقة`;
    if (diff < 1440) return `منذ ${Math.floor(diff / 60)} ساعة`;
    return date.toLocaleDateString("ar-EG");
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-animation">
          <div className="bg-circle bg-circle-1"></div>
          <div className="bg-circle bg-circle-2"></div>
          <div className="bg-circle bg-circle-3"></div>
        </div>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-logo-container">
              <div className="logo-ring ring-1"></div>
              <div className="logo-ring ring-2"></div>
              <img className="hero-logo" src={useimg} alt="Toyota Motor" />
            </div>
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="title-gradient">تويوتا</span>
                <span className="title-white"> موتور</span>
              </h1>
              <div className="hero-divider">
                <div className="divider-line"></div>
                <i className="fas fa-star divider-star"></i>
                <i className="fas fa-car divider-car"></i>
                <i className="fas fa-star divider-star"></i>
                <div className="divider-line"></div>
              </div>
              <p className="hero-subtitle">
                "طريقك إلى التميز يبدأ مع تويوتا"
              </p>
              <p className="hero-desc">
                أكثر من 85 عامًا من الابتكار والجودة اليابانية الأصيلة
              </p>
              <button className="hero-btn" onClick={() => scrollToSection(1)}>
                اكتشف عالم تويوتا
                <i className="fas fa-arrow-left"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="scroll-indicator" onClick={() => scrollToSection(1)}>
          <div className="scroll-mouse"></div>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Quick Booking Section - في أول السكشن */}
      <section className="quick-booking-section-hero">
        <div className="container">
          <div className="quick-booking-card-hero">
            <div className="quick-booking-bg-animation">
              <div className="bg-shape-hero shape-hero-1"></div>
              <div className="bg-shape-hero shape-hero-2"></div>
              <div className="bg-shape-hero shape-hero-3"></div>
            </div>
            <div className="quick-booking-icon-hero">
              <i className="fas fa-calendar-check"></i>
              <div className="hero-icon-pulse"></div>
              <div className="hero-icon-ring"></div>
            </div>
            <div className="quick-booking-content-hero">
              <h3>احجز موعد صيانة الآن</h3>
              <p>احصل على خدمة متميزة بأفضل الأسعار وخصم 15% للحجوزات الجديدة</p>
              <button className="quick-booking-btn-hero" onClick={scrollToRepairForm}>
                حجز موعد
                <i className="fas fa-arrow-left"></i>
                <span className="btn-shine-hero"></span>
              </button>
            </div>
            <div className="quick-booking-offer-hero">
              <span>خصم 15%</span>
              <small>للحجوزات الجديدة</small>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - رحلة التميز تويوتا */}
      <section className="about-section" ref={(el) => (sectionRefs.current[1] = el)} id="about">
        <div className="container">
          <div className="about-header text-center">
            <span className="section-badge">عن الشركة</span>
            <h2 className="section-title">رحلة التميز <span className="title-red">تويوتا</span></h2>
            <div className="section-divider">
              <div className="divider-line-small"></div>
              <i className="fas fa-timeline"></i>
              <div className="divider-line-small"></div>
            </div>
            <p className="section-subtitle">اكتشف قصة نجاح أكبر صانع سيارات في العالم</p>
          </div>

          <div className="about-wrapper">
            <div className="about-main-card">
              {/* إحصائيات سريعة */}
              <div className="about-stats-grid">
                <div className="about-stat-item">
                  <div className="about-stat-number">85+</div>
                  <div className="about-stat-label">عام من الابتكار</div>
                  <div className="about-stat-icon"><i className="fas fa-calendar-alt"></i></div>
                </div>
                <div className="about-stat-item">
                  <div className="about-stat-number">50+</div>
                  <div className="about-stat-label">دولة حول العالم</div>
                  <div className="about-stat-icon"><i className="fas fa-globe"></i></div>
                </div>
                <div className="about-stat-item">
                  <div className="about-stat-number">370K+</div>
                  <div className="about-stat-label">موظف عالمي</div>
                  <div className="about-stat-icon"><i className="fas fa-users"></i></div>
                </div>
              </div>
              
              {/* العمودين متساويين */}
              <div className="about-two-columns">
                {/* العمود الأيمن - البطاقات المعلوماتية (5 بطاقات) */}
                <div className="about-cards-column">
                  <div className="about-info-card" onClick={() => setSelectedTimelineEvent({ year: "1937", title: "تأسيس شركة تويوتا", fullDesc: "تأسست شركة تويوتا للصناعات المحدودة على يد المهندس كييشيرو تويودا في مدينة تويوتا سيتي باليابان. بدأت الشركة في صناعة آلات النسيج قبل أن تتحول إلى صناعة السيارات لتصبح عملاقًا عالميًا." })}>
                    <div className="card-icon"><i className="fas fa-flag-checkered"></i></div>
                    <div className="card-content">
                      <h4>تأسيس شركة تويوتا</h4>
                      <p>تأسست شركة تويوتا عام <strong>1937</strong> على يد المهندس الياباني <strong>كييشيرو تويودا</strong></p>
                      <span className="card-hint">اضغط للمزيد <i className="fas fa-arrow-left"></i></span>
                    </div>
                  </div>
                  <div className="about-info-card" onClick={() => setSelectedTimelineEvent({ year: "بداية الرحلة", title: "بداية الرحلة", fullDesc: "بدأت رحلة تويوتا من خلال صناعة آلات النسيج المتطورة تحت اسم Toyoda Automatic Loom Works. تم تحويل اسم الشركة إلى Toyota لأنها تعتبر أكثر حظًا في الثقافة اليابانية." })}>
                    <div className="card-icon"><i className="fas fa-industry"></i></div>
                    <div className="card-content">
                      <h4>بداية الرحلة</h4>
                      <p>بدأت الشركة في صناعة <strong>آلات النسيج</strong> قبل أن تتحول إلى صناعة السيارات</p>
                      <span className="card-hint">اضغط للمزيد <i className="fas fa-arrow-left"></i></span>
                    </div>
                  </div>
                  <div className="about-info-card" onClick={() => setSelectedTimelineEvent({ year: "نظام TPS", title: "نظام إنتاج تويوتا (TPS)", fullDesc: "نظام إنتاج تويوتا (TPS) هو نظام صناعي ثوري يركز على تحسين الكفاءة وتقليل الهدر. يعتمد على مبدأ 'الإنتاج في الوقت المحدد' (Just-In-Time) و 'جيدوكا'." })}>
                    <div className="card-icon"><i className="fas fa-microchip"></i></div>
                    <div className="card-content">
                      <h4>نظام إنتاج تويوتا (TPS)</h4>
                      <p>نظام صناعي ثوري يركز على تحسين الكفاءة وتقليل الهدر</p>
                      <span className="card-hint">اضغط للمزيد <i className="fas fa-arrow-left"></i></span>
                    </div>
                  </div>
                  <div className="about-info-card" onClick={() => setSelectedTimelineEvent({ year: "الابتكار", title: "الابتكار المستمر", fullDesc: "تويوتا تستثمر أكثر من 10 مليارات دولار سنويًا في البحث والتطوير، مع أكثر من 20 ألف براءة اختراع في مجال السيارات والتكنولوجيا." })}>
                    <div className="card-icon"><i className="fas fa-lightbulb"></i></div>
                    <div className="card-content">
                      <h4>الابتكار المستمر</h4>
                      <p>تويوتا تستثمر أكثر من <strong>10 مليارات دولار</strong> سنويًا في البحث والتطوير</p>
                      <span className="card-hint">اضغط للمزيد <i className="fas fa-arrow-left"></i></span>
                    </div>
                  </div>
                  <div className="about-info-card" onClick={() => setSelectedTimelineEvent({ year: "الاستدامة", title: "الاستدامة البيئية", fullDesc: "تويوتا تهدف للوصول إلى الحياد الكربوني بحلول عام 2050، مع إطلاق 15 موديل كهربائي جديد بحلول 2025." })}>
                    <div className="card-icon"><i className="fas fa-leaf"></i></div>
                    <div className="card-content">
                      <h4>الاستدامة البيئية</h4>
                      <p>تويوتا تهدف للوصول إلى <strong>الحياد الكربوني</strong> بحلول عام 2050</p>
                      <span className="card-hint">اضغط للمزيد <i className="fas fa-arrow-left"></i></span>
                    </div>
                  </div>
                </div>

                {/* العمود الأيسر - الخط الزمني */}
                <div className="about-timeline-column">
                  <div className="timeline-vertical-line"></div>
                  {timelineEvents.map((event, idx) => (
                    <div key={idx} className="timeline-item" style={{ animationDelay: `${idx * 0.1}s` }} onClick={() => setSelectedTimelineEvent(event)}>
                      <div className="timeline-dot">
                        <i className={`fas ${event.icon}`}></i>
                      </div>
                      <div className="timeline-content">
                        <div className="timeline-year">{event.year}</div>
                        <div className="timeline-title">{event.title}</div>
                        <div className="timeline-desc">{event.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Modal */}
      {selectedTimelineEvent && (
        <div className="modal-overlay" onClick={() => setSelectedTimelineEvent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedTimelineEvent(null)}>
              <i className="fas fa-times"></i>
            </button>
            <div className="modal-icon">
              <i className={`fas ${selectedTimelineEvent.icon || 'fa-history'}`}></i>
            </div>
            <h3>{selectedTimelineEvent.year}</h3>
            <h4>{selectedTimelineEvent.title}</h4>
            <p>{selectedTimelineEvent.fullDesc || selectedTimelineEvent.desc}</p>
          </div>
        </div>
      )}

      {/* Achievements Section */}
      <section className="achievements-section">
        <div className="container">
          <div className="achievements-header text-center">
            <span className="achievements-badge">إنجازاتنا</span>
            <h2 className="section-title white">أرقام تتحدث عن <span className="title-red">التميز</span></h2>
            <div className="section-divider white">
              <div className="divider-line-small"></div>
              <i className="fas fa-medal"></i>
              <div className="divider-line-small"></div>
            </div>
            <p className="section-subtitle white">إنجازات عالمية جعلت تويوتا في صدارة صناعة السيارات</p>
          </div>
          <div className="achievements-grid">
            {achievements.map((ach, idx) => (
              <div key={idx} className="achievement-card" style={{ animationDelay: `${idx * 0.15}s` }} onClick={() => setSelectedAchievement(ach)}>
                <div className="achievement-icon">
                  <i className={`fas ${ach.icon}`}></i>
                </div>
                <div className="achievement-number">{ach.number}</div>
                <div className="achievement-label">{ach.label}</div>
                <div className="achievement-desc">{ach.desc}</div>
                <div className="achievement-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Modal */}
      {selectedAchievement && (
        <div className="modal-overlay" onClick={() => setSelectedAchievement(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedAchievement(null)}>
              <i className="fas fa-times"></i>
            </button>
            <div className="modal-icon achievement-icon-modal">
              <i className={`fas ${selectedAchievement.icon}`}></i>
            </div>
            <h3>{selectedAchievement.label}</h3>
            <div className="modal-number">{selectedAchievement.number}</div>
            <p>{selectedAchievement.fullDesc}</p>
          </div>
        </div>
      )}

      {/* Cars Section */}
      <section className="cars-section" ref={(el) => (sectionRefs.current[2] = el)} id="cars">
        <div className="container">
          <div className="cars-header text-center">
            <span className="section-badge">أيقونات تويوتا</span>
            <h2 className="section-title">أشهر <span className="">6 سيارات</span> في التاريخ</h2>
            <div className="section-divider">
              <div className="divider-line-small"></div>
              <i className="fas fa-car"></i>
              <div className="divider-line-small"></div>
            </div>
            <p className="section-desc">تعرف على السيارات التي غيرت تاريخ صناعة السيارات عالميًا</p>
          </div>

          <div className="cars-grid">
            {images.map((img, index) => (
              <div key={index} onClick={() => setSelectImg(img)} className="car-card" onMouseEnter={() => setHoveredCard(index)} onMouseLeave={() => setHoveredCard(null)} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="car-image-wrapper">
                  <img src={img.src} alt={img.title} className="car-image" />
                  <div className="car-overlay">
                    <div className="car-overlay-content">
                      <i className="fas fa-eye"></i>
                      <span>عرض التفاصيل</span>
                    </div>
                  </div>
                  <div className="car-badge" style={{ background: img.color }}>{img.type}</div>
                  <div className="car-sales-badge"><i className="fas fa-chart-line"></i>{img.sales}</div>
                </div>
                <div className="car-info">
                  <h3 className="car-title">{img.title}</h3>
                  <div className="car-stats">
                    <div className="car-stat"><i className="fas fa-calendar-alt"></i>{img.year}</div>
                    <div className="car-stat"><i className="fas fa-gas-pump"></i>موفرة</div>
                    <div className="car-stat"><i className="fas fa-cog"></i>{img.generations} أجيال</div>
                  </div>
                  <p className="car-description">{img.description}</p>
                  <div className="car-features">
                    {img.features.slice(0, 3).map((feature, i) => (<span key={i} className="car-feature">{feature}</span>))}
                    <span className="car-feature more">+{img.features.length - 3}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Car Details Modal */}
      {selectImg && (
        <div className="modal-overlay" onClick={() => setSelectImg(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectImg(null)}><i className="fas fa-times"></i></button>
            <div className="modal-grid">
              <div className="modal-image-side"><img src={selectImg.src} alt={selectImg.title} className="modal-image" /><div className="modal-badge" style={{ background: selectImg.color }}>{selectImg.type}</div></div>
              <div className="modal-info-side">
                <h2 className="modal-title">{selectImg.title}</h2>
                <div className="modal-stats">
                  <div className="modal-stat"><i className="fas fa-chart-line"></i><div><span className="stat-label">المبيعات</span><span className="stat-value">{selectImg.sales}</span></div></div>
                  <div className="modal-stat"><i className="fas fa-calendar-alt"></i><div><span className="stat-label">الإطلاق</span><span className="stat-value">{selectImg.year}</span></div></div>
                  <div className="modal-stat"><i className="fas fa-cogs"></i><div><span className="stat-label">الأجيال</span><span className="stat-value">{selectImg.generations}</span></div></div>
                </div>
                <div className="modal-specs"><div className="spec-item"><i className="fas fa-engine"></i>{selectImg.engine}</div><div className="spec-item"><i className="fas fa-tachometer-alt"></i>استهلاك: {selectImg.fuel}</div></div>
                <p className="modal-description">{selectImg.fullDesc}</p>
                <div className="modal-features">{selectImg.features.map((feature, i) => (<span key={i} className="modal-feature">{feature}</span>))}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Repair Section - القسم الأخير المحسن */}
      <section className="repair-section" ref={repairFormRef}>
        <div className="repair-bg-animation">
          <div className="repair-bg-shape shape-1"></div>
          <div className="repair-bg-shape shape-2"></div>
          <div className="repair-bg-shape shape-3"></div>
          <div className="repair-bg-shape shape-4"></div>
          <div className="repair-bg-shape shape-5"></div>
          <div className="repair-bg-shape shape-6"></div>
        </div>

        <div className="particles-container">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
          <div className="particle particle-7"></div>
          <div className="particle particle-8"></div>
        </div>

        <div className="container">
         


          {/* قسم طلب صيانة جديد مع أنيميشن */}
          <div className="new-booking-section">
            <div className="new-booking-header">
              <div className="new-booking-icon">
                <i className="fas fa-pen-alt"></i>
                <div className="new-booking-icon-pulse"></div>
              </div>
              <h3>
                طلب صيانة جديد
                <span className="new-booking-animation-text"></span>
              </h3>
            </div>
            <div className="new-booking-wrapper">
              <div className="repair-form-box">
                <div className="form-glow"></div>
                <RepairForm />
              </div>
            </div>
          </div>

          

          <div className="admin-btn-wrapper">
            <button className="admin-btn" onClick={() => navigate("/admin")}>
              <i className="fas fa-crown"></i>
              لوحة التحكم الإدارية
              <i className="fas fa-arrow-left"></i>
              <span className="btn-ripple"></span>
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* ==================== Global ==================== */
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .text-center { text-align: center; }

        /* ==================== Hero Section ==================== */
        .hero-section {
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0f1a 0%, #1a2a3a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding-top: 80px;
        }
        .hero-bg-animation { position: absolute; width: 100%; height: 100%; overflow: hidden; }
        .bg-circle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(227, 24, 55, 0.1), transparent);
          animation: float 20s ease-in-out infinite;
        }
        .bg-circle-1 { width: 500px; height: 500px; top: -200px; right: -200px; }
        .bg-circle-2 { width: 400px; height: 400px; bottom: -150px; left: -150px; animation-delay: -5s; }
        .bg-circle-3 { width: 300px; height: 300px; top: 50%; left: 50%; transform: translate(-50%, -50%); animation-delay: -10s; }
        @keyframes float { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(30px, -30px) scale(1.1); } }
        .hero-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center; z-index: 1; }
        .hero-content { animation: fadeInUp 1s ease forwards; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        .hero-logo-container { position: relative; display: inline-block; margin-bottom: 50px; }
        .hero-logo { width: 180px; height: 180px; border-radius: 50%; object-fit: cover; position: relative; z-index: 2; box-shadow: 0 0 60px rgba(227, 24, 55, 0.5); transition: transform 0.5s ease; }
        .hero-logo:hover { transform: scale(1.05); }
        .logo-ring { position: absolute; top: -10px; left: -10px; right: -10px; bottom: -10px; border-radius: 50%; border: 2px solid rgba(227, 24, 55, 0.6); animation: pulseRing 2s ease-out infinite; }
        .ring-1 { animation-delay: 0s; }
        .ring-2 { animation-delay: 1s; }
        @keyframes pulseRing { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.2); opacity: 0; } }
        .hero-title { font-size: 64px; font-weight: 800; margin-bottom: 25px; }
        .title-gradient { background: linear-gradient(135deg, #E31837, #FF6B6B); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .title-white { color: white; }
        .hero-divider { display: flex; align-items: center; justify-content: center; gap: 15px; margin: 30px 0; }
        .divider-line { width: 60px; height: 2px; background: linear-gradient(90deg, #E31837, #FF6B6B); }
        .divider-star, .divider-car { color: #E31837; font-size: 16px; }
        .hero-subtitle { font-size: 22px; color: rgba(255, 255, 255, 0.9); font-style: italic; margin-bottom: 20px; }
        .hero-desc { font-size: 18px; color: rgba(255, 255, 255, 0.7); margin-bottom: 40px; }
        .hero-btn { background: linear-gradient(135deg, #E31837, #FF6B6B); color: white; border: none; padding: 14px 35px; font-size: 16px; font-weight: 600; border-radius: 50px; cursor: pointer; transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 10px; }
        .hero-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(227, 24, 55, 0.4); gap: 15px; }
        .scroll-indicator { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; animation: bounce 2s infinite; }
        @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(10px); } }
        .scroll-mouse { width: 26px; height: 40px; border: 2px solid white; border-radius: 20px; position: relative; }
        .scroll-mouse::after { content: ''; position: absolute; top: 8px; left: 50%; transform: translateX(-50%); width: 4px; height: 8px; background: white; border-radius: 2px; animation: scroll 1.5s infinite; }
        @keyframes scroll { 0% { opacity: 1; transform: translateX(-50%) translateY(0); } 100% { opacity: 0; transform: translateX(-50%) translateY(15px); } }

        /* ==================== Quick Booking Section Hero ==================== */
        .quick-booking-section-hero {
          padding: 60px 0;
          background: linear-gradient(135deg, #0F172A, #1E293B);
          position: relative;
        }
        .quick-booking-card-hero {
          background: linear-gradient(135deg, #1E293B, #0F172A);
          border-radius: 28px;
          padding: 35px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 25px;
          position: relative;
          overflow: hidden;
          border: 1px solid #334155;
          transition: all 0.4s ease;
        }
        .quick-booking-card-hero:hover {
          border-color: #E31837;
          transform: translateY(-5px);
          box-shadow: 0 25px 45px rgba(227,24,55,0.2);
        }
        .quick-booking-bg-animation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .bg-shape-hero {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(227,24,55,0.08), transparent);
          animation: floatHero 12s ease-in-out infinite;
        }
        .shape-hero-1 { width: 300px; height: 300px; top: -100px; right: -100px; animation-delay: 0s; }
        .shape-hero-2 { width: 250px; height: 250px; bottom: -80px; left: -80px; animation-delay: -4s; }
        .shape-hero-3 { width: 180px; height: 180px; top: 50%; left: 30%; animation-delay: -7s; animation-duration: 15s; }
        @keyframes floatHero {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          50% { transform: translate(-20px, 20px) scale(1.1); opacity: 0.7; }
        }
        .quick-booking-icon-hero {
          width: 90px;
          height: 90px;
          background: linear-gradient(135deg, #E31837, #FF6B6B);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }
        .quick-booking-icon-hero i { font-size: 42px; color: white; }
        .hero-icon-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(227,24,55,0.4);
          animation: heroPulse 2s ease-out infinite;
        }
        @keyframes heroPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .hero-icon-ring {
          position: absolute;
          width: 130%;
          height: 130%;
          border-radius: 50%;
          border: 2px solid #E31837;
          animation: heroRing 2s ease-out infinite;
        }
        @keyframes heroRing {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .quick-booking-content-hero { flex: 1; z-index: 1; }
        .quick-booking-content-hero h3 { font-size: 28px; font-weight: 800; color: #FFFFFF; margin-bottom: 10px; }
        .quick-booking-content-hero p { font-size: 15px; color: #94A3B8; }
        .quick-booking-btn-hero {
          background: linear-gradient(135deg, #E31837, #FF6B6B);
          border: none;
          padding: 14px 32px;
          border-radius: 50px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-top: 18px;
          font-size: 16px;
          position: relative;
          overflow: hidden;
        }
        .quick-booking-btn-hero:hover { transform: translateX(-5px); gap: 16px; }
        .btn-shine-hero {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: btnShineHero 2s infinite;
        }
        @keyframes btnShineHero {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        .quick-booking-offer-hero {
          text-align: center;
          background: rgba(227,24,55,0.15);
          padding: 15px 25px;
          border-radius: 60px;
          border: 1px solid rgba(227,24,55,0.3);
          z-index: 1;
        }
        .quick-booking-offer-hero span {
          display: block;
          font-size: 28px;
          font-weight: 800;
          color: #E31837;
        }
        .quick-booking-offer-hero small {
          font-size: 12px;
          color: #94A3B8;
        }

        /* ==================== About Section ==================== */
        .about-section { padding: 100px 0; background: #0F172A; }
        .section-badge { display: inline-block; background: linear-gradient(135deg, #E31837, #FF6B6B); color: white; padding: 6px 18px; border-radius: 50px; font-size: 14px; font-weight: 500; margin-bottom: 25px; }
        .section-title { font-size: 42px; font-weight: 800; color: #FFFFFF; margin-bottom: 20px; }
        .title-red { color: #E31837; }
        .section-subtitle { font-size: 16px; color: #94A3B8; margin-top: -15px; margin-bottom: 40px; }
        .section-divider { display: flex; align-items: center; justify-content: center; gap: 12px; margin: 25px 0 30px; }
        .divider-line-small { width: 50px; height: 2px; background: linear-gradient(90deg, #E31837, #FF6B6B); }

        .about-main-card { background: #1E293B; border-radius: 30px; padding: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
        
        .about-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #334155; }
        .about-stat-item { text-align: center; position: relative; }
        .about-stat-number { font-size: 36px; font-weight: 800; color: #E31837; }
        .about-stat-label { font-size: 13px; color: #94A3B8; margin-top: 5px; }
        .about-stat-icon { position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 40px; height: 40px; background: linear-gradient(135deg, #E31837, #FF6B6B); border-radius: 50%; display: flex; align-items: center; justify-content: center; opacity: 0; transition: all 0.3s ease; }
        .about-stat-icon i { color: white; font-size: 18px; }
        .about-stat-item:hover .about-stat-icon { opacity: 1; top: -30px; }

        .about-two-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; }
        
        .about-cards-column { display: flex; flex-direction: column; gap: 20px; }
        .about-info-card {
          display: flex;
          gap: 20px;
          padding: 22px;
          background: #0F172A;
          border-radius: 20px;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid #334155;
          position: relative;
          overflow: hidden;
        }
        .about-info-card::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 0;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(227,24,55,0.08));
          transition: width 0.4s ease;
        }
        .about-info-card:hover::before { width: 100%; }
        .about-info-card:hover { transform: translateX(-5px); border-color: #E31837; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
        .card-icon {
          width: 55px;
          height: 55px;
          background: linear-gradient(135deg, #E31837, #FF6B6B);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .about-info-card:hover .card-icon { transform: scale(1.05) rotate(5deg); }
        .card-icon i { font-size: 26px; color: white; }
        .card-content { flex: 1; }
        .card-content h4 { font-size: 18px; font-weight: 700; color: #FFFFFF; margin-bottom: 8px; }
        .card-content p { font-size: 13px; line-height: 1.5; color: #94A3B8; margin: 0; }
        .card-content strong { color: #E31837; }
        .card-hint { display: inline-block; margin-top: 10px; font-size: 11px; color: #E31837; opacity: 0; transition: opacity 0.3s ease; }
        .about-info-card:hover .card-hint { opacity: 1; }

        .about-timeline-column { position: relative; padding: 10px 0; }
        .timeline-vertical-line {
          position: absolute;
          right: 30px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, #E31837, #FF6B6B, #E31837);
          border-radius: 2px;
        }
        .timeline-item {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 28px;
          opacity: 0;
          animation: slideInRight 0.5s forwards;
          cursor: pointer;
          position: relative;
        }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        .timeline-dot {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #E31837, #FF6B6B);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 22px;
          box-shadow: 0 5px 15px rgba(227,24,55,0.3);
          flex-shrink: 0;
          transition: all 0.3s ease;
          z-index: 1;
        }
        .timeline-item:hover .timeline-dot { transform: scale(1.1); box-shadow: 0 8px 25px rgba(227,24,55,0.5); }
        .timeline-content {
          flex: 1;
          background: #0F172A;
          padding: 15px 20px;
          border-radius: 16px;
          transition: all 0.3s ease;
          border: 1px solid #334155;
        }
        .timeline-item:hover .timeline-content { transform: translateX(-5px); border-color: #E31837; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
        .timeline-year { font-size: 13px; color: #E31837; font-weight: 700; }
        .timeline-title { font-size: 16px; font-weight: 700; color: #FFFFFF; margin: 5px 0; }
        .timeline-desc { font-size: 12px; color: #94A3B8; }

        /* ==================== Achievements Section ==================== */
        .achievements-section { padding: 100px 0; background: linear-gradient(135deg, #0F172A, #1E293B); }
        .achievements-badge { display: inline-block; background: rgba(227,24,55,0.2); color: #E31837; padding: 6px 18px; border-radius: 50px; font-size: 14px; font-weight: 500; margin-bottom: 25px; }
        .section-title.white { color: white; }
        .section-subtitle.white { color: #94A3B8; }
        .section-divider.white .divider-line-small { background: linear-gradient(90deg, #E31837, #FF6B6B); }
        .achievements-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; }
        .achievement-card {
          text-align: center;
          padding: 35px 25px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          transition: all 0.4s ease;
          cursor: pointer;
          border: 1px solid #334155;
          opacity: 0;
          animation: fadeInUp 0.6s forwards;
          position: relative;
          overflow: hidden;
        }
        .achievement-card:hover { transform: translateY(-10px); border-color: #E31837; background: rgba(255,255,255,0.1); }
        .achievement-icon i { font-size: 52px; color: #E31837; margin-bottom: 20px; display: inline-block; transition: transform 0.3s ease; }
        .achievement-card:hover .achievement-icon i { transform: scale(1.1); }
        .achievement-number { font-size: 56px; font-weight: 800; color: white; margin: 15px 0; }
        .achievement-label { font-size: 16px; font-weight: 600; color: white; margin-bottom: 8px; }
        .achievement-desc { font-size: 12px; color: #94A3B8; }
        .achievement-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(227,24,55,0.2), transparent);
          transition: all 0.5s ease;
          border-radius: 50%;
        }
        .achievement-card:hover .achievement-glow { width: 200px; height: 200px; top: 50%; left: 50%; transform: translate(-50%, -50%); }

        /* ==================== Modal ==================== */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.95);
          backdrop-filter: blur(15px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .modal-content {
          background: #1E293B;
          border-radius: 32px;
          max-width: 500px;
          width: 90%;
          padding: 40px;
          text-align: center;
          animation: scaleIn 0.3s ease;
          position: relative;
          border: 1px solid #E31837;
        }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .modal-close {
          position: absolute;
          top: 20px;
          left: 20px;
          width: 35px;
          height: 35px;
          background: #0F172A;
          border: none;
          border-radius: 50%;
          color: #FFFFFF;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .modal-close:hover { background: #E31837; transform: rotate(90deg); }
        .modal-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #E31837, #FF6B6B);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
        .modal-icon i { font-size: 40px; color: white; }
        .modal-content h3 { font-size: 18px; color: #94A3B8; margin-bottom: 5px; }
        .modal-content h4 { font-size: 24px; color: #E31837; margin-bottom: 20px; }
        .modal-number { font-size: 48px; font-weight: 800; color: #E31837; margin: 10px 0; }
        .modal-content p { font-size: 16px; line-height: 1.8; color: #CBD5E1; margin: 0; }

        /* ==================== Cars Section ==================== */
        .cars-section { padding: 100px 0; background: #0F172A; }
        .section-desc { font-size: 16px; color: #94A3B8; margin-top: -15px; margin-bottom: 40px; }
        .cars-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 35px; }
        .car-card {
          background: #1E293B;
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          cursor: pointer;
          opacity: 0;
          animation: fadeInUp 0.6s forwards;
          border: 1px solid #334155;
        }
        .car-card:hover { transform: translateY(-10px); border-color: #E31837; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .car-image-wrapper { position: relative; overflow: hidden; aspect-ratio: 4/3; }
        .car-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .car-card:hover .car-image { transform: scale(1.1); }
        .car-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(227,24,55,0.9), rgba(255,107,107,0.9));
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .car-card:hover .car-overlay { opacity: 1; }
        .car-overlay-content { text-align: center; color: white; transform: translateY(20px); transition: transform 0.4s ease; }
        .car-card:hover .car-overlay-content { transform: translateY(0); }
        .car-overlay-content i { font-size: 32px; margin-bottom: 10px; display: block; }
        .car-badge { position: absolute; top: 15px; right: 15px; color: white; padding: 5px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; z-index: 2; }
        .car-sales-badge { position: absolute; bottom: 15px; left: 15px; background: rgba(0,0,0,0.8); color: white; padding: 5px 12px; border-radius: 20px; font-size: 11px; display: flex; align-items: center; gap: 5px; z-index: 2; }
        .car-info { padding: 20px; }
        .car-title { font-size: 18px; font-weight: 700; color: #FFFFFF; margin-bottom: 10px; }
        .car-stats { display: flex; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
        .car-stat { display: flex; align-items: center; gap: 5px; font-size: 11px; color: #94A3B8; }
        .car-stat i { color: #E31837; }
        .car-description { font-size: 12px; color: #94A3B8; line-height: 1.6; margin-bottom: 12px; }
        .car-features { display: flex; flex-wrap: wrap; gap: 8px; }
        .car-feature { font-size: 10px; padding: 4px 10px; background: #0F172A; border-radius: 20px; color: #E31837; border: 1px solid #334155; }
        .car-feature.more { background: #E31837; color: white; border: none; }

        /* ==================== Modal Container ==================== */
        .modal-container {
          background: #1E293B;
          border-radius: 32px;
          max-width: 1000px;
          width: 90%;
          max-height: 85vh;
          overflow-y: auto;
          animation: scaleIn 0.3s ease;
          position: relative;
          border: 1px solid #E31837;
        }
        .modal-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 0; }
        .modal-image-side { position: relative; background: #0F172A; display: flex; align-items: center; justify-content: center; padding: 30px; }
        .modal-image { width: 100%; height: auto; border-radius: 20px; object-fit: cover; }
        .modal-badge { position: absolute; bottom: 45px; right: 45px; color: white; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .modal-info-side { padding: 30px; }
        .modal-title { font-size: 28px; font-weight: 800; color: #FFFFFF; margin-bottom: 20px; }
        .modal-stats { display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap; }
        .modal-stat { display: flex; align-items: center; gap: 12px; background: #0F172A; padding: 12px 18px; border-radius: 16px; flex: 1; }
        .modal-stat i { font-size: 28px; color: #E31837; }
        .stat-label { display: block; font-size: 10px; color: #94A3B8; }
        .stat-value { display: block; font-size: 16px; font-weight: 700; color: #FFFFFF; }
        .modal-specs { display: flex; gap: 15px; margin-bottom: 20px; flex-wrap: wrap; }
        .spec-item { background: #1E293B; padding: 8px 16px; border-radius: 30px; font-size: 12px; color: #E31837; display: flex; align-items: center; gap: 8px; border: 1px solid #334155; }
        .modal-description { font-size: 14px; line-height: 1.8; color: #CBD5E1; margin-bottom: 20px; }
        .modal-features { display: flex; flex-wrap: wrap; gap: 10px; }
        .modal-feature { font-size: 12px; padding: 6px 16px; background: linear-gradient(135deg, #E31837, #FF6B6B); color: white; border-radius: 30px; }

        /* ==================== Repair Section ==================== */
        .repair-section {
          padding: 100px 0;
          background: #0F172A;
          position: relative;
          overflow: hidden;
        }
        .repair-bg-animation {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .repair-bg-shape {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(227,24,55,0.08), transparent);
          animation: floatShape 15s ease-in-out infinite;
        }
        .shape-1 { width: 400px; height: 400px; top: -150px; right: -150px; animation-delay: 0s; }
        .shape-2 { width: 350px; height: 350px; bottom: -100px; left: -100px; animation-delay: -4s; }
        .shape-3 { width: 250px; height: 250px; top: 40%; right: 10%; animation-delay: -7s; animation-duration: 18s; }
        .shape-4 { width: 200px; height: 200px; bottom: 20%; left: 5%; animation-delay: -10s; animation-duration: 12s; }
        .shape-5 { width: 150px; height: 150px; top: 20%; left: 20%; animation-delay: -2s; animation-duration: 14s; }
        .shape-6 { width: 180px; height: 180px; bottom: 40%; right: 15%; animation-delay: -8s; animation-duration: 16s; }
        @keyframes floatShape {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(-30px, 30px) scale(1.2); opacity: 0.6; }
        }
        
        .particles-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #E31837;
          border-radius: 50%;
          opacity: 0;
          animation: particleFloat 8s ease-in-out infinite;
        }
        .particle-1 { top: 20%; left: 10%; animation-delay: 0s; }
        .particle-2 { top: 60%; left: 85%; animation-delay: -1s; width: 6px; height: 6px; }
        .particle-3 { top: 80%; left: 20%; animation-delay: -2s; }
        .particle-4 { top: 30%; left: 75%; animation-delay: -3s; width: 3px; height: 3px; }
        .particle-5 { top: 50%; left: 15%; animation-delay: -4s; width: 5px; height: 5px; }
        .particle-6 { top: 70%; left: 60%; animation-delay: -5s; }
        .particle-7 { top: 15%; left: 50%; animation-delay: -6s; width: 4px; height: 4px; }
        .particle-8 { top: 85%; left: 45%; animation-delay: -7s; width: 3px; height: 3px; }
        @keyframes particleFloat {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.5; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        
        .repair-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #E31837, #FF6B6B);
          color: white;
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 25px;
          position: relative;
          animation: badgeGlow 2s infinite;
        }
        @keyframes badgeGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(227,24,55,0.4); }
          50% { box-shadow: 0 0 0 12px rgba(227,24,55,0); }
        }
        .badge-pulse {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50px;
          background: rgba(255,255,255,0.3);
          animation: pulseExpand 1.5s ease-out infinite;
        }
        @keyframes pulseExpand {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        .section-title {
          position: relative;
          display: inline-block;
        }
        .title-animation-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(227,24,55,0.3), transparent);
          border-radius: 50%;
          animation: titleGlow 3s ease-out infinite;
          pointer-events: none;
        }
        @keyframes titleGlow {
          0% { width: 0; height: 0; opacity: 0.5; }
          100% { width: 300px; height: 300px; opacity: 0; }
        }
        .title-animation-line {
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #E31837, #FF6B6B);
          animation: titleLine 2s ease-in-out infinite;
        }
        @keyframes titleLine {
          0% { width: 0; right: 0; left: auto; }
          50% { width: 100%; }
          100% { width: 0; left: 0; right: auto; }
        }
        
        .repair-divider-icon {
          width: 40px;
          height: 40px;
          background: #1E293B;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #E31837;
          border: 1px solid #334155;
          position: relative;
          overflow: hidden;
        }
        .divider-icon-spin {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 1px solid #E31837;
          border-radius: 50%;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .repair-features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin: 50px 0; }
        .repair-feature-card {
          text-align: center;
          padding: 35px 25px;
          background: #1E293B;
          border-radius: 24px;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          border: 1px solid #334155;
          position: relative;
          overflow: hidden;
          opacity: 0;
          animation: cardFadeInUp 0.6s forwards;
        }
        @keyframes cardFadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .repair-feature-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #E31837, #FF6B6B);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }
        .repair-feature-card:hover::after { transform: scaleX(1); }
        .repair-feature-card:hover { transform: translateY(-8px) scale(1.02); border-color: #E31837; box-shadow: 0 25px 40px rgba(0,0,0,0.4); }
        
        .repair-feature-icon {
          width: 85px;
          height: 85px;
          background: linear-gradient(135deg, #E31837, #FF6B6B);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          position: relative;
          transition: all 0.3s ease;
        }
        .repair-feature-card:hover .repair-feature-icon { transform: scale(1.08) rotate(5deg); }
        .repair-feature-icon i { font-size: 38px; color: white; z-index: 1; }
        
        .icon-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(227,24,55,0.4);
          animation: iconPulse 2s ease-out infinite;
        }
        @keyframes iconPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        
        .icon-ring {
          position: absolute;
          width: 120%;
          height: 120%;
          border-radius: 50%;
          border: 2px solid #E31837;
          animation: ringExpand 2s ease-out infinite;
        }
        @keyframes ringExpand {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        
        .repair-feature-card h3 { font-size: 20px; font-weight: 700; color: #FFFFFF; margin-bottom: 12px; }
        .repair-feature-card p { font-size: 14px; color: #94A3B8; line-height: 1.7; }
        
        .feature-hover-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(227,24,55,0.06));
          transition: width 0.5s ease;
          pointer-events: none;
        }
        .repair-feature-card:hover .feature-hover-line { width: 100%; }
        
        .feature-shine {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.03), transparent);
          transform: rotate(45deg);
          transition: transform 0.6s ease;
        }
        .repair-feature-card:hover .feature-shine { transform: rotate(45deg) translate(20%, 20%); }

        .new-booking-section {
          margin: 50px 0;
        }
        .new-booking-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          position: relative;
        }
        .new-booking-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #E31837, #FF6B6B);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .new-booking-icon i { font-size: 24px; color: white; }
        .new-booking-icon-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(227,24,55,0.4);
          animation: newBookingPulse 1.5s ease-out infinite;
        }
        @keyframes newBookingPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .new-booking-header h3 {
          font-size: 24px;
          font-weight: 700;
          color: #FFFFFF;
          position: relative;
          display: inline-block;
        }
        .new-booking-animation-text {
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #E31837, #FF6B6B);
          animation: textLine 2s ease-in-out infinite;
        }
        @keyframes textLine {
          0% { width: 0; right: 0; left: auto; }
          50% { width: 100%; }
          100% { width: 0; left: 0; right: auto; }
        }
        
        .repair-form-box {
          background: #1E293B;
          border-radius: 24px;
          padding: 35px;
          border: 1px solid #334155;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .repair-form-box:hover {
          border-color: #E31837;
          box-shadow: 0 15px 35px rgba(227,24,55,0.15);
          transform: translateY(-3px);
        }
        .form-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(227,24,55,0.05), transparent);
          opacity: 0;
          transition: opacity 0.6s ease;
          pointer-events: none;
        }
        .repair-form-box:hover .form-glow { opacity: 1; }

        .recent-requests-section {
          margin: 50px 0;
          background: #1E293B;
          border-radius: 24px;
          padding: 25px;
          border: 1px solid #334155;
          transition: all 0.3s ease;
        }
        .recent-requests-section:hover {
          border-color: #E31837;
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(227,24,55,0.1);
        }
        .recent-requests-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 1px solid #334155;
          position: relative;
        }
        .recent-requests-icon {
          width: 45px;
          height: 45px;
          background: rgba(227,24,55,0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .recent-requests-icon i { font-size: 22px; color: #E31837; }
        .recent-requests-icon-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid #E31837;
          animation: recentPulse 2s ease-out infinite;
        }
        @keyframes recentPulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .recent-requests-header h3 {
          font-size: 20px;
          font-weight: 700;
          color: #FFFFFF;
          flex: 1;
          position: relative;
          display: inline-block;
        }
        .recent-requests-animation-text {
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #E31837, #FF6B6B);
          animation: recentTextLine 2.5s ease-in-out infinite;
        }
        @keyframes recentTextLine {
          0% { width: 0; right: 0; left: auto; }
          50% { width: 60%; }
          100% { width: 0; left: 0; right: auto; }
        }
        .refresh-requests-btn {
          background: none;
          border: none;
          color: #94A3B8;
          cursor: pointer;
          font-size: 18px;
          transition: all 0.3s ease;
        }
        .refresh-requests-btn:hover { color: #E31837; transform: rotate(180deg); }
        
        .requests-list-container { max-height: 350px; overflow-y: auto; }
        .request-item-enhanced {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: #0F172A;
          border-radius: 16px;
          margin-bottom: 12px;
          transition: all 0.3s ease;
        }
        .request-item-enhanced:hover {
          transform: translateX(-5px);
          background: #0F172A;
          border-left: 3px solid #E31837;
        }
        .request-icon-enhanced {
          width: 45px;
          height: 45px;
          background: rgba(227,24,55,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .request-icon-enhanced i { color: #E31837; font-size: 20px; }
        .request-info-enhanced { flex: 1; }
        .request-name-enhanced { font-size: 15px; font-weight: 600; color: #FFFFFF; }
        .request-type-enhanced { font-size: 12px; color: #E31837; margin-top: 3px; }
        .request-time-enhanced { font-size: 11px; color: #64748B; margin-top: 3px; }
        .status-badge-enhanced {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
        }
        .status-pending-enhanced { background: rgba(245, 158, 11, 0.2); color: #F59E0B; }
        .empty-requests-enhanced {
          text-align: center;
          padding: 40px;
          color: #64748B;
        }
        .empty-requests-enhanced i { font-size: 45px; margin-bottom: 15px; }
        .show-more-requests-btn {
          width: 100%;
          margin-top: 20px;
          padding: 12px;
          background: none;
          border: 1px solid #334155;
          border-radius: 12px;
          color: #94A3B8;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .show-more-requests-btn:hover { border-color: #E31837; color: #E31837; }
        
        .admin-btn-wrapper { text-align: center; margin-top: 40px; }
        .admin-btn {
          background: linear-gradient(135deg, #E31837, #FF6B6B);
          border: none;
          padding: 15px 35px;
          border-radius: 50px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 16px;
          position: relative;
          overflow: hidden;
        }
        .admin-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        .admin-btn:hover::before { width: 250px; height: 250px; }
        .admin-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 15px 35px rgba(227,24,55,0.4); gap: 16px; }
        
        .btn-ripple {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50px;
          background: rgba(255,255,255,0.2);
          animation: ripple 1.5s ease-out infinite;
          pointer-events: none;
        }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 0; }
        }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

        /* ==================== Responsive ==================== */
        @media (max-width: 1024px) {
          .cars-grid { grid-template-columns: repeat(2, 1fr); }
          .achievements-grid { grid-template-columns: repeat(2, 1fr); }
          .about-two-columns { grid-template-columns: 1fr; gap: 30px; }
          .repair-features-grid { grid-template-columns: repeat(2, 1fr); }
          .modal-grid { grid-template-columns: 1fr; }
          .quick-booking-card-hero { flex-direction: column; text-align: center; }
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 40px; }
          .section-title { font-size: 32px; }
          .cars-grid { grid-template-columns: 1fr; }
          .achievements-grid { grid-template-columns: 1fr; }
          .about-stats-grid { grid-template-columns: 1fr; gap: 20px; }
          .timeline-vertical-line { right: 20px; }
          .timeline-dot { width: 50px; height: 50px; font-size: 18px; }
          .repair-features-grid { grid-template-columns: 1fr; }
          .quick-booking-offer-hero { margin-top: 15px; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 28px; }
          .hero-logo { width: 120px; height: 120px; }
          .section-title { font-size: 24px; }
          .modal-content { padding: 25px; }
        }
      `}</style>
    </>
  );
}