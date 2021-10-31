import { POST_ENTITY } from 'constants/entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { AutoIdEntity } from './abstract-class/auto-id-entity';
import Comment from './comment';
import User from './user';

@Entity({ name: 'post' })
class Post extends AutoIdEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: POST_ENTITY.titleMaxLength })
  title!: string;

  @Column({ type: 'text', nullable: true })
  content!: string;

  @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: User;

  @Column({ type: 'char', length: 36 })
  userId!: string;

  @OneToMany(() => Comment, comment => comment.post, { cascade: ['insert', 'update'] })
  comments!: Post[];
}

export default Post;
