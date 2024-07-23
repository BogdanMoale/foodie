//Storing Server Actions in Separate Files
"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

// Using Server Actions for Handling Form Submissions

function isInvalidText(text) {
  return !text || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  //Adding Server-Side Input Validation
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    // throw new Error("Invalid input");
    //Working with Server Action Responses & useFormState
    return {
      message: "Invalid input.",
    };
  }
  //save the meal
  await saveMeal(meal);

  //Triggering Cache Revalidations
  revalidatePath("/", "layout"); //revalidate all pages
  revalidatePath("/meals"); //revalidate a page

  //redirect the user to a diferent page
  redirect("/meals");
}
