// Static-export image loader for GitHub Pages: there is no optimization
// server, so serve the original file, prefixed with the site's base path.
export default function loader({ src }: { src: string }) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
