import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { createLogger } from 'redux-logger'
import createSaga from './common/middlewares'

import commonReducers from './common/reducers/common'
import sessionReducers from './common/reducers/session'

const createMiddlewares = sagaMiddleware => {
  const middlewares = []

  // Saga Middleware
  if (sagaMiddleware) {
    middlewares.push(sagaMiddleware)
  }

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
	})

  process.env.NODE_ENV !== 'production' && middlewares.push(logger)

  return applyMiddleware.apply({}, middlewares)
}

const createReducers = initialState => {
  return combineReducers({
		common: commonReducers,
		session: sessionReducers
  })
}

export const initializeStore = initialState => {
	const sagaMiddleware = createSagaMiddleware()
	  const store = createStore(
    createReducers(initialState),
    initialState,
		compose(createMiddlewares(sagaMiddleware))
  )
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(createReducers(initialState))
    })
  }

	store.reducers = createReducers(initialState)
	sagaMiddleware.run(createSaga(store.getState))
  return { store }
}
