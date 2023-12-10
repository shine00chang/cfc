<script lang="ts">
  import { fetchPost } from '$lib/util/fetch.ts';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  export let data;
  const { class_, user } = data;

  let title: string;
  let post_type: string;
  let content: string;

  let create_error: boolean = false;

  async function create_post() {
    const res = await fetchPost("/api/class/post", {
      //  const { classid, username, title, type, content } = json;
      classid: class_.id,
      username: user.username,
      title,
      type: post_type,
      content,
    });
    if (res.status >= 400) {
      create_error = true;
    } else {
      goto($page.url.pathname.split('/').slice(0,-1).join('/'));
    }
  }
</script>

<main>
  <a href={$page.url.pathname.split('/').slice(0,-1).join('/')}>Return</a>
  <h1>Create Post</h1>
  <div role="alert" class="alert alert-error {create_error?"":"hidden"}">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Could not create post.</span>
  </div>
  <form>
    <select bind:value={post_type} class="select select-bordered mb-2">
      <option value="text">Text</option>
      <option value="link">Link</option>
      <option value="pdf">PDF</option>
      <option value="youtube">YouTube</option>
    </select>
    <br>
    <input type="text" placeholder="title..." bind:value={title} class="input input-bordered focus:input-primary mb-2"/>
    <br>
    <textarea bind:value={content} class="textarea textarea-bordered mb-2"></textarea>
    <br>
    <button on:click={create_post} class="btn btn-accent">Create</button>
  </form>
</main>
