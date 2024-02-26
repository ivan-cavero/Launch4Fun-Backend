export const successResponse = <T>(data: T, message = "Success") => ({
	message,
	data
})

export const errorResponse = (message: string) => ({
	message
})
