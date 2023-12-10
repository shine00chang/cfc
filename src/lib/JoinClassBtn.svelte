<script>
import { fetchPost } from "$lib/util/fetch.ts";

let joinModalClassid;
let joinModalMessage = '';

const onJoin = async (e) => {
  const body = { classid: joinModalClassid };
  const res = await fetchPost(`/api/class/join`, body)
  const text = await res.text();
  console.log(res.status, text);

  if (res.status >= 400) {    
    joinModalMessage = text;
  } else {
    document.getElementById("join_class_modal").close();
  }
}
</script>

<!-- Open the modal using ID.showModal() method -->
<dialog id="join_class_modal" class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 class="font-extrabold text-lg">Join Class</h3>
    <p class="py-4">Enter the class ID (you should receive this from your instructor)</p>

    <p class="bg-primary text-primary-content rounded-full">{joinModalMessage}</p>
    
    <input bind:value={joinModalClassid} type="text" placeholder="class id" class="input input-bordered w-full max-w-xs">

    <div class="modal-action">
      <button on:click={onJoin} class="btn border-1 border-base-content">Join</button>
    </div>
  </div>
</dialog>

<!-- Join Class -->
<a onclick="join_class_modal.showModal()" class="mx-4 p-2 rounded-full bg-transparent hover:bg-base-200"
  style="transition: all 200ms;">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 stroke-width-[2px]"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"/></svg>
</a>
