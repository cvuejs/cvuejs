declare namespace _ {
  interface LoDashStatic {
    defaultsDeepSafe(
      object: Record<string, any>,
      ...sources: Record<string, any>[]
    ): Record<string, any>
  }
  interface Object<T> {
    defaultsDeepSafe(...sources: Record<string, any>[]): _.Object<T>
  }
}
