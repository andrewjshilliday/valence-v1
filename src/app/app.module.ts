import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ForYouComponent } from './for-you/for-you.component';
import { BrowseComponent } from './browse/browse.component';
import { LibraryComponent } from './library/library.component';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsComponent } from './artists/artists.component';
import { CuratorsComponent } from './curators/curators.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NowPlayingComponent } from './now-playing/now-playing.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { MediaItemViewComponent } from './media-item-components/media-item-view/media-item-view.component';
import { MediaItemCollectionListComponent } from './/media-item-components/media-item-collection-list/media-item-collection-list.component';
import { MediaItemCollectionRowComponent } from './media-item-components/media-item-collection-row/media-item-collection-row.component';
import { MinutesSecondsPipe } from './pipes/minutes-seconds.pipe';
import { HoursMinutesPipe } from './pipes/hours-minutes.pipe';
import { AlbumFilterPipe } from './pipes/album-filter.pipe';
import { SearchResultsGuard } from './search-results/search-results.guard';
import { LazyLoadImageDirective } from './lazy-load-image/lazy-load-image.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumsComponent,
    ArtistsComponent,
    CuratorsComponent,
    SidebarComponent,
    NowPlayingComponent,
    SearchResultsComponent,
    ForYouComponent,
    BrowseComponent,
    LibraryComponent,
    TopBarComponent,
    PlaylistsComponent,
    MediaItemViewComponent,
    MediaItemCollectionListComponent,
    MediaItemCollectionRowComponent,
    MinutesSecondsPipe,
    HoursMinutesPipe,
    AlbumFilterPipe,
    LazyLoadImageDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'foryou', component: ForYouComponent },
      { path: 'browse', component: BrowseComponent },
      { path: 'searchresults', component: SearchResultsComponent },
      { path: 'artists/:id', component: ArtistsComponent },
      { path: 'albums/:id', component: AlbumsComponent },
      { path: 'playlists/:id', component: PlaylistsComponent },
      { path: 'curators/:type/:id', component: CuratorsComponent },
      { path: 'library', redirectTo: 'library/recently-added', pathMatch: 'full' },
      { path: 'library/:type', component: LibraryComponent },
      { path: 'library/artists/:id', component: ArtistsComponent },
      { path: 'library/albums/:id', component: AlbumsComponent },
      { path: 'library/playlists/:id', component: PlaylistsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
