
export default async function inboxAction({ request }) {
  const formData = await request.formData();
  console.log("Form data from inbox:", Object.fromEntries(formData));
  return null; // ya Response.redirect("/somewhere");
}
