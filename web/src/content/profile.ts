/** Language-neutral contact details and tech stack. */
export const profile = {
  monogram: "AS",
  email: "abdulrahman.aers@gmail.com",
  linkedin: "https://www.linkedin.com/in/abdulrahman-samir-400a401b4",
  github: "https://github.com/AbdulrhmanSamir3579",
  cv: "/cv/Abdulrahman-Samir-CV.pdf",
} as const;

/**
 * Logos via https://simpleicons.org — slug must match Simple Icons.
 * `darkColor` overrides near-black brand colours that vanish on the dark theme.
 */
export type TechBrand = { name: string; iconSlug: string; darkColor?: string };

/** Order: core → backend → web → data viz → delivery */
export const techStack: TechBrand[] = [
  { name: "Angular", iconSlug: "angular", darkColor: "ffffff" },
  { name: "TypeScript", iconSlug: "typescript" },
  { name: "RxJS", iconSlug: "reactivex" },
  { name: "NgRx", iconSlug: "ngrx" },
  { name: "Nx", iconSlug: "nx", darkColor: "ffffff" },
  { name: "Node.js", iconSlug: "nodedotjs" },
  { name: "NestJS", iconSlug: "nestjs" },
  { name: "Prisma", iconSlug: "prisma", darkColor: "ffffff" },
  { name: "PostgreSQL", iconSlug: "postgresql" },
  { name: "Redis", iconSlug: "redis" },
  { name: "React", iconSlug: "react" },
  { name: "Next.js", iconSlug: "nextdotjs", darkColor: "ffffff" },
  { name: "Tailwind CSS", iconSlug: "tailwindcss" },
  { name: "Apache ECharts", iconSlug: "apacheecharts" },
  { name: "Chart.js", iconSlug: "chartdotjs" },
  { name: "Docker", iconSlug: "docker" },
  { name: "GitHub Actions", iconSlug: "githubactions" },
  { name: "Vitest", iconSlug: "vitest" },
  { name: "Figma", iconSlug: "figma" },
];
