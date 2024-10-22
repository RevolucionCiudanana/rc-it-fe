import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@models/user';

@Pipe({
  name: 'hasRole'
})
export class HasRolePipe implements PipeTransform {
  transform(user: User | undefined, roles: string[]): boolean {
    if (!user || !user.roles) return false;
    return roles.some(role => user.roles.includes(role));
  }
}
