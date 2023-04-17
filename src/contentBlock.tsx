import {Module, customModule, Panel, customElements, ControlElement, Container, application} from '@ijstech/components';
import {ELEMENT_NAME, EVENT} from './const';
import {IElementConfig, IPageElement} from './interface';
import ScomContentBlockSelector from './selector';
import {getDappContainer, getRootDir} from './store';
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

    // this.addEventListener('mouseenter', e => {
    //   console.log('this.id: ', this.id);
    // });
  }

  initEventBus() {
    application.EventBus.register(this, EVENT.ON_ADD_ELEMENT_CONTENT_BLOCK, (data: IElementConfig) => {
      if (!data || data.uuid !== this.uuid) return;
      this.onAddElement(data);
    });
  }

  private async onAddElement(data: IElementConfig) {
    const {type, module} = data;
    let element: IPageElement = {
      id: generateUUID(),
      column: 1,
      columnSpan: module.category === 'components' ? 12 : 3,
      type,
      module,
      properties: {} as any,
    };
    if (module.path === 'scom-nft-minter' || module.path === 'scom-gem-token') {
      element.module = getDappContainer();
      element.columnSpan = 6;
      element.properties = {
        networks: [43113],
        wallets: ['metamask'],
        content: {
          module: {...module, localPath: `libs/@scom/${module.path}`},
          properties: {
            width: '100%',
          },
        },
      };
    }
    await this.fetchModule(element);
    if (this._component.setData) await this._component.setData(element.properties);
  }

  private async setModule(module: Module, element: IPageElement) {
    this._component = module;
    this._component.parent = this.pnlContentBlock;
    this.pnlContentBlock.append(this._component);
    if (this._component.setRootDir) {
      const rootDir = getRootDir();
      this._component.setRootDir(rootDir);
    }
    if (this._component.ready) await this._component.ready();
    this._component.maxWidth = '100%';
    this._component.maxHeight = '100%';
    this._component.overflow = 'hidden';
    this._component.style.display = 'block';

    const id = this.id;
    application.EventBus.dispatch(EVENT.ON_SET_ACTION_BLOCK, {
      id,
      element,
      actions: this._component.getActions ? this._component.getActions.bind(this._component) : () => [],
    });
    this._component.addEventListener('click', (event: Event) => {
      event.preventDefault();
      application.EventBus.dispatch(EVENT.ON_SET_ACTION_BLOCK, {
        id,
        element,
        actions: this._component.getActions ? this._component.getActions.bind(this._component) : () => [],
      });
    });
    this.pnlEmpty.visible = false;
    this.pnlContentBlock.visible = true;
  }

  async fetchModule(element: IPageElement) {
    console.log('fetchModule: ', element);
    try {
      const module: any = await this.getEmbedElement(element?.module?.path || '');
      if (!module) throw new Error('Element not found');
      await this.setModule(module, element);
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

  getEmbedElement = async (path: string) => {
    application.currentModuleDir = path;
    const result = await application.loadScript(`libs/@scom/${path}/index.js`);
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
