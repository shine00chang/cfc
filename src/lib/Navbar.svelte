<script lang="ts">
  import { goto } from "$app/navigation";
  import { fetchPost } from "$lib/util/fetch.ts";

  export let show_log_out: boolean = true;

  const onLogout = async () => {
    const res = await fetchPost("/api/user/logout", undefined)
      .then(async (res: any) => {
        console.log(res.status);
        console.log(await res.text());

        if (res.status >= 400) {
          alert("failed, check console");
        } else {
          goto("../");
        }
      })
  }
</script>

<div class="navbar w-full">
  <div class="navbar-start">
    <!--placeholder to make navbar-end work properly-->
    <span> </span>
  </div>
  <div class="navbar-end">
    {#if show_log_out}
      <button on:click={onLogout} class="btn btn-error">logout</button>
    {/if}
  </div>
</div>

<style>
  .navbar {
    max-height: 10vh;
  }
</style>
