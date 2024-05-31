import { AnyObject } from "./common"
import { Runtime } from "./runtime";
import {Tabs} from './tabs';
interface Cookies {
    getAll(options: {url:string}, callback: (data:any) => void):void;
}
interface Storage {
    local: {
        get(keyList: string[]): Promise<any>;
        set(obj: AnyObject): Promise<void>;
    }
}

interface WebNavigation {
    onCompleted: {
        addListener():void;
    };
}
interface Chrome {
    cookies: Cookies;
    runtime: Runtime;
    storage: Storage;
    tabs: Tabs;
    webNavigation: WebNavigation;
}

//@ts-ignore
declare const chrome: Chrome;