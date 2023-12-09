<script lang="ts">
import { fetchPost } from "$lib/util/fetch.ts";
import Navbar from "$lib/Navbar.svelte";
import { goto } from "$app/navigation";

let username: string = "";
let name: string = "";
let password: string = "";

const onCreate = async () => {
  // validation handled on serverside. 
  const body = { username, name, password }
  const res = await fetchPost("/api/user/create", body)
    .then(async res => {
      console.log(res.status);
      console.log(await res.text());

      if (res.status >= 400) {
        alert("failed, check console");
      }
    })
}

const onLogin = async () => {
  const body = { username, password }
  const res = await fetchPost("/api/user/login", body)
  console.log(res.status);
  console.log(await res.text());

  if (res.status >= 400) {
    alert("failed, check console");
  } else {
    goto("/portal");
  }
}
</script>

<!--assumes login page will not be shown while logged in (pls redirect)-->
<Navbar show_log_out={false}/>

<!-- yes I know navbar is not h-1/6 -->
<main class="h-5/6">
  <div class="grid grid-cols-1 lg:grid-cols-2 place-items-center h-full">
    <div>
      <h1 class="text-5xl lg:text-7xl">Bhargology</h1>
      <br>
    </div>
    <div>
      <div class="mb-2">
        <input bind:value={username} type="text" placeholder="username" class="input input-bordered rounded-b-none focus:input-primary"><br>
        <input bind:value={name} type="text" placeholder="name" class="input input-bordered rounded-none focus:input-primary"><br>
        <input bind:value={password} type="text" placeholder="password" class="input input-bordered rounded-t-none focus:input-primary"><br>
      </div>
      <div class="join">
        <button on:click={onCreate} class="btn btn-accent join-item">create</button>
        <button on:click={onLogin} class="btn btn-accent join-item">login</button>
      </div>
    </div>
  </div>
</main>
