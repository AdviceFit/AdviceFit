export const BASE_URL = "http://localhost:9000";
export const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_CLIENT_ID;
export const RAZORPAY_URL = process.env.NEXT_PUBLIC_RAZORPAY_URL;

export const TOAST_MESSAGES = {
  memberAdded: "Member added successfully ..",
  memberUpdated: "Member updated successfully ..",
};

export const MEMBERS_SOURCES = [
  { label: "Walk In", value: "walkIn" },
  { label: "Search Engine", value: "searchEngine" },
  { label: "Social Media", value: "socialMedia" },
  { label: "Ads", value: "ads" },
  { label: "Referral", value: "referral" },
  { label: "Website", value: "website" },
  { label: "Tele Calling", value: "teleCalling" },
  { label: "Just Dial", value: "justDial" },
  { label: "Referred by friend", value: "referredByFriend" },
  { label: "Test Source Name", value: "testSourceName" },
  { label: "Banner", value: "banner" },
  { label: "Newspaper", value: "newspaper" },
  { label: "Others", value: "others" },
];

export const OCCUPATIONS = [
  { label: "Influencer", value: "influencer" },
  { label: "Software Engineer", value: "softwareEngineer" },
  { label: "Salaried", value: "salaried" },
  { label: "Self Employed", value: "selfEmployed" },
  { label: "Student", value: "student" },
  { label: "Doctor", value: "doctor" },
  { label: "Teacher", value: "teacher" },
  { label: "Private Job", value: "privateJob" },
  { label: "House Wife", value: "houseWife" },
  { label: "Govt Job", value: "govtJob" },
  { label: "Pvt Job", value: "pvtJob" },
  { label: "Tester", value: "tester" },
  { label: "IT Software", value: "itSoftware" },
  { label: "Painter", value: "painter" },
  { label: "Test Occu", value: "testOccu" },
  { label: "Others", value: "others" },
];

export const PAYMENT_METHODS = [
  "Cash",
  "Card",
  "Cheque",
  "Paytm",
  "Bank Transfer",
  "UPI",
];

export const REPORT_TYPES = [
  { label: "Membership Report", value: "membership_report" },
  { label: "Member Report", value: "member_report" },
  { label: "Expired Membership Report", value: "expired_membership_report" },
  { label: "Payment Due Report", value: "payment_due_report" },
  { label: "Birthday Report", value: "birthday_report" },
  { label: "Anniversary Report", value: "anniversary_report" },
  { label: "Expense Report", value: "expense_report" },
  { label: "Collection Report", value: "collection_report" },
  { label: "Visitor Report", value: "visitor_report" },
  { label: "Renewal Report", value: "renewal_report" },
  { label: "Employee Attendance Report", value: "employee_attendance_report" },
  { label: "Invoice Report", value: "invoice_report" },
  { label: "Package Report", value: "package_report" },
  { label: "Receipt Report", value: "receipt_report" },
];

export const REPORT_FORMATS = [
  {
    label: "PDF",
    value: "pdf",
  },
  {
    label: "Excel",
    value: "excel",
  },
];
