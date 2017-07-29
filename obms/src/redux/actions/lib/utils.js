import blobUtil from 'blob-util';
import {toastr} from 'react-redux-toastr';

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

export function errHandler(desc,error){
  if (error.response) {
    toastr.error('Fail to '+desc+' information (' + error.response.data + ')')
   //  console.log(error.response.data);
   //  console.log(error.response.status);
   //  console.log(error.response.headers);
  } else {
    toastr.error('Fail to '+desc+' information (' + error.message + ')')
    console.log('Error', error.message);
  }
  console.log(error.config);
}
