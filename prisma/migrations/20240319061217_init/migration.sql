-- CreateTable
CREATE TABLE "Snippet" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "stdIn" TEXT,

    CONSTRAINT "Snippet_pkey" PRIMARY KEY ("id")
);
