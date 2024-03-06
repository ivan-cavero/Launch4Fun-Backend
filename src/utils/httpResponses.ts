export const successResponse = <T>(data: T) => data;

export const errorResponse = (message: string) => ({
    error: message
});
