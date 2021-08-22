# NASA Astronomy Picture of the Day (APOD)

#### Considerations

#### Interesting bugs and findings

I wanted to use PanGestureHandler so that users could drag the info up or down (as well as click the button), but the info itself needed to be a scroll view in case of long content. The structure for my first attempt looked like:

```
<PanGestureHandler>
    <Animated.View>
        <Pressable />
        <ScrollView />
    </Animated.View>
</PanGestureHandler>
```

This worked very well on iOS but on Android the scrollView no longer scrolled, as the PanGestureHandler was taking over all gesture handling.

The fix was to re-structure the component, keeping the PanGestureHandler only for the drag button:

````
<Animated.View style={[styles.infoView, animInfoStyle]}>
            <PanGestureHandler onGestureEvent={eventHandler}>
              <Animated.View style={{width: "100%"}}>
                <PeepButton onPress={handleInfoPress} showPeep={showPeep} />
              </Animated.View>
            </PanGestureHandler>
            <InfoText apod={apod} />
          </Animated.View>
          ```

##### API key

Storing the Api key securely... env?
https://docs.expo.dev/guides/environment-variables/#using-a-dotenv-file

#### How to run locally

1. Clone this repo and ensure you have [Expo Cli](https://docs.expo.dev/get-started/installation/) installed
2. Get your NASA [API key](https://api.nasa.gov)
3. Place your API key in .env.local and change the file name to `.env`
4. Run `expo start`
````
