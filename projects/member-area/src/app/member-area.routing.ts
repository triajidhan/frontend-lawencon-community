import { Routes } from "@angular/router";
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
        loadChildren: () => import('./pages/home/home.module').then(u => u.HomeModule)
    },
    {
        path: 'activities',
        component: ContentMemberComponent,
        loadChildren: () => import('./pages/activity/activity.module').then(u => u.ActivityModule)
    },
    {
        path: 'profiles',
        component: ContentMemberComponent,
        loadChildren: () => import('./pages/profile/profile-member.module').then(u => u.ProfileMemberModule)
    }
]