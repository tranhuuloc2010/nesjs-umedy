import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get('')
  listMessages() {
    return 'this messages';
  }

  @Post()
  createMessage(@Body() body: any) {
    console.log(body);
    return body;
  }

  @Get('/:id')
  listMessage(@Param('id') id: any) {
    console.log(id);
    return id;
  }
}
