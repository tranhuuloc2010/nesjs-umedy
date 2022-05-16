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
  messageService: MessagesService;

  constructor() {
    // DONT DO THIS ON REAL APP
    // USE DEPENDENCY INJECTION
    this.messageService = new MessagesService();
  }

  @Get('')
  listMessages() {
    return this.messageService.findAll();
  }

  @Post()
  async createMessage(@Body() body: CreateMessageDto) {
    return await this.messageService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: any) {
    const message = await this.messageService.findOne(id);
    if (!message) {
      throw new NotFoundException('message not found');
    }
    return message;
  }
}
