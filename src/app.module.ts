import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './module/user/entities/user.entity';

@Module({
  imports : [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nestuser', 
      password: 'password123',
      database: 'nest_crud',
      entities: [User],
      synchronize: true, 
    }),
  ]
})
export class AppModule {}
