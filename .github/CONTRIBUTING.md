# Contributing to Maison Cocktail

Thank you for your interest in contributing! This document provides guidelines and information about our development workflow.

## 🚀 CI/CD Pipeline

Our project uses GitHub Actions for continuous integration and deployment. The CI pipeline runs automatically on:
- Push to `main` branch
- Pull requests to `main` branch

### Pipeline Stages

#### 1. **Code Quality** ✨
- **ESLint**: Checks code style and potential errors
- **TypeScript**: Type checking across the codebase

#### 2. **Testing** 🧪
- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright (Chrome, Firefox, Safari, Mobile)
- Test results are uploaded as artifacts

#### 3. **Build** 🏗️
- **Next.js Build**: Production build verification
- Build artifacts are saved for deployment

### Running Checks Locally

Before pushing your changes, run these commands to ensure they'll pass CI:

```bash
# Install dependencies
npm ci

# Lint code
npm run lint

# Type check
npx tsc --noEmit

# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Build project
npm run build
```

## 📋 Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, typed code
   - Add tests for new features
   - Update documentation if needed

3. **Test locally**
   ```bash
   npm run dev        # Start dev server
   npm run test:all   # Run all tests
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add your feature description"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   - Create a Pull Request on GitHub
   - CI will run automatically
   - Wait for all checks to pass ✅

## 🎯 Code Standards

### TypeScript
- Use TypeScript for all new files
- Define proper types/interfaces
- Avoid `any` type (except in test files)

### React
- Use functional components with hooks
- Implement proper error boundaries
- Follow Next.js 15 best practices

### Styling
- Use Tailwind CSS utility classes
- Follow existing design system (aristocrat colors)
- Ensure responsive design (mobile-first)

### Testing
- Write unit tests for utilities and components
- Add E2E tests for critical user flows
- Maintain minimum 70% code coverage

## 🐛 Bug Reports

When reporting bugs, please include:
- Description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/device information

## 💡 Feature Requests

For feature requests:
- Explain the use case
- Describe the expected behavior
- Consider implementation complexity
- Check if it aligns with project goals

## 📞 Questions?

If you have questions about contributing, feel free to:
- Open a GitHub issue
- Check existing documentation
- Review closed PRs for examples

---

Thank you for contributing to Maison Cocktail! 🍸
