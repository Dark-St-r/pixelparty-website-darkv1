import {compress, decompress} from 'lzutf8';

export class StorageManager {

    static setStorageData(key, data) {
        localStorage.setItem(key, compress(data, { outputEncoding: "Base64" }));
    }

    static getStorageData(key, default_value) {
        let value = localStorage.getItem(key) || default_value;
        if (value != default_value) {
            return decompress(value, { inputEncoding: "Base64" });
        }
        return value;
    }

    static compress(data) {
        return compress(data, { outputEncoding: "Base64" });
    }

    static decompressB64(data) {
        return decompress(data, { inputEncoding: "Base64" });
    }
}