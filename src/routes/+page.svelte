<script lang="ts">
  import { fetchPost } from "$lib/util/fetch.ts";

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
      .then(async res => {
        console.log(res.status);
        console.log(await res.text());

        if (res.status >= 400) {
          alert("failed, check console");
        }
      })
  }

  const onLogout = async () => {
    const res = await fetchPost("/api/user/logout", undefined)
      .then(async res => {
        console.log(res.status);
        console.log(await res.text());

        if (res.status >= 400) {
          alert("failed, check console");
        }
      })
  }

</script>

<main class="h-full">
  <div class="grid grid-flow-col grid-cols-1 lg:grid-cols-2 justify-center place-items-center h-5/6 pb-0.5">
    <div>
      <h1 class="text-5xl lg:text-7xl">Bhargology</h1>
      <br>
    </div>
    <div>
      <div>
        <input bind:value={username} type="text" placeholder="username" class="input input-bordered"><br>
        <input bind:value={name} type="text" placeholder="name" class="input input-bordered"><br>
        <input bind:value={password} type="text" placeholder="password" class="input input-bordered"><br>
      </div>

      <button on:click={onCreate} class="btn btn-accent">create</button>
      <button on:click={onLogin} class="btn btn-accent">login</button>
      <button on:click={onLogout} class="btn btn-error">logout</button>
    </div>
  </div>
</main>
