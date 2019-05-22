export const appendClassNames = (
  className: string,
  ...others: string[]
): string => {
  if (others == null) {
    return className;
  }
  return others.reduce(
    (result, o) => (o == null ? result : result + " " + o),
    className || ""
  );
};
