exports.onRouteUpdate = function({ location }) {
  // Don't track while developing.
  if (process.env.NODE_ENV === `production` && typeof amplitude === `function`) {
    if (
      location &&
      typeof window.amplitudeExcludePaths !== `undefined` &&
      window.amplitudeExcludePaths.some(rx => rx.test(location.pathname))
    ) {
      return
    }
    amplitude.logEvent(window.amplitudeEventTypes.pageView, {
      location: location ? location.pathname + location.search + location.hash : undefined
    })
  }
}
