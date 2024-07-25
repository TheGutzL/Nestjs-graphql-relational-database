import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSetting } from 'src/graphql/models/UserSettings';
import { CreateUserSettingsInput } from 'src/graphql/utils/CreateUserSettingsInput';
import { Repository } from 'typeorm';

@Injectable()
export class UserSettingService {
  constructor(
    @InjectRepository(UserSetting)
    private userSettingRepository: Repository<UserSetting>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getUserSettingsById(userId: number) {
    return this.userSettingRepository.findOneBy({ userId });
  }

  async createUserSettings(createUserSettingsData: CreateUserSettingsInput) {
    const userFound = await this.userRepository.findOneBy({
      id: createUserSettingsData.userId,
    });

    if (!userFound) throw new Error('User not found');

    const newUserSetting = this.userSettingRepository.create(
      createUserSettingsData,
    );

    const savedSettings = await this.userSettingRepository.save(newUserSetting);

    userFound.settings = savedSettings;
    await this.userRepository.save(userFound);

    return savedSettings;
  }
}
