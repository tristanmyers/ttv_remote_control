console.log("content script here, yo");

// these elements children have unreliable classnames so select their children via indexes
let playerControlsLeft = document.querySelectorAll('.player-controls__left-control-group');
let playerControlsRight = document.querySelectorAll('.player-controls__right-control-group');

// elements we will need for controlling the player 
let channelPlayer = {
	player: document.querySelectorAll('.player-controls'),
	controls: {
		container: document.querySelectorAll('.player-controls'),
		leftGroup: {
			button: playerControlsLeft[0].children[0].firstChild,
			volume: 'coming soon'
		},
		rightGroup: {
			theaterMode: 'coming soon',
			fullscreen: 'coming soon'
		}
	}
};

// create button to test controlling the player with third party functions
// REMOVE AFTER TESTING EXTENSION
let testControl = document.createElement('button');
testControl.setAttribute('type', 'button');
testControl.setAttribute('name', 'textControlPlay');
testControl.setAttribute('value', 'textControlPlay');
testControl.style.width = '100px';
testControl.style.height = '60px';
testControl.style.backgroundColor = 'white';
testControl.style.color = 'black';

document.querySelector('.channel-root__info').appendChild(testControl);

// get state of the play/pause button and change it
let currentPlayerState = channelPlayer.controls.leftGroup.button.attributes['data-a-player-state'].value;

function changePlayerState () {
	try {

		if (currentPlayerState == 'playing') {
			currentPlayerState = 'paused';
			console.log(`changed player state`);

		} else {
			currentPlayerState = 'playing';
			console.log(`changed player state`);
		}

	} catch (err) {
		console.error(`Error changing player state: ${err}`);
	}
};



// content script only runs once so it's not updating to change state of the player
testControl.addEventListener('click', () => {

	if (currentPlayerState == 'playing') {
		channelPlayer.controls.leftGroup.button.setAttribute('data-a-player-state', 'paused');
		console.log(`if changed player state`);
	} else {
		channelPlayer.controls.leftGroup.button.setAttribute('data-a-player-state', 'playing');
		console.log(`else changed player state`);
	}	
});
