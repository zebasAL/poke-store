import { AxiosError } from "axios";

type PromiseAllSettledResponse = {
    status: "fulfilled" | "rejected";
    value?: any, reason?: AxiosError;
}

export const getFulfilledData = (data: Array<PromiseAllSettledResponse>): any => {
    return (data.filter((res) => res.status === "fulfilled").map((res) => res.value));
}