/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 * @description JavaScript-compatible types for the app
 */

const Project = {
  id: null,
  name: '',
  color_name: '',
  color_hex: '',
};

const ProjectForm = {
  id: null,
  name: '',
  color_name: '',
  color_hex: '',
  ai_task_gen: false,
  task_gen_prompt: '',
};

const Task = {
  id: '',
  content: '',
  due_date: null,
  completed: false,
  project: Project,
  userId: '',
};

const TaskForm = {
  id: '',
  content: '',
  due_date: null,
  completed: false,
  project: null, // project id
};

export { Project, ProjectForm, Task, TaskForm };
