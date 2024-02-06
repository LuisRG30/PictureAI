import { Header, Footer } from "./";

const RootLayout = ({ children }) => {
  return (
    <div className="bg-black flex flex-col justify-between h-[100vh]">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export { RootLayout };
