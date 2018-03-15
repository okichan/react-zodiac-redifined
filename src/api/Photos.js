import axios from "axios";

const api = axios.create({
   baseURL: "http://localhost:3010"
});


export function listPhotos() {
   return api.get("/images")
   .then(res => {
      return res.data;
   });
}

export function updatePhoto(id, data) {
   return api.patch(`/images/${id}`, data)
     .then(res => res.data)
 }
 
 export function searchZodiac(quote) {
   return api.get(`/images?year=${quote}`)
     .then((res) => res.data)
 }
 
 export function deletePhoto(photo) {
    return api.delete(`/images/${photo}`)
      .then(res => res.data)
 }
 