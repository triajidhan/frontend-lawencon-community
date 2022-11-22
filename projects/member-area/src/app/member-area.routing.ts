import { Routes } from "@angular/router";
import { ContentMemberComponent } from "./components/content/content-member.component";
import { RegistrationComponent } from "./pages/registration/registration.component";

export const memberAreaRoutes: Routes = [
    {
        path: "registrations",
        component: RegistrationComponent
    },
    {
        path: 'threads',
        component: ContentMemberComponent,
        loadChildren: () => import('./pages/thread/thread.module').then(u => u.ThreadModule)
    },
]