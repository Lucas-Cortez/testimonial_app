import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { createFormSchema } from "@/utils/schemas/createFormSchema";

const createFormSchemaServer = createFormSchema
  .omit({ logoImgFile: true })
  .extend({ logoImgUrl: z.string().url() });

export async function POST(request: NextRequest) {
  const data = await request.json();

  console.log(data);

  const newData = await createFormSchemaServer.parseAsync(data);

  await db.form.create({
    data: {
      name: newData.name,
      logoImgUrl: newData.logoImgUrl,
      headline: newData.headline,
      customMessage: newData.customMessage,
      customButtonMessage: newData.customButtonMessage,
      customColor: newData.customColor,
      customEndMessage: newData.customEndMessage,
      redirectUrl: newData.redirectUrl,
      accepts: { connect: newData.accepts.map((item) => ({ value: item.toString() })) },
    },
  });

  return NextResponse.json({ message: "success" });
}
