import { AnyObject } from './common';
interface ConnectPort {
    name: string;
    onMessage: {
        addListener(callback: (request: AnyObject) => void): void;
    };
    postMessage(obj: AnyObject): void;
}

export interface Runtime {
    onConnect: {
        addListener(callback: (port: ConnectPort) => void): void;
    };
    onMessage: {
        addListener(callback: (obj: AnyObject) => void): void;
    };
    getURL(url: string): string;
    connect(options: { name: string }): ConnectPort;
}
