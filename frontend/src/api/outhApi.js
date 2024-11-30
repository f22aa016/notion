import axiosFrontend from "./axiosFrontend";

const authApi = {
    register: (params) => axiosFrontend.post("auth/register", params),
}

export default authApi;
