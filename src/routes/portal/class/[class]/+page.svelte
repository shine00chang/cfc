<script lang="ts">
  import { fetchPost } from '$lib/util/fetch.ts';
  import { page } from '$app/stores';
  import { timestamp_to_string } from '$lib/util/time.ts';

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

<main class="md:p-10">
  <p class="text-5xl my-6">{class_.name}</p>


  <div class="flex flex-row w-full">
    {#if class_.teachers.includes(user.username)}
      <a href="{$page.url.pathname}/create" class="btn">Create Posts</a>
      <br>
    {/if}

    <div class="flex-grow"></div>

    <p class="text-2xl">Latest Posts</p>
  </div>
  <hr class="my-4">

  <div class="my-4 flex flex-col items-center gap-8">
  {#each posts as post}

    <!-- Post -->
    <div class="card w-full border-[1px] border-base-content">
      <div class="card-body">

        <!-- Title -->
        <div class="card-title w-full">
          <div class="w-full">
            <p class="text-2xl md:text-4xl">{post.title}</p>
            <div class="flex flex-row w-full">
              <div class="flex-grow"></div>
              <span class="tooltip italic text-sm" data-tip={post.author.username}>by {post.author.name} at {timestamp_to_string(post.timestamp)}</span>
            </div>
          </div>
        </div>

        <!-- Body --> 
        {#if post.type === "text"}
          <p>{post.content}</p>
        {:else if post.type === "youtube"}
          <iframe title="youtube video" class="w-full" src="https://www.youtube.com/embed/{post.content.split("=")[1]}" height="500" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>
        {:else if post.type === "link"}
          <a href={post.content}>{post.content}</a>
        {:else if post.type === "pdf"}
          <p>this is a pdf</p>
          <!--do validation on post submit instead pronbably-->
          {#if post.content.startsWith("http")}
            <embed src="https://drive.google.com/viewerng/viewer?embedded=true&url={post.content}" class="w-full" height="375">
          {:else}
            <p>PDF url was invalid, could not load.</p>
          {/if}
        {/if}
        <hr>

        <!-- Submissions -->
        {#if post.submissions.length > 0}
          <div>
            {#each post.submissions as s}
              <div>
                <span class="tooltip" data-tip={s.author.username}>{s.author.name} at {timestamp_to_string(s.timestamp)}</span>
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

        <!-- New Submission -->
        {#if show_sub === post.id}
          <div class="flex flex-row items-center">
            <textarea class="textarea textarea-bordered w-full h-8" placeholder="your submission..." bind:value={sub_value}/>
            <button class="btn btn-ghost mx-2 px-1 w-8" on:click={()=>send_sub(post.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" opacity="0"/><path d="M21 4a1.31 1.31 0 0 0-.06-.27v-.09a1 1 0 0 0-.2-.3 1 1 0 0 0-.29-.19h-.09a.86.86 0 0 0-.31-.15H20a1 1 0 0 0-.3 0l-18 6a1 1 0 0 0 0 1.9l8.53 2.84 2.84 8.53a1 1 0 0 0 1.9 0l6-18A1 1 0 0 0 21 4zm-4.7 2.29l-5.57 5.57L5.16 10zM14 18.84l-1.86-5.57 5.57-5.57z"/></svg>
            </button>
          </div>
        {:else}
          <button class="btn btn-ghost" on:click={()=>show_sub_f(post.id)}>Add Submission</button>
        {/if}

        <!-- Reply list -->
        <div>
        {#each post.replies as r}
          <div class="flex flex-row">
            <p class="flex-grow">{r.content}</p>
            <span class="tooltip" data-tip={r.author.username}>{r.author.name} at {timestamp_to_string(r.timestamp)}</span>
          </div>
        {/each}
        </div>

        <!-- New reply -->
        <div class="flex flex-row items-center">
          <textarea class="textarea textarea-bordered w-full h-8" placeholder="reply" bind:value={reply_value}/>
          <button class="btn btn-ghost mx-2 px-1 w-8" on:click={()=>send_reply(post.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" opacity="0"/><path d="M21 4a1.31 1.31 0 0 0-.06-.27v-.09a1 1 0 0 0-.2-.3 1 1 0 0 0-.29-.19h-.09a.86.86 0 0 0-.31-.15H20a1 1 0 0 0-.3 0l-18 6a1 1 0 0 0 0 1.9l8.53 2.84 2.84 8.53a1 1 0 0 0 1.9 0l6-18A1 1 0 0 0 21 4zm-4.7 2.29l-5.57 5.57L5.16 10zM14 18.84l-1.86-5.57 5.57-5.57z"/></svg>
          </button>
        </div>
      </div>
    </div>
  {/each}
  </div>
</main>
