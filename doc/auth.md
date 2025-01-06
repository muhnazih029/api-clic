# Auth API Spec

## Register User

Endpoint : POST /api/auth/register

Request Body :

```json
{
  "nim": "5312623762",
  "username": "blly // optional",
  "password": "rahasia",
  "fullname": "Ahmad Hamid Balya"
}
```

Response Body (Success, 201) :

```json
{
  "message": "created",
  "data": {
    "at": "JWT token 15 menit",
    "rt": "JWT token 7 hari"
  }
}
```

Response Body (Exist Failed, 400) :

```json
{
  "errors": true,
  "message": "The credential is  already registered"
}
```

Response Body (Validation Failed, 400) :

```json
{
  "errors": true,
  "message": "Validation error",
  "data": [zodError]
}
```

## Login User

Endpoint : POST /api/auth/login

Request Body :

```json
{
  "identifier": "username or nim",
  "password": "rahasia"
}
```

Response Body (Success, 200) :

```json
{
  "message": "OK",
  "data": {
    "at": "JWT token 15 menit",
    "rt": "JWT token 7 hari"
  }
}
```

Response Body (Validation Failed, 400) :

```json
{
  "errors": true,
  "message": "Validation error",
  "data": "Your request is invalid"
}
```

Response Body (Found Failed, 404) :

```json
{
  "errors": true,
  "message": "The credential is not registered"
}
```

Response Body (Match Failed, 400) :

```json
{
  "errors": true,
  "message": "The credential is invalid"
}
```

## Refresh User

Endpoint : GET /api/auth/refresh

Headers :
Authentication : "Bearer rt"

Response Body (Success, 200) :

```json
{
  "message": "OK",
  "data": {
    "at": "JWT token 15 menit",
    "rt": "JWT token 7 hari"
  }
}
```

Response Body ( Failed, 401) :

```json
{
  "errors": true,
  "message": "The credential is invalid"
}
```

## Logout User

Endpoint : DELETE /api/auth

Headers :
Authentication : "Bearer at"

Response Body (Success, 200) :

```json
{
  "message": "OK"
  "data": true
}
```

Response Body (Authorization Failed, 401) :

```json
{
  "errors": true,
  "message": "The credential is invalid"
}
```
