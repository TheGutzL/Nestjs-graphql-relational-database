import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSetting } from 'src/graphql/models/UserSettings';
import { UserSettingsResolver } from 'src/graphql/resolvers/UserSettingsResolver';
import { UserResolver } from './UserResolver';
import { UserService } from './users.service';
import { UserSettingService } from './usersetting.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting])],
  controllers: [],
  providers: [
    UserResolver,
    UserService,
    UserSettingService,
    UserSettingsResolver,
  ],
})
export class UsersModule {}
