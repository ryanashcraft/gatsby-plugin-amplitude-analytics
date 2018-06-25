import React from "react"
import PropTypes from "prop-types"

function OutboundLink(props) {
  return (
    <a
      {...props}
      onClick={e => {
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
          window.amplitude.getInstance().logEvent(window.amplitudeEventTypes.outboundLinkClick, {
            href: props.href,
          }, () => {
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
}

export { OutboundLink }
