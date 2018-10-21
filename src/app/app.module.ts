import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ForYouComponent } from './for-you/for-you.component';
import { LibraryComponent } from './library/library.component';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsComponent } from './artists/artists.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NowPlayingComponent } from './now-playing/now-playing.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { MediaItemViewComponent } from './media-item-view/media-item-view.component';
import { MinutesSecondsPipe } from './pipes/minutes-seconds.pipe';
import { HoursMinutesPipe } from './pipes/hours-minutes.pipe';
import { AlbumFilterPipe } from './pipes/album-filter.pipe';
import { SearchResultsGuard } from './search-results/search-results.guard';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumsComponent,
    ArtistsComponent,
    SidebarComponent,
    NowPlayingComponent,
    SearchResultsComponent,
    ForYouComponent,
    LibraryComponent,
    TopBarComponent,
    PlaylistsComponent,
    MediaItemViewComponent,
    MinutesSecondsPipe,
    HoursMinutesPipe,
    AlbumFilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'foryou', component: ForYouComponent },
      { path: 'library', component: LibraryComponent },
      { path: 'searchresults', canActivate: [SearchResultsGuard], component: SearchResultsComponent },
      { path: 'artists/:id', component: ArtistsComponent },
      { path: 'albums/:id', component: AlbumsComponent },
      { path: 'playlists/:id', component: PlaylistsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
