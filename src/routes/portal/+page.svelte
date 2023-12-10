<script lang="ts">
  import Navbar from "$lib/Navbar.svelte";

  export let data;
  const { classes } = data;
</script>

<Navbar/>

<!-- Temporary testing elements -->
<div class="w-full flex flex-row gap-8">
  <a href="portal/class/new">New Class</a>
</div>

<div class="flex flex-row flex-wrap w-full gap-10 p-8">
  {#each classes as class_}
    <div on:click={_ => goto(`/portal/class/{class_.id}`)}
      class="card w-52 h-52 bg-base-100 text text-primary-content drop-shadow-2xl overflow-hidden"
      style="border-radius: 1.5rem">
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
