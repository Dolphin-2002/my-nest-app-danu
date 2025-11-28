import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  @Post()
  @ApiOperation({ summary: 'Create a New User' })
  @ApiResponse({ status: 201, description: 'User Created.' })
  create(@Body() dto: CreateUserDto) {
    return { id: 1, ...dto };
  }
  @Get()
  @ApiOperation({ summary: 'Get All users' })
  getAll() {
    return [];
  }
}
