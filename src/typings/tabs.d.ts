import { AnyObject } from './common';

interface TabItem {
    id: number;
}

export interface Tabs {
    create(): void;
    update(id: number, options: { url: string }): void;
    query(options: { active: boolean; currentWindow: boolean }): Promise<TabItem[]>;
    sendMessage(id: number, obj: AnyObject): void;
}
