/** 
*@copyright 2024 codewithsadee
*@license Apache-2.0
*@description Today Page for the app dashboard
*/
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import Head from "@/components/Head";

const TodayPage = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/');
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <Head title="Today - Tasky AI Dashboard" />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Today's Tasks</h1>
          <div className="bg-card border rounded-lg p-6">
            <p className="text-foreground/80 text-center py-8">
              Welcome to your dashboard! Your tasks will appear here.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodayPage; 