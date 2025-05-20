import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMessage } from './entities/user-message.entity';
import { UserMessagesController } from './user-messages.controller';
import { UserMessagesService } from './user-messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserMessage])],
  controllers: [UserMessagesController],
  providers: [UserMessagesService],
  exports: [TypeOrmModule],
})
export class UserMessagesModule {} 