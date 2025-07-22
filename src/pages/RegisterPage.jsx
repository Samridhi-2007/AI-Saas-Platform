/** 
*@copyright 2024 codewithsadee
*@license Apache-2.0
*@description Register  Page for the app
*/
import { SignUp } from "@clerk/clerk-react"; 
import Head from "@/components/Head"

const RegisterPage = () => {
  return (
    <>
    <Head title='Create an Account - Tasky AI To-Do List 7 Project Management App'/>
    <section>
      <div className="container flex justify-center">
        <SignUp signInUrl="/login"/>
      </div>
    </section>
    </>
  );
};

export default RegisterPage
