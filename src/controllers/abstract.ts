import { type LoggerProvider } from 'src/providers';
import { type AuthService, EventService } from 'src/services';

export abstract class Controller {
  protected logger: LoggerProvider;
  protected authService: AuthService;
  // TODO: change the type of these services to the correct type
  protected userService: AuthService;
  protected eventService: EventService;
  protected threadService: AuthService;
  protected commentService: AuthService;
  protected photoService: AuthService;
}
