import * as constants from './../constants'
import homeReducers from './home/reducers'

const { MODULES } = constants

export default (state) => ({
	[MODULES.HOME]: homeReducers
})
