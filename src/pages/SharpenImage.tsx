import { useEffect, useState } from "react";
import UploadButton from "../components/UploadButton";
import { Button } from "@mui/material";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

import { preloadImageAsFile, sharpenImage } from "../utils/hooks";
import Loading from "../components/Loading";

const SharpenImage = () => {
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string>("");
  const [convertedImage, setConvertedImage] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onUpload = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    setUploadedImage(file);

    // reader.onload = (e) => {
    //   setUploadedImageSrc(e.target?.result as string);
    // };
  };

  const onSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await sharpenImage(uploadedImage as File);
      setConvertedImage(URL.createObjectURL(result));

      if (uploadedImage) {
        const reader = new FileReader();
        reader.readAsDataURL(uploadedImage);
        reader.onload = (e) => {
          setUploadedImageSrc(e.target?.result as string);
        };
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    // save image to local storage
    const a = document.createElement("a");
    a.href = convertedImage;
    a.download = "sharpened-image.png";
    a.click();
  };

  useEffect(() => {
    // set default image
    setUploadedImageSrc("sharpen_original.jpg");
    setConvertedImage("sharpen_out.png");

    const preload = async () => {
      setUploadedImage(await preloadImageAsFile("sharpen_original.jpg"));
    };
    preload();
  }, []);
  return (
    <div className="flex flex-col max-w-4xl mx-auto w-full">
      <h1 className="text-4xl font-bold text-gray-200">Pertajam Gambar</h1>
      <p className="text-gray-300">Pertajam gambar tanpa kehilangan kualitas</p>
      <div className="flex flex-col space-y-4 max-w-xl mt-8">
        <div className="flex flex-row space-x-4">
          <UploadButton onChange={onUpload} />
        </div>
        {uploadedImage && (
          // image file name
          <p className="text-gray-400">{uploadedImage.name}</p>
        )}
        <Button
          variant="contained"
          size="small"
          color="primary"
          disabled={!uploadedImage}
          onClick={onSubmit}
          sx={{ color: "white" }}
        >
          Submit
        </Button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="mt-8">
        {loading && <Loading />}
        {!loading && (
          <ReactCompareSlider
            className="w-full h-96 object-cover"
            itemOne={
              <ReactCompareSliderImage src={uploadedImageSrc} alt="Image one" />
            }
            itemTwo={
              <ReactCompareSliderImage src={convertedImage} alt="Image two" />
            }
          />
        )}
      </div>
      {!loading && (
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{ color: "white" }}
          onClick={handleDownload}
        >
          Download
        </Button>
      )}
    </div>
  );
};

export default SharpenImage;
