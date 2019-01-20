import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { MediaItemViewComponent } from './components/media-item-view/media-item-view.component';
import { MediaItemCollectionListComponent } from './components/media-item-collection-list/media-item-collection-list.component';
import { MediaItemCollectionRowComponent } from './components/media-item-collection-row/media-item-collection-row.component';
import { MediaItemCollectionGridComponent } from './components/media-item-collection-grid/media-item-collection-grid.component';
import { MinutesSecondsPipe } from './pipes/minutes-seconds.pipe';
import { HoursMinutesPipe } from './pipes/hours-minutes.pipe';
import { AlbumFilterPipe } from './pipes/album-filter.pipe';
import { PlaylistFilterPipe } from './pipes/playlist-filter.pipe';
import { RoundPipe } from './pipes/round.pipe';
import { LazyLoadImageDirective } from './directives/lazy-load-image/lazy-load-image.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  declarations: [
    MediaItemViewComponent,
    MediaItemCollectionListComponent,
    MediaItemCollectionRowComponent,
    MediaItemCollectionGridComponent,
    MinutesSecondsPipe,
    HoursMinutesPipe,
    AlbumFilterPipe,
    PlaylistFilterPipe,
    RoundPipe,
    LazyLoadImageDirective
  ],
  exports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule,
    MediaItemViewComponent,
    MediaItemCollectionListComponent,
    MediaItemCollectionRowComponent,
    MediaItemCollectionGridComponent,
    MinutesSecondsPipe,
    HoursMinutesPipe,
    AlbumFilterPipe,
    PlaylistFilterPipe,
    RoundPipe,
    LazyLoadImageDirective
  ]
})
export class SharedModule { }
