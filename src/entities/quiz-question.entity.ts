import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Quiz } from './quiz.entity';

@Entity()
export class QuizQuestion extends BaseEntity {
  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @Column({ name: 'quiz_id' })
  quizId: string;

  @Column('text', { nullable: false })
  text: string;

  @Column('json', { nullable: false })
  options: JSON; // JSON stringified array of strings
  /**
   * Sample structure:
   * [
   * {
   *  "id": "1",
   *   "text": "Option 1",
   *   "isCorrect": true
   *   },
   *   {
   *   "id": "2",
   *   "text": "Option 2",
   *   "isCorrect": false
   *   },
   *   {
   *   "id": "3",
   *   "text": "Option 3",
   *   "isCorrect": false
   * }
   * ]
   */
}
