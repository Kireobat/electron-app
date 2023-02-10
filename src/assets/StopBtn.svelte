<script>
    let count = 0;
    const text = document.getElementById('text');

    function handleClick() {
        count += 1;
    }
</script>

<main>
    <button on:click={handleClick} class="btn">
        <h3 id="text">Clicks: {count}</h3>
    </button>
</main>

<style>
    .btn {
        background-color: red;
        border-radius: 2em;
        width: 10em;
        height: 5em;
        margin: 2em;
    }
</style>