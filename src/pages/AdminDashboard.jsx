import { useEffect, useState } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  // Authentication States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePasswordError, setChangePasswordError] = useState("");
  const [changePasswordSuccess, setChangePasswordSuccess] = useState("");

  // Main Dashboard States
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [stats, setStats] = useState({ total: 0, new: 0, working: 0, done: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showConfetti, setShowConfetti] = useState(false);

  const API = "http://localhost:3000/repair";
  const DEFAULT_PASSWORD = "admin123";

  // Initialize password in localStorage if not exists
  useEffect(() => {
    if (!localStorage.getItem("adminPassword")) {
      localStorage.setItem("adminPassword", DEFAULT_PASSWORD);
    }
  }, []);

  // Check authentication on mount
  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuthenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    const savedPassword = localStorage.getItem("adminPassword");
    
    if (password === savedPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuthenticated", "true");
      setPassword("");
      setPasswordError("");
      showToastMessage("✅ تم تسجيل الدخول بنجاح", "success");
    } else {
      setPasswordError("❌ كلمة المرور غير صحيحة");
    }
  };

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("adminAuthenticated");
    setIsAuthenticated(false);
    showToastMessage("👋 تم تسجيل الخروج بنجاح", "success");
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setChangePasswordError("");
    setChangePasswordSuccess("");

    const savedPassword = localStorage.getItem("adminPassword");

    if (oldPassword !== savedPassword) {
      setChangePasswordError("❌ كلمة المرور الحالية غير صحيحة");
      return;
    }

    if (newPassword.length < 6) {
      setChangePasswordError("❌ كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    if (newPassword !== confirmPassword) {
      setChangePasswordError("❌ كلمة المرور الجديدة وتأكيدها غير متطابقين");
      return;
    }

    localStorage.setItem("adminPassword", newPassword);
    setChangePasswordSuccess("✅ تم تغيير كلمة المرور بنجاح");
    
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    
    setTimeout(() => {
      setShowPasswordChange(false);
      setChangePasswordSuccess("");
    }, 2000);
  };

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    if (type === "success") {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
    setTimeout(() => setShowToast(false), 3000);
  };

  // الوقت الحالي
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // جلب البيانات
  const fetchRequests = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      const reversed = [...data].reverse();
      setRequests(reversed);
      calculateStats(reversed);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching:", error);
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    setStats({
      total: data.length,
      new: data.filter(r => (r.status || "new") === "new").length,
      working: data.filter(r => r.status === "working").length,
      done: data.filter(r => r.status === "done").length
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRequests();
      const interval = setInterval(fetchRequests, 10000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const updateStatus = async (id, status) => {
    const item = requests.find((r) => r.id === id);
    if (!item) return;

    try {
      await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, status }),
      });
      fetchRequests();
      const statusMessages = {
        new: "🆕 جديد",
        working: "🔧 قيد التنفيذ",
        done: "✅ مكتمل"
      };
      showToastMessage(`✨ تم تحديث الحالة إلى ${statusMessages[status]} بنجاح`, "success");
    } catch (error) {
      showToastMessage(`❌ حدث خطأ في تحديث الحالة`, "error");
    }
  };

  const openDeleteConfirm = (id, name) => {
    setDeleteTarget({ id, name });
    setShowDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    setDeleteTarget(null);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    
    try {
      await fetch(`${API}/${deleteTarget.id}`, { method: "DELETE" });
      fetchRequests();
      showToastMessage(`🗑️ تم حذف طلب "${deleteTarget.name}" بنجاح`, "success");
      closeDeleteConfirm();
    } catch (error) {
      showToastMessage(`❌ حدث خطأ في حذف الطلب`, "error");
      closeDeleteConfirm();
    }
  };

  const showDetails = (request) => {
    setSelectedRequest(request);
  };

  const closeDetails = () => {
    setSelectedRequest(null);
  };

  const exportToExcel = () => {
    const headers = ["#", "الاسم", "رقم الجوال", "موديل السيارة", "نوع الصيانة", "الحالة", "التاريخ", "الوقت"];
    const rows = requests.map((req, index) => [
      index + 1,
      req.name,
      req.phone,
      req.carModel || "—",
      getRepairTypeArabic(req.repairType),
      getStatusText(req.status || "new"),
      new Date(req.date).toLocaleDateString("ar-EG"),
      new Date(req.date).toLocaleTimeString("ar-EG", { hour: '2-digit', minute: '2-digit' })
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `طلبات_الصيانة_${new Date().toLocaleDateString("ar-EG")}.csv`;
    link.click();
    showToastMessage(`📊 تم تصدير ${rows.length} طلب بنجاح`, "success");
  };

  const getStatusText = (status) => {
    const texts = { new: "جديد", working: "قيد التنفيذ", done: "مكتمل" };
    return texts[status] || "جديد";
  };

  const getRepairTypeArabic = (type) => {
    const types = {
      periodic: "صيانة دورية",
      mechanical: "صيانة ميكانيكية",
      electrical: "صيانة كهربائية",
      accident: "صيانة حوادث"
    };
    return types[type] || type;
  };

  const getRepairTypeIcon = (type) => {
    const icons = { periodic: "🛢️", mechanical: "🔧", electrical: "⚡", accident: "🚗" };
    return icons[type] || "🔧";
  };

  const filteredRequests = requests.filter((r) => {
    const matchSearch =
      r.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.phone?.includes(search) ||
      r.carModel?.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const formatTime = () => {
    return currentTime.toLocaleTimeString("ar-EG", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString("ar-EG", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="login-screen">
        <div className="login-container">
          <div className="login-logo">
            <div className="login-logo-icon">🚗</div>
            <h1>تويوتا <span>موتور</span></h1>
            <p>مركز صيانة معتمد</p>
          </div>
          <div className="login-card">
            <h2>تسجيل الدخول</h2>
            <p className="login-subtitle">أدخل كلمة المرور للوصول إلى لوحة التحكم</p>
            <form onSubmit={handleLogin}>
              <div className="login-input-group">
                <span className="login-icon">🔒</span>
                <input
                  type="password"
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
              </div>
              {passwordError && <div className="login-error">{passwordError}</div>}
              <button type="submit" className="login-btn">
                <span>🚪</span> دخول
              </button>
            </form>
          </div>
          <div className="login-footer">
            <p>© 2025 تويوتا موتور - جميع الحقوق محفوظة</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-logo">🚗</div>
        <div className="loading-wave">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <p>جاري تحميل البيانات...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="confetti" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`
            }}></div>
          ))}
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className={`toast toast-${toastType}`}>
          <div className="toast-icon">{toastType === "success" ? "🎉" : "⚠️"}</div>
          <div className="toast-message">{toastMessage}</div>
          <div className="toast-progress"></div>
        </div>
      )}

      {/* Password Change Modal */}
      {showPasswordChange && (
        <div className="modal-overlay" onClick={() => setShowPasswordChange(false)}>
          <div className="password-modal" onClick={(e) => e.stopPropagation()}>
            <div className="password-modal-header">
              <h3>🔐 تغيير كلمة المرور</h3>
              <button className="modal-close" onClick={() => setShowPasswordChange(false)}>✕</button>
            </div>
            <form onSubmit={handlePasswordChange}>
              <div className="password-modal-body">
                {changePasswordError && (
                  <div className="password-error">{changePasswordError}</div>
                )}
                {changePasswordSuccess && (
                  <div className="password-success">{changePasswordSuccess}</div>
                )}
                <div className="password-input-group">
                  <label>كلمة المرور الحالية</label>
                  <input
                    type="password"
                    placeholder="أدخل كلمة المرور الحالية"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="password-input-group">
                  <label>كلمة المرور الجديدة</label>
                  <input
                    type="password"
                    placeholder="أدخل كلمة المرور الجديدة"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <span className="password-hint">يجب أن تكون 6 أحرف على الأقل</span>
                </div>
                <div className="password-input-group">
                  <label>تأكيد كلمة المرور الجديدة</label>
                  <input
                    type="password"
                    placeholder="أعد إدخال كلمة المرور الجديدة"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="password-modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setShowPasswordChange(false)}>
                  إلغاء
                </button>
                <button type="submit" className="save-btn">
                  حفظ التغييرات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && deleteTarget && (
        <div className="modal-overlay" onClick={closeDeleteConfirm}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-modal-header">
              <div className="confirm-icon">🗑️</div>
              <h3>تأكيد الحذف</h3>
            </div>
            <div className="confirm-modal-body">
              <p>هل أنت متأكد من حذف طلب <strong>"{deleteTarget.name}"</strong>؟</p>
              <p className="confirm-warning">⚠️ هذا الإجراء لا يمكن التراجع عنه</p>
            </div>
            <div className="confirm-modal-footer">
              <button className="confirm-cancel" onClick={closeDeleteConfirm}>
                <span>✕</span> إلغاء
              </button>
              <button className="confirm-delete" onClick={confirmDelete}>
                <span>🗑️</span> حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedRequest && (
        <div className="modal-overlay" onClick={closeDetails}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card-header">
              <h3>📋 تفاصيل الطلب</h3>
              <button className="modal-close" onClick={closeDetails}>✕</button>
            </div>
            <div className="modal-card-body">
              <div className="detail-item">
                <span className="detail-icon">👤</span>
                <span className="detail-label">الاسم</span>
                <span className="detail-value">{selectedRequest.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📱</span>
                <span className="detail-label">رقم الجوال</span>
                <span className="detail-value">{selectedRequest.phone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🚙</span>
                <span className="detail-label">موديل السيارة</span>
                <span className="detail-value">{selectedRequest.carModel || "—"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🔧</span>
                <span className="detail-label">نوع الصيانة</span>
                <span className="detail-value">{getRepairTypeArabic(selectedRequest.repairType)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📅</span>
                <span className="detail-label">التاريخ</span>
                <span className="detail-value">{new Date(selectedRequest.date).toLocaleDateString("ar-EG")}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">⏰</span>
                <span className="detail-label">الوقت</span>
                <span className="detail-value">{new Date(selectedRequest.date).toLocaleTimeString("ar-EG")}</span>
              </div>
            </div>
            <div className="modal-card-footer">
              {(!selectedRequest.status || selectedRequest.status === "new") && (
                <button className="btn-working" onClick={() => {
                  updateStatus(selectedRequest.id, "working");
                  closeDetails();
                }}>
                  🔧 بدء التنفيذ
                </button>
              )}
              {selectedRequest.status === "working" && (
                <>
                  <button className="btn-back" onClick={() => {
                    updateStatus(selectedRequest.id, "new");
                    closeDetails();
                  }}>
                    ↩️ رجوع إلى جديد
                  </button>
                  <button className="btn-done" onClick={() => {
                    updateStatus(selectedRequest.id, "done");
                    closeDetails();
                  }}>
                    ✅ إنهاء الطلب
                  </button>
                </>
              )}
              {selectedRequest.status === "done" && (
                <button className="btn-back" onClick={() => {
                  updateStatus(selectedRequest.id, "working");
                  closeDetails();
                }}>
                  ↩️ رجوع إلى قيد التنفيذ
                </button>
              )}
              <button className="btn-close" onClick={closeDetails}>إغلاق</button>
              <button className="btn-delete" onClick={() => {
                closeDetails();
                openDeleteConfirm(selectedRequest.id, selectedRequest.name);
              }}>🗑️ حذف</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <div className="logo-3d">🚗</div>
            <div className="logo-text">
              <h1>تويوتا <span className="highlight">موتور</span></h1>
              <p>مركز صيانة معتمد</p>
            </div>
          </div>
          <div className="live-clock">
            <div className="clock-icon">🕐</div>
            <div className="clock-info">
              <div className="clock-time">{formatTime()}</div>
              <div className="clock-date">{formatDate()}</div>
            </div>
          </div>
        </div>
        
        <div className="header-right">
          <button className="change-password-btn" onClick={() => setShowPasswordChange(true)}>
            🔐 تغيير كلمة المرور
          </button>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="🔍 بحث بالاسم أو رقم الجوال..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && <span className="search-clear" onClick={() => setSearch("")}>✕</span>}
          </div>
          <button className="export-btn" onClick={exportToExcel}>
            📊 تصدير Excel
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 خروج
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📊</div>
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">إجمالي الطلبات</div>
        </div>
        <div className="stat-card new">
          <div className="stat-icon pulse">🆕</div>
          <div className="stat-number">{stats.new}</div>
          <div className="stat-label">جديد</div>
          <div className="stat-badge">يحتاج مراجعة</div>
        </div>
        <div className="stat-card working">
          <div className="stat-icon spin">🔧</div>
          <div className="stat-number">{stats.working}</div>
          <div className="stat-label">قيد التنفيذ</div>
          <div className="stat-progress">
            <div className="progress-bar" style={{ width: stats.total > 0 ? `${(stats.working / stats.total) * 100}%` : "0%" }}></div>
          </div>
        </div>
        <div className="stat-card done">
          <div className="stat-icon bounce">✅</div>
          <div className="stat-number">{stats.done}</div>
          <div className="stat-label">مكتمل</div>
          <div className="stat-check">✓</div>
        </div>
      </div>

      {/* Three Sections for Requests */}
      <div className="three-sections">
        {/* New Requests Section */}
        <div className="section-card new-section">
          <div className="section-header">
            <div className="section-title-icon">🆕</div>
            <h3>الطلبات الجديدة</h3>
            <span className="section-count">{filteredRequests.filter(r => (r.status || "new") === "new").length}</span>
          </div>
          <div className="section-content">
            {filteredRequests.filter(r => (r.status || "new") === "new").length === 0 ? (
              <div className="empty-section">
                <span>📭</span>
                <p>لا توجد طلبات جديدة</p>
              </div>
            ) : (
              <div className="requests-list">
                {filteredRequests.filter(r => (r.status || "new") === "new").map((req, index) => (
                  <div key={req.id} className="request-item new-item">
                    <div className="request-number">{index + 1}</div>
                    <div className="request-details">
                      <div className="request-name">
                        <div className="customer-avatar-small">{req.name.charAt(0)}</div>
                        <span>{req.name}</span>
                      </div>
                      <div className="request-info">
                        <span className="info-phone">📱 {req.phone}</span>
                        <span className="info-car">🚙 {req.carModel || "—"}</span>
                        <span className="info-service">{getRepairTypeIcon(req.repairType)} {getRepairTypeArabic(req.repairType)}</span>
                      </div>
                      <div className="request-time">🕐 {new Date(req.date).toLocaleTimeString("ar-EG", { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                    <div className="request-actions">
                      <a href={`tel:${req.phone}`} className="action-call-small" title="اتصال">📞</a>
                      <a href={`https://wa.me/${req.phone}`} target="_blank" rel="noreferrer" className="action-wa-small" title="واتساب">💬</a>
                      <button className="action-view-small" onClick={() => showDetails(req)} title="عرض التفاصيل">👁️</button>
                      <button className="action-working-small" onClick={() => updateStatus(req.id, "working")} title="نقل إلى قيد التنفيذ">🔧</button>
                      <button className="action-delete-small" onClick={() => openDeleteConfirm(req.id, req.name)} title="حذف">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Working Requests Section */}
        <div className="section-card working-section">
          <div className="section-header">
            <div className="section-title-icon">🔧</div>
            <h3>قيد التنفيذ</h3>
            <span className="section-count">{filteredRequests.filter(r => r.status === "working").length}</span>
          </div>
          <div className="section-content">
            {filteredRequests.filter(r => r.status === "working").length === 0 ? (
              <div className="empty-section">
                <span>📭</span>
                <p>لا توجد طلبات قيد التنفيذ</p>
              </div>
            ) : (
              <div className="requests-list">
                {filteredRequests.filter(r => r.status === "working").map((req, index) => (
                  <div key={req.id} className="request-item working-item">
                    <div className="request-number">{index + 1}</div>
                    <div className="request-details">
                      <div className="request-name">
                        <div className="customer-avatar-small">{req.name.charAt(0)}</div>
                        <span>{req.name}</span>
                      </div>
                      <div className="request-info">
                        <span className="info-phone">📱 {req.phone}</span>
                        <span className="info-car">🚙 {req.carModel || "—"}</span>
                        <span className="info-service">{getRepairTypeIcon(req.repairType)} {getRepairTypeArabic(req.repairType)}</span>
                      </div>
                      <div className="request-time">🕐 {new Date(req.date).toLocaleTimeString("ar-EG", { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                    <div className="request-actions">
                      <a href={`tel:${req.phone}`} className="action-call-small" title="اتصال">📞</a>
                      <a href={`https://wa.me/${req.phone}`} target="_blank" rel="noreferrer" className="action-wa-small" title="واتساب">💬</a>
                      <button className="action-view-small" onClick={() => showDetails(req)} title="عرض التفاصيل">👁️</button>
                      <button className="action-back-small" onClick={() => updateStatus(req.id, "new")} title="نقل إلى جديد">↩️</button>
                      <button className="action-done-small" onClick={() => updateStatus(req.id, "done")} title="نقل إلى مكتمل">✅</button>
                      <button className="action-delete-small" onClick={() => openDeleteConfirm(req.id, req.name)} title="حذف">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Completed Requests Section */}
        <div className="section-card done-section">
          <div className="section-header">
            <div className="section-title-icon">✅</div>
            <h3>مكتمل</h3>
            <span className="section-count">{filteredRequests.filter(r => r.status === "done").length}</span>
          </div>
          <div className="section-content">
            {filteredRequests.filter(r => r.status === "done").length === 0 ? (
              <div className="empty-section">
                <span>📭</span>
                <p>لا توجد طلبات مكتملة</p>
              </div>
            ) : (
              <div className="requests-list">
                {filteredRequests.filter(r => r.status === "done").map((req, index) => (
                  <div key={req.id} className="request-item done-item">
                    <div className="request-number">{index + 1}</div>
                    <div className="request-details">
                      <div className="request-name">
                        <div className="customer-avatar-small">{req.name.charAt(0)}</div>
                        <span>{req.name}</span>
                      </div>
                      <div className="request-info">
                        <span className="info-phone">📱 {req.phone}</span>
                        <span className="info-car">🚙 {req.carModel || "—"}</span>
                        <span className="info-service">{getRepairTypeIcon(req.repairType)} {getRepairTypeArabic(req.repairType)}</span>
                      </div>
                      <div className="request-time">🕐 {new Date(req.date).toLocaleTimeString("ar-EG", { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                    <div className="request-actions">
                      <a href={`tel:${req.phone}`} className="action-call-small" title="اتصال">📞</a>
                      <a href={`https://wa.me/${req.phone}`} target="_blank" rel="noreferrer" className="action-wa-small" title="واتساب">💬</a>
                      <button className="action-view-small" onClick={() => showDetails(req)} title="عرض التفاصيل">👁️</button>
                      <button className="action-back-small" onClick={() => updateStatus(req.id, "working")} title="نقل إلى قيد التنفيذ">↩️</button>
                      <button className="action-delete-small" onClick={() => openDeleteConfirm(req.id, req.name)} title="حذف">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="dashboard-footer">
        <div className="footer-stats">
          <div className="stat-item">
            <span className="stat-dot red"></span>
            <span>جديد: {stats.new}</span>
          </div>
          <div className="stat-item">
            <span className="stat-dot orange"></span>
            <span>قيد التنفيذ: {stats.working}</span>
          </div>
          <div className="stat-item">
            <span className="stat-dot green"></span>
            <span>مكتمل: {stats.done}</span>
          </div>
        </div>
        <div className="footer-credit">
          <span>عرض {filteredRequests.length} من {requests.length} طلب</span>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 