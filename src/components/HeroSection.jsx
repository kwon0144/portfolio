import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <div className="container max-w-4xl mx-auto text-center z-10">
            <div>
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight">
                        <span className="opacity-0 animate-fade-in">Hi, I'm </span>
                        <span className="text-primary opacity-0 animate-fade-in-delay-1">Kinsey</span>
                        <span className="text-primary ml-2 opacity-0 animate-fade-in-delay-2">Wong</span>
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in-delay-3">
                       a recent graduate with degrees in Information Technology and Business, 
                       passionate about building software that creates real business value and aligns 
                       with client needs
                    </p>
                    <div className="pt-4 opacity-0 animate-fade-in-delay-4">
                        <a href="#projects" className="cosmic-button">
                            View My Work
                        </a>
                    </div>
                </div>
            </div>
            <a href="#about" className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                <ArrowDown className="h-5 w-5 text-primary text-sm" />
            </a>
        </div>
    </section>
  )
}

export default HeroSection