/** 
*@copyright 2024 codewithsadee
*@license Apache-2.0
*@description Main entry point for teh app
*/
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import "./index.css";
import router from "@/routes";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const SIGN_IN_FORCE_REDIRECT_URL= import.meta.env.
VITE_CLERK_SIGN_IN_FORCE_REDIRECT_URL;
const SIGN_UP_FORCE_REDIRECT_URL= import.meta.env.
VITE_CLERK_SIGN_UP_FORCE_REDIRECT_URL;
if (!PUBLISHABLE_KEY){
  throw new Error('Missing Clerk publishable key !');
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}
    afterSignOutUrl='/auth-sync'
   signInForceRedirectUrl={SIGN_IN_FORCE_REDIRECT_URL}
   signUpForceRedirectUrl={SIGN_UP_FORCE_REDIRECT_URL}
    appearance={{
        baseTheme: dark,
        variables: {
  colorBackground: 'hsl(20 14.3% 4.1%)',
  colorText: 'hsl(60 9.1% 97.8%)',
  colorDanger: 'hsl(0 72.2% 50.6%)',
  colorTextSecondary: 'hsl(24 5.4% 63.9%)',
  colorInputBackground: 'hsl(20 14.3% 4.1%)',
  colorInputText: 'hsl(60 9.1% 97.8%)',
  borderRadius: '0.35rem',
  colorPrimary: 'hsl(20.5 90.2% 48.2%)',
  colorTextOnPrimaryBackground: 'hsl(60 9.1% 97.8%)',
}
      }}>
    <RouterProvider router={router}/>
   </ClerkProvider>
  </StrictMode>,
);

