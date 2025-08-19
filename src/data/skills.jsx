import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaBootstrap,
  FaAngular,
  FaVuejs,
  FaNodeJs,
  FaGitAlt,
  FaAws,
  FaFigma,
  FaDocker,
  FaMicrosoft,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiTypescript,
  SiD3Dotjs,
  SiDjango,
  SiDotnet,
  SiPostgresql,
  SiMysql,
  SiCypress,
  SiGithubactions,
  SiFramer,
} from "react-icons/si";

import { GiBearHead } from "react-icons/gi";

export const categories = ["all", "frontend", "backend", "cloud & tools"]

export const skills = [
  // Frontend
  { name: "HTML 5", Icon: FaHtml5, category: "frontend" },
  { name: "CSS 3", Icon: FaCss3Alt, category: "frontend" },
  { name: "JavaScript", Icon: FaJsSquare, category: "frontend" },
  { name: "TypeScript", Icon: SiTypescript, category: "frontend" },
  { name: "Angular", Icon: FaAngular, category: "frontend" },
  { name: "Vue.js", Icon: FaVuejs, category: "frontend" },
  { name: "React.js", Icon: FaReact, category: "frontend" },
  { name: "Next.js", Icon: SiNextdotjs, category: "frontend" },
  { name: "TailwindCSS", Icon: SiTailwindcss, category: "frontend" },
  { name: "Bootstrap", Icon: FaBootstrap, category: "frontend" },
  { name: "Redux", Icon: SiRedux, category: "frontend" },
  { name: "D3.js", Icon: SiD3Dotjs, category: "frontend" },
  { name: "Zustand", Icon: GiBearHead, category: "frontend" },
  { name: "Framer Motion", Icon: SiFramer, category: "frontend" },

  // Backend
  { name: ".Net", Icon: SiDotnet, category: "backend" },
  { name: "Node.js", Icon: FaNodeJs, category: "backend" },
  { name: "Django", Icon: SiDjango, category: "backend" },
  { name: "PostgreSQL", Icon: SiPostgresql, category: "backend" },
  { name: "MySQL", Icon: SiMysql, category: "backend" },

  // Cloud & Tools
  // { name: "Git/GitHub", Icon: FaGitAlt, category: "cloud & tools" },
  { name: "AWS", Icon: FaAws, category: "cloud & tools" },
  { name: "Azure", Icon: FaMicrosoft, category: "cloud & tools" },
  { name: "Figma", Icon: FaFigma, category: "cloud & tools" },
  { name: "Cypress", Icon: SiCypress, category: "cloud & tools" },
  { name: "Docker", Icon: FaDocker, category: "cloud & tools" },
  { name: "GitHub Actions", Icon: SiGithubactions, category: "cloud & tools" },
];
