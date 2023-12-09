<script lang="ts">
  export let data;
  const { classes } = data;
</script>

<!-- Temporary testing elements -->
<div class="w-full h-48 flex flex-row">
  <a href="/new-class">New Class</a>
</div>

<div class="flex flex-row flex-wrap w-full gap-8 p-8">
  {#each classes as class_}
    <div class="h-52 w-52 bg-stone-200 rounded-xl drop-shadow-2xl">
      { class_.name }
      { class_.type }
    </div>
  {/each}
</div>
