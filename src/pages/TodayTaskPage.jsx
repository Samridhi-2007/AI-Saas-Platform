/** 
*@copyright 2024 codewithsadee
*@license Apache-2.0
*@description todaytaskpage for the app
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
import { todayTaskEmptyState } from "@/assets";
import { startOfToday } from "date-fns";
const TodayTaskPage = () => {
  const fetcher = useFetcher();
    const { tasks } = useLoaderData();
    const [taskFormShow, setTaskFormShow] =useState(false);
    return (
     <>
     <Head title='Today - Tasky AI'/>
     <TopAppBar title='Today' taskCount={tasks.total}/>

     <Page>
      <PageHeader>
        <PageTitle>Today</PageTitle>

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
        {
         fetcher.state !== 'idle' && <TaskcardSkeleton />
        }
       {!taskFormShow &&  <TaskCreateButton onClick={()=>setTaskFormShow(true)} />}
       {!tasks.total && !taskFormShow && <TaskEmptyState  />}
        {taskFormShow && (
          <TaskFormComponent className="mt-1" mode="create"

          defaultFormData={
            {
             content: '',
             due_date: startOfToday(),
             project: null,
            }
          }
          onCancel={()=>setTaskFormShow(false)}
          onSubmit={(formData) =>{
            fetcher.submit(JSON.stringify(formData),{
              action:'/app',
              method: 'POST',
              encType:'application/json',
            })
          }}  />
        )}
      </PageList>
      
     </Page>
  
     </>
    );
}

export default TodayTaskPage
