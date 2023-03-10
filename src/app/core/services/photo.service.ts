import { Injectable } from '@angular/core';
import { File, FileEntry } from '@awesome-cordova-plugins/file/ngx';
import { blobToBase64, dataURLtoBlob } from '../utils/blobs';


export interface PhotoItem{
  base64:string;
  blob:Blob;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {



  constructor(
    private file:File
  ) {
    
  }

  private async getPictureFromInputFile(input:HTMLInputElement):Promise<PhotoItem>{
    return new Promise((resolve, reject)=>{
      input.click();
      var that = this;
      input.onchange = function () {
        var file = input.files[0];
        var reader = new FileReader();
        reader.onload = () => { 
          resolve({
            base64:reader.result as string,
            blob:file
          });
        };
        reader.onerror = (error) =>{
          reject(error);
        }
        reader.readAsDataURL(file);
      }
    });
  }

  async getPicture(source: string, inputFile:HTMLInputElement=null):Promise<PhotoItem>{
    return new Promise(async (resolve, reject)=>{

        resolve(await this.getPictureFromInputFile(inputFile));
      
      
    });
  }
}
