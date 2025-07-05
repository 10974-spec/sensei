import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || PrismaClient();

if(process.env.NODE_ENV!=="production"){
    globalThis.prisma=db;
}

