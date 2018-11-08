declare var MusicKit: any;

export class Utils {

  static getArtistArtwork(url: string) {
  }

  public static appleApiHeaders () {
    return new Headers({
      Authorization: 'Bearer ' + MusicKit.getInstance().developerToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Music-User-Token': '' + MusicKit.getInstance().musicUserToken
    });
  }

}
