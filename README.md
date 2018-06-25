# gatsby-plugin-amplitude-analytics

Easily add Amplitude Analytics to your Gatsby site.

## Install

`npm install --save gatsby-plugin-amplitude-analytics`

## How to use

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-ampiltude-analytics`,
      options: {
        apiKey: "YOUR_AMPLITUDE_ANALYTICS_API_KEY",
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ["/preview/**", "/do-not-track/me/too/"],
      },
    },
  ],
}
```

## `<OutboundLink>` component

To make it easy to track clicks on outbound links in Amplitude Analytics,
the plugin provides a component.

To use it, simply import it and use it like you would the `<a>` element e.g.

```jsx
import React
import { OutboundLink } from 'gatsby-plugin-amplitude-analytics'

export default () => {
  <div>
    <OutboundLink
      href="https://www.gatsbyjs.org/packages/gatsby-plugin-amplitude-analytics/"
    >
      Visit the Amplitude Analytics plugin page!
    </OutboundLink>
  </div>
}
```

## The "respectDNT" option

If you enable this optional option, Amplitude Analytics will not be loaded at all for visitors that have "Do Not Track" enabled. While using Amplitude Analytics does not necessarily constitute Tracking, you might still want to do this to cater to more privacy oriented users.

## The "exclude" option

If you need to exclude any path from the tracking system, you can add it (one or more) to this optional array as glob expressions.
