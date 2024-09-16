import React from "react";
import Hero from "../../components/HomePage/Hero";
import WriteABook from "../../components/HomePage/WriteABook";
import PublicLayout from "../../components/Layout/PublicLayout";
import SketchYourIdeas from "../../components/HomePage/SketchYourIdeas";
import FreeBooks from "../../components/HomePage/FreeBooks";
function Home() {
 return (
     <>
       <PublicLayout>
         <Hero />
          <WriteABook />
          <SketchYourIdeas />
           <FreeBooks />

       </PublicLayout>
     </>
   );
}

export default Home;
