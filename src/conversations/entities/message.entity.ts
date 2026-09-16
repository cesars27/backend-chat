import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Conversation } from './conversation.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  conversation_id: number;

  @Column('text')
  text: string;

  @Column({ type: 'enum', enum: ['user', 'agent'] })
  sender: 'user' | 'agent';

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Conversation, (conv) => conv.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;
}
