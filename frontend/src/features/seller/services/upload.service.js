import { uploadImageAPI } from "../../../api/upload.api";

class UploadService {
  uploadImage(file) {
    return uploadImageAPI(file);
  }
}

export default new UploadService();