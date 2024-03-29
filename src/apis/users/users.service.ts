import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  IUpdatePointWithManager,
  IUsersServiceCreate,
  IUsersServiceFindById,
  IUsersServiceFindOneByEamil,
} from './interfaces/user-service.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, //
  ) {}

  findOneByEmail({ email }: IUsersServiceFindOneByEamil): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  findById({ id }: IUsersServiceFindById): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async create({ createUserInput }: IUsersServiceCreate): Promise<User> {
    const { email, password } = createUserInput;
    const user = await this.findOneByEmail({ email });
    if (user) throw new ConflictException('이미 등록된 이메일입니다.');

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersRepository.save({
      ...createUserInput,
      password: hashedPassword,
    });
  }

  async updatePointWithManager({
    manager,
    pointAmount,
    user,
  }: IUpdatePointWithManager): Promise<void> {
    await manager.save(User, {
      ...user,
      point: user.point - pointAmount,
    });
  }
}
