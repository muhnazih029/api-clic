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
  "status": "created",
  "data": {
    "id": "cuid",
    "username": "blly // optional",
    "fullname": "Ahmad Hamid Balya",
    "nim": "5312623762"
  }
}
```

Response Body (Not Unique Failed, 400) :

```json
{
  "status": "unique error",
  "errors": "Username already registered"
}
```

Response Body (Validation Failed, 400) :

```json
{
  "status": "validation error",
  "errors": "Validation failed",
  "data": zodError
}
```

## Login User

Endpoint : POST /api/auth/login

Request Body :

```json
{
  "credential": "username or nim",
  "password": "rahasia"
}
```

Response Body (Success, 200) :

```json
{
  "status": "OK",
  "data": {
    "id": "cuid",
    "username": "blly // optional",
    "fullname": "Ahmad Hamid Balya",
    "nim": "5312623762",
    "token": "JWT token"
  }
}
```

Response Body (Process Failed, 400) :

```json
{
  "status": "process error",
  "errors": "credential or password wrong"
}
```

Response Body (Validation Failed, 400) :

```json
{
  "status": "validation error",
  "errors": "Validation failed",
  "data": zodError
}
```
