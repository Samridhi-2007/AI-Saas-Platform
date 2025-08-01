/** 
*@copyright 2024 codewithsadee
*@license Apache-2.0
*@description APPlayout for the app
*/
import  {Tooltip, TooltipTrigger, TooltipContent} from '@/components/ui/tooltip';
import  {TooltipProvider} from '@/components/ui/tooltip';
import { Outlet ,useNavigation } from "react-router-dom";
import { SidebarProvider} from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const AppLayout = () => {
const navigation = useNavigation();
const isLoading = navigation.state ==='loading' && !navigation.formData


   return(
   <>
   <SidebarProvider>
      <TooltipProvider delayDuration={500} disableHoverableContent>
         <AppSidebar/>
    <main className={cn('flex-1' ,isLoading && 'opacity-50 pointer-events-none' ,)}>
<Outlet/>
    </main>

      </TooltipProvider>
   
   </SidebarProvider>

   <Toaster/>
   </>
);


};

export default AppLayout
