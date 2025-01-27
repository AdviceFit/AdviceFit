type Routes = {
    home: string;
    sign_in: string;
    sign_up: string;
    allowRoutes: string[];
    dashboardPath: string;
    dasboard: {
        attendence: string;
        centers: string;
        members: string;
        visitors: string;
        reports: string,
        sessions: string,
        expenses: string,
        messages: string,
        setup: string,
    }
};

const dashboardPath = "/dashboard";

const APP_ROUTES: Routes = {
    home: "/",
    sign_in: "/sign-in",
    sign_up: "/sign-up",
    allowRoutes: ['attendence', 'centers', 'members', 'visitors','reports', 'sessions', 'expenses', 'message-center', 'setup'],
    dashboardPath: dashboardPath,
    dasboard: {
        attendence: `/dashboard/attendence`,
        centers: `/dashboard/centers`,
        members: `/dashboard/members`, 
        visitors: `/dashboard/visitors`,
        reports: `/dashboard/reports`,
        sessions: `/dashboard/sessions`,
        expenses: `/dashboard/expenses`,
        messages: `/dashboard/message-center`,
        setup: `/dashboard/setup`,
    }
}

export default APP_ROUTES;
