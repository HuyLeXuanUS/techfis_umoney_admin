import instance from "../config";

export const apiLogin = async (params = undefined | {}) => {
    try {
        const response = await instance({
            method: "POST",
            url: "/admin-login",
            data: params ?? {},
        });

        return response;
    } catch (error) {
        console.error(error.message);
    }
}