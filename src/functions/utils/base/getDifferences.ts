import { DiffEdit, diff } from "deep-diff";

type NestedDifferenceResult = {
  [key: string]:
    | {
        before: any;
        after: any;
      }
    | NestedDifferenceResult;
};

export function getDifferences<T extends object>(
  original: T,
  updated: T
): NestedDifferenceResult | string {
  const diffs = diff(original, updated);

  if (!diffs) return "no changes";

  return diffs
    .filter((d): d is DiffEdit<any> => d.kind === "E") // Filter for edited properties
    .reduce((acc, d) => {
      const keyPath = d.path ? d.path.join(".") : "";
      acc[keyPath] = { before: d.lhs, after: d.rhs };
      return acc;
    }, {} as NestedDifferenceResult);
}
