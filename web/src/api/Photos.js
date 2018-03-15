import axios from "axios";

// console.log('process.env.REACT_APP_API_URL', process.env.REACT_APP_API_URL);


const api = axios.create({
   baseURL: process.env.REACT_APP_API_URL
});


export function listPhotos() {
   return api.get("/zodiacs")
   .then(res => {
      return res.data;
   });
}

export function updatePhoto(id, data) {
   return api.patch(`/zodiacs/${id}`, data)
     .then(res => res.data)
 }
 
 export function searchZodiac(quote) {
   return api.get(`/zodiacs/${quote}`)
     .then((res) => res.data)
 }
 
 export function deletePhoto(photo) {
    return api.delete(`/zodiacs/${photo}`)
      .then(res => res.data)
 }
 