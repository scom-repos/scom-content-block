import {
  Module,
  customModule,
  Styles,
  Panel,
  Label,
  customElements,
  ControlElement,
  Container,
  Control,
  Upload,
  Image,
  Input,
  Link,
  Modal,
} from '@ijstech/components';
import {IContentBlock} from './interface';
import './index.css';
import ScomContentBlockSelector from './selector';

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
export default class ScomContentBlock extends Module {
  private pnlEmpty: Panel;
  private mdSelector: ScomContentBlockSelector;

  defaultEdit: boolean = true;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  readonly onEdit: () => Promise<void>;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    // if (scconfig) setDataFromSCConfig(scconfig);
  }

  init() {
    super.init();
    // this.setTag({width: '100%', height: 'auto'});
  }

  private onOpenSelector() {
    this.mdSelector.onShow();
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

          <i-panel visible={false} class="content-block"></i-panel>
        </i-vstack>
      </i-panel>
    );
  }
}
