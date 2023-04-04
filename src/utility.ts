import {IPFS_GATEWAY, IPFS_GATEWAY_IJS} from './const';

export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const fetchFromIPFS = (cid: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    let response;
    try {
      response = await fetch(IPFS_GATEWAY_IJS + cid);
    } catch (err) {
      response = await fetch(IPFS_GATEWAY + cid);
    }
    resolve(response);
  });
};
