<script>
	import StopBtn from './assets/StopBtn.svelte';
	import StartBtn from './assets/StartBtn.svelte';

	//The code Below will call functions from index.js (The main process)

	console.log("I'm going to call index.js's 'myfunc'")
	window.api.invoke('myfunc', [1, 2, 3])
		.then((result) => {
			console.log(result) // will print "success"
		})
		.catch((err) => {
			console.log(err) // will print "error"
		})
		
	//----------------------------------------------
	
	const runPuppeteerFunc = () => {
		console.log("Calling runPuppeteer from index.js")
		window.api.invoke('run-puppeteer', [])
			.then((result) => {
				console.log(result) // will print the data
			})
			.catch((err) => {
				console.log(err) // will print "error"
			})
		}

	const showCodes = () => {
		console.log("Calling showCodes from index.js")
		window.api.invoke('show-codes', [])
			.then((result) => {
				console.log(result) // will print the data
			})
			.catch((err) => {
				console.log(err) // will print "error"
			})
	}
</script>

<main>
	<div>
		<h1 class="title">Jackery Discount Retriver</h1>
	</div>
	<div class="btnHolder">
		<button on:click={runPuppeteerFunc}>Run Puppeteer</button>
		<button on:click={showCodes}>Show Codes</button>
	</div>
	
	
</main>

<style>
	:global(html) {
		background-color: darkgrey;
	}
	.btnHolder {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
</style>