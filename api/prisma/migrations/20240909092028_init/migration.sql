-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_shortlinks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "original_url" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_shortlinks" ("code", "created_at", "id", "original_url", "updated_at") SELECT "code", "created_at", "id", "original_url", "updated_at" FROM "shortlinks";
DROP TABLE "shortlinks";
ALTER TABLE "new_shortlinks" RENAME TO "shortlinks";
CREATE UNIQUE INDEX "shortlinks_code_key" ON "shortlinks"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
