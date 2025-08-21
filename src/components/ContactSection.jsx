import { Mail, Phone, Send } from 'lucide-react'
import { cn } from '../lib/utils'
import { useToast } from '../hooks/useToast'
import { useState } from 'react'
import emailjs from 'emailjs-com'

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })

    // Constants for Messages
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const[isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Send message to email
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
        .then(() => {
            setTimeout(() => {
                toast({
                    title: "Message sent!",
                    description: "Thank you for your message. I'll get back to you soon."
                });
                setFormData({name: "", email: "", message: ""})
                setIsSubmitting(false);
            }, 1000);
        }).catch(() => {
            alert("Failed message send. Please try again.");
            setIsSubmitting(false);
        });
    }

  return (
    <section id="contact" className="py-24 px-4 relative"> 
        <div className="container mx-auto max-w-5xl"> 
            <h2 className="text-2xl font-bold text-left"> 
                Get In <span className="text-primary">Touch</span> 
            </h2> 
            <p className="text-left text-muted-foreground mb-12 mx-auto text-muted-foreground">
                I'm currently looking for new opportunities. Feel free to reach out.
            </p>
            <div className='flex flex-col justify-center items-center gap-12'>
                {/* Contact Info */}
                <div className='grid grid-cols-1 md:grid-cols-2 h-full gap-4 md:gap-20'>
                    {/* Email */}
                    <div className='flex items-start space-x-4'>
                        <div className='p-3 rounded-full bg-primary/10'>
                            <Mail className='h-6 w-6 text-primary' />
                        </div>
                        <div>
                            <h4 className='font-medium text-start'>Email</h4>
                            <a 
                                href="mailto:kinseywky@gmail.com"
                                className='text-musted-foreground hover:text-primary transition-colors'
                            >
                                kinseywky@gmail.com
                            </a>
                        </div>
                    </div>
                    {/* Phone */}
                    <div className='flex items-start space-x-4'>
                        <div className='p-3 rounded-full bg-primary/10'>
                            <Phone className='h-6 w-6 text-primary' />
                        </div>
                        <div>
                            <h4 className='font-medium text-start'>Phone</h4>
                            <a 
                                href="tel:+610467679054"
                                className='text-musted-foreground hover:text-primary transition-colors'
                            >
                                (+61) 04 6767 9054
                            </a>
                        </div>
                    </div>
                </div>                   
                {/* Message Form */}
                <div className="bg-card p-4 md:p-8 rounded-lg shadow-xs md:min-w-md">
                    <h3 className='text-2xl font-semibold mb-4 text-start'>Send a message</h3>
                    <form className='space-y-2' onSubmit={handleSubmit}>
                        <label htmlFor="name" className='block font-medium text-muted-foreground text-start px-1 mb-1'>Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className='w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary/40'
                            placeholder='Your Name'
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                        <label htmlFor="email" className='block font-medium text-muted-foreground text-start px-1 mb-1'>Contact Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className='w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary/40'
                            placeholder='Your Email'
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                        <label htmlFor="message" className='block font-medium text-muted-foreground text-start px-1 mb-1'>Message</label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            className='w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary/40 resize-none'
                            placeholder='Type your message here...'
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                        ></textarea>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                                "cosmic-button w-full flex items-center justify-center gap-2",
                            )}
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                            <Send size={16} />
                        </button>
                        
                    </form>
                </div> 
            </div>            
        </div>
    </section>
  )
}

export default ContactSection