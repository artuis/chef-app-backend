# chef-app-backend

All API routes and connections to MongoDB Atlas to be handled here

## Routes

All routes will have a prefix of ```{API Server URL}/api/``` where the API Server URL is ```https://fast-waters-05843.herokuapp.com``` or ```localhost:{PORT}``` if hosted locally.

### Chef

```
{API Server URL}/api/chef/
```
On GET, will return all chefs in the database.

On POST, will create a new chef inside the database depending on request body. A JWT is returned on successful creation, and is required to access a number of routes. Please refer to the [Chef Schema](models/chef.js) to see the exact names for each field and the required ones.
```
{API Server URL}/api/chef/cuisine/:id
```
On GET, will return a list of chefs which have the cuisine in their profile. The parameter ```:id``` is a cuisine's MongoDB ObjectId.
```

{API Server URL}/api/chef/:id
```
On GET, finds a specific chef by their MongoDB ObjectId
```
{API Server URL}/api/chef/username/:username
```
On GET, finds a specific chef by their username
```
{API Server URL}/api/chef/login
```
On POST, checks database for existing user login credentials. A JWT is returned on successful log-in, and is required to access a number of routes.
```
{API Server URL}/api/chef/:id/photos
```
On GET, will return all photos associated with the ```:id``` parameter

#### Chef routes which require JWT:
```
{API Server URL}/api/chef/profile
```
On GET, will access the current logged in user's profile depending JWT.

#### Chef's cuisine modification
```
{API Server URL}/api/chef/addcuisine/:id
```
On PUT, will add a cuisine depending on ```:id```, which is the MongoDB ObjectId associated with the cuisine.
```
{API Server URL}/api/chef/removecuisine/:id
```
On PUT, will remove a cuisine depending on ```:id```, which is the MongoDB ObjectId associated with the cuisine.

### Photo Routes
```
{API Server URL}/api/photo
```
On GET, will send all photos in database

ON POST, will create new references to the photo in database. Please see [Photo Schema](models/photo.js) to see required request fields. Make sure to attach JWT in header.
```
{API Server URL}/api/photo/:id
```
On GET, will return the details of the photo depending on the ```:id``` parameter.

#### BOTH ROUTES BELOW REQUIRES JWT

On DELETE, checks if JWT user matches photo ChefId, and will delete photo and references from database if passed.

On PUT, checks if JWT user matches photo ChefId, and will update photo details in database if passed.

### Cuisine Routes
```
{API Server URL}/api/cuisine
```
On GET, will return all cuisine names and ObjectIds
```
{API Server URL}/api/cuisine/:id
```
On GET, will return cuisine depending on ```:id``` parameter

### Specialty Routes
```
{API Server URL}/api/specialty
```
On GET, will return all specialty names and ObjectIds
```
{API Server URL}/api/specialty/:id
```
On GET, will return specialty depending on ```:id``` parameter

### Service Type Routes
```
{API Server URL}/api/servicetype
```
On GET, will return all specialty names and ObjectIds
```
{API Server URL}/api/servicetype/:id
```
On GET, will return specialty depending on ```:id``` parameter