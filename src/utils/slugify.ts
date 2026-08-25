export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove all non-word, non-space, non-dash characters
    .replace(/[\s_]+/g, "-") // Replace spaces and underscores with a single dash
    .replace(/-+/g, "-") // Replace multiple dashes with a single dash
    .replace(/^-+/, "") // Trim dashes from the start
    .replace(/-+$/, ""); // Trim dashes from the end
}
