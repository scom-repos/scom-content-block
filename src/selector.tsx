import {Module, customModule, customElements, ControlElement, Modal} from '@ijstech/components';
import './selector.css';
import {IPageBlockData} from './interface';
import {setPageBlocks} from './store';

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

  private renderFirstStack() {}

  private renderComponentList() {}

  render() {
    return (
      <i-modal id={'mdSelector'} class="content-block-selector" maxWidth={600}>
        <i-label caption="ABC"></i-label>
      </i-modal>
    );
  }
}
