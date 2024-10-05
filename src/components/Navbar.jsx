import React from "react";
import { Typography,} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

// عناصر قائمة البروفايل

function ComplexNavbar() {

  return (

    
    <nav className="mx-auto max-w-screen-xl p-1 lg:rounded-full">
      <div className="relative mx-auto flex items-center justify-between" dir="rtl">
        <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-medium inline bg-gradient-to-r from-teal-500 to-gray-400 text-white shadow-md rounded-xl p-2">
          <Link to="/">مـوقع مواقيت الصلاة</Link>
        </Typography>
      </div>
    </nav>
    

    
  );
}

export default ComplexNavbar;
