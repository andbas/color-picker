# GetColor.io

_A free, ad-free, and instant **camera color picker** that helps you identify colors in real-time using your device's camera._

---

## About GetColor.io

GetColor.io is a simple, web-based camera color picker that allows users to identify colors in real-time without the need for downloads or installations. The tool works directly in your browser and is completely free and ad-free.

## Features

- **Real-Time Color Detection**: Identify colors instantly using your device's camera.
- **No Downloads Required**: Access the tool directly from your browser.
- **Ad-Free Experience**: Enjoy a clean, distraction-free interface.
- **Color Codes**: Get HEX, RGB values or just the name for the detected colors.
- **User-Friendly Interface**: Simple controls for easy use in various scenarios.
- **Cross-Platform Compatibility**: Works on smartphones, tablets, and desktop browsers that support camera access (interface is optimized for mobile devices only as for now).
- **Privacy Focused**: All video processing occurs locally on your device; no data is sent to servers or third parties.

## How to Use

1. **Visit** [GetColor.io](https://getcolor.io) on your device's browser.
2. **Allow Camera Access**: When prompted, grant the website permission to use your device's camera.
3. **Point Your Camera**: Aim your camera at the object whose color you want to identify.
4. **View Color Information**: The app displays the detected color in real-time, including its HEX, RGB values or just the name.

## Technical Details

- **Built with Next.js v14**: Next.js based SSG (Static Site Generation) app.
- **Static Site Generation (SSG)**: Pre-rendered pages improve load times and SEO.
- **Deployed via GitHub Workflows**: Automated deployment ensures continuous integration and delivery.
- **Camera Access**: Uses the [MediaDevices.getUserMedia() API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) for camera functionality.
- **Color Detection**: Processes video frames to extract color data from the selected pixel.

## Browser Support

GetColor.io works on modern browsers that support camera access, including:

- **Desktop Browsers**: Chrome, Firefox, Edge, and others with camera support.
- **Mobile Browsers**: Chrome for Android, Safari for iOS (iOS 11 or later), and other mobile browsers that support camera access.

## Limitations

- **Browser Permissions**: Requires user permission to access the camera.
- **Lighting Conditions**: Accuracy may vary under different lighting conditions.

## Development

### Prerequisites

- **Node.js**: Version 20.x or higher

### Contribution

- Fork the repository
- Create a new branch
- Make your changes
- Create a pull request

## Licensing

- Licensed under the [MIT License](LICENSE).

---

_Discover the colors around you effortlessly with our free, no-download-required camera color picker. Get started now at [GetColor.io](https://getcolor.io)._
