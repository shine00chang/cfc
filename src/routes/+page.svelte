<script lang="ts">
  import { fetchPost } from '$lib/util/fetch.ts';
 

  let username: string = '';
  let password: string = '';

  const onCreate = async () => {
    // validation handled on serverside. 
    const body = { username, password }
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
    const body = { username }
    const res = await fetchPost("/api/user/logout", body)
      .then(async res => {
        console.log(res.status);
        console.log(await res.text());

        if (res.status >= 400) {
          alert("failed, check console");
        }
      })
  }

</script>

<h1>Bhargology</h1>
<div>
  <input bind:value={username} type="text" placeholder="username">
  <input bind:value={password} type="text" placeholder="password">

  <button on:click={onCreate}>create</button>
  <button on:click={onLogin}>login</button>
  <button on:click={onLogout}>logout</button>
</div>
