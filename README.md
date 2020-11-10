# ip-geolocation
Lookup latitude and longitude for a given IPv4 address

## Backend
Small Express app with a single endpoint for searching for geolocation information based on a provided IPv4 address

The lookup uses the free GeoLite2-City.mmdb database for determining the latitude and longitude.

## Frontend
React app with some simple components to input the IPv4 address, validate the format, submit the API request to the server, and display the results.

Any errors in the submission, either from frontend validation of the format or errors from the API server will be displayed on submit.

## Testing
Tests can be run in the `frontend` folder by running `yarn test`.
