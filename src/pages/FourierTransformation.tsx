import { useEffect, useState } from "react";
import UploadButton from "../components/UploadButton";
import { Button } from "@mui/material";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { fourierTransformation, preloadImageAsFile } from "../utils/hooks";
import Loading from "../components/Loading";

const FourierTransformation = () => {
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [convertedImage, setConvertedImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onUpload = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    setUploadedImage(file);

    // reader.onload = (e) => {
    //   setOriginalImage(e.target?.result as string);
    // };
  };

  const onSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await fourierTransformation(uploadedImage as File);
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
    a.download = "converted-image.png";
    a.click();
  };

  useEffect(() => {
    // set default image
    // setUploadedImageSrc(ExampleImageOne);

    setUploadedImageSrc("/fourier_original.png");
    setConvertedImage("/fourier_output.png");

    const preload = async () => {
      setUploadedImage(await preloadImageAsFile("fourier_original.png"));
    };
    preload();
  }, []);
  return (
    <div className="flex flex-col max-w-4xl mx-auto w-full">
      <h1 className="text-4xl font-bold text-gray-200">Transformasi Fourier</h1>
      <p className="text-gray-300">
        Melakukan transformasi fourier pada gambar yang diunggah
      </p>
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
      {/* {loading && <p className="text-gray-300 mt-4">Loading...</p>} */}

      <div className="flex flex-col mt-8">
        {loading && <Loading />}
        {!loading && (
          <ReactCompareSlider
            className="w-full h-96 object-cover"
            // className="w-96 h-full object-cover"
            itemOne={
              <ReactCompareSliderImage src={uploadedImageSrc} alt="Image one" />
            }
            itemTwo={
              <ReactCompareSliderImage src={convertedImage} alt="Image two" />
            }
          />
        )}
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
    </div>
  );
};

export default FourierTransformation;
