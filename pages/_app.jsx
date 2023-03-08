import "../styles/globals.css";
import Head from "next/head";
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../utils/createEmotion';
import { ThemeProvider } from "../utils/themeContext";
import PropTypes from 'prop-types';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AdminSide from "../components/AdminSide";
import AdminNav from "../components/Nav";
import 'react-quill/dist/quill.snow.css'
import Protected from "../components/Protected";
import { Toaster } from "react-hot-toast";
function MyApp(props) {
  const clientSideEmotionCache = createEmotionCache();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <>
      <Head>
        <title>Transit Admin Dashboard</title>
        <meta name="description" content="Transite Admin Dashboard" />

        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CacheProvider value={emotionCache}>
        <ThemeProvider>
          {
            Component.noLayout ? <div>
              <Component {...pageProps} />
              <Toaster />
            </div> :
              <Protected>
                <div className='app'>
                  <AdminSide />
                  <main className="content" style={{
                    width: "100%",
                  }}>
                    <AdminNav />
                    <Toaster />
                    <Component {...pageProps} />
                  </main>


                </div>
              </Protected>
          }
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
