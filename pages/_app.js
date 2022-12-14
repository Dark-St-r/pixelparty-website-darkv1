import "../styles/globals.css";
import { GlobalStyles } from "twin.macro";
import { RecoilRoot } from "recoil";
import dynamic from "next/dynamic";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

//export default MyApp;

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
