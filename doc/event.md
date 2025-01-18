# Event API Spec

## Create Event

### Endpoint:

`POST /api/events`

**Headers:**
Authentication: "Bearer at"

### Request Body:

```json
{
  "title": "Event Title",
  "description": "Description of the event",
  "date": "2025-01-15",
  "image": "base64encodedimage // optional",
  "userId": "cuid //from Auth",
  "location": "Event Location // optional",
  "locationUrl": "https://maps.google.com/location // optional"
}
```

### Response Body (Success, 201):

```json
{
  "message": "Created",
  "data": {
    "title": "Event Title",
    "createdAt": "2025-01-06T10:00:00.000Z",
    "updatedAt": "2025-01-06T10:00:00.000Z"
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

---

## Get All Events

### Endpoint:

`GET /api/events`

### Response Body (Success, 200):

```json
{
  "message": "OK",
  "data": [
    {
      "id": "cuid1",
      "title": "Event Title 1",
      "description": "Description of the event 1",
      "date": "2025-01-15",
      "image": "https://storage.example.com/images/event1ImageUrl",
      "location": "Location 1",
      "locationUrl": "https://maps.google.com/location1",
      "userId": "creatorUserId",
      "createdAt": "2025-01-06T10:00:00.000Z",
      "updatedAt": "2025-01-06T10:00:00.000Z"
    },
    {
      "id": "cuid2",
      "title": "Event Title 2",
      "description": "Description of the event 2",
      "date": "2025-01-16",
      "image": "https://storage.example.com/images/event2ImageUrl",
      "location": "Location 2",
      "locationUrl": "https://maps.google.com/location2",
      "userId": "creatorUserId",
      "createdAt": "2025-01-06T11:00:00.000Z",
      "updatedAt": "2025-01-06T11:00:00.000Z"
    }
  ]
}
```

---

## Get Event by ID

### Endpoint:

`GET /api/events/{id}`

### Response Body (Success, 200):

```json
{
  "message": "OK",
  "data": {
    "id": "cuid",
    "title": "Event Title",
    "description": "Description of the event",
    "date": "2025-01-15",
    "image": "https://storage.example.com/images/eventImageUrl",
    "location": "Event Location",
    "locationUrl": "https://maps.google.com/location",
    "userId": "creatorUserId",
    "createdAt": "2025-01-06T10:00:00.000Z",
    "updatedAt": "2025-01-06T10:00:00.000Z"
  }
}
```

### Response Body (Not Found, 404):

```json
{
  "message": "Not Found",
  "errors": true
}
```

### Response Body (Validation Error, 400):

```json
{
  "message": "Validation Error",
  "errors": true,
  "data": [zodError]
}
```

---

## Update Event

### Endpoint:

`PATCH /api/events/{id}`

**Headers:**
Authentication: "Bearer at"

### Request Body:

```json
{
  "title": "Updated Event Title",
  "description": "Updated description of the event",
  "date": "2025-01-20",
  "image": "base64updatedimage //optional",
  "userId": "cuid //from Auth",
  "location": "Updated Event Location //optional",
  "locationUrl": "https://maps.google.com/updatedlocation //optional"
}
```

### Response Body (Success, 200):

```json
{
  "message": "Updated",
  "data": {
    //anything from req body from user
    "title": "Updated Event Title",
    "description": "Updated description of the event",
    "date": "2025-01-20",
    "image": "https://storage.example.com/images/updatedEventImageUrl",
    "location": "Updated Event Location",
    "locationUrl": "https://maps.google.com/updatedlocation",
    "updatedAt": "2025-01-06T11:00:00.000Z"
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
  "message": "Not Found",
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

---

## Delete Event

### Endpoint:

`DELETE /api/events/{id}`

**Headers:**
Authentication: "Bearer at"

### Response Body (Success, 200):

```json
{
  "message": "Deleted",
  "data": true
}
```

### Response Body (Not Found, 404):

```json
{
  "message": "not found",
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
