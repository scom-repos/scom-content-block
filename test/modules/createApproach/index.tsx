import {Module, customModule, Container, VStack} from '@ijstech/components';
import ScomContentBlock from '@scom/scom-content-block';
@customModule
export default class Module1 extends Module {
  private mainStack: VStack;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  async init() {
    super.init();
    await ScomContentBlock.create(
      {
        width: '33%',
        height: 'auto',
      },
      this.mainStack,
    );
  }

  render() {
    return (
      <i-panel>
        <i-hstack id="mainStack" margin={{top: '1rem', left: '1rem'}} gap="2rem"></i-hstack>
      </i-panel>
    );
  }
}
