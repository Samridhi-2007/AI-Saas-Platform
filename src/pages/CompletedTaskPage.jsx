/** 
*@copyright 2024 codewithsadee
*@license Apache-2.0
*@description completedtaskpage for the app
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
const CompletedTaskPage = () => {
 const fetcher = useFetcher();
  const { tasks } = useLoaderData();
  const [taskFormShow, setTaskFormShow] =useState(false);
  return (
   <>
   <Head title='Completed - Tasky AI'/>
   <TopAppBar title='Completed' taskCount={tasks.total}/>

   <Page>
    <PageHeader>
      <PageTitle>Completed</PageTitle>

    </PageHeader>
    <PageList>
      {
        tasks.documents.map(({
          $id, content , completed, due_date,project
        })=>(
  <TaskCard key={$id} id={$id} content={content} completed={completed} dueDate={due_date} project={project}/>
        ))
      }
     {!tasks.total && !taskFormShow && <TaskEmptyState type='completed'/>}
      
    </PageList>
    
   </Page>

   </>
  );
}

export default CompletedTaskPage;
