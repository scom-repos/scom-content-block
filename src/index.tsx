import {Module, customModule, Styles, Panel, Label, customElements, ControlElement} from '@ijstech/components';
import {IConfig} from './interface';

const Theme = Styles.Theme.ThemeVars;

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
  private pnlCard: Panel;

  private _data: IConfig = {};
  tag: any;

  defaultEdit: boolean = true;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  readonly onEdit: () => Promise<void>;

  getData() {
    return this._data;
  }

  async setData(data: IConfig) {
    this._data = data;
  }

  getTag() {
    return this.tag;
  }

  async setTag(value: any) {
    this.tag = value;
  }

  render() {
    return <i-panel id="pnlBlock"></i-panel>;
  }
}
