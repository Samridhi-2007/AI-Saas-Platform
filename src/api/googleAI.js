/** 
*@copyright 2024 codewithsadee
*@license Apache-2.0
*@description Google ApI for the app
*/

import model from "@/lib/googleAi";

const generateProjectTasks= async()=>{
model.generationConfig = {
    responseMimeType: 'application/json'
}
try{
const result = await model.generateContent(`
 Generate and return a listof tasks based on the provided prompt and the given JSON schema  
 Prompt: ${prompt}
 Task Schema: 
 {
 content: string;
 due_date: Date | null;
 }

 Requirements:
 1. Ensure tasks align with the provided prompt.
 2. Set the 'due_date' relative to todays's date: ${new Date()}
 3. Return an array of tasks matching the schema. 
 
 Output: Array<Task>
 `);
return result.response.text();
}catch(err){
    console.log('error geenrating tasks:', err);
}
}

export {generateProjectTasks};