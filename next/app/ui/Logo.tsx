import React from "react";
import Image from "next/image";
import Logo from "../images/logo.svg";

const LogoComponent = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50 flex">
      <Image src={Logo} alt="Logo" width={50} height={50} />
      <p className="ml-5 text-white h-fit m-auto">Darian Steyn</p>
    </div>
  );
};

export default LogoComponent;
