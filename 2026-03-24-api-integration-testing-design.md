# API Integration Testing — Design Document
**Date:** 2026-03-24
**Author:** Ricardo
**Status:** Draft

---

## Goal

Build a structured, growing GitHub repository for practising API integration testing. Start with Playwright (TypeScript), then re-implement using Jest + Axios. C# implementation to follow at a later stage.

---

## Repository Structure

```
/api-integration-tests
  /playwright-tests
    /jsonplaceholder
    /tmdb
    package.json
    playwright.config.ts
    tsconfig.json
  /jest-tests               ← added in Phase 3
    /jsonplaceholder
    /tmdb
    package.json
    jest.config.ts
    tsconfig.json
  README.md
```

Each folder (`playwright-tests`, `jest-tests`) is fully self-contained with its own dependencies and config. No conflicts between them.

---

## APIs

### JSONPlaceholder
- Base URL: `https://jsonplaceholder.typicode.com`
- Auth: None
- Operations: GET, POST, PUT, PATCH, DELETE
- Good for: Learning CRUD patterns, status code assertions, response shape validation, negative testing

### TMDB (The Movie Database)
- Base URL: `https://api.themoviedb.org/3`
- Auth: API key (free account required at themoviedb.org)
- Operations: Primarily GET, some write operations
- Good for: Auth patterns, query parameters, chaining requests, real-world response structures

---

## Phases

### Phase 1 — Playwright Foundation (JSONPlaceholder) ✅ DONE
- Set up the `playwright-tests` project — DONE
- Write GET tests — posts, users, comments, todos — DONE
- Assert on: status codes, response body shape, required fields, response time — DONE
- Write negative tests — invalid IDs, non-existent resources (404s) — DONE
- Organise tests into logical suites per resource — DONE

### Phase 2 — Playwright + Auth (TMDB)
- Add TMDB API key management (environment variables)
- Write GET tests — movies, search, genres, trending
- Test auth failure scenarios — missing key, invalid key
- Test query parameter variations — pagination, filters
- Practice request chaining — search for a movie, use its ID to fetch details

### Phase 3 — Re-implement with Jest + Axios (JSONPlaceholder + TMDB)
- Set up the `jest-tests` project alongside `playwright-tests`
- Re-write all Playwright tests using Jest + Axios
- Compare approaches — note what feels different, what is easier/harder
- Same test coverage, different tooling

### Phase 4 — Integration Patterns (Both tools)
- Request chaining and data passing between tests
- Test data setup and teardown
- Grouping and organising large test suites
- GitHub Actions — run tests automatically on every push

### Phase 5 — C# Re-implementation (Later stage)
- Port the full test suite to C# using a suitable framework (e.g. RestSharp + NUnit or xUnit)
- Mirror the same folder structure and test coverage

---

## Key Concepts to Learn Per Phase

| Phase | Concepts |
|---|---|
| 1 | GET requests, status assertions, body assertions, 404 handling |
| 2 | API key auth, env vars, query params, request chaining |
| 3 | New tooling setup, Axios interceptors, Jest matchers |
| 4 | Test organisation, CI/CD, setup/teardown |
| 5 | C# HTTP clients, test frameworks, porting patterns |

---

## Success Criteria

- Each phase has a working, runnable test suite committed to GitHub
- Tests cover happy paths, edge cases, and error scenarios
- Auth is handled via environment variables (never hardcoded)
- CI runs on every push via GitHub Actions by Phase 4
- Repo serves as a portfolio piece demonstrating multi-tool, multi-language API testing skills

---

## Notes

- Build everything yourself — use this doc as a reference, not a recipe
- Reach out for code review and improvement feedback after completing each phase
- C# phase is intentionally deferred — master TypeScript patterns first
