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
import {getPageBlocks} from './store';
import {ELEMENT_NAME, ELEMENT_TYPE, EVENT} from './const';

const Theme = Styles.Theme.ThemeVars;
const GET_PAGE_BLOCK_URL = `https://data.scom.dev/api/v1/audit/auditedPageBlock?packageType=2`;
const SHOW_DEV_PAGEBLOCK = true;

const imageModule: any = {
  description: 'Image (dev)',
  localPath: 'modules/pageblocks/scom-image',
  name: ELEMENT_NAME.IMAGE,
  imgUrl:
    'data:image/png;base64,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',
  local: true,
};

const buttonModule: any = {
  description: 'Button (dev)',
  localPath: 'modules/pageblocks/scom-button',
  name: 'Button',
  imgUrl:
    'data:image/png;base64,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',
  local: true,
};

const nftModule: any = {
  description: 'Nft (dev)',
  localPath: 'modules/pageblocks/scom-nft-minter',
  name: ELEMENT_NAME.NFT,
  imgUrl:
    'data:image/png;base64,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',
  local: true,
};

const gemModule: any = {
  description: 'Gem (dev)',
  localPath: 'modules/pageblocks/scom-gem-token',
  name: ELEMENT_NAME.GEM_TOKEN,
  imgUrl:
    'data:image/png;base64,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',
  local: true,
};

const randomizerModule: any = {
  description: 'Randomizer (dev)',
  localPath: 'modules/pageblocks/scom-randomizer',
  name: ELEMENT_NAME.RANDOMIZER,
  imgUrl:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABmCAYAAABP5VbpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAhcSURBVHgB7Z1bbBRVGMe/MzstEKHFeIlyLVouBiO8yOVBQU2solJ9KERIoIYGBFvaohBQY7dEQwXTbrGRiyUiiQSKCYKiWV4oRgMYMCCXUKxxuUQxPtAWjEB3dzzfbFeWXrYzZ843c3bpLyFs6bZl/z37m3O+cxkGKcKVmpzBmqaXMjBCWaW/fQ4pAoMUoK12zHwDDD9jRg5+bBhGKNMXnT6g+PfzoDhKB3x1fe40A8DPH07v/hnG1gwt6lc5aCUDRh34fBk1PMBCK883DPBnlzZXgoIoFXDcs/xhGWMw2M7Xojb4i/Gr5mdlAkYdRA22Ne5ZBzRmaJFCVbThecDX1o+ZEIVoAHr0rChq+NmzgE0dML2CaVAGRKA2ALRAdumvteARngTcWjuaexa7XfY8K4qXfnY1YImeFcR9bbgS8JWacTk+X/gzkO5ZMfiLDuhaJOBG0KQB/z+8ZeZgQSnc0gZZwG57VhQMWmOscNDS5oNAgPSAex/eqgqNn6UF3OFZPryFl4GI+sM+GP+gAVNHRoEKHHZHo+Hau8tDLSABxwE7Gd5a5dB5DWoO6nAopJkfF0yIwLJpYRg22AAKZPrZUcBttbn5BrAAVbfrYgu/OgZ12N/k6/bz5TzkoskRyOpPF7TTsqhQwNSebbvOoP6ID7bwP/g4GdiKsTVjq6ZD3M+2AnZjeBvkrRVb7aUWe797DHrXvJtk2uC0cD8H7JZFLb0KLzwrimp+7jVg6uEtKqCaB4s6kAU6ecHkWNCEWCqL9hgw9fDWjmdFUcHPXV6ZG55FHSzbk2Hbs6JMzYlC9cx2Um30VBa97RVSD2+x2/Xm3gzHnhXFCz+bAcc8C7w/CxOBAArPioLhLpgc6z/TcUsbrG197gEgrBvg8Lbme53Ms6K44Wcsi2LAJO8X9Kw/mAFnLqsVbGdotcGVITtgrz0rSlwbcoOWGLAb3S5q5GtDUsANJ3xQGVTPs6Jg0PWzbsL4B5xG4zBgWcNbVXHuZ8GA0bPY7fryhPfdLjfAsqjYsFsgYFW7XdRgK/bnhSFvrB0/G/bf21t+uvPCRXBYHzxrX4XpKU+F6AuYGB3SkDmzX4JP6laDKEtK3oPtO74GGaRdCx4xfAis+WA5iFK1dqO0cJG0C/ibrz6F7OxBIMKFi39A1bpNIJO0CnjN+2/BiBFDQAQM98X8IpBN2jh48cI5sHjRXBAF1XDh4p9Jn9N2HWzNwrRHWXoEjN5dueJ1EMWqd3FJQbDJxuiVz/OnvCKyswY58u7JU03SvZtIyge8csUiR96dO68cKNEbbBZs2v4FZXDq3SUlFb161yks+95HydYaUYLe/eXnfSAKepdSDSaGkZqF3Lh3Rfnhx6P04XaQkgE77e/iUNgtUi7glcsXwZxXZ4IoeFGj9m4iKRWwjP7uyVPnwE3IBhpTRkahYKL47GxNow6XWm+NmjBcJ97d990B17ybCFnAh3GB3/Sw8IYV/LrnNmVC241YyE69u+qddeAFpIoo2im+gnI4nwOrzo9NNKJ3X5jxFIiCRRw3vZsIacA4d1ewLVN4Di9vXAQq5z7s2LtehYuQX+SwBZfvETORljUESlaLn0SwfcdeT7ybiCu9CNyGheso7NLvmTU85KEgQsy7H4HXuNZNwxVAu45br3tkTnoD9GGTQBT0bmvbVfAaV/vB/v06nLawnNU39HHoN7kYRMEeg5feTYSdWT3aVrEHL1pO9lb0tp8NvTvglW3Catiw6QtY9S6NGp4dyy+6edaXULVHIaQTbtzrFvzlLGjIhODCG91+vv+MOkferVpLd1HL7g82FwJ6NKOBq95xN2dn0Lu++x4BEdC3qng3Ec9qEVuO6OaC7Tj6Q0878m7VhxuV8W4inhZ7KoMZ5hpj9G6/J94GUdC7GzZvBxXxfFYZh9Mz/h4F2tHNIAoOKFTF84BxGL3j22P80TFIR/pWVxLTFzAxfQET0xcwMbYDLniMchO1umT1EztOrG8blwXKnwxD0RSR060cbkQMnu04wKg1PXcd4cRtTX67+xsRO9PA67xY702XoIdl43xgu3lSijOMkJSBxiw+PW8e25Li2kDPmofdTZF3nSE5zgDPidjflGrHGcT2Jcs9RZDgvIg4qaIN9Kw/r13CzvruMEK+Vc/fk8MfST+rB//D5lvNiBXZ4wtIVAE9Wz+73Vwcc/9AIIExFjBf9bW6MfOjUcPP08gBAlTq1qFnUQdi3S5rMAaNzNDKBi49d+K2ZnX149wKw2CFlEEX7cyEM39505rx/AfcMU8VrOlcxl4bVNLcGP+Xbg6mwxP/IhVW7yMkgtt+Rs/iBcx5t6tHWnirDYTDXQ92Tnq0oq6HdxsGzVlqSHWjbp49QQV61jyDZyLtGWmRSKS8pxOze21CqehntzzL/6pM1EG3zwOLxPxMd7uG05e12GpMh9qIr12gW45ghDQN/AOLJR1vm4jKfvbSs8kQai5XakZP9PlgN6U2cB2bFT9TDG87gzrQmdgt1By9H732s3gZ0RpWPZv0e4BDOnob8yn93Lks6ryM2CstGmP+gSXOb5Mm+UYl9H7GrQWEnsVW67fr2aTfDyTzT11ufiTKAlTaoMKJZ5N+XyCC2s/y6Dq8lQnx7c7oteEAs9vFg60EQty8YR/pjaTsgCdThyPhSlme7eVnuYfX2pDR7bL9M8EDqMuiXeEzCxoru6u4eQ+4jGfTDC75WWh4KxPP53E6gj4gvzXf4Teu7owsP3vh2WQoN+XroCzaomlGmdUyolsot3gB+6WRiD6K/+63WvwS9Kw/EgmPUi1cROlFC72VRamGtzJJicVknf3Mgz3O/ypXxbPJSJnVemZZ1Bcu5XWDkIwyolv8B7V3fJ72FlmKAAAAAElFTkSuQmCC',
  local: true,
};

const textboxModule: any = {
  description: 'Textbox (dev)',
  localPath: 'modules/pageblocks/scom-markdown-editor',
  name: ELEMENT_NAME.TEXTBOX,
  imgUrl:
    'data:image/png;base64,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',
  local: true,
};

const carouselModule: any = {
  description: 'Carousel (dev)',
  localPath: 'modules/pageblocks/scom-carousel',
  name: 'Carousel (dev)',
  imgUrl:
    'data:image/png;base64,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',
  local: true,
};

const firstDevModules = [textboxModule, imageModule, carouselModule];

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
  private uuid: string;

  constructor(parent?: any) {
    super(parent);
  }

  init() {
    this.onSelectModule = this.getAttribute('onSelectModule', true);
    super.init();
  }

  onShow(uuid: string) {
    this.uuid = uuid;
    this.renderUI();
    this.mdSelector.visible = true;
  }

  private onToggleBlock(source: Control) {
    this.blockStack.visible = !this.blockStack.visible;
    const icon = source.querySelector('i-icon') as Icon;
    icon && (icon.name = this.blockStack.visible ? 'angle-up' : 'angle-down');
  }

  private onAddComponent(module: IPageBlockData, type: ELEMENT_TYPE) {
    console.log('onAddComponent: ', {type, module});
    application.EventBus.dispatch(EVENT.ON_ADD_ELEMENT_CONTENT_BLOCK, {type, module, uuid: this.uuid});
    this.mdSelector.visible = false;
  }

  private async getDevPageBlocks(): Promise<IPageBlockData[]> {
    return [...firstDevModules]; // []; // Mikey Test: [...firstDevModules];
  }

  private async getModules(category?: string): Promise<IPageBlockData[]> {
    const request = new Request(`${GET_PAGE_BLOCK_URL}${category ? `&categories=${category}` : ''}`);
    const response = await fetch(request);
    let data = (await response.json()) as IPageBlockData[];
    if (SHOW_DEV_PAGEBLOCK) {
      const devPageblocks: IPageBlockData[] = await this.getDevPageBlocks();
      data = [...data, ...devPageblocks];
    }
    return data;
  }

  private async renderUI() {
    this.pageBlocks = getPageBlocks();
    this.renderFirstStack();
    this.renderComponentList();
  }

  private async renderFirstStack() {
    this.firstStack.clearInnerHTML();
    let components = this.pageBlocks.filter(p => p.category === 'components' && p.path !== 'scom-content-block');
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
            <i-image url={module.imgUrl || "https://ipfs.scom.dev/ipfs/bafkreid4yhtwe3qz7lzvafzzt3q4ssdowzg2rpbrd6xqjanivyd7bkcsiy"} width={24} height={24} display="block"></i-image>
          </i-panel>
          <i-label caption={module.name}></i-label>
        </i-vstack>
      );
      this.firstStack.append(moduleCard);
    }
  }

  private async renderComponentList(keyword?: string) {
    this.componentsStack.clearInnerHTML();
    let components = this.pageBlocks.filter(p => p.category === 'micro-dapps');
    let matchedModules = components;
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
            <i-image url={module.imgUrl || "https://ipfs.scom.dev/ipfs/bafkreid4yhtwe3qz7lzvafzzt3q4ssdowzg2rpbrd6xqjanivyd7bkcsiy"} width={24} height={24} display="block"></i-image>
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
