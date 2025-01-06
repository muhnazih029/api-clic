# Event API Spec

## Create Event

### Endpoint:
`POST /api/events`

### Request Body:
```json
{
  "title": "Event Title",
  "description": "Description of the event",
  "date": "2025-01-15",
  "image": "base64encodedimage",
  "location": "Event Location",
  "locationUrl": "https://maps.google.com/location"
}
```

### Response Body (Success, 201):
```json
{
  "status": "created",
  "data": {
    "id": "generatedId",
    "title": "Event Title",
    "description": "Description of the event",
    "date": "2025-01-15",
    "image": "https://storage.example.com/images/generatedImageUrl",
    "location": "Event Location",
    "locationUrl": "https://maps.google.com/location",
    "userId": "creatorUserId",
    "createdAt": "2025-01-06T10:00:00.000Z",
    "updatedAt": "2025-01-06T10:00:00.000Z"
  }
}
```

### Response Body (Validation Failed, 400):
```json
{
  "status": "validation error",
  "errors": "Validation failed",
  "data": "zodError"
}
```

---

## Get All Events

### Endpoint:
`GET /api/events`

### Response Body (Success, 200):
```json
{
  "status": "OK",
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
  "status": "OK",
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
  "status": "not found",
  "errors": "Event with the given ID not found"
}
```

---

## Update Event

### Endpoint:
`PUT /api/events/{id}`

### Request Body:
```json
{
  "title": "Updated Event Title",
  "description": "Updated description of the event",
  "date": "2025-01-20",
  "image": "base64updatedimage",
  "location": "Updated Event Location",
  "locationUrl": "https://maps.google.com/updatedlocation"
}
```

### Response Body (Success, 200):
```json
{
  "status": "updated",
  "data": {
    "id": "cuid",
    "title": "Updated Event Title",
    "description": "Updated description of the event",
    "date": "2025-01-20",
    "image": "https://storage.example.com/images/updatedEventImageUrl",
    "location": "Updated Event Location",
    "locationUrl": "https://maps.google.com/updatedlocation",
    "userId": "creatorUserId",
    "createdAt": "2025-01-06T10:00:00.000Z",
    "updatedAt": "2025-01-06T11:00:00.000Z"
  }
}
```

### Response Body (Validation Failed, 400):
```json
{
  "status": "validation error",
  "errors": "Validation failed",
  "data": "zodError"
}
```

### Response Body (Not Found, 404):
```json
{
  "status": "not found",
  "errors": "Event with the given ID not found"
}
```

---

## Delete Event

### Endpoint:
`DELETE /api/events/{id}`

### Response Body (Success, 200):
```json
{
  "status": "deleted",
  "message": "Event successfully deleted"
}
```

### Response Body (Not Found, 404):
```json
{
  "status": "not found",
  "errors": "Event with the given ID not found"
}
