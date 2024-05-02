import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function UploadButton({
  onChange,
}: {
  onChange: (file: File) => void;
}) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      className="w-72"
      // className="w-full"
      size="small"
    >
      Upload image
      <VisuallyHiddenInput
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            onChange(e.target.files[0]);
          }
        }}
      />
    </Button>
  );
}
