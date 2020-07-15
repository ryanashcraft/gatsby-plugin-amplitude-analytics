import React from "react"
import PropTypes from "prop-types"

const NEWTAB = '_blank';
const MIDDLE_CLICK = 1;

function OutboundLink({ eventType, eventProperties, href, target, onClick, onMouseDown, children, ...rest }) {
  const handleClick = e => {
    const amplitudeEventType = eventType || window.amplitudeEventTypes.outboundLinkClick;
    const amplitudeDetails = Object.assign({ href: href }, eventProperties)
    const sameTarget = target !== NEWTAB;
    const normalClick = !(e.ctrlKey || e.shiftKey || e.metaKey || e.button === MIDDLE_CLICK);

    if (sameTarget && normalClick) {
      e.preventDefault();
      window.amplitude.getInstance().logEvent(amplitudeEventType, amplitudeDetails, () => {
        window.location.href = href;
      });
    } else {
      window.amplitude.getInstance().logEvent(amplitudeEventType, amplitudeDetails);
    }

    if (onClick) {
      onClick(e);
    }
  };

  // Adding mouseDown handler to track MIDDLE_CLICK, because MIDDLE_CLICK doesn't reach onClick event
  const handleMouseDown = e => {
    if (e.button === MIDDLE_CLICK) {
      window.amplitude.getInstance().logEvent(amplitudeEventType, amplitudeDetails);
    }

    if (onMouseDown) {
      onMouseDown(e);
    }
  };

  return (
    <a href={href} target={target} onClick={handleClick} onMouseDown={handleMouseDown} {...rest}>
      {children}
    </a>
  );
}

OutboundLink.propTypes = {
  eventName: Proptypes.string,
  eventProperties: Proptypes.any,
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  children: PropTypes.element,
}

export { OutboundLink }
