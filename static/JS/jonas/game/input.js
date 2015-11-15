function initInput() {
  $(document).keydown(function(event) {
    var keycode = event.which;
    if (keycode == 37) {
      state.player.pressedKeys.push('left');
    }
    else if (keycode == 38) {
      state.player.pressedKeys.push('up');
    }
    else if (keycode == 39) {
      state.player.pressedKeys.push('right');
    }
    else if (keycode == 40) {
      state.player.pressedKeys.push('down');
    }
    else if(keycode == 82) {
      // We want to be able to reload the page with Ctrl + R,
      // so the same as the F11 and F12 keys apply here.
      console.log("R key pressed");
      return;
    }
    event.preventDefault();
  });

  $(document).keyup(function(event) {
    var keycode = event.which;
    if (keycode == 37) {
      state.player.pressedKeys = _.without(state.player.pressedKeys, 'left');
    }
    else if (keycode == 38) {
      state.player.pressedKeys = _.without(state.player.pressedKeys, 'up');
    }
    else if (keycode == 39) {
      state.player.pressedKeys = _.without(state.player.pressedKeys, 'right');
    }
    else if (keycode == 40) {
      state.player.pressedKeys = _.without(state.player.pressedKeys, 'down');
    }
    else if (keycode == 82) {
      // We want to be able to reload the page with Ctrl + R,
      // so the same as the F11 and F12 keys apply here.
      console.log("R key pressed");
      return;
    }
    event.preventDefault();
  });
}