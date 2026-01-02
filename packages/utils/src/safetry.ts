type AttemptSuccess<T> = readonly [null, T];

type AttemptFailure<E> = readonly [E, null];

type AttemptResult<E, T> = AttemptSuccess<T> | AttemptFailure<E>;

type AttemptResultAsync<E, T> = Promise<AttemptResult<E, T>>;

export function safetry<E = Error, T = unknown>(
  operation: Promise<T>,
): AttemptResultAsync<E, T>;

export function safetry<E = Error, T = unknown>(
  operation: () => T,
): AttemptResult<E, T>;

export function safetry<E = Error, T = unknown>(
  operation: Promise<T> | (() => T),
): AttemptResult<E, T> | AttemptResultAsync<E, T> {
  if (typeof operation === "function") {
    try {
      const data = operation();
      return [null, data] as const;
    } catch (error) {
      return [error as E, null] as const;
    }
  }

  return operation
    .then((value: T) => [null, value] as const)
    .catch((error: E) => [error, null] as const);
}
