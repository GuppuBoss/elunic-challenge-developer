import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMessage } from './entities/user-message.entity';
import { CreateUserMessageDto } from './dto/create-user-message.dto';

@Injectable()
export class UserMessagesService {
  constructor(
    @InjectRepository(UserMessage)
    private userMessageRepository: Repository<UserMessage>,
  ) {}

  async create(createUserMessageDto: CreateUserMessageDto): Promise<UserMessage> {
    const userMessage = this.userMessageRepository.create(createUserMessageDto);
    return this.userMessageRepository.save(userMessage);
  }

  async findAll(): Promise<UserMessage[]> {
    return this.userMessageRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<UserMessage> {
    return this.userMessageRepository.findOneBy({ id });
  }

  async markAsRead(id: string): Promise<UserMessage> {
    const userMessage = await this.userMessageRepository.findOneBy({ id });
    if (!userMessage) {
      return null;
    }
    userMessage.isRead = true;
    return this.userMessageRepository.save(userMessage);
  }
} 