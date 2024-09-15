import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainContentComponent } from './main-content/main-content.component';
import { View1Component } from './view-1/view-1.component';
import { View2Component } from './view-2/view-2.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: MainContentComponent 
    },
    {
        path: 'vista1',
        component: View1Component
    },
    {
        path: 'vista2',
        component: View2Component
    }
];
