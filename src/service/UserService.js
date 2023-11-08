import axios from 'axios'
import {axiosPrivate} from "../api/axios"
const USER_URL = 'http://127.0.0.1:8000/api/users'


class UserService {
  getCurrentUserWishlist() {
    return axiosPrivate.get(USER_URL + "/wishlists")
      .then(response => response?.data?.data)
      .catch(error => error?.response)
  }

  removeCurrentUserWishListByProductId(id){
    console.log(id)
    return axiosPrivate.post("http://127.0.0.1:8000/api/wishlists/remove", {
      "product_id": id
    })
    .then(response => response?.data?.data)
    .catch(error => error?.response)
  }

  addCurrentWishtlistByProductId(productId){
    return axiosPrivate.post(USER_URL + "/wishlists", {
        "product_id": productId
    })
    .then(response => response?.data?.data)
    .catch(error => error?.response)
  }

  getCurrentUser(){
    return axiosPrivate.get(USER_URL + "/info")
      .then(response => response?.data?.data)
      .catch(error => error?.response)
  }

  getCurrentUserImage(id){
    return axiosPrivate.get(USER_URL + `/${id}/images`)
      .then(response => response?.data?.data)
      .catch(error => error?.response)
  }

  getCurrentUserProducts(currentPage){
    return axiosPrivate.get(`http://127.0.0.1:8000/api/products/current?page=${currentPage}&limit=3`)
      .then(response => response?.data)
      .catch(error => error?.response)
  }
}

export default new UserService()