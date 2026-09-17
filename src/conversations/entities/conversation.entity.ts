import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Message } from './message.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'user_phone', default: '' })
  userPhone: string;

  @Column({ default: 'open' })
  status: 'open' | 'closed';

  @Column({ name: 'assigned_to', nullable: true })
  assignedTo: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Message, (msg) => msg.conversation)
  messages: Message[];
}