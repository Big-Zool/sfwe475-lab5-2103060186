# Next.js Notes - Lab 5

## Strand 1

### Predictions

1. `app/tasks/page.tsx` will open at `/tasks`.
2. `/task` will show a 404 page because there is no `task` folder.

Both were right.

### Where did the console.log show?

In the terminal where `npm run dev` runs. The browser console also showed it, but with a "Server" label.

For `/tasks/1` the type was `string`. I think it showed there because the page runs on the server, not in the browser.

### lang="en"

The html tag has `lang="en"`. It tells screen readers which language to use, so they pronounce the words correctly.

### Link vs a

With `Link`, there was no new document request in the Network tab. The page changed without reloading.

With a plain `<a>`, there was a new document request and the whole page reloaded.

### Routes and URL rules

| Route | HTTPS | Short | Lowercase | Hyphens | Few query params |
|-------|-------|-------|-----------|---------|------------------|
| `/` | at deployment | yes | yes | yes | yes |
| `/tasks` | at deployment | yes | yes | yes | yes |
| `/tasks/[id]` | at deployment | yes | yes | yes | yes |

### Not found page

`/nope` returned status 404, so it is a real 404 and not a soft 404.

### Nested layout

Two layouts wrap `/tasks/1`: `app/layout.tsx` and `app/tasks/layout.tsx`. When I go from `/tasks` to `/tasks/1`, both stay in place and only the page changes.

## Strand 2

### The deliberate mistake

My prediction: it will break because `TaskBoard` uses `useState`.

The error:

```
Error: You're importing a module that depends on `useEffect` into a React Server Component module.
This API is only available in Client Components. To fix, mark the file (or its parent) with the
"use client" directive.
```

It means pages are Server Components by default, and hooks like `useState` and `useEffect` only work in Client Components. Adding `"use client"` to `TaskBoard.tsx` fixed it.

### Where does TasksPage run?

The log showed in the terminal, and `typeof window` was `undefined`. This means the Server Component runs on the server, because `window` only exists in the browser.

### View source

In Next.js, the task titles are in the HTML. In the Lab 4 Vite app, the HTML only has an empty `<div id="root">`. This is because Next.js builds the HTML on the server, while Vite builds it in the browser with JavaScript.

### Server or Client

| File | Server or Client? | Reason |
|------|-------------------|--------|
| `app/layout.tsx` | Server | It has no state or clicks. |
| `app/tasks/page.tsx` | Server | It fetches the tasks on the server. |
| `TaskBoard.tsx` | Client | It uses `useState`. |
| `TaskList.tsx` and `TaskCard.tsx` | Client | `TaskBoard` imports them. |
| `FilterBar.tsx` and `NewTaskForm.tsx` | Client | `TaskBoard` imports them. |

Only `TaskBoard.tsx` needed `"use client"` written in it. The others are client code because `TaskBoard` imports them.

### Loading

With a 1500ms delay, "Loading tasks..." showed while the nav stayed on the page. In Lab 4 the browser showed the loading message. Here the server sends it first. I set the delay back to 300.

### Error page

The error page and the Try again button both worked. In my version the prop is called `retry`, not `reset`.

An error file must be a Client Component because it catches errors in the browser, and the Try again button needs `onClick`.

## Strand 3

### Route table

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ◐ /tasks
└   /tasks/[id]
  └ ◐ /tasks/[id]

○  (Static)             prerendered as static content
◐  (Partial Prerender)  prerendered as static HTML with dynamic server-streamed content
```

`/tasks` was not fully static, it was Partial Prerender. If it were static and the tasks changed every minute, users would see old tasks until the next build. Data that changes often should be rendered on each request.

### Try it

- (a) Public page for one task: server. Search engines need to see it, and it is not private.
- (b) Drag-and-drop board: browser. It is private and very interactive.
- (c) About page: ahead of time. Search engines need to see it, and it rarely changes.

### Metadata

I found the `<title>`, the description and the canonical link in the page source.

### Link attributes

- `rel="sponsored"` tells search engines the link is paid.
- `rel="ugc"` tells search engines a user wrote the link.

### force-dynamic

My version rejected it with this error:

```
Route segment config "dynamic" is not compatible with `nextConfig.cacheComponents`. Please remove it.
```

The docs say to use `await connection()` instead, so I used that. The route table stayed the same (◐).

### generateMetadata

The detail page title now uses the task title, for example "Read Chapter 4 | Task Board".

### /tasks vs /tasks-csr

In view source, `/tasks` has the task titles but `/tasks-csr` only has "Loading tasks...".

Lighthouse (dev server): `/tasks` got 53 performance and 100 SEO. `/tasks-csr` got 84 performance and 100 SEO.

`/tasks-csr` was faster here, but it is a smaller page. For a public page I would choose `/tasks`, because the content is already in the HTML. Search engines can read it without running JavaScript. With `/tasks-csr`, a search engine might only see "Loading tasks...". I deleted `/tasks-csr` after the test.
