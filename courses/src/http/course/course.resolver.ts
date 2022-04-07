import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CourseService } from './course.service'
import { CreateCourseInput } from './dto/create-course.input'
import { UpdateCourseInput } from './dto/update-course.input'
import { Course } from './entities/course.entity'

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Mutation(() => Course)
  createCourse(@Args('createCourseInput') createCourseInput: CreateCourseInput) {
    return this.courseService.create(createCourseInput)
  }

  @Query(() => [Course], { name: 'course' })
  findAll() {
    return this.courseService.findAll()
  }

  @Query(() => Course, { name: 'course' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.courseService.findOne(id)
  }

  @Mutation(() => Course)
  updateCourse(@Args('updateCourseInput') updateCourseInput: UpdateCourseInput) {
    return this.courseService.update(updateCourseInput.id, updateCourseInput)
  }

  @Mutation(() => Course)
  removeCourse(@Args('id', { type: () => Int }) id: number) {
    return this.courseService.remove(id)
  }
}
