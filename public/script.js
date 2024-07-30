async function getdata(){
    let datas=await axios.get(`http://localhost:7777/categories`)
    try{
        console.log(datas)
        createcards(datas.data)

    }catch(err){
        console.log(err)
    }
}
getdata()
let cards=document.querySelector(".cards")
let addForm=document.querySelector(".add-form")
let nameInp=document.querySelector(".nameInp")
let prInp=document.querySelector(".prInp")



function createcards(gulovshe){
    console.log(gulovshe)
    cards.innerHTML=""
    gulovshe.forEach(datas=> {
        cards.innerHTML+=`<div class="card1">
                <img src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="">
               
               <div class="content">
                <strong>${datas.name}</strong>
                <nav class="item">
                <p class="firstprice">$200.00</p>
                <p> $${datas.price}</p>
                </nav>
               </div> 
                <button type="submit">Add to Cart</button>
                <button data-id=${datas._id} class="deleteBtn"> delete</button>    

             
         </div>`
                
                let deleteBtns=document.querySelectorAll(".deleteBtn")
                deleteBtns.forEach(deleteBtn=>{
                    deleteBtn.addEventListener("click",async function(){
                        let id = deleteBtn.getAttribute("data-id")
                        console.log(id)
                        await axios.delete(`http://localhost:7777/categories/${id}`)
                        getdata()
                    })
                })
    })
}


addForm.addEventListener("submit",async function(event){
    event.preventDefault()
    let newCategory={
        name:nameInp.value,
        price:prInp.value
    
    }
    await axios.post( `http://localhost:7777/categories`,newCategory)
     nameInp.value=""
     prInp.value=""
     getdata()
    
})
