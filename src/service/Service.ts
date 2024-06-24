interface HTTPInstance {
  get<T>(url: string, config?: RequestInit): Promise<T>;
  delete<T>(url: string, config?: RequestInit): Promise<T>;
  head<T>(url: string, config?: RequestInit): Promise<T>;
  options<T>(url: string, config?: RequestInit): Promise<T>;
  post<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
  put<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
  patch<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
}

class Service {
  public http: HTTPInstance;
  private baseURL: string;
  private headers: Record<string, string>;
  constructor() {
    this.baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
    this.headers = {
      csrf: "token",
      Referer: this.baseURL,
    };

    this.http = {
      get: this.get.bind(this),
      delete: this.delete.bind(this),
      head: this.head.bind(this),
      options: this.options.bind(this),
      post: this.post.bind(this),
      put: this.put.bind(this),
      patch: this.patch.bind(this),
    };
  }
  private async request<T = unknown>(
    method: string,
    url: string,
    data?: unknown,
    config?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        method,
        headers: {
          ...this.headers,
          ...config?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        ...config,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const responseData: T = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  public get<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>("GET", url, undefined, config);
  }
  public delete<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>("DELETE", url, undefined, config);
  }
  public head<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>("HEAD", url, undefined, config);
  }
  public options<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>("OPTIONS", url, undefined, config);
  }
  public post<T>(
    url: string,
    data?: unknown,
    config?: RequestInit
  ): Promise<T> {
    return this.request<T>("POST", url, data, config);
  }
  public put<T>(url: string, data?: unknown, config?: RequestInit): Promise<T> {
    return this.request<T>("PUT", url, data, config);
  }
  public patch<T>(
    url: string,
    data?: unknown,
    config?: RequestInit
  ): Promise<T> {
    return this.request<T>("PATCH", url, data, config);
  }
}

export default Service;
