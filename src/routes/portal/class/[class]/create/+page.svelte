<script lang="ts">
  import Navbar from "$lib/Navbar.svelte";
  import { fetchPost } from '$lib/util/fetch.ts';
  import { goto } from '$app/navigation';

  export let data;
  const { class_, user } = data;

  let title: string;
  let post_type: string;
  let content: string;

  async function create_post() {
    await fetchPost("/api/class/post", {
      //  const { classid, username, title, type, content } = json;
      classid: class_.id,
      username: user.username,
      title,
      type: post_type,
      content,
    });
    //
  }
</script>

<Navbar/>

<main>
  <h1>Create Post</h1>
  <form>
    <input type="text" placeholder="title..." bind:value={title}/>
    <br>
    <select bind:value={post_type}>
      <option value="text">Text</option>
      <option value="link">Link</option>
      <option value="pdf">PDF</option>
      <option value="youtube">YouTube</option>
    </select>
    <br>
    <textarea bind:value={content}></textarea>
    <br>
    <button on:click={create_post}>Create</button>
  </form>
</main>
