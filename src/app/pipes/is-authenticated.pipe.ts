import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@models/user';

@Pipe({
  name: 'isAuthenticated'
})
export class IsAuthenticatedPipe implements PipeTransform {
  transform(user: User | undefined, isAuthenticated: boolean): boolean {
    return user !== undefined && isAuthenticated;
  }
}
