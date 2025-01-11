import { type LoggerProvider } from 'src/providers';
import { type AuthService } from 'src/services';

export abstract class Controller {
  protected logger: LoggerProvider;
  protected authService: AuthService;
  // TODO: change the type of these services to the correct type
  protected userService: AuthService;
  protected eventService: AuthService;
  protected threadService: AuthService;
  protected commentService: AuthService;
  protected photoService: AuthService;
}
