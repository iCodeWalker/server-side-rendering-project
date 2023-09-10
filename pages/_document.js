import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

// Next js application is rendered by the Main component.
// and the extra div with overlays id, can be used for React Portals, and modals or overlays.

// Here we can modify our document tree

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <div id="overlays" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
