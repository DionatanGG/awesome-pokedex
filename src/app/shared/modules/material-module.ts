import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
    exports: [       
        MatCardModule,        
        MatInputModule, 
        MatRadioModule,
        MatRippleModule,
        MatSelectModule, 
        MatDialogModule,
        MatIconModule,
        MatToolbarModule
    ]
})
export class MaterialModule { }
