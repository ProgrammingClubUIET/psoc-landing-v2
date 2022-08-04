export type BackendClient = { headers?: { [key: string]: string } };

export const backendClient = (auth?: string) => {
    return { headers: auth ? { Authorization: `Bearer ${auth}` }: undefined };
};