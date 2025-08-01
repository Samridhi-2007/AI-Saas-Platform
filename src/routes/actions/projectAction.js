/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 * @description projectAction for the app
 */
import { redirect } from "react-router";
import { databases } from "@/lib/appwrite";
import { generateID, getUserId } from "@/lib/utils";
import { generateProjectTasks } from "@/api/googleAI";
import { Rewind } from "lucide-react";

const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const createProject = async (data) => {
  let project = null;
  let aiGeneratedTasks = [];
  const { ai_task_gen, task_gen_prompt, name, color_name, color_hex } = data;

  try {
    const userId = await getUserId();

    project = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      "projects",
      generateID(),
      { name, color_name, color_hex, userId }
    );
    console.log("✅ Project created:", project);
  } catch (err) {
    console.error("❌ Error creating project:", err.message || err);
    throw new Error("Failed to create project");
  }

  if (ai_task_gen) {
    try {
      const aiRaw = await generateProjectTasks(task_gen_prompt);
      aiGeneratedTasks = JSON.parse(aiRaw || "[]");

      if (!Array.isArray(aiGeneratedTasks)) {
        throw new Error("AI returned non-array task data.");
      }
      console.log("🤖 AI-generated tasks:", aiGeneratedTasks);
    } catch (err) {
      console.error("❌ Error generating tasks:", err.message || err);
    }
  }

  if (aiGeneratedTasks.length) {
    try {
      const userId = await getUserId();
      const tasks = aiGeneratedTasks
        .filter((task) => task?.content)
        .map((task) => ({
          content: task.content,
          due_date: task.due_date || null,
          project: project?.$id,
          userId,
        }));

      await Promise.all(
        tasks.map((task) =>
          databases.createDocument(APPWRITE_DATABASE_ID, "tasks", generateID(), task)
        )
      );
      console.log(`✅ ${tasks.length} AI tasks created`);
    } catch (err) {
      console.error("❌ Error creating tasks:", err.message || err);
    }
  }

  return redirect(`/app/projects/${project?.$id}`);
};

const updateproject=async(data)=>{
  const documentId=data.id;
  if(!documentId) throw new Error('project id not found. ');
  try{
    return await databases.updateDocument(
      APPWRITE_DATABASE_ID,
      'projects',
      documentId,{
        name: data.name,
        color_name: data.color_name,
        color_hex: data.color_hex,
      }
    );
  }
catch(err){
  console.log('error updating project:',err);
}
}

const deleteProject = async (data) => {
  const documentId=data.id;

  if(!documentId) throw new Error('No project found with this id.');

  try{
    await databases.deleteDocument(
      APPWRITE_DATABASE_ID,
      'projects',
      documentId
    );
  }catch(err){
    console.log('Error deleting project: ',err);
  }
};

const projectAction = async ({ request }) => {
  const method = request.method;
  
  if (method === "POST") {
    const data = await request.json();
    return await createProject(data);
  }
  
  if (method === "PUT") {
    const data = await request.json();
    return await updateproject(data);
  }

  if (method === "DELETE") {
    const formData = await request.formData();
    const data = {
      intent: formData.get('intent'),
      id: formData.get('id')
    };
    
    if (data.intent === 'delete') {
      await deleteProject(data);
      return redirect('/app/projects');
    }
  }

  throw new Error('Invalid method');
};

export default projectAction;
