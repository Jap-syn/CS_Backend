interface ApiResponse<T> {
    code: number;
    message: string;
    data?: T;
  }
  
  export const successResponse = <T>(data: T, message = 'Success', code = 200): ApiResponse<T> => {
    return {
      code,
      message,
      data,
    };
  };
  
  export const errorResponse = (message = 'Error', code = 500, data?: any): ApiResponse<any> => {
    return {
      code,
      message,
      data,
    };
  };
  