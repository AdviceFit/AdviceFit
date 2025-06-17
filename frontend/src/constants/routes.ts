type Routes = {
  home: string;
  sign_in: string;
  sign_up: string;
  allowRoutes: string[];
  dashboardPath: string;
  personalDetailsPath?: string; // Optional, as it may not be used in all cases
  dashboard: {
    attendance: string;
    centers: string;
    addCenter: string;  
    updateCenter: string;
    members: string;
    addMember: string;
    updateMember: string;
    visitors: string;
    addVisitors: string;
    updateVisitor?: string; // Optional, as it may not be used in all cases
    reports: string;
    subscriptions: string;
    payments: string;
    sessions: string;
    expenses: string;
    messages: string;
    messagesHistory: string;
    setup: string;
    employee: string;
    addEmployee: string;
    updateEmployee: string;
    packages: string;
    addPackage?: string; // Optional, as it may not be used in all cases
    updatePackage?: string; // Optional, as it may not be used in all cases
    emails: string;
    loginReports: string;
    downloadReports: string;
  };
  memberScreen: {
    personalDetails: string;
    mySubscription: string;
    paymentHistory: string;
    orderHistory: string;
    dietPlan: string;
    fitnessData: string;
    myReview: string;
    attendance: string;
  };
};

const dashboardPath = "/dashboard";
const personalDetailsPath = "/personal-details";

const APP_ROUTES: Routes = {
  home: "/",
  sign_in: "/sign-in",
  sign_up: "/sign-up",
 
  allowRoutes: [
    "attendance",
    "centers",
    "add-center",
    "update-center",
    "members",
    "add-member",
    "update-member",
    "visitors",
    "add-visitors",
    "update-visitor",
    "reports",
    "subscriptions",
    "payments",
    "sessions",
    "expenses",
    "send-bulk-message",
    "send-bulk-emails",
    "message-history",
    "setup",
    "employees",
    "add-employee",
    "update-employee",
    "packages",
    "add-package",
    "update-package",
    
    "my-subscription",
    "payment-history",
    "order-history",
    "diet-plan",
    "fitness-data",
    "my-review",
    "attendance",
    "login-reports",
    "download-reports",
  ],
  dashboardPath,
  dashboard: {
    attendance: `/dashboard/attendance`,
    centers: `/dashboard/centers`,
    addCenter: `/dashboard/add-center`,
    updateCenter: `/dashboard/update-center`,
    members: `/dashboard/members`,
    addMember: `/dashboard/add-member`,
    updateMember: `/dashboard/update-member`,
    visitors: `/dashboard/visitors`,
    addVisitors: `/dashboard/add-visitor`,
    updateVisitor: `/dashboard/update-visitor`,
    reports: `/dashboard/reports`,
    subscriptions: `/dashboard/subscriptions`,
    payments: `/dashboard/payments`,
    sessions: `/dashboard/sessions`,
    expenses: `/dashboard/expenses`,
    messages: `/dashboard/send-bulk-message`,
    emails: `/dashboard/send-bulk-emails`,
    messagesHistory: `/dashboard/message-history`,
    setup: `/dashboard/setup`,
    employee: `/dashboard/employees`,
    addEmployee: `/dashboard/add-employee`,
    updateEmployee: `/dashboard/update-employee`,
    packages: `/dashboard/packages`,
    addPackage: `/dashboard/add-package`,
    updatePackage: `/dashboard/update-package`,
    loginReports: `/dashboard/login-reports`,
    downloadReports: `/dashboard/download-reports`,
  },
  memberScreen: {
    personalDetails: `/personal-details`,
    mySubscription: `/my-subscription`,
    paymentHistory: `/payment-history`,
    orderHistory: `/order-history`,
    dietPlan: `/diet-plan`,
    fitnessData: `/fitness-data`,
    myReview: `/my-review`,
    attendance: `/attendance`,
  },
};

export default APP_ROUTES;
