import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./Contact.css";

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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app">
      <HeroSection scrollToSection={scrollToSection} />
      <ElectricalMaintenanceSection />
      <ElectricalCheckerSection />
      <InteractiveElectricalFaultsSection />
      <ElectricalTipsSection />
      <StatsSection />
    </div>
  );
}

// ==================== Hero Section ====================
function HeroSection({ scrollToSection }) {
  return (
    <section className="section hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text animate-on-scroll">
            <span className="hero-badge">
              <i className="fas fa-bolt"></i> الصيانة الكهربائية المعتمدة
            </span>
            <h1 className="hero-title">
              <span className="highlight">الصيانة الكهربائية</span>
              <br />
              لسيارات <span className="highlight">تويوتا</span>
            </h1>
            <p className="hero-desc">
              نظام كهربائي متكامل لسيارتك تويوتا. تشخيص دقيق، صيانة احترافية،
              وقطع غيار أصلية. نضمن لك أداءً مثالياً لجميع الأنظمة الكهربائية.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-number">20+</span>
                <span className="stat-label">نظام كهربائي</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">سيارة تم فحصها</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">تشخيص دقيق</span>
              </div>
            </div>
            <button 
              className="hero-discover-btn"
              onClick={() => scrollToSection("checker-section")}
            >
              <i className="fas fa-microscope"></i>
              اكتشف العطل
              <i className="fas fa-arrow-left"></i>
            </button>
          </div>
          <div className="hero-image animate-on-scroll">
            <div className="hero-image-wrapper">
              <div className="hero-placeholder">
                <i className="fas fa-microchip"></i>
                <h3>تشخيص كهربائي متقدم</h3>
                <p>أحدث أجهزة تشخيص تويوتا</p>
              </div>
              <div className="floating-card floating-card-1">
                <i className="fas fa-microscope"></i>
                <span>فحص كمبيوتر شامل</span>
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

// ==================== قسم الصيانة الكهربائية ====================
function ElectricalMaintenanceSection() {
  const [selectedModel, setSelectedModel] = useState("all");
  const [selectedSystem, setSelectedSystem] = useState("all");
  const [savedServices, setSavedServices] = useState({});
  const [selectedService, setSelectedService] = useState(null);

  const models = [
    { id: "all", name: "جميع الموديلات", icon: "fa-th-large", color: "#E31837" },
    { id: "corolla", name: "كورولا", icon: "fa-car", color: "#3498DB" },
    { id: "camry", name: "كامري", icon: "fa-car-side", color: "#27AE60" },
    { id: "landcruiser", name: "لاندكروزر", icon: "fa-truck", color: "#F39C12" },
    { id: "hilux", name: "هايلوكس", icon: "fa-truck-pickup", color: "#9B59B6" },
    { id: "rav4", name: "راف 4", icon: "fa-caravan", color: "#1ABC9C" },
  ];

  const systems = [
    { id: "all", name: "جميع الأنظمة", icon: "fa-microchip", color: "#E31837" },
    { id: "ecu", name: "كمبيوتر المحرك ECU", icon: "fa-microchip", color: "#3498DB" },
    { id: "battery", name: "البطارية والدينمو", icon: "fa-battery-full", color: "#27AE60" },
    { id: "sensors", name: "الحساسات", icon: "fa-microphone-alt", color: "#F39C12" },
    { id: "lighting", name: "الإضاءة", icon: "fa-lightbulb", color: "#E67E22" },
    { id: "ac", name: "المكيف", icon: "fa-snowflake", color: "#1ABC9C" },
    { id: "abs", name: "نظام ABS", icon: "fa-car-side", color: "#9B59B6" },
    { id: "airbag", name: "الوسائد الهوائية", icon: "fa-air-freshener", color: "#E31837" },
  ];

  const electricalData = {
    all: {
      ecu: [
        { id: 1, name: "فحص كمبيوتر المحرك", component: "ECU", time: "30 دقيقة", importance: "إلزامي", warning: "مهم للتشغيل السليم" },
        { id: 2, name: "قراءة الأعطال وتفريغها", component: "ECU", time: "20 دقيقة", importance: "مهم", warning: "يحدد الأعطال المخفية" },
        { id: 3, name: "تحديث برامج الكمبيوتر", component: "ECU", time: "ساعة", importance: "موصى به", warning: "أحدث إصدار من تويوتا" },
        { id: 4, name: "برمجة مفتاح السيارة", component: "ECU", time: "30 دقيقة", importance: "حسب الحاجة", warning: "عند فقدان المفتاح" },
      ],
      battery: [
        { id: 5, name: "فحص كفاءة البطارية", component: "بطارية", time: "15 دقيقة", importance: "مهم", warning: "يفحص كل 6 أشهر" },
        { id: 6, name: "فحص شحن الدينمو", component: "دينمو", time: "20 دقيقة", importance: "إلزامي", warning: "يؤثر على شحن البطارية" },
        { id: 7, name: "تنظيف أقطاب البطارية", component: "بطارية", time: "15 دقيقة", importance: "نصيحة", warning: "يمنع الأكسدة" },
        { id: 8, name: "فحص أسلاك البطارية", component: "كابلات", time: "15 دقيقة", importance: "مهم", warning: "تآكل الأسلاك يضعف الشحن" },
      ],
      sensors: [
        { id: 9, name: "فحص حساس الأكسجين", component: "O2 Sensor", time: "30 دقيقة", importance: "مهم", warning: "يؤثر على استهلاك الوقود" },
        { id: 10, name: "فحص حساس الحرارة", component: "حساس حرارة", time: "20 دقيقة", importance: "مهم", warning: "يؤثر على أداء المحرك" },
        { id: 11, name: "فحص حساس الخراج", component: "CKP Sensor", time: "30 دقيقة", importance: "إلزامي", warning: "يسبب عدم تشغيل المحرك" },
        { id: 12, name: "فحص حساس عمود الكامات", component: "CMP Sensor", time: "30 دقيقة", importance: "مهم", warning: "يؤثر على توقيت المحرك" },
        { id: 13, name: "فحص حساس الهواء", component: "MAF Sensor", time: "20 دقيقة", importance: "مهم", warning: "ينظف دورياً" },
      ],
      lighting: [
        { id: 14, name: "فحص جميع الإضاءة", component: "لمبات", time: "15 دقيقة", importance: "مهم", warning: "سلامة القيادة الليلية" },
        { id: 15, name: "فحص عدسة الليزر", component: "LED/Laser", time: "20 دقيقة", importance: "حسب الموديل", warning: "للطرازات الحديثة" },
        { id: 16, name: "فحص إضاءة اللوحة", component: "Dashboard", time: "15 دقيقة", importance: "نصيحة", warning: "وضوح البيانات" },
      ],
      ac: [
        { id: 17, name: "فحص كمبروسر المكيف", component: "كمبروسر", time: "30 دقيقة", importance: "مهم", warning: "يؤثر على التبريد" },
        { id: 18, name: "فحص ضغط الغاز", component: "غاز المكيف", time: "20 دقيقة", importance: "مهم", warning: "يحدد حاجة التعبئة" },
        { id: 19, name: "فحص حساسات المكيف", component: "Sensors", time: "25 دقيقة", importance: "مهم", warning: "التحكم في درجة الحرارة" },
      ],
      abs: [
        { id: 20, name: "فحص نظام ABS", component: "ABS", time: "30 دقيقة", importance: "هام جداً", warning: "سلامة الفرامل" },
        { id: 21, name: "فحص حساسات ABS", component: "ABS Sensors", time: "25 دقيقة", importance: "مهم", warning: "يسبب ظهور لمبة ABS" },
        { id: 22, name: "فحص وحدة ABS", component: "ABS Module", time: "45 دقيقة", importance: "مهم", warning: "التحكم في الفرامل" },
      ],
      airbag: [
        { id: 23, name: "فحص نظام الوسائد", component: "SRS", time: "30 دقيقة", importance: "هام جداً", warning: "سلامة الركاب" },
        { id: 24, name: "فحص حساسات التصادم", component: "Impact Sensors", time: "25 دقيقة", importance: "مهم", warning: "تفعيل الوسائد عند الحاجة" },
      ],
    },
    corolla: { ecu: [{ id: 1, name: "فحص كمبيوتر المحرك", component: "ECU كورولا", time: "30 دقيقة", importance: "إلزامي", warning: "خاص بموديل كورولا" }] },
    camry: { ecu: [{ id: 1, name: "فحص كمبيوتر المحرك", component: "ECU كامري", time: "30 دقيقة", importance: "إلزامي", warning: "خاص بموديل كامري" }] },
    landcruiser: { ecu: [{ id: 1, name: "فحص كمبيوتر المحرك", component: "ECU لاندكروزر", time: "30 دقيقة", importance: "إلزامي", warning: "خاص بموديل لاندكروزر" }] },
  };

  const getCurrentServices = () => {
    if (selectedModel === "all") return electricalData.all[selectedSystem] || [];
    const modelData = electricalData[selectedModel];
    if (modelData && modelData[selectedSystem]) return modelData[selectedSystem];
    return electricalData.all[selectedSystem] || [];
  };

  const currentServices = getCurrentServices();
  const currentSystem = systems.find(s => s.id === selectedSystem);
  const currentModel = models.find(m => m.id === selectedModel);

  const handleSave = (serviceId) => {
    setSavedServices(prev => ({ ...prev, [serviceId]: !prev[serviceId] }));
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section className="section electrical-section">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="badge"><i className="fas fa-bolt"></i> الصيانة الكهربائية المعتمدة</span>
          <h2 className="section-title">صيانة <span className="highlight">الأنظمة الكهربائية</span></h2>
          <div className="divider"></div>
          <p className="section-desc">فحص وصيانة جميع الأنظمة الكهربائية لسيارات تويوتا بأحدث الأجهزة</p>
        </div>

        <div className="model-filter animate-on-scroll">
          <div className="filter-title"><i className="fas fa-car"></i><span>اختر موديل سيارتك</span></div>
          <div className="filter-buttons">
            {models.map((model) => (
              <button key={model.id} className={`model-btn ${selectedModel === model.id ? "active" : ""}`} onClick={() => setSelectedModel(model.id)} style={{ borderColor: selectedModel === model.id ? model.color : "rgba(255,255,255,0.2)", background: selectedModel === model.id ? `${model.color}15` : "transparent" }}>
                <i className={`fas ${model.icon}`} style={{ color: model.color }}></i><span>{model.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="system-filter animate-on-scroll">
          <div className="filter-title"><i className="fas fa-microchip"></i><span>اختر النظام الكهربائي</span></div>
          <div className="system-buttons">
            {systems.map((system) => (
              <button key={system.id} className={`system-btn ${selectedSystem === system.id ? "active" : ""}`} onClick={() => setSelectedSystem(system.id)}>
                <div className="system-icon" style={{ background: `${system.color}20`, color: system.color }}><i className={`fas ${system.icon}`}></i></div>
                <div className="system-info"><span className="system-name">{system.name}</span></div>
              </button>
            ))}
          </div>
        </div>

        <div className="current-system-banner animate-on-scroll">
          <div className="banner-content">
            <div className="banner-icon" style={{ background: `${currentSystem?.color}20` }}><i className={`fas ${currentSystem?.icon}`} style={{ color: currentSystem?.color }}></i></div>
            <div className="banner-text"><h3>{currentSystem?.name}</h3><p>خدمات الصيانة الكهربائية لـ {currentModel?.name}</p></div>
            <div className="banner-badge" style={{ background: currentSystem?.color }}>فحص كهربائي شامل</div>
          </div>
        </div>

        {currentServices.length > 0 ? (
          <div className="electrical-services-grid">
            {currentServices.map((service) => (
              <div key={service.id} className="electrical-card" onClick={() => handleServiceClick(service)}>
                <div className="card-header"><div className="card-icon"><i className="fas fa-bolt"></i></div><button className={`save-btn ${savedServices[service.id] ? "saved" : ""}`} onClick={(e) => { e.stopPropagation(); handleSave(service.id); }}><i className="fas fa-bookmark"></i></button></div>
                <h4>{service.name}</h4>
                <div className="card-details"><div className="detail-item"><i className="fas fa-microchip"></i><span>{service.component}</span></div><div className="detail-item"><i className="far fa-clock"></i><span>{service.time}</span></div></div>
                <div className={`importance-tag ${service.importance === "إلزامي" ? "critical" : service.importance === "هام جداً" ? "high" : service.importance === "مهم" ? "important" : "normal"}`}>{service.importance}</div>
                <div className="warning-tag"><i className="fas fa-exclamation-triangle"></i><span>{service.warning}</span></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-services"><i className="fas fa-microchip"></i><h4>لا توجد خدمات حالياً</h4><p>سيتم إضافة خدمات الصيانة الكهربائية لهذا الموديل قريباً</p></div>
        )}

        {selectedService && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}><i className="fas fa-times"></i></button>
              <div className="modal-service-icon"><i className="fas fa-bolt"></i></div>
              <h2>{selectedService.name}</h2>
              <div className="modal-info-grid">
                <div className="modal-info-item"><i className="fas fa-microchip"></i><div><label>المكون الكهربائي</label><span>{selectedService.component}</span></div></div>
                <div className="modal-info-item"><i className="far fa-clock"></i><div><label>الوقت المتوقع</label><span>{selectedService.time}</span></div></div>
                <div className="modal-info-item"><i className="fas fa-tag"></i><div><label>الأهمية</label><span className={`importance-text ${selectedService.importance === "إلزامي" ? "critical" : ""}`}>{selectedService.importance}</span></div></div>
                <div className="modal-info-item"><i className="fas fa-car"></i><div><label>الموديل</label><span>{currentModel?.name}</span></div></div>
              </div>
              <div className="modal-description"><h3><i className="fas fa-info-circle"></i> معلومات عن الخدمة</h3><p>{selectedService.importance === "إلزامي" ? `هذه الخدمة إلزامية للحفاظ على أداء النظام الكهربائي في سيارتك ${currentModel?.name}. ${selectedService.warning}` : `هذه الخدمة ${selectedService.warning} وينصح بتنفيذها دورياً للحفاظ على كفاءة النظام الكهربائي.`}</p><div className="electrical-warning"><i className="fas fa-shield-alt"></i><span>تنبيه: الأعطال الكهربائية قد تؤثر على أنظمة السلامة والأداء العام للسيارة</span></div></div>
              <div className="modal-actions"><button className="btn-primary" onClick={closeModal}><i className="fas fa-check"></i>فهمت</button></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ==================== سكشن اللمبات (مطور بالكامل - 14 لمبة) ====================
function ElectricalCheckerSection() {
  const [selectedWarning, setSelectedWarning] = useState(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  // تعريف المصفوفة خارج المكون باستخدام useMemo
  const warningLights = useMemo(() => [
    { 
      id: "battery", 
      name: "البطارية", 
      icon: "fa-battery-full", 
      color: "#F39C12", 
      system: "نظام الشحن", 
      solution: "افحص البطارية والدينمو والكابلات. قد يكون الدينمو لا يشحن بشكل كافٍ أو البطارية تالفة.",
      steps: [
        "افحص جهد البطارية باستخدام الأفوميتر (يجب أن يكون 12.4-12.7 فولت والمحرك واقف)",
        "إذا كان الجهد أقل من 12 فولت، قم بشحن البطارية بشاحن خارجي لمدة 6-8 ساعات",
        "بعد الشحن، افحص الجهد مرة أخرى - إذا لم يرتفع، البطارية تالفة وتحتاج تغيير",
        "افحص أقطاب البطارية ونظفها من الأكاسيد باستخدام فرشاة سلكية وماء وصودا",
        "افحص شد سير الدينمو - يجب أن يكون مشدوداً ولا ينزلق",
        "شغل المحرك وافحص جهد الشحن عند 2000 دورة (يجب أن يكون 13.5-14.5 فولت)",
        "إذا كان الجهد أقل من 13 فولت، الدينمو لا يشحن وقد يحتاج إلى صيانة أو تغيير",
        "إذا كان الجهد أكثر من 14.8 فولت، منظم الجهد تالف ويحتاج تغيير"
      ] 
    },
    { 
      id: "engine", 
      name: "المحرك", 
      icon: "fa-microchip", 
      color: "#E31837", 
      system: "كمبيوتر المحرك", 
      solution: "افحص الكمبيوتر لقراءة الأعطال المخزنة. قد يكون حساس أكسجين أو شمعة احتراق.",
      steps: [
        "قم بتوصيل جهاز فحص الكمبيوتر (OBD2) بمنفذ التشخيص الموجود أسفل الطبلون",
        "شغل المحرك واقرأ أكواد الأعطال المخزنة في كمبيوتر المحرك",
        "دوّن الأكواد الظاهرة (مثل P0171, P0300, P0420) لمعرفة العطل الدقيق",
        "افحص فلتر الهواء - إذا كان متسخاً، قم بتغييره لأنه يؤثر على نسبة الوقود والهواء",
        "افحص بوجيهات الاحتراق - إذا كانت سوداء أو متهالكة، قم بتغييرها كل 40,000 كم",
        "افحص حساس الأكسجين (O2 Sensor) - قد يكون متسخاً أو تالفاً",
        "افحص حساس الهواء (MAF) ونظفه برذاذ خاص بدون لمسه",
        "بعد إجراء الإصلاحات، امسح الأكواد باستخدام جهاز الفحص وجرب السيارة",
        "إذا ظهر العطل مرة أخرى، قد تكون هناك مشكلة كهربائية أعمق تحتاج لمركز متخصص"
      ] 
    },
    { 
      id: "abs", 
      name: "ABS", 
      icon: "fa-car-crash", 
      color: "#3498DB", 
      system: "نظام الفرامل", 
      solution: "افحص حساسات ABS عند كل عجلة. قد يكون الحساس متسخاً أو تالفاً.",
      steps: [
        "ارفع السيارة على رافعة أو استخدم جاك لتأمينها",
        "افحص حساسات ABS عند كل عجلة (4 حساسات) بحثاً عن الأوساخ أو الشوائب المعدنية",
        "نظف الحساسات باستخدام قطعة قماش جافة ورذاذ تنظيف المكابح - لا تستخدم الماء أبداً",
        "افحص حلقة الاستشعار (Reluctor Ring) عند كل عجلة - تأكد من عدم وجود تشققات أو انكسار",
        "افحص الأسلاك والتوصيلات الكهربائية للحساسات - تأكد من عدم وجود قطع أو تآكل",
        "استخدم جهاز فحص لقراءة كود العطل - سيعرفك أي حساس تالف (يمين أمامي، يسار خلفي، إلخ)",
        "إذا كان الحساس تالفاً، قم بشراء حساس أصلي وتغييره",
        "بعد التنظيف أو التغيير، أعد ضبط نظام ABS عن طريق فصل البطارية لمدة 10 دقائق",
        "اختبر الفرامل في مكان آمن وتأكد من عمل ABS عند الفرملة القوية"
      ] 
    },
    { 
      id: "airbag", 
      name: "الوسائد الهوائية", 
      icon: "fa-air-freshener", 
      color: "#9B59B6", 
      system: "نظام SRS", 
      solution: "فحص فوري بواسطة كمبيوتر متخصص. لا تتجاهل هذه اللمبة أبداً.",
      steps: [
        "لا تحاول إصلاح نظام الوسائد الهوائية بنفسك أبداً - فهي خطيرة جداً",
        "توجه فوراً إلى مركز متخصص أو وكالة تويوتا لفحص النظام",
        "سيقوم الفني بتوصيل جهاز فحص خاص بنظام SRS لقراءة كود العطل",
        "قد تكون المشكلة بسيطة مثل انقطاع كهربائي تحت المقعد أو حساس باب تالف",
        "افحص الأسلاك تحت المقاعد الأمامية - قد تكون غير موصولة بشكل جيد",
        "تأكد من عدم وجود أي شيء موضوع على المقعد يعيق عمل حساس الوزن",
        "قد يكون حساس التصادم الأمامي تالفاً ويحتاج إلى تغيير",
        "في بعض الحالات، قد تحتاج وحدة التحكم في الوسائد إلى إعادة برمجة",
        "لا تقم أبداً بشراء وسائد هوائية مستعملة من التشليح - قد لا تعمل عند الحاجة"
      ] 
    },
    { 
      id: "oil", 
      name: "الزيت", 
      icon: "fa-oil-can", 
      color: "#27AE60", 
      system: "نظام التشحيم", 
      solution: "افحص مستوى الزيت وحساس ضغط الزيت. أوقف المحرك فوراً.",
      steps: [
        "أوقف المحرك فوراً إذا كانت اللمبة حمراء - لا تقود السيارة أبداً واللمبة مضاءة",
        "انتظر 5-10 دقائق حتى يبرد المحرك قليلاً وينزل الزيت إلى الكرتير",
        "أخرج عصا قياس الزيت وامسحها بقطعة قماش نظيفة وجافة",
        "أعد إدخال العصا كاملة ثم أخرجها مرة أخرى لقراءة مستوى الزيت",
        "إذا كان مستوى الزيت أقل من العلامة MIN، أضف زيتاً مناسباً لمحرك سيارتك (5W30 أو 10W40)",
        "أضف الزيت تدريجياً (نصف لتر كل مرة) وافحص المستوى حتى يصل إلى MAX",
        "إذا كان مستوى الزيت طبيعياً ولكن اللمبة لا تزال مضاءة، قد يكون حساس ضغط الزيت تالفاً",
        "افحص حساس ضغط الزيت (يوجد عادة بجانب فلتر الزيت) وتأكد من توصيلاته الكهربائية",
        "إذا كان الحساس بحالة جيدة، قد يكون طرمبة الزيت تالفة - وهذا يحتاج إلى ميكانيكي متخصص",
        "لا تستهين بهذه اللمبة - المحرك بدون زيت يتلف خلال دقائق"
      ] 
    },
    { 
      id: "temp", 
      name: "الحرارة", 
      icon: "fa-thermometer-half", 
      color: "#E67E22", 
      system: "نظام التبريد", 
      solution: "افحص مستوى الرديتر وحساس الحرارة ومروحة التبريد.",
      steps: [
        "إذا أضاءت لمبة الحرارة، أوقف السيارة فوراً في مكان آمن وأطفئ المحرك",
        "لا تفتح غطاء الرديتر أبداً والمحرك ساخن - قد تتعرض لحرق شديد من الماء المغلي",
        "انتظر 30-45 دقيقة حتى يبرد المحرك تماماً قبل فتح غطاء الرديتر",
        "افحص مستوى الماء في الرديتر والخزان الجانبي - يجب أن يكون بين MIN وMAX",
        "إذا كان مستوى الماء منخفضاً، أضف ماء مقطر (يفضل) أو ماء عادي",
        "افحص وجود تسريب ماء من الرديتر أو الخراطيم أو طرمبة الماء",
        "شغل المحرك وشغل المكيف - تأكد من أن المروحة الكهربائية تدور",
        "إذا كانت المروحة لا تدور، افحص فيوز المروحة وريلاي المروحة",
        "افحص حساس الحرارة - قد يكون تالفاً ويعطي قراءة خاطئة",
        "إذا كان الماء يغلي باستمرار، قد يكون غطاء الرديتر تالفاً (لا يحافظ على الضغط)",
        "إذا كان هناك زيت في ماء الرديتر، قد تكون قاعدة المحرك تالفة (مشكلة كبيرة)"
      ] 
    },
    { 
      id: "brake", 
      name: "الفرامل", 
      icon: "fa-exclamation-triangle", 
      color: "#E31837", 
      system: "نظام الفرامل", 
      solution: "افحص مستوى سائل الفرامل وقد يشير إلى تآكل تيل الفرامل.",
      steps: [
        "لا تقم بالقيادة واللمبة مضاءة - الفرامل هي أهم نظام في السيارة",
        "افتح غطاء خزان سائل الفرامل (عادة شفاف بجانب السائق)",
        "افحص مستوى السائل - يجب أن يكون بين MIN وMAX",
        "إذا كان المستوى منخفضاً جداً، أضف سائل فرامل DOT3 أو DOT4 حسب توصيات المصنع",
        "إذا كان السائل منخفضاً، فهذا يعني غالباً أن تيل الفرامل متآكل ويحتاج تغيير",
        "افحص تيل الفرامل الأمامي والخلفي - إذا كان التيل أقل من 3 مم، غيره فوراً",
        "عند تغيير التيل، سيعود مستوى السائل إلى طبيعته في الخزان",
        "افحص وجود تسريب في سائل الفرامل من أسفل السيارة",
        "افحص خراطيم الفرامل - تأكد من عدم وجود تشققات أو انتفاخات",
        "إذا كان السائل طبيعياً والتيل بحالة جيدة، قد يكون حساس مستوى الفرامل تالفاً",
        "جرب فرامل السيارة في مكان آمن - إذا كانت طرية أو تذهب للأرض، يوجد هواء في النظام"
      ] 
    },
    { 
      id: "tire", 
      name: "ضغط الإطارات", 
      icon: "fa-circle-notch", 
      color: "#1ABC9C", 
      system: "TPMS", 
      solution: "افحص ضغط الإطارات وأعد ضبط النظام.",
      steps: [
        "افحص ضغط الإطارات الباردة (قبل القيادة أو بعد ساعة من التوقف)",
        "استخدم مقياس ضغط هواء دقيق لفحص كل إطار على حدة",
        "الضغط الموصى به موجود على ملصق في باب السائق أو في كتيب السيارة (عادة 32-35 PSI)",
        "إذا كان الضغط منخفضاً، أضف هواء حتى يصل إلى الضغط الموصى به",
        "افحص الإطار بحثاً عن وجود مسامير أو شقوق أو انتفاخات جانبية",
        "بعد ضبط الضغط، أعد ضبط نظام TPMS عن طريق زر إعادة الضبط (تحت الطبلون أو في القائمة)",
        "قد تحتاج إلى القيادة لعدة دقائق حتى يعيد النظام قراءة الضغوط الجديدة",
        "إذا ظهرت اللمبة مرة أخرى، قد يكون أحد حساسات TPMS تالفاً أو بطاريته فارغة (عمر الحساس 5-7 سنوات)",
        "تغيير حساس TPMS يحتاج إلى جهاز خاص لبرمجته وربطه بكمبيوتر السيارة",
        "لا تتجاهل هذه اللمبة - ضغط الإطار المنخفض يزيد استهلاك الوقود ويضر بالإطار",
        "ضغط الإطار المنخفض جداً قد يؤدي إلى انفجار الإطار أثناء القيادة بسرعة عالية"
      ] 
    },
    { 
      id: "eps", 
      name: "التوجيه الكهربائي", 
      icon: "fa-car", 
      color: "#F39C12", 
      system: "EPS", 
      solution: "قد تحتاج إلى إعادة برمجة أو فحص حساس عزم الدوران.",
      steps: [
        "أعد تشغيل المحرك - أطفئه وانتظر 10 ثوان ثم شغله مرة أخرى، قد تختفي اللمبة",
        "افحص مستوى شحن البطارية - نظام EPS يستهلك كهرباء عالية، والبطارية الضعيفة تسبب ظهور اللمبة",
        "افحص فيوز نظام EPS - يوجد في صندوق الفيوزات داخل المحرك أو تحت الطبلون",
        "افحص حساس زاوية عجلة القيادة - قد يحتاج إلى معايرة باستخدام جهاز فحص",
        "تأكد من أن جميع عجلات السيارة مستقيمة وحاول تحريك المقود يميناً ويساراً بالكامل",
        "إذا كان المقود ثقيلاً جداً، قد يكون محرك EPS تالفاً",
        "افحص ريلاي EPS - قد يكون عالقاً أو تالفاً",
        "في بعض السيارات، تحتاج إلى إعادة برمجة وحدة EPS باستخدام جهاز متخصص",
        "قد يكون حساس عزم الدوران في عمود المقود تالفاً ويحتاج تغيير",
        "إذا لم تختفي المشكلة، توجه إلى مركز تخصص كهرباء سيارات لفحص النظام بالكمبيوتر"
      ] 
    },
    { 
      id: "esc", 
      name: "الثبات الإلكتروني", 
      icon: "fa-car-side", 
      color: "#3498DB", 
      system: "ESC", 
      solution: "قد يكون حساس زاوية المقود أو حساس التسارع بحاجة إلى فحص.",
      steps: [
        "أعد تشغيل المحرك - قد تختفي اللمبة بعد إعادة التشغيل إذا كانت ظرفية",
        "افحص حساسات ABS أولاً - نظام ESC يعتمد عليها وخللها يظهر لمبة ESC",
        "تأكد من أن جميع الإطارات بنفس الحجم والمقاس - اختلاف الحجم يسبب خلل في النظام",
        "افحص حساس زاوية المقود - قد يحتاج إلى معايرة بجهاز كمبيوتر متخصص",
        "افصح حساس التسارع الجانبي (Yaw Rate Sensor) - يوجد عادة تحت المقاعد",
        "افحص حساس ضغط الفرامل (Brake Pressure Sensor)",
        "تأكد من أن عجلة القيادة في المنتصف تماماً وليست مائلة",
        "إذا كان هناك عطل في كمبيوتر ABS، سيؤثر على نظام ESC أيضاً",
        "قد يكون أحد حساسات ESC متسخاً أو تالفاً ويحتاج تنظيفاً أو تغييراً",
        "بعد أي إصلاح، تحتاج السيارة إلى معايرة للنظام بجهاز متخصص",
        "لا تقود السياقة بعنف واللمبة مضاءة - نظام ESC لن يعمل في حالة الطوارئ"
      ] 
    },
    { 
      id: "fuel", 
      name: "الوقود", 
      icon: "fa-gas-pump", 
      color: "#2ECC71", 
      system: "نظام الوقود", 
      solution: "تأكد من مستوى الوقود وفحص حساس الوقود.",
      steps: [
        "أول شيء: تأكد من أن خزان الوقود به بنزين كافٍ - قد تكون اللمبة عادية لنقص الوقود",
        "إذا كان الخزان ممتلئاً واللمبة مضاءة، فحساس مستوى الوقود قد يكون تالفاً",
        "حساس الوقود موجود داخل خزان الوقود مع طرمبة البنزين",
        "قد يكون سلك الحساس انقطع أو تأكسد بسبب الرطوبة",
        "افحص فيوز حساس الوقود والطبلون - فيوز تالف يسبب ظهور اللمبة",
        "إذا كان المؤشر يتحرك بشكل غير طبيعي (يقفز)، فالحساس غالباً تالف",
        "قد يكون عمود الحساس عالقاً بسبب الرواسب في الخزان",
        "إصلاح حساس الوقود يحتاج إلى نزع طرمبة البنزين من داخل الخزان",
        "في بعض السيارات، الحساس قطعة واحدة مع الطرمبة ويحتاج تغيير كامل",
        "إذا كان كل شيء يعمل، قد يكون هناك عطل في شاشة الطبلون نفسها",
        "لا تتجاهل المشكلة - حساس تالف قد يسبب نفاد الوقود فجأة دون إنذار"
      ] 
    },
    { 
      id: "door", 
      name: "الأبواب", 
      icon: "fa-car-side", 
      color: "#E67E22", 
      system: "نظام الأمان", 
      solution: "تأكد من إغلاق جميع الأبواب بشكل صحيح.",
      steps: [
        "افتح كل باب على حدة وأغلقه بقوة - تأكد من سماع صوت الإغلاق بوضوح",
        "افحص باب الصندوق الخلفي (الشنطة) - كثير من الناس ينسونه وقد يكون مفتوحاً قليلاً",
        "افحص غطاء المحرك (الزجاج الأمامي) - تأكد من إغلاقه بالكامل",
        "افحص حساسات الأبواب الموجودة في إطار كل باب - هي عبارة عن زر صغير يضغط عند الإغلاق",
        "جرب الضغط على كل حساس بإصبعك - إذا تغيرت اللمبة، الحساس يعمل",
        "إذا كان الحساس لا يعمل، افحص الأسلاك المؤدية إليه فقد تكون منقطعة",
        "قد يكون الحساس تالفاً ويحتاج إلى تغيير - هو قطعة رخيصة الثمن",
        "في بعض السيارات، حساسات الأبواب جزء من قفل الباب نفسه",
        "قد تكون هناك رطوبة داخل الحساس تسبب قصراً كهربائياً (خاصة في السيارات القديمة)",
        "جرب رش بخاخ WD40 على مفصلات الأبواب والحساسات لإزالة الأوساخ"
      ] 
    },
    { 
      id: "seatbelt", 
      name: "حزام الأمان", 
      icon: "fa-user", 
      color: "#F39C12", 
      system: "نظام الأمان", 
      solution: "اربط حزام الأمان بشكل صحيح.",
      steps: [
        "تأكد من أن جميع الركاب (بما فيهم الخلفيين) مربوطون أحزمة الأمان",
        "قد يكون هناك حقيبة أو شيء ثقيل على المقعد - حساس الوزن يشعر بوجود شخص ويطلب الحزام",
        "افحص حساس الحزام في مشبك الحزام - تأكد من أنه يلتقط بشكل صحيح",
        "أخرج لسان الحزام وأدخله مرة أخرى بقوة حتى تسمع صوت طقطقة",
        "افحص وصلة الحساس أسفل المقعد - قد تكون غير موصولة أو الأسلاك مقطوعة",
        "في بعض السيارات، هناك حساس في بكرة سحب الحزام يتحقق من أن الحزام يسحب بسلاسة",
        "قد يكون مؤشر الحزام في الطبلون نفسه تالفاً (خاصة في السيارات القديمة)",
        "جرب ربط حزام الراكب المجاور - قد يختفي التحذير إذا كان الحساس يعمل",
        "إذا استمرت المشكلة، قد يحتاج المشبك أو الحساس إلى تغيير",
        "لا تتجاهل التحذير - حزام الأمان ينقذ الحياة في الحوادث"
      ] 
    },
    { 
      id: "washer", 
      name: "غسالة الزجاج", 
      icon: "fa-tint", 
      color: "#3498DB", 
      system: "نظام الغسيل", 
      solution: "تأكد من مستوى ماء الغسالة وفحص المضخة.",
      steps: [
        "افتح غطاء خزان ماء غسالة الزجاج (عادة شفاف أو أزرق اللون)",
        "إذا كان مستوى الماء منخفضاً، أضف ماء مع سائل غسيل زجاج خاص حتى العلامة MAX",
        "لا تستخدم ماء الصنبور العادي فقط - يفضل إضافة سائل غسيل لأنه ينظف أفضل",
        "إذا كان الخزان ممتلئاً ولكن اللمبة مضاءة، فحساس مستوى الماء قد يكون عالقاً أو تالفاً",
        "حاول تنظيف الحساس الموجود داخل الخزان - قد يكون مغطى بالأوساخ",
        "افحص مضخة غسالة الزجاج - اسحب ذراع الغسيل واستمع لصوت المضخة",
        "إذا لم تسمع صوت المضخة، افحص فيوز الغسالة (موجود في صندوق الفيوزات)",
        "افحص المواسير التي توصل الماء من الخزان إلى فوهات الرش",
        "قد تكون الفوهات مسدودة بالأوساخ أو الشمع - نظفها بإبرة رفيعة",
        "إذا كانت المضخة تعمل ولكن الماء لا يخرج، قد تكون المواسير منفصلة أو مقطوعة",
        "في حالة تلف المضخة، استبدلها - معظم مضخات الغسالة رخيصة وسهلة التغيير"
      ] 
    },
  ], []);

  const handleSelectWarning = useCallback((id) => {
    setSelectedWarning(id);
    setDiagnosisResult(null);
  }, []);

  const handleDiagnose = useCallback(() => {
    if (!selectedWarning) {
      alert("الرجاء اختيار لمبة تحذير أولاً");
      return;
    }
    
    setIsDiagnosing(true);
    // محاكاة طلب تشخيص
    setTimeout(() => {
      try {
        const found = warningLights.find(w => w.id === selectedWarning);
        if (found) {
          setDiagnosisResult(found);
        } else {
          setDiagnosisResult(null);
          alert("لم يتم العثور على تشخيص لهذه اللمبة");
        }
      } catch (error) {
        console.error("خطأ في التشخيص:", error);
        setDiagnosisResult(null);
      } finally {
        setIsDiagnosing(false);
      }
    }, 800);
  }, [selectedWarning, warningLights]);

  return (
    <section id="checker-section" className="section checker-section">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="badge"><i className="fas fa-exclamation-triangle"></i> تشخيص الأعطال</span>
          <h2 className="section-title">ماذا تعني <span className="highlight">لمبة التحذير</span>؟</h2>
          <div className="divider"></div>
          <p className="section-desc">اختر اللمبة المضاءة لتعرف معناها والحل المناسب (14 لمبة تحذير)</p>
        </div>

        <div className="warning-lights-grid animate-on-scroll">
          {warningLights.map((light) => (
            <div 
              key={light.id} 
              className={`warning-light-card ${selectedWarning === light.id ? 'selected' : ''}`}
              onClick={() => handleSelectWarning(light.id)}
            >
              <div className="warning-light-icon" style={{ background: `${light.color}20`, borderColor: light.color }}>
                <i className={`fas ${light.icon}`} style={{ color: light.color }}></i>
              </div>
              <h4>{light.name}</h4>
              {selectedWarning === light.id && <div className="selected-check"><i className="fas fa-check-circle"></i></div>}
            </div>
          ))}
        </div>

        <div className="diagnosis-action-center animate-on-scroll">
          <button 
            className={`diagnose-btn-center ${!selectedWarning ? 'disabled' : ''}`}
            onClick={handleDiagnose}
            disabled={!selectedWarning || isDiagnosing}
          >
            {isDiagnosing ? (
              <><i className="fas fa-spinner fa-spin"></i> جاري التشخيص...</>
            ) : (
              <><i className="fas fa-stethoscope"></i> تشخيص المشكلة</>
            )}
          </button>
        </div>

        {diagnosisResult && diagnosisResult.steps && (
          <div className="diagnosis-result-wrapper ">
            <div className="diagnosis-result">
              <div className="result-header">
                <div className="result-icon" style={{ background: `${diagnosisResult.color}20` }}>
                  <i className={`fas ${diagnosisResult.icon}`} style={{ color: diagnosisResult.color }}></i>
                </div>
                <div className="result-title">
                  <h3>{diagnosisResult.name}</h3>
                  <p>النظام المتأثر: {diagnosisResult.system}</p>
                </div>
              </div>
              <div className="result-body">
                <div className="result-solution">
                  <i className="fas fa-lightbulb"></i>
                  <div>
                    <strong>الحل المقترح:</strong>
                    <p>{diagnosisResult.solution}</p>
                  </div>
                </div>
                <div className="result-steps">
                  <i className="fas fa-list-check"></i>
                  <div>
                    <strong>الخطوات الموصى بها:</strong>
                    <ul>
                      {diagnosisResult.steps.map((step, idx) => (
                        <li key={`step-${idx}`}><i className="fas fa-chevron-left"></i> {step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="result-footer">
                <i className="fas fa-clock"></i>
                <span>لا تتجاهل اللمبة - راجع مركز الصيانة في أقرب وقت</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ==================== سكشن المشاكل الكهربائية ====================
function InteractiveElectricalFaultsSection() {
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedFault, setSelectedFault] = useState("");
  const [diagnosis, setDiagnosis] = useState(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  const toyotaModels = [
    { id: "corolla", name: "كورولا", icon: "fa-car", years: "1966-2024" },
    { id: "camry", name: "كامري", icon: "fa-car-side", years: "1982-2024" },
    { id: "landcruiser", name: "لاندكروزر", icon: "fa-truck", years: "1951-2024" },
    { id: "hilux", name: "هايلوكس", icon: "fa-truck-pickup", years: "1968-2024" },
    { id: "rav4", name: "راف 4", icon: "fa-caravan", years: "1994-2024" },
    { id: "yaris", name: "ياريس", icon: "fa-car", years: "1999-2024" },
    { id: "prado", name: "برادو", icon: "fa-truck", years: "1984-2024" },
    { id: "fortuner", name: "فورتشنر", icon: "fa-truck", years: "2005-2024" },
    { id: "corollaCross", name: "كورولا كروس", icon: "fa-caravan", years: "2020-2024" },
    { id: "supra", name: "سوبرا", icon: "fa-car", years: "1978-2002, 2019-2024" },
    { id: "gr86", name: "GR86", icon: "fa-car", years: "2021-2024" },
    { id: "highlander", name: "هايلاندر", icon: "fa-car-side", years: "2000-2024" },
    { id: "sienna", name: "سيينا", icon: "fa-van", years: "1997-2024" },
    { id: "tundra", name: "توندرا", icon: "fa-truck-pickup", years: "1999-2024" },
    { id: "tacoma", name: "تاكوما", icon: "fa-truck-pickup", years: "1995-2024" },
    { id: "avalon", name: "أفالون", icon: "fa-car-side", years: "1994-2022" },
    { id: "crown", name: "كراون", icon: "fa-car", years: "1955-2024" },
    { id: "prius", name: "بريوس", icon: "fa-bolt", years: "1997-2024" },
    { id: "chr", name: "C-HR", icon: "fa-caravan", years: "2016-2024" },
    { id: "venza", name: "فينزا", icon: "fa-car-side", years: "2008-2017, 2020-2024" },
    { id: "sequoia", name: "سيكويا", icon: "fa-truck", years: "2000-2024" },
    { id: "4runner", name: "4Runner", icon: "fa-truck", years: "1984-2024" },
    { id: "aygo", name: "أيجو", icon: "fa-car", years: "2005-2024" },
    { id: "iq", name: "iQ", icon: "fa-car", years: "2008-2015" },
    { id: "verso", name: "فيرسو", icon: "fa-van", years: "2001-2018" },
    { id: "auris", name: "أوريس", icon: "fa-car", years: "2006-2018" },
    { id: "celica", name: "سيليكا", icon: "fa-car", years: "1970-2006" },
    { id: "mr2", name: "MR2", icon: "fa-car", years: "1984-2007" },
    { id: "gt86", name: "GT86", icon: "fa-car", years: "2012-2021" },
  ];

  const electricalFaults = [
    { 
      id: 1, 
      name: "السيارة لا تدور (استارتر)", 
      icon: "fa-car-side",
      symptoms: "عند إدارة المفتاح، لا يصدر أي صوت أو يصدر صوت طقطقة.",
      causes: "بطارية ضعيفة أو تالفة، تلف في سلف الدينمو (المارش)، مشكلة في فيوز أو relay.",
      solution: "افحص البطارية أولاً. تأكد من نظافة أقطاب البطارية. افحص فيوز الاستارتر.",
      steps: [
        "افحص جهد البطارية - يجب أن يكون 12.4 فولت على الأقل. إذا كان أقل، اشحن البطارية أو استبدلها",
        "تأكد من نظافة أقطاب البطارية - نظفها بفرشاة سلكية إذا كانت متأكسدة",
        "افحص فيوز الاستارتر في صندوق الفيوزات (قد يكون 30 أو 40 أمبير)",
        "افحص ريلاي الاستارتر - استبدله بآخر مماثل وجرب (ريلاي التكييف غالباً نفس القياس)",
        "اختبر سلك الإشارة القادم من مفتاح التشغيل إلى الاستارتر باستخدام أفوميتر",
        "إذا كان السلك يوصل 12 فولت عند إدارة المفتاح، فالاستارتر تالف ويحتاج تغيير",
        "اضرب على جسم الاستارتر برفق باستخدام عصا خشبية - قد يحرك الفرش العالقة",
        "إذا دارت السيارة بعد الضرب، فهذا يعني أن الفرش متآكلة وتحتاج تغيير سريع",
        "تغيير الاستارتر: افصل البطارية أولاً، ثم أزل البراغي التي تثبته",
        "عند تركيب استارتر جديد، تأكد من ربط جميع الأسلاك بشكل صحيح",
        "جرب تشغيل السيارة - إذا دارت بشكل طبيعي، المشكلة حُلّت"
      ]
    },
    { 
      id: 2, 
      name: "الدينمو لا يشحن", 
      icon: "fa-battery-full",
      symptoms: "لمبة البطارية مضاءة أثناء القيادة، ضعف في الإضاءة، صوت صفير من الدينمو.",
      causes: "تلف منظم الجهد، تآكل فرش الكربون، انقطاع سير الدينمو.",
      solution: "افحص شد السير. قس جهد البطارية أثناء التشغيل.",
      steps: [
        "شغل المحرك وافحص جهد البطارية - يجب أن يكون بين 13.5 و 14.5 فولت",
        "إذا كان الجهد أقل من 13 فولت، الدينمو لا يشحن بشكل كافٍ",
        "أطفئ المحرك وافحص شد سير الدينمو - السير يجب أن يكون مشدوداً ولا ينزلق",
        "إذا كان السير رخواً، شدّه باستخدام آلية الشد الموجودة على الدينمو",
        "افحص السير بحثاً عن تشققات أو تآكل - إذا كان تالفاً، استبدله",
        "افحص توصيلات الأسلاك في الدينمو - تأكد من أنها محكمة وغير متأكسدة",
        "افحص فيوز الشحن الرئيسي (عادة 100-120 أمبير) في صندوق الفيوزات",
        "إذا كان كل شيء سليماً، قد يكون منظم الجهد الداخلي أو فرش الكربون تالفة",
        "الدينمو يحتاج إلى صيانة: يمكن تغيير الفرش والمنظم دون تغيير الدينمو كاملاً",
        "إذا كان الدينمو ي發出 صوت صفير، فهذا يعني أن البيرنج (الرولمان بلي) تالف",
        "اختبر الدينمو خارج السيارة عند فني متخصص قبل شراء دينمو جديد",
        "تأكد من أن بطاريتك سليمة - بطارية تالفة تجهد الدينمو وتسبب تلفه"
      ]
    },
    { 
      id: 3, 
      name: "الأنوار الخلفية لا تعمل", 
      icon: "fa-lightbulb",
      symptoms: "عند تشغيل الأنوار، الإضاءة الخلفية مطفية أو ضعيفة جداً.",
      causes: "فيوز منفصل للأنوار الخلفية، مشكلة في الطبلون، تلف في اللمبات.",
      solution: "افحص فيوز الأنوار الخلفية. جرب تغيير اللمبات.",
      steps: [
        "افحص فيوز الأنوار الخلفية في صندوق الفيوزات (عادة 10 أو 15 أمبير)",
        "إذا كان الفوز منصهراً، استبدله بآخر بنفس الأمبير - لا تزيد الأمبير أبداً",
        "إذا انصهر الفيوز مرة أخرى، هناك قصر كهربائي في دائرة الإضاءة الخلفية",
        "افحص لمبات الأنوار الخلفية: انزع الغطاء وأخرج اللمبة",
        "تفقد خيط اللمبة - إذا كان مقطوعاً، اللمبة تالفة وتحتاج تغيير",
        "عند تغيير اللمبة، استخدم لمبة بنفس المواصفات (مثل P21W, 1157)",
        "لا تلمس اللمبة الجديدة بيدك العارية - الزيت من يدك يقلل عمر اللمبة",
        "افحص أطراف توصيل اللمبة - قد تكون متأكسدة، نظفها بورق صنفرة ناعم",
        "افحص التوصيلات الكهربائية في كتلة الأنوار الخلفية",
        "افحص سلك الأرضي (Groud) للإضاءة الخلفية - تأكد من أنه مربوط بشكل جيد",
        "إذا كانت كل المصابيح لا تعمل، قد يكون مفتاح الأنوار تالفاً",
        "قد تكون وحدة التحكم في الإضاءة (BCM) تحتاج إلى إعادة برمجة"
      ]
    },
    { 
      id: 4, 
      name: "حساس ABS عطلان", 
      icon: "fa-car-crash",
      symptoms: "لمبة ABS مضاءة، نظام ABS لا يعمل أثناء الفرامل القوية.",
      causes: "حساس متسخ أو تالف، انقطاع في سلك الحساس، مشكلة في حلقة reluctor.",
      solution: "نظف الحساسات أولاً. افحص الأسلاك والوصلات. اقرأ كود العطل.",
      steps: [
        "استخدم جهاز فحص لقراءة كود العطل - سيعرفك أي حساس تالف (يمين أمامي، يسار خلفي، إلخ)",
        "ارفع السيارة على رافعة أو استخدم جاك لتأمين العجلة المطلوبة",
        "انزع العجلة للوصول إلى حساس ABS الموجود خلف محور العجلة",
        "افحص الحساس بصرياً - قد يكون مغطى بالأوساخ أو برادة الحديد",
        "نظف الحساس باستخدام قطعة قماش جافة ورذاذ تنظيف المكابح - لا تستخدم الماء أبداً",
        "افحص حلقة الاستشعار (Reluctor Ring) - تأكد من عدم وجود تشققات أو أسنان مكسورة",
        "افحص السلك الكهربائي للحساس من البداية حتى النهاية بحثاً عن قطع أو تآكل",
        "اختبر الحساس باستخدام الأفوميتر - يجب أن تكون المقاومة بين 800 و 2000 أوم",
        "إذا كانت المقاومة غير طبيعية أو لا نهائية، الحساس تالف ويحتاج تغيير",
        "عند تغيير الحساس، اشترِ قطعة أصلية وليس تقليداً - الحساس مهم للسلامة",
        "بعد التنظيف أو التغيير، امسح كود العطل بجهاز الفحص",
        "اختبر الفرامل بقوة في مكان آمن - يجب أن تشعر بنبضات في دواسة الفرامل (ABS يعمل)"
      ]
    },
    { 
      id: 5, 
      name: "قير CVT لا يستجيب", 
      icon: "fa-cogs",
      symptoms: "تأخر في الاستجابة، رجة عند التعشيق، تسارع غير طبيعي.",
      causes: "مشكلة في حساس عمود الكامات، عطل في solenoid القير، انخفاض زيت القير.",
      solution: "افحص مستوى زيت القير أولاً. قد يحتاج إلى برمجة.",
      steps: [
        "أوقف السيارة على أرض مستوية والمحرك شغال وفي وضع N أو P",
        "أخرج عصا قياس زيت القير (إذا موجودة) - ليست كل CVT لها عصا قياس",
        "امسح العصا بقطعة قماش بيضاء لترى لون الزيت - الزيت السليم أحمر وليس له رائحة حرق",
        "إذا كان الزيت أسود أو له رائحة حرق، فالقير يعاني من حرارة زائدة ويحتاج صيانة",
        "إذا كان مستوى الزيت منخفضاً، أضف زيت CVT مخصص حسب نوع سيارتك (تويوتا تستخدم Toyota CVT Fluid)",
        "لا تستخدم زيت CVT عاماً - كل شركة لها مواصفاتها الخاصة",
        "افحص حساس عمود الكامات (Neutral Safety Switch) - إذا تالف، يمنع القير من التعشيق",
        "قد يكون صمام الملف اللولبي (Solenoid) في القير تالفاً ويحتاج تغيير",
        "القير CVT يحتاج إلى برمجة وتحديث باستخدام جهاز تويوتا المتخصص إذا ظهرت أعطال إلكترونية",
        "إذا كان هناك رجة عند التعشيق، قد تكون قاعدة القير (Mount) تالفة",
        "تغيير زيت القير كل 60,000 كم يطيل عمر القير ويمنع المشاكل",
        "إذا استمرت المشكلة، توجه إلى متخصص في القيرات CVT"
      ]
    },
    { 
      id: 6, 
      name: "المكيف لا يبرد", 
      icon: "fa-snowflake",
      symptoms: "الهواء الخارج من المكيف دافئ، ضعف في التبريد.",
      causes: "نقص غاز المكيف، تلف كمبروسر المكيف، مشكلة في حساسات المكيف.",
      solution: "افحص ضغط غاز المكيف. تأكد من عمل كمبروسر المكيف.",
      steps: [
        "شغل المحرك وشغل المكيف على أقصى برودة وأقصى سرعة مروحة",
        "افتح غطاء المحرك وانظر إلى كمبروسر المكيف - هل الجزء الأوسط منه يدور؟",
        "إذا كان الكمبروسر لا يدور، افحص فيوز المكيف وريلاي المكيف",
        "إذا كان الكمبروسر يدور، المس الأنبوب السميك القادم منه (يجب أن يكون بارداً)",
        "إذا كان الأنبوب ليس بارداً، هناك نقص في غاز المكيف أو الكمبروسر لا يضغط",
        "افحص ضغط غاز المكيف باستخدام جهاز قياس الضغط",
        "الضغط الطبيعي على الجانب المنخفض (Low Side) بين 25-45 PSI",
        "إذا كان الضغط منخفضاً، تحتاج إلى تعبئة غاز المكيف (Freon/R134a)",
        "إذا كان الضغط مرتفعاً جداً أو منخفضاً جداً، قد يكون هناك انسداد أو تسريب",
        "افحص وجود زيت في غاز المكيف - الزيت يدل على تسريب من الكمبروسر نفسه",
        "قد يكون صمام التمدد (Expansion Valve) عالقاً ولا يسمح بمرور الغاز",
        "إذا كان كل شيء سليماً، قد يكون حساس درجة حرارة المبخر تالفاً",
        "تعبئة المكيف تحتاج جهازاً خاصاً - الأفضل أن يقوم بها فني متخصص"
      ]
    },
    { 
      id: 7, 
      name: "السماعة لا تعمل", 
      icon: "fa-volume-up",
      symptoms: "لا يوجد صوت من السماعات، أو صوت مشوش.",
      causes: "فيوز السماعات منفصلاً، مشكلة في الراديو أو الشاشة، تلف السماعة نفسها.",
      solution: "افحص فيوز الراديو أولاً ثم تأكد من توصيلات السماعات.",
      steps: [
        "افحص فيوز الراديو والسماعات في صندوق الفيوزات داخل السيارة أو تحت غطاء المحرك",
        "إذا كان الفيوز منصهراً، استبدله بآخر بنفس الأمبير",
        "إذا لم يكن الفيوز هو المشكلة، حاول إعادة تشغيل الراديو بالضغط على زر إعادة الضبط (عادة زر صغير)",
        "افحص إعدادات الصوت في الراديو - تأكد من أن التوازن (Balance/Fader) في المنتصف",
        "تأكد من أن الصوت ليس مكتوماً (Mute)",
        "إذا كانت سيارة قديمة، افحص السماعة نفسها - انزع الغطاء البلاستيكي للباب",
        "افحص أسلاك السماعة - تأكد من أنها موصولة وغير مقطوعة",
        "اختبر السماعة ببطارية صغيرة (1.5 فولت) - إذا أصدرت صوت طقطقة، السماعة سليمة",
        "إذا كانت السماعة تالفة، استبدلها بواحدة بنفس المقاومة (4 أوم أو 8 أوم)",
        "قد يكون الراديو أو الشاشة نفسها تالفة وتحتاج إلى صيانة أو تغيير",
        "إذا كان هناك صوت ولكن مشوش، قد تكون السماعة ممزقة أو المكبر (Amplifier) تالف",
        "في السيارات الحديثة، قد تحتاج الشاشة إلى تحديث برامج أو إعادة ضبط المصنع"
      ]
    },
    { 
      id: 8, 
      name: "الطبلون لا يعمل", 
      icon: "fa-tachometer-alt",
      symptoms: "عدادات الطبلون لا تعمل، الإضاءة الخلفية مطفية.",
      causes: "فيوز الطبلون، مشكلة في كمبيوتر الطبلون، انقطاع في الأسلاك.",
      solution: "افحص فيوز الطبلون أولاً. قد يحتاج الطبلون إلى إعادة برمجة.",
      steps: [
        "افحص فيوز الطبلون (عادة 10 أو 15 أمبير) في صندوق الفيوزات داخل السيارة",
        "إذا كان الفيوز منصهراً، استبدله بآخر بنفس الأمبير",
        "إذا انصهر مرة أخرى، هناك قصر كهربائي في دائرة الطبلون",
        "افصل البطارية لمدة 5 دقائق ثم أعد توصيلها - قد يعيد ضبط الكمبيوتر ويصلح المشكلة",
        "افحص التوصيلات الكهربائية خلف الطبلون - قد تكون غير مثبتة بشكل جيد",
        "قد تحتاج إلى نزع الطبلون (إطار حول الطبلون) للوصول إلى التوصيلات الخلفية",
        "افحص أسلاك الأرضي (Ground) الخاصة بالطبلون",
        "في بعض السيارات، كمبيوتر الطبلون منفصل ويحتاج إلى فحصه",
        "قد يكون هناك حساس سرعة (VSS) تالف إذا كانت عداد السرعة فقط لا يعمل",
        "إذا كانت الإضاءة فقط لا تعمل، قد يكون مفتاح الإضاءة أو لمبات الطبلون الخلفية تالفة",
        "قد يحتاج الطبلون إلى إعادة برمجة بواسطة جهاز تويوتا المتخصص",
        "إذا لم تنجح أي من هذه الحلول، قد يحتاج الطبلون إلى تغيير كامل"
      ]
    }
  ];

  const handleDiagnose = () => {
    if (!selectedModel || !selectedFault) return;
    setIsDiagnosing(true);
    setTimeout(() => {
      const found = electricalFaults.find(f => f.id === parseInt(selectedFault));
      setDiagnosis(found);
      setIsDiagnosing(false);
    }, 800);
  };

  const resetDiagnosis = () => {
    setSelectedModel("");
    setSelectedFault("");
    setDiagnosis(null);
  };

  return (
    <section className="section interactive-faults-section">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="badge"><i className="fas fa-bug"></i> تشخيص الأعطال الكهربائية</span>
          <h2 className="section-title">مشاكل <span className="highlight">كهربائية</span> شائعة</h2>
          <div className="divider"></div>
          <p className="section-desc">اختر موديل سيارتك ونوع العطل للحصول على التشخيص الدقيق</p>
        </div>

        <div className="fault-diagnosis-container animate-on-scroll">
          <div className="fault-selectors">
            <div className="selector-group">
              <label><i className="fas fa-car"></i> موديل السيارة</label>
              <div className="custom-select-wrapper">
                <select className="custom-select" value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
                  <option value="">-- اختر الموديل --</option>
                  {toyotaModels.map(model => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="selector-group">
              <label><i className="fas fa-microchip"></i> نوع العطل الكهربائي</label>
              <div className="custom-select-wrapper">
                <select className="custom-select" value={selectedFault} onChange={(e) => setSelectedFault(e.target.value)}>
                  <option value="">-- اختر العطل --</option>
                  {electricalFaults.map(fault => (
                    <option key={fault.id} value={fault.id}>{fault.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="selector-actions">
              <button className="diagnose-fault-btn" onClick={handleDiagnose} disabled={!selectedModel || !selectedFault || isDiagnosing}>
                {isDiagnosing ? <><i className="fas fa-spinner fa-spin"></i> جاري التشخيص...</> : <><i className="fas fa-stethoscope"></i> تشخيص العطل</>}
              </button>
              <button className="reset-btn" onClick={resetDiagnosis}>
                <i className="fas fa-undo-alt"></i> تصفير
              </button>
            </div>
          </div>

          {diagnosis && (
            <div className="fault-diagnosis-result">
              <div className="diagnosis-header">
                <div className="diagnosis-fault-icon">
                  <i className={`fas ${diagnosis.icon}`}></i>
                </div>
                <h3>{diagnosis.name}</h3>
                <p>موديل السيارة: {toyotaModels.find(m => m.id === selectedModel)?.name}</p>
              </div>
              <div className="diagnosis-body">
                <div className="diagnosis-card">
                  <div className="card-title"><i className="fas fa-stethoscope"></i> الأعراض</div>
                  <p>{diagnosis.symptoms}</p>
                </div>
                <div className="diagnosis-card">
                  <div className="card-title"><i className="fas fa-microscope"></i> الأسباب المحتملة</div>
                  <p>{diagnosis.causes}</p>
                </div>
                <div className="diagnosis-card solution-card">
                  <div className="card-title"><i className="fas fa-wrench"></i> الحلول والإجراءات</div>
                  <p>{diagnosis.solution}</p>
                  <div className="solution-steps">
                    {diagnosis.steps.map((step, idx) => (
                      <div key={idx} className="step-item"><i className="fas fa-check-circle"></i><span>{step}</span></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="diagnosis-footer">
                <i className="fas fa-shield-alt"></i>
                <span>نصيحة: الأعطال الكهربائية قد تؤثر على سلامة القيادة - لا تتأخر في الإصلاح</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ==================== نصائح الصيانة الكهربائية ====================
function ElectricalTipsSection() {
  const tips = [
    { icon: "fa-battery-full", title: "البطارية", desc: "افحص البطارية كل 6 أشهر ونظف الأقطاب من الأكاسيد", level: "هام جداً", color: "#E31837" },
    { icon: "fa-microchip", title: "كمبيوتر السيارة", desc: "قم بفحص الكمبيوتر دورياً للكشف عن الأعطال المخفية", level: "مهم", color: "#3498DB" },
    { icon: "fa-car", title: "الدينمو", desc: "تأكد من شحن الدينمو للبطارية بشكل صحيح", level: "مهم", color: "#27AE60" },
    { icon: "fa-lightbulb", title: "الإضاءة", desc: "افحص جميع اللمبات شهرياً لضمان سلامة القيادة الليلية", level: "نصيحة", color: "#F39C12" },
    { icon: "fa-snowflake", title: "المكيف", desc: "شغل المكيف 10 دقائق أسبوعياً للحفاظ على ضغط الغاز", level: "نصيحة", color: "#1ABC9C" },
    { icon: "fa-microphone-alt", title: "الحساسات", desc: "تنظيف الحساسات يحسن أداء المحرك ويقلل استهلاك الوقود", level: "مهم", color: "#9B59B6" },
    { icon: "fa-plug", title: "الفيوزات", desc: "استخدم فيوزات بالتيار المطلوب - لا تزيد الأمبير", level: "هام جداً", color: "#E67E22" },
    { icon: "fa-charging-station", title: "نظام الشحن", desc: "افحص جهد الشحن عند 2000 دورة يجب أن يكون 13.5-14.5 فولت", level: "مهم", color: "#2ECC71" },
  ];

  return (
    <section className="section tips-section">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <span className="badge"><i className="fas fa-lightbulb"></i> نصائح كهربائية</span>
          <h2 className="section-title">نصائح <span className="highlight">للصيانة الكهربائية</span></h2>
          <div className="divider"></div>
          <p className="section-desc">نصائح مهمة للحفاظ على الأنظمة الكهربائية في سيارتك تويوتا</p>
        </div>
        <div className="tips-grid">
          {tips.map((tip, idx) => (
            <div key={idx} className="tip-card animate-on-scroll">
              <div className="tip-icon" style={{ background: `${tip.color}20`, color: tip.color }}><i className={`fas ${tip.icon}`}></i></div>
              <div className="tip-content"><h3>{tip.title}</h3><p>{tip.desc}</p><span className="tip-level" style={{ background: tip.color }}>{tip.level}</span></div>
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
    { icon: "fa-microchip", number: "8+", label: "أنظمة كهربائية", color: "#E31837" },
    { icon: "fa-car", number: "15+", label: "موديل تويوتا", color: "#3498DB" },
    { icon: "fa-user-check", number: "30K+", label: "عميل راضي", color: "#27AE60" },
    { icon: "fa-microscope", number: "100%", label: "تشخيص دقيق", color: "#F39C12" },
    { icon: "fa-certificate", number: "100%", label: "قطع غيار أصلية", color: "#9B59B6" },
    { icon: "fa-trophy", number: "20+", label: "سنة خبرة", color: "#E31837" },
  ];

  return (
    <section className="section stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card animate-on-scroll">
              <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}><i className={`fas ${stat.icon}`}></i></div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}