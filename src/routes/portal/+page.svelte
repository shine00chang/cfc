<script lang="ts">
  export let data;
  const { classes } = data;
</script>

<!-- Temporary testing elements -->
<div class="w-full flex flex-row gap-8">
  <a href="portal/class/new">New Class</a>
  <a href="portal/class/join">Join Class</a>
</div>

<div class="flex flex-row flex-wrap w-full gap-8 p-8">
  {#each classes as class_}
    <div class="h-52 w-52 bg-stone-200 rounded-xl drop-shadow-2xl flex flex-col items-center">
      <div class="text-2xl font-bold">
        { class_.name }
      </div>
      <div class="text-sm">
        { class_.id }
      </div>
    </div>
  {/each}
</div>
