<script lang="ts">
import { fetchPost } from '$lib/util/fetch.ts';
import { goto } from '$app/navigation';
let classid;

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

<div>
  <input bind:value={classid} type="text" placeholder="class id">
  <button on:click={onCreate}>join</button>
</div>
