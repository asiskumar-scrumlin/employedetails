import { IsArray, IsBoolean, IsDateString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email address is required' })
  emailAddress: string;

  @IsNotEmpty({ message: 'Job title is required' })
  jobTitle: string;

  @IsBoolean({ message: 'isVerified must be a boolean' })
  isVerified: boolean;

  @IsDateString({}, { message: 'Invalid date format for registrationDate' })
  registrationDate: string;

  @IsArray({ message: 'Interests must be an array of strings' })
  @IsNotEmpty({ message: 'Interests are required' })
  interests: string[];
}
