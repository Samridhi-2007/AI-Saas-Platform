/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 * @description TaskFormDialog for the app
 */

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TaskFormComponent from "@/components/TaskForm";
import { useEffect, useState } from "react";
import { useLocation, useFetcher } from "react-router-dom"; // ⬅️ FIXED: use from react-router-dom
import { startOfDay } from "date-fns";

const TaskFormDialog = ({ children }) => {
  const location = useLocation();
  const fetcher = useFetcher();
  const [open, setOpen] = useState(false);

 

useEffect(() => {
  const listener = (event) => {
    if (event.key === 'q') {
      const target = event.target;
      if (target && target.tagName === 'TEXTAREA') return;

      event.preventDefault();
      setOpen(true);
    }
  };

  document.addEventListener('keydown', listener);
  return () => {
    document.removeEventListener('keydown', listener);
  };
}, []);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="p-0 border-0 !rounded-xl">
        <TaskFormComponent
          defaultFormData={{
            content: "",
            due_date: location.pathname === "/app/today" ? startOfDay(new Date()) : null, // ⬅️ FIXED: pass Date
            projectId: null,
          }}
          mode="create"
          onCancel={() => setOpen(false)}
          onSubmit={(formData) => {
            fetcher.submit(JSON.stringify(formData), {
              action: "/app",
              method: "POST",
              encType: "application/json",
            });

            setOpen(false); // close dialog
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormDialog;
