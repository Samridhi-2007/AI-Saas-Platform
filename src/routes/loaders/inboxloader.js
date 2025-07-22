/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 * @description App action for the app
 */
import { databases, Query } from "@/lib/appwrite";
import { getUserId } from "@/lib/utils";

const APPWRITE_DATABASE_ID=import.meta.env.VITE_APPWRITE_DATABASE_ID

const getTasks = async()=>{
    try{
   return await databases.listDocuments(
       APPWRITE_DATABASE_ID,
       'tasks',
       [
        Query.equal('completed',false),
        
Query.isNull('projectId'),
Query.equal('userId',getUserId())
       ]
   )
    }catch(err){
        console.log(err);
        throw new Error("Error getting inbox tasks")
    }
}


const inboxTaskLoader = async () => {
  const tasks = await getTasks();
  return {tasks};

};

export default inboxTaskLoader;
