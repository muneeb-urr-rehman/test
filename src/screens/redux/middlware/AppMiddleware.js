import axios from "axios";
import { getData } from "../actions/appAction";

const token = "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";

export const AppMiddleware = {
  getUsers: (page, country, search) => {
    return (dis) => {
      return new Promise(async (resolve, reject) => {
        try {
          axios
            .get(
              `https://api.github.com/search/users?q=${encodeURIComponent(
                `${country && `location:${country?.toLowerCase()}`} ${
                  search && `user:${search?.toLowerCase()}`
                }`
              )}&per_page=10&page=${page}`,
              {
                // headers: {
                //     Authorization: `Bearer ${token}`
                // }
              }
            )
            .then((response) => {
              console.log(response);
              dis(getData(response?.data));
              resolve(true);
            })
            .catch((error) => {
              console.log("error", error);
            });
        } catch (error) {
          console.log("error", error);
          reject(error);
        }
      });
    };
  },
};
