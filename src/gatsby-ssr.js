import React from "react"

exports.onRenderBody = (
  { setHeadComponents, setPostBodyComponents },
  pluginOptions
) => {
  // Only include if the current env is included in the environments specified in
  // pluginOptions. Default to [`production`] if the config option is not present.
  if ((pluginOptions.environments || [`production`]).includes(process.env.NODE_ENV)) {
    let amplitudeExcludePaths = []
    if (typeof pluginOptions.exclude !== `undefined`) {
      const Minimatch = require(`minimatch`).Minimatch
      pluginOptions.exclude.map(exclude => {
        const mm = new Minimatch(exclude)
        amplitudeExcludePaths.push(mm.makeRe())
      })
    }

    const amplitudeScript = (
      <script
        key={`gatsby-plugin-amplitude-analytics`}
        dangerouslySetInnerHTML={{
          __html: `
  ${
    amplitudeExcludePaths.length
      ? `window.amplitudeExcludePaths=[${amplitudeExcludePaths.join(`,`)}];`
      : ``
  }
  window.amplitudeEventTypes = {
    outboundLinkClick: "${(pluginOptions.eventTypes || {}).outboundLinkClick || 'outbound link click'}",
    pageView: "${(pluginOptions.eventTypes || {}).pageView || 'page view'}"
  };
  if(${
    typeof pluginOptions.respectDNT !== `undefined` &&
    pluginOptions.respectDNT == true
      ? `!(navigator.doNotTrack == "1" || window.doNotTrack == "1")`
      : `true`
  }) {
    (function(e,t){var n=e.amplitude||{_q:[],_iq:{}};var r=t.createElement("script")
    ;r.type="text/javascript"
    ;r.integrity="sha384-BFhCFljbuMkiF3EzVMjFk+zh1dxo9ckGpYDTPLhKibORvR5LPenaPdnGFD9VNZJr"
    ;r.crossOrigin="anonymous";r.async=true
    ;r.src="https://cdn.amplitude.com/libs/amplitude-7.3.3-min.gz.js"
    ;r.onload=function(){if(!e.amplitude.runQueuedFunctions){
    console.log("[Amplitude] Error: could not load SDK")}}
    ;var i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)
    ;function s(e,t){e.prototype[t]=function(){
    this._q.push([t].concat(Array.prototype.slice.call(arguments,0)));return this}}
    var o=function(){this._q=[];return this}
    ;var a=["add","append","clearAll","prepend","set","setOnce","unset"]
    ;for(var c=0;c<a.length;c++){s(o,a[c])}n.Identify=o;var u=function(){this._q=[]
    ;return this}
    ;var l=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"]
    ;for(var p=0;p<l.length;p++){s(u,l[p])}n.Revenue=u
    ;var d=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId","enableTracking","setGlobalUserProperties","identify","clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId","groupIdentify","onInit","logEventWithTimestamp","logEventWithGroups","setSessionId","resetSessionId"]
    ;function v(e){function t(t){e[t]=function(){
    e._q.push([t].concat(Array.prototype.slice.call(arguments,0)))}}
    for(var n=0;n<d.length;n++){t(d[n])}}v(n);n.getInstance=function(e){
    e=(!e||e.length===0?"$default_instance":e).toLowerCase()
    ;if(!n._iq.hasOwnProperty(e)){n._iq[e]={_q:[]};v(n._iq[e])}return n._iq[e]}
    ;e.amplitude=n})(window,document);
  }
  if (typeof window.amplitude === "object") {
    window.amplitude.getInstance().init("${pluginOptions.apiKey}", null, ${JSON.stringify(pluginOptions.amplitudeConfig)});
  }`,
        }}
      />
    )

    setHeadComponents([
      <link
        key="gatsby-plugin-amplitude-analytics-preconnect-0"
        rel="preconnect"
        href="https://cdn.amplitude.com"
      />,
      <link
        key="gatsby-plugin-amplitude-analytics-preconnect-1"
        rel="preconnect"
        href="https://api.amplitude.com"
      />,
      pluginOptions.head ? amplitudeScript : ''
    ])

    return setPostBodyComponents([!pluginOptions.head ? amplitudeScript : ''])
  }

  return null
}
