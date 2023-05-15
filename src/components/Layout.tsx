import React, { FC, LabelHTMLAttributes } from "react";
import Navbar from "./Navbar";

interface LayoutProps extends LabelHTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="z-0 w-full h-screen flex flex-col overflow-auto bg-white">
      <div className="h-screen overflow-auto">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
