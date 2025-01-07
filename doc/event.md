# Event API Spec

## Create Event

### Endpoint:

`POST /api/events`

**Headers:**
Authentication: "Bearer rt"

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
  "message": "Created",
  "data": {
    "id": "cuid",
    "title": "Event Title",
    "description": "Description of the event",
    "date": "2025-01-15",
    "image": "https://storage.example.com/images/generatedImageUrl",
    "location": "Event Location",
    "locationUrl": "https://maps.google.com/location",
    "userId": "cuid of creatorUserId",
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
  "data": {
    "title": "Title is required",
    "description": "Description of the event is required",
    "date": "Date is required",
    "image": "Image must be a valid Base64 string",
    "location": "Location is required",
  }
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

---

## Update Event

### Endpoint:

`PUT /api/events/{id}`

**Headers:**
Authentication: "Bearer rt"

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
  "message": "Updated",
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
  "message": "Validation Error",
  "errors": true,
}
```

### Response Body (Not Found, 404):

```json
{
  "message": "Not Found",
  "errors": true
}
```

---

## Delete Event

### Endpoint:

`DELETE /api/events/{id}`

**Headers:**
Authentication: "Bearer rt"

### Response Body (Success, 200):

```json
{
  "message": "Deleted",
  "data": {
    "id": "cuid",
    "title": "Deleted Event Title",
  }
}
```

### Response Body (Not Found, 404):

```json
{
  "message": "not found",
  "errors": true
}
```
