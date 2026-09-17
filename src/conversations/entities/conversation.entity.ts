import { Entity, Column, PrimaryColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Message } from './message.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'user_name', type: 'varchar' })
  userName: string;

  @Column({ name: 'user_phone', type: 'varchar', default: '' })
  userPhone: string;

  @Column({ name: 'user_ip', type: 'varchar', nullable: true })
  userIp: string | null;

  @Column({ default: 'open' })
  status: 'open' | 'closed';

  @Column({ name: 'assigned_to', type: 'varchar', nullable: true })
  assignedTo: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Message, (msg) => msg.conversation)
  messages: Message[];
}