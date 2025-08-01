import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ProjectForm from "@/components/ProjectForm";
import { useState } from "react";
import { useFetcher } from "react-router-dom"; 
import { truncateString } from "@/lib/utils";
import { toast, useToast } from "@/hooks/use-toast";
const ProjectFormDialog = ({ defaultFormData, children, method }) => {
  const [open, setOpen] = useState(false); 
  const fetcher = useFetcher();             
const {t}=useToast();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className='p-0 border-0 !rounded-xl'>
        <DialogTitle>Project Form</DialogTitle>
        <DialogDescription>
          Fill out the form to {method === 'POST' ? 'create' : 'update'} a project.
        </DialogDescription>

        <ProjectForm
          mode={method === 'POST' ? 'create' : 'edit'}
          defaultFormData={defaultFormData}
          onCancel={() => setOpen(false)}
          onSubmit={async (data) => {
            setOpen(false);

            const {id, update}= toast({
              title: `${method ==='POST' ? 'Creating' : 'Updating'} project...`,
              duration: Infinity
            })
            await fetcher.submit(JSON.stringify(data), {
              action: '/app/projects',
              method,
              encType: 'application/json',
            });
            update({
              id, title: `Project ${method ==='POST' ? 'created' : 'updated'} . `,
              description:`The project ${truncateString(data.name,32)}  ${data.ai_task_gen? 'and its tasks' : ' '}have been successfully ${method ==='POST' ? 'created' : 'updated'}.`,
              duration: 5000,
            })
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
