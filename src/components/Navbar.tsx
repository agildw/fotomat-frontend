import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row text-white w-screen p-6 mb-4">
      <div
        className="flex flex-row justify-center items-center space-x-2 hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/vite.svg" className="h-8 w-8" alt="Vite logo" />
        <p className="text-2xl font-bold text-gray-200">JNCK</p>
      </div>
    </div>
  );
};

export default Navbar;
