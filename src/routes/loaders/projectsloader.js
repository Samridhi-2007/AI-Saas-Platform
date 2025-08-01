import { databases, Query } from "@/lib/appwrite";
import { getUserId } from "@/lib/utils";

const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const getProjects = async (query) => {
  try {
    const userId = await getUserId();

    const queries = [
      Query.equal("userId", userId),
      Query.select(["$id", "name", "color_name", "color_hex", "$createdAt"]),
      Query.orderDesc("$createdAt"),
    ];

    // ✅ Add search filter only if query is not empty
    if (query.trim() !== "") {
      queries.unshift(Query.contains("name", query));
    }

    return await databases.listDocuments(APPWRITE_DATABASE_ID, "projects", queries);
  } catch (err) {
    console.error("Error fetching projects:", err);
    throw new Error("Error getting projects");
  }
};

const projectsLoader = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";

  const projects = await getProjects(query); // ✅ Pass query correctly

  return { projects };
};

export default projectsLoader;
