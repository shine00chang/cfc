<script lang="ts">
<<<<<<< HEAD
=======
  import { goto } from "$app/navigation";
>>>>>>> 5849aa1 ((ui) #2)
  import CreateClassBtn from "$lib/CreateClassBtn.svelte";

  export let data;
  const { classes } = data;
</script>


<div class="flex flex-row flex-wrap w-full gap-10 p-8">
  {#each classes as class_}
    <div on:click={_ => goto(`/portal/class/${class_.id}`)}
      class="card w-52 h-52 bg-base-100 text text-primary-content overflow-hidden border-[1px] border-base-content rounded-[2rem] rounded-bl-none">
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
