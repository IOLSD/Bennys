// ============================================================
//  إعدادات الموقع — عدّل هنا فقط
// ============================================================
window.SITE_CONFIG = {
  title: "Bennys",        // العنوان الإنجليزي أعلى البطاقة
  subtitle: "Workshop",              // السطر الصغير البرتقالي
  welcomeBar: "Welcome to the Bennys",
  footerOwner: "Nawwf",          // صاحب الحقوق
  footerNote: "Bennys | الحقوق محفوظة لـ",
  creditLabel: "",                   // اكتب اسم المطور في creditName وتظهر سطر ثاني في الفوتر
  creditName: "",                    // اتركه فاضي لإخفاء السطر

  // أزرار القائمة الرئيسية
  // icon = اسم أيقونة Font Awesome (مجانية)
  // url  = رابط يفتح عند الضغط (اتركه فاضي ويطلع "قريباً")
  menu: [
    { label: "جدول الورشة",     icon: "fa-calendar-days",      url: "https://docs.google.com/spreadsheets/d/1yD9kEXluaN6Df5zQDMUp5anJ1CbKZakZJg1PZc2-JHI/edit?gid=430321705#gid=430321705" },
    { label: "طلبات التصليح",   icon: "fa-screwdriver-wrench", url: "" },
    { label: "أسعار الخدمات",   icon: "fa-money-bill-wave",    url: "" },
    { label: "قطع الغيار",       icon: "fa-gears",              url: "" },
    { label: "الإجازات",         icon: "fa-plane-departure",    url: "" },
    { label: "الاستقالة",        icon: "fa-user-slash",         url: "" },
    { label: "التقارير",         icon: "fa-file-lines",         url: "" },
    { label: "تقييم الأداء",     icon: "fa-star",               url: "" },
    { label: "التقديم على الورشة", icon: "fa-id-card",          url: "" },
    { label: "المستودع",         icon: "fa-warehouse",          url: "" },
    { label: "حاسبة الساعات",   icon: "fa-clock",              url: "", wide: true }
  ]
};
