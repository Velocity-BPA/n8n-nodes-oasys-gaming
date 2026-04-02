import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class OasysGamingApi implements ICredentialType {
	name = 'oasysGamingApi';
	displayName = 'Oasys Gaming API';
	documentationUrl = 'https://docs.oasys.games/docs/verse-developer/rpc-endpoint';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'API key for premium Oasys Gaming RPC endpoints',
			required: false,
		},
		{
			displayName: 'RPC URL',
			name: 'rpcUrl',
			type: 'string',
			default: 'https://rpc.mainnet.oasys.games',
			description: 'Base URL for Oasys Gaming RPC endpoint',
			required: true,
		},
	];
}