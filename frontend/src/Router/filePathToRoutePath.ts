export function filePathToRoutePath(filePath: string) {
  const routePath = `/${filePath
    // Removing ./
    .replace(/^\.\//, "")

    // Removing extension
    .replace(/\.jsx?$/, "")

    // Replacing [[slug]] with :slug?
    .replace(/(\[{2})([a-z]*)(\]{2})/gi, ":$2?")

    // Replacing [slug] with :slug
    .replace(/\[([a-z]*)\]/gi, ":$1")

    // Making index files be the root
    .replace(/\/?index$/, "")}`;

  return routePath;
}
