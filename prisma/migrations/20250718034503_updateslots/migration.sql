/*
  Warnings:

  - You are about to drop the column `diag_prize` on the `slot_items` table. All the data in the column will be lost.
  - You are about to drop the column `min_count` on the `slot_items` table. All the data in the column will be lost.
  - Made the column `is_accessible` on table `color_themes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `auto_hide` on table `control_layouts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order_index` on table `slot_items` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_custom` on table `slot_items` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "color_themes" ALTER COLUMN "is_accessible" SET NOT NULL;

-- AlterTable
ALTER TABLE "control_layouts" ALTER COLUMN "auto_hide" SET NOT NULL;

-- AlterTable
ALTER TABLE "slot_items" DROP COLUMN "diag_prize",
DROP COLUMN "min_count",
ADD COLUMN     "diagonal_prize" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "minimum_count" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "order_index" SET NOT NULL,
ALTER COLUMN "is_custom" SET NOT NULL;
