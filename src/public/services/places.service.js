import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default {
  addPlace(form, jwt) {
    console.log(form, jwt);
    const config = {
      headers: {
        authorization: jwt,
      },
    };
    return axios
      .post(`${URL}place/place`, form, config)
      .then((res) => res)
      .catch((err) => err);
  },

  getPlaces() {
    return axios
      .get(`${URL}place/places`)
      .then((res) => res)
      .catch((err) => console.log(err));
  },

  getPlaceTypes() {
    return axios
      .get("http://localhost:4000/api/v1/type-place/placeTypes")
      .then((res) => res)
      .catch((err) => console.log(err));
  },

  getPlace(id) {
    return axios
      .get(`${URL}place/place/${id}`)
      .then((res) => res)
      .catch((err) => console.log(err));
  },
  deletePlace(form, jwt) {
    const config = {
      headers: {
        authorization: jwt,
      },
    };
    return axios
      .delete(`${URL}place/place/` + form, config)
      .then((res) => res)
      .catch((err) => console.log(err));
  },
  updatePlace(form, jwt) {
    const config = {
      headers: {
        authorization: jwt,
      },
    };
    return axios
      .put(`${URL}place/place/` + form._id, form, config)
      .then((res) => res)
      .catch((err) => console.log(err));
  },
};
