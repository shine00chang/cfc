<script>
import { fetchPost } from "$lib/util/fetch.ts";
let classname;
let message = '';

const onCreate = async (e) => {
  const body = { classname };
  const res = await fetchPost(`/api/class/create`, body)
  const text = await res.text();
  console.log(res.status, text);

  if (res.status >= 400) {    
    message = text;
  } else {
    document.getElementById("create_class_modal").close();
  }
}


</script>

<!-- Open the modal using ID.showModal() method -->
<dialog id="create_class_modal" class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 class="font-extrabold text-lg">Create Class</h3>
    <p class="py-4">Class name (this cannot be changed):</p>

    <p class="bg-primary text-primary-content rounded-full">{message}</p>
    
    <input bind:value={classname} type="text" placeholder="class name" class="input input-bordered w-full max-w-xs">

    <div class="modal-action">
      <button on:click={onCreate} class="btn border-1 border-base-content">Create</button>
    </div>
  </div>
</dialog>

<a onclick="create_class_modal.showModal()" 
  class="mx-4 p-2 absolute rounded-full bg-transparent border-[1px] border-base-content hover:bg-base-200"
  style="transition: all 200ms; right: 2rem; bottom: 4rem;">
  Create +
</a>
