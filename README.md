# CTL Overlay

Player overlay used for Collegiate Tetris League crew battles. Displays player avatars in a "player select" scene, stages two players once teams have picked who they are sending in for a "players chosen" scene, and moves the players to the corners during the game.

https://i.imgur.com/qmUAqLQ.mp4

# How to use

## Scene Setup

This overlay will respond to the scenes named `game-scene`, `players-chosen`, and `player-select`. For all other scenes, the overlay will hide the player avatars.

## Add the Overlay

You can add the overlay as a **browser source** in OBS with the URL https://orznull.github.io/ctl-overlay/#/overlay. Ensure that you set the correct page permissions ("Read access to user information") so the page can read the current scene, and that the width and height are set to 1920x1080.

![](https://i.imgur.com/c5HqmXe.png)

At this point, you should see the avatar slots moving around when you transition between scenes, given you have named them correctly.

## Dock Setup

Add the config window to the OBS as a custom browser dock through **Docks > Custom Browser Docks** then inputing https://orznull.github.io/ctl-overlay/#/config.

![](https://i.imgur.com/6Fmkdug.png)

## Using the config

![](https://i.imgur.com/eudtUhl.png) 

- Enter the **tetrio usernames** of each player in each of the specified text inputs
- To select the player that will be playing, click one the radio inputs (the dots) next to the player you would like to select.
- Hit **Clear Selected Player** if you would like no player to be selected.
- Enter a color under **Team Color Hex** inputs to change the colors of the image borders and text. If none is provided, white will be used. You can find the hex color of a code [here](https://rgbacolorpicker.com/hex-color-picker) or you can google it 
- The overlay is able to handle cases in the "player chosen" and "game scene" where the selected player is absent / changed midway through.
- Any updates that you make to the overlay will reflect once you hit **Save**. 

Here is a sample config:

![](https://i.imgur.com/EhqRDkG.png)

There is also a vertical styling if you shrink the window enough if that's more convenient for your OBS setup.

![](https://imgur.com/4W9AwDu.png)

**Note:** Because this overlay updates its input through `localStorage`, updating config will only work through the OBS dock panel.
