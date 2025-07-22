import { useState, useCallback, useEffect } from 'react';
import * as chrono from 'chrono-node';

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  Command, CommandInput, CommandGroup, CommandList,
  CommandEmpty, CommandItem
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CalendarIcon, X, Inbox, ChevronDown, SendHorizonal
} from "lucide-react";
import {
  formatCustomDate,
  getTaskDueDateColorClass,
  cn
} from '@/lib/utils';

const TaskFormComponent = ({
  defaultFormData = null,
  className = '',
  mode = 'create',
  onCancel = () => {},
  onSubmit = () => {},
}) => {
  const [formData, setFormData] = useState(defaultFormData || {
    id: '',
    content: '',
    due_date: null,
    completed: false,
    project: null,
  });

  const [taskContent, setTaskContent] = useState(defaultFormData?.content || '');
  const [dueDate, setDueDate] = useState(defaultFormData?.due_date || null);
  const [projectOpen, setProjectOpen] = useState(false);
  const [dueDateOpen, setDueDateOpen] = useState(false);
  const [projectId, setProjectId] = useState(defaultFormData?.project?.id || null);

  // 🔁 Sync formData whenever related fields change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      content: taskContent,
      due_date: dueDate,
      project: projectId,
    }));
  }, [taskContent, dueDate, projectId]);

  // 📆 Parse natural language due date from task content
  useEffect(() => {
    const chronoParsed = chrono.parse(taskContent);
    if (chronoParsed.length) {
      const lastDate = chronoParsed[chronoParsed.length - 1];
      setDueDate(lastDate.date());
    }
  }, [taskContent]);


const handleSubmit = useCallback(() => {
  if (!taskContent) return;

  const clerkUserId = localStorage.getItem("clerkUserId");
  if (!clerkUserId) {
    alert("You must be logged in to add a task.");
    return;
  }
  const fullData = {
    ...formData,
    userId: clerkUserId,
    due_date: dueDate ?? new Date().toISOString(),
  };

  // Only delete id in create mode
  if (mode === 'create') {
    delete fullData.id;
  }

  if (onSubmit) onSubmit(fullData);

  setTaskContent('');
  setFormData(prev => ({ ...prev, content: '' }));
}, [taskContent, formData, onSubmit, dueDate, mode]);


  return (
    <Card className={cn(`focus-within:border-foreground/30 ${className}`)}>
      <CardContent className='p-2'>
        <Textarea
          className='!border-0 !ring-0 mb-2 p-1'
          placeholder='After finishing the project, Take a tour'
          autoFocus
          value={taskContent}
          onInput={(e) => {
            const value = e.currentTarget.value;
            setTaskContent(value);
            setFormData(prev => ({ ...prev, content: value }));
          }}
          onKeyDown ={(e)=>{
            if(e.key==='Enter'){
              e.preventDefault();
              handleSubmit();
            }
          }

          }
        />

        {/* 📅 Due Date Picker */}
        <div className="ring-1 ring-border rounded-md max-w-max">
          <Popover open={dueDateOpen} onOpenChange={setDueDateOpen}>
            <PopoverTrigger asChild>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className={cn(getTaskDueDateColorClass(dueDate, false))}
              >
                <CalendarIcon />
                {dueDate ? formatCustomDate(dueDate) : 'Due date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                initialFocus
                selected={dueDate}
                onSelect={(selected) => {
                  setDueDate(selected || null);
                  setFormData(prev => ({ ...prev, due_date: selected || null }));
                  setDueDateOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>

          {dueDate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='sm'
                  className='px-2 -ms-2'
                  aria-label='Remove due date'
                  onClick={() => {
                    setDueDate(null);
                    setFormData(prev => ({ ...prev, due_date: null }));
                  }}
                >
                  <X />
                </Button>
              </TooltipTrigger>
              <TooltipContent> Remove due date </TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardContent>

      <Separator />

      <CardFooter className='grid grid-cols-[minmax(0,1fr), max-content] gap-2 p-2'>
        {/* 🗂 Project Selector (placeholder only) */}
        <Popover open={projectOpen} onOpenChange={setProjectOpen} modal>
          <PopoverTrigger asChild>
            <Button
              variant='ghost'
              role='combobox'
              aria-expanded={false}
              className='max-w-max'
            >
              <Inbox /> Inbox <ChevronDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[240px] p-0'>
            <Command>
              <CommandInput placeholder='Search project...' />
              <CommandList>
                <ScrollArea>
                  <CommandEmpty>No project found</CommandEmpty>
                  <CommandGroup>
                    {[...Array(10)].map((_, i) => (
                      <CommandItem key={i}>Project {i + 1}</CommandItem>
                    ))}
                  </CommandGroup>
                </ScrollArea>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* 🔘 Cancel + Submit Buttons */}
        <div className="flex items-center gap-2">
          <Button variant='secondary' onClick={onCancel}>
            <span className="max-md:hidden">Cancel</span>
            <X className="md:hidden" />
          </Button>
          <Button disabled={!taskContent} onClick={handleSubmit}>
            <span className="max-md:hidden">{mode === 'create' ? 'Add Task' : 'Save Task'}</span>
            <SendHorizonal className="md:hidden" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskFormComponent;
