import {
  Module,
  customModule,
  customElements,
  ControlElement,
  Container,
  IDataSchema,
  Panel,
  application,
} from '@ijstech/components';
import {IContentBlock, IPageBlockData, IPageElement, PageBlock} from './interface';
import ScomSingleContentBlock from './contentBlock';

import './index.css';
import {EVENT} from './const';
import {getRootDir, setPageBlocks, setRootDir} from './store';

interface ScomContentBlockElement extends ControlElement {
  numberOfBlocks?: number;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-content-block']: ScomContentBlockElement;
    }
  }
}

@customModule
@customElements('i-scom-content-block')
export default class ScomContentBlock extends Module implements PageBlock {
  private pnlContentBlocks: Panel;

  private contentBlocks: ScomSingleContentBlock[] = [];
  private activeContentBlock: ScomSingleContentBlock;
  private activeActions: any;
  private isBlockActive: boolean;
  private data: IContentBlock = {
    numberOfBlocks: 3,
    dataProperties: [],
  };

  defaultEdit: boolean = true;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  readonly onEdit: () => Promise<void>;
  validate?: () => boolean;
  edit: () => Promise<void>;
  confirm: () => Promise<void>;
  discard: () => Promise<void>;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    // if (scconfig) setDataFromSCConfig(scconfig);
  }

  init() {
    super.init();
    this.initEventBus();
    this.setPageBlocks();
    this.renderContentBlocks();

    document.addEventListener('click', e => {
      // Clicked outside the content-block
      if (!this.contains(e.target as HTMLElement)) this.resetActions();
    });

    this.pnlContentBlocks.addEventListener('click', e => {
      if (!this.isBlockActive) this.resetActions();
      this.isBlockActive = false;
    });
  }

  initEventBus() {
    application.EventBus.register(
      this,
      EVENT.ON_SET_ACTION_BLOCK,
      (data: {id: string; element: IPageElement; actions: any}) => {
        const {id, element, actions} = data;
        this.activeActions = actions;
        this.isBlockActive = true;
        application.EventBus.dispatch(EVENT.ON_UPDATE_TOOLBAR);
      },
    );
  }

  static async create(options?: ScomContentBlockElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  getData() {
    return this.data;
  }

  async setData(value: IContentBlock) {
    if (!this.checkValidation(value)) return;
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
    } else {
      const initIndex = this.contentBlocks.length;
      for (let i = 0; i < Math.abs(delta); i++) {
        const contentBlock = (
          <i-scom-single-content-block
            id={`single-content-block__${initIndex + i}`}
            onClick={this.setContentBlock}></i-scom-single-content-block>
        ) as ScomSingleContentBlock;
        this.contentBlocks.push(contentBlock);
        this.pnlContentBlocks.append(contentBlock);
      }
    }
    this.data.dataProperties.length = this.data.numberOfBlocks;
  }

  getTag() {
    return this.tag;
  }

  async setTag(value: any) {
    this.tag = value;
  }

  setRootDir(value: string) {
    setRootDir(value || '');
    this.setPageBlocks();
  }

  async setPageBlocks() {
    const pageBlocks = await this.getPageBlocks();
    setPageBlocks(pageBlocks);
  }

  async getPageBlocks() {
    let rootDir = getRootDir();
    let path = rootDir ? rootDir + '/scconfig.json' : 'scconfig.json';
    let pageBlocks: IPageBlockData[] = [];
    try {
      let content = await application.getContent(path);
      let scconfig = JSON.parse(content);
      let components = scconfig?.components || {};
      for (let key in components) {
        pageBlocks.push(components[key]);
      }
    } catch (err) {}
    return pageBlocks;
  }

  checkValidation(value: IContentBlock): boolean {
    return value.numberOfBlocks > 0;
  }

  getActions() {
    if (this.activeActions) return this.activeActions();

    const propertiesSchema: IDataSchema = {
      type: 'object',
      properties: {
        numberOfBlocks: {
          type: 'number',
          default: 3,
          maximum: 10,
        },
      },
    };

    const themeSchema: IDataSchema = {
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

  _getActions(settingSchema: IDataSchema, themeSchema: IDataSchema) {
    const actions = [
      {
        name: 'Settings',
        icon: 'cog',
        command: (builder: any, userInputData: any) => {
          return {
            execute: () => {
              console.log('--------- Settings command: ', builder, userInputData);
              if (builder?.setData) builder.setData(userInputData);
              this.setData({...this.data, ...userInputData});
            },
            undo: () => {
              // if (builder?.setData) builder.setData(this.oldData);
              // this.setData(this.oldData);
            },
            redo: () => {},
          };
        },
        userInputDataSchema: settingSchema as IDataSchema,
      },
    ];
    return actions;
  }

  private setContentBlock(activeContentBlock: any) {
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
      const contentBlock = (
        <i-scom-single-content-block
          id={`single-content-block__${i}`}
          onClick={this.setContentBlock}></i-scom-single-content-block>
      ) as ScomSingleContentBlock;
      this.contentBlocks.push(contentBlock);
      this.pnlContentBlocks.append(contentBlock);
    }
  }

  resetActions() {
    this.activeActions = null;
    if (this.activeContentBlock) this.activeContentBlock.classList.remove('active');
    application.EventBus.dispatch(EVENT.ON_UPDATE_TOOLBAR);
  }

  render() {
    return <i-panel id={'pnlContentBlocks'} class="content-block-pnl"></i-panel>;
  }
}
