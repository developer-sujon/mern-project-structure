//external lib import
import axios from "axios";
import SessionHelper from "../helper/SessionHelper";
import ToastMessage from "../helper/ToastMessage";
import { setLoading, removeLoading } from "../redux/features/settingSlice";
import store from "../redux/store/store";

axios.defaults.baseURL = "http://localhost:8080/api/v1";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + SessionHelper.getToken();

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

class ApiRequest {
  static getRequest(url) {
    store.dispatch(setLoading());
    return axios
      .get(url)
      .then((response) => {
        store.dispatch(removeLoading());
        if (response.status === 200) {
          return response;
        }
      })
      .catch((err) => {
        store.dispatch(removeLoading());
        if (err.response.status === 401) {
          SessionHelper.removeToken();
          ToastMessage.errorMessage(err.response.data.message);
          window.location.href = "/login";
          return false;
        } else {
          ToastMessage.errorMessage(err.response.data.message);
          return false;
        }
      });
  }

  static postRequest(url, postJson) {
    store.dispatch(setLoading());
    return axios
      .post(url, postJson)
      .then((response) => {
        store.dispatch(removeLoading());
        if (response.status === 201 || response.status === 200) {
          return response;
        }
      })
      .catch((err) => {
        store.dispatch(removeLoading());
        console.log(err);
        if (err.response.status === 409) {
          ToastMessage.errorMessage(err.response.data.message);
          return false;
        } else if (err.response.status === 401) {
          SessionHelper.removeToken();
          ToastMessage.errorMessage(err.response.data.message);
          window.location.href = "/login";
          return false;
        } else {
          ToastMessage.errorMessage(err.response.data.message);
          return false;
        }
      });
  }

  static updateRequest(url, postJson) {
    store.dispatch(setLoading());
    return axios
      .patch(url, postJson)
      .then((response) => {
        store.dispatch(removeLoading());
        if (response.status === 200) {
          return true;
        }
      })
      .catch((err) => {
        store.dispatch(removeLoading());
        console.log(err);
        if (err.response.status === 409) {
          ToastMessage.errorMessage(err.response.data.message);
          return false;
        } else if (err.response.status === 401) {
          SessionHelper.removeToken();
          ToastMessage.errorMessage(err.response.data.message);
          window.location.href = "/login";
          return false;
        } else {
          ToastMessage.errorMessage(err.response.data.message);
          return false;
        }
      });
  }

  static deleteRequest(url) {
    store.dispatch(setLoading());
    return axios
      .delete(url)
      .then((response) => {
        store.dispatch(setLoading());
        if (response.status === 200) {
          return true;
        }
      })
      .catch((err) => {
        store.dispatch(removeLoading());
        console.log(err);
        if (err.response.status === 401) {
          SessionHelper.removeToken();
          ToastMessage.errorMessage(err.response.data.message);
          window.location.href = "/login";
          return false;
        } else {
          ToastMessage.errorMessage(err.response.data.message);
          return false;
        }
      });
  }
}

export default ApiRequest;
