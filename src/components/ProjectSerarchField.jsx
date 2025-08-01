/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 * @description projectsearchfield for the app
 */

import {cn} from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Loader2,Search } from "lucide-react";



const ProjectSerarchField = ({
    handleChange,
    searchingState,
}) => {
  return (
    <div className="relative">
     <Search size={18}
     className="absolute top-1/2 -translate-y-1/2 left-2 text-muted-foreground pointer-events-none"
     />

     <Input type='text'
     name='q'
     placeholder='Search projects'
     className='px-8'
     onChange={handleChange}
     />

     <Loader2  size={18}
     className={cn(
        'absolute top-2 right-2 text-muted-foreground  pointer-events-none hidden',
        searchingState!== 'idle' &&'block animate-spin',
     )}
     />
    </div>
  )
}

export default ProjectSerarchField
