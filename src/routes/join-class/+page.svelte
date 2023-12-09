<script lang="ts">
import { fetchPost } from '$lib/util/fetch.ts';
let classid;

const onCreate = () => {
  const body = { classid };
  fetchPost(`/api/user/${classid}/join`, {})
    .then(async res => {
      console.log(res.status);
      console.log(await res.text());

      if (res.status >= 400) {
        alert("failed, check console");
      }
    })
}
</script>

<div>
  <input bind:value={classid} type="text" placeholder="class id">
  <button on:click={onCreate}>join</button>
</div>
