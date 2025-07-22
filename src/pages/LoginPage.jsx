/** 
*@copyright 2024 codewithsadee
*@license Apache-2.0
*@description Login Page for the app
*/
import { SignIn } from "@clerk/clerk-react";

import Head from "@/components/Head"

const LoginPage = () => {
  return (
    
    <>
    <Head title='Log In to Tasky AI - Manage Your To-Do Lists and Projects'/>
    <section>
      <div className="container flex justify-center">
        <SignIn signUpUrl="/register"/>
      </div>
    </section>
    </>
  );
  
}

export default LoginPage
