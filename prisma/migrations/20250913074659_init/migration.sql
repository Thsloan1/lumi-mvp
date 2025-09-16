/*
  Warnings:

  - You are about to drop the `children` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `classrooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organizations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "children" DROP CONSTRAINT "children_classroomId_fkey";

-- DropForeignKey
ALTER TABLE "classrooms" DROP CONSTRAINT "classrooms_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "logs" DROP CONSTRAINT "logs_childId_fkey";

-- DropForeignKey
ALTER TABLE "logs" DROP CONSTRAINT "logs_classroomId_fkey";

-- DropTable
DROP TABLE "children";

-- DropTable
DROP TABLE "classrooms";

-- DropTable
DROP TABLE "logs";

-- DropTable
DROP TABLE "organizations";

-- DropEnum
DROP TYPE "LogType";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
