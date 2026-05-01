/**
 * GDA Portfolio Script
 * Handles: Scroll Reveal, Mobile Menu, Sticky Nav, Form Validation, Background Effects
 */

document.addEventListener('DOMContentLoaded', () => {
    initParticleNetwork();
    initScrollReveal();
    initMobileMenu();
    initStickyNav();
    initBackgroundEffect();
});

// Particle Network Background
function initParticleNetwork() {
    const canvas = document.getElementById('particle-network');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particle_count = Math.floor(canvas.width / 100);
    const connection_distance = 150;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.4;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(96, 165, 250, ${this.opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particle_count; i++) {
        particles.push(new Particle());
    }
    
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connection_distance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance / connection_distance)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        drawConnections();
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => observer.observe(reveal));
}

// Mobile Menu Toggle with smooth animations
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('is-active');
        
        const bars = menuToggle.querySelectorAll('.bar');
        bars[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(8px, 8px)' : 'none';
        bars[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
        bars[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(7px, -7px)' : 'none';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('is-active');
            const bars = menuToggle.querySelectorAll('.bar');
            bars.forEach(bar => bar.style.transform = 'none');
            bars[1].style.opacity = '1';
        });
    });
}

// Sticky Navbar & Active Section Highlighting
function initStickyNav() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Subtle Background Mouse Follow Effect
function initBackgroundEffect() {
    const bg = document.getElementById('bg-glow');
    
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        bg.style.background = `radial-gradient(circle at ${x}% ${y}%, #1e293b 0%, transparent 50%)`;
    });

    window.addEventListener('mouseleave', () => {
        bg.style.background = 'radial-gradient(circle at 50% 50%, #1e293b 0%, transparent 50%)';
    });
}