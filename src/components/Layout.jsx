import { Header, Footer } from "./";
import Head from "next/head";

const RootLayout = ({ children }) => {
  return (
    <div className="bg-black flex flex-col justify-between h-[100vh] w-screen">
      <Head>
        <title>VisageVerse</title>
        <meta name="description" content="Create on-demand AI images using your own face."/>
        <link rel="shortcut icon" href="/assets/images/favicon.ico" />
      </Head>
      <Header />
      <main className="">
        {children}
      </main>
    </div>
  );
};

export { RootLayout };
