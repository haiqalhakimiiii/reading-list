<script>
   import { onMount } from 'svelte'
   import { createEventDispatcher } from "svelte";
   import EditFormNovel from './EditFormNovel.svelte';
   const dispatch = createEventDispatcher()

   export let id
   let novel = {}
   onMount(async () => {
      fetch("http://localhost:3000/novels/"+id)
      .then(response => response.json())
      .then(data => {
            novel = data
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
            <img src={novel.img} alt={novel.title}>
         </div>
         <div class="col">
            <div class="row">
               <div class="col text-start">
                  <h5>{novel.title}</h5>
                  <p class="border-bottom">Author:{novel.author}</p>
                  <p>{novel.description}</p>
                  <p>{novel.synopsis}</p>
                  <p>Rating: {novel.rate}/10</p>
                  <a href={novel.link}>Read the novel</a>
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
               <EditFormNovel {id} {novel} on:editForm={editForm}/>
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