import { useEffect, useState } from "react";
import UploadButton from "../components/UploadButton";
import { Button } from "@mui/material";
import { getImageMatrix } from "../utils/hooks";

const MatrixImage = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [matrix, setMatrix] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onUpload = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    setUploadedImage(file);
    setUploadedImageSrc(URL.createObjectURL(file));
    setMatrix("");

    // reader.onload = (e) => {
    //   setOriginalImage(e.target?.result as string);
    // };
  };

  const onSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getImageMatrix(uploadedImage as File);
      setMatrix(result.matrix);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // set default image
    setUploadedImageSrc("/matrix_original.jpg");
    // set default matrix
    setMatrix(
      "[[[241 175 156]\n  [241 175 156]\n  [241 175 156]\n  ...\n  [241 175 156]\n  [241 175 156]\n  [241 175 156]]\n\n [[241 175 156]\n  [241 175 156]\n  [241 175 156]\n  ...\n  [241 175 156]\n  [241 175 156]\n  [241 175 156]]\n\n [[241 175 156]\n  [241 175 156]\n  [241 175 156]\n  ...\n  [241 175 156]\n  [241 175 156]\n  [241 175 156]]\n\n ...\n\n [[230 173 158]\n  [233 186 172]\n  [124  97  87]\n  ...\n  [ 70  54  47]\n  [214 175 166]\n  [224 175 165]]\n\n [[229 172 157]\n  [233 186 172]\n  [124  97  87]\n  ...\n  [ 70  54  47]\n  [214 175 166]\n  [224 175 165]]\n\n [[229 172 157]\n  [232 185 171]\n  [124  97  87]\n  ...\n  [ 70  54  47]\n  [214 175 166]\n  [224 175 165]]]"
    );
  }, []);

  return (
    <div className="flex flex-col max-w-4xl mx-auto w-full">
      <h1 className="text-4xl font-bold text-gray-200">Matrix Gambar</h1>
      <p className="text-gray-300">Melihat matriks dari gambar yang diunggah</p>
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
      {loading && <p className="text-gray-300 mt-4">Loading...</p>}
      <div className="mt-8 w-full h-96 object-cover">
        <img
          src={uploadedImageSrc}
          alt="original"
          className="object-cover w-full h-full"
        />
      </div>
      {matrix && (
        <div className="mt-8 border p-4 truncate">
          <pre className="text-gray-400">{matrix}</pre>
        </div>
      )}
    </div>
  );
};

export default MatrixImage;
