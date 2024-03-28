import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserResponse } from './dto/update-user.dto';
import { ApiResponse } from '@nestjs/swagger';
import { GetUserResponse } from './dto/get-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

 // @Public()
  @Post('create')
  @ApiResponse({ status: 201 })
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.usersService.create(createUserDto);
  }

  @Get('get/:id')
  @ApiResponse({ status: 200, type: GetUserResponse })
  async findOne(@Param('id') id: string): Promise<GetUserResponse> {
    return await this.usersService.findById(id);
  }

  @Put('edit/:id')
  @ApiResponse({ status: 200, type: UpdateUserResponse })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Put('disable/:id')
  @ApiResponse({ status: 200 })
  async delete(@Param('id') id: string): Promise<any> {
    return await this.usersService.softDelete(id);
  }
}
