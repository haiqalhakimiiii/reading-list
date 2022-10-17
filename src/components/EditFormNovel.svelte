<script>
   import { createEventDispatcher } from 'svelte'
   
   const dispatch = createEventDispatcher()

   export let id
   export let novel

   let toEditNovel = {
      title : novel.title,
      author : novel.author,
      description : novel.description,
      synopsis : novel.synopsis,
      rate: novel.rate,
      link: novel.link,
      img : novel.img
   }

   function update(){
      fetch('http://localhost:3000/novel/'+id,{
         method:  'PATCH',
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify(toEditNovel)
      })
         .then(response => response.json())
         .then(result => console.log(result))

      dispatch('editForm')   
   }

   
</script>

<div>
   <div class="container">
      <div class="row">
         <div class="col text-center middle mb-3">
            <p>Add a List</p>
            <form>
               <input type="text" placeholder="Title" bind:value={toEditNovel.title}>
               <input type="text" placeholder="Author" bind:value={toEditNovel.author}><br><br>
               <textarea cols="50" rows="8" placeholder="Description(Optional)" bind:value={toEditNovel.description}></textarea><br>
               <textarea cols="50" rows="8" placeholder="Synopsis" bind:value={toEditNovel.synopsis}></textarea><br><br>
               Rate: <input type="number" placeholder="Rate" bind:value={toEditNovel.rate}><br><br>
               <input type="text" placeholder="Link to read" bind:value={toEditNovel.link}>
               <input type="text" placeholder="Link of image" bind:value={toEditNovel.img}><br><br>
               <button on:click={() => update()}>Update</button>
               <button on:click|preventDefault={() => dispatch('editForm')}>Close</button>
            </form>
         </div>
      </div>
   </div>
</div>

<style>
   .middle{
      margin-top: 50px;
   }
</style>