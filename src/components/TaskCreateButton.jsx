/** 
*@copyright 2024 codewithsadee
*@license Apache-2.0
*@description TaskCreate Component for the app
*/
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

/**
 * Task Create Button Component
 * @param {{ onClick?: () => void }} props
 */
const TaskCreateButton = ({ onClick }) => {
  return (
    <div>
      <Button
        variant='link'
        className="w-full justify-start mb-4 px-0"
        onClick={onClick} 
      >
        <CirclePlus size={16} />
        Add Task
      </Button>
    </div>
  );
};

export default TaskCreateButton;
