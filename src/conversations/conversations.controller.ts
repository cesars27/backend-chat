import { Controller, Get, Post, Body, Param, Patch, Delete, Req } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { Request } from 'express';

@Controller('api/conversations')
export class ConversationsController {
  constructor(private readonly service: ConversationsService) {}

  @Post()
  create(@Body() body: { userName: string; userPhone: string }, @Req() req: Request) {
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || '';
    return this.service.create(body.userName, body.userPhone || '', ip);
  }

  @Post(':id/messages')
  addMessage(@Param('id') id: number, @Body() body: { text: string; sender: 'user' | 'agent'; agentName?: string }) {
    return this.service.addMessage(id, body.text, body.sender, body.agentName);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('by-ip/:ip')
  findByIp(@Param('ip') ip: string) {
    return this.service.findByIp(decodeURIComponent(ip));
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id/close')
  close(@Param('id') id: number) {
    return this.service.close(id);
  }

  @Patch(':id/reopen')
  reopen(@Param('id') id: number) {
    return this.service.reopen(id);
  }

  @Patch(':id/assign')
  assign(@Param('id') id: number, @Body() body: { agentName: string }) {
    return this.service.assign(id, body.agentName);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}