<script lang="ts">
  import Navbar from "$lib/Navbar.svelte";
  import { page } from '$app/stores';

  export let data;
  const { class_, user } = data;

  //show make sub, make reply
  let show_sub: string = "";
  let show_reply: string = "";

  function show_sub_f(post_id: string) {
    show_sub = post_id;
  }
  function show_reply_f(post_id: string) {
    show_reply = post_id;
  }
</script>

<Navbar/>

<main>
  <h1>{class_.name}</h1>
  {#if class_.teachers.includes(user.username)}
    <a href="{$page.url.pathname}/create">Create Posts</a>
    <br>
  {/if}
  <h2>Latest Posts</h2>
  {#each class_.posts as post}
    <div>
      <h3>{post.title}</h3>
      <span>by {post.author.name} ({post.author.username}) at {post.timestamp}</span>
      {#if post.type === "text"}
        <p>{post.content}</p>
      {/if}
      <hr>
      {#if post.submissions.length > 0}
        <div>
          {#each post.submissions as s}
            <div>
              <span>{s.author.name} ({s.author.username}) at {s.timestamp}</span>
              <span>{s.content}</span>
            </div>
          {/each}
        </div>
      {/if}
      {#if show_sub === post.id}
        //stuff here
      {:else}
        <button on:click={()=>show_sub_f(post.id)}>Add Submission</button>
      {/if}
      <div>
        {#each post.replies as r}
          <div>
            <span>{r.author.name} ({r.author.username}) at {r.timestamp}</span>
            <span>{r.content}</span>
          </div>
        {/each}
      </div>
      {#if show_reply === post.id}
        //stuff here
      {:else}
        <button on:click={()=>show_reply_f(post.id)}>Add Reply</button>
      {/if}
    </div>
  {/each}
</main>
