<script lang="ts">
import { fetchPost } from "$lib/util/fetch.ts";
import Navbar from "$lib/Navbar.svelte";
import { goto } from "$app/navigation";

let username: string = "";
let name: string = "";
let password: string = "";

let login_error: boolean = false;
let create_error: boolean = false;
let create_success: boolean = false;

const onCreate = async () => {
  // validation handled on serverside. 
  const body = { username, name, password }
  const res = await fetchPost("/api/user/create", body)
    .then(async res => {
      console.log(res.status);
      console.log(await res.text());

      if (res.status >= 400) {
        create_success = false;
        login_error = false;
        create_error = true;
      } else {
        create_success = true;
        login_error = false;
        create_error = false;
      }
    })
}

const onLogin = async () => {
  const body = { username, password }
  const res = await fetchPost("/api/user/login", body)
  console.log(res.status);
  console.log(await res.text());

  if (res.status >= 400) {
    create_success = false;
    login_error = true;
    create_error = true;
  } else {
    goto("/portal");
  }
}
</script>

<!--assumes login page will not be shown while logged in (pls redirect)-->
<Navbar show_log_out={false}/>

<!-- yes I know navbar is not h-1/6 -->
<main class="h-5/6">
  <div role="alert" class="alert alert-success {create_success?"":"hidden"}">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Successfully created account! Now log in.</span>
  </div>
  
  <div role="alert" class="alert alert-error {login_error?"":"hidden"}">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Could not login. Double check your username and password. Or, create an account instead.</span>
  </div>
  
  <div role="alert" class="alert alert-error {create_error?"":"hidden"}">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Could not create account. Username probably already exists.</span>
  </div>
  <div class="grid grid-cols-1 lg:grid-cols-2 place-items-center h-full">
    <div>
      <h1 class="text-5xl lg:text-7xl">Bhargology</h1>
      <br>
    </div>
    <div>
      <div class="mb-2">
        <input bind:value={username} type="text" placeholder="username" class="input input-bordered rounded-b-none focus:input-primary"><br>
        <input bind:value={name} type="text" placeholder="name" class="input input-bordered rounded-none focus:input-primary"><br>
        <input bind:value={password} type="password" placeholder="password" class="input input-bordered rounded-t-none focus:input-primary"><br>
      </div>
      <div class="join">
        <button on:click={onCreate} class="btn btn-accent join-item">create</button>
        <button on:click={onLogin} class="btn btn-accent join-item">login</button>
      </div>
    </div>
  </div>
</main>
