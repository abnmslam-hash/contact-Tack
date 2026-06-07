import React, { useState, useEffect } from "react";
import "./oane.css";

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      <HeroSection scrollToSection={scrollToSection} />
      <AccidentRepairSection />
      <DamageCheckerSection />
      <SmartDamageAssistant />
      <RepairTipsSection />
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
            <span className="hero-badge"><i className="fas fa-car-crash"></i> صيانة الحوادث والبودي المعتمدة</span>
            <h1 className="hero-title"><span className="highlight">إصلاح الحوادث</span><br />و<span className="highlight">البودي</span> لسيارات تويوتا</h1>
            <p className="hero-desc">مركز متخصص في إصلاح حوادث سيارات تويوتا، نقدم خدمات السمكرة والدهان واستبدال قطع البودي بقطع غيار أصلية 100%، مع ضمان على جميع الإصلاحات.</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="stat-number">25+</span><span className="stat-label">فني بودي معتمد</span></div>
              <div className="hero-stat"><span className="stat-number">10K+</span><span className="stat-label">سيارة تم إصلاحها</span></div>
              <div className="hero-stat"><span className="stat-number">100%</span><span className="stat-label">قطع غيار أصلية</span></div>
            </div>
            <button className="hero-discover-btn" onClick={() => scrollToSection("smart-assistant")}>
              <i className="fas fa-microscope"></i> المساعد الذكي <i className="fas fa-arrow-left"></i>
            </button>
          </div>
          <div className="hero-image animate-on-scroll">
            <div className="hero-image-wrapper">
              <div className="hero-placeholder"><i className="fas fa-paint-roller"></i><h3>إصلاح احترافي للبودي</h3><p>دهان إلكتروني - سمكرة - هيكل</p></div>
              <div className="floating-card floating-card-1"><i className="fas fa-microscope"></i><span>فحص هيكل إلكتروني</span></div>
              <div className="floating-card floating-card-2"><i className="fas fa-certificate"></i><span>ضمان على الإصلاحات</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== Accident Repair Section ====================
function AccidentRepairSection() {
  const [selectedDamage, setSelectedDamage] = useState("all");
  const [selectedModel, setSelectedModel] = useState("all");
  const [savedServices, setSavedServices] = useState({});
  const [selectedService, setSelectedService] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  
  const damageTypes = [
    { id: "all", name: "جميع الخدمات", icon: "fa-tools", color: "#E31837", desc: "استعراض جميع خدمات الإصلاح" },
    { id: "body", name: "إصلاح البودي", icon: "fa-car", color: "#3498DB", desc: "سمكرة وتعديل الهيكل الخارجي" },
    { id: "painting", name: "الدهان", icon: "fa-paint-roller", color: "#0EA5E9", desc: "دهان إلكتروني وتلميع" },      // تغيير من #27AE60
    { id: "frame", name: "إصلاح الهيكل", icon: "fa-chassis", color: "#F39C12", desc: "تعديل الهيكل على منصة" },
    { id: "glass", name: "الزجاج", icon: "fa-window-maximize", color: "#0EA5E9", desc: "استبدال وإصلاح الزجاج" },   // تغيير من #1ABC9C
    { id: "bumper", name: "الصدامات", icon: "fa-car-bumper", color: "#9B59B6", desc: "لحام واستبدال الصدامات" },
  ];
  
  const models = [
    { id: "all", name: "جميع الموديلات", icon: "fa-th-large", color: "#E31837" },
    { id: "corolla", name: "كورولا", icon: "fa-car", color: "#3498DB" },
    { id: "camry", name: "كامري", icon: "fa-car-side", color: "#0EA5E9" },      // تغيير من #27AE60
    { id: "landcruiser", name: "لاندكروزر", icon: "fa-truck", color: "#F39C12" },
    { id: "hilux", name: "هايلوكس", icon: "fa-truck-pickup", color: "#9B59B6" },
    { id: "rav4", name: "راف 4", icon: "fa-caravan", color: "#0EA5E9" },        // تغيير من #1ABC9C
  ];
  
  const repairData = {
    body: [{ id: 1, name: "إصلاح الخدوش السطحية", part: "معجون بودي", time: "1-2 يوم", importance: "حسب الحالة", warning: "يتم التلميع بعد المعجون", category: "البودي", steps: ["تنظيف المنطقة", "صنفرة", "معجون", "تنعيم"] }],
    painting: [{ id: 2, name: "دهان كامل للسيارة", part: "دهان إلكتروستاتيك", time: "7-10 أيام", importance: "حسب الحالة", warning: "إزالة القديم ثم الدهان", category: "الدهان", steps: ["إزالة الدهان", "تحضير السطح", "دهان الطبقات", "تلميع"] }],
    frame: [{ id: 3, name: "فحص الهيكل إلكترونياً", part: "جهاز قياس إلكتروني", time: "ساعتين", importance: "إلزامي", warning: "يحدد التواءات الهيكل", category: "الهيكل", steps: ["تثبيت السيارة", "قياس الأبعاد", "تقرير مفصل"] }],
    glass: [{ id: 4, name: "استبدال الزجاج الأمامي", part: "زجاج تويوتا أصلي", time: "نصف يوم", importance: "حسب الحالة", warning: "يحتاج مادة لاصقة خاصة", category: "الزجاج", steps: ["إزالة الزجاج", "تنظيف الإطار", "تركيب زجاج جديد"] }],
    bumper: [{ id: 5, name: "إصلاح الصدام الأمامي", part: "لحام بلاستيك", time: "1-2 يوم", importance: "حسب الحالة", warning: "قد يحتاج دهان", category: "الصدامات", steps: ["فك الصدام", "لحام الشقوق", "دهان"] }],
  };
  
  const getCurrentServices = () => {
    if (selectedDamage === "all") return Object.values(repairData).flat();
    return repairData[selectedDamage] || [];
  };
  const currentServices = getCurrentServices();
  const currentDamageType = damageTypes.find(d => d.id === selectedDamage);
  const handleSave = (id) => setSavedServices(prev => ({ ...prev, [id]: !prev[id] }));
  const handleServiceClick = (service) => { setSelectedService(service); document.body.style.overflow = "hidden"; };
  const closeModal = () => { setSelectedService(null); document.body.style.overflow = "auto"; };
  const servicesByCategory = currentServices.reduce((acc, s) => { acc[s.category] = [...(acc[s.category] || []), s]; return acc; }, {});
  const categoryIcons = { "البودي": "fa-car", "الدهان": "fa-paint-roller", "الهيكل": "fa-chassis", "الزجاج": "fa-window-maximize", "الصدامات": "fa-car-bumper" };
  
  return (
    <section className="section accident-section">
      <div className="container">
        <div className="section-header"><span className="badge"><i className="fas fa-car-crash"></i> صيانة الحوادث والبودي</span><h2 className="section-title">إصلاح <span className="highlight">حوادث تويوتا</span></h2><div className="divider"></div><p className="section-desc">خدمات متخصصة في إصلاح الحوادث وترميم البودي بقطع غيار أصلية</p></div>
        <div className="model-filter"><div className="filter-title"><i className="fas fa-car"></i><span>اختر موديل سيارتك</span></div><div className="filter-buttons">{models.map(m => (<button key={m.id} className={`model-btn ${selectedModel === m.id ? "active" : ""}`} onClick={() => setSelectedModel(m.id)} style={{ borderColor: selectedModel === m.id ? m.color : "rgba(255,255,255,0.2)", background: selectedModel === m.id ? `${m.color}15` : "transparent" }}><i className={`fas ${m.icon}`} style={{ color: m.color }}></i><span>{m.name}</span></button>))}</div></div>
        <div className="damage-filter"><div className="filter-title"><i className="fas fa-tools"></i><span>اختر نوع الإصلاح</span></div><div className="damage-buttons">{damageTypes.map(d => (<button key={d.id} className={`damage-btn ${selectedDamage === d.id ? "active" : ""}`} onClick={() => setSelectedDamage(d.id)}><div className="damage-icon" style={{ background: `${d.color}20`, color: d.color }}><i className={`fas ${d.icon}`}></i></div><div className="damage-info"><span className="damage-name">{d.name}</span><span className="damage-desc">{d.desc}</span></div></button>))}</div></div>
        <div className="current-damage-banner"><div className="banner-content"><div className="banner-icon" style={{ background: `${currentDamageType?.color}20` }}><i className={`fas ${currentDamageType?.icon}`} style={{ color: currentDamageType?.color }}></i></div><div className="banner-text"><h3>{currentDamageType?.name}</h3><p>{currentDamageType?.desc} لسيارة {selectedModel === "all" ? "تويوتا" : models.find(m => m.id === selectedModel)?.name}</p></div><div className="banner-badge" style={{ background: currentDamageType?.color }}>قطع غيار أصلية</div></div></div>
        {Object.keys(servicesByCategory).length > 0 ? (
          <div className="repair-categories">{Object.entries(servicesByCategory).map(([cat, services]) => (<div key={cat} className="category-section"><div className="category-header" onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}><div className="category-icon"><i className={`fas ${categoryIcons[cat] || "fa-tools"}`}></i></div><h3>{cat}</h3><div className="category-line"></div><div className="category-count">{services.length} خدمة</div><div className="category-expand"><i className={`fas fa-chevron-${activeCategory === cat ? "up" : "down"}`}></i></div></div><div className={`category-services ${activeCategory === cat ? "active" : ""}`}><div className="repair-grid">{services.map(s => (<div key={s.id} className="repair-card" onClick={() => handleServiceClick(s)}><div className="card-header"><div className="card-icon"><i className="fas fa-tools"></i></div><button className={`save-btn ${savedServices[s.id] ? "saved" : ""}`} onClick={(e) => { e.stopPropagation(); handleSave(s.id); }}><i className="fas fa-bookmark"></i></button></div><h4>{s.name}</h4><div className="card-details"><div className="detail-item"><i className="fas fa-microchip"></i><span>{s.part}</span></div><div className="detail-item"><i className="far fa-clock"></i><span>{s.time}</span></div></div><div className={`importance-tag ${s.importance === "إلزامي" ? "critical" : s.importance === "مهم" ? "important" : "normal"}`}>{s.importance}</div><div className="warning-tag"><i className="fas fa-exclamation-triangle"></i><span>{s.warning}</span></div></div>))}</div></div></div>))}</div>
        ) : <div className="no-services"><i className="fas fa-car-crash"></i><h4>لا توجد خدمات حالياً</h4><p>سيتم إضافة خدمات إصلاح الحوادث لهذا القسم قريباً</p></div>}
        <div className="quick-tips"><div className="tips-header"><i className="fas fa-lightbulb"></i><h3>نصائح مهمة بعد الحادث</h3></div><div className="tips-list"><div className="tip-item"><i className="fas fa-check-circle"></i><span>لا تتحرك من مكان الحادث حتى وصول المرور</span></div><div className="tip-item"><i className="fas fa-check-circle"></i><span>وثق الأضرار بالصور من جميع الزوايا</span></div><div className="tip-item"><i className="fas fa-check-circle"></i><span>تأكد من وجود تقرير مروري رسمي</span></div><div className="tip-item"><i className="fas fa-check-circle"></i><span>لا توقع على أي إقرار دون قراءته جيداً</span></div><div className="tip-item"><i className="fas fa-check-circle"></i><span>اختر مركز صيانة معتمد لضمان قطع الغيار الأصلية</span></div></div></div>
        {selectedService && (<div className="modal-overlay" onClick={closeModal}><div className="modal-content" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={closeModal}><i className="fas fa-times"></i></button><div className="modal-service-icon"><i className="fas fa-tools"></i></div><h2>{selectedService.name}</h2><div className="modal-info-grid"><div className="modal-info-item"><i className="fas fa-microchip"></i><div><label>قطع الغيار</label><span>{selectedService.part}</span></div></div><div className="modal-info-item"><i className="far fa-clock"></i><div><label>الوقت المتوقع</label><span>{selectedService.time}</span></div></div><div className="modal-info-item"><i className="fas fa-tag"></i><div><label>الأهمية</label><span>{selectedService.importance}</span></div></div><div className="modal-info-item"><i className="fas fa-car"></i><div><label>الموديل</label><span>{selectedModel === "all" ? "جميع الموديلات" : models.find(m => m.id === selectedModel)?.name}</span></div></div></div><div className="modal-description"><h3><i className="fas fa-info-circle"></i> معلومات عن الخدمة</h3><p>{selectedService.warning}</p><div className="repair-steps"><h4><i className="fas fa-list-ol"></i> خطوات الإصلاح:</h4><ul>{selectedService.steps.map((step, idx) => (<li key={idx}><i className="fas fa-check"></i> {step}</li>))}</ul></div><div className="accident-warning"><i className="fas fa-shield-alt"></i><span>جميع قطع الغيار المستخدمة أصلية 100% من تويوتا مع ضمان لمدة سنة</span></div></div><div className="modal-actions"><button className="btn-primary" onClick={closeModal}><i className="fas fa-check"></i>فهمت</button></div></div></div>)}
      </div>
    </section>
  );
}

// ==================== Damage Checker Section ====================
function DamageCheckerSection() {
  const [damageType, setDamageType] = useState("");
  const [result, setResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const damages = [
    { id: "scratch", name: "خدوش سطحية", icon: "fa-paint-brush", color: "#3498DB", level: "بسيط", solution: "تلميع أو معجون بسيط", time: "نصف يوم - يوم", steps: ["تنظيف المنطقة", "تلميع ميكانيكي", "معجون إذا لزم الأمر", "تلميع نهائي"] },
    { id: "dent", name: "انبعاجات بسيطة", icon: "fa-hammer", color: "#F39C12", level: "متوسط", solution: "سمكرة خفيفة + معجون", time: "1-2 يوم", steps: ["سحب الانبعاج", "تنعيم السطح", "وضع المعجون", "صنفرة", "تحضير للدهان"] },
    { id: "bumper", name: "تلف في الصدام", icon: "fa-car-bumper", color: "#E67E22", level: "متوسط", solution: "لحام بلاستيك أو استبدال", time: "2-3 أيام", steps: ["فحص الصدام", "لحام الشقوق", "تنعيم السطح", "دهان الصدام", "تركيب"] },
    { id: "door", name: "تلف في الأبواب", icon: "fa-car-side", color: "#E31837", level: "كبير", solution: "سمكرة أو استبدال الباب", time: "3-5 أيام", steps: ["فحص الباب", "سحب الانبعاجات", "معجون", "دهان", "تركيب الزجاج والمقابض"] },
    { id: "frame", name: "تلف في الهيكل", icon: "fa-chassis", color: "#9B59B6", level: "خطير", solution: "فحص هيكل وتعديل على منصة", time: "5-10 أيام", steps: ["فحص إلكتروني للهيكل", "تثبيت على المنصة", "سحب الهيكل", "قياسات دقيقة", "فحص نهائي"] },
    { id: "glass", name: "كسر في الزجاج", icon: "fa-window-maximize", color: "#0EA5E9", level: "متوسط", solution: "استبدال الزجاج", time: "نصف يوم", steps: ["إزالة الزجاج المكسور", "تنظيف الإطار", "تركيب زجاج جديد", "تثبيت بمادة لاصقة"] },  // تغيير من #1ABC9C
    { id: "headlight", name: "تلف في المصابيح", icon: "fa-lightbulb", color: "#F39C12", level: "متوسط", solution: "استبدال المصباح المتضرر", time: "1-2 ساعة", steps: ["فحص المصباح", "فك الغطاء", "استبدال اللمبة أو العدسة", "إعادة التركيب واختبار الإضاءة"] },
    { id: "fender", name: "تلف في الرفرف", icon: "fa-car", color: "#E67E22", level: "كبير", solution: "سمكرة الرفرف أو استبداله", time: "2-3 أيام", steps: ["فك الرفرف التالف", "سحب الانبعاجات", "معجون", "دهان", "إعادة التركيب"] }
  ];
  const handleCheck = () => {
    if (!damageType) return;
    setIsChecking(true);
    setTimeout(() => {
      const found = damages.find(d => d.id === damageType);
      setResult(found);
      setIsChecking(false);
    }, 600);
  };
  const getLevelColor = (level) => {
    switch(level) {
      case "بسيط": return "#0EA5E9";   // تغيير من #27AE60
      case "متوسط": return "#F39C12";
      case "كبير": return "#E67E22";
      case "خطير": return "#E31837";
      default: return "#3498DB";
    }
  };
  return (
    <section className="section checker-section">
      <div className="container">
        <div className="section-header">
          <span className="badge"><i className="fas fa-clipboard-list"></i> تقييم الأضرار</span>
          <h2 className="section-title">كيف تقيم <span className="highlight">ضرر سيارتك</span>؟</h2>
          <div className="divider"></div>
          <p className="section-desc">اختر نوع الضرر لمعرفة الإصلاح الموصى به والوقت المتوقع</p>
        </div>
        <div className="damage-selector">
          <div className="damage-icons-grid">
            {damages.map((d) => (
              <div key={d.id} className={`damage-icon-card ${damageType === d.id ? "active" : ""}`} onClick={() => setDamageType(d.id)}>
                <div className="damage-icon-circle" style={{ background: `${d.color}20`, borderColor: d.color }}><i className={`fas ${d.icon}`} style={{ color: d.color }}></i></div>
                <span>{d.name}</span>
                <div className="damage-level" style={{ background: getLevelColor(d.level) }}>{d.level}</div>
                {damageType === d.id && <div className="active-check"><i className="fas fa-check-circle"></i></div>}
              </div>
            ))}
          </div>
          <div className="check-action">
            <button className="check-damage-btn" onClick={handleCheck} disabled={!damageType || isChecking}>
              {isChecking ? <><i className="fas fa-spinner fa-spin"></i> جاري التقييم...</> : <><i className="fas fa-stethoscope"></i> تقييم الضرر</>}
            </button>
          </div>
        </div>
        {result && (
          <div className="damage-result-card">
            <div className="result-header" style={{ borderBottomColor: result.color }}>
              <div className="result-icon" style={{ background: `${result.color}20` }}><i className={`fas ${result.icon}`} style={{ color: result.color }}></i></div>
              <div className="result-title"><h3>{result.name}</h3><div className="result-level" style={{ background: getLevelColor(result.level) }}>{result.level}</div></div>
            </div>
            <div className="result-body">
              <div className="result-info">
                <div className="info-item"><i className="fas fa-wrench"></i><div><strong>الإصلاح الموصى به:</strong><p>{result.solution}</p></div></div>
                <div className="info-item"><i className="far fa-clock"></i><div><strong>الوقت المتوقع:</strong><p>{result.time}</p></div></div>
              </div>
              <div className="result-steps">
                <i className="fas fa-list-check"></i>
                <div><strong>خطوات الإصلاح المقترحة:</strong><ul>{result.steps.map((step, idx) => (<li key={idx}><i className="fas fa-chevron-left"></i> {step}</li>))}</ul></div>
              </div>
              <div className="result-warning"><i className="fas fa-exclamation-triangle"></i><span>قد يختلف الوقت حسب شدة الضرر ونوع السيارة</span></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ==================== المشخص الذكي - نسخة نهائية UI محسّن + ربط ديناميكي ====================
function SmartDamageAssistant({ selectedModel = "all" }) {
  const [phase, setPhase] = useState(1);
  const [answers, setAnswers] = useState({
    type: "", place: "", level: "",
    subQuestions: {},
    insurance: "none",
    serviceType: "center",
    preferredCenter: "",
    email: "",
    language: "ar"
  });
  const [report, setReport] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedReports, setSavedReports] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [diagnosisConfidence, setDiagnosisConfidence] = useState(0);

  const toggleLanguage = () => setAnswers(prev => ({ ...prev, language: prev.language === "ar" ? "en" : "ar" }));

  // ========== 1. أنواع الأضرار (10 أنواع) مع الأسئلة الفرعية والأماكن المسموحة ==========
  const damageTypes = {
    ar: [
      { id: "scratch", name: "خدوش سطحية", icon: "fa-paintbrush", color: "#3498DB", desc: "خطوط رفيعة", subQ: [{ id: "depth", q: "عمق الخدش؟", options: ["سطحية فقط", "وصلت للبوية", "وصلت للمعدن"] }], validPlaces: ["front", "side", "rear", "door"] },
      { id: "dent", name: "انبعاجات", icon: "fa-hammer", color: "#F39C12", desc: "تجاويف أو نتوءات", subQ: [{ id: "size", q: "حجم الانبعاج؟", options: ["صغير (<5cm)", "متوسط (5-15cm)", "كبير (>15cm)"] }], validPlaces: ["front", "side", "rear", "door", "fender"] },
      { id: "crack", name: "تشققات", icon: "fa-bolt", color: "#E67E22", desc: "شقوق في البلاستيك أو الزجاج", subQ: [{ id: "length", q: "طول الشق؟", options: ["أقل من 10cm", "بين 10-30cm", "أكثر من 30cm"] }], validPlaces: ["bumper", "glass", "light"] },
      { id: "broken", name: "كسر أو انكسار", icon: "fa-bomb", color: "#E31837", desc: "تلف كامل في القطعة", subQ: [{ id: "missingParts", q: "هل هناك أجزاء مفقودة؟", options: ["لا", "نعم، قطع صغيرة", "نعم، جزء كبير"] }], validPlaces: ["bumper", "light", "mirror", "grille"] },
      { id: "lights", name: "عطل في الإضاءة", icon: "fa-lightbulb", color: "#F39C12", desc: "لمبات أو عدسات معطلة", subQ: [{ id: "lightType", q: "أي نوع من الإضاءة؟", options: ["أمامي", "خلفي", "إشارة", "ضباب"] }], validPlaces: ["headlight", "taillight", "turnSignal"] },
      { id: "glass", name: "زجاج (شروخ أو كسر)", icon: "fa-window-maximize", color: "#0EA5E9", desc: "زجاج أمامي/جانبي/خلفي", subQ: [{ id: "glassLocation", q: "أي زجاج؟", options: ["أمامي", "جانبي", "خلفي"] }], validPlaces: ["windshield", "sideWindow", "rearWindow"] },
      { id: "tires", name: "إطارات أو جنوط", icon: "fa-circle", color: "#2ECC71", desc: "تلف في الإطارات أو الجنوط", subQ: [{ id: "tireDamage", q: "نوع التلف؟", options: ["ثقب", "تمزق جانبي", "انفجار"] }], validPlaces: ["frontWheel", "rearWheel"] },
      { id: "exhaust", name: "العادم", icon: "fa-smog", color: "#95A5A6", desc: "تسريب أو صوت عالٍ", subQ: [{ id: "exhaustSound", q: "الوضع؟", options: ["صوت عالٍ", "رائحة غريبة", "اهتزاز"] }], validPlaces: ["underCar"] },
      { id: "ac", name: "المكيف", icon: "fa-snowflake", color: "#1ABC9C", desc: "تبريد ضعيف أو أعطال", subQ: [{ id: "acIssue", q: "المشكلة؟", options: ["لا يبرد", "رائحة كريهة", "صوت غير طبيعي"] }], validPlaces: ["dashboard"] },
      { id: "structural", name: "أضرار هيكلية", icon: "fa-chassis", color: "#9B59B6", desc: "تأثير على هيكل السيارة", subQ: [{ id: "frameShift", q: "هل لاحظت انحرافاً في القيادة؟", options: ["لا", "قليلاً", "كثيراً"] }], validPlaces: ["frameFront", "frameRear", "frameSide"] }
    ],
    en: [
      { id: "scratch", name: "Surface Scratches", icon: "fa-paintbrush", color: "#3498DB", desc: "Fine lines", subQ: [{ id: "depth", q: "Scratch depth?", options: ["Just clear coat", "Through paint", "Into metal"] }], validPlaces: ["front", "side", "rear", "door"] },
      { id: "dent", name: "Dents", icon: "fa-hammer", color: "#F39C12", desc: "Indentations", subQ: [{ id: "size", q: "Dent size?", options: ["Small (<5cm)", "Medium (5-15cm)", "Large (>15cm)"] }], validPlaces: ["front", "side", "rear", "door", "fender"] },
      { id: "crack", name: "Cracks", icon: "fa-bolt", color: "#E67E22", desc: "Plastic/glass cracks", subQ: [{ id: "length", q: "Crack length?", options: ["<10cm", "10-30cm", ">30cm"] }], validPlaces: ["bumper", "glass", "light"] },
      { id: "broken", name: "Broken Parts", icon: "fa-bomb", color: "#E31837", desc: "Complete damage", subQ: [{ id: "missingParts", q: "Missing parts?", options: ["No", "Small pieces", "Large piece"] }], validPlaces: ["bumper", "light", "mirror", "grille"] },
      { id: "lights", name: "Lighting Malfunction", icon: "fa-lightbulb", color: "#F39C12", desc: "Bulbs or lenses", subQ: [{ id: "lightType", q: "Which light?", options: ["Headlight", "Taillight", "Turn signal", "Fog light"] }], validPlaces: ["headlight", "taillight", "turnSignal"] },
      { id: "glass", name: "Glass (Cracks/Broken)", icon: "fa-window-maximize", color: "#0EA5E9", desc: "Windshield/Side/Rear", subQ: [{ id: "glassLocation", q: "Which glass?", options: ["Windshield", "Side window", "Rear window"] }], validPlaces: ["windshield", "sideWindow", "rearWindow"] },
      { id: "tires", name: "Tires or Rims", icon: "fa-circle", color: "#2ECC71", desc: "Tire/Rim damage", subQ: [{ id: "tireDamage", q: "Type of damage?", options: ["Puncture", "Sidewall tear", "Blowout"] }], validPlaces: ["frontWheel", "rearWheel"] },
      { id: "exhaust", name: "Exhaust System", icon: "fa-smog", color: "#95A5A6", desc: "Leak or loud noise", subQ: [{ id: "exhaustSound", q: "Symptom?", options: ["Loud noise", "Strange smell", "Vibration"] }], validPlaces: ["underCar"] },
      { id: "ac", name: "Air Conditioning", icon: "fa-snowflake", color: "#1ABC9C", desc: "Cooling issues", subQ: [{ id: "acIssue", q: "Problem?", options: ["Not cooling", "Bad smell", "Unusual noise"] }], validPlaces: ["dashboard"] },
      { id: "structural", name: "Structural Damage", icon: "fa-chassis", color: "#9B59B6", desc: "Frame or chassis", subQ: [{ id: "frameShift", q: "Drifting while driving?", options: ["No", "Slightly", "Significantly"] }], validPlaces: ["frameFront", "frameRear", "frameSide"] }
    ]
  };

  // ========== 2. جميع الأماكن الممكنة (مفصلة) ==========
  const allPlaces = {
    ar: {
      front: { label: "المقدمة (صدام/شبك)", icon: "fa-car", color: "#E31837", laborBase: 2.5 },
      side: { label: "الجوانب (أبواب/رفارف)", icon: "fa-car-side", color: "#3498DB", laborBase: 3.0 },
      rear: { label: "المؤخرة (صدام خلفي/شنطة)", icon: "fa-car-rear", color: "#0EA5E9", laborBase: 2.0 },
      door: { label: "الأبواب", icon: "fa-truck", color: "#F39C12", laborBase: 2.5 },
      fender: { label: "الرفرف", icon: "fa-car", color: "#E67E22", laborBase: 2.0 },
      bumper: { label: "الصدام (أمامي/خلفي)", icon: "fa-car-bumper", color: "#E31837", laborBase: 1.8 },
      glass: { label: "الزجاج", icon: "fa-window-maximize", color: "#0EA5E9", laborBase: 1.5 },
      light: { label: "وحدة الإضاءة", icon: "fa-lightbulb", color: "#F39C12", laborBase: 1.0 },
      mirror: { label: "المرايا", icon: "fa-eye", color: "#3498DB", laborBase: 1.2 },
      grille: { label: "الشبك الأمامي", icon: "fa-th", color: "#E67E22", laborBase: 1.0 },
      headlight: { label: "المصباح الأمامي", icon: "fa-lightbulb", color: "#F39C12", laborBase: 0.8 },
      taillight: { label: "المصباح الخلفي", icon: "fa-lightbulb", color: "#F39C12", laborBase: 0.8 },
      turnSignal: { label: "إشارة الانعطاف", icon: "fa-arrow-left", color: "#F39C12", laborBase: 0.5 },
      windshield: { label: "الزجاج الأمامي", icon: "fa-window-maximize", color: "#0EA5E9", laborBase: 2.0 },
      sideWindow: { label: "الزجاج الجانبي", icon: "fa-window-maximize", color: "#0EA5E9", laborBase: 1.2 },
      rearWindow: { label: "الزجاج الخلفي", icon: "fa-window-maximize", color: "#0EA5E9", laborBase: 1.5 },
      frontWheel: { label: "العجلة الأمامية", icon: "fa-circle", color: "#2ECC71", laborBase: 0.8 },
      rearWheel: { label: "العجلة الخلفية", icon: "fa-circle", color: "#2ECC71", laborBase: 0.8 },
      underCar: { label: "أسفل السيارة", icon: "fa-arrow-down", color: "#95A5A6", laborBase: 1.5 },
      dashboard: { label: "تابلوه القيادة", icon: "fa-tachometer-alt", color: "#1ABC9C", laborBase: 1.0 },
      frameFront: { label: "الهيكل الأمامي", icon: "fa-chassis", color: "#9B59B6", laborBase: 4.0 },
      frameRear: { label: "الهيكل الخلفي", icon: "fa-chassis", color: "#9B59B6", laborBase: 3.5 },
      frameSide: { label: "الهيكل الجانبي", icon: "fa-chassis", color: "#9B59B6", laborBase: 4.5 }
    },
    en: {
      front: { label: "Front (Bumper/Grille)", icon: "fa-car", color: "#E31837", laborBase: 2.5 },
      side: { label: "Sides (Doors/Fenders)", icon: "fa-car-side", color: "#3498DB", laborBase: 3.0 },
      rear: { label: "Rear (Bumper/Trunk)", icon: "fa-car-rear", color: "#0EA5E9", laborBase: 2.0 },
      door: { label: "Doors", icon: "fa-truck", color: "#F39C12", laborBase: 2.5 },
      fender: { label: "Fender", icon: "fa-car", color: "#E67E22", laborBase: 2.0 },
      bumper: { label: "Bumper (Front/Rear)", icon: "fa-car-bumper", color: "#E31837", laborBase: 1.8 },
      glass: { label: "Glass", icon: "fa-window-maximize", color: "#0EA5E9", laborBase: 1.5 },
      light: { label: "Light Unit", icon: "fa-lightbulb", color: "#F39C12", laborBase: 1.0 },
      mirror: { label: "Mirrors", icon: "fa-eye", color: "#3498DB", laborBase: 1.2 },
      grille: { label: "Front Grille", icon: "fa-th", color: "#E67E22", laborBase: 1.0 },
      headlight: { label: "Headlight", icon: "fa-lightbulb", color: "#F39C12", laborBase: 0.8 },
      taillight: { label: "Taillight", icon: "fa-lightbulb", color: "#F39C12", laborBase: 0.8 },
      turnSignal: { label: "Turn Signal", icon: "fa-arrow-left", color: "#F39C12", laborBase: 0.5 },
      windshield: { label: "Windshield", icon: "fa-window-maximize", color: "#0EA5E9", laborBase: 2.0 },
      sideWindow: { label: "Side Window", icon: "fa-window-maximize", color: "#0EA5E9", laborBase: 1.2 },
      rearWindow: { label: "Rear Window", icon: "fa-window-maximize", color: "#0EA5E9", laborBase: 1.5 },
      frontWheel: { label: "Front Wheel", icon: "fa-circle", color: "#2ECC71", laborBase: 0.8 },
      rearWheel: { label: "Rear Wheel", icon: "fa-circle", color: "#2ECC71", laborBase: 0.8 },
      underCar: { label: "Underbody", icon: "fa-arrow-down", color: "#95A5A6", laborBase: 1.5 },
      dashboard: { label: "Dashboard", icon: "fa-tachometer-alt", color: "#1ABC9C", laborBase: 1.0 },
      frameFront: { label: "Front Frame", icon: "fa-chassis", color: "#9B59B6", laborBase: 4.0 },
      frameRear: { label: "Rear Frame", icon: "fa-chassis", color: "#9B59B6", laborBase: 3.5 },
      frameSide: { label: "Side Frame", icon: "fa-chassis", color: "#9B59B6", laborBase: 4.5 }
    }
  };

  // ========== 3. مستويات الشدة ==========
  const severityLevels = {
    ar: [
      { value: "light", label: "بسيط", icon: "fa-smile", color: "#0EA5E9", desc: "لا يؤثر على الهيكل", multiplier: 1, safety: "يمكنك القيادة بحذر" },
      { value: "medium", label: "متوسط", icon: "fa-meh", color: "#F39C12", desc: "يحتاج إصلاح خلال أيام", multiplier: 1.5, safety: "يفضل عدم القيادة لمسافات طويلة" },
      { value: "heavy", label: "كبير", icon: "fa-frown", color: "#E67E22", desc: "يؤثر على الأداء", multiplier: 2.2, safety: "لا تقود إلا للورشة" },
      { value: "critical", label: "خطير", icon: "fa-skull", color: "#E31837", desc: "يهدد السلامة", multiplier: 3.5, safety: "اطلب ونشاً فوراً" }
    ],
    en: [
      { value: "light", label: "Light", icon: "fa-smile", color: "#0EA5E9", desc: "No structural impact", multiplier: 1, safety: "Drive with caution" },
      { value: "medium", label: "Medium", icon: "fa-meh", color: "#F39C12", desc: "Repair within days", multiplier: 1.5, safety: "Avoid long trips" },
      { value: "heavy", label: "Severe", icon: "fa-frown", color: "#E67E22", desc: "Performance affected", multiplier: 2.2, safety: "Drive only to workshop" },
      { value: "critical", label: "Critical", icon: "fa-skull", color: "#E31837", desc: "Safety hazard", multiplier: 3.5, safety: "Call tow truck" }
    ]
  };

  // ========== 4. مراكز الخدمة (محاكاة) ==========
  const serviceCenters = {
    ar: [
      { id: 1, name: "مركز تويوتا المعتمد – التجمع الخامس", distance: "2.3 كم", rating: 4.8, phone: "0224883500", priceLevel: "متوسط", availableToday: true },
      { id: 2, name: "مركز الخدمة المتكاملة – مدينة نصر", distance: "5.1 كم", rating: 4.5, phone: "0224883501", priceLevel: "مرتفع", availableToday: false },
      { id: 3, name: "ورشة بودي تويوتا – المعادي", distance: "8.7 كم", rating: 4.2, phone: "0224883502", priceLevel: "اقتصادي", availableToday: true }
    ],
    en: [
      { id: 1, name: "Toyota Authorized Center – Fifth Settlement", distance: "2.3 km", rating: 4.8, phone: "0224883500", priceLevel: "Medium", availableToday: true },
      { id: 2, name: "Integrated Service Center – Nasr City", distance: "5.1 km", rating: 4.5, phone: "0224883501", priceLevel: "High", availableToday: false },
      { id: 3, name: "Toyota Body Workshop – Maadi", distance: "8.7 km", rating: 4.2, phone: "0224883502", priceLevel: "Budget", availableToday: true }
    ]
  };

  const lang = answers.language;
  const currentDamageTypes = damageTypes[lang];
  const currentPlacesDB = allPlaces[lang];
  const currentLevels = severityLevels[lang];

  // دالة للحصول على الأماكن المسموحة بناءً على نوع الضرر المختار
  const getValidPlaces = () => {
    if (!answers.type) return [];
    const damage = currentDamageTypes.find(d => d.id === answers.type);
    if (!damage) return [];
    return damage.validPlaces.map(placeId => ({
      id: placeId,
      ...currentPlacesDB[placeId]
    })).filter(p => p.label);
  };

  const validPlaces = getValidPlaces();

  // ========== 5. حساب التقرير المتقدم ==========
  const generateAdvancedReport = () => {
    const damage = currentDamageTypes.find(d => d.id === answers.type);
    const placeData = currentPlacesDB[answers.place];
    const levelData = currentLevels.find(l => l.value === answers.level);
    const multiplier = levelData?.multiplier || 1;
    const laborBase = placeData?.laborBase || 2;
    const laborHours = laborBase * multiplier;
    const laborCost = laborHours * 250;
    let partCost = 0;
    let partName = damage?.name || "قطعة غيار";
    let daysForPart = 0;

    const modelKey = selectedModel === "all" ? "corolla" : selectedModel;
    const partPrices = {
      scratch: 120, dent: 250, crack: 180, broken: 1200, lights: 400,
      glass: 800, tires: 500, exhaust: 600, ac: 700, structural: 3000
    };
    partCost = (partPrices[answers.type] || 300) * multiplier;
    if (answers.type === "broken") daysForPart = 3;
    else if (answers.type === "structural") daysForPart = 5;
    else daysForPart = 0;

    const paintingCost = (levelData?.value === "heavy" || levelData?.value === "critical") ? 800 * multiplier : (levelData?.value === "medium" ? 400 : 0);
    const totalBeforeInsurance = laborCost + partCost + paintingCost;
    let insuranceDiscount = 0;
    if (answers.insurance === "comprehensive") insuranceDiscount = totalBeforeInsurance * 0.4;
    else if (answers.insurance === "basic") insuranceDiscount = totalBeforeInsurance * 0.2;
    const finalTotal = totalBeforeInsurance - insuranceDiscount;

    const stepsMap = {
      light: [lang === "ar" ? "تنظيف وتلميع" : "Clean & polish", lang === "ar" ? "معجون خفيف" : "Light filler", lang === "ar" ? "تلميع نهائي" : "Final buff"],
      medium: [lang === "ar" ? "صنفرة" : "Sanding", lang === "ar" ? "سحب الانبعاج" : "Dent pulling", lang === "ar" ? "معجون وصنفرة" : "Filler & sand", lang === "ar" ? "دهان وتلميع" : "Paint & polish"],
      heavy: [lang === "ar" ? "فك القطعة" : "Remove part", lang === "ar" ? "تركيب قطعة جديدة" : "Install new part", lang === "ar" ? "محاذاة" : "Alignment", lang === "ar" ? "دهان كامل" : "Full paint"],
      critical: [lang === "ar" ? "فحص هيكل إلكتروني" : "Electronic frame check", lang === "ar" ? "تفكيك وإصلاح هيكلي" : "Disassemble & structural repair", lang === "ar" ? "تركيب وضبط" : "Assembly & adjustment", lang === "ar" ? "اختبار سلامة" : "Safety test"]
    };
    const currentSteps = stepsMap[levelData?.value] || stepsMap.medium;
    const confidence = 70 + (Object.keys(answers.subQuestions).length * 5) + (answers.insurance !== "none" ? 5 : 0);
    setDiagnosisConfidence(Math.min(confidence, 98));

    return {
      typeName: damage?.name,
      placeName: placeData?.label,
      levelName: levelData?.label,
      levelColor: levelData?.color,
      safetyNote: levelData?.safety,
      costDetails: { laborHours, laborCost, partName, partCost, paintingCost, totalBeforeInsurance, insuranceDiscount, finalTotal },
      steps: currentSteps,
      tip: lang === "ar" ? "نوصي بالتعامل مع مركز معتمد لضمان الجودة." : "We recommend an authorized center for quality.",
      daysForPart,
      confidence: Math.min(confidence, 98),
      recommendedCenters: serviceCenters[lang],
      insuranceType: answers.insurance,
      serviceType: answers.serviceType,
      model: modelKey,
    };
  };

  // ========== 6. دوال التحكم ==========
  const handleSubAnswer = (qId, value) => setAnswers(prev => ({ ...prev, subQuestions: { ...prev.subQuestions, [qId]: value } }));

  const nextPhase = () => {
    if (phase === 1 && !answers.type) return;
    if (phase === 2 && !answers.place) return;
    if (phase === 3 && !answers.level) return;
    if (phase === 4) {
      setIsGenerating(true);
      setTimeout(() => {
        const newReport = generateAdvancedReport();
        setReport(newReport);
        setSelectedCenter(newReport.recommendedCenters[0]);
        setIsGenerating(false);
        setPhase(5);
      }, 800);
    } else setPhase(phase + 1);
  };

  const prevPhase = () => { if (phase > 1 && phase < 5) setPhase(phase - 1); };
  const resetWizard = () => {
    setPhase(1);
    setAnswers({ type: "", place: "", level: "", subQuestions: {}, insurance: "none", serviceType: "center", preferredCenter: "", email: "", language: answers.language });
    setReport(null);
  };
  const callCenter = (phone) => window.location.href = `tel:${phone}`;
  const saveReportToLocal = () => {
    if (!report) return;
    const newReports = [report, ...savedReports.slice(0, 4)];
    setSavedReports(newReports);
    localStorage.setItem("damageReportsAdvanced", JSON.stringify(newReports));
    alert(lang === "ar" ? "تم حفظ التقرير" : "Report saved");
  };
  const copyReportLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/report/${Date.now()}`);
    alert(lang === "ar" ? "تم نسخ رابط التقرير" : "Report link copied");
  };
  const requestMobileService = () => alert(lang === "ar" ? "سيتم التواصل معك خلال 30 دقيقة" : "You'll be contacted within 30 min");

  useEffect(() => {
    const stored = localStorage.getItem("damageReportsAdvanced");
    if (stored) setSavedReports(JSON.parse(stored));
  }, []);

  // ========== 7. دالة الترجمة (تم إصلاحها) ==========
  const t = (key) => {
    const texts = {
      ar: {
        title: "المشخص الذكي", badge: "تشخيص دقيق",
        step1: "نوع الضرر", step2: "المكان", step3: "الشدة", step4: "تفاصيل إضافية", step5: "التقرير النهائي",
        next: "التالي", back: "السابق", diagnose: "شخّص", newDiagnosis: "جديد", save: "حفظ", copyLink: "نسخ الرابط",
        insuranceLabel: "نوع التأمين", comprehensive: "شامل", basic: "عادي", none: "لا يوجد",
        serviceLabel: "نوع الخدمة", center: "مركز خدمة", mobile: "خدمة متنقلة", video: "استشارة فيديو",
        emailPlaceholder: "بريدك الإلكتروني", chooseCenter: "اختر المركز", confidence: "ثقة التشخيص",
        partDelivery: "وصول قطع الغيار", totalCost: "الإجمالي بعد الخصم"
      },
      en: {
        title: "Smart Diagnoser", badge: "Precise Diagnosis",
        step1: "Damage Type", step2: "Location", step3: "Severity", step4: "Additional Info", step5: "Final Report",
        next: "Next", back: "Back", diagnose: "Diagnose", newDiagnosis: "New", save: "Save", copyLink: "Copy Link",
        insuranceLabel: "Insurance Type", comprehensive: "Comprehensive", basic: "Basic", none: "None",
        serviceLabel: "Service Type", center: "Service Center", mobile: "Mobile Service", video: "Video Consult",
        emailPlaceholder: "Your email", chooseCenter: "Choose center", confidence: "Confidence",
        partDelivery: "Parts arrival", totalCost: "Total after discount"
      }
    };
    return texts[lang]?.[key] || key;
  };

  // ========== 8. واجهة المستخدم ==========
  return (
    <section id="smart-assistant" className="section wizard-section advanced-wizard">
      <div className="container">
        <div className="section-header">
          <span className="badge"><i className="fas fa-microscope"></i> {t("badge")}</span>
          <h2 className="section-title">{t("title")} <span className="highlight">Pro</span></h2>
          <div className="divider"></div>
          <button onClick={toggleLanguage} className="lang-switch"><i className="fas fa-globe"></i> {answers.language === "ar" ? "English" : "العربية"}</button>
        </div>

        <div className="wizard-container">
          <div className="progress-track"><div className="progress-bar" style={{ width: `${(phase-1)*25}%` }}></div></div>
          <div className="wizard-steps">
            {[1,2,3,4,5].map(i => <div key={i} className={`step-badge ${phase >= i ? "done" : ""}`}>{t(`step${i}`)}</div>)}
          </div>

          <div className="wizard-card">
            {phase === 1 && (
              <div className="wizard-step">
                <h3><i className="fas fa-car-crash"></i> {t("step1")}</h3>
                <div className="option-palette">
                  {currentDamageTypes.map(d => (
                    <button key={d.id} className={`palette-item ${answers.type === d.id ? "selected" : ""}`} onClick={() => setAnswers({...answers, type: d.id, place: "", subQuestions: {}})}>
                      <i className={`fas ${d.icon}`} style={{ color: d.color }}></i><span>{d.name}</span><small>{d.desc}</small>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {phase === 2 && (
              <div className="wizard-step">
                <h3><i className="fas fa-map-marked-alt"></i> {t("step2")}</h3>
                {validPlaces.length === 0 ? (
                  <p className="no-places">{lang === "ar" ? "الرجاء اختيار نوع الضرر أولاً" : "Please select damage type first"}</p>
                ) : (
                  <div className="option-palette two-columns">
                    {validPlaces.map(p => (
                      <button key={p.id} className={`palette-item ${answers.place === p.id ? "selected" : ""}`} onClick={() => setAnswers({...answers, place: p.id})}>
                        <i className={`fas ${p.icon}`} style={{ color: p.color }}></i><span>{p.label}</span><small>{p.laborBase} {lang === "ar" ? "ساعة عمل" : "labor hrs"}</small>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
           {phase === 3 && (
  <div className="wizard-step severity-circle-step">
    <h3><i className="fas fa-gauge-high"></i> {lang === "ar" ? "ما مدى شدة الضرر؟" : "How severe is the damage?"}</h3>
    
    <div className="severity-radial-grid">
      {currentLevels.map((l, idx) => {
        const isSelected = answers.level === l.value;
        const radius = 80;
        const circumference = 2 * Math.PI * radius;
        const progress = (idx + 1) / currentLevels.length;
        const dashoffset = circumference * (1 - progress);
        return (
          <div 
            key={l.value} 
            className={`severity-radial-card ${isSelected ? "active" : ""}`}
            onClick={() => setAnswers({...answers, level: l.value})}
          >
            <div className="radial-progress" style={{ '--progress': progress, '--color': l.color }}>
              <svg width="120" height="120" viewBox="0 0 240 240">
                <circle cx="120" cy="120" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12"/>
                <circle 
                  cx="120" cy="120" r={radius} fill="none" 
                  stroke={l.color} strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={circumference} strokeDashoffset={dashoffset}
                  transform="rotate(-90 120 120)"
                  className="radial-track"
                />
              </svg>
              <div className="radial-icon">
                <i className={`fas ${l.icon}`} style={{ color: l.color }}></i>
              </div>
            </div>
            <div className="radial-content">
              <h4>{l.label}</h4>
              <p>{l.desc}</p>
              <div className="severity-tag" style={{ background: `${l.color}20`, color: l.color }}>
                {l.safety}
              </div>
            </div>
            {isSelected && <div className="check-badge"><i className="fas fa-check-circle"></i></div>}
          </div>
        );
      })}
    </div>

    {answers.level && (
      <div className="severity-action-card">
        <div className="action-icon"><i className="fas fa-clipboard-list"></i></div>
        <div className="action-text">
          <strong>{lang === "ar" ? "الإجراء الموصى به:" : "Recommended action:"}</strong>
          <span>{currentLevels.find(l => l.value === answers.level)?.safety}</span>
        </div>
      </div>
    )}
  </div>
)}
            {phase === 4 && (
              <div className="wizard-step">
                <h3><i className="fas fa-question-circle"></i> {t("step4")}</h3>
                {currentDamageTypes.find(d => d.id === answers.type)?.subQ?.map(q => (
                  <div key={q.id} className="subquestion">
                    <label>{q.q}</label>
                    <div className="sub-options">{q.options.map(opt => (<button key={opt} className={`sub-opt ${answers.subQuestions[q.id] === opt ? "active" : ""}`} onClick={() => handleSubAnswer(q.id, opt)}>{opt}</button>))}</div>
                  </div>
                ))}
                <div className="additional-fields">
                  <div className="field-group"><label>{t("insuranceLabel")}</label><select value={answers.insurance} onChange={(e) => setAnswers({...answers, insurance: e.target.value})}><option value="none">{t("none")}</option><option value="basic">{t("basic")}</option><option value="comprehensive">{t("comprehensive")}</option></select></div>
                  <div className="field-group"><label>{t("serviceLabel")}</label><div className="service-type-buttons">{[{val:"center",icon:"building"},{val:"mobile",icon:"truck"},{val:"video",icon:"video"}].map(s => (<button key={s.val} className={`service-btn ${answers.serviceType === s.val ? "active" : ""}`} onClick={() => setAnswers({...answers, serviceType: s.val})}><i className={`fas fa-${s.icon}`}></i> {t(s.val)}</button>))}</div></div>
                  <div className="field-group"><label>{t("emailPlaceholder")}</label><input type="email" placeholder={t("emailPlaceholder")} value={answers.email} onChange={(e) => setAnswers({...answers, email: e.target.value})} /></div>
                </div>
              </div>
            )}
            {phase === 5 && report && (
              <div className="wizard-result final-report">
                <div className="result-head"><i className="fas fa-clipboard-list"></i><h4>{t("step5")}</h4><div className="result-actions-header"><button onClick={saveReportToLocal} className="icon-btn"><i className="fas fa-save"></i></button><button onClick={copyReportLink} className="icon-btn"><i className="fas fa-link"></i></button><button onClick={resetWizard} className="reset-wizard"><i className="fas fa-undo-alt"></i> {t("newDiagnosis")}</button></div></div>
                <div className="confidence-bar"><span>{t("confidence")}: {diagnosisConfidence}%</span><div className="confidence-fill" style={{ width: `${diagnosisConfidence}%` }}></div></div>
                <div className="result-body-grid"><div className="result-line"><span>{lang==="ar"?"نوع الضرر":"Damage"}:</span> <strong>{report.typeName}</strong></div><div className="result-line"><span>{lang==="ar"?"المكان":"Location"}:</span> <strong>{report.placeName}</strong></div><div className="result-line"><span>{lang==="ar"?"الشدة":"Severity"}:</span> <strong style={{ color: report.levelColor }}>{report.levelName}</strong></div><div className="result-line"><span>{lang==="ar"?"الموديل":"Model"}:</span> <strong>{report.model}</strong></div><div className="result-line full-width safety"><span>{lang==="ar"?"توصية السلامة":"Safety"}:</span> <strong>{report.safetyNote}</strong></div></div>
                <div className="cost-breakdown"><h5><i className="fas fa-coins"></i> {lang==="ar"?"تفصيل التكلفة":"Cost breakdown"}</h5><div className="cost-row"><span>{report.costDetails.partName}:</span> {report.costDetails.partCost} {lang==="ar"?"ج.م":"EGP"}</div><div className="cost-row"><span>{lang==="ar"?"أجور اليد":"Labor"} ({report.costDetails.laborHours} h):</span> {report.costDetails.laborCost} {lang==="ar"?"ج.م":"EGP"}</div>{report.costDetails.paintingCost > 0 && <div className="cost-row"><span>{lang==="ar"?"دهان وتلميع":"Paint"}:</span> {report.costDetails.paintingCost} {lang==="ar"?"ج.م":"EGP"}</div>}<div className="cost-row"><span>{lang==="ar"?"الإجمالي قبل التأمين":"Subtotal"}:</span> {report.costDetails.totalBeforeInsurance} {lang==="ar"?"ج.م":"EGP"}</div>{report.insuranceType !== "none" && <div className="cost-row discount"><span>{lang==="ar"?"خصم التأمين":"Insurance discount"}:</span> -{report.costDetails.insuranceDiscount} {lang==="ar"?"ج.م":"EGP"}</div>}<div className="cost-row total"><span>{t("totalCost")}:</span> <strong>{report.costDetails.finalTotal} {lang==="ar"?"ج.م":"EGP"}</strong></div></div>
                <div className="steps-box"><i className="fas fa-list-ul"></i><div><strong>{lang==="ar"?"خطوات الإصلاح":"Repair steps"}:</strong><ul>{report.steps.map((s,i) => <li key={i}><i className="fas fa-check-circle"></i> {s}</li>)}</ul></div></div>
                <div className="info-tip"><i className="fas fa-lightbulb"></i> {report.tip}</div>
                <div className="part-delivery"><i className="fas fa-truck-fast"></i> {t("partDelivery")}: {report.daysForPart === 0 ? (lang==="ar"?"متوفرة فوراً":"In stock") : `${report.daysForPart} ${lang==="ar"?"أيام":"days"}`}</div>
                <div className="centers-list"><h5>{t("chooseCenter")}</h5>{report.recommendedCenters.map(c => (<div key={c.id} className={`center-card ${selectedCenter?.id === c.id ? "selected" : ""}`} onClick={() => setSelectedCenter(c)}><div><strong>{c.name}</strong><br/><span>⭐ {c.rating} • {c.distance} • {c.priceLevel}</span></div><button className="call-center" onClick={(e) => { e.stopPropagation(); callCenter(c.phone); }}><i className="fas fa-phone"></i></button></div>))}</div>
                {answers.serviceType === "mobile" && <button className="mobile-service-btn" onClick={requestMobileService}><i className="fas fa-truck"></i> {lang==="ar"?"طلب خدمة متنقلة الآن":"Request Mobile Service"}</button>}
                <div className="result-actions"><button className="btn-primary" onClick={() => callCenter(selectedCenter?.phone || "0224883500")}><i className="fas fa-phone-alt"></i> {lang==="ar"?"اتصل بالمركز":"Call Center"}</button><button className="btn-secondary" onClick={resetWizard}><i className="fas fa-redo-alt"></i> {t("newDiagnosis")}</button></div>
              </div>
            )}
            {phase < 5 && phase !== 4 && (
              <div className="wizard-nav">{phase > 1 && <button className="btn-secondary" onClick={prevPhase}><i className="fas fa-arrow-right"></i> {t("back")}</button>}<button className="btn-primary" onClick={nextPhase} disabled={(phase===1 && !answers.type) || (phase===2 && !answers.place) || (phase===3 && !answers.level)}>{phase === 4 ? t("diagnose") : t("next")} <i className="fas fa-arrow-left"></i></button></div>
            )}
            {phase === 4 && (<div className="wizard-nav"><button className="btn-secondary" onClick={prevPhase}><i className="fas fa-arrow-right"></i> {t("back")}</button><button className="btn-primary" onClick={nextPhase}>{t("diagnose")} <i className="fas fa-arrow-left"></i></button></div>)}
            {isGenerating && (<div className="wizard-loader"><div className="loader-spinner"></div><p>{lang==="ar"?"جاري التحليل الذكي...":"AI analysis..."}</p></div>)}
          </div>

          {savedReports.length > 0 && phase !== 5 && (
            <div className="saved-reports"><h5><i className="fas fa-history"></i> {lang==="ar"?"التقارير السابقة":"Past reports"}</h5><div className="saved-list">{savedReports.map((r, idx) => (<div key={idx} className="saved-item" onClick={() => { setReport(r); setPhase(5); }}><i className="fas fa-file-alt"></i><span>{r.typeName} – {r.model}</span></div>))}</div></div>
          )}
        </div>
      </div>
    </section>
  );
}
// ==================== Repair Tips Section ====================
function RepairTipsSection() {
  const tips = [
    { icon: "fa-file-alt", title: "التقرير المروري", desc: "احصل على تقرير رسمي من المرور", level: "هام جداً", color: "#E31837" },
    { icon: "fa-camera", title: "توثيق الأضرار", desc: "صور السيارة من جميع الزوايا", level: "هام جداً", color: "#3498DB" },
    { icon: "fa-building", title: "مركز معتمد", desc: "اختر مركز صيانة معتمد من تويوتا", level: "هام", color: "#0EA5E9" },      // تغيير من #27AE60
    { icon: "fa-shield-alt", title: "الضمان", desc: "تأكد من الضمان على قطع الغيار", level: "نصيحة", color: "#9B59B6" },
    { icon: "fa-handshake", title: "التأمين", desc: "أبلغ شركة التأمين قبل الإصلاح", level: "هام", color: "#E67E22" },
    { icon: "fa-calendar-alt", title: "موعد التسليم", desc: "حدد موعد تسليم السيارة", level: "نصيحة", color: "#0EA5E9" },       // تغيير من #2ECC71
  ];
  return (
    <section className="section tips-section">
      <div className="container">
        <div className="section-header"><span className="badge"><i className="fas fa-lightbulb"></i> نصائح ما بعد الحادث</span><h2 className="section-title">نصائح <span className="highlight">بعد الحوادث</span></h2><div className="divider"></div><p className="section-desc">خطوات مهمة يجب اتباعها بعد تعرض سيارتك لحادث</p></div>
        <div className="tips-grid">{tips.map((tip, idx) => (<div key={idx} className="tip-card"><div className="tip-icon" style={{ background: `${tip.color}20`, color: tip.color }}><i className={`fas ${tip.icon}`}></i></div><div className="tip-content"><h3>{tip.title}</h3><p>{tip.desc}</p><span className="tip-level" style={{ background: tip.color }}>{tip.level}</span></div></div>))}</div>
      </div>
    </section>
  );
}

// ==================== Stats Section ====================
function StatsSection() {
  const stats = [
    { icon: "fa-car-crash", number: "25+", label: "نوع إصلاح", color: "#E31837" },
    { icon: "fa-car", number: "15+", label: "موديل تويوتا", color: "#3498DB" },
    { icon: "fa-user-check", number: "10K+", label: "سيارة تم إصلاحها", color: "#0EA5E9" },    // تغيير من #27AE60
    { icon: "fa-paint-roller", number: "100%", label: "دهان إلكتروني", color: "#F39C12" },
    { icon: "fa-certificate", number: "100%", label: "قطع غيار أصلية", color: "#9B59B6" },
    { icon: "fa-trophy", number: "20+", label: "سنة خبرة", color: "#E31837" },
  ];
  return (
    <section className="section stats-section"><div className="container"><div className="stats-grid">{stats.map((stat, idx) => (<div key={idx} className="stat-card"><div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}><i className={`fas ${stat.icon}`}></i></div><div className="stat-number">{stat.number}</div><div className="stat-label">{stat.label}</div></div>))}</div></div></section>
  );
}