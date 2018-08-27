const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('Web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

const compileFactory = require('../ethereum/build/CampaignFactory.json');
const compileCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compileFactory.interface))
    .deploy({ data: compileFactory.bytecode})
    .send({ from: accounts[0], gas: '1000000' });

  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(compileCampaign.interface),
    campaignAddress
  );
});

describe('*******campaign  Test Cases**************', () => {
  it('1. deploys a factory and a campaign', ()=> {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('2. marks caller as the campaign manager', async ()=> {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it('3. allows people to contribute money and marks them as approvers', async ()=> {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1]
    });
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it('4. requires a minimum contribution', async ()=> {
    try{
      await campaign.methods.contribute().send({
        value: '5',
        from: accounts[1]
      });
      assert(false);
    } catch (err){
      assert(err);
    }
  });

  it('5. allows a manager to make a payment request', async ()=> {
      await campaign.methods
        .createRequest('Buy batteries', '100', accounts[1])
        .send({
            from: accounts[0],
            gas: '1000000'
        });
      const request = await campaign.methods.requests(0).call();

      assert.equal('Buy batteries', request.description);
    });

  it('6. processes requests', async ()=> {
    await campaign.methods.contribute().send({
      value: web3.utils.toWei('10', 'ether'),
      from: accounts[0]
    });

    await campaign.methods
      .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({
          from: accounts[0],
          gas: '1000000'
      });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, 'ether');
    balance = parseFloat(balance);
    console.log(balance);
    assert(balance > 104);
    });

});
