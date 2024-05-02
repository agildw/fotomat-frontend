import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
