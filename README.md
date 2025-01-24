# API Manager GUI

GUI for API Manager, an API Gateway manager for docker swarm, based on traefik and gateway images

## Environment variables

- PUBLIC_URL : base url for the service to serve the page
- API_BASE: base url for the API REST providing the controlling API-manager
- API_AUTH: url for entrypoint providing Login that accept { credentials: {login, password}} and returns a JWT token as {token}
- BASE_REALURL: base url of the published service uri for the API managed by API Manager (the API is published with this baseurl followed by path defined by the api group name: it is expected to end with /, i.e. https://mapi.yourdoma.in/)

## Easy build

> npm i --legacy-peer-deps

for install, then:

> npm run start

for starting dev server provided by webpack