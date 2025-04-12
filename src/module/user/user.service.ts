import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];
  private idCounter = 1;

  create(data: CreateUserDto): User {
    const newUser: User = {
      userId: this.idCounter++, 
      fullName: data.fullName,   
      emailAddress: data.emailAddress, 
      jobTitle: data.jobTitle,   
      isVerified: data.isVerified,         
      registrationDate: new Date(),  
      interests: data.interests,             
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findById(userId: number): User {  
    const user = this.users.find(u => u.userId === userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`); 
    }
    return user;
  }

  update(userId: number, data: UpdateUserDto): User {  
    const user = this.findById(userId);  
    Object.assign(user, data);
    return user;
  }

  remove(userId: number): void {  
    const index = this.users.findIndex(u => u.userId === userId);  
    if (index === -1) {
      throw new NotFoundException(`User with ID ${userId} not found`);  
    }
    this.users.splice(index, 1);
  }
}
