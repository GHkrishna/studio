export enum IssueCredential {
	proposalSent = 'proposal-sent',
	proposalReceived = 'proposal-received',
	offerSent = 'offer-sent',
	offerReceived = 'offer-received',
	declined = 'decliend',
	requestSent = 'request-sent',
	requestReceived = 'request-received',
	credentialIssued = 'credential-issued',
	credentialReceived = 'credential-received',
	done = 'done',
	abandoned = 'abandoned',
}

export enum ProofRequestState {
	presentationReceived = 'presentation-received',
	offerReceived = 'offer-received',
	declined = 'decliend',
	requestSent = 'request-sent',
	requestReceived = 'request-received',
	credentialIssued = 'credential-issued',
	credentialReceived = 'credential-received',
	done = 'done',
	abandoned = 'abandoned',
}

export enum ProofRequestStateUserText {
	requestSent = 'Requested',
	requestReceived = 'Received',
	done = 'Verified',
	abandoned = 'Declined',
}

export enum IssueCredentialUserText {
	offerSent = 'Offered',
	done = 'Accepted',
	abandoned = 'Declined'
}

export enum RequestedType {
	schema = 'schema',
	credDef = 'credDef'
}

export enum EndorsementStatus {
	all = "all",
	approved = "approved",
	rejected = "rejected",
	requested = "requested"
}

export enum EcosystemRoles {
	ecosystemMember = "Ecosystem Member",
	ecosystemLead = "Ecosystem Lead"
}
