import { siteProfile } from "@/content/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-line px-6 py-8 text-center font-sans text-sm text-muted">
      <p>
        © {year} {siteProfile.name} — {siteProfile.footerTagline}
      </p>
    </footer>
  );
}
