import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import ConvertColor from "./pages/ConvertColor";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import CompressImage from "./pages/CompressImage";
import SharpenImage from "./pages/SharpenImage";
import MatrixImage from "./pages/MatrixImage";
import FourierTransformation from "./pages/FourierTransformation";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/convert-color",
    element: (
      <Layout>
        <ConvertColor />
      </Layout>
    ),
  },
  {
    path: "/compress-image",
    element: (
      <Layout>
        <CompressImage />
      </Layout>
    ),
  },
  {
    path: "/sharpen-image",
    element: (
      <Layout>
        <SharpenImage />
      </Layout>
    ),
  },
  {
    path: "/matrix-image",
    element: (
      <Layout>
        <MatrixImage />
      </Layout>
    ),
  },
  {
    path: "/fourier-transform",
    element: (
      <Layout>
        <FourierTransformation />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
