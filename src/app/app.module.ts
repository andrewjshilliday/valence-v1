import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlayerModule } from './player/player.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { ForYouComponent } from './pages/for-you/for-you.component';
import { LibraryComponent } from './pages/library/library.component';
import { SearchComponent } from './pages/search/search.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { PlaylistsComponent } from './pages/playlists/playlists.component';
import { CuratorsComponent } from './pages/curators/curators.component';

@NgModule({
  declarations: [
    AppComponent,
    BrowseComponent,
    ForYouComponent,
    LibraryComponent,
    SearchComponent,
    ArtistsComponent,
    AlbumsComponent,
    PlaylistsComponent,
    CuratorsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PlayerModule,
    SharedModule,
    RouterModule.forRoot([
      { path: 'browse', component: BrowseComponent },
      { path: 'foryou', component: ForYouComponent },
      { path: 'search', component: SearchComponent },
      { path: 'artists/:id', component: ArtistsComponent },
      { path: 'albums/:id', component: AlbumsComponent },
      { path: 'playlists/:id', component: PlaylistsComponent },
      { path: 'curators/:type/:id', component: CuratorsComponent },
      { path: 'library', redirectTo: 'library/recently-added', pathMatch: 'full' },
      { path: 'library/:type', component: LibraryComponent },
      { path: 'library/artists/:id', component: ArtistsComponent },
      { path: 'library/albums/:id', component: AlbumsComponent },
      { path: 'library/playlists/:id', component: PlaylistsComponent },
      { path: '', redirectTo: 'browse', pathMatch: 'full' },
      { path: '**', redirectTo: 'browse', pathMatch: 'full' }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
