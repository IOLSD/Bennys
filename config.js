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
    { label: "الإجازات",         icon: "fa-plane-departure",    url: "https://discord.com/channels/1563573174711623800/1563593506352664646/1563600465214840844" },
    { label: "الاستقالة",        icon: "fa-user-slash",         url: "" },
    // { label: "التقارير",         icon: "fa-file-lines",         url: "" },
    // { label: "تقييم الأداء",     icon: "fa-star",               url: "" },
    { label: "التقديم على الورشة", icon: "fa-id-card",          url: "https://docs.google.com/forms/d/e/1FAIpQLSfK_VP0I_MvtDDfhiUJEq62ZrDZRwdLjFFcF3-udkxwoeMz_g/viewform" },
    { label: "المستودع",         icon: "fa-warehouse",          url: "" },
    // { label: "حاسبة الساعات",   icon: "fa-clock",              url: "", wide: true }
  ]
};
