import axios from "axios";

const api = axios.create({
   baseURL: "http://localhost:7000"
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
   return api.get(`/zodiacs?year=${quote}`)
     .then((res) => res.data)
 }
 
 export function deletePhoto(photo) {
    return api.delete(`/zodiacs/${photo}`)
      .then(res => res.data)
 }
 