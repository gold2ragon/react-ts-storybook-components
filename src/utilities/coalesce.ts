import { find, isNil, negate, rest } from 'lodash/fp';

// Returns first argument that's neither null nor undefined
// e.g. coalesce(null, undefined, 0, 1, 2, 3) => 0
export const coalesce = rest(find(negate(isNil)));
