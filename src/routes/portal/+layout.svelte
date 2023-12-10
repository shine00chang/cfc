<script>
  import Navbar from "$lib/Navbar.svelte";
  export let data;
  let { user } = data
</script>

<Navbar {user}/>
<slot/>
