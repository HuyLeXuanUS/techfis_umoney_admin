import axiosConfig from "./config";

export const apiGetExample = async (params = undefined | {}) => {
    try {
        const response = await axiosConfig({
            method: "GET",
            baseURL: "https://my-json-server.typicode.com",
            url: "/SureshKuchana/reactmock/members",
            params: params ?? {}
        });

        return response;
    } catch (error) {
        console.error(error.message);
    }
};
