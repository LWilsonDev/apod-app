# NASA Astronomy Picture of the Day (APOD)

This mini-app uses NASA's API to get today's picture/video and accompanying information. Users can zoom in on the image, browse previous APOD's, as well as store their favourites.

[View the app using Expo](https://expo.io/@lwilsondev/apod)

## Features:

##### UI and information display

I wanted to keep the UI clean and allow the user to tap to zoom in order to explore the image. I also wanted to display the information in an easy-to-read way. On NASA's official app, I find the UI cluttered and the scroll area for the text is far too small and quite annoying. To fix this in my app, I put the information in a draggable scrollView, that fills most of the screen. It animated on click and on drag gesture using [Reanimated 2](https://docs.swmansion.com/react-native-reanimated/).

- **Single tap** on image shows the 'peep' button
- **Double tap** on image to zoom
- Peep button can be clicked, or dragged, revealing the information in a scroll-able container

##### Search by date

Users can click the date in the top bar of the APOD screen, and a date picker will appear. Selecting a date will show the user the APOD from that date.

##### Favourites

You can add an APOD to your 'favourites' by clicking the star icon. It will be stored on the phoe's async storage, and can be accessed in the favourites screen

##### Video

Occasionally NASA send a video instead of an image. If the video is not an embed link, users can play the video in-app, allowing full-screen view and full video controls. However, if the video is an embed link, users will have to leave the app to view the media on the web.

---

## Technology used

- React Native
- Expo
- Reanimated 2
- NASA API

## Accessibiity considerations

- Button sizes: All buttons and touchable elements have a minimum height of 49px
- Fonts: Default fonts were used at appropriate sizes. Font scaling has not been limited - this requires further testing to ensure the information remains readable if the user has their phone's font size turned up
- Accessibility Labels: All pressable elements are labelled for screen readers
- IsScreenReaderEnabled: A hook is in place to alter the layout if the screen reader is enabled. We want the 'Peep' button to be on screen at all times, so if a user is using a screen reader they should be able to toggle the information. In theory this should work but it is not currently working...
- Image and Video content is labelled for screen readers

To Test further:

- font scaling
- Native device voiceover/talkback
- Tablet behaviour

### Accessibility bugs/unknowns:

I have found that when running the app via Expo Go, the voiceover behavior is not working well at all. I am not sure if this is to do with failings in the code, or peculiarities with Expo Go. I will need to run the app on a native device to properly investigate.

### Interesting bugs and findings

##### Video:

The APOD Api occasionally sends a video instead of an image. I used the excellent expo-av library which works great, until a Youtube link comes along when it does not work at all...

Expo has addressed the issue in the latest development of Expo SDK 42 where you can create custom development clients, enabling you to use a package like react-native-youtube that requires native builds. The down side of this is that you could no longer use Expo Go, as you would need to use EAS Build to build the iOS and Android builds. As I wanted the ease of using expo build and being able to share my project really easily using Expo Go, I had to handle Youtube videos separately, taking the user out of the app. Not an ideal solution, and for a production app I would definitely go the EAS route instead.

##### Neither Video or image:

Occasionally NASA send the media labelled as 'video', when it is actually a link to an embedded image (rather than a link to an actual image file). This caused a bit of faff and was quite annoying as neither the image or video display would work. I had to check for this and offer to let the user view the media outside of the app.

##### PanGestureHandler:

I wanted to use PanGestureHandler so that users could drag the info up or down (as well as click the button), but the info itself needed to be a scroll view in case of long content. The structure for my first attempt looked like:

```
<PanGestureHandler>
    <Animated.View>
        <PeepButton />
        <ScrollView />
    </Animated.View>
</PanGestureHandler>
```

This worked very well on iOS but on Android the scrollView no longer scrolled, as the PanGestureHandler was taking over all gesture handling.

The fix was to re-structure the component, keeping the PanGestureHandler only for the drag button. This also required adding `clamping: {overshootClamping: false}` to the animation config and checking for the current position to handle the case where the info is pulled beyond the upper limit.

```
<Animated.View>
    <PanGestureHandler>
        <Animated.View>
            <PeepButton />
        </Animated.View>
    </PanGestureHandler>
    <ScrollView />
</Animated.View>
```

##### API key

Storing the Api key securely. I set up a [.env file](https://docs.expo.dev/guides/environment-variables/#using-a-dotenv-file) to keep the API key out of source control.

#### How to run locally

1. Clone this repo and ensure you have [Expo CLI](https://docs.expo.dev/get-started/installation/) installed
2. Get your NASA [API key](https://api.nasa.gov)
3. Place your API key in .env.local and change the file name to `.env`
4. Run `expo start`
