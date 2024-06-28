import { envServer } from "@/utils/helpers/env";
import { v2 as baseCloudinary } from "cloudinary";

const cloudinary = {
  configEnvironment: () => {
    baseCloudinary.config({
      cloud_name: envServer.CLOUDINARY_CLOUD_NAME,
      api_key: envServer.CLOUDINARY_API_KEY,
      api_secret: envServer.CLOUDINARY_API_SECRET,
    });
  },
  ...baseCloudinary,
};

// cloudinary.config({
//   cloud_name: envServer.CLOUDINARY_CLOUD_NAME,
//   api_key: envServer.CLOUDINARY_API_KEY,
//   api_secret: envServer.CLOUDINARY_API_SECRET,
// });

export { cloudinary };
