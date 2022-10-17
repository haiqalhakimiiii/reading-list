<script>
   import { createEventDispatcher } from 'svelte';
   import { onMount } from 'svelte'

   const dispatch = createEventDispatcher()
   let novels = []

   onMount(async () => {
      fetch("http://localhost:3000/novels")
      .then(response => response.json())
      .then(data => {
            novels = data
      }).catch(error => {
         console.log(error);
         return [];
      });
   })
</script>

<div class="container">
   <div class="row">
      {#each novels as novel }
         <div class="col my-1">
            <div class="mx-auto border" style="width: 18rem;">
               <img class="card-img-top" src={novel.img} alt={novel.title}>
               <div class="card-body">
                  <h5>{novel.title}</h5>
                  <p>{novel.description}</p>
                  <button on:click={()=> dispatch('detailChange',novel)}>Details</button>
               </div>
            </div>
         </div>
      {/each}
   </div>
</div>

<style>
   img{
      height: 350px;
      width: 286px;
   }
</style>