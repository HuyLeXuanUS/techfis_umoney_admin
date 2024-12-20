import instance from "../config";

export const apiGetTransactions = async (page, pageSize) => {
    try {
        const response = await instance({
            method: "GET",
            url: `/transaction?page=${page}&pageSize=${pageSize}`,
        });

        return response;
    } catch (error) {
        console.error(error.message);
    }
}