import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CoreModule } from 'src/app/core/core.module';
import AnalyzerComponent from './analyzer.component';
import { ROUTES } from './analyzer.routes';

@NgModule({
    declarations: [ AnalyzerComponent ],
    imports: [
        CoreModule,
        RouterModule.forChild(ROUTES),
        ReactiveFormsModule,FormsModule,
        MatSelectModule,
        MatIconModule,
        MatSliderModule,
        MatTooltipModule,
    ]
})
export class AnalyzerModule {}
