import '../../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Router from 'next/router';

// utils
import * as gtag from './../utils/gtag';
import React, { Fragment } from 'react';

import { wrapper } from '../store';

// global styles
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';
import '../../public/assets/css/styles.scss'; 

// types
const isProduction = process.env.NODE_ENV === 'production';

// only events on production
if(isProduction) {
  // Notice how we track pageview when route is changed
  Router.events.on('routeChangeComplete', (url: string) => gtag.pageview(url));
}

const MyApp = (
  { Component, 
    pageProps: { session, ...pageProps }
  }) => (
  <Fragment>
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  </Fragment>
);

export default wrapper.withRedux(MyApp);