import { BaseEntity } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Course } from './course.entity';
import { LessonGroup } from './lesson-group.entity';

@Entity()
export class Chapter extends BaseEntity {
  @Column('varchar', { nullable: false, length: 255 })
  title: string;

  @Column('varchar', { nullable: true, length: 255 })
  description: string;

  @Column('varchar', { nullable: true, length: 255 })
  image_url: string;

  @ManyToOne(() => Course, (course) => course.chapters)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({ name: 'course_id' })
  courseId: string;

  @OneToMany(() => LessonGroup, (lessonGroup) => lessonGroup.chapter)
  groups: LessonGroup[];
}
