import axios, { AxiosInstance } from 'axios';
import axiosRetry, {IAxiosRetryConfig} from "axios-retry";

export abstract class HttpClient {
    protected readonly instance: AxiosInstance;

    public constructor(baseURL: string, apiKey: string, config?: IAxiosRetryConfig) {
        this.instance = axios.create({
            baseURL,
            auth: {username: apiKey, password: ''}
        });
        axiosRetry(this.instance, config)
    }
}
