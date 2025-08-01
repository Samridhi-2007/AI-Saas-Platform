/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 * @description projectdetailloader for the app
 */

import { databases } from "@/lib/appwrite";
import { getUserId } from "@/lib/utils";

const getProject = async (projectId) => {
  // Debug: Log the project ID being validated
  console.log("🔍 Validating project ID:", {
    projectId,
    type: typeof projectId,
    length: projectId?.length,
    value: JSON.stringify(projectId)
  });
  
  // Validate project ID format
  if (!projectId) {
    throw new Error("Project ID is required");
  }
  
  if (typeof projectId !== 'string') {
    throw new Error("Project ID must be a string");
  }
  
  if (projectId.length > 36) {
    throw new Error(`Project ID is too long (${projectId.length} chars, max 36): ${projectId}`);
  }
  
  if (projectId.startsWith("_")) {
    throw new Error(`Project ID cannot start with underscore: ${projectId}`);
  }
  
  // Check for valid characters (a-z, A-Z, 0-9, underscore)
  const validIdPattern = /^[a-zA-Z0-9_]+$/;
  if (!validIdPattern.test(projectId)) {
    // Show which characters are invalid
    const invalidChars = projectId.split('').filter(char => !/[a-zA-Z0-9_]/.test(char));
    throw new Error(`Project ID contains invalid characters: ${invalidChars.join(', ')} in "${projectId}"`);  
  }

  try {
    const project = await databases.getDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      "projects",
      projectId
    );

    const userId = getUserId();
    if (project.userId !== userId) {
      throw new Error("Unauthorized: You don't have access to this project");
    }

    return project;
  } catch (err) {
    console.log("❌ Error getting project:", err);
    
    // Handle specific Appwrite errors
    if (err.message?.includes('Document with the requested ID could not be found')) {
      throw new Error("Project not found");
    }
    
    if (err.message?.includes('Invalid `documentId` param')) {
      throw new Error("Invalid project ID format");
    }
    
    // Re-throw the original error if it's already a custom error
    if (err instanceof Error && err.message.includes('Unauthorized')) {
      throw err;
    }
    
    // Generic error fallback
    throw new Error("Failed to load project");
  }
};

export async function projectDetailLoader({ params }) {
  // Debug: Log all URL parameters
  console.log("🌐 URL Parameters received:", {
    params,
    projectId: params?.projectId,
    allKeys: Object.keys(params || {})
  });
  
  const { projectId } = params;

  try {
    // The getProject function now handles all validation
    const project = await getProject(projectId);
    return { project };
  } catch (error) {
    console.error("❌ Project loader error:", error.message);
    
    // You can customize error handling here
    // For now, we'll re-throw the error to be handled by React Router's error boundary
    throw new Response(error.message, { 
      status: error.message.includes('not found') ? 404 : 
             error.message.includes('Unauthorized') ? 403 : 400,
      statusText: error.message 
    });
  }
}



export default projectDetailLoader;
