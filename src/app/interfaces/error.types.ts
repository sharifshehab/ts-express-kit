export interface TErrorSources {
	path: string | number;
	message: string;
};

export interface TGenericErrorResponse {
	statusCode: number;
	message: string;
	errorSources?: TErrorSources[]; // Name of the errors field for, "Mongoose Schema and Zod schema" validation
};
