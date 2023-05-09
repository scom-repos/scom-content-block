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
import {IContentBlock, IPageBlockData, IPageElement} from './interface';
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
export default class ScomContentBlock extends Module {
  private pnlContentBlocks: Panel;
  private _elementId: string;
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

    document.addEventListener('click', e => {
      // Clicked outside the content-block
      if (!this.contains(e.target as HTMLElement)) this.resetActions();
    });

    this.pnlContentBlocks.addEventListener('click', e => {
      if (!this.isBlockActive) this.resetActions();
      this.isBlockActive = false;
    });
  }

  private initEventBus() {
    application.EventBus.register(
      this,
      EVENT.ON_SET_ACTION_BLOCK,
      (data: {id: string; element: IPageElement; elementId: string; actions: any}) => {
        const {id, element, elementId, actions} = data;
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

  private getData() {
    return this.data;
  }

  private async setData(value: IContentBlock) {
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
            rootId={this.getElementId()}
            onClick={this.setContentBlock}></i-scom-single-content-block>
        ) as ScomSingleContentBlock;
        this.contentBlocks.push(contentBlock);
        this.pnlContentBlocks.append(contentBlock);
      }
    }
    if (this.data.dataProperties) this.data.dataProperties.length = this.data.numberOfBlocks;
  }

  private getElementId() {
    return this._elementId;
  }

  private setElementId(id: string) {
    this._elementId = id;
    this.renderContentBlocks();
  }

  private getTag() {
    return this.tag;
  }

  private async setTag(value: any) {
    this.tag = value;
  }

  private setRootDir(value: string) {
    setRootDir(value || '');
    this.setPageBlocks();
  }

  private async setPageBlocks() {
    const pageBlocks = await this.getPageBlocks();
    setPageBlocks(pageBlocks);
  }

  private async getPageBlocks() {
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

  private getActions() {
    if (this.activeActions) return this.activeActions();

    const propertiesSchema: IDataSchema = {
      type: 'object',
      properties: {
        numberOfBlocks: {
          type: 'number',
          default: this.data.numberOfBlocks,
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

  private _getActions(settingSchema: IDataSchema, themeSchema: IDataSchema) {
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

  getConfigurators() {
    return [
      {
        name: 'Builder Configurator',
        target: 'Builders',
        getActions: this.getActions.bind(this),
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this),
        getElementId: this.getElementId.bind(this),
        setElementId: this.setElementId.bind(this),
        setRootDir: this.setRootDir.bind(this)
      },
      {
        name: 'Emdedder Configurator',
        target: 'Embedders',
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      }
    ]
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

  private async renderContentBlocks() {
    // this.clearRows();
    for (let i = 0; i < this.data.numberOfBlocks; i++) {
      const contentBlock = (
        <i-scom-single-content-block
          id={`single-content-block__${i}`}
          rootId={this.getElementId()}
          onClick={this.setContentBlock}></i-scom-single-content-block>
      ) as ScomSingleContentBlock;
      this.contentBlocks.push(contentBlock);
      this.pnlContentBlocks.append(contentBlock);
    }
  }

  private resetActions() {
    this.activeActions = null;
    if (this.activeContentBlock) this.activeContentBlock.classList.remove('active');
    application.EventBus.dispatch(EVENT.ON_UPDATE_TOOLBAR);
  }

  render() {
    return <i-panel id={'pnlContentBlocks'} class="content-block-pnl"></i-panel>;
  }
}
