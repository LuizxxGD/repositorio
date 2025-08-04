// Smooth scrolling and animations
document.addEventListener("DOMContentLoaded", () => {
  // Initialize animations
  initializeAnimations()

  // Add scroll event listeners
  window.addEventListener("scroll", handleScroll)

  // Add click event listeners
  addEventListeners()
})

// Initialize animations on page load
function initializeAnimations() {
  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target
        const animationType = element.getAttribute("data-aos")

        switch (animationType) {
          case "slide-left":
            element.style.animation = "slideInLeft 1s ease-out forwards"
            break
          case "slide-right":
            element.style.animation = "slideInRight 1s ease-out forwards"
            break
          case "fade-up":
            element.style.animation = "fadeInUpStagger 1s ease-out forwards"
            break
          default:
            element.style.animation = "fadeInUp 1s ease-out forwards"
        }

        observer.unobserve(element)
      }
    })
  }, observerOptions)

  // Observe all elements with data-aos attribute
  const animatedElements = document.querySelectorAll("[data-aos]")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    observer.observe(el)
  })
}

// Handle scroll events
function handleScroll() {
  const scrolled = window.pageYOffset
  const parallax = document.querySelector(".hero-background")

  if (parallax) {
    const speed = scrolled * 0.5
    parallax.style.transform = `translateY(${speed}px)`
  }

  // Add scroll-based animations for orbs
  const orbs = document.querySelectorAll(".orb")
  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.3
    orb.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
  })
}

// Add event listeners
function addEventListeners() {
  // CTA button clicks
  const ctaButtons = document.querySelectorAll(".cta-button")
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add click animation
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1.05)"
      }, 150)

      // Add ripple effect
      createRipple(e, this)
    })
  })

  // Card hover effects
  const cards = document.querySelectorAll(".module-card, .bonus-card, .info-card")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.02) translateY(-5px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) translateY(0)"
    })
  })

  // Bonus icon rotation on hover
  const bonusCards = document.querySelectorAll(".bonus-card")
  bonusCards.forEach((card) => {
    const icon = card.querySelector(".bonus-icon")

    card.addEventListener("mouseenter", () => {
      icon.style.transform = "scale(1.1) rotate(10deg)"
    })

    card.addEventListener("mouseleave", () => {
      icon.style.transform = "scale(1) rotate(0deg)"
    })
  })
}

// Create ripple effect on button click
function createRipple(event, button) {
  const circle = document.createElement("span")
  const diameter = Math.max(button.clientWidth, button.clientHeight)
  const radius = diameter / 2

  const rect = button.getBoundingClientRect()
  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${event.clientX - rect.left - radius}px`
  circle.style.top = `${event.clientY - rect.top - radius}px`
  circle.classList.add("ripple")

  // Add ripple styles
  circle.style.position = "absolute"
  circle.style.borderRadius = "50%"
  circle.style.background = "rgba(255, 255, 255, 0.3)"
  circle.style.transform = "scale(0)"
  circle.style.animation = "ripple 0.6s linear"
  circle.style.pointerEvents = "none"

  const ripple = button.getElementsByClassName("ripple")[0]
  if (ripple) {
    ripple.remove()
  }

  button.style.position = "relative"
  button.style.overflow = "hidden"
  button.appendChild(circle)

  // Remove ripple after animation
  setTimeout(() => {
    circle.remove()
  }, 600)
}

// Smooth scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Add CSS for ripple animation
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply throttling to scroll handler
window.addEventListener("scroll", throttle(handleScroll, 16))

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease-in-out"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

// Add mobile touch interactions
if ("ontouchstart" in window) {
  const cards = document.querySelectorAll(".module-card, .bonus-card")
  cards.forEach((card) => {
    card.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.98)"
    })

    card.addEventListener("touchend", function () {
      this.style.transform = "scale(1)"
    })
  })
}
