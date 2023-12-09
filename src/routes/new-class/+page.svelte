<script lang="ts">
import { fetchPost } from '$lib/util/fetch.ts';
import { goto } from '$app/navigation';
let classname;

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

<div>
  <input bind:value={classname} type="text" placeholder="class name">
  <button on:click={onCreate}>create</button>
</div>
