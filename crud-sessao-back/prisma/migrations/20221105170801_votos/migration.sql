-- CreateTable
CREATE TABLE "Votos" (
    "id" SERIAL NOT NULL,
    "sessao" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "voto" TEXT NOT NULL,

    CONSTRAINT "Votos_pkey" PRIMARY KEY ("id")
);
