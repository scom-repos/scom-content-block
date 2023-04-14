/// <amd-module name="@scom/scom-content-block/const.ts" />
declare module "@scom/scom-content-block/const.ts" {
    export const EVENT: {
        ON_ADD_ELEMENT_CONTENT_BLOCK: string;
        ON_SET_ACTION_BLOCK: string;
        ON_UPDATE_TOOLBAR: string;
    };
    export enum ELEMENT_NAME {
        TEXTBOX = "Text box",
        IMAGE = "Image",
        NFT = "NFT Minter Dapp",
        GEM_TOKEN = "Gem Token Dapp",
        RANDOMIZER = "Randomizer"
    }
    export enum ELEMENT_TYPE {
        PRIMITIVE = "primitive",
        COMPOSITE = "composite"
    }
    export const IPFS_GATEWAY_IJS = "https://ipfs.scom.dev/ipfs/";
    export const IPFS_GATEWAY = "https://ipfs.io/ipfs/";
}
/// <amd-module name="@scom/scom-content-block/interface.ts" />
declare module "@scom/scom-content-block/interface.ts" {
    import { IDataSchema } from '@ijstech/components';
    import { ELEMENT_TYPE } from "@scom/scom-content-block/const.ts";
    export interface ICommand {
        execute(): void;
        undo(): void;
        redo(): void;
    }
    export interface IPageBlockAction {
        name: string;
        icon: string;
        command: (builder: any, userInputData: any) => ICommand;
        userInputDataSchema: IDataSchema;
    }
    export interface PageBlock {
        getActions: () => IPageBlockAction[];
        getData: () => any;
        setData: (data: any) => Promise<void>;
        getTag: () => any;
        setTag: (tag: any) => Promise<void>;
        defaultEdit?: boolean;
        tag?: any;
        validate?: () => boolean;
        readonly onEdit: () => Promise<void>;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        edit: () => Promise<void>;
        confirm: () => Promise<void>;
        discard: () => Promise<void>;
    }
    export interface IPageBlockData {
        name: string;
        path: string;
        category?: "components" | "micro-dapps";
        imgUrl?: string;
        disableClicked?: boolean;
        shownBackdrop?: boolean;
    }
    export interface IContentBlock {
        numberOfBlocks?: number;
    }
    export interface IElementConfig {
        uuid: string;
        module: IPageBlockData;
        type: ELEMENT_TYPE;
    }
    export interface IPageElement {
        id: string;
        column: number;
        columnSpan: number;
        type: ELEMENT_TYPE;
        tag?: any;
        properties: any;
        module?: IPageBlockData;
        elements?: IPageElement[];
        visibleOn?: string;
        invisibleOn?: string;
    }
}
/// <amd-module name="@scom/scom-content-block/selector.css.ts" />
declare module "@scom/scom-content-block/selector.css.ts" { }
/// <amd-module name="@scom/scom-content-block/store.ts" />
declare module "@scom/scom-content-block/store.ts" {
    import { IPageBlockData } from "@scom/scom-content-block/interface.ts";
    export const state: {
        pageBlocks: any[];
        rootDir: string;
    };
    export const setRootDir: (value: string) => void;
    export const getRootDir: () => string;
    export const setPageBlocks: (value: IPageBlockData[]) => void;
    export const getPageBlocks: () => any[];
    export const getDappContainer: () => any;
}
/// <amd-module name="@scom/scom-content-block/selector.tsx" />
declare module "@scom/scom-content-block/selector.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import "@scom/scom-content-block/selector.css.ts";
    interface ScomContentBlockSelectorElement extends ControlElement {
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-content-block-selector']: ScomContentBlockSelectorElement;
            }
        }
    }
    export default class ScomContentBlockSelector extends Module {
        private mdSelector;
        private firstStack;
        private blockStack;
        private componentsStack;
        private pageBlocks;
        private onSelectModule;
        private uuid;
        constructor(parent?: any);
        init(): void;
        onShow(uuid: string): void;
        private onToggleBlock;
        private onAddComponent;
        private getDevPageBlocks;
        private getModules;
        private renderUI;
        private renderFirstStack;
        private renderComponentList;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-content-block/utility.ts" />
declare module "@scom/scom-content-block/utility.ts" {
    export const generateUUID: () => string;
    export const fetchFromIPFS: (cid: string) => Promise<any>;
}
/// <amd-module name="@scom/scom-content-block/index.css.ts" />
declare module "@scom/scom-content-block/index.css.ts" { }
/// <amd-module name="@scom/scom-content-block/contentBlock.tsx" />
declare module "@scom/scom-content-block/contentBlock.tsx" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    import { IPageElement } from "@scom/scom-content-block/interface.ts";
    import "@scom/scom-content-block/index.css.ts";
    interface ScomSingleContentBlockElement extends ControlElement {
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-single-content-block']: ScomSingleContentBlockElement;
            }
        }
    }
    export default class ScomSingleContentBlock extends Module {
        private pnlEmpty;
        private pnlContentBlock;
        private mdSelector;
        private _component;
        defaultEdit: boolean;
        private uuid;
        constructor(parent?: Container, options?: any);
        init(): void;
        initEventBus(): void;
        private onAddElement;
        private setModule;
        fetchModule(data: IPageElement): Promise<void>;
        getEmbedElement: (path: string) => Promise<HTMLElement>;
        private onOpenSelector;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-content-block" />
declare module "@scom/scom-content-block" {
    import { Module, ControlElement, Container, IDataSchema } from '@ijstech/components';
    import { IContentBlock, IPageBlockData, PageBlock } from "@scom/scom-content-block/interface.ts";
    import "@scom/scom-content-block/index.css.ts";
    interface ScomContentBlockElement extends ControlElement {
        numberOfBlocks?: number;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-content-block']: ScomContentBlockElement;
            }
        }
    }
    export default class ScomContentBlock extends Module implements PageBlock {
        private pnlContentBlocks;
        private contentBlocks;
        private activeContentBlock;
        private activeActions;
        private isBlockActive;
        private data;
        defaultEdit: boolean;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        readonly onEdit: () => Promise<void>;
        validate?: () => boolean;
        edit: () => Promise<void>;
        confirm: () => Promise<void>;
        discard: () => Promise<void>;
        constructor(parent?: Container, options?: any);
        init(): void;
        initEventBus(): void;
        static create(options?: ScomContentBlockElement, parent?: Container): Promise<ScomContentBlock>;
        getData(): IContentBlock;
        setData(value: IContentBlock): Promise<void>;
        getTag(): any;
        setTag(value: any): Promise<void>;
        setRootDir(value: string): void;
        setPageBlocks(): Promise<void>;
        getPageBlocks(): Promise<IPageBlockData[]>;
        checkValidation(value: IContentBlock): boolean;
        getActions(): any;
        _getActions(settingSchema: IDataSchema, themeSchema: IDataSchema): {
            name: string;
            icon: string;
            command: (builder: any, userInputData: any) => {
                execute: () => void;
                undo: () => void;
                redo: () => void;
            };
            userInputDataSchema: IDataSchema;
        }[];
        private setContentBlock;
        renderContentBlocks(): Promise<void>;
        resetActions(): void;
        render(): any;
    }
}
