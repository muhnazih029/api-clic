# Photo API Spec

## Upload Photo

**Endpoint:** POST /api/photos
// perlu auth ga? menurutku butuh karena ada relasi sama uploader kalo perlu ada non authorize error ga sih?

### Request Body:

```json
{
  "name": "Sunset in Bali", //ini title bukan name
  "image": "Base64 encoded string" //nice
  // perlu description ga?
}
```

### Response Body (Success, 201):

```json
{
  "status": "created", //ini message aja
  "data": {
    "id": "uuidv6", // cuid ajah
    "name": "Sunset in Bali", //pakenya title bukan name
    "url": "https://yourdomain.com/photos/uuidv6", //path bro
    "createdAt": "2025-01-06T12:00:00Z"
  }
}
```

### Response Body (Validation Failed, 400):

```json
{
  "status": "validation error", //ini "Validation error" //ini message aja
  "errors": "Validation failed", //ini boolean sajah
  "data": {
    //ini real begini?
    "name": "Name is required", //title bro//pakenya title bukan name
    "image": "Image must be a valid Base64 string"
  }
}
```

### Response Body (Process Failed, 500):

```json
{
  "status": "process error", //ini "Upload error" aja ga sih? //ini message aja
  "errors": "Failed to upload photo" //ini boolean sajah
}
```

## Get All Photos

**Endpoint:** GET /api/photos
// perlu auth ga? kalo perlu ada non authorize error ga sih?

### Response Body (Success, 200):

```json
{
  "status": "OK", //ini message aja
  "data": [
    {
      "id": "uuidv6", // cuid ajah
      "name": "Sunset in Bali", //pakenya title bukan name
      "url": "https://yourdomain.com/photos/uuidv6", //path bro
      "createdAt": "2025-01-06T12:00:00Z"
    },
    {
      "id": "uuidv6", // cuid ajah
      "name": "Mountain View", //pakenya title bukan name
      "url": "https://yourdomain.com/photos/uuidv6", //path bro
      "createdAt": "2025-01-05T15:30:00Z"
    }
  ]
}
```

## Get Photo by ID

**Endpoint:** GET /api/photos/{id}
// perlu auth ga? kalo perlu ada non authorize error ga sih?

### Response Body (Success, 200):

```json
{
  "status": "OK", //ini message aja
  "data": {
    "id": "uuidv6", // cuid ajah
    "name": "Sunset in Bali", //pakenya title bukan name
    "url": "https://yourdomain.com/photos/uuidv6", //path bro
    "createdAt": "2025-01-06T12:00:00Z"
  }
}
```

    // perlu validation error ga sih buat kalo id nya invalid

### Response Body (Not Found, 404):

    // perlu auth ga? kalo perlu ada non authorize error ga sih?

```json
{
  "status": "not found", //ini message aja
  "errors": "Photo not found" //boolean sajah
}
```

## Delete Photo

**Endpoint:** DELETE /api/photos/{id}

### Response Body (Success, 200):

```json
{
  "status": "deleted", //ini message aja
  "data": {
    // perlukah mengembalikan data fotonya
    "id": "uuidv6", // cuid ajah
    "name": "Sunset in Bali" //pakenya title bukan name
  }
}
```

// perlu validation error ga sih buat kalo id nya invalid

### Response Body (Not Found, 404):

```json
{
  "status": "not found", //ini message aja
  "errors": "Photo not found" //boolean sajah
}
```
