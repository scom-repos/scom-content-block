import {Module, customModule, Container, VStack} from '@ijstech/components';
import ScomContentBlock from '@scom/scom-content-block';
@customModule
export default class Module1 extends Module {
  private contentBlockEl: ScomContentBlock;
  private mainStack: VStack;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  async init() {
    super.init();
    // this.contentBlockEl = await ScomContentBlock.create({
    //   width: 300,
    //   height: 200,
    // });
    // this.mainStack.appendChild(this.contentBlockEl);
  }

  render() {
    return (
      <i-panel>
        <i-hstack id="mainStack" margin={{top: '1rem', left: '1rem'}} gap="2rem">
          <i-scom-content-block width={200} height={300}></i-scom-content-block>
        </i-hstack>
      </i-panel>
    );
  }
}
