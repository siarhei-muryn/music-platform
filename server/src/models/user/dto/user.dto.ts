import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly email_confirmed: boolean;

  @ApiProperty()
  readonly picture_url: string;

  @ApiProperty()
  readonly bio: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.email_confirmed = user.email_confirmed;
    this.picture_url = user.picture_url;
    this.bio = user.bio;
  }
}
