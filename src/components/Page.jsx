/** 
*@copyright 2024 codewithsadee
*@license Apache-2.0
*@description Page Layout components for the app
*/
import React from "react";
const Page = ({ children }) => {
  return (
    <div className="container md:max-w-screen-md">
      {children}
    </div>
  );
};
const PageHeader = ({ children }) => {
  return (
    <div className="pt-2 pb-3 space-y-2 md:px-4  lg:px-10">
      {children}
    </div>
  );
};
const PageTitle = ({children}) => {
  return (
    <h1 className="text-2xl font-semibold">
      {children}
    </h1>
  );
};
const PageList=({children}) =>{
  return(
    <div className="pt-2 pb-20 md:px-4 lg:px-10">
      {children}
    </div>
  );
};

export { Page, PageHeader , PageTitle ,PageList };
