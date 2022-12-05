import { Routes } from "@angular/router"
import { AdminGuard } from "projects/main-area/src/app/guard/admin.guard"
import { SuperAdminGuard } from "projects/main-area/src/app/guard/super-admin.guard"
import { ContentAdminComponent } from "./components/content/admin/content-admin.component"
import { ContentSuperAdminComponent } from "./components/content/super-admin/content-super-admin.component"

export const adminAreaRoutes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(u => u.DashboardModule)
    },
    {
        path: 'profiles',
        loadChildren: () => import('./pages/profile/profile-admin.module').then(u => u.ProfileAdminModule)
    },
    {
        path: 'users',
        component: ContentSuperAdminComponent,
        loadChildren: () => import('./pages/user/user.module').then(u => u.UserModule),
        canLoad: [SuperAdminGuard]
    },
    {
        path: 'positions',
        component: ContentSuperAdminComponent,
        loadChildren: () => import('./pages/position/position.module').then(u => u.PositionModule),
        canLoad: [SuperAdminGuard]
    },
    {
        path: 'industries',
        component: ContentSuperAdminComponent,
        loadChildren: () => import('./pages/industry/industry.module').then(u => u.IndustryModule),
        canLoad: [SuperAdminGuard]
    },
    {
        path: 'member-reports',
        component: ContentSuperAdminComponent,
        loadChildren: () => import('./pages/member-report/member-report.module').then(u => u.MemberReportModule),
        canLoad: [SuperAdminGuard]
    },
    {
        path: 'articles/admin',
        component: ContentAdminComponent,
        loadChildren: () => import('./pages/article/article.module').then(u => u.ArticleModule),
        canLoad: [AdminGuard]
    },
    {
        path: 'approve-activity-payments',
        component: ContentAdminComponent,
        loadChildren: () => import('./pages/approve-activity-payment/activity-payment.module').then(u => u.ActivityPaymentModule),
        canLoad: [AdminGuard]
    },
    {
        path: 'approve-subscriber-payments',
        component: ContentAdminComponent,
        loadChildren: () => import('./pages/aprrove-subscriber-payment/subscriber-payment.module').then(u => u.SubscriberPaymentModule),
        canLoad: [AdminGuard]
    },
    {
        path: 'member-information-reports/super-admin',
        component: ContentSuperAdminComponent,
        loadChildren: () => import('./pages/information-report-member/information-report-member-admin.module').then(u => u.InformationReportMemberAdminModule)
    },
    {
        path: 'income-information-reports/super-admin',
        component: ContentSuperAdminComponent,
        loadChildren: () => import('./pages/information-report-income/information-report-income-admin.module').then(u => u.InformationReportIncomeAdminModule)
    }
]