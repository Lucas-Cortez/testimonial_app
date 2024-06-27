/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `FormType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FormType_value_key" ON "FormType"("value");
