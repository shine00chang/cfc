<script lang="ts">
import { fetchPost } from "$lib/util/fetch.ts";
import { goto } from "$app/navigation";

let username: string = "";
let name: string = "";
let password: string = "";

let error_message: string | undefined;
let create_success: boolean = false;

const onCreate = async () => {
  // validation handled on serverside. 
  const body = { username, name, password }
  const res = await fetchPost("/api/user/create", body)
  console.log(res.status);
  console.log(await res.text());

  if (res.status >= 400) {
    create_success = false;
    error_message = 'Could not create account. Perhaps due to overlapping usernames.';
  } else {
    create_success = true;
    error_message = undefined;
  }
}

const onLogin = async () => {
  const body = { username, password }
  const res = await fetchPost("/api/user/login", body)
  console.log(res.status);
  console.log(await res.text());

  if (res.status >= 400) {
    create_success = false;
    error_message = 'Could not login. Double check your username and password. Or, create an account instead.';
  } else {
    goto("/portal");
 }
}
</script>

<!-- yes I know navbar is not h-1/6 -->
<main class="flex flex-row items-center h-full">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols place-items-center h-[70%]">

    <div>
      <h1 class="text-5xl lg:text-7xl tracking-widest">Bhargology</h1>
      <br>
    </div>

    <div class="flex flex-col items-center">
      <div class="mb-2">
        <input bind:value={username} type="text" placeholder="username" class="input input-bordered rounded-b-none focus:input-primary"><br>
        <input bind:value={name} type="text" placeholder="name" class="input input-bordered rounded-none focus:input-primary"><br>
        <input bind:value={password} type="password" placeholder="password" class="input input-bordered rounded-none focus:input-primary"><br>
        <button on:click={onCreate} class="btn btn-accent rounded-t-none rounded-r-none w-1/2">create</button><button on:click={onLogin} class="btn btn-accent rounded-bl-none rounded-t-none w-1/2">login</button>
      </div>
    </div>
  </div>
</main>

<div role="alert" style="width: 80vw; margin: 0 10vw;" class="absolute top-5 alert alert-success {create_success?"":"hidden"}">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span>Creation Successful</span>
</div>

<div role="alert" style="width: 80vw; margin: 0 10vw;" class="absolute top-5 alert alert-error {error_message?"":"hidden"}">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span>{error_message}</span>
</div>
