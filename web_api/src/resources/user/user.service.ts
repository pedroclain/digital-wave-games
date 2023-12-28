import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
      
@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findByEmail(createUserDto.email);

    if (user) throw new BadRequestException("Email already exists")

    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(createUserDto.password, salt);
    
    createUserDto.password = hashPass;
    return this.userRepository.create(createUserDto);
  }

  async findOne(id: number) {
    const user = this.userRepository.findOne(id);
    
    if (!user) throw new BadRequestException("User not found");

    return user;
  }
}
