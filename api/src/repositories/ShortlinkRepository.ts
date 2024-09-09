import prismaClient from "../utils/prismaClient";

interface ShortlinkRequestBody {
    code: string;
    originalUrl: string;
}


class ShortlinkRepository {
    async createShortlink({ originalUrl, code }: ShortlinkRequestBody) {
        const shortlink = await prismaClient.shortLink.create({
            data: {
                originalUrl,
                code,
            }
        });

        return shortlink;
    }

}

const shortlinkRepository = new ShortlinkRepository();
export default shortlinkRepository;