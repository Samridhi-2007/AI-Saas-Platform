/** 
*@copyright 2024 codewithsadee
*@license Apache-2.0
*@description TaskCard for the app
*/
import appAction from "@/routes/actions/appAction";
import { formatCustomDate, getTaskDueDateColorClass,truncateString } from "@/lib/utils";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { useState, useCallback } from "react";
import { useFetcher, useRevalidator,useLocation } from "react-router";
import { Card,CardContent, CardFooter } from "@/components/ui/card";
import { Check, CalendarDays,Hash,Inbox ,Edit , Trash2} from "lucide-react";
import { Tooltip , TooltipTrigger, TooltipContent} from "@/components/ui/tooltip";
import TaskForm from "@/components/TaskForm"; 
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import{AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
const TaskCard = ({ id, content, completed, dueDate, project }) => {
  const revalidator = useRevalidator(); 
  const fetcher =useFetcher();
  const {toast}= useToast();
  const [taskFormShow, setTaskFormShow]=useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const fetcherTask = fetcher.json;
const Location = useLocation();
const task = Object.assign({
  id,
  content,
  completed,
  due_date: dueDate,
  project
}, fetcherTask);

const handleTaskCompleted = useCallback(async (completed) => {
  return await fetcher.submit(
    JSON.stringify({ id: task.id, completed }),
    {
      action: `/app`,
      method: 'PUT',
      encType: 'application/json',
    }
  );
}, [fetcher]);

  const handleDeleteTask = async () => {
    await fetcher.submit(
      JSON.stringify({ id: task.id }),
      {
        action: '/app',
        method: 'DELETE',
        encType: 'application/json',
      }
    );
    revalidator.revalidate();
    setDeleteDialogOpen(false);
  };

  return (
    <>
    {!taskFormShow && (
<div  className="group/card relative grid grid-cols-[max-content, minmax(0,1fr)] gap-3 border-b">
      <Button variant='outline'
      size='icon'
      className={cn ('group/button rounded-full w-5 h-5 mt-2' , task.completed && 'bg-border' ,)}
      role='checkbox'
      aria-checked={task.completed}
      aria-label={`Mark task as ${task.completed? 'incompleted':'completed'}`}
      aria-describedby='task-content'
      onClick={async () => {
        await handleTaskCompleted(!task.completed);
        if (!task.completed) {
          toast({
            title: '1 task completed',
            action: (
              <ToastAction
                altText='Undo'
                onClick={async () => {
                  await handleTaskCompleted(false);
                  revalidator.revalidate();
                }}
              >
                Undo
              </ToastAction>
            )
          });
        }
        revalidator.revalidate();
      }}
      >
        <Check  strokeWidth={4} className={cn('!w-3 !h-3 text-muted-foreground group-hover/button:opacity-100 transition-opacity',
          task.completed ? 'opacity-100': 'opacity-0',
        )}/>
      </Button>

<Card className='rounded-none py-2 space-y-1.5 border-none'>
  <CardContent className='p-0'>
    <p id="task-content" className={cn('text-sm max-md:me-16',
      task.completed && 'text-muted-foreground line-through',
    )}>{task.content}</p>
  </CardContent>

  <CardFooter className='p-0 flex gap-4 relative'>
    {task.due_date && Location.pathname !=='/app/today' && (<div className={cn(
      'flex items-center gap-1 text-xs text-muted-foreground',
      getTaskDueDateColorClass(task.due_date, task.completed),
    )}>
      <CalendarDays size={14}/>
      {formatCustomDate(task.due_date)}
    </div>)}
{Location.pathname !== '/app/inbox' && Location.pathname !== `/app/projects/${project?.$id}` &&(
    <div className="grid grid-cols-[minmax(0,180px),max-content]"> 
      <div className="truncate text-right items-center gap-1 text-xs text-muted-foreground ms-auto ">
  {task.project?.name || 'Inbox'}
      </div>
      {task.project ? (
        <Hash size={14}/>
      ) : (
        <Inbox size={14}
        className="text-muted-foreground"
        />
      )}
    </div>
)}
  </CardFooter>
</Card>
 <div className="absolute top-1.5 right-0 bg-background ps-1 shadow-[-10px_0_5px_hsl(var(--background))] flex items-center gap-1 opacity-0 group-hover/card:opacity-100 focus-within:opacity-100 max-md:opacity-100">
  {!task.completed && (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant='ghost' size='icon' className='w-6 h-6 text-muted-foreground' aria-label='Edit'
        onClick={()=>setTaskFormShow(true)}
        >
          <Edit/>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Edit Task
      </TooltipContent>
    </Tooltip>
  )}
  <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
    <Tooltip>
      <TooltipTrigger asChild>
        <AlertDialogTrigger asChild>
          <Button variant='ghost' size='icon' className='w-6 h-6 text-muted-foreground' aria-label='Delete-task'>
            <Trash2 />
          </Button>
        </AlertDialogTrigger>
      </TooltipTrigger>
      <TooltipContent>
        Delete Task
      </TooltipContent>
    </Tooltip>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Task?</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this task? This <strong>{truncateString(task.content , 48 )}</strong>action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteTask} autoFocus>
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
 </div>
    </div>
    )}
    {taskFormShow && (
<TaskForm
    className="my-1"
    defaultFormData={{
    ...task,
      project:project && project?.$id,
    }}
    mode="edit"
    onCancel={() =>setTaskFormShow(false)}
    onSubmit= {(FormData) => {
  console.log('Update Task Payload:', FormData); // Debug log
  fetcher.submit(JSON.stringify(FormData), {
    action: '/app', // Correct route for PUT
    method: 'PUT',
    encType: 'application/json',
  });
  revalidator.revalidate();
  setTaskFormShow(false);
}}

    />
    )}
    
    </>
  )
}

export default TaskCard
