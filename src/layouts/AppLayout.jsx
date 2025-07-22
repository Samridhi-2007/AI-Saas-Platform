/** 
*@copyright 2024 codewithsadee
*@license Apache-2.0
*@description APPlayout for the app
*/
import  {Tooltip, TooltipTrigger, TooltipContent} from '@/components/ui/tooltip';
import  {TooltipProvider} from '@/components/ui/tooltip';
import { Outlet } from "react-router-dom";
import { SidebarProvider} from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
const AppLayout = () => {
return(
   
   <SidebarProvider>
      <TooltipProvider delayDuration={500} disableHoverableContent>
         <AppSidebar/>
    <main className='flex-1'>
<Outlet/>
    </main>

      </TooltipProvider>
   
   </SidebarProvider>
   
);


};

export default AppLayout
