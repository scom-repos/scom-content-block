import {Module, customModule, customElements, ControlElement, Container, IDataSchema, Panel} from '@ijstech/components';
import {PageBlock} from './interface';
import ScomSingleContentBlock from './contentBlock';

import './index.css';

interface ScomContentBlockElement extends ControlElement {}

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

  private contentBlocks: any[] = [0, 0, 0];
  private data = {};
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

  getData() {
    return this.data;
  }

  async setData(value) {
    console.log('------- setData: ', value);
    this.data = value;
  }

  getTag() {
    return this.tag;
  }

  async setTag(value: any) {
    this.tag = value;
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
    for (let i = 0; i < this.contentBlocks.length; i++) {
      // const rowData = pageObject.sections[i];
      const contentBlock = (<i-scom-single-content-block></i-scom-single-content-block>) as ScomSingleContentBlock;

      this.pnlContentBlocks.append(contentBlock);
      // await contentBlock.setData(rowData);
    }
  }

  render() {
    return <i-panel id={'pnlContentBlocks'}></i-panel>;
  }
}
