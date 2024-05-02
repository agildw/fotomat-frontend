import { Color } from "../pages/ConvertColor";
import httpClient from "./httpClient";
import FormData from "form-data";

export const convertColor = async (color: Color, image: File) => {
  const data = new FormData();
  data.append("file", image);

  // let config = {
  //   method: "post",
  //   maxBodyLength: Infinity,
  //   url: "http://127.0.0.1:8000/red",
  //   data: data,
  // };

  // const response = await httpClient(config);

  const response = await httpClient.post(`/${color.toLowerCase()}`, data, {
    // maxBodyLength: Infinity,
    responseType: "blob",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  //   content type response is image/png
  return response.data as Blob;
};
