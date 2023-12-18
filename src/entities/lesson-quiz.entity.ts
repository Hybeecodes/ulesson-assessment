import { BaseEntity } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { Lesson } from './lesson.entity';
import { Quiz } from './quiz.entity';

@Entity('lesson_quizzes')
@Unique(['lesson', 'quiz']) // assume that a quiz can only be added to a lesson once
export class LessonQuiz extends BaseEntity {
  @ManyToOne(() => Lesson, (lesson) => lesson.quizzes)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  @Column({ name: 'lesson_id' })
  lessonId: string;

  @ManyToOne(() => Quiz)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @Column({ name: 'quiz_id' })
  quizId: string;
}
