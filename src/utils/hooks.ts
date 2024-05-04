import { Color } from "../pages/ConvertColor";
import httpClient from "./httpClient";
import FormData from "form-data";

export const convertColor = async (color: Color, image: File) => {
  const data = new FormData();
  // data.append("file", image);

  data.append("file", new Blob([image], { type: "image/jpeg" }));

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

export const compressImage = async (image: File, quality: number) => {
  const data = new FormData();
  data.append("file", new Blob([image], { type: "image/jpeg" }));

  const response = await httpClient.post(`/compress?quality=${quality}`, data, {
    // maxBodyLength: Infinity,
    responseType: "blob",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  //   content type response is image/png
  return response.data as Blob;
};

export const sharpenImage = async (image: File) => {
  const data = new FormData();
  // data.append("file", image);
  data.append("file", new Blob([image], { type: "image/jpeg" }));

  const response = await httpClient.post(`/sharpen`, data, {
    // maxBodyLength: Infinity,
    responseType: "blob",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  //   content type response is image/png
  return response.data as Blob;
};

export const getImageMatrix = async (image: File) => {
  const data = new FormData();
  data.append("file", image);

  const response = await httpClient.post(`/`, data, {
    // maxBodyLength: Infinity,
    responseType: "json",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  //   content type response is image/png
  return response.data as {
    shape: [number, number, number];
    matrix: string;
  };
};

export const preloadImageAsFile = async (imageName: string) => {
  const response = await fetch(imageName);
  const blob = await response.blob();
  return new File([blob], imageName);
};
