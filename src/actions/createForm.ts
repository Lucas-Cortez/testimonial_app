"use server";

// import { db } from "@/lib/db";

export async function createFormAction(formData: FormData) {
  const data = Object.fromEntries(formData);

  // console.log(db);

  // await db.form.create({
  //   data: {
  //   },
  // });

  console.log(data);
}
