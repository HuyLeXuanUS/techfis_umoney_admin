import instance from "../config";

export const apiGetUsers = async (params = undefined | {}) => {
    try {
        const response = await instance({
            method: "GET",
            url: "/user",
            data: params ?? {},
        });

        return response;
    } catch (error) {
        console.error(error.message);
    }
}