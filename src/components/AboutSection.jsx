import { Facebook, Github, Instagram, Linkedin } from "lucide-react"
import { experiences } from "../data/experiences"

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          <div className="md:col-span-1 space-y-4 text-left">
            {/* Header */}
            <h2 className='text-2xl font-bold'>
              About <span className='text-primary'>Me</span>
            </h2>
            {/* Self-intro */}
            <p className="text-muted-foreground">
              I focus on creating solutions that deliver real value and meet 
              client needs, and I am passionate about problem-solving, continuously expanding 
              my skills to bridge the gap between business goals and modern technologies while 
              creating intuitive and impactful user experiences.
            </p>
            {/* Social Media */}
            <div className="flex flex-row space-x-4">
              <a href="https://www.facebook.com/kayee.wong.182/" taget="_blank" className="hover:text-primary">
                <Facebook />
              </a>
              <a href="https://www.instagram.com/kaaaayee__/" target="_blank" className="hover:text-primary">
                <Instagram />
              </a>
              <a href="https://au.linkedin.com/in/kinsey-wong-4905811ab" target="_blank" className="hover:text-primary">
                <Linkedin />
              </a>
              <a href="https://github.com/kwon0144" target="_blank" className="hover:text-primary">
                <Github />
              </a>
            </div>
            {/* Resume */}
            <a href="/Kinsey_SWE_Resume.pdf" download className="cosmic-outline-button">
              Download Resume
            </a>
          </div>

          {/* Experience*/}
          <div className=" flex flex-col gap-6 text-left">
            {experiences
              .map((exp, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-4 shadow-md"
                >
                  <p className="text-primary text-sm">{exp.period}</p>
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <p className="mt-2 text-sm">{exp.company}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection