import {Header, Footer} from './';

const RootLayout = ({ children }) => {
  return (
    <div className="bg-black">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export {RootLayout};