"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ThreeBackground from "./three-background"
import { Mail, Github, Linkedin, ExternalLink, Code, Brain, Zap } from "lucide-react"

export default function GamingPortfolio() {
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  // Motivational quotes
  const motivationalQuotes = [
    "Building the future, one line of code at a time",
    "Where artificial intelligence meets human creativity",
    "Transforming ideas into intelligent solutions",
    "Code is poetry, AI is the future",
    "Innovation through intelligent automation",
    "Crafting tomorrow's technology today",
    "Bridging the gap between human and machine",
    "Every algorithm tells a story",
    "Creating intelligent systems that matter",
    "The future is written in code"
  ]

  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length)
    }, 3000) // Change quote every 3 seconds

    return () => clearInterval(quoteInterval)
  }, [])

  useEffect(() => {
    // Import GSAP only on client side
    const loadGSAP = async () => {
      if (typeof window !== "undefined") {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")

        gsap.registerPlugin(ScrollTrigger)

        // Hero animations
        gsap.fromTo(".hero-title", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })

        // Animate each letter of AHMAD FARHAD
        gsap.fromTo(".letter", 
          { 
            opacity: 0, 
            y: 50, 
            rotationX: -90,
            scale: 0.5
          }, 
          { 
            opacity: 1, 
            y: 0, 
            rotationX: 0,
            scale: 1,
            duration: 0.8, 
            ease: "back.out(1.7)",
            stagger: 0.1,
            delay: 0.5
          }
        )

        // Continuous floating animation for letters
        gsap.to(".letter", {
          y: "random(-10, 10)",
          rotation: "random(-5, 5)",
          duration: "random(2, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.1
        })

        gsap.fromTo(
          ".hero-subtitle-card",
          { opacity: 0, y: 50, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 1, delay: 0.3, ease: "back.out(1.7)" },
        )

        gsap.fromTo(
          ".hero-buttons",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.8, delay: 0.6, ease: "back.out(1.7)" },
        )

        // Simple scroll animations
        gsap.utils.toArray(".fade-in").forEach((element: any, index) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          )
        })
      }
    }

    loadGSAP()
  }, [])

  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "TensorFlow",
    "PyTorch",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Docker",
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "Computer Vision",
    "GraphQL",
    "Redis",
    "Kubernetes",
    "CI/CD",
  ]

  const projects = [
    {
      title: "AI-Powered Analytics Dashboard",
      description: "Built a real-time analytics platform using React, Node.js, and TensorFlow for predictive insights.",
      tech: ["React", "Node.js", "TensorFlow", "MongoDB"],
      link: "#",
    },
    {
      title: "Neural Network Visualizer",
      description: "Interactive web app for visualizing neural network architectures and training processes.",
      tech: ["Three.js", "Python", "WebGL", "FastAPI"],
      link: "#",
    },
    {
      title: "Smart Trading Bot",
      description: "Automated trading system using machine learning algorithms for cryptocurrency markets.",
      tech: ["Python", "Pandas", "Scikit-learn", "PostgreSQL"],
      link: "#",
    },
    {
      title: "Real-time Chat Platform",
      description: "Full-stack chat application with WebSocket integration and AI-powered moderation.",
      tech: ["Next.js", "Socket.io", "Redis", "OpenAI API"],
      link: "#",
    },
  ]

  // Function to split text into individual letters with spans
  const splitTextIntoLetters = (text: string, className: string = "") => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className={`letter inline-block ${className}`}
        style={{ display: 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Floating Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900/70 backdrop-blur-md border border-cyan-500/30 rounded-full px-6 py-3 shadow-lg shadow-cyan-500/20">
        <div className="flex items-center space-x-6">
          <div className="text-lg font-bold font-gaming bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            MJ
          </div>
          <div className="hidden md:flex space-x-6">
            {["About", "Skills", "Projects", "Contact"].map((item) => (
              <button
                key={item}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-gaming text-sm tracking-wider px-3 py-1 rounded-full hover:bg-cyan-500/10"
                onClick={() => {
                  const element = document.getElementById(item.toLowerCase())
                  element?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Background */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative px-4 pt-20">
        <ThreeBackground />
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <div className="hero-title mb-6">
            <h1 className="text-6xl md:text-9xl font-black mb-4 font-gaming tracking-wider">
              <div className="mb-4">
                {splitTextIntoLetters("Muhammad", "text-white shine-text")}
              </div>
              <div>
                {splitTextIntoLetters("JAWAD","text-white shine-text")}
              </div>
            </h1>
          </div>

          {/* Animated Motivational Quote */}
          <div className="mb-8 h-16 flex items-center justify-center">
            <p 
              key={currentQuote}
              className="text-lg md:text-xl text-gray-300 font-cyber italic animate-fade-in-up max-w-2xl"
            >
              "{motivationalQuotes[currentQuote]}"
            </p>
          </div>

          <div className="hero-subtitle-card mb-8">
            <Card className="retro-card bg-gray-900/70 border-cyan-500/40 backdrop-blur-md max-w-2xl mx-auto">
              <CardContent className="p-6">
                <p className="text-xl md:text-2xl text-cyan-300 mb-2 font-cyber">AI Engineer & Full Stack Developer</p>
                <p className="text-lg text-purple-400 font-cyber">
                  Age: 22 | Building the Future with Code & Intelligence
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-gaming font-bold px-8 py-3 text-lg border-2 border-cyan-400 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
              onClick={() => {
                const element = document.getElementById('projects')
                element?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              VIEW PROJECTS
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 font-gaming font-bold px-8 py-3 text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 bg-transparent"
              onClick={() => {
                const element = document.getElementById('contact')
                element?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              CONTACT ME
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-teal-900/20"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center font-gaming tracking-wider fade-in">
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              ABOUT ME
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <Card className="retro-card bg-gray-900/80 border-green-500/30 backdrop-blur-sm hover:border-green-400/50 hover:bg-gray-900/90 hover:scale-105 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 font-gaming text-green-400">DEVELOPER PROFILE</h3>
                  <div className="space-y-4 text-gray-300 font-cyber">
                    <p className="leading-relaxed">
                      <span className="text-green-400">&gt;</span> Passionate AI Engineer and Full Stack Developer with expertise in machine learning, deep learning,
                      and modern web technologies. I specialize in creating intelligent systems that solve real-world
                      problems.
                    </p>
                    <p className="leading-relaxed">
                      <span className="text-green-400">&gt;</span> My journey in tech started early, and at 22, I've already built numerous projects ranging from
                      neural networks to full-stack web applications. I love combining AI with beautiful user interfaces
                      to create exceptional user experiences.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center space-x-2 hover:text-purple-300 transition-colors duration-300">
                        <Brain className="w-5 h-5 text-purple-400" />
                        <span className="text-sm">AI Specialist</span>
                      </div>
                      <div className="flex items-center space-x-2 hover:text-cyan-300 transition-colors duration-300">
                        <Code className="w-5 h-5 text-cyan-400" />
                        <span className="text-sm">Full Stack Dev</span>
                      </div>
                      <div className="flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-300">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <span className="text-sm">Innovation Focused</span>
                      </div>
                      <div className="flex items-center space-x-2 hover:text-green-300 transition-colors duration-300">
                        <ExternalLink className="w-5 h-5 text-green-400" />
                        <span className="text-sm">Open Source</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="fade-in">
              <div className="relative">
                <div className="w-full max-w-md mx-auto aspect-square relative hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-2xl"></div>
                  <div className="absolute inset-2 bg-gray-900/50 rounded-2xl overflow-hidden backdrop-blur-sm">
                    <img 
                      src="/profile-picture.jpg" 
                      alt="Ahmad Farhad" 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-emerald-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-indigo-900/20"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center font-gaming tracking-wider fade-in">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              TECH STACK
            </span>
          </h2>

          {/* Skill Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            {skills.map((skill, index) => (
              <Card
                key={skill}
                className="fade-in retro-card bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 backdrop-blur-sm hover:border-purple-400 hover:scale-105 transition-all duration-300"
              >
                <CardContent className="p-4 text-center">
                  <span className="text-sm font-gaming text-purple-300">{skill}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Skill Progress Bars */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="fade-in retro-card bg-gray-900/80 border-purple-500/30 backdrop-blur-sm hover:border-purple-400/50 hover:bg-gray-900/90 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 font-gaming text-purple-400">FRONTEND MASTERY</h3>
                <div className="space-y-4">
                  {['React', 'Next.js', 'TypeScript', 'Three.js'].map((skill, index) => (
                    <div key={skill} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-cyber text-purple-300">{skill}</span>
                        <span className="text-sm font-cyber text-purple-400">95%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          style={{ width: '95%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="fade-in retro-card bg-gray-900/80 border-cyan-500/30 backdrop-blur-sm hover:border-cyan-400/50 hover:bg-gray-900/90 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 font-gaming text-cyan-400">AI & BACKEND</h3>
                <div className="space-y-4">
                  {['Python', 'TensorFlow', 'Node.js', 'PostgreSQL'].map((skill, index) => (
                    <div key={skill} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-cyber text-cyan-300">{skill}</span>
                        <span className="text-sm font-cyber text-cyan-400">90%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          style={{ width: '90%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-slate-900/20"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center font-gaming tracking-wider fade-in">
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              PROJECTS
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.title}
                className="fade-in retro-card bg-gray-900/80 border-blue-500/30 backdrop-blur-sm hover:border-blue-400 hover:scale-105 transition-all duration-300 group"
              >
                <CardContent className="p-6 relative overflow-hidden">
                  {/* Project Number */}
                  <div className="absolute top-4 right-4 text-6xl font-gaming text-blue-500/20 group-hover:text-blue-400/30 transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  {/* Animated Border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-3 font-gaming text-blue-400">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 font-cyber text-sm leading-relaxed">
                      <span className="text-blue-400">&gt;</span> {project.description}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-xs border-blue-500/50 text-blue-400 font-cyber hover:bg-blue-500/20 transition-all duration-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Project Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                      <div className="bg-blue-900/20 rounded-lg p-2">
                        <div className="text-blue-400 font-gaming text-lg">95%</div>
                        <div className="text-xs text-gray-400 font-cyber">Complete</div>
                      </div>
                      <div className="bg-indigo-900/20 rounded-lg p-2">
                        <div className="text-indigo-400 font-gaming text-lg">4.8★</div>
                        <div className="text-xs text-gray-400 font-cyber">Rating</div>
                      </div>
                      <div className="bg-slate-900/20 rounded-lg p-2">
                        <div className="text-slate-400 font-gaming text-lg">2025</div>
                        <div className="text-xs text-gray-400 font-cyber">Year</div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-500 text-blue-400 hover:bg-blue-500/10 font-gaming bg-transparent flex-1"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        LIVE DEMO
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 font-gaming bg-transparent flex-1"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        CODE
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Featured Project Showcase */}
          <div className="mt-16">
            <Card className="fade-in retro-card bg-gray-900/80 border-blue-500/30 backdrop-blur-sm hover:border-blue-400/50 hover:bg-gray-900/90 hover:scale-105 transition-all duration-300">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 font-gaming text-blue-400">
                      FEATURED PROJECT
                    </h3>
                    <h4 className="text-xl font-gaming text-blue-400 mb-4">AI-Powered Portfolio Generator</h4>
                    <p className="text-gray-300 font-cyber mb-6 leading-relaxed">
                      <span className="text-blue-400">&gt;</span> An intelligent system that automatically generates 
                      personalized portfolio websites using AI. Built with Next.js, OpenAI API, and advanced 
                      machine learning algorithms for content generation and design optimization.
                    </p>
                    <div className="flex gap-4">
                      <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-gaming">
                        EXPLORE PROJECT
                      </Button>
                      <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10 font-gaming">
                        CASE STUDY
                      </Button>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-lg overflow-hidden border border-blue-500/30 hover:scale-105 transition-transform duration-300">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-4xl font-gaming text-blue-400">
                          AI DEMO
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-cyan-900/20 to-teal-900/20"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center font-gaming tracking-wider fade-in">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              GET IN TOUCH
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Information Panel */}
            <Card className="fade-in retro-card bg-gray-900/80 border-cyan-500/30 backdrop-blur-sm hover:border-cyan-400/50 hover:bg-gray-900/90 hover:scale-105 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 font-gaming text-cyan-400">COMMUNICATION CHANNELS</h3>
                
                {/* Contact Methods */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-cyan-900/20 rounded-lg border border-cyan-500/20 hover:border-cyan-400/40 hover:scale-105 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-gaming text-cyan-400 text-sm">EMAIL</div>
                      <div className="font-cyber text-gray-300">muhammad.jawad@example.com</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-900/20 rounded-lg border border-gray-500/20 hover:border-gray-400/40 hover:scale-105 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-700 rounded-lg flex items-center justify-center">
                      <Github className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-gaming text-gray-400 text-sm">GITHUB</div>
                      <div className="font-cyber text-gray-300">github.com/muhammadjawad</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-cyan-900/20 rounded-lg border border-cyan-500/20 hover:border-cyan-400/40 hover:scale-105 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Linkedin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-gaming text-cyan-400 text-sm">LINKEDIN</div>
                      <div className="font-cyber text-gray-300">linkedin.com/in/muhammadjawad</div>
                    </div>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="mt-8 p-4 bg-green-900/20 rounded-lg border border-green-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="font-gaming text-green-400 text-sm">AVAILABLE FOR PROJECTS</span>
                  </div>
                  <div className="flex items-center space-x-3 mt-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <span className="font-gaming text-cyan-400 text-sm">RESPONSE TIME: 24H</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Contact Form */}
            <Card className="fade-in retro-card bg-gray-900/80 border-blue-500/30 backdrop-blur-sm hover:border-blue-400/50 hover:bg-gray-900/90 hover:scale-105 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 font-gaming text-cyan-400">SEND MESSAGE</h3>
                
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="font-gaming text-cyan-400 text-sm">NAME</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-cyber focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                      placeholder="Enter your name..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-gaming text-cyan-400 text-sm">EMAIL</label>
                    <input 
                      type="email" 
                      className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-cyber focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-gaming text-cyan-400 text-sm">PROJECT TYPE</label>
                    <select className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-cyber focus:border-cyan-400 focus:outline-none transition-colors duration-300">
                      <option>AI/Machine Learning</option>
                      <option>Full Stack Development</option>
                      <option>Frontend Development</option>
                      <option>Consultation</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-gaming text-cyan-400 text-sm">MESSAGE</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white font-cyber focus:border-cyan-400 focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Describe your project or inquiry..."
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-gaming font-bold py-4 text-lg border-2 border-cyan-400 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
                  >
                    TRANSMIT MESSAGE
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Quick Action Buttons */}
          <div className="mt-16 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-gaming font-bold px-8 py-3 text-lg border-2 border-blue-400 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
              >
                <Mail className="w-5 h-5 mr-2" />
                QUICK EMAIL
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-500 text-gray-300 hover:bg-gray-500/10 font-gaming font-bold px-8 py-3 text-lg shadow-lg shadow-gray-500/25 hover:shadow-gray-500/40 hover:scale-105 transition-all duration-300 bg-transparent"
              >
                <Github className="w-5 h-5 mr-2" />
                VIEW CODE
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-gaming font-bold px-8 py-3 text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300 bg-transparent"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                CONNECT
              </Button>
            </div>
          </div>

          {/* Response Time Indicator */}
          <div className="mt-12 text-center">
            <Card className="inline-block retro-card bg-gray-900/60 border-green-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                  <span className="font-cyber text-green-400">
                    Average response time: <span className="font-gaming">24 hours</span>
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <p className="text-gray-500 font-cyber">© 2025 Ahmad Farhad. Built with Next.js, Three.js & GSAP</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shine {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .shine-text {
          position: relative;
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #ffffff 40%,
            #e0e7ff 50%,
            #c7d2fe 60%,
            #ffffff 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 3s linear infinite;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }
        
        .shine-text::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shine-overlay 3s linear infinite;
        }
        
        @keyframes shine-overlay {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  )
}