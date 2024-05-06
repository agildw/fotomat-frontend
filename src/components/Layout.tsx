import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-screen">
      <Navbar />
      <div className="flex flex-col max-w-8xl w-full p-4 sm:p-8 mx-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
