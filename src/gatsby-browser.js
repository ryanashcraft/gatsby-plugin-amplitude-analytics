exports.onRouteUpdate = function({ location }) {
  // Don't track while developing.
  if (process.env.NODE_ENV === `production` && typeof window.amplitude === `object`) {
    if (
      location &&
      typeof window.amplitudeExcludePaths !== `undefined` &&
      window.amplitudeExcludePaths.some(rx => rx.test(location.pathname))
    ) {
      return;
    }

    window.amplitude.getInstance().logEvent(window.amplitudeEventTypes.pageView, {
      location: location ? location.pathname + location.search + location.hash : undefined
    });
  }
};
