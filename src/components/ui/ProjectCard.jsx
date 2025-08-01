import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Hash, MoreHorizontal } from "lucide-react";
import ProjectActionMenu from "@/components/ProjectActionMenu";

const ProjectCard = ({ project }) => {
  return (
    <div className="relative group/card h-14 flex items-center gap-3 px-2 rounded-lg hover:bg-secondary z-10 overflow-visible">
      <Hash size={16} color={project.color_hex} className="shrink-0 z-10" />
      <p className="text-sm truncate max-w-[48ch] z-10">{project.name}</p>

      <div className="z-20 ms-auto">
        <ProjectActionMenu
          defaultFormData={{
            id: project.$id,
            name: project.name,
            color_name: project.color_name,
            color_hex: project.color_hex,
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover/card:opacity-100 max-md:opacity-100"
            aria-label="More actions"
          >
            <MoreHorizontal />
          </Button>
        </ProjectActionMenu>
      </div>

      {/* Move link LAST so it doesn't block dropdown */}
      <Link
        to={`/app/projects/${project.$id}`}
        className="absolute inset-0 z-0"
      />
    </div>
  );
};

export default ProjectCard;
