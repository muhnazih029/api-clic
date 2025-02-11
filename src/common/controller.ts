import { type AuthService } from '~/auth/service';
import { type LoggerProvider } from '~/common/providers';
import { type EventService } from '~/event/service';

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
