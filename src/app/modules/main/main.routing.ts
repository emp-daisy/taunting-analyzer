import { Routes } from '@angular/router';

import MainComponent from './main.component';

export const ROUTES: Routes = [{
    // path: 'analyzer',
    path: '',
    component: MainComponent,
    loadChildren: () => import('./analyzer/analyzer.module')
        .then(m => m.AnalyzerModule)
}];
