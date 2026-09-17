import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private convRepo: Repository<Conversation>,
    @InjectRepository(Message)
    private msgRepo: Repository<Message>,
  ) {}

  // Crear conversación con ID base 101
  async create(userName: string, userPhone: string, userIp: string) {
    const lastConv = await this.convRepo.find({ order: { id: 'DESC' }, take: 1 });
    let newId = 101;
    if (lastConv.length > 0 && lastConv[0].id >= 101) {
      newId = lastConv[0].id + 1;
    }
    
    const conv = this.convRepo.create({ 
      id: newId,
      userName, 
      userPhone, 
      userIp 
    });
    return this.convRepo.save(conv);
  }

  async addMessage(conversationId: number, text: string, sender: 'user' | 'agent', agentName?: string) {
    const conv = await this.convRepo.findOne({ where: { id: conversationId } });
    if (!conv) throw new NotFoundException('Conversación no encontrada');
    const msg = this.msgRepo.create({ 
      conversationId, 
      text, 
      sender, 
      agentName: agentName || undefined 
    });
    return this.msgRepo.save(msg);
  }

  async findAll() {
    return this.convRepo.find({ order: { createdAt: 'DESC' }, relations: { messages: true } });
  }

  async findOne(id: number) {
    const conv = await this.convRepo.findOne({
      where: { id },
      relations: { messages: true },
      order: { messages: { createdAt: 'ASC' } },
    });
    if (!conv) throw new NotFoundException('Conversación no encontrada');
    return conv;
  }

  async close(id: number) {
    const conv = await this.convRepo.findOne({ where: { id } });
    if (!conv) throw new NotFoundException('Conversación no encontrada');
    conv.status = 'closed';
    return this.convRepo.save(conv);
  }

  async reopen(id: number) {
    const conv = await this.convRepo.findOne({ where: { id } });
    if (!conv) throw new NotFoundException('Conversación no encontrada');
    conv.status = 'open';
    return this.convRepo.save(conv);
  }

  async assign(id: number, agentName: string) {
    const conv = await this.convRepo.findOne({ where: { id } });
    if (!conv) throw new NotFoundException('Conversación no encontrada');
    conv.assignedTo = agentName;
    return this.convRepo.save(conv);
  }

  async remove(id: number) {
    const conv = await this.convRepo.findOne({ where: { id } });
    if (!conv) throw new NotFoundException('Conversación no encontrada');
    await this.msgRepo.delete({ conversationId: id });
    await this.convRepo.remove(conv);
    return { deleted: true, id };
  }

  async findByIp(userIp: string) {
    return this.convRepo.findOne({
      where: { userIp, status: 'open' },
      relations: { messages: true },
      order: { createdAt: 'DESC' },
    });
  }
}