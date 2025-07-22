/** 
*@copyright 2024 codewithsadee
*@license Apache-2.0
*@description Appsidebaar for the app
*/

import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import TaskFormDialog from "@/components/TaskFormDialog";
import { Sidebar,SidebarHeader,SidebarContent,SidebarFooter,
SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarGroupAction,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import Logo from "@/components/Logo";
import { UserButton } from "@clerk/clerk-react";
import { CirclePlus, ChevronRight } from "lucide-react";
import { SIDEBAR_LINKS } from "@/constants";
import { Collapsible ,CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";

const AppSidebar = () => {
  return (
    
    <Sidebar>
        <SidebarHeader>
<Link to='/app/inbox'  className='p-2'>
<Logo/>
</Link>
        </SidebarHeader>

        <SidebarContent className=''>
          <SidebarGroup className=''>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <TaskFormDialog>
                  
                  <SidebarMenuButton
  className="!text-primary border border-transparent hover:border-orange-500 transition-colors duration-200"
>
  <CirclePlus /> Add task
</SidebarMenuButton>
  
                  </TaskFormDialog>
                </SidebarMenuItem>
                {SIDEBAR_LINKS.map((item,index)=>(
                  <SidebarMenuItem key={index} className=''>
<SidebarMenuButton className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-sidebar-accent text-sm text-foregroun">
  <Link to={item.href} className="flex items-center gap-2 w-full">
  <item.icon className="w-5 h-5"/>
  <span>{item.label}</span>
  </Link>
</SidebarMenuButton>
<SidebarMenuBadge>0</SidebarMenuBadge>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
<Collapsible defaultOpen className="group/collapsible">

          <SidebarGroup>
<SidebarGroupLabel asChild>
 <CollapsibleTrigger className="text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group">
  <ChevronRight className="me-2 transition-transform group-data-[state=open]:rotate-90" />
  Projects
</CollapsibleTrigger>

</SidebarGroupLabel>
<Tooltip>
  <TooltipTrigger asChild>
  <SidebarGroupAction aria-label='Add project'>
  <Plus/>
</SidebarGroupAction>
</TooltipTrigger>
<TooltipContent
  side="right"
  className="bg-orange-500 text-white text-xs rounded px-2 py-1 shadow-lg"
>
  Add Project
</TooltipContent>

</Tooltip>


<CollapsibleContent>
<SidebarGroupContent>
  <SidebarMenu>
    <SidebarMenuItem>
      <p className="text-muted-foreground text-sm p-2">Click + to add some projects </p>
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarGroupContent>
</CollapsibleContent>
          </SidebarGroup>
</Collapsible>

        </SidebarContent>


       <SidebarFooter>
        <UserButton  showName appearance={{
            elements:{
                rootBox: 'w-full',
                userButtonTrigger: '!shadow-none w-full justify-start p-2 rounded-md hover:bg-sidebar-accent',
                userButtonBox: 'flex-row-reverse shadow-none gap-2',
                userButtonOuterIdentifier: 'ps-0',
                popoverBox: 'pointer-events-auto',
            },
        }}/>
       </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
