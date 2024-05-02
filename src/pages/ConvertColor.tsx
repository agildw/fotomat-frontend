const colors = ["RED", "GREEN", "BLUE", "GRAY"] as const;
export type Color = (typeof colors)[number];

import { useState } from "react";
import UploadButton from "../components/UploadButton";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

import ExampleImageOne from "../assets/red_original.jpeg";
import ExampleImageTwo from "../assets/red_out.jpg";
import { convertColor } from "../utils/hooks";

const ConvertColor = () => {
  const [color, setColor] = useState<Color>("RED");
  const [originalImage, setOriginalImage] = useState<string>(ExampleImageOne);
  const [convertedImage, setConvertedImage] = useState<string>(ExampleImageTwo);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

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
    setIsSubmitted(false);
    try {
      const result = await convertColor(color, uploadedImage as File);
      setConvertedImage(URL.createObjectURL(result));

      if (uploadedImage) {
        const reader = new FileReader();
        reader.readAsDataURL(uploadedImage);
        reader.onload = (e) => {
          setOriginalImage(e.target?.result as string);
        };
      }
      setIsSubmitted(true);
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
  return (
    <div className="flex flex-col max-w-4xl mx-auto w-full">
      <h1 className="text-4xl font-bold text-gray-200">Konversi Warna</h1>
      <p className="text-gray-300">
        Pilih warna yang ingin diubah dari gambar yang diunggah
      </p>
      <div className="flex flex-col space-y-4 max-w-xl mt-8">
        <div className="flex flex-row space-x-4">
          <UploadButton onChange={onUpload} />
          <FormControl fullWidth>
            <InputLabel id="select-color-label">Color</InputLabel>
            <Select
              labelId="select-color-label"
              id="demo-simple-select"
              value={color}
              size="small"
              label="Color"
              onChange={(e) => setColor(e.target.value as Color)}
            >
              {colors.map((color) => (
                <MenuItem key={color} value={color}>
                  <div className="flex flex-row space-x-2 items-center">
                    <div
                      className={`w-4 h-4 bg-${color.toLowerCase()}-500 rounded-full `}
                    ></div>
                    <p>{color}</p>
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
      {loading && <p className="text-gray-300 mt-4">Loading...</p>}
      <div className="mt-8">
        <ReactCompareSlider
          className="w-full h-96 object-cover"
          itemOne={
            <ReactCompareSliderImage src={originalImage} alt="Image one" />
          }
          itemTwo={
            <ReactCompareSliderImage src={convertedImage} alt="Image two" />
          }
        />
      </div>
      {isSubmitted && (
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

export default ConvertColor;
