exports.getConfigFields = function () {
	configValues = this
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'Server IP or Hostname',
			width: 6,
			default: '127.0.0.1',
			regex: this.REGEX_HOSTNAME,
		},
		{
			type: 'textinput',
			id: 'password',
			width: 12,
			label: 'Server Password',
			required: true,
		},
		{
			type: 'text',
			id: 'passwordInfo',
			width: 12,
			value: 'A server password is required for the API to function.<br>("Preferences > Use Server Password")',
		},
	]
}
