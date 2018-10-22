import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    MatSliderModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  exports: [
    MatSliderModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  declarations: []
})
export class MaterialModule { }
