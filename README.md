# NASA Astronomy Picture of the Day (APOD)

### Features

#### APOD: Astronomy Picture of the Day

This uses NASA's API to get todays picture and accompanying information.

I wanted to keep the UI clean and allow the user to tap to zoom in order to explore the image. I also wanted to display the information in an easy-to-read way. On NASA's official app, I find the UI cluttered and the scroll area for the text is far too small and quite annoying. To fix this in my app, I put the information in a draggable scrollview, that fills most of the screen. It animated on click and on drag gesture using Reanimated 2.

- Single tap on image shows the 'peep' button
- Double tap on image to zoom
- Peep button can be clicked, or dragged, revealing the information in a scroll-able container

#### Technology used

- React Native
- Expo
- Reanimated 2
- NASA API

#### Considerations

#### Interesting bugs and findings

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

The fix was to re-structure the component, keeping the PanGestureHandler only for the drag button. For Android this also required adding `clamping: {overshootClamping: false}` to the animation config to prevent the pan gesture from pulling the info up too high.

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

Storing the Api key securely. I set up a .env file to keep the API key out of source control.
https://docs.expo.dev/guides/environment-variables/#using-a-dotenv-file

#### How to run locally

1. Clone this repo and ensure you have [Expo Cli](https://docs.expo.dev/get-started/installation/) installed
2. Get your NASA [API key](https://api.nasa.gov)
3. Place your API key in .env.local and change the file name to `.env`
4. Run `expo start`

```

```
