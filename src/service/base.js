import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://zengjiahao.com/vue-play"
    : "/";
const ERR_OK = 0;

axios.defaults.baseURL = baseURL;

export function get(url, params) {
  return axios
    .get(url, {
      params,
    })
    .then((res) => {
      const serverData = res.data;
      if (serverData.code === ERR_OK) {
        return serverData.result;
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
