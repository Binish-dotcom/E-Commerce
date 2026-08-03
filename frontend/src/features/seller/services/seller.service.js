import { getMeAPI, updateProfileAPI, setupStoreProfileAPI, deleteAccountAPI } from "../../../api/user.api";

class SellerService {
  getMe() {
    return getMeAPI();
  }

  updateProfile(profileData) {
    return updateProfileAPI(profileData);
  }

  setupStoreProfile(storeData) {
    return setupStoreProfileAPI(storeData);
  }

  deleteAccount() {
    return deleteAccountAPI();
  }
}

export default new SellerService();
