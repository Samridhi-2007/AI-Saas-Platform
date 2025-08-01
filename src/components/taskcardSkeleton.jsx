/** 
*@copyright 2024 codewithsadee
*@license Apache-2.0
*@description TaskCardskeleton for the app
*/

import { Skeleton } from "@/components/ui/skeleton";
const taskcardSkeleton = () => {
  return (
    <div className="grid grid-cols-[max-content, 1fr]  gap-3 items-center border-b pt-2  pb-3.5">
      <Skeleton className='w-5 h-5 rounded-full'/>
      <Skeleton className='h-3 me-10'/>
    </div>
  )
}

export default taskcardSkeleton
