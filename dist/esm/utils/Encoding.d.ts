import type { Base64Encodable } from '../definitions';
export default class Encoding {
    static blobToDataURL(blob: Blob): Promise<string>;
    static blobToBase64(blob: Blob): Promise<string>;
    static bufferToBase64(buffer: BufferSource): Promise<string>;
    static toURL(url: string): URL | null;
    static fetchUrlToBase64(url: string): Promise<string | null>;
    static toBase64(data: Base64Encodable): Promise<string>;
}
