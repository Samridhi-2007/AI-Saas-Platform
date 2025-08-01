/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 * @description upcomingTaskLoader for the app
 */
import { databases, Query } from "@/lib/appwrite";
import { getUserId } from "@/lib/utils";
import { startOfToday } from "date-fns";
const APPWRITE_DATABASE_ID=import.meta.env.VITE_APPWRITE_DATABASE_ID

const getTasks = async()=>{
    try{
   return await databases.listDocuments(
       APPWRITE_DATABASE_ID,
       'tasks',
       [
        Query.equal('completed',false),
        
Query.isNotNull('due_date'),
Query.greaterThanEqual('due_date', startOfToday().toISOString()),
Query.orderAsc('due_date'),
Query.equal('userId',getUserId())
       ]
   )
    }catch(err){
        console.log(err);
        throw new Error("Error getting upcoming tasks")
    }
}


const UpcomingTaskLoader = async () => {
  const tasks = await getTasks();
  return {tasks};

};

export default UpcomingTaskLoader;
