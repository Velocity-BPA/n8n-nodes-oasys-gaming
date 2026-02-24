import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class OasysGamingApi implements ICredentialType {
	name = 'oasysGamingApi';
	displayName = 'Oasys Gaming API';
	documentationUrl = 'https://docs.oasys.games/';
	properties: INodeProperties[] = [
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			options: [
				{
					name: 'Mainnet',
					value: 'mainnet',
				},
				{
					name: 'Testnet',
					value: 'testnet',
				},
			],
			default: 'mainnet',
			required: true,
			description: 'Choose the Oasys network environment',
		},
		{
			displayName: 'RPC URL',
			name: 'rpcUrl',
			type: 'string',
			default: 'https://rpc.mainnet.oasys.games',
			required: true,
			description: 'The RPC endpoint URL for Oasys network',
		},
		{
			displayName: 'Private Key',
			name: 'privateKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Private key for signing transactions on Oasys network',
		},
		{
			displayName: 'Wallet Address',
			name: 'walletAddress',
			type: 'string',
			default: '',
			required: true,
			description: 'The wallet address associated with the private key',
		},
	];
}