import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import UsersService from './users.service';
import CreateUserDto from './dto/createUser.dto';

@Controller('users')
export default class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }

  @Post(':id')
  async createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    this.usersService.deleteUser(Number(id));
  }
}