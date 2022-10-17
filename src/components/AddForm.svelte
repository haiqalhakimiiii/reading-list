<script>
   import { createEventDispatcher } from 'svelte'

   const dispatch = createEventDispatcher()
   let list = {
      title : '',
      author : '',
      desc : '',
      rate : 0,
      link : '',
      img : '',
      synopsis : ''
   }
   let category = ''

   function add(){
      if(category === 'Novel'){
         async function doPost() {
            const res = await fetch('http://localhost:3000/novel',{
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(list)
            })
            const response = await res.json()
            result = JSON.stringify(response)
         }
         doPost()
      }
      else{
         async function doPost() {
            const res = await fetch('http://localhost:3000/mmw',{
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(list)
            })
            const response = await res.json()
            result = JSON.stringify(response)
         }
         doPost()
      }
      dispatch('addForm')
   }

   
</script>

<div>
   <div class="container">
      <div class="row">
         <div class="col text-center middle mb-3">
            <p>Add a List</p>
            <form>
               <input type="text" placeholder="Title" bind:value={list.title}>
               <input type="text" placeholder="Author" bind:value={list.author}><br><br>
               <textarea cols="50" rows="8" placeholder="Description(Optional)" bind:value={list.description}></textarea><br>
               <textarea cols="50" rows="8" placeholder="Synopsis" bind:value={list.synopsis}></textarea><br><br>
               Rate: <input type="number" placeholder="Rate" bind:value={list.rate}><br><br>
               <input type="text" placeholder="Link to read" bind:value={list.link}>
               <input type="text" placeholder="Link of image" bind:value={list.img}><br><br>
               Category <select bind:value={category}>
                           <option value="Novel">Novel</option>
                           <option value="MMW">Manga/Manwha/Webtoons</option>
                        </select>
               <button on:click={() => add()}>Add</button>
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