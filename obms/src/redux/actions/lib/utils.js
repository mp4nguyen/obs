import blobUtil from 'blob-util';

export function imageToBase64(file){
    return new Promise((resolve,reject)=>{
        if(file instanceof Object ){

          blobUtil.blobToBase64String(file).then(function (data) {
            // success
            //console.log("base64 = ",data);
            var base64String = "data:"+file.type+";base64," + data;
            resolve(base64String);
          }).catch(function (err) {
            // error
            console.log("err = ",err);
            reject(err);
          });
        }else{
          reject("input is not a file")
        }
    });
}
