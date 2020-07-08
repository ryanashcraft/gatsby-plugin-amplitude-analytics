# gatsby-plugin-amplitude-analytics

Easily add Amplitude Analytics to your Gatsby site. Automatically tracks page views and outbound link clicks.

## Install

`yarn add gatsby-plugin-amplitude-analytics`

or

`npm install --save gatsby-plugin-amplitude-analytics`

## How to use

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-amplitude-analytics`,
      options: {
        // Specify the API key for your Amplitude Project (required)
        apiKey: "YOUR_AMPLITUDE_ANALYTICS_API_KEY",
        // Puts tracking script in the head instead of the body (optional)
        head: false,
        // Prevents loading Amplitude and logging events if visitors have "Do Not Track" enabled (optional)
        respectDNT: true,
        // Avoids sending pageview hits from custom paths (optional)
        exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Override the default event types (optional)
        eventTypes: {
          outboundLinkClick: 'OUTBOUND_LINK_CLICK',
          pageView: 'PAGE_VIEW',
        },
        // Amplitude JS SDK configuration options (optional)
        amplitudeConfig: {
          saveEvents: true,
          includeUtm: true,
          includeReferrer: true
        },
        // Specify NODE_ENVs in which the plugin should be loaded (optional)
        environments: ["production"],
      },
    },
  ],
}
```

## `<OutboundLink>` component

To make it easy to track clicks on outbound links in Amplitude Analytics,
the plugin provides a component.

To use it, simply import it and use it like you would the `<a>` element. For example:

```jsx
import React;
import { OutboundLink } from 'gatsby-plugin-amplitude-analytics';

export default () => {
  <div>
    <OutboundLink
      href="https://www.gatsbyjs.org/packages/gatsby-plugin-amplitude-analytics/"
    >
      Visit the Amplitude Analytics plugin page!
    </OutboundLink>
  </div>
};
```

## The "respectDNT" option

If you enable this optional option, Amplitude Analytics will not be loaded at all for visitors that have "Do Not Track" enabled. While using Amplitude Analytics does not necessarily constitute Tracking, you might still want to do this to cater to more privacy oriented users.

## The "exclude" option

If you need to exclude any path from the tracking system, you can add it (one or more) to this optional array as glob expressions.

## The "eventTypes" option

To override the default event types that are used for page event and outbound link clicks, include this option. The value should be a map with two keys: "outboundLinkClick", and "pageView". For example:

The default values for these events are "outbound link click" and "page view".

## The "amplitudeConfig" option

Configuration settings passed to the `amplitude.getInstance().init()` call. This option allows you to enable automatic collection of UTM params and referrer info and change persistence and upload behavior. See https://developers.amplitude.com/#platform-specific-settings for a full list of available options.
