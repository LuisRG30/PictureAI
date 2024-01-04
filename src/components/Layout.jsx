import {Header, Footer} from './';

const RootLayout = ({ children }) => {
  return (
    <div className="bg-black overflow-hidden">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export {RootLayout};