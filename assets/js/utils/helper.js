if(document.URL.substr(0, 7) != 'chrome-'){
	
	console.log('[helper.js] ' + document.URL);

	(() => {
		let isSDKBuild = (window.navigator.plugins.namedItem('Native Client') !== null)
		if(!isSDKBuild){
			var __console = console;
			window.console = {}
			['log', 'warn', 'error', 'info', 'debug', 'trace', 'clear'].forEach(fn => {
				window.console[fn] = (...arguments) => {
					// ignore on non SDK
				}
			})
		}
	})()

	window.console.clear = () => {
		return;
	}

	window.alert = function (str){ 
		console.log('ALERT', str);
	}

	window.close = function (){}

	window.prompt = function (str, def){
		console.log('PROMPT', str, def);
		return false;
	}

	window.confirm = function (str){
		console.log('CONFIRM', str);
		return false;
	}

	window.onerror = (...arguments) => {
		console.error('ERROR', arguments);
		return true;
	}

	window.open = function (url, name, features) {
		return {
			alert: function(){},
			blur: function(){},
			clearInterval: function(){},
			clearTimeout: function(){},
			close: function(){},
			confirm: function(){},
			createPopup: function(){},
			focus: function(){},
			moveBy: function(){},
			moveTo: function(){},
			open: function(){},
			print: function(){},
			prompt: function(){},
			resizeBy: function(){},
			resizeTo: function(){},
			scroll: function(){},
			scrollBy: function(){},
			scrollTo: function(){},
			setInterval: function(){},
			setTimeout: function(){},
			window: {},
			location: ""
		}
	}

	// prevent default behavior from changing page on dropped file
	if(!window.ondragover){
		window.ondragover = function(e) { e.preventDefault(); return false };
		window.ondrop = function(e) { e.preventDefault(); return false };
	}

	(function (){
		// return a custom MIME type checker that can defer to the original function
		function makeModifiedTypeChecker(origChecker) {
			// Check if a video type is allowed
			return function (type) {
				if (type === undefined) return '';
				var disallowed_types = ['webm', 'vp8', 'vp9'];
				// If video type is in disallowed_types, say we don't support them
				for (var i = 0; i < disallowed_types.length; i++) {
					if (type.indexOf(disallowed_types[i]) !== -1) return '';
				}
			
				// Otherwise, ask the browser
				return origChecker(type);
			}
		}

		// Override video element canPlayType() function
		var videoElem = document.createElement('video');
		var origCanPlayType = videoElem.canPlayType.bind(videoElem);
		videoElem.__proto__.canPlayType = makeModifiedTypeChecker(origCanPlayType);

		// Override media source extension isTypeSupported() function
		var mse = window.MediaSource;
		// Check for MSE support before use
		if (mse === undefined) return;
		var origIsTypeSupported = mse.isTypeSupported.bind(mse);
		mse.isTypeSupported = makeModifiedTypeChecker(origIsTypeSupported)
	})()

}