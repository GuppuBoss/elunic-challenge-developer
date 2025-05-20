import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserMessagesService } from './user-messages.service';
import { CreateUserMessageDto } from './dto/create-user-message.dto';
import { UserMessage } from './entities/user-message.entity';

@Controller('user-messages')
export class UserMessagesController {
  constructor(private readonly userMessagesService: UserMessagesService) {}

  @Post()
  async create(@Body() createUserMessageDto: CreateUserMessageDto): Promise<UserMessage> {
    return this.userMessagesService.create(createUserMessageDto);
  }

  @Get()
  async findAll(): Promise<UserMessage[]> {
    return this.userMessagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserMessage> {
    return this.userMessagesService.findOne(id);
  }

  @Put(':id/read')
  async markAsRead(@Param('id') id: string): Promise<UserMessage> {
    return this.userMessagesService.markAsRead(id);
  }
} 