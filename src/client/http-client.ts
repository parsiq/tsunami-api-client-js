import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry, { IAxiosRetryConfig } from 'axios-retry';

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string, apiKey: string, config: AxiosRequestConfig, retry: IAxiosRetryConfig) {
    this.instance = axios.create({
      ...config,
      baseURL,
      auth: { username: apiKey, password: '' },
    });
    axiosRetry(this.instance, retry);
  }
}
