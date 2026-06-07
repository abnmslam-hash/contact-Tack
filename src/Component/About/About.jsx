import React, { useState, useEffect } from "react";
import "./About.css";

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
      <MaintenanceScheduleSection />
      <MaintenanceCheckerSection />
      <OilLevelCheckerSection />
      <MaintenanceTipsSection />
      <NewServiceSection />
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
              <i className="fas fa-calendar-alt"></i> الصيانة الدورية المعتمدة
            </span>
            <h1 className="hero-title">
              جدول <span className="highlight">صيانة تويوتا</span>
              <br />
              <span className="highlight">الدورية</span> الشاملة
            </h1>
            <p className="hero-desc">
              خطة الصيانة الدورية المعتمدة من شركة تويوتا موتور اليابانية.
              حافظ على أداء سيارتك وسلامتك باتباع جدول الصيانة الموصى به.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-number">12+</span>
                <span className="stat-label">نقطة فحص دوري</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">100K+</span>
                <span className="stat-label">سيارة تم صيانتها</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">قطع غيار أصلية</span>
              </div>
            </div>
          </div>
          <div className="hero-image animate-on-scroll">
            <div className="hero-image-wrapper">
              <div className="hero-placeholder">
                <i className="fas fa-tools"></i>
                <h3>صيانة تويوتا الدورية</h3>
                <p>احجز موعد صيانتك القادمة</p>
              </div>
              <div className="floating-card floating-card-1">
                <i className="fas fa-microscope"></i>
                <span>فحص 50 نقطة أمان</span>
              </div>
              <div className="floating-card floating-card-2">
                <i className="fas fa-certificate"></i>
                <span>معتمدة من تويوتا</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== جدول الصيانة الدورية ====================
function MaintenanceScheduleSection() {
  const [selectedModel, setSelectedModel] = useState("all");
  const [selectedMileage, setSelectedMileage] = useState(null);
  const [showServices, setShowServices] = useState(false);
  const [savedServices, setSavedServices] = useState({});
  const [selectedService, setSelectedService] = useState(null);
  const [animateServices, setAnimateServices] = useState(false);

  const models = [
    { id: "all", name: "جميع الموديلات", icon: "fa-th-large", color: "#E31837" },
    { id: "corolla", name: "كورولا", icon: "fa-car", color: "#3498DB" },
    { id: "camry", name: "كامري", icon: "fa-car-side", color: "#27AE60" },
    { id: "landcruiser", name: "لاندكروزر", icon: "fa-truck", color: "#F39C12" },
    { id: "hilux", name: "هايلوكس", icon: "fa-truck-pickup", color: "#9B59B6" },
    { id: "rav4", name: "راف 4", icon: "fa-caravan", color: "#1ABC9C" },
    { id: "prado", name: "برادو", icon: "fa-truck", color: "#E67E22" },
  ];

  const mileages = [
    { value: "5000", label: "5,000 كم", icon: "fa-road", desc: "الفحص الأولي", color: "#27AE60", level: "أساسي" },
    { value: "10000", label: "10,000 كم", icon: "fa-road", desc: "صيانة بسيطة", color: "#3498DB", level: "أساسي" },
    { value: "20000", label: "20,000 كم", icon: "fa-chart-line", desc: "صيانة متوسطة", color: "#F39C12", level: "متوسط" },
    { value: "40000", label: "40,000 كم", icon: "fa-chart-line", desc: "صيانة كبيرة", color: "#E67E22", level: "متقدم" },
    { value: "80000", label: "80,000 كم", icon: "fa-tachometer-alt", desc: "صيانة كبرى", color: "#9B59B6", level: "متقدم" },
    { value: "100000", label: "100,000 كم", icon: "fa-trophy", desc: "صيانة شاملة", color: "#E31837", level: "شامل" },
  ];

  const maintenanceData = {
    all: {
      5000: [
        { id: 1, name: "تغيير زيت المحرك", part: "زيت تويوتا الأصلي", time: "30 دقيقة", importance: "إلزامي", category: "المحرك" },
        { id: 2, name: "تغيير فلتر الزيت", part: "فلتر زيت تويوتا", time: "15 دقيقة", importance: "إلزامي", category: "المحرك" },
        { id: 3, name: "فحص مستوى السوائل", part: "جميع السوائل", time: "10 دقائق", importance: "مهم", category: "فحص عام" },
        { id: 4, name: "فحص ضغط الإطارات", part: "-", time: "10 دقائق", importance: "مهم", category: "العجلات" },
      ],
      10000: [
        { id: 1, name: "تغيير زيت المحرك", part: "زيت تويوتا الأصلي", time: "30 دقيقة", importance: "إلزامي", category: "المحرك" },
        { id: 2, name: "تغيير فلتر الزيت", part: "فلتر زيت تويوتا", time: "15 دقيقة", importance: "إلزامي", category: "المحرك" },
        { id: 3, name: "تبديل أماكن الإطارات", part: "-", time: "20 دقيقة", importance: "مهم", category: "العجلات" },
        { id: 4, name: "فحص فلتر الهواء", part: "فلتر هواء تويوتا", time: "10 دقائق", importance: "مهم", category: "المحرك" },
        { id: 5, name: "فحص الفرامل", part: "تيل فرامل", time: "20 دقيقة", importance: "هام جداً", category: "الفرامل" },
      ],
      20000: [
        { id: 1, name: "تغيير زيت المحرك", part: "زيت تويوتا الأصلي", time: "30 دقيقة", importance: "إلزامي", category: "المحرك" },
        { id: 2, name: "تغيير فلتر الزيت", part: "فلتر زيت تويوتا", time: "15 دقيقة", importance: "إلزامي", category: "المحرك" },
        { id: 3, name: "تغيير فلتر الهواء", part: "فلتر هواء تويوتا", time: "15 دقيقة", importance: "مهم", category: "المحرك" },
        { id: 4, name: "تبديل الإطارات", part: "-", time: "20 دقيقة", importance: "مهم", category: "العجلات" },
        { id: 5, name: "فحص البواجي", part: "بواجي", time: "20 دقيقة", importance: "مهم", category: "المحرك" },
        { id: 6, name: "تنظيف البخاخات", part: "-", time: "ساعة", importance: "موصى به", category: "الوقود" },
      ],
      40000: [
        { id: 1, name: "تغيير زيت المحرك", part: "زيت تويوتا الأصلي", time: "30 دقيقة", importance: "إلزامي", category: "المحرك" },
        { id: 2, name: "تغيير فلتر الزيت", part: "فلتر زيت تويوتا", time: "15 دقيقة", importance: "إلزامي", category: "المحرك" },
        { id: 3, name: "تغيير زيت القير", part: "زيت قير تويوتا", time: "ساعة", importance: "إلزامي", category: "القير" },
        { id: 4, name: "تغيير فلتر القير", part: "فلتر قير تويوتا", time: "30 دقيقة", importance: "مهم", category: "القير" },
        { id: 5, name: "تغيير البواجي", part: "بواجي تويوتا", time: "ساعة", importance: "إلزامي", category: "المحرك" },
        { id: 6, name: "فحص نظام التبريد", part: "-", time: "20 دقيقة", importance: "مهم", category: "التبريد" },
      ],
      80000: [
        { id: 1, name: "تغيير زيت المحرك", part: "زيت تويوتا الأصلي", time: "30 دقيقة", importance: "إلزامي", category: "المحرك" },
        { id: 2, name: "تغيير فلتر الزيت", part: "فلتر زيت تويوتا", time: "15 دقيقة", importance: "إلزامي", category: "المحرك" },
        { id: 3, name: "تغيير سائل التبريد", part: "سائل تبريد تويوتا", time: "45 دقيقة", importance: "مهم", category: "التبريد" },
        { id: 4, name: "تغيير سائل الفرامل", part: "زيت فرامل تويوتا", time: "30 دقيقة", importance: "هام جداً", category: "الفرامل" },
        { id: 5, name: "فحص طرمبة البنزين", part: "-", time: "20 دقيقة", importance: "مهم", category: "الوقود" },
        { id: 6, name: "فحص الأحزمة", part: "سير المروحة", time: "15 دقيقة", importance: "مهم", category: "المحرك" },
      ],
      100000: [
        { id: 1, name: "تغيير زيت المحرك", part: "زيت تويوتا الأصلي", time: "30 دقيقة", importance: "إلزامي", category: "المحرك" },
        { id: 2, name: "تغيير فلتر الزيت", part: "فلتر زيت تويوتا", time: "15 دقيقة", importance: "إلزامي", category: "المحرك" },
        { id: 3, name: "تغيير سير التوقيت", part: "سير توقيت تويوتا", time: "3 ساعات", importance: "إلزامي", category: "المحرك" },
        { id: 4, name: "تغيير مضخة الماء", part: "مضخة ماء تويوتا", time: "ساعتين", importance: "موصى به", category: "التبريد" },
        { id: 5, name: "فحص شامل 50 نقطة", part: "-", time: "ساعة", importance: "مهم", category: "فحص عام" },
        { id: 6, name: "فحص نظام العادم", part: "-", time: "20 دقيقة", importance: "مهم", category: "العادم" },
        { id: 7, name: "فحص نظام التعليق", part: "مساعدين - جنازير", time: "30 دقيقة", importance: "مهم", category: "العفشة" },
      ],
    },
    corolla: {
      40000: [
        { id: 1, name: "تغيير زيت المحرك", part: "زيت تويوتا 0W-20", time: "30 دقيقة", importance: "إلزامي", category: "المحرك" },
        { id: 2, name: "تغيير فلتر الزيت", part: "فلتر زيت تويوتا", time: "15 دقيقة", importance: "إلزامي", category: "المحرك" },
        { id: 3, name: "تغيير زيت القير CVT", part: "زيت قير تويوتا CVT", time: "ساعة", importance: "إلزامي", category: "القير" },
        { id: 4, name: "تغيير البواجي", part: "بواجي تويوتا (4 قطع)", time: "ساعة", importance: "إلزامي", category: "المحرك" },
      ],
    },
    camry: {
      40000: [
        { id: 1, name: "تغيير زيت المحرك", part: "زيت تويوتا 5W-30", time: "30 دقيقة", importance: "إلزامي", category: "المحرك" },
        { id: 2, name: "تغيير فلتر الزيت", part: "فلتر زيت تويوتا", time: "15 دقيقة", importance: "إلزامي", category: "المحرك" },
        { id: 3, name: "تغيير زيت القير", part: "زيت قير تويوتا", time: "ساعة", importance: "إلزامي", category: "القير" },
        { id: 4, name: "تغيير البواجي", part: "بواجي تويوتا (6 قطع)", time: "1.5 ساعة", importance: "إلزامي", category: "المحرك" },
      ],
    },
    landcruiser: {
      10000: [
        { id: 1, name: "تغيير زيت المحرك", part: "زيت تويوتا 5W-40", time: "30 دقيقة", importance: "إلزامي", category: "المحرك" },
        { id: 2, name: "تغيير فلتر الزيت", part: "فلتر زيت تويوتا", time: "15 دقيقة", importance: "إلزامي", category: "المحرك" },
        { id: 3, name: "تغيير فلتر الهواء", part: "فلتر هواء تويوتا", time: "15 دقيقة", importance: "مهم", category: "المحرك" },
        { id: 4, name: "تبديل الإطارات", part: "-", time: "25 دقيقة", importance: "مهم", category: "العجلات" },
        { id: 5, name: "فحص نظام الدفع الرباعي", part: "-", time: "20 دقيقة", importance: "مهم", category: "العفشة" },
      ],
    },
  };

  const handleMileageClick = (mileage) => {
    setSelectedMileage(mileage);
    setShowServices(true);
    setAnimateServices(true);
    setTimeout(() => setAnimateServices(false), 500);
  };

  const getCurrentServices = () => {
    if (!selectedMileage) return [];
    const modelData = maintenanceData[selectedModel];
    if (modelData && modelData[selectedMileage.value]) {
      return modelData[selectedMileage.value];
    }
    return maintenanceData.all[selectedMileage?.value] || [];
  };

  const currentServices = getCurrentServices();
  const currentMileage = selectedMileage;

  const handleSave = (serviceId) => {
    setSavedServices(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = "auto";
  };

  const servicesByCategory = currentServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {});

  return (
    <section className="section maintenance-schedule-section">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="badge">
            <i className="fas fa-calendar-check"></i> خطة الصيانة المعتمدة
          </span>
          <h2 className="section-title">جدول <span className="highlight">الصيانة الدورية</span></h2>
          <div className="divider"></div>
          <p className="section-desc">اختر المسافة المقطوعة لعرض خدمات الصيانة الموصى بها</p>
        </div>

        <div className="model-filter animate-on-scroll">
          <div className="filter-title">
            <i className="fas fa-car"></i>
            <span>اختر موديل سيارتك</span>
          </div>
          <div className="filter-buttons">
            {models.map((model) => (
              <button
                key={model.id}
                className={`model-btn ${selectedModel === model.id ? "active" : ""}`}
                onClick={() => setSelectedModel(model.id)}
                style={{
                  borderColor: selectedModel === model.id ? model.color : "rgba(255,255,255,0.2)",
                  background: selectedModel === model.id ? `${model.color}15` : "transparent"
                }}
              >
                <i className={`fas ${model.icon}`} style={{ color: model.color }}></i>
                <span>{model.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mileage-filter animate-on-scroll">
          <div className="filter-title">
            <i className="fas fa-tachometer-alt"></i>
            <span>اختر المسافة المقطوعة لعرض خدمات الصيانة</span>
          </div>
          <div className="mileage-buttons">
            {mileages.map((mileage) => (
              <button
                key={mileage.value}
                className={`mileage-btn ${selectedMileage?.value === mileage.value ? "active" : ""}`}
                onClick={() => handleMileageClick(mileage)}
              >
                <div className="mileage-icon" style={{ background: `${mileage.color}20`, color: mileage.color }}>
                  <i className={`fas ${mileage.icon}`}></i>
                </div>
                <div className="mileage-info">
                  <span className="mileage-value">{mileage.label}</span>
                  <span className="mileage-desc">{mileage.desc}</span>
                </div>
                <div className="mileage-level" style={{ background: mileage.color }}>
                  {mileage.level}
                </div>
              </button>
            ))}
          </div>
        </div>

        {showServices && currentServices.length > 0 && (
          <div className={`services-container ${animateServices ? "animate-services" : ""}`}>
            <div className="current-mileage-banner">
              <div className="banner-content">
                <div className="banner-icon" style={{ background: `${currentMileage?.color}20` }}>
                  <i className={`fas ${currentMileage?.icon}`} style={{ color: currentMileage?.color }}></i>
                </div>
                <div className="banner-text">
                  <h3>صيانة {currentMileage?.label}</h3>
                  <p>{currentMileage?.desc} - {currentMileage?.level}</p>
                </div>
                <div className="banner-badge" style={{ background: currentMileage?.color }}>
                  موصى به من تويوتا
                </div>
              </div>
            </div>

            <div className="services-categories">
              {Object.entries(servicesByCategory).map(([category, services]) => (
                <div key={category} className="category-section">
                  <div className="category-header">
                    <div className="category-icon">
                      {category === "المحرك" && <i className="fas fa-engine"></i>}
                      {category === "القير" && <i className="fas fa-cogs"></i>}
                      {category === "الفرامل" && <i className="fas fa-car-side"></i>}
                      {category === "العجلات" && <i className="fas fa-circle-notch"></i>}
                      {category === "التبريد" && <i className="fas fa-snowflake"></i>}
                      {category === "الوقود" && <i className="fas fa-gas-pump"></i>}
                      {category === "فحص عام" && <i className="fas fa-clipboard-list"></i>}
                      {category === "العادم" && <i className="fas fa-smog"></i>}
                      {category === "العفشة" && <i className="fas fa-car"></i>}
                    </div>
                    <h3>{category}</h3>
                    <div className="category-line"></div>
                  </div>
                  <div className="services-grid">
                    {services.map((service, idx) => (
                      <div key={service.id} className="service-card" style={{ animationDelay: `${idx * 0.05}s` }} onClick={() => handleServiceClick(service)}>
                        <div className="service-card-header">
                          <div className="service-icon">
                            <i className="fas fa-wrench"></i>
                          </div>
                          <button 
                            className={`save-btn ${savedServices[service.id] ? "saved" : ""}`}
                            onClick={(e) => { e.stopPropagation(); handleSave(service.id); }}
                          >
                            <i className="fas fa-bookmark"></i>
                          </button>
                        </div>
                        <div className="service-info">
                          <h4>{service.name}</h4>
                          <div className="service-details">
                            <div className="detail-item">
                              <i className="fas fa-oil-can"></i>
                              <span>{service.part}</span>
                            </div>
                            <div className="detail-item">
                              <i className="far fa-clock"></i>
                              <span>{service.time}</span>
                            </div>
                          </div>
                          <div className={`importance-tag ${service.importance === "إلزامي" ? "critical" : service.importance === "هام جداً" ? "high" : "normal"}`}>
                            {service.importance}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedService && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
              <div className="modal-service-icon">
                <i className="fas fa-wrench"></i>
              </div>
              <h2>{selectedService.name}</h2>
              <div className="modal-info-grid">
                <div className="modal-info-item">
                  <i className="fas fa-oil-can"></i>
                  <div>
                    <label>قطعة الغيار</label>
                    <span>{selectedService.part}</span>
                  </div>
                </div>
                <div className="modal-info-item">
                  <i className="far fa-clock"></i>
                  <div>
                    <label>الوقت المتوقع</label>
                    <span>{selectedService.time}</span>
                  </div>
                </div>
                <div className="modal-info-item">
                  <i className="fas fa-chart-line"></i>
                  <div>
                    <label>المسافة</label>
                    <span>{currentMileage?.label}</span>
                  </div>
                </div>
                <div className="modal-info-item">
                  <i className="fas fa-tag"></i>
                  <div>
                    <label>الأهمية</label>
                    <span className={`importance-text ${selectedService.importance === "إلزامي" ? "critical" : ""}`}>
                      {selectedService.importance}
                    </span>
                  </div>
                </div>
              </div>
              <div className="modal-description">
                <h3><i className="fas fa-info-circle"></i> معلومات عن الخدمة</h3>
                <p>
                  {selectedService.importance === "إلزامي" 
                    ? `هذه الخدمة إلزامية حسب دليل الصيانة من تويوتا ويجب تنفيذها في الموعد المحدد (${currentMileage?.label}) للحفاظ على أداء سيارتك وضمان السلامة.`
                    : `هذه الخدمة مهمة للحفاظ على أداء سيارتك وينصح بتنفيذها في الموعد المحدد (${currentMileage?.label}).`}
                </p>
                <div className="toyota-warning">
                  <i className="fas fa-shield-alt"></i>
                  <span>تنبيه: إهمال الصيانة الدورية قد يؤدي إلى أعطال كبيرة ويؤثر على الضمان</span>
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn-primary" onClick={closeModal}>
                  <i className="fas fa-check"></i>
                  فهمت
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ==================== حاسبة الصيانة المحسنة ====================
function MaintenanceCheckerSection() {
  const [currentKm, setCurrentKm] = useState("");
  const [lastService, setLastService] = useState("");
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    const current = parseInt(currentKm);
    const last = parseInt(lastService);
    
    if (currentKm && lastService) {
      if (last > current) {
        newErrors.lastService = "⚠️ لا يمكن أن يكون عدد الكيلومترات عند آخر صيانة أكبر من الكيلومترات الحالي";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkMaintenance = () => {
    if (!currentKm || !lastService) {
      setErrors({ form: "⚠️ يرجى إدخال جميع البيانات" });
      return;
    }
    if (!validateInputs()) return;
    
    setErrors({});
    const current = parseInt(currentKm);
    const last = parseInt(lastService);
    const diff = current - last;
    const nextService = last + 10000;
    const remaining = nextService - current;
    setShowResult(true);
    
    if (diff >= 10000) {
      setResult({
        status: "overdue",
        message: "صيانتك الدورية متأخرة!",
        details: `لقد تجاوزت ${diff - 10000} كم عن موعد الصيانة. يرجى التوجه لأقرب مركز صيانة فوراً.`,
        nextKm: nextService,
        remaining: remaining,
        percentage: Math.min((diff / 10000) * 100, 100),
        checks: [
          { name: "المسافة المقطوعة", passed: false, desc: `تم قطع ${diff.toLocaleString()} كم منذ آخر صيانة (يجب ألا تتجاوز 10,000 كم)` },
          { name: "زيت المحرك", passed: false, desc: "بحاجة لتغيير فوري - تجاوزت المسافة الموصى بها" },
          { name: "الفرامل", passed: false, desc: "يفضل فحصها - تأخرت الصيانة" },
          { name: "الإطارات", passed: false, desc: "يفضل فحصها - تأخرت الصيانة" }
        ]
      });
    } else {
      setResult({
        status: "upcoming",
        message: remaining <= 0 ? "موعد الصيانة اليوم!" : `متبقي ${remaining.toLocaleString()} كم`,
        details: remaining <= 0 ? "لقد وصلت إلى موعد الصيانة المقرر" : `متبقي ${remaining.toLocaleString()} كم على موعد الصيانة التالي.`,
        nextKm: nextService,
        remaining: remaining,
        percentage: (diff / 10000) * 100,
        checks: [
          { name: "المسافة المقطوعة", passed: diff <= 8000, desc: `قطعت ${diff.toLocaleString()} كم ${diff <= 8000 ? "(في الحدود الآمنة)" : "(تقترب من الحد الأقصى)"}` },
          { name: "زيت المحرك", passed: remaining > 3000, desc: remaining > 3000 ? "حالته جيدة" : "يقترب موعد تغييره" },
          { name: "الفرامل", passed: true, desc: "في حالة جيدة" },
          { name: "الإطارات", passed: true, desc: "في حالة جيدة" }
        ]
      });
    }
  };

  const getProgressColor = () => {
    if (!result) return "#E31837";
    if (result.status === "overdue") return "#E31837";
    if (result.remaining < 2000) return "#F39C12";
    return "#27AE60";
  };

  return (
    <section className="section checker-section">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="badge">
            <i className="fas fa-calculator"></i> حاسبة الصيانة
          </span>
          <h2 className="section-title">متى <span className="highlight">صيانتك القادمة</span>؟</h2>
          <div className="divider"></div>
          <p className="section-desc">احسب موعد صيانتك الدورية القادمة بناءً على المسافة المقطوعة</p>
        </div>

        <div className="checker-box animate-on-scroll">
          <div className="checker-inputs">
            <div className="input-group">
              <label><i className="fas fa-tachometer-alt"></i> عدد الكيلومترات الحالي</label>
              <input 
                type="number" 
                placeholder="مثال: 25000" 
                value={currentKm}
                onChange={(e) => {
                  setCurrentKm(e.target.value);
                  setErrors({});
                  setShowResult(false);
                }}
              />
              <span className="input-unit">كم</span>
            </div>
            <div className="input-group">
              <label><i className="fas fa-calendar-alt"></i> عدد الكيلومترات عند آخر صيانة</label>
              <input 
                type="number" 
                placeholder="مثال: 15000" 
                value={lastService}
                onChange={(e) => {
                  setLastService(e.target.value);
                  setErrors({});
                  setShowResult(false);
                }}
                className={errors.lastService ? "error-input" : ""}
              />
              <span className="input-unit">كم</span>
              {errors.lastService && <span className="error-message">{errors.lastService}</span>}
              {errors.form && <span className="error-message">{errors.form}</span>}
            </div>
            <button className="checker-btn" onClick={checkMaintenance}>
              <i className="fas fa-search"></i>
              احسب موعد الصيانة
            </button>
          </div>

          {showResult && result && (
            <div className={`checker-result ${result.status} animate-result`}>
              <div className="result-icon">
                <i className={`fas ${result.status === "overdue" ? "fa-exclamation-triangle" : "fa-clock"}`}></i>
              </div>
              <div className="result-text">
                <h4>{result.message}</h4>
                <p>{result.details}</p>
                <div className="result-progress">
                  <div className="progress-label">
                    <span>نسبة استهلاك مسافة الصيانة</span>
                    <span className="progress-percentage">{Math.round(result.percentage)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${Math.min(result.percentage, 100)}%`,
                        background: `linear-gradient(90deg, ${getProgressColor()}, ${result.status === "overdue" ? "#FF6B6B" : result.remaining < 2000 ? "#F39C12" : "#27AE60"})`
                      }}
                    ></div>
                  </div>
                </div>
                <div className="checker-checks-status">
                  <h4><i className="fas fa-clipboard-list"></i> حالة الصيانة بالتفصيل</h4>
                  <div className="checks-list">
                    {result.checks.map((check, idx) => (
                      <div key={idx} className={`check-item ${check.passed ? "passed" : "failed"}`}>
                        <div className="check-icon">
                          <i className={`fas ${check.passed ? "fa-check-circle" : "fa-times-circle"}`}></i>
                        </div>
                        <div className="check-info">
                          <span className="check-name">{check.name}</span>
                          <span className="check-desc">{check.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="result-km">
                  <span>موعد الصيانة التالي: <strong>{result.nextKm.toLocaleString()} كم</strong></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="maintenance-reminder">
          <i className="fas fa-bell"></i>
          <p>نصيحة تويوتا: قم بإجراء الصيانة الدورية كل <strong>10,000 كم</strong> أو <strong>6 أشهر</strong> أيهما أقرب</p>
        </div>
      </div>
    </section>
  );
}

// ==================== مقياس مستوى الزيت المحسن ====================
function OilLevelCheckerSection() {
  const [engineType, setEngineType] = useState("petrol");
  const [lastOilChange, setLastOilChange] = useState("");
  const [currentKm, setCurrentKm] = useState("");
  const [oilResult, setOilResult] = useState(null);
  const [showOilStatus, setShowOilStatus] = useState(false);
  const [showOilMethods, setShowOilMethods] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    const current = parseInt(currentKm);
    const last = parseInt(lastOilChange);
    
    if (currentKm && lastOilChange) {
      if (last > current) {
        newErrors.lastOilChange = "⚠️ لا يمكن أن يكون عدد الكيلومترات عند آخر تغيير زيت أكبر من الكيلومترات الحالي";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkOilLevel = () => {
    if (!lastOilChange || !currentKm) {
      setErrors({ form: "⚠️ يرجى إدخال جميع البيانات" });
      return;
    }
    if (!validateInputs()) return;
    
    setErrors({});
    const last = parseInt(lastOilChange);
    const current = parseInt(currentKm);
    const distanceSinceChange = current - last;
    setShowOilStatus(true);
    setShowOilMethods(false);
    
    const oilRecommendations = {
      petrol: {
        name: "زيت تويوتا 0W-20",
        interval: 10000,
        description: "زيت اصطناعي بالكامل - أفضل أداء لمحركات البنزين"
      },
      diesel: {
        name: "زيت تويوتا 5W-40",
        interval: 8000,
        description: "زيت عالي اللزوجة لمحركات الديزل"
      },
      hybrid: {
        name: "زيت تويوتا 0W-16",
        interval: 12000,
        description: "زيت خاص للمحركات الهجينة لتقليل الاحتكاك"
      }
    };
    
    const rec = oilRecommendations[engineType];
    const remaining = rec.interval - distanceSinceChange;
    const percentage = (distanceSinceChange / rec.interval) * 100;
    
    if (distanceSinceChange >= rec.interval) {
      setOilResult({
        status: "critical",
        message: "⚠️ موعد تغيير الزيت تجاوز الحد المسموح!",
        details: `لقد تجاوزت ${distanceSinceChange - rec.interval} كم عن موعد التغيير.`,
        remaining: remaining,
        percentage: Math.min(percentage, 100),
        recommendation: rec,
        action: "critical",
        checks: [
          { name: "مستوى الزيت", passed: false, desc: "منخفض جداً - يحتاج تغيير فوري" },
          { name: "لون الزيت", passed: false, desc: "أسود داكن - فقد خصائصه" },
          { name: "لزوجة الزيت", passed: false, desc: "خفيف جداً - لا يؤدي وظيفته" },
          { name: "فلتر الزيت", passed: false, desc: "بحاجة للتغيير" }
        ]
      });
    } else if (distanceSinceChange >= rec.interval - 3000) {
      setOilResult({
        status: "warning",
        message: "⚠️ موعد تغيير الزيت يقترب",
        details: `متبقي ${remaining} كم فقط على موعد تغيير الزيت.`,
        remaining: remaining,
        percentage: percentage,
        recommendation: rec,
        action: "warning",
        checks: [
          { name: "مستوى الزيت", passed: true, desc: "مقبول لكن يُنصح بالتغيير قريباً" },
          { name: "لون الزيت", passed: false, desc: "داكن - بدأ يفقد خصائصه" },
          { name: "لزوجة الزيت", passed: true, desc: "لا تزال مقبولة" },
          { name: "فلتر الزيت", passed: true, desc: "يعمل بشكل طبيعي" }
        ]
      });
    } else {
      setOilResult({
        status: "good",
        message: "✅ حالة الزيت جيدة",
        details: `قطعت ${distanceSinceChange.toLocaleString()} كم منذ آخر تغيير. متبقي ${remaining.toLocaleString()} كم حتى التغيير القادم.`,
        remaining: remaining,
        percentage: percentage,
        recommendation: rec,
        action: "good",
        checks: [
          { name: "مستوى الزيت", passed: true, desc: "ممتاز - ضمن المستوى الموصى به" },
          { name: "لون الزيت", passed: true, desc: "ذهبي فاتح - نظيف وجيد" },
          { name: "لزوجة الزيت", passed: true, desc: "مثالية - تؤدي وظيفتها بكفاءة" },
          { name: "فلتر الزيت", passed: true, desc: "نظيف - يعمل بكفاءة" }
        ]
      });
    }
  };

  const getProgressColor = () => {
    if (!oilResult) return "#E31837";
    if (oilResult.status === "critical") return "#E31837";
    if (oilResult.status === "warning") return "#F39C12";
    return "#27AE60";
  };

  const oilMethods = [
    { method: "🔧 طريقة القياس بعصا الزيت", steps: ["أوقف المحرك وانتظر 5 دقائق", "اسحب عصا القياس وامسحها جيداً", "أعد إدخال العصا ثم اسحبها مرة أخرى", "تأكد أن مستوى الزيت بين علامتي MIN و MAX"] },
    { method: "📱 طريقة القياس عبر كمبيوتر السيارة", steps: ["شغل المحرك واتركه يصل للحرارة الطبيعية", "استخدم أزرار التحكم في عجلة القيادة", "اختر قائمة الزيت من شاشة المعلومات", "سيظهر لك مستوى الزيت على الشاشة بشكل رقمي"] },
    { method: "⚠️ علامات تدل على حاجة تغيير الزيت", steps: ["ظهور ضوء تحذير الزيت في الطبلون", "سماع صوت طقطقة من المحرك", "ظهور دخان من العادم", "ضعف أداء المحرك وزيادة استهلاك الوقود"] }
  ];

  return (
    <section className="section oil-checker-section">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="badge">
            <i className="fas fa-oil-can"></i> مقياس الزيت
          </span>
          <h2 className="section-title">فحص مستوى <span className="highlight">زيت المحرك</span></h2>
          <div className="divider"></div>
          <p className="section-desc">تأكد من حالة زيت محرك تويوتا واحصل على توصيات دقيقة للتغيير</p>
        </div>

        <div className="oil-checker-box animate-on-scroll">
          <div className="oil-checker-inputs">
            <div className="input-group">
              <label><i className="fas fa-engine"></i> نوع المحرك</label>
              <div className="engine-type-buttons">
                <button 
                  className={`engine-btn ${engineType === "petrol" ? "active" : ""}`}
                  onClick={() => setEngineType("petrol")}
                >
                  <i className="fas fa-gas-pump"></i>
                  <span>بنزين</span>
                </button>
                <button 
                  className={`engine-btn ${engineType === "diesel" ? "active" : ""}`}
                  onClick={() => setEngineType("diesel")}
                >
                  <i className="fas fa-oil-can"></i>
                  <span>ديزل</span>
                </button>
                <button 
                  className={`engine-btn ${engineType === "hybrid" ? "active" : ""}`}
                  onClick={() => setEngineType("hybrid")}
                >
                  <i className="fas fa-charging-station"></i>
                  <span>هايبرد</span>
                </button>
              </div>
            </div>
            <div className="input-group">
              <label><i className="fas fa-calendar-alt"></i> عدد الكيلومترات عند آخر تغيير زيت</label>
              <input 
                type="number" 
                placeholder="مثال: 25000" 
                value={lastOilChange}
                onChange={(e) => {
                  setLastOilChange(e.target.value);
                  setErrors({});
                  setShowOilStatus(false);
                }}
                className={errors.lastOilChange ? "error-input" : ""}
              />
              <span className="input-unit">كم</span>
              {errors.lastOilChange && <span className="error-message">{errors.lastOilChange}</span>}
              {errors.form && <span className="error-message">{errors.form}</span>}
            </div>
            <div className="input-group">
              <label><i className="fas fa-tachometer-alt"></i> عدد الكيلومترات الحالي</label>
              <input 
                type="number" 
                placeholder="مثال: 35000" 
                value={currentKm}
                onChange={(e) => {
                  setCurrentKm(e.target.value);
                  setErrors({});
                  setShowOilStatus(false);
                }}
              />
              <span className="input-unit">كم</span>
            </div>
            <button className="oil-checker-btn" onClick={checkOilLevel}>
              <i className="fas fa-search"></i>
              فحص حالة الزيت
            </button>
          </div>

          {showOilStatus && oilResult && (
            <div className={`oil-result ${oilResult.status} animate-result`}>
              <div className="oil-result-header">
                <div className="oil-status-icon">
                  <i className={`fas ${oilResult.status === "critical" ? "fa-exclamation-triangle" : oilResult.status === "warning" ? "fa-clock" : "fa-check-circle"}`}></i>
                </div>
                <div className="oil-status-text">
                  <h4>{oilResult.message}</h4>
                  <p>{oilResult.details}</p>
                </div>
              </div>

              <div className="oil-progress-section">
                <div className="oil-progress-label">
                  <span>نسبة استهلاك عمر الزيت</span>
                  <span className="oil-percentage">{Math.round(oilResult.percentage)}%</span>
                </div>
                <div className="oil-progress-bar">
                  <div 
                    className="oil-progress-fill" 
                    style={{ 
                      width: `${Math.min(oilResult.percentage, 100)}%`,
                      background: `linear-gradient(90deg, ${getProgressColor()}, ${oilResult.status === "critical" ? "#FF6B6B" : oilResult.status === "warning" ? "#F39C12" : "#27AE60"})`
                    }}
                  ></div>
                </div>
              </div>

              <div className="oil-checks-status">
                <h4><i className="fas fa-clipboard-list"></i> حالة الزيت بالتفصيل</h4>
                <div className="checks-list">
                  {oilResult.checks.map((check, idx) => (
                    <div key={idx} className={`check-item ${check.passed ? "passed" : "failed"}`}>
                      <div className="check-icon">
                        <i className={`fas ${check.passed ? "fa-check-circle" : "fa-times-circle"}`}></i>
                      </div>
                      <div className="check-info">
                        <span className="check-name">{check.name}</span>
                        <span className="check-desc">{check.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="oil-recommendation">
                <div className="rec-header">
                  <i className="fas fa-microchip"></i>
                  <span>توصية تويوتا لمحرك {engineType === "petrol" ? "البنزين" : engineType === "diesel" ? "الديزل" : "الهايبرد"}</span>
                </div>
                <div className="rec-content">
                  <div className="rec-item">
                    <label>نوع الزيت:</label>
                    <strong>{oilResult.recommendation.name}</strong>
                  </div>
                  <div className="rec-item">
                    <label>فترة التغيير:</label>
                    <span>كل {oilResult.recommendation.interval.toLocaleString()} كم</span>
                  </div>
                  <div className="rec-item">
                    <label>الوصف:</label>
                    <span>{oilResult.recommendation.description}</span>
                  </div>
                </div>
              </div>

              <div className="oil-action-buttons">
                <button 
                  className={`action-btn ${oilResult.action === "critical" ? "critical" : oilResult.action === "warning" ? "warning" : "good"}`}
                  onClick={() => setShowOilMethods(!showOilMethods)}
                >
                  <i className="fas fa-oil-can"></i>
                  {oilResult.action === "critical" ? "🔧 طرق تغيير الزيت" : oilResult.action === "warning" ? "📋 طرق فحص الزيت" : "✅ طرق الحفاظ على الزيت"}
                </button>
              </div>

              {showOilMethods && (
                <div className="oil-methods animate-result">
                  <h4><i className="fas fa-book-open"></i> دليل العناية بالزيت</h4>
                  <div className="methods-list">
                    {oilMethods.map((item, idx) => (
                      <div key={idx} className="method-card">
                        <div className="method-title">
                          <i className="fas fa-check-circle"></i>
                          <span>{item.method}</span>
                        </div>
                        <div className="method-steps">
                          {item.steps.map((step, stepIdx) => (
                            <div key={stepIdx} className="method-step">
                              <span className="step-number">{stepIdx + 1}</span>
                              <span className="step-text">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="oil-tips">
          <div className="oil-tips-header">
            <i className="fas fa-lightbulb"></i>
            <h3>نصائح مهمة عن زيت المحرك</h3>
          </div>
          <div className="oil-tips-grid">
            <div className="oil-tip-card">
              <i className="fas fa-check-circle"></i>
              <div>
                <strong>استخدم الزيت الأصلي</strong>
                <p>استخدم زيت تويوتا الأصلي لضمان أفضل حماية للمحرك</p>
              </div>
            </div>
            <div className="oil-tip-card">
              <i className="fas fa-check-circle"></i>
              <div>
                <strong>افحص الزيت شهرياً</strong>
                <p>افحص مستوى الزيت باستخدام عصا القياس كل شهر</p>
              </div>
            </div>
            <div className="oil-tip-card">
              <i className="fas fa-check-circle"></i>
              <div>
                <strong>لون الزيت يدل على حالته</strong>
                <p>الزيت الأسود جداً يحتاج تغيير، الزيت الشفاف يعني حالة جيدة</p>
              </div>
            </div>
            <div className="oil-tip-card">
              <i className="fas fa-check-circle"></i>
              <div>
                <strong>لا تخلط أنواع الزيوت</strong>
                <p>لا تخلط أنواع مختلفة من الزيوت لأنها قد تتفاعل سلباً</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== نصائح الصيانة الدورية ====================
function MaintenanceTipsSection() {
  const tips = [
    { icon: "fa-oil-can", title: "زيت المحرك", desc: "استخدم زيت تويوتا الأصلي وغيره كل 5,000 - 10,000 كم حسب نوع الزيت", level: "هام جداً", color: "#E31837" },
    { icon: "fa-car", title: "الفرامل", desc: "افحص تيل الفرامل كل 10,000 كم واستبدله عند سماع صرير أو نقص في الاستجابة", level: "هام جداً", color: "#F39C12" },
    { icon: "fa-tachometer-alt", title: "الإطارات", desc: "افحص ضغط الإطارات أسبوعياً وقم بتبديل أماكنها كل 10,000 كم", level: "مهم", color: "#27AE60" },
    { icon: "fa-cogs", title: "زيت القير", desc: "غيره زيت القير كل 40,000 كم للحفاظ على أداء مثالي", level: "مهم", color: "#3498DB" },
    { icon: "fa-battery-full", title: "البطارية", desc: "افحص البطارية كل 6 أشهر ونظف الأقطاب من الأكاسيد", level: "نصيحة", color: "#9B59B6" },
    { icon: "fa-snowflake", title: "المكيف", desc: "شغل المكيف 10 دقائق أسبوعياً للحفاظ على ضغط الغاز", level: "نصيحة", color: "#1ABC9C" },
    { icon: "fa-filter", title: "فلتر الهواء", desc: "غيره فلتر الهواء كل 20,000 كم لتحسين أداء المحرك", level: "مهم", color: "#E67E22" },
    { icon: "fa-microchip", title: "فحص الكمبيوتر", desc: "افحص كمبيوتر السيارة دورياً للكشف عن أي أعطال مبكرة", level: "موصى به", color: "#2ECC71" },
  ];

  return (
    <section className="section tips-section">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="badge">
            <i className="fas fa-lightbulb"></i> نصائح ذهبية
          </span>
          <h2 className="section-title">نصائح <span className="highlight">للصيانة الدورية</span></h2>
          <div className="divider"></div>
          <p className="section-desc">نصائح مهمة من خبراء تويوتا للحفاظ على سيارتك بأفضل حالة</p>
        </div>

        <div className="tips-grid">
          {tips.map((tip, idx) => (
            <div key={idx} className="tip-card animate-on-scroll">
              <div className="tip-icon" style={{ background: `${tip.color}20`, color: tip.color }}>
                <i className={`fas ${tip.icon}`}></i>
              </div>
              <div className="tip-content">
                <h3>{tip.title}</h3>
                <p>{tip.desc}</p>
                <span className="tip-level" style={{ background: tip.color }}>{tip.level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== سكشن جديد ====================
function NewServiceSection() {
  const [activeService, setActiveService] = useState(null);

  const services = [
    { id: 1, title: "فحص شامل للمحرك", icon: "fa-engine", desc: "فحص كامل لجميع أجزاء المحرك باستخدام أحدث الأجهزة", price: "مجاني مع الصيانة", color: "#E31837" },
    { id: 2, title: "فحص نظام الفرامل", icon: "fa-car-side", desc: "فحص تيل الفرامل والأقراص والاسطوانات", price: "خدمة مجانية", color: "#F39C12" },
    { id: 3, title: "فحص الإطارات", icon: "fa-circle-notch", desc: "فحص ضغط الإطارات وتآكلها وتبديل أماكنها", price: "شامل", color: "#27AE60" },
    { id: 4, title: "فحص البطارية", icon: "fa-battery-full", desc: "فحص كفاءة البطارية ونظافة الأقطاب", price: "مجاني", color: "#3498DB" },
  ];

  return (
    <section className="section new-service-section">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="badge">
            <i className="fas fa-gem"></i> خدمات مميزة
          </span>
          <h2 className="section-title">خدمات <span className="highlight">الصيانة المجانية</span></h2>
          <div className="divider"></div>
          <p className="section-desc">استفد من خدمات الفحص المجانية مع كل صيانة دورية</p>
        </div>

        <div className="new-services-grid">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="new-service-card animate-on-scroll"
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
              style={{ borderColor: activeService === service.id ? service.color : "rgba(255,255,255,0.1)" }}
            >
              <div className="new-service-icon" style={{ background: `${service.color}20`, color: service.color }}>
                <i className={`fas ${service.icon}`}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <div className="new-service-price" style={{ background: service.color }}>
                {service.price}
              </div>
              <div className="new-service-hover-effect"></div>
            </div>
          ))}
        </div>

        <div className="new-service-offer animate-on-scroll">
          <div className="offer-icon">
            <i className="fas fa-gift"></i>
          </div>
          <div className="offer-text">
            <h3>عرض خاص لعملاء تويوتا</h3>
            <p>احصل على فحص شامل مجاني عند حجز موعد الصيانة الدورية</p>
          </div>
          <button className="offer-btn">
            <i className="fas fa-calendar-alt"></i>
            احجز موعدك الآن
            <i className="fas fa-arrow-left"></i>
          </button>
        </div>
      </div>
    </section>
  );
}