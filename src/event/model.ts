export class CreateEventRequest {
  title: string;
  description: string;
  date: string;
  image?: string;
  userId: string;
  location?: string;
  locationUrl?: string;
}

export class EventSuccessResponse {
  title: string;
  createdAt: Date;
  updatedAt: Date;
}
