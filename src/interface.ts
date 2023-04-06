import {IDataSchema} from '@ijstech/components';
import {ELEMENT_TYPE} from './const';

export interface ICommand {
  execute(): void;
  undo(): void;
  redo(): void;
}

export interface IPageBlockAction {
  name: string;
  icon: string;
  command: (builder: any, userInputData: any) => ICommand;
  userInputDataSchema: IDataSchema;
}

export interface PageBlock {
  // Properties
  getActions: () => IPageBlockAction[];
  getData: () => any;
  setData: (data: any) => Promise<void>;
  getTag: () => any;
  setTag: (tag: any) => Promise<void>;
  defaultEdit?: boolean;
  tag?: any;
  validate?: () => boolean;

  // Page Events
  readonly onEdit: () => Promise<void>;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;

  // Page Block Events
  edit: () => Promise<void>;
  confirm: () => Promise<void>;
  discard: () => Promise<void>;
}

export interface IPageBlockData {
  name: string;
  description: string;
  ipfscid?: string;
  imgUrl?: string;
  category?: {
    icon: string;
    idx: string;
    name: string;
  }[];
  chainId?: number;
  packageId?: number;
  projectId?: number;
  local?: boolean;
  localPath?: string;
  dependencies?: any;
}

export interface IContentBlock {
  image: {
    url: string;
    altText?: string;
    backgroundColor?: string;
    link?: string;
  };
  heading: {
    text: string;
    color: string;
    link?: string;
  };
  desc: {
    text: string;
    color: string;
    link?: string;
  };
}

export interface IElementConfig {
  uuid: string;
  module: IPageBlockData;
  type: ELEMENT_TYPE;
}

export interface IPageElement {
  id: string; // uuid
  column: number;
  columnSpan: number;
  type: ELEMENT_TYPE;
  tag?: any;
  properties: any;
  module?: IPageBlockData; // follow the standard defined in secure page, if type === 'primitive'
  elements?: IPageElement[]; // type === 'composite'

  visibleOn?: string;
  invisibleOn?: string;
}
