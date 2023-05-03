export class TsunamiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number | null = null,
    public readonly statusMessage: string | null = null,
    public readonly cause: Error | null = null,
  ) {
    super(message);
  }
}
