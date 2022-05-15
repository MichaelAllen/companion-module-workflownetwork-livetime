exports.getActions = function (system) {
	return {
		// Main Timer
		mainSet: {
			label: 'Main Timer - Set',
			options: [
				{
					type: 'textinput',
					label: 'Time (in sec)',
					id: 'sec',
					regex: this.REGEX_NUMBER,
					required: false,
				},
				{
					type: 'dropdown',
					label: 'Counter Mode',
					id: 'mode',
					default: 'down',
					choices: this.CHOICES_mode,
				},
				/*
				Not currently supported in API v1. Timers must always auto-start for now...
				{
					type: 'checkbox',
					label: 'Auto-Start',
					id: 'start',
					default: true,
				},
				*/
			],
		},
		mainStart: {
			label: 'Main Timer - Start',
		},
		mainStop: {
			label: 'Main Timer - Stop',
		},
		mainReset: {
			label: 'Main Timer - Reset',
			options: [
				{
					type: 'checkbox',
					label: 'Auto-Start',
					id: 'start',
					default: false,
				},
			],
		},
		mainUpdate: {
			label: 'Main Timer - Update',
			options: [
				{
					type: 'textinput',
					label: 'Time (in sec)',
					id: 'sec',
					regex: this.REGEX_NUMBER,
					required: false,
				},
				{
					type: 'dropdown',
					label: 'Update Type',
					id: 'mode',
					default: 'add',
					choices: this.CHOICES_addsubtract,
				},
			],
		},

		// Aux Timer
		auxSet: {
			label: 'Aux Timer - Set',
			options: [
				{
					type: 'textinput',
					label: 'Time (in sec)',
					id: 'sec',
					regex: this.REGEX_NUMBER,
					required: false,
				},
				{
					type: 'dropdown',
					label: 'Counter Mode',
					id: 'mode',
					default: 'down',
					choices: this.CHOICES_mode,
				},
				/*
				Not currently supported in API v1. Timers must always auto-start for now...
				{
					type: 'checkbox',
					label: 'Auto-Start',
					id: 'start',
					default: true,
				},
				*/
			],
		},
		auxStart: {
			label: 'Aux Timer - Start',
		},
		auxStop: {
			label: 'Aux Timer - Stop',
		},
		auxReset: {
			label: 'Aux Timer - Reset',
			options: [
				{
					type: 'checkbox',
					label: 'Auto-Start',
					id: 'start',
					default: false,
				},
			],
		},
		auxUpdate: {
			label: 'Aux Timer - Update',
			options: [
				{
					type: 'textinput',
					label: 'Time (in sec)',
					id: 'sec',
					regex: this.REGEX_NUMBER,
					required: false,
				},
				{
					type: 'dropdown',
					label: 'Update Type',
					id: 'mode',
					default: 'add',
					choices: this.CHOICES_addsubtract,
				},
			],
		},

		// Overlay
		overlayShow: {
			label: 'Overlay - Show',
		},
		overlayHide: {
			label: 'Overlay - Hide',
		},

		// Presets
		presetRecall: {
			label: 'Preset - Recall',
			options: [
				{
					type: 'number',
					label: 'Preset ID',
					id: 'id',
					min: 1,
					required: true,
				},
			],
		},
		presetPrev: {
			label: 'Preset - Previous',
		},
		presetNext: {
			label: 'Preset - Next',
		},
	}
}
exports.executeAction = function (action) {
	let cmd = ''
	switch (action.action) {
		// Main Timer
		case 'mainSet':
			cmd = `timer/main/start?countmode=${action.options.mode}`
			if (action.options.mode !== 'time') {
				cmd += `&time=${action.options.sec}`
			}
			break
		case 'mainStart':
			cmd = 'timer/main/start'
			break
		case 'mainStop':
			cmd = 'timer/main/stop'
			break
		case 'mainReset':
			cmd = `timer/main/reset?start=${action.options.start}`
			break
		case 'mainUpdate':
			cmd = `timer/main/${action.options.mode}?time=${action.options.sec}`
			break

		// Aux Timer
		case 'auxSet':
			cmd = `timer/aux/start?countmode=${action.options.mode}`
			if (action.options.mode !== 'time') {
				cmd += `&time=${action.options.sec}`
			}
			break
		case 'auxStart':
			cmd = 'timer/aux/start'
			break
		case 'auxStop':
			cmd = 'timer/aux/stop'
			break
		case 'auxReset':
			cmd = `timer/aux/reset?start=${action.options.start}`
			break
		case 'auxUpdate':
			cmd = `timer/aux/${action.options.mode}?time=${action.options.sec}`
			break

		// Overlay
		case 'overlayShow':
			cmd = 'overlay/show'
			break
		case 'overlayHide':
			cmd = 'overlay/hide'
			break

		// Presets
		case 'presetRecall':
			cmd = `presets/${action.options.id}/restore`
			break
		case 'presetPrev':
			cmd = 'presets/previous'
			break
		case 'presetNext':
			cmd = 'presets/next'
			break
	}
	this.log('debug', `Sending Command: ${cmd}`)
	this._sendRequest(cmd)
}
