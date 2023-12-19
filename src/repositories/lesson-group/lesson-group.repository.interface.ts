import { Repository } from "typeorm";
import { LessonGroup } from "../../entities/lesson-group.entity";

export interface ILessonGroupRepository extends Repository<LessonGroup> {}
