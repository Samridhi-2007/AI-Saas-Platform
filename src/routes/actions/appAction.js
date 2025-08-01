import { generateID } from "@/lib/utils";
import { databases } from "@/lib/appwrite";

const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TASKS_COLLECTION_ID = "tasks";

// ✅ CREATE TASK
const createTask = async (data) => {
  try {
    console.log("[CreateTask] Incoming:", data);

    const { userId, due_date, ...rest } = data;

    if (!userId) {
      throw new Error("User ID is missing");
    }

    const payload = {
      ...rest,
      userId,
      due_date: due_date ?? null,
    };

    const result = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      TASKS_COLLECTION_ID,
      generateID(),
      payload
    );

    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[CreateTask Error]:", err.message);
    return new Response("Failed to create task", { status: 500 });
  }
};

// ✅ UPDATE TASK
const updateTask = async (data) => {
  try {
    const { id, ...updateFields } = data;
    if (!id) throw new Error("Task ID is required for update");

    const result = await databases.updateDocument(
      APPWRITE_DATABASE_ID,
      TASKS_COLLECTION_ID,
      id,
      updateFields
    );

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[UpdateTask Error]:", err.message);
    return new Response("Failed to update task", { status: 500 });
  }
};

// ✅ DELETE TASK
const deleteTask = async (data) => {
  try {
    const { id } = data;
    if (!id) throw new Error("Task ID is required for delete");

    await databases.deleteDocument(
      APPWRITE_DATABASE_ID,
      TASKS_COLLECTION_ID,
      id
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[DeleteTask Error]:", err.message);
    return new Response("Failed to delete task", { status: 500 });
  }
};

// ✅ ACTION HANDLER
const appAction = async ({ request }) => {
  try {
    const method = request.method;
    const contentType = request.headers.get("Content-Type");

    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Content-Type must be application/json");
    }

    const body = await request.json();
    console.log(`[AppAction] ${method} with`, body);

    if (method === "POST") {
      return await createTask(body);
    }

    if (method === "PUT") {
      return await updateTask(body);
    }

    if (method === "DELETE") {
      return await deleteTask(body);
    }

    return new Response("Method Not Allowed", { status: 405 });
  } catch (err) {
    console.error("[AppAction Fatal Error]:", err.message);
    return new Response(`AppAction Error: ${err.message}`, { status: 500 });
  }
};

export default appAction;
