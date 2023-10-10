'use client'
import { useState } from "react";
const PizzaCreate = () => {
    const [open, setOpen] = useState(true)
    const openOk = () => {setOpen(!open)}

    const handleSubmit = async (e: any) => { 
        e.preventDefault();
        const title = e.target[0].value;
        const desc = e.target[1].value;
        const img = e.target[2].value;
        const price = e.target[3].value;
        //const content = e.target[3].value;
       
        try {
          await fetch("/api/pizzas", {
            method: "POST",
            body: JSON.stringify({
              title,
              desc,
              img,
              price,
              //content,
            }),
          });
          e.target.reset()
        } catch (err) {
          console.log(err);
        }
      };
    if (open) {return (<button onClick={openOk}
      className="bg-red-500 text-white rounded-md w-1/4 self-end"
    >Create pizza</button>)}
    
        return (<div >
            <button onClick={openOk}  className="bg-red-500 text-white rounded-md w-1/4 self-end">Close</button>
        
        <form  onSubmit={handleSubmit} className="flex flex-col">
          <h1>Add New Pizza</h1>
          <input type="text" placeholder="Title" />
          <input type="text" placeholder="Desc"  />
          <input type="text" placeholder="Image"  />
          <input type="number" placeholder="Price"  />
          <textarea
            placeholder="Content"          
            //cols="30"
            //rows="10"
          ></textarea>
          <button >Send</button>
        </form>
      
  



        </div>

        )

    };
export default PizzaCreate;
