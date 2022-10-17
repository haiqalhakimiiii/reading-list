<script>
   import { onMount } from 'svelte'
   import { createEventDispatcher } from "svelte";
   import EditFormMmw from './EditFormMmw.svelte';
   const dispatch = createEventDispatcher()

   export let id
   let mmw = {}
   onMount(async () => {
      fetch("http://localhost:3000/mmws/"+id)
      .then(response => response.json())
      .then(data => {
         mmw = data
      }).catch(error => {
         console.log(error);
         return [];
      });
   })

   let edit = false
   
   function editForm(){
      edit = !edit
   }
   
</script>

<div>
   <div class="container">
      <div class="row mx-auto my-5">
         <div class="col text-center">
            <img src={mmw.img} alt={mmw.title}>
         </div>
         <div class="col">
            <div class="row">
               <div class="col text-start">
                  <h5>{mmw.title}</h5>
                  <p class="border-bottom">Author:{mmw.author}</p>
                  <p>{mmw.description}</p>
                  <p>{mmw.synopsis}</p>
                  <p>Rating: {mmw.rate}/10</p>
                  <a href={mmw.link}>Read the novel</a>
               </div>
            </div>
         </div>
      </div>
      <div class="row">
         <div class="col text-end">
            <button on:click={editForm}>Edit</button>
            <button class="button" on:click={() => dispatch('detailChange',{})}>Back</button>
         </div>
      </div>
      {#if edit}
         <div class="row">
            <div class="col">
               <EditFormMmw {id} {mmw} on:editForm={editForm}/>
            </div>
         </div>
      {/if}
      
   </div>
   
</div>

<style>
   img{
      max-height: 500px;
      max-width: 400px;
   }
</style>