interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message: string;
}

// responseUtils.ts
export function formatApiResponse<T>(
  // eslint-disable-next-line @typescript-eslint/default-param-last
  data: T | undefined = undefined,
  message: string,
  status: 'success' | 'error' = 'success',
): ApiResponse<T> {
  return {
    status,
    data,
    message,
  };
}
