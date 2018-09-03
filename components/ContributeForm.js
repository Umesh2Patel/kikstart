import React, { Component } from 'react';
import { Button, Form, Input, Message, Image } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: ''})

    const campaign = Campaign(this.props.address);

    try{
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });

      Router.replaceRoute(`/campaigns/${this.props.address}`)

    } catch (err){
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false })
  };

  render(){
    return(
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button loading={this.state.loading} primary>
          Contribute!
        </Button>
        <h3>Contribute ether to {this.props.address}</h3>
        <Image src='https://chart.googleapis.com/chart?cht=qr&chs=350&chl={this.props.address}'
                    size='medium' />

        <label>Point a compatible mobile app to this code to Contribute</label>
      </Form>
    );
  }
}

export default ContributeForm;
