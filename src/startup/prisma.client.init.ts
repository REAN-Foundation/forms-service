import { PrismaClient } from "@prisma/client";

export class PrismaClientInit {
    private _prisma: PrismaClient = null;

    private static _instance: PrismaClientInit = null;

    private constructor() {
        this._prisma = new PrismaClient();
    }

    public static instance(): PrismaClientInit {
        return this._instance || (this._instance = new this());
    }

    public getPrismaInstance(): PrismaClient {
        return this._prisma;
    }

}
