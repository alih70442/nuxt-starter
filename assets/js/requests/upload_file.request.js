import { request_upload_file } from "../api/user.api";
import { is_response_ok } from "@/assets/js/network/helpers.network";

export default function upload_file(selector_input) {
  return new Promise(async (resolve, reject) => {
    const formData = new FormData();
    const file = selector_input.files[0];
    formData.append("file", file);
    const rs = await request_upload_file(formData);
    if (!is_response_ok(rs)) reject(false);
    resolve(rs.data.data);
  });
}
