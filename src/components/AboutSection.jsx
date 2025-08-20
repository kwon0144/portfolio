import { experiences } from "../data/experiences"

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          <div className="md:col-span-1 space-y-4 text-left">
            {/* Header */}
            <h2 className='text-2xl font-semibold'>
              About <span className='text-primary'>Me</span>
            </h2>
            {/* Self-intro */}
            <p className="text-muted-foreground">
              I focus on creating solutions that deliver real value and meet 
              client needs, and I am passionate about problem-solving, continuously expanding 
              my skills to bridge the gap between business goals and modern technologies while 
              creating intuitive and impactful user experiences.
            </p>
            <button href="null" className="cosmic-outline-button">
              Download Resume
            </button>
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