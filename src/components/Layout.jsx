import { Header, Footer } from "./";

const RootLayout = ({ children }) => {
  return (
    <div className="bg-black flex flex-col justify-between h-[100vh] w-screen">
      <Header />
      <main className="">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export { RootLayout };
