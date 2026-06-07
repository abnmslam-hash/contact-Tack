import React, { useState, useEffect } from "react";
import "./Portfolio.css";

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <HeroSection />
      <AboutMechanicalSection />
      <EngineMaintenanceSection />
      <DiagnosticEquipmentSection />
      <WhyToyotaMechanicalSection />
      <InteractiveDiagnosisSection />
      <StatsSection />
    </div>
  );
}

// ==================== Hero Section ====================
function HeroSection() {
  return (
    <section className="section hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text animate-on-scroll">
            <span className="hero-badge">
              <i className="fas fa-wrench"></i> مركز صيانة تويوتا المعتمد
            </span>
            <h1 className="hero-title">
              صيانة <span className="highlight">تويوتا</span>
              <br />
              <span className="highlight">الميكانيكية</span> المتكاملة
            </h1>
            <p className="hero-desc">
              خبراء الصيانة الميكانيكية لسيارات تويوتا. نقدم خدمات تشخيص وإصلاح المحركات،
              باستخدام أحدث الأجهزة وقطع غيار تويوتا الأصلية.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-number">30+</span>
                <span className="stat-label">فني تويوتا معتمد</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">8K+</span>
                <span className="stat-label">سيارة تويوتا تم صيانتها</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">99%</span>
                <span className="stat-label">رضا العملاء</span>
              </div>
            </div>
          </div>
          <div className="hero-image animate-on-scroll">
            <div className="hero-image-wrapper">
              <div className="hero-placeholder">
                <i className="fas fa-car"></i>
                <h3>صيانة تويوتا</h3>
                <p>خبرة وثقة</p>
              </div>
              <div className="floating-card floating-card-1">
                <i className="fas fa-microscope"></i>
                <span>تشخيص كمبيوتر تويوتا</span>
              </div>
              <div className="floating-card floating-card-2">
                <i className="fas fa-tools"></i>
                <span>قطع غيار تويوتا الأصلية</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== قسم الصيانة الميكانيكية ====================
function AboutMechanicalSection() {
  const services = [
    { icon: "fa-engine", title: "صيانة المحركات", desc: "تشخيص وإصلاح جميع أعطال محركات تويوتا", color: "#E31837" },
    { icon: "fa-microscope", title: "تشخيص كمبيوتر", desc: "فحص شامل بكمبيوتر تويوتا GTS", color: "#3498DB" },
    { icon: "fa-oil-can", title: "تغيير الزيت", desc: "زيت تويوتا الأصلي والفلاتر", color: "#27AE60" },
    { icon: "fa-bolt", title: "النظام الكهربائي", desc: "تشخيص أعطال كهرباء تويوتا", color: "#9B59B6" },
    { icon: "fa-snowflake", title: "نظام التبريد", desc: "صيانة ردياتير ومكيف تويوتا", color: "#1ABC9C" },
    { icon: "fa-microchip", title: "برمجة ECU", desc: "برمجة كمبيوتر المحرك بأحدث الإصدارات", color: "#F39C12" },
  ];

  return (
    <section className="section about-mechanical">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="badge premium">
            <i className="fas fa-microscope"></i> الصيانة الميكانيكية
          </span>
          <h2 className="section-title">خدمات <span className="highlight">صيانة تويوتا</span></h2>
          <div className="divider"></div>
          <p className="section-desc">خدمات ميكانيكية متكاملة لجميع موديلات تويوتا</p>
        </div>

        <div className="mechanical-services-grid">
          {services.map((service, idx) => (
            <div key={idx} className="mechanical-card animate-on-scroll">
              <div className="mechanical-icon" style={{ background: `${service.color}20`, color: service.color }}>
                <i className={`fas ${service.icon}`}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== صيانة المحركات ====================
function EngineMaintenanceSection() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [savedServices, setSavedServices] = useState(() => {
    const saved = localStorage.getItem("toyotaFavorites");
    return saved ? JSON.parse(saved) : {};
  });
  const [selectedMileage, setSelectedMileage] = useState("10000");
  const [activeTab, setActiveTab] = useState("services");
  const [showMileageDetails, setShowMileageDetails] = useState(true);
  const [showDetailsModal, setShowDetailsModal] = useState(null);

  const engineServices = [
    { 
      id: 1, name: "فحص كمبيوتر شامل للمحرك", time: "30 دقيقة", price: "مجاني", icon: "fa-microchip", 
      desc: "فحص شامل لجميع حساسات المحرك", warning: "يكتشف الأعطال قبل حدوثها",
      longDesc: "فحص كمبيوتر شامل باستخدام جهاز تويوتا GTS",
      benefits: ["يكتشف الأعطال المخفية", "يوفر وقت التشخيص", "يمنع تفاقم المشاكل"]
    },
    { 
      id: 2, name: "تغيير زيت المحرك (زيت تويوتا الأصلي)", time: "30 دقيقة", price: "250-350 ر.س", icon: "fa-oil-can", 
      desc: "زيت تويوتا الأصلي 0W-20 / 5W-30", warning: "يُفضل التغيير كل 5000 كم",
      longDesc: "تغيير زيت المحرك باستخدام زيت تويوتا الأصلي",
      benefits: ["يطيل عمر المحرك", "يحسن أداء المحرك", "يقلل استهلاك الوقود"]
    },
    { 
      id: 3, name: "تغيير فلتر الزيت والهواء (أصلي)", time: "20 دقيقة", price: "120-200 ر.س", icon: "fa-filter", 
      desc: "فلتر زيت وفلتر هواء تويوتا الأصلي", warning: "يُغير مع كل تغيير زيت",
      longDesc: "استبدال فلتر الزيت والهواء بقطع تويوتا الأصلية",
      benefits: ["يحمي المحرك من الشوائب", "يحسن كفاءة الاحتراق", "يقلل استهلاك الوقود"]
    },
    { 
      id: 4, name: "تنظيف البخاخات (موجات فوق صوتية)", time: "ساعتين", price: "400-600 ر.س", icon: "fa-tint", 
      desc: "تنظيف عميق للبخاخات", warning: "يحسن أداء المحرك ويوفر الوقود",
      longDesc: "تنظيف البخاخات باستخدام تقنية الموجات فوق الصوتية",
      benefits: ["يحسن رش الوقود", "يزيد قوة المحرك", "يقلل استهلاك الوقود"]
    },
    { 
      id: 5, name: "تغيير بواجي الاحتراق", time: "ساعة", price: "200-400 ر.س", icon: "fa-plug", 
      desc: "بواجي تويوتا الأصلية", warning: "يُغير كل 40,000 كم",
      longDesc: "تركيب بواجي احتراق أصلية من تويوتا",
      benefits: ["اشتعال أفضل", "تسارع أقوى", "اقتصاد في الوقود"]
    },
    { 
      id: 6, name: "فحص طرمبة البنزين", time: "ساعة", price: "فحص مجاني", icon: "fa-gas-pump", 
      desc: "فحص ضغط الوقود وكفاءة الطرمبة", warning: "انخفاض الضغط يؤثر على الأداء",
      longDesc: "فحص شامل لطرمبة البنزين وضغط الوقود",
      benefits: ["تشخيص دقيق", "يمنع توقف المحرك", "يحافظ على الأداء"]
    },
    { 
      id: 7, name: "إصلاح تسريب زيت المحرك", time: "3-6 ساعات", price: "يحدد بعد الفحص", icon: "fa-tint", 
      desc: "فحص وعزل جميع تسريبات الزيت", warning: "التسريب يقلل من عمر المحرك",
      longDesc: "تحديد مصدر تسريب الزيت وإصلاحه",
      benefits: ["يمنع تلف المحرك", "يحافظ على مستوى الزيت", "يطيل عمر المحرك"]
    },
    { 
      id: 8, name: "فحص ضغط المحرك", time: "45 دقيقة", price: "فحص مجاني مع الصيانة", icon: "fa-chart-line", 
      desc: "قياس ضغط الأسطوانات", warning: "يكشف مشاكل البساتم والحلقات",
      longDesc: "اختبار ضغط المحرك لقياس كفاءة كل أسطوانة",
      benefits: ["يكشف الأعطال الداخلية", "يقيم حالة المحرك", "يساعد في التخطيط"]
    },
  ];

  const mileages = [
    { value: "5000", label: "5,000 كم", desc: "فحص أولي", 
      tasks: ["فحص مستوى الزيت", "فحص الفلاتر", "فحص الإطارات", "فحص مستوى السوائل"],
      price: "فحص مجاني", time: "30 دقيقة" },
    { value: "10000", label: "10,000 كم", desc: "صيانة بسيطة", 
      tasks: ["تغيير زيت المحرك", "تغيير فلتر الزيت", "فحص شامل للسيارة", "فحص الفرامل"],
      price: "250-350 ر.س", time: "1 ساعة" },
    { value: "20000", label: "20,000 كم", desc: "صيانة متوسطة", 
      tasks: ["تغيير الزيت والفلاتر", "فحص البواجي", "فحص الفرامل", "تدوير الإطارات", "فحص نظام التبريد"],
      price: "450-600 ر.س", time: "1.5 ساعة" },
    { value: "40000", label: "40,000 كم", desc: "صيانة كبيرة", 
      tasks: ["تغيير جميع الفلاتر", "تغيير بواجي الاحتراق", "فحص البخاخات", "تنظيف نظام الوقود"],
      price: "800-1200 ر.س", time: "2-3 ساعات" },
    { value: "80000", label: "80,000 كم", desc: "صيانة كبرى", 
      tasks: ["تغيير زيت القير", "تغيير سير التوقيت", "فحص طرمبة البنزين", "فحص نظام التبريد"],
      price: "1500-2500 ر.س", time: "4-5 ساعات" },
    { value: "100000", label: "100,000 كم", desc: "صيانة شاملة", 
      tasks: ["فحص شامل للمحرك", "تغيير جميع السوائل", "فحص الشاصي", "صيانة شاملة للقير"],
      price: "2500-4000 ر.س", time: "6-8 ساعات" },
  ];

  const currentMileage = mileages.find(m => m.value === selectedMileage);

  const showMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSave = (serviceId) => {
    const newSaved = { ...savedServices, [serviceId]: !savedServices[serviceId] };
    setSavedServices(newSaved);
    localStorage.setItem("toyotaFavorites", JSON.stringify(newSaved));
    showMessage(!savedServices[serviceId] ? "✅ تم حفظ الخدمة في المفضلة" : "❌ تم إزالة الخدمة من المفضلة", 
                !savedServices[serviceId] ? "success" : "warning");
  };

  const handleShowDetails = (service) => {
    setShowDetailsModal(service);
    document.body.style.overflow = "hidden";
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(null);
    document.body.style.overflow = "auto";
  };

  const getServicesByMileage = () => {
    const km = parseInt(selectedMileage);
    if (km <= 10000) return engineServices.slice(0, 3);
    if (km <= 20000) return engineServices.slice(0, 4);
    if (km <= 40000) return engineServices.slice(0, 5);
    if (km <= 80000) return engineServices.slice(0, 7);
    return engineServices;
  };

  useEffect(() => {
    if (activeTab === "mileage") {
      setShowMileageDetails(false);
      setTimeout(() => setShowMileageDetails(true), 50);
    }
  }, [selectedMileage, activeTab]);

  return (
    <section className="section engine-maintenance-section">
      <div className="container">
        {showToast && (
          <div className={`toast-notification ${toastType}`}>
            <div className="toast-icon">{toastType === "success" ? "✓" : toastType === "warning" ? "⚠️" : "ℹ️"}</div>
            <div className="toast-message">{toastMessage}</div>
          </div>
        )}

        <div className="section-header animate-on-scroll">
          <span className="badge"><i className="fas fa-engine"></i> صيانة المحركات</span>
          <h2 className="section-title">صيانة <span className="highlight">محركات تويوتا</span></h2>
          <div className="divider"></div>
          <p className="section-desc">تشخيص وإصلاح جميع أعطال محركات تويوتا</p>
        </div>

        <div className="maintenance-tabs animate-on-scroll">
          <button className={`tab-btn ${activeTab === "services" ? "active" : ""}`} onClick={() => setActiveTab("services")}>
            <i className="fas fa-tools"></i><span>جميع الخدمات</span>
          </button>
          <button className={`tab-btn ${activeTab === "mileage" ? "active" : ""}`} onClick={() => setActiveTab("mileage")}>
            <i className="fas fa-tachometer-alt"></i><span>حسب المسافة</span>
          </button>
          <button className={`tab-btn ${activeTab === "saved" ? "active" : ""}`} onClick={() => setActiveTab("saved")}>
            <i className="fas fa-heart"></i><span>المفضلة</span>
            {Object.values(savedServices).filter(v => v === true).length > 0 && (
              <span className="saved-count">{Object.values(savedServices).filter(v => v === true).length}</span>
            )}
          </button>
        </div>

        {activeTab === "mileage" && (
          <div className="mileage-section">
            <div className="mileage-header-enhanced">
              <div className="mileage-title-enhanced">
                <i className="fas fa-tachometer-alt"></i>
                <span>اختر المسافة المقطوعة لسيارتك</span>
              </div>
            </div>

            <div className="mileage-buttons-grid">
              {mileages.map((mileage) => (
                <button
                  key={mileage.value}
                  className={`mileage-btn-enhanced ${selectedMileage === mileage.value ? "active" : ""}`}
                  onClick={() => setSelectedMileage(mileage.value)}
                >
                  <div className="mileage-btn-content">
                    <span className="mileage-value">{mileage.label}</span>
                    <span className="mileage-desc">{mileage.desc}</span>
                    <span className="mileage-price">{mileage.price}</span>
                  </div>
                  {selectedMileage === mileage.value && <div className="mileage-check-mark"><i className="fas fa-check"></i></div>}
                </button>
              ))}
            </div>

            {currentMileage && (
              <div className={`mileage-tasks-panel ${showMileageDetails ? "show" : ""}`}>
                <div className="panel-header">
                  <i className="fas fa-clipboard-list"></i>
                  <h3>مهام صيانة {currentMileage.label}</h3>
                </div>
                <div className="panel-content">
                  <div className="tasks-list">
                    <h4><i className="fas fa-tasks"></i> المهام المطلوبة:</h4>
                    <ul>
                      {currentMileage.tasks.map((task, idx) => (
                        <li key={idx}><i className="fas fa-check-circle"></i> {task}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="info-summary">
                    <div className="info-item-summary">
                      <i className="fas fa-clock"></i>
                      <span>الوقت المتوقع: <strong>{currentMileage.time}</strong></span>
                    </div>
                    <div className="info-item-summary">
                      <i className="fas fa-tag"></i>
                      <span>التكلفة: <strong>{currentMileage.price}</strong></span>
                    </div>
                    <div className="info-item-summary">
                      <i className="fas fa-road"></i>
                      <span>الصيانة القادمة: <strong>{parseInt(selectedMileage) + 10000} كم</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="engine-services-grid">
          {(activeTab === "services" ? engineServices : activeTab === "mileage" ? getServicesByMileage() : []).map((service, idx) => (
            <div key={service.id} className="engine-service-card animate-on-scroll">
              <div className="card-glow-effect"></div>
              <div className="card-header">
                <div className="service-icon-wrapper">
                  <div className="service-icon-ring"></div>
                  <div className="service-icon"><i className={`fas ${service.icon}`}></i></div>
                </div>
                <button className={`favorite-btn ${savedServices[service.id] ? "saved" : ""}`} onClick={() => handleSave(service.id)}>
                  <i className="fas fa-heart"></i>
                </button>
              </div>
              <h3 className="service-name">{service.name}</h3>
              <div className="service-meta">
                <span className="meta-item"><i className="far fa-clock"></i>{service.time}</span>
                <span className="meta-item"><i className="fas fa-tag"></i>{service.price}</span>
              </div>
              <p className="service-desc">{service.desc}</p>
              <div className="service-warning"><i className="fas fa-exclamation-triangle"></i><span>{service.warning}</span></div>
              <div className="service-actions">
                <button className="details-btn" onClick={() => handleShowDetails(service)}><i className="fas fa-info-circle"></i>عرض التفاصيل</button>
              </div>
              <div className="service-progress"><div className="progress-bar" style={{ width: "75%" }}></div></div>
            </div>
          ))}
        </div>

        {activeTab === "saved" && (
          <div className="saved-services-container">
            {Object.keys(savedServices).filter(id => savedServices[id] === true).length > 0 ? (
              <div className="saved-services-grid">
                {engineServices.filter(s => savedServices[s.id]).map((service) => (
                  <div key={service.id} className="saved-service-card">
                    <div className="saved-icon"><i className={`fas ${service.icon}`}></i></div>
                    <div className="saved-info"><h4>{service.name}</h4><p>{service.time} • {service.price}</p></div>
                    <button className="remove-saved" onClick={() => handleSave(service.id)}><i className="fas fa-trash-alt"></i></button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-saved"><i className="fas fa-heart-broken"></i><h3>لا توجد خدمات محفوظة</h3><p>أضف خدماتك المفضلة بالنقر على أيقونة القلب ❤️</p></div>
            )}
          </div>
        )}

        {showDetailsModal && (
          <div className="modal-overlay" onClick={closeDetailsModal}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeDetailsModal}><i className="fas fa-times"></i></button>
              <div className="modal-icon"><i className={`fas ${showDetailsModal.icon}`}></i></div>
              <h2>{showDetailsModal.name}</h2>
              <div className="modal-info">
                <div className="info-row"><i className="far fa-clock"></i><span>الوقت: <strong>{showDetailsModal.time}</strong></span></div>
                <div className="info-row"><i className="fas fa-tag"></i><span>السعر: <strong>{showDetailsModal.price}</strong></span></div>
              </div>
              <div className="modal-desc"><h4><i className="fas fa-info-circle"></i> الوصف</h4><p>{showDetailsModal.longDesc}</p></div>
              <div className="modal-benefits"><h4><i className="fas fa-star"></i> الفوائد</h4><div className="benefits-chips">{showDetailsModal.benefits.map((b, i) => (<span key={i} className="benefit-chip">{b}</span>))}</div></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ==================== سكشن أجهزة التشخيص ====================
function DiagnosticEquipmentSection() {
  const equipment = [
    { icon: "fa-microchip", title: "جهاز GTS (Toyota)", desc: "جهاز تشخيص كمبيوتر متخصص لتويوتا", color: "#E31837" },
    { icon: "fa-laptop-code", title: "برمجة ECU", desc: "برمجة كمبيوتر المحرك بأحدث الإصدارات", color: "#3498DB" },
    { icon: "fa-chart-line", title: "جهاز تحليل أداء المحرك", desc: "قياس أداء المحرك وكفاءة الاحتراق", color: "#27AE60" },
    { icon: "fa-microphone-alt", title: "جهاز فحص الحساسات", desc: "اختبار حساسات الأكسجين والحرارة", color: "#F39C12" },
    { icon: "fa-tachometer-alt", title: "جهاز فحص ضغط المحرك", desc: "قياس ضغط الأسطوانات", color: "#9B59B6" },
    { icon: "fa-snowflake", title: "جهاز فحص المكيف", desc: "فحص كفاءة المكيف", color: "#1ABC9C" },
  ];

  return (
    <section className="section equipment-section">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="badge"><i className="fas fa-microscope"></i> أحدث التقنيات</span>
          <h2 className="section-title">معدات <span className="highlight">تشخيص تويوتا</span></h2>
          <div className="divider"></div>
          <p className="section-desc">نستخدم أحدث أجهزة تشخيص تويوتا العالمية</p>
        </div>
        <div className="equipment-grid">
          {equipment.map((item, idx) => (
            <div key={idx} className="equipment-card animate-on-scroll">
              <div className="equipment-icon" style={{ background: `${item.color}20`, color: item.color }}><i className={`fas ${item.icon}`}></i></div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="equipment-badge" style={{ background: item.color }}>متوفر</div>
            </div>
          ))}
        </div>
        <div className="equipment-note"><i className="fas fa-certificate"></i><span>جميع أجهزتنا معتمدة من تويوتا موتور اليابانية</span></div>
      </div>
    </section>
  );
}

// ==================== السكشن التفاعلي للتشخيص ====================
function InteractiveDiagnosisSection() {
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [customModel, setCustomModel] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorType, setErrorType] = useState("");

  const toyotaModelsList = [
    "كامري", "كورولا", "راف 4", "لاندكروزر", "هايلوكس", "برادو", "يارس", "شانون", "تندرا", "هايلاندر",
    "افالون", "سيكويا", "تاكوما", "فينزا", "ميراي", "سوبرا", "GR86", "سيينا", "تسيلكا", "ماتريكس"
  ];

  const years = Array.from({ length: 25 }, (_, i) => 2024 - i);

  const symptoms = [
    { id: 1, name: "صوت غير طبيعي في المحرك", icon: "fa-volume-up" },
    { id: 2, name: "اهتزاز في المحرك", icon: "fa-vibrate" },
    { id: 3, name: "زيادة استهلاك الوقود", icon: "fa-gas-pump" },
    { id: 4, name: "ضعف في أداء المحرك", icon: "fa-tachometer-alt-slash" },
    { id: 5, name: "دخان من العادم", icon: "fa-smog" },
    { id: 6, name: "ضوء فحص المحرك", icon: "fa-exclamation-triangle" },
    { id: 7, name: "ارتفاع حرارة المحرك", icon: "fa-temperature-high" },
    { id: 8, name: "صعوبة في تشغيل المحرك", icon: "fa-car-battery" },
    { id: 9, name: "رائحة كريهة داخل السيارة", icon: "fa-wind" }
  ];

  const isToyotaModel = (model) => {
    if (!model) return false;
    const modelLower = model.toLowerCase();
    return toyotaModelsList.some(toyotaModel => 
      modelLower.includes(toyotaModel.toLowerCase())
    );
  };

  const showErrorMessage = (message, type = "error") => {
    setErrorMessage(message);
    setErrorType(type);
    setShowError(true);
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(200);
    }
    setTimeout(() => {
      setShowError(false);
      setErrorType("");
    }, 5000);
  };

  const validateInputs = () => {
    // التحقق من اختيار الأعراض
    if (selectedSymptoms.length === 0) {
      showErrorMessage("❌ لم تختر أي عرض! الرجاء اختيار الأعراض التي تعاني منها سيارتك", "warning");
      return false;
    }

    // التحقق من الموديل
    const enteredModel = customModel || carModel;
    if (!enteredModel) {
      showErrorMessage("❌ موديل السيارة مطلوب! الرجاء إدخال موديل سيارتك من القائمة أو كتابته يدوياً", "warning");
      return false;
    }

    // التحقق من أن الموديل من تويوتا
    if (!isToyotaModel(enteredModel)) {
      showErrorMessage("⚠️ عذراً! هذا المركز متخصص فقط في صيانة سيارات تويوتا.\nالرجاء التأكد من إدخال موديل تويوتا صحيح (مثال: كامري، كورولا، راف 4، لاندكروزر، هايلوكس)", "error");
      return false;
    }

    // التحقق من سنة الصنع
    if (!carYear) {
      showErrorMessage("❌ سنة الصنع مطلوبة! الرجاء اختيار سنة صنع سيارتك من القائمة", "warning");
      return false;
    }

    return true;
  };

  const handleSymptomToggle = (symptomId) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    }
  };

  const startDiagnosis = () => {
    if (!validateInputs()) return;

    setIsDiagnosing(true);
    setTimeout(() => {
      let diagnosis = {
        severity: "medium",
        message: "",
        recommendations: [],
        urgent: false,
        possibleCauses: []
      };

      selectedSymptoms.forEach(symptomId => {
        const symptom = symptoms.find(s => s.id === symptomId);
        if (symptom.name === "صوت غير طبيعي في المحرك") {
          diagnosis.severity = "high";
          diagnosis.message = "يوجد مشكلة محتملة في المحرك تحتاج لفحص فوري";
          diagnosis.recommendations.push("فحص مستوى الزيت", "فحص البواجي", "فحص سير المحرك");
          diagnosis.possibleCauses.push("نقص زيت المحرك", "تلف في البواجي");
          diagnosis.urgent = true;
        }
        if (symptom.name === "دخان من العادم") {
          diagnosis.severity = "critical";
          diagnosis.message = "تحذير! يوجد مشكلة خطيرة في المحرك";
          diagnosis.recommendations.push("فحص حشوة الرأس", "فحص حلقات المكبس");
          diagnosis.possibleCauses.push("تلف حشوة الرأس", "تآكل حلقات المكبس");
          diagnosis.urgent = true;
        }
        if (symptom.name === "ارتفاع حرارة المحرك") {
          diagnosis.severity = "critical";
          diagnosis.message = "تحذير! حرارة المحرك مرتفعة";
          diagnosis.recommendations.push("إيقاف السيارة فوراً", "فحص مستوى المبرد");
          diagnosis.possibleCauses.push("نقص مبرد المحرك", "تلف الترمستات");
          diagnosis.urgent = true;
        }
        if (symptom.name === "اهتزاز في المحرك") {
          diagnosis.recommendations.push("فحص كراسي المحرك", "فحص نظام الإشعال");
          diagnosis.possibleCauses.push("تلف كراسي المحرك", "مشكلة في البواجي");
        }
        if (symptom.name === "زيادة استهلاك الوقود") {
          diagnosis.recommendations.push("تنظيف البخاخات", "فحص حساس الأكسجين");
          diagnosis.possibleCauses.push("بخاخات متسخة", "حساس أكسجين تالف");
        }
        if (symptom.name === "ضعف في أداء المحرك") {
          diagnosis.recommendations.push("فحص فلتر الهواء", "فحص طرمبة البنزين");
          diagnosis.possibleCauses.push("فلتر هواء مسدود", "طرمبة بنزين ضعيفة");
        }
        if (symptom.name === "صعوبة في تشغيل المحرك") {
          diagnosis.recommendations.push("فحص البطارية", "فحص بادئ الحركة");
          diagnosis.possibleCauses.push("بطارية ضعيفة", "بادئ حركة تالف");
          diagnosis.urgent = true;
        }
      });

      if (diagnosis.message === "") {
        diagnosis.message = `بناءً على الأعراض المدخلة، يفضل إجراء فحص شامل للمحرك`;
        diagnosis.severity = "low";
        diagnosis.recommendations.push("فحص كمبيوتر شامل", "فحص دوري للمحرك");
        diagnosis.possibleCauses.push("أعطال محتملة تحتاج فحص كمبيوتر");
      }

      setDiagnosisResult(diagnosis);
      setIsDiagnosing(false);
    }, 2000);
  };

  const resetDiagnosis = () => {
    setSelectedSymptoms([]);
    setDiagnosisResult(null);
    setCarModel("");
    setCustomModel("");
    setCarYear("");
  };

  const clearAllSymptoms = () => {
    if (selectedSymptoms.length > 0) {
      setSelectedSymptoms([]);
    }
  };

  return (
    <section className="section interactive-diagnosis-section">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="badge premium"><i className="fas fa-stethoscope"></i> التشخيص الذكي</span>
          <h2 className="section-title">شخص <span className="highlight">مشكلة سيارتك</span> بنفسك</h2>
          <div className="divider"></div>
          <p className="section-desc">أجب على الأسئلة التالية وسنساعدك في تحديد المشكلة المحتملة في سيارتك تويوتا</p>
        </div>

        <div className="diagnosis-wrapper animate-on-scroll">
          {showError && (
            <div className={`error-banner ${errorType}`}>
              <div className="error-icon">
                {errorType === "error" && <i className="fas fa-times-circle"></i>}
                {errorType === "warning" && <i className="fas fa-exclamation-triangle"></i>}
                {errorType === "info" && <i className="fas fa-info-circle"></i>}
              </div>
              <div className="error-content">
                <span className="error-title">
                  {errorType === "error" && "خطأ!"}
                  {errorType === "warning" && "تنبيه!"}
                  {errorType === "info" && "معلومة"}
                </span>
                <p>{errorMessage}</p>
              </div>
              <button className="error-close" onClick={() => setShowError(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          )}

          {!diagnosisResult ? (
            <>
              <div className="car-info-section">
                <div className="info-card">
                  <div className="card-icon"><i className="fas fa-car"></i></div>
                  <div className="card-content">
                    <h3>معلومات سيارتك</h3>
                    <div className="input-row">
                      <div className="model-input-group">
                        <select value={carModel} onChange={(e) => { setCarModel(e.target.value); setCustomModel(""); }} className="model-select">
                          <option value="">اختر موديل السيارة</option>
                          {toyotaModelsList.map((model, idx) => (
                            <option key={idx} value={model}>{model}</option>
                          ))}
                        </select>
                        <span className="or-divider">أو</span>
                        <input 
                          type="text" 
                          placeholder="أدخل الموديل يدوياً (مثال: كامري، كورولا، راف 4)" 
                          value={customModel} 
                          onChange={(e) => { setCustomModel(e.target.value); setCarModel(""); }} 
                          className="model-input" 
                        />
                      </div>
                      <select value={carYear} onChange={(e) => setCarYear(e.target.value)} className="year-select" style={{ color: carYear ? "white" : "rgba(255,255,255,0.5)" }}>
                        <option value="">اختر السنة</option>
                        {years.map(year => (<option key={year} value={year}>{year}</option>))}
                      </select>
                    </div>
                    <p className="toyota-note"><i className="fas fa-info-circle"></i> هذا المركز متخصص في صيانة سيارات تويوتا فقط</p>
                  </div>
                </div>
              </div>

              <div className="symptoms-section">
                <h3 className="section-subtitle">
                  <i className="fas fa-list-ul"></i> اختر الأعراض
                  <span className="symptoms-count">({selectedSymptoms.length} / {symptoms.length})</span>
                  {selectedSymptoms.length > 0 && (
                    <button className="clear-symptoms-btn" onClick={clearAllSymptoms}>
                      <i className="fas fa-trash-alt"></i> مسح الكل
                    </button>
                  )}
                </h3>
                <div className="symptoms-grid">
                  {symptoms.map((symptom) => (
                    <div key={symptom.id} className={`symptom-card ${selectedSymptoms.includes(symptom.id) ? "selected" : ""}`} onClick={() => handleSymptomToggle(symptom.id)}>
                      <div className="symptom-icon"><i className={`fas ${symptom.icon}`}></i></div>
                      <div className="symptom-info"><h4>{symptom.name}</h4></div>
                      {selectedSymptoms.includes(symptom.id) && (<div className="selected-check"><i className="fas fa-check-circle"></i></div>)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="diagnosis-actions">
                <button className="diagnose-btn" onClick={startDiagnosis} disabled={isDiagnosing}>
                  {isDiagnosing ? (<><div className="spinner"></div>جاري التشخيص...</>) : (<><i className="fas fa-microscope"></i>ابدأ التشخيص</>)}
                </button>
              </div>
            </>
          ) : (
            <div className={`diagnosis-result ${diagnosisResult.severity}`}>
              <div className="result-header">
                <div className="result-icon">
                  {diagnosisResult.severity === "critical" && <i className="fas fa-skull-crosswalk"></i>}
                  {diagnosisResult.severity === "high" && <i className="fas fa-exclamation-triangle"></i>}
                  {diagnosisResult.severity === "medium" && <i className="fas fa-clock"></i>}
                  {diagnosisResult.severity === "low" && <i className="fas fa-smile-wink"></i>}
                </div>
                <div className="result-content"><h3>نتيجة التشخيص</h3><p>{diagnosisResult.message}</p></div>
              </div>
              {diagnosisResult.urgent && (<div className="urgent-warning"><i className="fas fa-bell"></i><span>تحذير! المشكلة تتطلب تدخلاً عاجلاً</span></div>)}
              <div className="possible-causes"><h4><i className="fas fa-question-circle"></i> الأسباب المحتملة</h4><div className="causes-list">{diagnosisResult.possibleCauses.map((cause, idx) => (<span key={idx} className="cause-chip">{cause}</span>))}</div></div>
              <div className="recommendations"><h4><i className="fas fa-lightbulb"></i> التوصيات المقترحة</h4><ul>{diagnosisResult.recommendations.map((rec, idx) => (<li key={idx}><i className="fas fa-check"></i><span>{rec}</span></li>))}</ul></div>
              <button className="new-diagnosis-btn" onClick={resetDiagnosis}><i className="fas fa-redo-alt"></i>تشخيص جديد</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ==================== لماذا تويوتا ====================
function WhyToyotaMechanicalSection() {
  const reasons = [
    { icon: "fa-microscope", title: "تشخيص دقيق", desc: "أجهزة كمبيوتر متخصصة لتشخيص أعطال تويوتا" },
    { icon: "fa-certificate", title: "قطع غيار أصلية", desc: "قطع غيار تويوتا الأصلية 100% مع ضمان" },
    { icon: "fa-user-tie", title: "فنيين معتمدين", desc: "فنيين مدربين في مراكز تويوتا العالمية" },
    { icon: "fa-shield-alt", title: "ضمان على الخدمة", desc: "ضمان شامل على جميع خدمات الصيانة" },
    { icon: "fa-chart-line", title: "فحص شامل", desc: "تقرير مفصل بحالة سيارتك" },
    { icon: "fa-trophy", title: "خبرة طويلة", desc: "أكثر من 15 سنة في صيانة تويوتا" },
  ];

  return (
    <section className="section why-toyota-mechanical">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="badge white">لماذا تختارنا</span>
          <h2 className="section-title white">خدمات <span className="highlight">صيانة تويوتا</span> المتميزة</h2>
          <div className="divider white"></div>
          <p className="section-desc white">نقدم أفضل خدمات الصيانة الميكانيكية لسيارات تويوتا</p>
        </div>
        <div className="reasons-grid-mechanical">
          {reasons.map((reason, idx) => (
            <div key={idx} className="reason-mechanical-card animate-on-scroll">
              <div className="reason-mechanical-icon"><i className={`fas ${reason.icon}`}></i></div>
              <h3>{reason.title}</h3>
              <p>{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== إحصائيات ====================
function StatsSection() {
  const stats = [
    { icon: "fa-car", number: "30+", label: "موديل تويوتا" },
    { icon: "fa-user-check", number: "8,000+", label: "سيارة تم صيانتها" },
    { icon: "fa-star", number: "99%", label: "رضا العملاء" },
    { icon: "fa-calendar", number: "15+", label: "سنوات خبرة" },
    { icon: "fa-microscope", number: "10+", label: "جهاز تشخيص" },
    { icon: "fa-certificate", number: "100%", label: "قطع أصلية" },
  ];

  return (
    <section className="section stats-mechanical-section">
      <div className="container">
        <div className="stats-mechanical-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-mechanical-card animate-on-scroll">
              <div className="stat-mechanical-icon"><i className={`fas ${stat.icon}`}></i></div>
              <div className="stat-mechanical-number">{stat.number}</div>
              <div className="stat-mechanical-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}