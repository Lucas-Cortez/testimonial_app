// import { createFormAction } from "@/actions/createForm";
import { CreateFormValues } from "@/utils/schemas/createFormSchema";

export const createFormService = async (data: CreateFormValues) => {
  console.log("Success", data);

  const { logoImgFile, ...rest } = data;

  const url = logoImgFile ? URL.createObjectURL(logoImgFile) : "";

  const dataToSend = { ...rest, logoImgUrl: url };

  // const response = await fetch("/api/form", {
  //   method: "POST",
  //   body: JSON.stringify(dataToSend),
  // });

  // await createFormAction(formData);
};
