# Reflection - Lab 5

## 4. Why is app/tasks/page.tsx a Server Component but TaskBoard a Client Component?

`page.tsx` only fetches the tasks, so it can run on the server. `TaskBoard` uses `useState` and handles clicks, so it needs to run in the browser.

## 5. What did view source show on /tasks compared with Lab 4?

On `/tasks` the task titles were in the HTML because the server built the page. In Lab 4 the HTML was empty because the browser built the page with JavaScript.

## 6. Which two URL rules does /Tasks/Project_Plan break?

It uses capital letters and an underscore. I would rename it to `/tasks/project-plan`.
