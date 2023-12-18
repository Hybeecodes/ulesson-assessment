import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { QuizQuestion } from './quiz-question.entity';

@Entity()
export class Quiz extends BaseEntity {
  @Column('varchar', { nullable: false, length: 255 })
  title: string;

  @Column('varchar', { nullable: true, length: 255 })
  description: string;

  @Column('varchar', { nullable: true, length: 255 })
  image_url: string;

  @OneToMany(() => QuizQuestion, (question) => question.quiz)
  questions: Quiz[];
}
