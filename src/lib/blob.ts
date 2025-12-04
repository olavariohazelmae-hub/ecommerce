import { put } from "@vercel/blob";
import { nanoid } from "nanoid";

export async function uploadImage({
    file,
    contentType,
}: {
    file: Buffer;
    contentType: string;
}) {
    const filename = `${nanoid()}.${contentType.split("/")[1]}`;
    const blob = await put(filename, file, {
        contentType,
        access: "public",
    });

    return blob;
}
