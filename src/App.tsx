import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import ConvertColor from "./pages/ConvertColor";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

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
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
