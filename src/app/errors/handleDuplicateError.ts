import { TErrorSources, TGenericErrorResponse } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // Extract the field name from the error message (simplified approach)
  let extractedMessage = 'Field';
  if (err.message && err.message.includes('"')) {
    const parts = err.message.split('"');
    if (parts.length > 1) {
      extractedMessage = parts[1];
    }
  }

  const statusCode = 400;
  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exist`,
    },
  ];
  return {
    statusCode,
    message: 'Duplicate Error',
    errorSources,
  };
};

export default handleDuplicateError;
