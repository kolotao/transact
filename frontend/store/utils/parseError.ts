/**
 * Parses a server response to extract an error code string,
 * expecting the backend to always return { error: string } on failure.
 *
 * If parsing fails or we don't find data.error, we default to "UNEXPECTED_ERROR".
 */
export async function parseError(response: Response): Promise<string> {
  let errorCode = 'UNEXPECTED_ERROR';

  const data = await response.json();
  if (data && typeof data.error === 'string') errorCode = data.error;

  return errorCode;
}
