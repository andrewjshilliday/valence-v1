import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NowPlayingComponent } from './components/now-playing/now-playing.component';
import { QueueComponent } from './components/queue/queue.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    NowPlayingComponent,
    QueueComponent,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    NowPlayingComponent,
    QueueComponent,
  ],
  entryComponents: [
    QueueComponent
  ],
})
export class PlayerModule { }
