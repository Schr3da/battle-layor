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

export const querySelector = (s: string) => {
	const selector = String(s).trim();
	
	if (selector.length == 0) {
		console.error("Not a valid selector string provided");
		return null;
	}

	return document.querySelector(selector);
}
