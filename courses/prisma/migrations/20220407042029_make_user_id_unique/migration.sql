/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `students` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "students_userId_key" ON "students"("userId");
