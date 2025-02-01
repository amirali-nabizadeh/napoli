import { User } from 'src/authentication/model/user/user.entity';
import { DeepPartial } from 'typeorm';

export const USERS: DeepPartial<User>[] = [
  {
    firstname: 'amirali',
    lastname: 'nabizadeh',
    email: 'amirali@nabizadeh.com',
    username: 'amirali-nabizadeh',
    password: '$2a$12$GQKU2fdCuGjM4t95DvBcqOwxLkYy2dBZ/80ODS55yihzHyz2bZ0Dy',
  },
];
