-- CreateTable
CREATE TABLE "Politico" (
    "idPolitico" SERIAL NOT NULL,
    "nomePolitico" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Politico_pkey" PRIMARY KEY ("idPolitico")
);

-- CreateIndex
CREATE UNIQUE INDEX "Politico_nomePolitico_key" ON "Politico"("nomePolitico");
