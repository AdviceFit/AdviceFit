type Routes = {
  home: string;
  sign_in: string;
  sign_up: string;
  allowRoutes: string[];
  dashboardPath: string;
  dasboard: {
    attendance: string;
    centers: string;
    members: string;
    visitors: string;
    reports: string;
    subscriptions: string;
    sessions: string;
    expenses: string;
    messages: string;
    setup: string;
    employee: string;
    packages: string;
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

const APP_ROUTES: Routes = {
  home: "/",
  sign_in: "/sign-in",
  sign_up: "/sign-up",
  allowRoutes: [
    "attendance",
    "centers",
    "members",
    "visitors",
    "reports",
    "subscriptions",
    "sessions",
    "expenses",
    "message-center",
    "setup",
    "employees",
    "packages",
    "personal-details",
    "my-subscription",
    "payment-history",
    "order-history",
    "diet-plan",
    "fitness-data",
    "my-review",
    "attendance",
  ],
  dashboardPath: dashboardPath,
  dasboard: {
    attendance: `/dashboard/attendance`,
    centers: `/dashboard/centers`,
    members: `/dashboard/members`,
    visitors: `/dashboard/visitors`,
    reports: `/dashboard/reports`,
    subscriptions: `/dashboard/subscriptions`,
    sessions: `/dashboard/sessions`,
    expenses: `/dashboard/expenses`,
    messages: `/dashboard/message-center`,
    setup: `/dashboard/setup`,
    employee: `/dashboard/employees`,
    packages: `/dashboard/packages`,
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
