/** 
*@copyright 2024 codewithsadee
*@license Apache-2.0
*@description upcomingtaskpage for the app
*/

import { useState } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import Head from "@/components/Head";
import TopAppBar from "@/components/TopAppBar";
import { Page, PageHeader,PageTitle,PageList } from "@/components/Page";
import TaskCreateButton from "@/components/TaskCreateButton";
import TaskEmptyState from "@/components/TaskEmptyState";
import TaskFormComponent from "@/components/TaskForm";
import TaskCard from "@/components/TaskCard";
import TaskcardSkeleton from "@/components/taskcardSkeleton";
import { CheckCircle2 } from "lucide-react";
const UpcomingTaskPage = () => {
 const fetcher = useFetcher();
  const { tasks } = useLoaderData();
  const [taskFormShow, setTaskFormShow] =useState(false);
  return (
   <>
   <Head title='Upcoming - Tasky AI'/>
   <TopAppBar title='Upcoming' taskCount={tasks.total}/>

   <Page>
    <PageHeader>
      <PageTitle>Upcoming</PageTitle>
      
        {tasks.total >0 && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <CheckCircle2 size={16}/> {tasks.total} tasks
          </div>
        )}
    </PageHeader>
    <PageList>
      {
        tasks.documents.map(({
          $id, content , completed, due_date,project
        })=>(
  <TaskCard key={$id} id={$id} content={content} completed={completed} dueDate={due_date} project={project}/>
        ))
      }
     {!tasks.total && !taskFormShow && <TaskEmptyState type='upcoming'/>}
      
    </PageList>
    
   </Page>

   </>
  );
}

export default UpcomingTaskPage
