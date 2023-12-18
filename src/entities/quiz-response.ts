import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Quiz } from './quiz.entity';
import { QuizQuestion } from './quiz-question.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class QuizResponse extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => Quiz)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @Column({ name: 'quiz_id' })
  quizId: string;

  @ManyToOne(() => QuizQuestion)
  @JoinColumn({ name: 'question_id' })
  question: QuizQuestion;

  @Column({ name: 'question_id' })
  questionId: string;

  @Column('int', { nullable: false })
  selectedOption: number;

  @Column({ type: 'boolean', default: false })
  isCorrect: boolean;
}
