import { Routes } from "@angular/router";
import { MemberGuard } from "projects/main-area/src/app/guard/member.guard";
import { ContentMemberComponent } from "./components/content/content-member.component";
import { RegistrationComponent } from "./pages/registration/registration.component";

export const memberAreaRoutes: Routes = [
    {
        path: "registrations",
        component: RegistrationComponent
    },
    {
        path: 'homes',
        component: ContentMemberComponent,
        loadChildren: () => import('./pages/home/home.module').then(u => u.HomeModule),
        canLoad: [MemberGuard]
    },
    {
        path: 'activities',
        component: ContentMemberComponent,
        loadChildren: () => import('./pages/activity/activity.module').then(u => u.ActivityModule),
        canLoad: [MemberGuard]
    },
    {
        path: 'profiles',
        component: ContentMemberComponent,
        loadChildren: () => import('./pages/profile/profile-member.module').then(u => u.ProfileMemberModule),
        canLoad: [MemberGuard]
    },
    {
        path: 'member-information-reports/members',
        component: ContentMemberComponent,
        loadChildren: () => import('./pages/information-report-member/information-report-member.module').then(u => u.InformationReportMemberModule),
        canLoad: [MemberGuard]
    },
    {
        path: 'income-information-reports/members',
        component: ContentMemberComponent,
        loadChildren: () => import('./pages/information-report-income/information-report-income.module').then(u => u.InformationReportIncomeModule),
        canLoad: [MemberGuard]
    },
    {
        path: 'articles/members',
        component: ContentMemberComponent,
        loadChildren: () => import('./pages/article/article.module').then(u => u.ArticleModule),
        canLoad: [MemberGuard]
    }
]