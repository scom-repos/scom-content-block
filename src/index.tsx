import {Module, customModule, customElements, ControlElement, Container, IDataSchema, Panel} from '@ijstech/components';
import {IContentBlock, PageBlock} from './interface';
import ScomSingleContentBlock from './contentBlock';

import './index.css';

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
  private data: IContentBlock = {
    numberOfBlocks: 3,
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
    this.renderContentBlocks();
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
      for (let i = 0; i < Math.abs(delta); i++) {
        const contentBlock = (<i-scom-single-content-block></i-scom-single-content-block>) as ScomSingleContentBlock;
        this.contentBlocks.push(contentBlock);
        this.pnlContentBlocks.append(contentBlock);
      }
    }
  }

  getTag() {
    return this.tag;
  }

  async setTag(value: any) {
    this.tag = value;
  }

  checkValidation(value: IContentBlock): boolean {
    return value.numberOfBlocks > 0;
  }

  getActions() {
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
              if (builder?.setData) builder.setData(userInputData);
              this.setData(userInputData);
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

  async renderContentBlocks() {
    // this.clearRows();
    for (let i = 0; i < this.data.numberOfBlocks; i++) {
      const contentBlock = (<i-scom-single-content-block></i-scom-single-content-block>) as ScomSingleContentBlock;
      this.contentBlocks.push(contentBlock);
      this.pnlContentBlocks.append(contentBlock);
    }
  }

  render() {
    return <i-panel id={'pnlContentBlocks'}></i-panel>;
  }
}
