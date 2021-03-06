// 3rd party imports
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

// DashboardHub imports
import { UserService } from '@core/services/index.service';
import { UserModel } from '@shared/models/index.model';

/**
 * User pipe
 */
@Pipe({ name: 'user' })
export class UserPipe implements PipeTransform {

  /**
   * Life cycle method
   * @param userService UserService
   */
  constructor(private userService: UserService) { }

  transform(userId: string): Observable<UserModel> {
    return this.userService
      .findUserStatsById(userId);
  }
}
