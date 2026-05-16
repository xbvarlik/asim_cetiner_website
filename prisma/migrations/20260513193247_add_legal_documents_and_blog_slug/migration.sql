-- CreateTable
CREATE TABLE "LegalDocument" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegalDocument_pkey" PRIMARY KEY ("id")
);

-- AlterTable: Add slug column to BlogPost (nullable first for existing data)
ALTER TABLE "BlogPost" ADD COLUMN "slug" TEXT;

-- Generate slugs for existing blog posts
-- This creates a slug from the title, handling Turkish characters
UPDATE "BlogPost"
SET "slug" = lower(
  regexp_replace(
    regexp_replace(
      regexp_replace(
        regexp_replace(
          regexp_replace(
            regexp_replace(
              regexp_replace(
                regexp_replace(
                  trim("title"),
                  'ç', 'c', 'gi'
                ), 'ğ', 'g', 'gi'
              ), 'ı', 'i', 'gi'
            ), 'ö', 'o', 'gi'
          ), 'ş', 's', 'gi'
        ), 'ü', 'u', 'gi'
      ), '[^\w\s-]', '', 'g'
    ), '[\s_-]+', '-', 'g'
  )
)
WHERE "slug" IS NULL;

-- Handle potential duplicates by appending incrementing numbers
DO $$
DECLARE
  rec RECORD;
  new_slug TEXT;
  counter INTEGER;
BEGIN
  FOR rec IN 
    SELECT id, slug, 
           ROW_NUMBER() OVER (PARTITION BY slug ORDER BY "createdAt") as rn
    FROM "BlogPost"
    WHERE slug IS NOT NULL
  LOOP
    IF rec.rn > 1 THEN
      counter := rec.rn;
      new_slug := rec.slug || '-' || counter;
      
      WHILE EXISTS (SELECT 1 FROM "BlogPost" WHERE slug = new_slug AND id != rec.id) LOOP
        counter := counter + 1;
        new_slug := rec.slug || '-' || counter;
      END LOOP;
      
      UPDATE "BlogPost" SET slug = new_slug WHERE id = rec.id;
    END IF;
  END LOOP;
END $$;

-- Now make slug NOT NULL and add constraints
ALTER TABLE "BlogPost" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "BlogPost" ALTER COLUMN "content" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_title_key" ON "BlogPost"("title");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
