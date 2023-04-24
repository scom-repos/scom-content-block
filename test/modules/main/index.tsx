import {application, Container, customModule, Module, Panel} from '@ijstech/components';
import ContentBlock from '@scom/scom-content-block';

@customModule
export class MainModule extends Module {
  private contentBlock: ContentBlock;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  init() {
    super.init();
    this.contentBlock.setElementId("elm-0");
  }

  render() {
    return (
      <i-panel>
        <i-hstack id="mainStack" margin={{top: '1rem', left: '1rem'}} gap="2rem">
          <i-scom-content-block id={'contentBlock'} width={'33%'} height={'auto'}></i-scom-content-block>
        </i-hstack>
      </i-panel>
    );
  }
}
