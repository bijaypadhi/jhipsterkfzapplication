import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/imgs/loading_dialog_box.json"; // Adjust the path as necessary

const Loading = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px",width:'200px' }}>
        <Lottie animationData={loadingAnimation} loop={true} height={200} width={200}/>
    </div>
  );
};

export default Loading;
