import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'courses(/:departmentCode)',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Courses = require('./containers/CoursesContainer').default
      const reducer = require('./modules/courses').default

      /*  Add the reducer to the store on key 'data'  */
      injectReducer(store, { key: 'data', reducer })

      /*  Return getComponent   */
      cb(null, Courses)

    /* Webpack named bundle   */
    }, 'courses')
  }
})
