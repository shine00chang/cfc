<script lang="ts">
import { goto } from "$app/navigation";
import { fetchPost } from "$lib/util/fetch.ts";
import JoinClassBtn from "$lib/JoinClassBtn.svelte";

export let user;

const onLogout = async () => {
  const res = await fetchPost("/api/user/logout", undefined)
  console.log(res.status);
  console.log(await res.text());

  if (res.status >= 400) {
    alert("failed, check console");
  } else {
    goto("/");
  }
}

if (!user || !user.username || !user.name) {
  console.log("corrupt user: ", user);
}


</script>
<div class="navbar bg-base-300">
  <div class="navbar-start">
<!--
    <div class="dropdown">
-->
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
<!--
      <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul class="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
-->
    <a href="/portal" class="flex flex-row align-items-end btn btn-ghost text-xl">
      { user.name }
      <span class="text-sm font-light">{ user.username }</span>
    </a>
  </div>
  <div class="navbar-center font-bold tracking-widest text-xl hidden md:block">
    Bhargology
  </div>
  <div class="navbar-end">
    <JoinClassBtn/>
    <a class="btn border-1 border-base-content" on:click={onLogout}>Logout</a>
  </div>
</div>
