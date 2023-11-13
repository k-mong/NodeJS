// prismaClient 객체를 생성을 하면 index.js에서 prisma 객체를 갖고 옴
import { PrismaClient } from "@babel/client";

const prisma = new PrismaClient();

export default prisma;