<script>
   import { createEventDispatcher } from "svelte";
   const dispatch = createEventDispatcher()
</script>

<header>
   <div class="container">
      <div class="row">
         <div class="col middleh">
            <p class="text-start">Al's Reading List</p>
         </div>
         <div class="col text-end">
            <button on:click={() => dispatch('addForm')} class="btn btn-outline-secondary">Add list</button>
         </div>
      </div>
   </div>
</header>

<style>
   header{
      background: #f7f7f7;
      padding: 20px;
   }
   .middleh{
      height: 40px;
      line-height: 40px;
   }
   p{
      color: #ff3e00;
      font-size: 1em;
		font-weight: 100;
   }
</style>