import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  imports: [
    MatSliderModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSidenavModule,
  ],
  exports: [
    MatSliderModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSidenavModule,
  ],
  declarations: []
})
export class MaterialModule { }
