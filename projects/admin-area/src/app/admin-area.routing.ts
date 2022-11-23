import { Routes } from "@angular/router"
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
        loadChildren: () => import('./pages/user/user.module').then(u => u.UserModule)
    },
    {
        path: 'positions',
        component: ContentSuperAdminComponent,
        loadChildren: () => import('./pages/position/position.module').then(u => u.PositionModule)
    },
    {
        path: 'industries',
        component: ContentSuperAdminComponent,
        loadChildren: () => import('./pages/industry/industry.module').then(u => u.IndustryModule)
    },
    {
        path: 'member-reports',
        component: ContentSuperAdminComponent,
        loadChildren: () => import('./pages/member-report/member-report.module').then(u => u.MemberReportModule)
    },
    {
        path: 'articles',
        component: ContentAdminComponent,
        loadChildren: () => import('./pages/article/article.module').then(u => u.ArticleModule)
    },
    {
        path: 'approve-activity-payments',
        component: ContentAdminComponent,
        loadChildren: () => import('./pages/approve-activity-payment/activity-payment.module').then(u => u.ActivityPaymentModule)
    },
    {
        path: 'approve-subscriber-payments',
        component: ContentAdminComponent,
        loadChildren: () => import('./pages/aprrove-subscriber-payment/subscriber-payment.module').then(u => u.SubscriberPaymentModule)
    }
]