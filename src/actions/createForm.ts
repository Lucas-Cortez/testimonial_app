"use server";

export async function createFormAction(formData: FormData) {
  const data = Object.fromEntries(formData);

  console.log(data);
}
