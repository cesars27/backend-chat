import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ConversationsService } from './conversations.service';

@Controller('api/conversations')
export class ConversationsController {
  constructor(private readonly service: ConversationsService) {}

  @Post()
  create(@Body() body: { userName: string; userPhone: string }) {
    return this.service.create(body.userName, body.userPhone);
  }

  @Post(':id/messages')
  addMessage(@Param('id') id: number, @Body() body: { text: string; sender: 'user' | 'agent' }) {
    return this.service.addMessage(id, body.text, body.sender);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id/close')
  close(@Param('id') id: number) {
    return this.service.close(id);
  }

  @Patch(':id/assign')
  assign(@Param('id') id: number, @Body() body: { agentName: string }) {
    return this.service.assign(id, body.agentName);
  }
}
