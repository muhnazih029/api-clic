# Photo API Spec

## Upload Photo

Endpoint: POST /api/photos

**Headers:**
Authentication: "Bearer at"

### Request Body:

```json
{
  "image": "Base64 Encoded Image",
  "title": "Sunset in Bali //optional",
  "description": "this is the description about sunset in Bali //optional",
  "userId": "cuid from Auth"
}
```

### Response Body (Success, 201):

```json
{
  "message": "Created",
  "data": {
    "path": "https://storage.example.com/images/updatedEventImageUrl",
    "createdAt": "2025-01-06T12:00:00Z",
    "updatedAt": "2025-01-06T12:00:00Z"
  }
}
```

### Response Body (Validation Failed, 400):

```json
{
  "message": "Validation Error",
  "errors": true,
  "data": [zodError]
}
```

### Response Body (Unauthorize, 401):

```json
{
  "message": "Unauthorized Access",
  "errors": true,
  "data": [zodError]
}
```

### Response Body (Internal Server Error, 501):

```json
{
  "message": "Upload error",
  "errors": true
}
```

---

## Get All Photos

**Endpoint:** GET /api/photos

**Authorization Required:** No

### Response Body (Success, 200):

```json
{
  "message": "OK",
  "data": [
    {
      "id": "cuid",
      "title": "Sunset in Bali",
      "path": "https://storage.example.com/images/updatedEventImageUrl",
      "userId": "cuid",
      "createdAt": "2025-01-06T12:00:00Z",
      "updatedAt": "2025-01-06T12:00:00Z"
    },
    {
      "id": "cuid",
      "title": "Mountain View",
      "path": "https://storage.example.com/images/updatedEventImageUrl",
      "userId": "cuid",
      "createdAt": "2025-01-05T15:30:00Z",
      "updatedAt": "2025-01-06T12:00:00Z"
    }
  ]
}
```

---

## Get Photo by ID

**Endpoint:** GET /api/photos/{id}

**Authorization Required:** No

### Response Body (Success, 200):

```json
{
  "message": "OK",
  "data": {
    "id": "cuid",
    "path": "https://storage.example.com/images/updatedEventImageUrl",
    "title": "Sunset in Bali",
    "description": "this is the description about sunset in Bali",
    "userId": "cuid",
    "createdAt": "2025-01-06T12:00:00Z",
    "updatedAt": "2025-01-06T12:00:00Z"
  }
}
```

### Response Body (Validation Failed, 400):

```json
{
  "message": "Validation Error",
  "errors": true,
  "data": [zodError]
}
```

### Response Body (Not Found, 404):

```json
{
  "message": "Not found",
  "errors": true
}
```

---

## Delete Photo

**Endpoint:** DELETE /api/photos/{id}

**Headers:**
Authentication: "Bearer at"

### Response Body (Success, 200):

```json
{
  "message": "Deleted",
  "data": true
}
```

### Response Body (Validation Failed, 400):

```json
{
  "message": "Validation Error",
  "errors": true,
  "data": [zodError]
}
```

### Response Body (Not Found, 404):

```json
{
  "message": "Not found",
  "errors": true
}
```

### Response Body (Unauthorize, 401):

```json
{
  "message": "Unauthorized Access",
  "errors": true,
  "data": [zodError]
}
```
