import { useFetcher, useNavigate, useLocation } from "react-router";
import { useCallback } from "react";
import { truncateString } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

// 💡 Accept defaultFormData as prop
const ProjectDeleteButton = ({ defaultFormData }) => {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleDelete = useCallback(() => {
    const formData = new FormData();
    formData.append("intent", "delete");
    formData.append("id", defaultFormData.id);

    fetcher.submit(formData, {
      method: "DELETE",
      action: "/app/projects",
    });

    toast({
      title: "Project deleted",
      description: `${truncateString(defaultFormData.name, 48)} has been deleted.`,
    });

    // Navigate back to projects if we're currently viewing the deleted project
    if (location.pathname.includes(defaultFormData.id)) {
      navigate("/app/projects");
    }
  }, [defaultFormData, fetcher, navigate, location, toast]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start px-2 !text-destructive"
        >
          <Trash2 className="w-4 h-4 mr-2" /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Project?</AlertDialogTitle>
          <AlertDialogDescription>
            The <strong>{truncateString(defaultFormData.name, 48)}</strong>{' '}project and all of its tasks will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProjectDeleteButton;
