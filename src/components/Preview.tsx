import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TStore } from "../reducer/store";

function Preview() {
  const store = useSelector((s: TStore) => s);

  useEffect(() => {
    (async () => {
      window.pannellum.preview = window.pannellum.viewer("preview", store);

      return () => {
        window.pannellum.preview.destroy();
      };
    })();
  }, [store]);

  return <div id="preview"></div>;
}

export default Preview;
