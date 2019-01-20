import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NowPlayingComponent } from './components/now-playing/now-playing.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    NowPlayingComponent,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    NowPlayingComponent,
  ]
})
export class PlayerModule { }
