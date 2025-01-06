# Photo API Spec

## Upload Photo

**Endpoint:** POST /api/photos

### Request Body:
```json
{
  "name": "Sunset in Bali",
  "image": "Base64 encoded string"
}
```

### Response Body (Success, 201):
```json
{
  "status": "created",
  "data": {
    "id": "uuidv6",
    "name": "Sunset in Bali",
    "url": "https://yourdomain.com/photos/uuidv6",
    "createdAt": "2025-01-06T12:00:00Z"
  }
}
```

### Response Body (Validation Failed, 400):
```json
{
  "status": "validation error",
  "errors": "Validation failed",
  "data": {
    "name": "Name is required",
    "image": "Image must be a valid Base64 string"
  }
}
```

### Response Body (Process Failed, 500):
```json
{
  "status": "process error",
  "errors": "Failed to upload photo"
}
```

## Get All Photos

**Endpoint:** GET /api/photos

### Response Body (Success, 200):
```json
{
  "status": "OK",
  "data": [
    {
      "id": "uuidv6",
      "name": "Sunset in Bali",
      "url": "https://yourdomain.com/photos/uuidv6",
      "createdAt": "2025-01-06T12:00:00Z"
    },
    {
      "id": "uuidv6",
      "name": "Mountain View",
      "url": "https://yourdomain.com/photos/uuidv6",
      "createdAt": "2025-01-05T15:30:00Z"
    }
  ]
}
```

## Get Photo by ID

**Endpoint:** GET /api/photos/{id}

### Response Body (Success, 200):
```json
{
  "status": "OK",
  "data": {
    "id": "uuidv6",
    "name": "Sunset in Bali",
    "url": "https://yourdomain.com/photos/uuidv6",
    "createdAt": "2025-01-06T12:00:00Z"
  }
}
```

### Response Body (Not Found, 404):
```json
{
  "status": "not found",
  "errors": "Photo not found"
}
```

## Delete Photo

**Endpoint:** DELETE /api/photos/{id}

### Response Body (Success, 200):
```json
{
  "status": "deleted",
  "data": {
    "id": "uuidv6",
    "name": "Sunset in Bali"
  }
}
```

### Response Body (Not Found, 404):
```json
{
  "status": "not found",
  "errors": "Photo not found"
}
```
