<script lang="ts">
  import { goto } from "$app/navigation";
  import CreateClassBtn from "$lib/CreateClassBtn.svelte";

  export let data;
  const { classes } = data;
</script>


<div class="flex flex-row flex-wrap w-full gap-10 p-8">
  {#if classes.length === 0}
    <div class="mx-auto w-full md:w-64 text-3xl text-base-300 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-base-300"><rect width="24" height="24" opacity="0"/><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm5 9a5 5 0 0 1-10 0z" id="🎨-Icon-Сolor"/></svg>
      Yippie~ no classes!
    </div>
  {/if}
  {#each classes as class_}
    <div on:click={_ => goto(`/portal/class/${class_.id}`)}
      class="card w-full md:w-96 h-52 bg-base-100 text text-primary-content overflow-hidden border-[1px] border-base-content rounded-[2rem] rounded-bl-none">
      <div class="w-full bg-primary" style="height: 2rem"></div>
      <div class="card-body">
        <div class="card-title text-2xl font-bold tracking-widest">
          <div class="font-bold">
            { class_.name }
            <br>
            <span class="tracking-tight text-sm">
              { class_.id }
            </span>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>

<!-- Create Class Button -->
<CreateClassBtn />
