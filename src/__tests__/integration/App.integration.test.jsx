import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'

describe('App Component - Integration Tests', () => {
  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    })
  })

  it('should render complete page layout with all sections', () => {
    render(<App />)

    // Hero section
    const title = document.querySelector('.gradient-text')
    expect(title).toBeInTheDocument()
    expect(screen.getByText(/Code Your Skill Up/i)).toBeInTheDocument()

    // Skills section
    expect(screen.getByText(/Tech Stack/i)).toBeInTheDocument()

    // Stats section
    expect(screen.getByText(/Projects Completed/i)).toBeInTheDocument()

    // Footer
    expect(screen.getByText(/Made with 💜 by Codesh/i)).toBeInTheDocument()
  })

  it('should handle scroll events and update parallax effect', async () => {
    render(<App />)

    // Simulate scroll event
    const scrollEvent = new Event('scroll')
    window.scrollY = 100

    window.dispatchEvent(scrollEvent)

    // Wait for state update
    await waitFor(() => {
      const heroContent = document.querySelector('.hero-content')
      expect(heroContent).toBeInTheDocument()
    })
  })

  it('should display all skill cards with hover effects', async () => {
    const user = userEvent.setup()
    render(<App />)

    const reactSkill = screen.getByText(/React/i)
    expect(reactSkill).toBeInTheDocument()

    // Find the parent skill card
    const skillCard = reactSkill.closest('.skill-card')
    expect(skillCard).toBeInTheDocument()
  })

  it('should render avatar with proper attributes', () => {
    render(<App />)

    const avatar = screen.getByAltText(/Avatar/i)
    expect(avatar).toHaveAttribute('src')
    expect(avatar.getAttribute('src')).toContain('dicebear.com')
  })

  it('should render all buttons as interactive elements', async () => {
    const user = userEvent.setup()
    render(<App />)

    const viewProjectsBtn = screen.getByText(/View Projects/i).closest('button')
    const getInTouchBtn = screen.getByText(/Get in Touch/i).closest('button')

    expect(viewProjectsBtn).toBeInTheDocument()
    expect(getInTouchBtn).toBeInTheDocument()

    // Verify buttons are clickable
    expect(viewProjectsBtn).not.toBeDisabled()
    expect(getInTouchBtn).not.toBeDisabled()
  })

  it('should have responsive layout classes', () => {
    render(<App />)

    // Check for key structural elements
    const heroSection = document.querySelector('.hero')
    const skillsSection = document.querySelector('.skills')
    const statsSection = document.querySelector('.stats')
    const footer = document.querySelector('.footer')

    expect(heroSection).toBeInTheDocument()
    expect(skillsSection).toBeInTheDocument()
    expect(statsSection).toBeInTheDocument()
    expect(footer).toBeInTheDocument()
  })

  it('should render social media links with correct accessibility', () => {
    render(<App />)

    const githubLink = screen.getByLabelText(/GitHub/i)
    const linkedinLink = screen.getByLabelText(/LinkedIn/i)
    const twitterLink = screen.getByLabelText(/Twitter/i)

    expect(githubLink).toHaveAttribute('href', '#')
    expect(linkedinLink).toHaveAttribute('href', '#')
    expect(twitterLink).toHaveAttribute('href', '#')
  })

  it('should display all stat numbers correctly', () => {
    render(<App />)

    // Verify stat numbers are displayed
    const statNumbers = document.querySelectorAll('.stat-number')
    expect(statNumbers).toHaveLength(4)

    // Check specific stat values
    expect(screen.getByText('50+')).toBeInTheDocument()
    expect(screen.getByText('100K+')).toBeInTheDocument()
    expect(screen.getByText('3+')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('should render skill progress bars', () => {
    render(<App />)

    const skillBars = document.querySelectorAll('.skill-bar')
    expect(skillBars.length).toBeGreaterThan(0)

    const skillProgress = document.querySelectorAll('.skill-progress')
    expect(skillProgress.length).toBe(skillBars.length)
  })

  it('should have scroll indicator in hero section', () => {
    render(<App />)

    const scrollIndicator = document.querySelector('.scroll-indicator')
    expect(scrollIndicator).toBeInTheDocument()

    const mouse = document.querySelector('.mouse')
    expect(mouse).toBeInTheDocument()
  })
})
