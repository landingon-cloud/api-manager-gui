# API Manager GUI

GUI for API Manager, an API Gateway manager for docker swarm, based on traefik and gateway images

## Environment variables

- PUBLIC_URL : base url for the service to serve the page
- API_BASE: base url for the API REST providing the controlling API-manager
- API_AUTH: url for entrypoint providing Login that accept { credentials: {login, password}} and returns a JWT token as {token}
- BASE_REALURL: base url of the published service uri for the API managed by API Manager (the API is published with this baseurl followed by path defined by the api group name: it is expected to end with /, i.e. https://mapi.yourdoma.in/)

## Quick start

> npm i --legacy-peer-deps

for install, then:

> npm run start

for starting dev server provided by webpack

## Install

> npm i --legacy-peer-deps

then:

> npm run build

the package will be built in biuld/ folder, `index.bundle.js` and  `index.bundle.js.map`

## Error codes

For the specific purpose of the tool, special HTTP response code are used:

- 200: OK (used for regular GET/OPTIONS requests)
- 202: accepted (used for regular POST/PUT/PATCH response)
- 401: unauthorized (with JSON payload indicating error and auth schema expected: JWT OR http-auth schema)
- 420: client request error, with JSON payload, indicate that internal service refuse to serve
- 530: internal service is not available or not reachable
- 4xx or 2xx from internal service: only if so selected in the step definition and entrypoint passthrough setting

## TODO

- replace any call returning {data, error} with regular REST
