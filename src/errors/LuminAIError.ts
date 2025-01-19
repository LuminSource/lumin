class LuminAIError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, LuminGenericError.prototype);
  }
}
