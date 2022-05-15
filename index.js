const instance_skel = require('../../instance_skel')
const upgradeScripts = require('./src/upgrades')
const { getActions, executeAction } = require('./src/actions')
const { getConfigFields } = require('./src/config')

class instance extends instance_skel {
	constructor(system, id, config) {
		super(system, id, config)

		this.serverIp = null
		this.serverPassword = null

		this.CHOICES_mode = [
			{ id: 'up', label: 'Count Up' },
			{ id: 'down', label: 'Count Down' },
			{ id: 'time', label: 'Time of Day' },
		]
		this.CHOICES_addsubtract = [
			{ id: 'add', label: 'Add Time' },
			{ id: 'subtract', label: 'Subtract Time' },
		]

		this.actions(system) // Export actions

		return this
	}

	/**
	 * Gets any upgrade scripts
	 * @returns {Array}
	 * @access public
	 * @since 1.0.0
	 */
	static GetUpgradeScripts() {
		return upgradeScripts
	}

	/**
	 * Configuration fields that can be used
	 * @returns {Array}
	 * @access public
	 * @since 1.0.0
	 */
	config_fields() {
		return getConfigFields.bind(this)()
	}

	/**
	 * Initialize variables
	 * @access public
	 * @since 1.0.0
	 */
	initVariables() {}

	/**
	 * Initialize feedbacks
	 * @access public
	 * @since 1.0.0
	 */
	initFeedbacks() {}

	/**
	 * Setup the actions
	 * @param {Object} system
	 * @access public
	 * @since 1.0.0
	 */
	actions(system) {
		this.setActions(getActions.bind(this)(system))
	}

	/**
	 * Process configuration updates
	 * @param {Object} config New configuration
	 * @access public
	 * @since 1.0.0
	 */
	updateConfig(config) {
		this.config = config
		this.status(this.STATUS_UNKNOWN)

		if (this.config.host && this.config.password && this.config.host != '' && this.config.password != '') {
			this.status(this.STATUS_OK)
		} else {
			this.status(this.STATUS_WARNING, 'Missing server ip or password')
		}
	}

	/**
	 * Main initialization when it's ok to connect
	 * @access public
	 * @since 1.0.0
	 */
	init() {}

	/**
	 * Executes the action
	 * @param {Object} action Action to execute
	 * @access public
	 * @since 1.0.0
	 */
	action(action) {
		return executeAction.bind(this)(action)
	}

	/**
	 * Ends session
	 * @since 1.0.0
	 */
	destroy() {}

	/**
	 * Send a request to the API
	 * @param {String} cmd The endpoint to call
	 * @param {Array-String} parmas The URL parameters to include
	 * @access private
	 * @since 1.0.0
	 */
	_sendRequest(cmd) {
		let url = `http://${this.config.host}:1909/api/${cmd}`
		let headers = { password: this.config.password }

		this.system.emit(
			'rest',
			url,
			{}, // Body data
			(err, result) => {
				if (err !== null) {
					this.log('error', `HTTP POST Request failed (${result.error.code})`)
					this.status(this.STATUS_ERROR, result.error.code)
				} else {
					this.log('info', result.data.toString())
					this.status(this.STATUS_OK)
				}
			},
			headers
		)
	}
}

exports = module.exports = instance
