import {Component} from '@angular/core';
import {Storage} from '@capacitor/storage';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {Directory, Filesystem} from '@capacitor/filesystem';
import {Capacitor} from '@capacitor/core';
import {CapacitorVideoPlayer} from 'capacitor-video-player';

export const FILE_KEY = 'files';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myFiles = [];
  // https://file-examples-com
  videoUrl = 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4';

  constructor( private http: HttpClient) {
    this.loadFiles().then();
  }

  async loadFiles(){
    const videoList = await Storage.get({ key: FILE_KEY });
    this.myFiles = JSON.parse(videoList.value) || [] ;
  }

  downloadFile() {

    this.http.get(this.videoUrl, {
      responseType: 'blob',
      observe: 'events'
    }).subscribe( async (event) => {
      if (event.type === HttpEventType.Response){
        const base64 = await this.blobToBase64(event.body);
        const savedFile = await Filesystem.writeFile({
          path: 'test.mp4',
          data: base64,
          directory: Directory.Data
        });

        const fileReadingTest = await Filesystem.readFile({
          path: savedFile.uri
        });

        this.myFiles.unshift(savedFile.uri);

        await Storage.set({
          key: FILE_KEY,
          value: JSON.stringify(this.myFiles)
        });

        await CapacitorVideoPlayer.initPlayer({
          mode: 'fullscreen',
          url: savedFile.uri,
          playerId: 'vplayer',
          componentTag: 'home'
        }).then(() => {

        }, (err) => alert(JSON.stringify(err)));

      }
    });
  }

  async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onerror = () => reject(fileReader.error);
      fileReader.onloadend = () => {
        console.log({fileReaderRes: fileReader.result});
        resolve(fileReader.result as string);
      };
      fileReader.readAsDataURL(blob);
    });
  }

}
