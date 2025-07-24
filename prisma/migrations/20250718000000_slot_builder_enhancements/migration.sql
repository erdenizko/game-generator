-- Add new columns to slot_items table for enhanced slot items
ALTER TABLE "slot_items" ADD COLUMN "order_index" INTEGER DEFAULT 0;
ALTER TABLE "slot_items" ADD COLUMN "category" VARCHAR(50);
ALTER TABLE "slot_items" ADD COLUMN "tags" TEXT[];
ALTER TABLE "slot_items" ADD COLUMN "is_custom" BOOLEAN DEFAULT true;
ALTER TABLE "slot_items" ADD COLUMN "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Create new table for color themes
CREATE TABLE "color_themes" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "game_id" UUID NOT NULL,
  "primary_color" VARCHAR(7) NOT NULL,
  "secondary_color" VARCHAR(7) NOT NULL,
  "accent_color" VARCHAR(7),
  "background_color" VARCHAR(7),
  "text_color" VARCHAR(7),
  "contrast_ratio" DECIMAL(4,2),
  "is_accessible" BOOLEAN DEFAULT false,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "color_themes_pkey" PRIMARY KEY ("id")
);

-- Create new table for control layouts
CREATE TABLE "control_layouts" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "game_id" UUID NOT NULL,
  "layout_type" VARCHAR(20) NOT NULL,
  "button_style" VARCHAR(20) NOT NULL,
  "position" VARCHAR(20) NOT NULL,
  "auto_hide" BOOLEAN DEFAULT false,
  "custom_styles" JSONB,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "control_layouts_pkey" PRIMARY KEY ("id")
);

-- Add foreign key constraints
ALTER TABLE "color_themes" ADD CONSTRAINT "color_themes_game_id_fkey" 
  FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "control_layouts" ADD CONSTRAINT "control_layouts_game_id_fkey" 
  FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create indexes for better query performance
CREATE INDEX "slot_items_order_index_idx" ON "slot_items"("order_index");
CREATE INDEX "slot_items_category_idx" ON "slot_items"("category");
CREATE INDEX "color_themes_game_id_idx" ON "color_themes"("game_id");
CREATE INDEX "control_layouts_game_id_idx" ON "control_layouts"("game_id");

-- Add unique constraint to ensure one theme and layout per game
CREATE UNIQUE INDEX "color_themes_game_id_key" ON "color_themes"("game_id");
CREATE UNIQUE INDEX "control_layouts_game_id_key" ON "control_layouts"("game_id");