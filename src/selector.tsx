import {
  Module,
  customModule,
  customElements,
  ControlElement,
  Modal,
  Styles,
  GridLayout,
  Control,
  Icon,
  application,
  VStack,
} from '@ijstech/components';
import './selector.css';
import {IPageBlockData} from './interface';
import {setPageBlocks} from './store';
import {ELEMENT_NAME, ELEMENT_TYPE, EVENT} from './const';

const Theme = Styles.Theme.ThemeVars;
const GET_PAGE_BLOCK_URL = `https://data.scom.dev/api/v1/audit/auditedPageBlock?packageType=2`;

interface ScomContentBlockSelectorElement extends ControlElement {}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-content-block-selector']: ScomContentBlockSelectorElement;
    }
  }
}

@customModule
@customElements('i-scom-content-block-selector')
export default class ScomContentBlockSelector extends Module {
  private mdSelector: Modal;
  private firstStack: GridLayout;
  private blockStack: GridLayout;
  private componentsStack: VStack;

  private pageBlocks: IPageBlockData[];
  private onSelectModule: (selectedModule: IPageBlockData) => Promise<void>;

  constructor(parent?: any) {
    super(parent);
  }

  init() {
    this.onSelectModule = this.getAttribute('onSelectModule', true);
    super.init();
    this.renderUI();
  }

  onShow() {
    this.mdSelector.visible = true;
  }

  private onToggleBlock(source: Control) {
    this.blockStack.visible = !this.blockStack.visible;
    const icon = source.querySelector('i-icon') as Icon;
    icon && (icon.name = this.blockStack.visible ? 'angle-up' : 'angle-down');
  }

  private onAddComponent(module: IPageBlockData, type: ELEMENT_TYPE) {
    console.log('onAddComponent: ', {type, module});
    application.EventBus.dispatch(EVENT.ON_ADD_ELEMENT, {type, module});
    this.mdSelector.visible = false;
  }

  private async getModules(category?: string): Promise<IPageBlockData[]> {
    const request = new Request(`${GET_PAGE_BLOCK_URL}${category ? `&categories=${category}` : ''}`);
    const response = await fetch(request);
    let data = (await response.json()) as IPageBlockData[];
    return data;
  }

  private async renderUI() {
    this.pageBlocks = await this.getModules('5');
    setPageBlocks(this.pageBlocks);
    this.renderFirstStack();
    this.renderComponentList();
  }

  private async renderFirstStack() {
    this.firstStack.clearInnerHTML();
    let components = [];
    try {
      const filterdModules = this.pageBlocks.filter(v => {
        return v.name === '@PageBlock/Scom Image' || v.name === '@PageBlock/Markdown Editor';
      });
      for (let module of filterdModules) {
        if (module.name === '@PageBlock/Scom Image') module.name = ELEMENT_NAME.IMAGE;
        else if (module.name === '@PageBlock/Markdown Editor') module.name = ELEMENT_NAME.TEXTBOX;
        components.push(module);
      }
    } catch {
      components = [];
    }
    let matchedModules = components;
    for (const module of matchedModules) {
      const moduleCard = (
        <i-vstack
          class="text-center pointer"
          verticalAlignment="center"
          horizontalAlignment="center"
          minWidth={88}
          height="5rem"
          gap="0.5rem"
          onClick={() => this.onAddComponent(module, ELEMENT_TYPE.PRIMITIVE)}>
          <i-panel>
            <i-image url={module.imgUrl} width={24} height={24} display="block"></i-image>
          </i-panel>
          <i-label caption={module.name}></i-label>
        </i-vstack>
      );
      this.firstStack.append(moduleCard);
    }
  }

  private async renderComponentList(keyword?: string) {
    this.componentsStack.clearInnerHTML();
    let components = [];
    const filterdModules = this.pageBlocks.filter(v => {
      return ['@PageBlock/NFT Minter', '@PageBlock/Gem Token', '@PageBlock/Randomizer'].includes(v.name);
    });
    for (let module of filterdModules) {
      if (module.name === '@PageBlock/NFT Minter') module.name = ELEMENT_NAME.NFT;
      else if (module.name === '@PageBlock/Gem Token') module.name = ELEMENT_NAME.GEM_TOKEN;
      else if (module.name === '@PageBlock/Randomizer') module.name = ELEMENT_NAME.RANDOMIZER;
      components.push(module);
    }
    let matchedModules = components;
    if (keyword) {
      matchedModules = components.filter(v => {
        return (
          v.name.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 ||
          v.description.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
        );
      });
    }
    for (const module of matchedModules) {
      const moduleCard = (
        <i-hstack
          height={48}
          verticalAlignment="center"
          gap="1rem"
          padding={{left: '1rem', right: '1rem'}}
          class="pointer"
          onClick={() => this.onAddComponent(module, ELEMENT_TYPE.PRIMITIVE)}>
          <i-panel>
            <i-image url={module.imgUrl} width={24} height={24} display="block"></i-image>
          </i-panel>
          <i-label caption={module.name} font={{weight: 600}}></i-label>
        </i-hstack>
      );
      this.componentsStack.append(moduleCard);
    }
  }

  render() {
    return (
      <i-modal id={'mdSelector'} class="content-block-selector" maxWidth={600}>
        <i-panel class="navigator" height={'100%'} maxWidth="100%">
          <i-tabs class="insert-tabs">
            <i-tab caption="Components" background={{color: 'transparent'}} font={{name: Theme.typography.fontFamily}}>
              <i-panel height="100%" overflow={{y: 'hidden'}}>
                <i-grid-layout id="firstStack" templateColumns={['repeat(2, 1fr)']} margin={{top: 6}}></i-grid-layout>
                <i-vstack
                  visible={false}
                  border={{
                    bottom: {width: 1, style: 'solid', color: Theme.divider},
                    top: {width: 1, style: 'solid', color: Theme.divider},
                  }}>
                  <i-hstack
                    horizontalAlignment="space-between"
                    verticalAlignment="center"
                    padding={{top: 8, bottom: 8, left: '1.5rem', right: 0}}
                    class="pointer"
                    onClick={source => this.onToggleBlock(source)}>
                    <i-label
                      caption="Content blocks"
                      font={{
                        weight: 600,
                        size: '0.75rem',
                        transform: 'uppercase',
                      }}></i-label>
                    <i-icon name="angle-down" fill={Theme.text.primary} width={24} height={24}></i-icon>
                  </i-hstack>
                  <i-grid-layout
                    id="blockStack"
                    templateColumns={['repeat(2, 1fr)']}
                    gap={{column: 12, row: 12}}
                    border={{
                      bottom: {width: 1, style: 'solid', color: Theme.divider},
                    }}
                    padding={{left: '8px', right: '8px', bottom: '1rem'}}></i-grid-layout>
                </i-vstack>
                <i-vstack id="componentsStack" padding={{top: '8px', bottom: '8px'}}></i-vstack>
              </i-panel>
            </i-tab>
          </i-tabs>
        </i-panel>
      </i-modal>
    );
  }
}
