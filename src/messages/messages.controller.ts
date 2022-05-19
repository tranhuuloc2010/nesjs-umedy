import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  @Get('')
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  async createMessage(@Body() body: CreateMessageDto) {
    return await this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: any) {
    const message = await this.messagesService.findOne(id);
    if (!message) {
      throw new NotFoundException('message not found');
    }
    return message;
  }
}
