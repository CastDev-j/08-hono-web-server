export const useJson = () => {
  const success = (data: any, message: string = "Operation successful") => {
    return {
      status: "success",
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  };

  const created = (
    data: any,
    message: string = "Resource created successfully",
  ) => {
    return {
      status: "success",
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  };

  const badRequest = (errors: any, message: string = "Validation failed") => {
    return {
      status: "error",
      message,
      errors: Array.isArray(errors) ? errors : [errors],
      timestamp: new Date().toISOString(),
    };
  };

  const notFound = (resource: string = "Resource", message?: string) => {
    return {
      status: "error",
      message: message || `${resource} not found`,
      timestamp: new Date().toISOString(),
    };
  };

  return {
    success,
    created,
    badRequest,
    notFound,
  };
};
