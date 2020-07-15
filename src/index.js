import React from "react"
import PropTypes from "prop-types"

const NEWTAB = '_blank';
const MIDDLE_CLICK = 1;

function OutboundLink({ eventName, eventDetails, href, target, onClick, onMouseDown, children, ...rest }) {
  const handleClick = e => {
    const amplitudeEventName = eventName || window.amplitudeEventTypes.outboundLinkClick;
    const amplitudeDetails = Object.assign({ href: href }, eventDetails)
    const sameTarget = target !== NEWTAB;
    const normalClick = !(e.ctrlKey || e.shiftKey || e.metaKey || e.button === MIDDLE_CLICK);

    if (sameTarget && normalClick) {
      e.preventDefault();
      window.amplitude.getInstance().logEvent(amplitudeEventName, amplitudeDetails, () => {
        window.location.href = href;
      });
    } else {
      window.amplitude.getInstance().logEvent(amplitudeEventName, amplitudeDetails);
    }

    onClick && onClick(e);
  };

  // Adding mouseDown handler to track MIDDLE_CLICK, because MIDDLE_CLICK doesn't reach onClick event
  const handleMouseDown = e => {
    if (e.button === MIDDLE_CLICK) {
      window.amplitude.getInstance().logEvent(amplitudeEventName, amplitudeDetails);
    }

    onMouseDown && onMouseDown(e);
  };

  return (
    <a href={href} target={target} onClick={handleClick} onMouseDown={handleMouseDown} {...rest}>
      {children}
    </a>
  );
}

OutboundLink.propTypes = {
  eventName: Proptypes.string,
  eventDetails: Proptypes.any,
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  children: PropTypes.element,
}

export { OutboundLink }
