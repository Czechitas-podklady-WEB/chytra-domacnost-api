export const isDefined = <V>(value: V | undefined): value is V => value !== undefined && value !== null
