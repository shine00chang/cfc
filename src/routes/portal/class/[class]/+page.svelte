<script lang="ts">
  import { fetchPost } from '$lib/util/fetch.ts';
  import { page } from '$app/stores';
  import { invalidateAll } from '$app/navigation';

  export let data;
  const { class_, user } = data;

  //show make sub, make reply
  let show_sub: string = "";
  let show_reply: string = "";

  let sub_value: string;
  let reply_value: string;

  function show_sub_f(post_id: string) {
    sub_value = "";
    show_reply = "";
    show_sub = post_id;
  }
  function show_reply_f(post_id: string) {
    reply_value = "";
    show_sub = "";
    show_reply = post_id;
  }

  async function send_sub(post_id: string) {
    await fetchPost("/api/class/post/submit", {
      classid: class_.id,
      postid: post_id,
      content: sub_value,
    });
    //reload page?
    location.reload();
  }

  async function send_reply(post_id: string) {
    await fetchPost("/api/class/post/reply", {
      classid: class_.id,
      postid: post_id,
      content: reply_value,
    });
    //reload page?
    location.reload();
  }

  const posts = class_.posts.sort((a,b) => b.timestamp - a.timestamp);

  //todo: teachers delete post
</script>

<main>
  <h1>{class_.name}</h1>
  {#if class_.teachers.includes(user.username)}
    <a href="{$page.url.pathname}/create">Create Posts</a>
    <br>
  {/if}
  <h2>Latest Posts</h2>
  {#each posts as post}
    <div>
      <h3>{post.title}</h3>
      <span class="tooltip" data-tip={post.author.username}>by {post.author.name} at {post.timestamp}</span>
      {#if post.type === "text"}
        <p>{post.content}</p>
      {:else if post.type === "pdf"}
         <p>this is a pdf</p>
      {/if}
      <hr>
      {#if post.submissions.length > 0}
        <div>
          {#each post.submissions as s}
            <div>
              <span class="tooltip" data-tip={s.author.username}>{s.author.name} at {s.timestamp}</span>
              <br>
              <span>
                {#if s.content.startsWith("http://") || s.content.startsWith("https://")}
                  <a href={s.content}>{s.content}</a>
                {:else}
                  {s.content}
                {/if}
              </span>
            </div>
          {/each}
        </div>
      {/if}
      {#if show_sub === post.id}
        <div>
          <input bind:value={sub_value} type="text" placeholder="link to your submission..."/>
          <button on:click={()=>send_sub(post.id)}>Submit Submission</button>
        </div>
      {:else}
        <button on:click={()=>show_sub_f(post.id)}>Add Submission</button>
      {/if}
      <div>
        {#each post.replies as r}
          <div>
            <span class="tooltip" data-tip={r.author.username}>{r.author.name} at {r.timestamp}</span>
            <p>{r.content}</p>
          </div>
        {/each}
      </div>
      {#if show_reply === post.id}
        <div>
          <textarea bind:value={reply_value} placeholder="A comment..."/>
          <button on:click={()=>send_reply(post.id)}>Submit Reply</button>
        </div>
      {:else}
        <button on:click={()=>show_reply_f(post.id)}>Add Reply</button>
      {/if}
    </div>
  {/each}
</main>
