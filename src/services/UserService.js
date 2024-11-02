import axios from "axios";

const LOGIN_URL = 'http://localhost:8080/api/auth/login';
const SIGN_UP_URL = 'http://localhost:8080/api/auth/signup';
const VALIDATE_URL = 'http://localhost:8080/api/auth/validate';
const CHATBOT_URL = 'http://localhost:8080/api/auth/chatbot';
const PANTRY_URL = 'http://localhost:8080/api/auth/pantry';
const COMMUNITY_URL = 'http://localhost:8080/api/auth/community';
const RECIPE_URL = 'http://localhost:8080/api/auth/recipe';

class UserService {
    LogIn(login) {
        return axios.post(LOGIN_URL, login);
    }

    SignUp(user) {
        return axios.post(SIGN_UP_URL, user);
    }

    Validate(ecoKey) {
        return axios.get(VALIDATE_URL, { params: { ecoKey } });
    }

    ChatbotResponse(message) {
        return axios.post(CHATBOT_URL, { message });
    }

    FetchPantryItems() {
        return axios.get(PANTRY_URL);
    }

    FetchCommunityItems() {
        return axios.get(COMMUNITY_URL);
    }

    FetchRecipeItems() {
        return axios.get(RECIPE_URL);
    }
}

export default new UserService();
