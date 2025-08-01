import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Edit } from "lucide-react";
import ProjectFormDialog from "./ProjectFormDailog";
import { Button } from "@/components/ui/button";
import ProjectDeleteButton from "@/components/ProjectDeleteButton";
import { de } from "chrono-node";
const ProjectActionMenu = ({ children, defaultFormData, ...props }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent
      {...props} >
        <DropdownMenuItem asChild >
          <ProjectFormDialog method='PUT' defaultFormData={defaultFormData}>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start px-2"
            >
              <Edit className="w-4 h-4 mr-2" /> Edit
            </Button>
          </ProjectFormDialog>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
<ProjectDeleteButton defaultFormData={defaultFormData}/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectActionMenu;
