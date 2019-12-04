## Middleware

There are two types

- normal
- error handling

Can come from different sources

- third party: need to be installed separately
- custom: we write it
- built-in: included with express

We can use it: 

- globally: it will run on every request to any endpoint.
- locally: will only run when the specific endpoint is hit.

Middleware can:

- inspect the `request` and `response` objects
- make the changes to the `request` and `response` objects
- move the `request` or `response` object to the _next_ middleware in the queue
- stop the `request` and send back a `response` to the client

*** ORDER MATTERS! ***

Git Post-Lecture

To link local repository to remote repository on GitHub.

- create new **empty** repository on GitHub
- `git remote rm origin`
- `git remote add origin url to our new repository
- `git add .
- `git commit -m "commit message"`
- `git push -u origin master` // sets origin remote and master branch as default when pushing.

After using `-u` we can push using `git push`, no need for `origin master`

