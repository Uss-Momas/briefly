-- CreateTable
CREATE TABLE "shortlinks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "original_url" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "shortlinks_code_key" ON "shortlinks"("code");
