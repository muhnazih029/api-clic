# Photo API Spec

## Upload Photo

Endpoint: POST /api/photos

**Headers:**
Authentication: "Bearer rt"

### Request Body:

```json
{
  "title": "Sunset in Bali",
  "image": "Base64 encoded string",
  "description": "this is the description about sunset in Bali"
}
```

### Response Body (Success, 201):

```json
{
  "message": "Created",
  "data": {
    "id": "cuid",
    "title": "Sunset in Bali",
    "path": "base64encodedimage",
    "description": "this is the description about sunset in Bali",
    "createdAt": "2025-01-06T12:00:00Z"
  }
}
```

### Response Body (Validation Failed, 400):

```json
{
  "message": "Validation error",
  "errors": true,
  "data": {
    "title": "Title is required",
    "image": "Image must be a valid Base64 string",
    "description": "Image must have an description"
  }
}
```

### Response Body (Upload Error, 500):

```json
{
  "message": "Upload error",
  "errors": true
}
```

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
      "path": "base64encodedimage",
      "description": "this is the description about sunset in Bali",
      "createdAt": "2025-01-06T12:00:00Z"
    },
    {
      "id": "cuid",
      "title": "Mountain View",
      "path": "base64encodedimage",
      "description": "this is the description about Mountain View",
      "createdAt": "2025-01-05T15:30:00Z"
    }
  ]
}
```

## Get Photo by ID

**Endpoint:** GET /api/photos/{id}

**Authorization Required:** No

### Response Body (Success, 200):

```json
{
  "message": "OK",
  "data": {
    "id": "cuid",
    "title": "Sunset in Bali",
    "path": "base64encodedimage",
    "description": "this is the description about sunset in Bali",
    "createdAt": "2025-01-06T12:00:00Z"
  }
}
```

### Response Body (Not Found, 404):

```json
{
  "message": "Not found",
  "errors": true
}
```

## Delete Photo

**Endpoint:** DELETE /api/photos/{id}

**Headers:**
Authentication: "Bearer rt"

### Response Body (Success, 200):

```json
{
  "message": "Deleted",
  "data": {
    "id": "cuid",
    "title": "Sunset in Bali"
  }
}
```

### Response Body (Not Found, 404):

```json
{
  "message": "Not found",
  "errors": true
}
```