import { CreateFormValues } from "@/utils/schemas/createFormSchema";
import { uploadImageService } from "./uploadImageService";

export const createFormService = async (data: CreateFormValues) => {
  console.log("Success", data);

  const { logoImgFile, ...rest } = data;

  let logoImgUrl = "";

  if (data.logoImgFile) {
    const { imageUrl } = await uploadImageService(data.logoImgFile);
    logoImgUrl = imageUrl;
  }

  const response = await fetch("/api/form", {
    method: "POST",
    body: JSON.stringify({ ...rest, logoImgUrl }),
  });
};
