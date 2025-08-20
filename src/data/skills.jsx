import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaBootstrap,
  FaAngular,
  FaVuejs,
  FaNodeJs,
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

export const skills = {
  "frontend": [
    { name: "HTML 5", Icon: FaHtml5 },
    { name: "CSS 3", Icon: FaCss3Alt },
    { name: "JavaScript", Icon: FaJsSquare },
    { name: "TypeScript", Icon: SiTypescript },
    { name: "Angular", Icon: FaAngular },
    { name: "Vue.js", Icon: FaVuejs },
    { name: "React.js", Icon: FaReact },
    { name: "Next.js", Icon: SiNextdotjs },
    { name: "TailwindCSS", Icon: SiTailwindcss },
    { name: "Bootstrap", Icon: FaBootstrap },
    { name: "Redux", Icon: SiRedux },
    { name: "D3.js", Icon: SiD3Dotjs },
    { name: "Zustand", Icon: GiBearHead },
    { name: "Framer Motion", Icon: SiFramer },    
  ],
  "backend": [
    { name: ".Net", Icon: SiDotnet },
    { name: "Node.js", Icon: FaNodeJs },
    { name: "Django", Icon: SiDjango },
    { name: "PostgreSQL", Icon: SiPostgresql },
    { name: "MySQL", Icon: SiMysql },
  ],
  "cloud & tools": [
    { name: "AWS", Icon: FaAws },
    { name: "Azure", Icon: FaMicrosoft },
    { name: "Figma", Icon: FaFigma },
    { name: "Cypress", Icon: SiCypress },
    { name: "Docker", Icon: FaDocker },
    { name: "GitHub Actions", Icon: SiGithubactions },
  ]
};
