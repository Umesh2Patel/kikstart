import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  // '0x8861CCB42Bd77fdC8cE55952c5A18b9abd11f554'
  '0xBaFc7D6011DcE80AD06ef67287e435645a74Dd4a'
);

export default instance;
