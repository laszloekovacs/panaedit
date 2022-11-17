import React, { useEffect } from "react";

function Preview() {
  useEffect(() => {
    console.log("hello");
  }, []);

  return <div>Preview</div>;
}

export default Preview;
