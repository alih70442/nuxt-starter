import { request_upload_new } from "../api/user.api";
import { is_response_ok } from "@/assets/js/network/helpers.network";

function upload_image(file, type) {
  return new Promise(async (resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    const rs = await request_upload_new(formData);
    if (!is_response_ok(rs)) reject(false);
    resolve(rs.data.data);
  });
}

export default upload_image;
