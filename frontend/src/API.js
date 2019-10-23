//const { WP_API } = process.env

import axios from "axios"

export class AuthError extends Error {}

const API = axios.create({
  baseURL: `http://localhost:8080/wp-json/api_survey/v1`, //WP_API,
  responseType: "json",
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:8000",
  },
})

API.interceptors.response.use(
  res => res,
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        const error = new AuthError("User Is Not Authenticated")
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)

export default API

/**
 * Returns Data From API in data
 * @param {object} res
 */
export const returnData = res => Promise.resolve(res.data)
