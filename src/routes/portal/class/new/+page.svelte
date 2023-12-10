<script lang="ts">
import { fetchPost } from '$lib/util/fetch.ts';
import { goto } from '$app/navigation';
import Navbar from "$lib/Navbar.svelte";

let classname: string;

const onCreate = async () => {
  const body = { classname };
  const res = await fetchPost("/api/class/create", body)
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
    <h1>Class Creation</h1>
  </div>
  <div>
    <input bind:value={classname} type="text" placeholder="class name" class="input input-bordered focus:input-primary">
    <button on:click={onCreate} class="btn btn-accent">create</button>
  </div>
</main>
