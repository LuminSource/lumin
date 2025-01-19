class LuminNoTransactions extends Error {
  constructor() {
    super();

    Object.setPrototypeOf(this, LuminGenericError.prototype);
  }
}
