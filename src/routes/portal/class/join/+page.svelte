<script lang="ts">
import { fetchPost } from '$lib/util/fetch.ts';
import { goto } from '$app/navigation';
import Navbar from "$lib/Navbar.svelte";
let classid: string;

const onCreate = async () => {
  const body = { classid };
  const res = await fetchPost(`/api/class/join`, body)
  console.log(res.status);
  console.log(await res.text());

  if (res.status >= 400) {
    alert("failed, check console");
  } else {
    goto('/portal')
  }
}
</script>

<Navbar/>

<main>
  <div>
    <h1>Join Class</h1>
  </div>
  <div>
    <input bind:value={classid} type="text" placeholder="class id" class="input input-bordered focus:input-primary">
    <button on:click={onCreate} class="btn btn-accent">join</button>
  </div>
</main>
