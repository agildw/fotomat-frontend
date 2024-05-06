import { useEffect, useState } from "react";
import UploadButton from "../components/UploadButton";
import { Button, IconButton, Slider, Tooltip } from "@mui/material";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

import { compressImage, preloadImageAsFile } from "../utils/hooks";
import InfoIcon from "@mui/icons-material/Info";
import Loading from "../components/Loading";

const CompressImage = () => {
  const [quality, setQuality] = useState<number>(9);
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string>("");
  const [convertedImage, setConvertedImage] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [convertedImageFile, setConvertedImageFile] = useState<File | null>(
    null
  );
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
      const result = await compressImage(uploadedImage as File, quality);
      setConvertedImage(URL.createObjectURL(result));
      setConvertedImageFile(new File([result], "compressed-image.png"));

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
    a.download = "converted-image.png";
    a.click();
  };

  useEffect(() => {
    // set default image
    setUploadedImageSrc("compress_original.png");
    setConvertedImage("compress_out.png");

    const preload = async () => {
      setUploadedImage(await preloadImageAsFile("compress_original.png"));
      setConvertedImageFile(await preloadImageAsFile("compress_out.png"));
    };
    preload();
  }, []);

  return (
    <div className="flex flex-col max-w-4xl mx-auto w-full">
      <h1 className="text-4xl font-bold text-gray-200">Kompresi Gambar</h1>
      <p className="text-gray-300">
        Kompresi gambar dengan opsi kualitas gambar yang diinginkan
      </p>
      <div className="flex flex-col space-y-4 max-w-xl mt-8">
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <UploadButton onChange={onUpload} />
          <div className="flex flex-row items-center space-x-2 w-full">
            <Slider
              value={quality}
              onChange={(_, value) => setQuality(value as number)}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={9}
              color="primary"
            />
            <Tooltip title="Quality level: 1 (low) - 9 (high), more quality means lower file size but required more time to compress.">
              <IconButton>
                <InfoIcon fontSize="small" className="text-gray-400" />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <p className="text-gray-400">{uploadedImage?.name}</p>
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
        <>
          <Button
            variant="contained"
            size="small"
            color="primary"
            sx={{ color: "white" }}
            onClick={handleDownload}
          >
            Download
          </Button>

          <p className="text-gray-400 mt-4">
            Original size: {(uploadedImage?.size || 0) / 1000} KB, Converted
            size: {(convertedImageFile?.size || 0) / 1000} KB
          </p>
        </>
      )}
    </div>
  );
};

export default CompressImage;
