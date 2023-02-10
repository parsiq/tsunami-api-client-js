import axios, { AxiosInstance } from 'axios';

export type TsunamiApiClientConfig = {
    retries: number;
}
export abstract class HttpClient {
    protected readonly instance: AxiosInstance;

    public constructor(baseURL: string, apiKey: string, config?: TsunamiApiClientConfig) {
        this.instance = axios.create({
            baseURL,
            auth: {username: apiKey, password: ''}
        });
    }
}
