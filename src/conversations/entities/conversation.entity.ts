import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Message } from './message.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column()
  user_phone: string;

  @Column({ default: 'open' })
  status: 'open' | 'closed';

  @Column({ nullable: true })
  assigned_to: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Message, (msg) => msg.conversation)
  messages: Message[];
}
