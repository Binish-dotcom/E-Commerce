import { getMeAPI, updateProfileAPI, deleteAccountAPI } from "../../../api/user.api";

class BuyerUserService {
  getMe() {
    return getMeAPI();
  }

  updateProfile(profileData) {
    return updateProfileAPI(profileData);
  }

  deleteAccount() {
    return deleteAccountAPI();
  }
}

export default new BuyerUserService();
