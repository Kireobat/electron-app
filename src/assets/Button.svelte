<script defer>
    let count = 0;
    const text = document.getElementById('text');

    function handleClick() {
        count += 1;
    }
</script>

<main>
    <button on:click={handleClick}>
        <h3 id="text">Clicks: {count}</h3>
    </button>
</main>