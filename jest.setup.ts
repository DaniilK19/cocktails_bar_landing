import '@testing-library/jest-dom'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
} as any

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = require('react')
  return {
    ...jest.requireActual('framer-motion'),
    motion: {
      div: ({ children, ...props }: any) => React.createElement('div', props, children),
      section: ({ children, ...props }: any) => React.createElement('section', props, children),
      button: ({ children, ...props }: any) => React.createElement('button', props, children),
      nav: ({ children, ...props }: any) => React.createElement('nav', props, children),
      header: ({ children, ...props }: any) => React.createElement('header', props, children),
      footer: ({ children, ...props }: any) => React.createElement('footer', props, children),
      h1: ({ children, ...props }: any) => React.createElement('h1', props, children),
      h2: ({ children, ...props }: any) => React.createElement('h2', props, children),
      h3: ({ children, ...props }: any) => React.createElement('h3', props, children),
      p: ({ children, ...props }: any) => React.createElement('p', props, children),
      a: ({ children, ...props }: any) => React.createElement('a', props, children),
      img: ({ children, ...props }: any) => React.createElement('img', props),
    },
    AnimatePresence: ({ children }: any) => children,
    useAnimation: () => ({
      start: jest.fn(),
      stop: jest.fn(),
      set: jest.fn(),
    }),
    useInView: () => true,
  }
})

// Mock GSAP
jest.mock('gsap', () => ({
  gsap: {
    to: jest.fn(),
    from: jest.fn(),
    fromTo: jest.fn(),
    set: jest.fn(),
    timeline: jest.fn(() => ({
      to: jest.fn(),
      from: jest.fn(),
      fromTo: jest.fn(),
      add: jest.fn(),
      play: jest.fn(),
      pause: jest.fn(),
      reverse: jest.fn(),
      restart: jest.fn(),
      kill: jest.fn(),
    })),
    registerPlugin: jest.fn(),
    utils: {
      toArray: jest.fn((arr) => Array.isArray(arr) ? arr : [arr]),
    },
  },
  ScrollTrigger: {
    create: jest.fn(),
    refresh: jest.fn(),
    update: jest.fn(),
    getAll: jest.fn(() => []),
    kill: jest.fn(),
  },
}))

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: any) => children,
  useTheme: () => ({
    theme: 'dark',
    setTheme: jest.fn(),
    themes: ['light', 'dark'],
  }),
}))

// Suppress console errors during tests (optional)
const originalError = console.error
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
        args[0].includes('Not implemented: HTMLFormElement.prototype.submit'))
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
