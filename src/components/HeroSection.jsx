import { ArrowDown } from 'lucide-react';

const HeroSection = ({ ready = true }) => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <div className="container max-w-4xl mx-auto text-center z-10">
            <div>
                <div className="space-y-6">
                    <h1 className="text-6xl font-bold tracking-tight">
                        <span className={ready ? "opacity-0 animate-fade-in" : "opacity-0"}>Hi, I'm </span>
                        <span className={ready ? "text-primary opacity-0 animate-fade-in-delay-1" : "text-primary opacity-0"}>Kinsey</span>
                        <span className={ready ? "text-primary ml-2 opacity-0 animate-fade-in-delay-2" : "text-primary ml-2 opacity-0"}>Wong</span>
                    </h1>
                    <p className={ready ? "text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3" : "text-sm text-muted-foreground max-w-xl mx-auto opacity-0"}>
                       a recent graduate with degrees in Information Technology and Business, 
                       passionate about building software that creates real business value and aligns 
                       with client needs
                    </p>
                    <div className={ready ? "pt-4 opacity-0 animate-fade-in-delay-4" : "pt-4 opacity-0"}>
                        <a href="#projects" className="cosmic-button">
                            View My Work
                        </a>
                    </div>
                </div>
            </div>
            <a href="#about" className={ready ? "absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce" : "absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"}>
                <ArrowDown className="h-5 w-5 text-primary text-sm" />
            </a>
        </div>
    </section>
  )
}

export default HeroSection