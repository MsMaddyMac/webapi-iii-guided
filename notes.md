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