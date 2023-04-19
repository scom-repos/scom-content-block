var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-content-block/const.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IPFS_GATEWAY = exports.IPFS_GATEWAY_IJS = exports.ELEMENT_TYPE = exports.ELEMENT_NAME = exports.EVENT = void 0;
    ///<amd-module name='@scom/scom-content-block/const.ts'/> 
    exports.EVENT = {
        ON_ADD_ELEMENT_CONTENT_BLOCK: 'ON_ADD_ELEMENT_CONTENT_BLOCK',
        ON_SET_ACTION_BLOCK: 'ON_SET_ACTION_BLOCK',
        ON_UPDATE_TOOLBAR: 'ON_UPDATE_TOOLBAR'
    };
    var ELEMENT_NAME;
    (function (ELEMENT_NAME) {
        ELEMENT_NAME["TEXTBOX"] = "Text box";
        ELEMENT_NAME["IMAGE"] = "Image";
        ELEMENT_NAME["NFT"] = "NFT Minter Dapp";
        ELEMENT_NAME["GEM_TOKEN"] = "Gem Token Dapp";
        ELEMENT_NAME["RANDOMIZER"] = "Randomizer";
    })(ELEMENT_NAME = exports.ELEMENT_NAME || (exports.ELEMENT_NAME = {}));
    var ELEMENT_TYPE;
    (function (ELEMENT_TYPE) {
        ELEMENT_TYPE["PRIMITIVE"] = "primitive";
        ELEMENT_TYPE["COMPOSITE"] = "composite";
    })(ELEMENT_TYPE = exports.ELEMENT_TYPE || (exports.ELEMENT_TYPE = {}));
    exports.IPFS_GATEWAY_IJS = 'https://ipfs.scom.dev/ipfs/';
    exports.IPFS_GATEWAY = 'https://ipfs.io/ipfs/';
});
define("@scom/scom-content-block/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-content-block/selector.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_1.Styles.Theme.ThemeVars;
    components_1.Styles.cssRule('i-scom-content-block-selector', {
        $nest: {},
    });
});
define("@scom/scom-content-block/store.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getDappContainer = exports.getPageBlocks = exports.setPageBlocks = exports.getRootDir = exports.setRootDir = exports.state = void 0;
    exports.state = {
        pageBlocks: [],
        rootDir: '',
    };
    const setRootDir = (value) => {
        exports.state.rootDir = value || "";
    };
    exports.setRootDir = setRootDir;
    const getRootDir = () => {
        return exports.state.rootDir;
    };
    exports.getRootDir = getRootDir;
    const setPageBlocks = (value) => {
        exports.state.pageBlocks = value || [];
    };
    exports.setPageBlocks = setPageBlocks;
    const getPageBlocks = () => {
        return exports.state.pageBlocks || [];
    };
    exports.getPageBlocks = getPageBlocks;
    const getDappContainer = () => {
        return (exports.state.pageBlocks || []).find(pageblock => pageblock.path === 'scom-dapp-container');
    };
    exports.getDappContainer = getDappContainer;
});
define("@scom/scom-content-block/selector.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-content-block/store.ts", "@scom/scom-content-block/const.ts", "@scom/scom-content-block/selector.css.ts"], function (require, exports, components_2, store_1, const_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_2.Styles.Theme.ThemeVars;
    const GET_PAGE_BLOCK_URL = `https://data.scom.dev/api/v1/audit/auditedPageBlock?packageType=2`;
    const SHOW_DEV_PAGEBLOCK = true;
    const imageModule = {
        description: 'Image (dev)',
        localPath: 'modules/pageblocks/scom-image',
        name: const_1.ELEMENT_NAME.IMAGE,
        imgUrl: 'data:image/png;base64,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',
        local: true,
    };
    const buttonModule = {
        description: 'Button (dev)',
        localPath: 'modules/pageblocks/scom-button',
        name: 'Button',
        imgUrl: 'data:image/png;base64,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',
        local: true,
    };
    const nftModule = {
        description: 'Nft (dev)',
        localPath: 'modules/pageblocks/scom-nft-minter',
        name: const_1.ELEMENT_NAME.NFT,
        imgUrl: 'data:image/png;base64,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',
        local: true,
    };
    const gemModule = {
        description: 'Gem (dev)',
        localPath: 'modules/pageblocks/scom-gem-token',
        name: const_1.ELEMENT_NAME.GEM_TOKEN,
        imgUrl: 'data:image/png;base64,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',
        local: true,
    };
    const randomizerModule = {
        description: 'Randomizer (dev)',
        localPath: 'modules/pageblocks/scom-randomizer',
        name: const_1.ELEMENT_NAME.RANDOMIZER,
        imgUrl: 'data:image/png;base64,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',
        local: true,
    };
    const textboxModule = {
        description: 'Textbox (dev)',
        localPath: 'modules/pageblocks/scom-markdown-editor',
        name: const_1.ELEMENT_NAME.TEXTBOX,
        imgUrl: 'data:image/png;base64,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',
        local: true,
    };
    const carouselModule = {
        description: 'Carousel (dev)',
        localPath: 'modules/pageblocks/scom-carousel',
        name: 'Carousel (dev)',
        imgUrl: 'data:image/png;base64,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',
        local: true,
    };
    const firstDevModules = [textboxModule, imageModule, carouselModule];
    let ScomContentBlockSelector = class ScomContentBlockSelector extends components_2.Module {
        constructor(parent) {
            super(parent);
        }
        init() {
            this.onSelectModule = this.getAttribute('onSelectModule', true);
            super.init();
        }
        onShow(uuid) {
            this.uuid = uuid;
            this.renderUI();
            this.mdSelector.visible = true;
        }
        onToggleBlock(source) {
            this.blockStack.visible = !this.blockStack.visible;
            const icon = source.querySelector('i-icon');
            icon && (icon.name = this.blockStack.visible ? 'angle-up' : 'angle-down');
        }
        onAddComponent(module, type) {
            console.log('onAddComponent: ', { type, module });
            components_2.application.EventBus.dispatch(const_1.EVENT.ON_ADD_ELEMENT_CONTENT_BLOCK, { type, module, uuid: this.uuid });
            this.mdSelector.visible = false;
        }
        async getDevPageBlocks() {
            return [...firstDevModules]; // []; // Mikey Test: [...firstDevModules];
        }
        async getModules(category) {
            const request = new Request(`${GET_PAGE_BLOCK_URL}${category ? `&categories=${category}` : ''}`);
            const response = await fetch(request);
            let data = (await response.json());
            if (SHOW_DEV_PAGEBLOCK) {
                const devPageblocks = await this.getDevPageBlocks();
                data = [...data, ...devPageblocks];
            }
            return data;
        }
        async renderUI() {
            this.pageBlocks = store_1.getPageBlocks();
            this.renderFirstStack();
            this.renderComponentList();
        }
        async renderFirstStack() {
            this.firstStack.clearInnerHTML();
            let components = this.pageBlocks.filter(p => p.category === 'components' && p.path !== 'scom-content-block');
            let matchedModules = components;
            for (const module of matchedModules) {
                const moduleCard = (this.$render("i-vstack", { class: "text-center pointer", verticalAlignment: "center", horizontalAlignment: "center", minWidth: 88, height: "5rem", gap: "0.5rem", onClick: () => this.onAddComponent(module, const_1.ELEMENT_TYPE.PRIMITIVE) },
                    this.$render("i-panel", null,
                        this.$render("i-image", { url: module.imgUrl || "https://ipfs.scom.dev/ipfs/bafkreid4yhtwe3qz7lzvafzzt3q4ssdowzg2rpbrd6xqjanivyd7bkcsiy", width: 24, height: 24, display: "block" })),
                    this.$render("i-label", { caption: module.name })));
                this.firstStack.append(moduleCard);
            }
        }
        async renderComponentList(keyword) {
            this.componentsStack.clearInnerHTML();
            let components = this.pageBlocks.filter(p => p.category === 'micro-dapps');
            let matchedModules = components;
            for (const module of matchedModules) {
                const moduleCard = (this.$render("i-hstack", { height: 48, verticalAlignment: "center", gap: "1rem", padding: { left: '1rem', right: '1rem' }, class: "pointer", onClick: () => this.onAddComponent(module, const_1.ELEMENT_TYPE.PRIMITIVE) },
                    this.$render("i-panel", null,
                        this.$render("i-image", { url: module.imgUrl || "https://ipfs.scom.dev/ipfs/bafkreid4yhtwe3qz7lzvafzzt3q4ssdowzg2rpbrd6xqjanivyd7bkcsiy", width: 24, height: 24, display: "block" })),
                    this.$render("i-label", { caption: module.name, font: { weight: 600 } })));
                this.componentsStack.append(moduleCard);
            }
        }
        render() {
            return (this.$render("i-modal", { id: 'mdSelector', class: "content-block-selector", maxWidth: 600 },
                this.$render("i-panel", { class: "navigator", height: '100%', maxWidth: "100%" },
                    this.$render("i-tabs", { class: "insert-tabs" },
                        this.$render("i-tab", { caption: "Components", background: { color: 'transparent' }, font: { name: Theme.typography.fontFamily } },
                            this.$render("i-panel", { height: "100%", overflow: { y: 'hidden' } },
                                this.$render("i-grid-layout", { id: "firstStack", templateColumns: ['repeat(2, 1fr)'], margin: { top: 6 } }),
                                this.$render("i-vstack", { visible: false, border: {
                                        bottom: { width: 1, style: 'solid', color: Theme.divider },
                                        top: { width: 1, style: 'solid', color: Theme.divider },
                                    } },
                                    this.$render("i-hstack", { horizontalAlignment: "space-between", verticalAlignment: "center", padding: { top: 8, bottom: 8, left: '1.5rem', right: 0 }, class: "pointer", onClick: source => this.onToggleBlock(source) },
                                        this.$render("i-label", { caption: "Content blocks", font: {
                                                weight: 600,
                                                size: '0.75rem',
                                                transform: 'uppercase',
                                            } }),
                                        this.$render("i-icon", { name: "angle-down", fill: Theme.text.primary, width: 24, height: 24 })),
                                    this.$render("i-grid-layout", { id: "blockStack", templateColumns: ['repeat(2, 1fr)'], gap: { column: 12, row: 12 }, border: {
                                            bottom: { width: 1, style: 'solid', color: Theme.divider },
                                        }, padding: { left: '8px', right: '8px', bottom: '1rem' } })),
                                this.$render("i-vstack", { id: "componentsStack", padding: { top: '8px', bottom: '8px' } })))))));
        }
    };
    ScomContentBlockSelector = __decorate([
        components_2.customModule,
        components_2.customElements('i-scom-content-block-selector')
    ], ScomContentBlockSelector);
    exports.default = ScomContentBlockSelector;
});
define("@scom/scom-content-block/utility.ts", ["require", "exports", "@scom/scom-content-block/const.ts"], function (require, exports, const_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fetchFromIPFS = exports.generateUUID = void 0;
    const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    };
    exports.generateUUID = generateUUID;
    const fetchFromIPFS = (cid) => {
        return new Promise(async (resolve, reject) => {
            let response;
            try {
                response = await fetch(const_2.IPFS_GATEWAY_IJS + cid);
            }
            catch (err) {
                response = await fetch(const_2.IPFS_GATEWAY + cid);
            }
            resolve(response);
        });
    };
    exports.fetchFromIPFS = fetchFromIPFS;
});
define("@scom/scom-content-block/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_3.Styles.Theme.ThemeVars;
    components_3.Styles.cssRule('i-scom-content-block', {
        $nest: {
            '.content-block-pnl': {
                paddingLeft: '3.75%',
                paddingRight: '3.75%',
            },
            'i-scom-single-content-block.active': {
                $nest: {
                    '.content-block-wrapper': {
                        border: `2px solid ${Theme.colors.primary.main}`,
                    },
                },
            },
            '.content-block-wrapper': {
                position: 'relative',
                width: '100%',
            },
            '.content-block-empty': {
                minHeight: '120px',
                backgroundColor: 'rgba(0,0,0,.03)',
                outline: '2px dashed rgba(0,0,0,.1)',
                $nest: {
                    '.content-block-add-btn': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        color: 'rgb(32,33,36)',
                        gap: 0,
                        transition: 'all .28s cubic-bezier(.4,0,.2,1)',
                        boxShadow: '0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15)',
                        zIndex: 10,
                        $nest: {
                            '&:hover': {
                                backgroundColor: 'hsl(217.4157303371,100%,83.5245901639%)',
                                boxShadow: '0 2px 3px 0 rgba(60,64,67,.3), 0 6px 10px 4px rgba(60,64,67,.15)',
                                $nest: {
                                    'i-icon': {
                                        fill: 'rgb(66,133,244)!important',
                                    },
                                },
                            },
                            'i-icon': {
                                width: 14,
                                height: 14,
                            },
                        },
                    },
                },
            },
        },
    });
});
define("@scom/scom-content-block/contentBlock.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-content-block/const.ts", "@scom/scom-content-block/store.ts", "@scom/scom-content-block/utility.ts", "@scom/scom-content-block/index.css.ts"], function (require, exports, components_4, const_3, store_2, utility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ScomSingleContentBlock = class ScomSingleContentBlock extends components_4.Module {
        constructor(parent, options) {
            super(parent, options);
            this._component = null;
            this.defaultEdit = true;
            this.getEmbedElement = async (path) => {
                components_4.application.currentModuleDir = path;
                const result = await components_4.application.loadScript(`libs/@scom/${path}/index.js`);
                components_4.application.currentModuleDir = '';
                if (!result)
                    return null;
                const elementName = `i-${path.split('/').pop()}`;
                const element = document.createElement(elementName);
                return element;
            };
        }
        init() {
            super.init();
            this.initEventBus();
            // this.addEventListener('mouseenter', e => {
            //   console.log('this.id: ', this.id);
            // });
        }
        initEventBus() {
            components_4.application.EventBus.register(this, const_3.EVENT.ON_ADD_ELEMENT_CONTENT_BLOCK, (data) => {
                if (!data || data.uuid !== this.uuid)
                    return;
                this.onAddElement(data);
            });
        }
        async onAddElement(data) {
            const { type, module } = data;
            let element = {
                id: utility_1.generateUUID(),
                column: 1,
                columnSpan: module.category === 'components' ? 12 : 3,
                type,
                module,
                properties: {},
            };
            if (module.path === 'scom-nft-minter' || module.path === 'scom-gem-token') {
                element.module = store_2.getDappContainer();
                element.columnSpan = 6;
                element.properties = {
                    networks: [43113],
                    wallets: ['metamask'],
                    content: {
                        module: Object.assign(Object.assign({}, module), { localPath: `libs/@scom/${module.path}` }),
                        properties: {
                            width: '100%',
                        },
                    },
                };
            }
            await this.fetchModule(element, true);
        }
        async setModule(module, element, setActions = false) {
            this._component = module;
            this._component.parent = this.pnlContentBlock;
            this.pnlContentBlock.append(this._component);
            if (this._component.setRootDir) {
                const rootDir = store_2.getRootDir();
                this._component.setRootDir(rootDir);
            }
            if (this._component.ready)
                await this._component.ready();
            this._component.maxWidth = '100%';
            this._component.maxHeight = '100%';
            this._component.overflow = 'hidden';
            this._component.style.display = 'block';
            const id = this.id;
            if (setActions)
                components_4.application.EventBus.dispatch(const_3.EVENT.ON_SET_ACTION_BLOCK, {
                    id,
                    element,
                    actions: this._component.getActions ? this._component.getActions.bind(this._component) : () => [],
                });
            this._component.addEventListener('click', (event) => {
                event.preventDefault();
                components_4.application.EventBus.dispatch(const_3.EVENT.ON_SET_ACTION_BLOCK, {
                    id,
                    element,
                    actions: this._component.getActions ? this._component.getActions.bind(this._component) : () => [],
                });
            });
            this.pnlEmpty.visible = false;
            this.pnlContentBlock.visible = true;
        }
        async fetchModule(element, setActions = false) {
            var _a;
            console.log('fetchModule: ', element);
            try {
                const module = await this.getEmbedElement(((_a = element === null || element === void 0 ? void 0 : element.module) === null || _a === void 0 ? void 0 : _a.path) || '');
                if (!module)
                    throw new Error('Element not found');
                await this.setModule(module, element, setActions);
                if (this._component.setData)
                    await this._component.setData(element.properties);
                // if (this.isTexbox()) {
                //   this.dragStack.visible = true;
                //   this.contentStack.classList.remove('move');
                // } else {
                //   this.dragStack.visible = false;
                //   this.contentStack.classList.add('move');
                // }
                // this.renderResizeStack(data);
            }
            catch (error) {
                console.log('fetch module error: ', error);
            }
        }
        onOpenSelector() {
            this.uuid = utility_1.generateUUID();
            this.mdSelector.onShow(this.uuid);
        }
        render() {
            return (this.$render("i-panel", null,
                this.$render("i-vstack", { class: "content-block-wrapper" },
                    this.$render("i-panel", { id: 'pnlEmpty', class: "content-block-empty" },
                        this.$render("i-button", { class: "content-block-add-btn", onClick: this.onOpenSelector },
                            this.$render("i-icon", { name: "plus" })),
                        this.$render("i-scom-content-block-selector", { id: 'mdSelector' })),
                    this.$render("i-panel", { id: 'pnlContentBlock', visible: false, class: "content-block" }))));
        }
    };
    ScomSingleContentBlock = __decorate([
        components_4.customModule,
        components_4.customElements('i-scom-single-content-block')
    ], ScomSingleContentBlock);
    exports.default = ScomSingleContentBlock;
});
define("@scom/scom-content-block", ["require", "exports", "@ijstech/components", "@scom/scom-content-block/const.ts", "@scom/scom-content-block/store.ts", "@scom/scom-content-block/index.css.ts"], function (require, exports, components_5, const_4, store_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ScomContentBlock = class ScomContentBlock extends components_5.Module {
        constructor(parent, options) {
            super(parent, options);
            this.contentBlocks = [];
            this.data = {
                numberOfBlocks: 3,
                dataProperties: [],
            };
            this.defaultEdit = true;
            // if (scconfig) setDataFromSCConfig(scconfig);
        }
        init() {
            super.init();
            this.initEventBus();
            this.setPageBlocks();
            this.renderContentBlocks();
            document.addEventListener('click', e => {
                // Clicked outside the content-block
                if (!this.contains(e.target))
                    this.resetActions();
            });
            this.pnlContentBlocks.addEventListener('click', e => {
                if (!this.isBlockActive)
                    this.resetActions();
                this.isBlockActive = false;
            });
        }
        initEventBus() {
            components_5.application.EventBus.register(this, const_4.EVENT.ON_SET_ACTION_BLOCK, (data) => {
                const { id, element, actions } = data;
                this.activeActions = actions;
                this.isBlockActive = true;
                components_5.application.EventBus.dispatch(const_4.EVENT.ON_UPDATE_TOOLBAR);
            });
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        getData() {
            return this.data;
        }
        async setData(value) {
            if (!this.checkValidation(value))
                return;
            this.data = value;
            let delta = this.contentBlocks.length - this.data.numberOfBlocks;
            if (delta > 0) {
                for (let i = this.contentBlocks.length - 1; i >= 0; i--) {
                    if (delta > 0) {
                        delta--;
                        this.pnlContentBlocks.removeChild(this.contentBlocks[i]);
                        this.contentBlocks.splice(i, 1);
                    }
                }
            }
            else {
                const initIndex = this.contentBlocks.length;
                for (let i = 0; i < Math.abs(delta); i++) {
                    const contentBlock = (this.$render("i-scom-single-content-block", { id: `single-content-block__${initIndex + i}`, onClick: this.setContentBlock }));
                    this.contentBlocks.push(contentBlock);
                    this.pnlContentBlocks.append(contentBlock);
                }
            }
            this.data.dataProperties.length = this.data.numberOfBlocks;
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            this.tag = value;
        }
        setRootDir(value) {
            store_3.setRootDir(value || '');
            this.setPageBlocks();
        }
        async setPageBlocks() {
            const pageBlocks = await this.getPageBlocks();
            store_3.setPageBlocks(pageBlocks);
        }
        async getPageBlocks() {
            let rootDir = store_3.getRootDir();
            let path = rootDir ? rootDir + '/scconfig.json' : 'scconfig.json';
            let pageBlocks = [];
            try {
                let content = await components_5.application.getContent(path);
                let scconfig = JSON.parse(content);
                let components = (scconfig === null || scconfig === void 0 ? void 0 : scconfig.components) || {};
                for (let key in components) {
                    pageBlocks.push(components[key]);
                }
            }
            catch (err) { }
            return pageBlocks;
        }
        checkValidation(value) {
            return value.numberOfBlocks > 0;
        }
        getActions() {
            if (this.activeActions)
                return this.activeActions();
            const propertiesSchema = {
                type: 'object',
                properties: {
                    numberOfBlocks: {
                        type: 'number',
                        default: 3,
                        maximum: 10,
                    },
                },
            };
            const themeSchema = {
                type: 'object',
                properties: {
                    backgroundColor: {
                        type: 'string',
                        format: 'color',
                    },
                    width: {
                        type: 'string',
                    },
                    height: {
                        type: 'string',
                    },
                },
            };
            return this._getActions(propertiesSchema, themeSchema);
        }
        _getActions(settingSchema, themeSchema) {
            const actions = [
                {
                    name: 'Settings',
                    icon: 'cog',
                    command: (builder, userInputData) => {
                        return {
                            execute: () => {
                                console.log('--------- Settings command: ', builder, userInputData);
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(userInputData);
                                this.setData(Object.assign(Object.assign({}, this.data), userInputData));
                            },
                            undo: () => {
                                // if (builder?.setData) builder.setData(this.oldData);
                                // this.setData(this.oldData);
                            },
                            redo: () => { },
                        };
                    },
                    userInputDataSchema: settingSchema,
                },
            ];
            return actions;
        }
        setContentBlock(activeContentBlock) {
            this.activeContentBlock = activeContentBlock;
            const contentBlocks = document.querySelectorAll('i-scom-single-content-block');
            if (contentBlocks) {
                for (const contentBlock of contentBlocks) {
                    contentBlock.classList.remove('active');
                }
                activeContentBlock.classList.add('active');
            }
        }
        async renderContentBlocks() {
            // this.clearRows();
            for (let i = 0; i < this.data.numberOfBlocks; i++) {
                const contentBlock = (this.$render("i-scom-single-content-block", { id: `single-content-block__${i}`, onClick: this.setContentBlock }));
                this.contentBlocks.push(contentBlock);
                this.pnlContentBlocks.append(contentBlock);
            }
        }
        resetActions() {
            this.activeActions = null;
            if (this.activeContentBlock)
                this.activeContentBlock.classList.remove('active');
            components_5.application.EventBus.dispatch(const_4.EVENT.ON_UPDATE_TOOLBAR);
        }
        render() {
            return this.$render("i-panel", { id: 'pnlContentBlocks', class: "content-block-pnl" });
        }
    };
    ScomContentBlock = __decorate([
        components_5.customModule,
        components_5.customElements('i-scom-content-block')
    ], ScomContentBlock);
    exports.default = ScomContentBlock;
});
