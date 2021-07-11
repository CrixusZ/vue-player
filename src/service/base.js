import axios from "axios";
import asixo from "axios";

const baseURL = "/";
const ERR_OK = 0;

axios.defaults.baseURL = baseURL;

export function get(url, params) {
  return asixo
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
