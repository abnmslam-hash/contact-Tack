import { useState, useEffect } from "react";
import "./RepairForm.css";

function RepairForm() {
  // State للفورم
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [carModel, setCarModel] = useState("");
  const [repairType, setRepairType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State للتحقق
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  // State للـ Toast والمواعيد
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [lastRequestTime, setLastRequestTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  // State للطلبات
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showAllRequests, setShowAllRequests] = useState(false);

  // أشهر 20 موديل لتويوتا
  const toyotaModels = [
    "كورولا (Corolla)", "كامري (Camry)", "لاندكروزر (Land Cruiser)",
    "هايلوكس (Hilux)", "راف فور (RAV4)", "بريوس (Prius)", "يارس (Yaris)",
    "هايبردر (Highlander)", "تاكوما (Tacoma)", "تندرا (Tundra)", "سيينا (Sienna)",
    "أفالون (Avalon)", "سيليكا (Celica)", "سوبرا (Supra)", "ماتريكس (Matrix)",
    "فينزا (Venza)", "كراون (Crown)", "ميراي (Mirai)", "أيغو (Aygo)", "آرونز (Avensis)"
  ];

  // التحقق من الاسم
  const validateName = (value) => {
    const lettersOnly = /^[a-zA-Z\u0621-\u064A\s]*$/;
    if (!value) return "الاسم مطلوب";
    if (!lettersOnly.test(value)) return "يجب أن يحتوي على حروف فقط";
    if (value.length < 3) return "3 أحرف على الأقل";
    if (value.length > 30) return "الاسم طويل جداً";
    return "";
  };

  // التحقق من رقم الهاتف المصري
  const validatePhone = (value) => {
    const egyptianPhone = /^(010|011|012|015)[0-9]{8}$/;
    if (!value) return "رقم الهاتف مطلوب";
    if (!egyptianPhone.test(value)) return "رقم مصري: 010/011/012/015 + 8 أرقام";
    return "";
  };

  // التحقق من موديل السيارة
  const validateCarModel = (value) => {
    if (!value) return "موديل السيارة مطلوب";
    if (value.length < 2) return "اسم الموديل قصير جداً";
    return "";
  };

  // التحقق من نوع الصيانة
  const validateRepairType = (value) => {
    if (!value) return "نوع الصيانة مطلوب";
    return "";
  };

  // جلب آخر الطلبات
  const fetchRequests = async () => {
    try {
      const response = await fetch("http://localhost:3000/repair");
      if (response.ok) {
        const data = await response.json();
        const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
        setRequests(sorted);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // فحص إذا كان الرقم أرسل خلال 24 ساعة
  const checkIfCanSend = async (phoneNumber) => {
    try {
      const response = await fetch("http://localhost:3000/repair");
      if (response.ok) {
        const data = await response.json();
        const lastRequest = data
          .filter(req => req.phone === phoneNumber)
          .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        
        if (lastRequest) {
          const lastDate = new Date(lastRequest.date);
          const now = new Date();
          const hoursDiff = (now - lastDate) / (1000 * 60 * 60);
          
          if (hoursDiff < 24) {
            const remaining = 24 - hoursDiff;
            return { canSend: false, remainingHours: remaining };
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
    return { canSend: true, remainingHours: 0 };
  };

  // تحديث الوقت المتبقي
  useEffect(() => {
    if (lastRequestTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const diff = (now - lastRequestTime) / (1000 * 60 * 60);
        const remaining = 24 - diff;
        
        if (remaining <= 0) {
          setLastRequestTime(null);
          setTimeRemaining(0);
          clearInterval(interval);
        } else {
          setTimeRemaining(remaining);
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [lastRequestTime]);

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setErrors({ ...errors, name: validateName(value) });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    setErrors({ ...errors, phone: validatePhone(value) });
  };

  const handleCarModelChange = (e) => {
    const value = e.target.value;
    setCarModel(value);
    setErrors({ ...errors, carModel: validateCarModel(value) });
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setRepairType(value);
    setErrors({ ...errors, repairType: validateRepairType(value) });
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 5000);
  };

  // تنسيق الوقت المتبقي
  const formatRemainingTime = (hours) => {
    const totalMinutes = Math.floor(hours * 60);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    if (h > 0) return `${h} ساعة و ${m} دقيقة`;
    return `${m} دقيقة`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameErr = validateName(name);
    const phoneErr = validatePhone(phone);
    const carModelErr = validateCarModel(carModel);
    const typeErr = validateRepairType(repairType);

    setErrors({ 
      name: nameErr, 
      phone: phoneErr, 
      carModel: carModelErr,
      repairType: typeErr 
    });
    setTouched({ name: true, phone: true, carModel: true, repairType: true });

    if (nameErr || phoneErr || carModelErr || typeErr) {
      showToast("❌ يرجى تصحيح الأخطاء في النموذج", "error");
      return;
    }

    const { canSend, remainingHours } = await checkIfCanSend(phone);
    
    if (!canSend) {
      const remainingText = formatRemainingTime(remainingHours);
      showToast(`⏰ عذراً! لا يمكنك إرسال طلب آخر قبل ${remainingText}`, "warning");
      return;
    }

    setIsSubmitting(true);
    showToast("✨ جاري إرسال طلبك...", "loading");

    const dataToSend = {
      name: name,
      phone: phone,
      carModel: carModel,
      repairType: repairType,
      date: new Date().toISOString()
    };

    try {
      const response = await fetch("http://localhost:3000/repair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        showToast("🎉 تم استلام طلبك بنجاح! سنقوم بالرد عليك في أقرب وقت خلال 24 ساعة", "success");
        
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
        
        setLastRequestTime(new Date());
        
        setName("");
        setPhone("");
        setCarModel("");
        setRepairType("");
        setErrors({});
        setTouched({});
        
        fetchRequests();
      } else {
        showToast("❌ حدث خطأ، يرجى المحاولة مرة أخرى", "error");
      }
    } catch (error) {
      showToast("❌ خطأ في الاتصال بالسيرفر", "error");
    } finally {
      setIsSubmitting(false);
    }
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

  const displayedRequests = showAllRequests ? requests : requests.slice(0, 3);

  return (
    <div className="repair-fullscreen">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="celebration">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="confetti" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 0.5}s`, background: `hsl(${Math.random() * 360}, 100%, 60%)` }}></div>
          ))}
          <div className="celebration-text">🎉 تم الإرسال بنجاح 🎉</div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          <div className="toast-icon">
            {toast.type === "success" && "✓"}
            {toast.type === "error" && "✗"}
            {toast.type === "loading" && "⟳"}
            {toast.type === "warning" && "⚠️"}
          </div>
          <div className="toast-message">{toast.message}</div>
        </div>
      )}

      {/* Header Section with Advanced Animation */}
      <div className="repair-header-full">
        <div className="header-animation-bg">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
          <div className="floating-shape shape-4"></div>
          <div className="floating-shape shape-5"></div>
        </div>
        <div className="header-content">
          <div className="title-wrapper">
            <div className="title-icon-animated">
              <i className="fas fa-wrench"></i>
              <div className="icon-ring"></div>
            </div>
            <h1 className="animated-title">
              مركز <span className="title-red">صيانة تويوتا</span> المعتمد
              <div className="title-glow"></div>
            </h1>
          </div>
          <p className="header-subtitle">خدمة فاخرة - قطع غيار أصلية 100% - فنيين معتمدين</p>
          <div className="header-badges">
            <div className="header-badge">✨ ضمان معتمد ✨</div>
            <div className="header-badge">🔧 قطع أصلية 🔧</div>
            <div className="header-badge">⭐ فنيين خبرة ⭐</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="repair-main-full">
        {/* Form Section - Ultra Premium */}
        <div className="form-wrapper-full">
          <div className="form-card-full">
            <div className="form-title-section">
              <div className="form-title-icon">
                <i className="fas fa-pen-alt"></i>
              </div>
              <h2>طلب صيانة جديد</h2>
              {lastRequestTime && timeRemaining > 0 && (
                <div className="cooldown-badge">
                  ⏳ انتظار {formatRemainingTime(timeRemaining)}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className={`input-field-full ${touched.name && errors.name ? "error" : ""} ${name && !errors.name ? "valid" : ""}`}>
                  <div className="field-icon-full">👤</div>
                  <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    onBlur={() => handleBlur("name")}
                    placeholder=" "
                  />
                  <label>الاسم الكامل</label>
                  {name && !errors.name && <span className="valid-icon-full">✓</span>}
                  {touched.name && errors.name && <span className="error-msg-full">{errors.name}</span>}
                </div>

                <div className={`input-field-full ${touched.phone && errors.phone ? "error" : ""} ${phone && !errors.phone ? "valid" : ""}`}>
                  <div className="field-icon-full">📱</div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    onBlur={() => handleBlur("phone")}
                    placeholder=" "
                  />
                  <label>رقم الجوال</label>
                  {phone && !errors.phone && <span className="valid-icon-full">✓</span>}
                  {touched.phone && errors.phone && <span className="error-msg-full">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className={`input-field-full ${touched.carModel && errors.carModel ? "error" : ""} ${carModel && !errors.carModel ? "valid" : ""}`}>
                  <div className="field-icon-full">🚙</div>
                  <input
                    type="text"
                    list="toyota-models"
                    value={carModel}
                    onChange={handleCarModelChange}
                    onBlur={() => handleBlur("carModel")}
                    placeholder=" "
                    autoComplete="off"
                  />
                  <datalist id="toyota-models">
                    {toyotaModels.map((model, index) => (
                      <option key={index} value={model} />
                    ))}
                  </datalist>
                  <label>موديل السيارة</label>
                  {carModel && !errors.carModel && <span className="valid-icon-full">✓</span>}
                  {touched.carModel && errors.carModel && <span className="error-msg-full">{errors.carModel}</span>}
                </div>

                <div className={`input-field-full select-field ${touched.repairType && errors.repairType ? "error" : ""} ${repairType && !errors.repairType ? "valid" : ""}`}>
                  <div className="field-icon-full">🔧</div>
                  <select
                    value={repairType}
                    onChange={handleTypeChange}
                    onBlur={() => handleBlur("repairType")}
                  >
                    <option value="" disabled hidden></option>
                    <option value="periodic">🛢️ صيانة دورية</option>
                    <option value="mechanical">🔧 صيانة ميكانيكية</option>
                    <option value="electrical">⚡ صيانة كهربائية</option>
                    <option value="accident">🚗 صيانة حوادث</option>
                  </select>
                  <label>نوع الصيانة</label>
                  {repairType && !errors.repairType && <span className="valid-icon-full">✓</span>}
                  {touched.repairType && errors.repairType && <span className="error-msg-full">{errors.repairType}</span>}
                </div>
              </div>

              <button 
                type="submit" 
                className={`submit-btn-full ${!name || !phone || !carModel || !repairType || errors.name || errors.phone || errors.carModel || errors.repairType ? "disabled" : "ready"}`} 
                disabled={isSubmitting || !name || !phone || !carModel || !repairType || errors.name || errors.phone || errors.carModel || errors.repairType}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    <span>جاري الإرسال...</span>
                  </>
                ) : (
                  <>
                    <span>تأكيد الحجز</span>
                    <div className="btn-glow"></div>
                  </>
                )}
              </button>
            </form>

            <div className="trust-badges-full">
              <div className="trust-item-full">
                <div className="trust-icon-full">🛡️</div>
                <div>
                  <strong>ضمان معتمد</strong>
                  <span>تويوتا الأصلية</span>
                </div>
              </div>
              <div className="trust-item-full">
                <div className="trust-icon-full">🎧</div>
                <div>
                  <strong>دعم فني</strong>
                  <span>طوال أيام الأسبوع</span>
                </div>
              </div>
              <div className="trust-item-full">
                <div className="trust-icon-full">📜</div>
                <div>
                  <strong>قطع أصلية</strong>
                  <span>100% تويوتا</span>
                </div>
              </div>
              <div className="trust-item-full">
                <div className="trust-icon-full">⚡</div>
                <div>
                  <strong>خدمة سريعة</strong>
                  <span>خلال 24 ساعة</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Requests Section */}
        <div className="requests-wrapper-full">
          <div className="requests-header-full">
            <div className="requests-title-icon">
              <i className="fas fa-history"></i>
            </div>
            <h3>آخر طلبات الصيانة</h3>
            <div className="auto-refresh-full">
              <i className="fas fa-sync-alt"></i>
              <span>تحديث تلقائي</span>
            </div>
          </div>

          <div className="requests-list-full">
            {loading ? (
              <div className="loading-state-full">
                <div className="loading-spinner-full"></div>
                <span>جاري التحميل...</span>
              </div>
            ) : requests.length === 0 ? (
              <div className="empty-state-full">
                <div className="empty-emoji-full">✨</div>
                <h4>لا توجد طلبات بعد</h4>
                <p>كن أول من يطلب صيانة تويوتا</p>
              </div>
            ) : (
              displayedRequests.map((req, index) => (
                <div key={req.id} className="request-card-full" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="request-rank-full">{index + 1}</div>
                  <div className="request-info-full">
                    <div className="request-name-full">{req.name}</div>
                    <div className="request-car-full">🚙 {req.carModel}</div>
                    <div className="request-type-full">{getRepairTypeName(req.repairType)}</div>
                    <div className="request-time-full">
                      <i className="fas fa-clock"></i>
                      {formatDate(req.date)}
                    </div>
                  </div>
                  <div className="request-status-full">
                    <span className="status-badge-full waiting">⏳ قيد المراجعة</span>
                  </div>
                </div>
              ))
            )}
          </div>

         
          <div className="requests-footer-full">
            <i className="fas fa-clock"></i>
            <span>يتم تحديث الطلبات كل 10 ثواني تلقائياً</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepairForm;