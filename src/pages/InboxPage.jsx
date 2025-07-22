/** 
*@copyright 2024 codewithsadee
*@license Apache-2.0
*@description IndexPage for the app
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
const InboxPage = () => {
  const fetcher = useFetcher();
  const { tasks } = useLoaderData();

  const [taskFormShow, setTaskFormShow] =useState(false);
  return (
   <>
   <Head title='Inbox - Tasky AI'/>
   <TopAppBar title='Inbox' taskCount={20}/>

   <Page>
    <PageHeader>
      <PageTitle>Inbox</PageTitle>
    </PageHeader>
    <PageList>
      {
        tasks.documents.map(({
          $id, content , completed, due_date, projectId:project
        })=>(
  <TaskCard key={$id} id={$id} content={content} completed={completed} dueDate={due_date} project={project}/>
        ))
      }
     {!taskFormShow &&  <TaskCreateButton onClick={()=>setTaskFormShow(true)} />}
     {!taskFormShow && <TaskEmptyState type="inbox"/>}
      {taskFormShow && (
        <TaskFormComponent className="mt-1" mode="create"
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
};

export default InboxPage;

