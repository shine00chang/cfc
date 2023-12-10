<script lang="ts">
import { goto } from "$app/navigation";
import { fetchPost } from "$lib/util/fetch.ts";

export let user;

let joinModalClassid;
let joinModalMessage = '';

const onJoin = async (e) => {
  const body = { classid: joinModalClassid };
  const res = await fetchPost(`/api/class/join`, body)
  const text = await res.text();
  console.log(res.status, text);

  if (res.status >= 400) {    
    joinModalMessage = text;
    e.preventDefault();
  }
}

const onLogout = async () => {
  const res = await fetchPost("/api/user/logout", undefined)
  console.log(res.status);
  console.log(await res.text());

  if (res.status >= 400) {
    alert("failed, check console");
  }
}
</script>
<div class="navbar bg-base-300">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
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
    <a href="/portal" class="flex flex-row align-items-end btn btn-ghost text-xl">
      { user.name }
      <span class="text-sm font-light">{ user.username }</span>
    </a>
  </div>
  <div class="navbar-center font-bold tracking-widest text-xl">
    Bhargology
  </div>
  <div class="navbar-end">
    <!-- Open the modal using ID.showModal() method -->
    <dialog id="join_class_modal" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="font-extrabold text-lg">Join Class</h3>
        <p class="py-4">Enter the class ID (you should receive this from your instructor)</p>

        <p class="bg-primary text-primary-content rounded-full">{joinModalMessage}</p>
        
        <input bind:value={joinModalClassid} type="text" placeholder="class id" class="input input-bordered w-full max-w-xs">

        <div class="modal-action">
          <button on:click={onJoin} class="btn">Join</button>
        </div>
      </div>
    </dialog>

    <!-- Join Class -->
    <a onclick="join_class_modal.showModal()" class="mx-4 p-2 rounded-full bg-transparent hover:bg-base-200"
      style="transition: all 200ms;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 stroke-width-[2px]"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"/></svg>

    </a>
    <a class="btn" on:click={onLogout}>Logout</a>
  </div>
</div>
