<script>
   import { createEventDispatcher } from 'svelte'
   
   const dispatch = createEventDispatcher()

   export let id
   export let mmw

   let toEditMmw = {
      title : mmw.title,
      author : mmw.author,
      description : mmw.description,
      synopsis : mmw.synopsis,
      rate: mmw.rate,
      link: mmw.link,
      img : mmw.img
   }

   function update(){
      fetch('http://localhost:3000/mmw/'+id,{
         method:  'PATCH',
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify(toEditMmw)
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
               <input type="text" placeholder="Title" bind:value={toEditMmw.title}>
               <input type="text" placeholder="Author" bind:value={toEditMmw.author}><br><br>
               <textarea cols="50" rows="8" placeholder="Description(Optional)" bind:value={toEditMmw.description}></textarea><br>
               <textarea cols="50" rows="8" placeholder="Synopsis" bind:value={toEditMmw.synopsis}></textarea><br><br>
               Rate: <input type="number" placeholder="Rate" bind:value={toEditMmw.rate}><br><br>
               <input type="text" placeholder="Link to read" bind:value={toEditMmw.link}>
               <input type="text" placeholder="Link of image" bind:value={toEditMmw.img}><br><br>
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