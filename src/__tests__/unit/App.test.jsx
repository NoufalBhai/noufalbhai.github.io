import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../../App'

describe('App Component - Unit Tests', () => {
  it('should render the app without crashing', () => {
    render(<App />)
    const title = document.querySelector('.gradient-text')
    expect(title).toBeInTheDocument()
    expect(title.textContent).toMatch(/Codesh/i)
  })

  it('should display the main title "Codesh"', () => {
    render(<App />)
    const title = document.querySelector('.gradient-text')
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('gradient-text')
    expect(title.textContent).toBe('Codesh')
  })

  it('should display the tagline "Code Your Skill Up"', () => {
    render(<App />)
    expect(screen.getByText(/Code Your Skill Up/i)).toBeInTheDocument()
  })

  it('should render the avatar image', () => {
    render(<App />)
    const avatar = screen.getByAltText(/Avatar/i)
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveClass('avatar')
  })

  it('should render primary and secondary buttons', () => {
    render(<App />)
    expect(screen.getByText(/View Projects/i)).toBeInTheDocument()
    expect(screen.getByText(/Get in Touch/i)).toBeInTheDocument()
  })

  it('should render the Tech Stack section', () => {
    render(<App />)
    expect(screen.getByText(/Tech Stack/i)).toBeInTheDocument()
  })

  it('should render all 6 skill cards', () => {
    render(<App />)
    expect(screen.getByText(/React/i)).toBeInTheDocument()
    expect(screen.getByText(/JavaScript/i)).toBeInTheDocument()
    expect(screen.getByText(/TypeScript/i)).toBeInTheDocument()
    expect(screen.getByText(/Node\.js/i)).toBeInTheDocument()
    expect(screen.getByText(/CSS3/i)).toBeInTheDocument()
    expect(screen.getByText(/Git/i)).toBeInTheDocument()
  })

  it('should render stats section with 4 stat cards', () => {
    render(<App />)
    expect(screen.getByText(/50\+/i)).toBeInTheDocument()
    expect(screen.getByText(/Projects Completed/i)).toBeInTheDocument()
    expect(screen.getByText(/100K\+/i)).toBeInTheDocument()
    expect(screen.getByText(/Lines of Code/i)).toBeInTheDocument()
    expect(screen.getByText(/3\+/i)).toBeInTheDocument()
    expect(screen.getByText(/Years Experience/i)).toBeInTheDocument()
    expect(screen.getByText(/100%/i)).toBeInTheDocument()
    expect(screen.getByText(/Client Satisfaction/i)).toBeInTheDocument()
  })

  it('should render footer with copyright text', () => {
    render(<App />)
    expect(screen.getByText(/Made with 💜 by Codesh/i)).toBeInTheDocument()
  })

  it('should render social media links', () => {
    render(<App />)
    const socialLinks = screen.getAllByLabelText(/GitHub|LinkedIn|Twitter/i)
    expect(socialLinks).toHaveLength(3)
  })
})
