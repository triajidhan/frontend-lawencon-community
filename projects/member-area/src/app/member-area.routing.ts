import { Routes } from "@angular/router";
import { RegistrationComponent } from "./pages/registration/registration.component";

export const memberAreaRoutes: Routes = [
    {
        path: "registrations",
        component: RegistrationComponent
    },
    {
        path: 'threads',
        loadChildren: () => import('./pages/thread/thread.module').then(u => u.ThreadModule)
    },
]