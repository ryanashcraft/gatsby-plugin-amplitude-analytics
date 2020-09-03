import React from "react"
import PropTypes from "prop-types"

function OutboundLink({eventType, eventProperties, ...props}) {
  return (
    <a
      {...props}
      onClick={e => {
        const amplitudeEventType = eventType || window.amplitudeEventTypes.outboundLinkClick;
        const amplitudeEventProperties = Object.assign({ href: props.href }, eventProperties);

        if (typeof props.onClick === `function`) {
          props.onClick()
        }
        let redirect = true
        if (
          e.button !== 0 ||
          e.altKey ||
          e.ctrlKey ||
          e.metaKey ||
          e.shiftKey ||
          e.defaultPrevented
        ) {
          redirect = false
        }
        if (props.target && props.target.toLowerCase() !== `_self`) {
          redirect = false
        }
        if (typeof window.amplitude === 'object') {
          window.amplitude.getInstance().logEvent(amplitudeEventType, amplitudeEventProperties, () => {
            if (redirect) {
              document.location = props.href
            }
          })
        } else {
          if (redirect) {
            document.location = props.href
          }
        }

        return false
      }}
    />
  )
}

OutboundLink.propTypes = {
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
  eventType: PropTypes.string,
  eventProperties: PropTypes.object,
}

export { OutboundLink }
