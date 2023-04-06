import {Module, customModule, Panel, customElements, ControlElement, Container, application} from '@ijstech/components';
import {ELEMENT_NAME, EVENT} from './const';
import {IElementConfig, IPageElement} from './interface';
import ScomContentBlockSelector from './selector';
import {getDappContainer} from './store';
import {generateUUID} from './utility';

import './index.css';

interface IGetModuleOptions {
  ipfscid?: string;
  localPath?: string;
}

interface ScomSingleContentBlockElement extends ControlElement {}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-single-content-block']: ScomSingleContentBlockElement;
    }
  }
}

@customModule
@customElements('i-scom-single-content-block')
export default class ScomSingleContentBlock extends Module {
  private pnlEmpty: Panel;
  private pnlContentBlock: Panel;
  private mdSelector: ScomContentBlockSelector;
  private _component: any = null;

  defaultEdit: boolean = true;
  private uuid: string;
  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  init() {
    super.init();
    this.initEventBus();
  }

  initEventBus() {
    application.EventBus.register(this, EVENT.ON_ADD_ELEMENT, (data: IElementConfig) => {
      if (!data || data.uuid !== this.uuid) return;
      this.onAddElement(data);
    });
  }

  private async onAddElement(data: IElementConfig) {
    console.log('onAddElement: ', data);
    const {type, module} = data;
    let element: IPageElement = {
      id: generateUUID(),
      column: 1,
      columnSpan: module.name === ELEMENT_NAME.TEXTBOX ? 12 : 3,
      type,
      module,
      properties: {} as any,
    };
    if (module.name === ELEMENT_NAME.NFT || module.name === ELEMENT_NAME.GEM_TOKEN) {
      element.module = getDappContainer();
      element.columnSpan = 6;
      element.properties = {
        networks: [43113],
        wallets: ['metamask'],
        content: {
          module,
          properties: {
            width: '100%',
          },
        },
      };
    }
    this.fetchModule(element);
  }

  private async setModule(module: Module) {
    this._component = module;
    this._component.parent = this.pnlContentBlock;
    this.pnlContentBlock.append(this._component);
    if (this._component.ready) await this._component.ready();
    this._component.maxWidth = '100%';
    this._component.maxHeight = '100%';
    this._component.overflow = 'hidden';
    this._component.style.display = 'block';
    this._component.addEventListener('click', (event: Event) => {
      event.preventDefault();
      // this.toolList = this._component.getActions ? this._component.getActions() : [];
      // this.checkToolbar();
      // this.showToolbars();
    });
    this.pnlEmpty.visible = false;
    this.pnlContentBlock.visible = true;
  }

  async fetchModule(data: IPageElement) {
    console.log('fetchModule: ', data);
    const ipfscid = data?.module?.ipfscid || '';
    const localPath = data?.module?.localPath || '';
    try {
      const module: any = await this.getEmbedElement({ipfscid, localPath});
      if (!module) throw new Error('Element not found');
      await this.setModule(module);
      // if (this.isTexbox()) {
      //   this.dragStack.visible = true;
      //   this.contentStack.classList.remove('move');
      // } else {
      //   this.dragStack.visible = false;
      //   this.contentStack.classList.add('move');
      // }
      // this.renderResizeStack(data);
    } catch (error) {
      console.log('fetch module error: ', error);
    }
  }

  getEmbedElement = async (options: IGetModuleOptions) => {
    let path: string = '';
    if (options.localPath) {
      path = `${options.localPath}`;
    } else {
      // const response = await fetchFromIPFS(options.ipfscid);
      // const result = await response.json();
      // const codeCID = result.codeCID;
      // path = `${IPFS_GATEWAY_IJS}${codeCID}/dist`;
    }
    application.currentModuleDir = path;
    const result = await application.loadScript(`${path}/dist/index.js`);
    application.currentModuleDir = '';
    if (!result) return null;
    const elementName = `i-${path.split('/').pop()}`;
    const element = document.createElement(elementName);
    return element;
  };

  private onOpenSelector() {
    this.uuid = generateUUID();
    this.mdSelector.onShow(this.uuid);
  }

  render() {
    return (
      <i-panel>
        <i-vstack class="content-block-wrapper">
          <i-panel id={'pnlEmpty'} class="content-block-empty">
            <i-button class="content-block-add-btn" onClick={this.onOpenSelector}>
              <i-icon name="plus"></i-icon>
            </i-button>
            <i-scom-content-block-selector id={'mdSelector'}></i-scom-content-block-selector>
          </i-panel>

          <i-panel id={'pnlContentBlock'} visible={false} class="content-block"></i-panel>
        </i-vstack>
      </i-panel>
    );
  }
}