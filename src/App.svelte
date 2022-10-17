<script>
   import NovelDetails from "./components/NovelDetails.svelte";
   import Header from "./components/Header.svelte";
   import Mmw from "./components/MMW.svelte";
   import Novel from "./components/Novel.svelte";
   import Tabs from "./components/Tabs.svelte";
    import MmwDetails from "./components/MMWDetails.svelte";
    import AddForm from "./components/AddForm.svelte";

   let items = ['Novel', 'MMW']
   let activeItem = 'Novel'

   let detail = false
   let item
   let id

   let form = false

   function detailChange(e){
      detail = !detail
      item = e.detail
      id = item._id
   }

   function tabChange(e){
      activeItem = e.detail
   }

   function addForm(){
      form = !form
   }
</script>

<Header on:addForm={addForm} />
<main>
   {#if form}
      <AddForm on:addForm={addForm}/>  
   {:else if detail}
      {#if activeItem === 'Novel'}
         <NovelDetails {id} on:detailChange={detailChange}/> 
      {:else}
         <MmwDetails {id} on:detailChange={detailChange}/>
      {/if}
   {:else}
      <Tabs {items} {activeItem} on:tabChange={tabChange} />
      {#if activeItem === 'Novel'}
         <Novel on:detailChange={detailChange}/>
      {:else if activeItem === 'MMW'}
         <Mmw on:detailChange={detailChange}/>
      {/if}
   {/if}
</main>

<style>

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>