import React from 'react';

const AddProduct = () => {
    const [name,setName]=React.useState('');
    const [price,setPrice]=React.useState('');
    const [catagory,setCatagory]=React.useState('');
    const [company,setCompany]=React.useState('');
    const [error,setError]=React.useState(false);
    const addProduct=async ()=>{
        console.warn(!name);
        if(!name || !price || !catagory || !company)
        {
            setError(true);
            return false;
        }
        
        console.warn(name,price,catagory,company);
        const userId =JSON.parse(localStorage.getItem('user'))._id;
        let result =await fetch("http://localhost:5000/add-product",{
            method:'post',
            body:JSON.stringify({name,price,catagory,company,userId}),
            headers:{
                "Content-Type":"application/json",
                Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result= await result.json();
        console.warn(result);
    }
    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input type="text" className='inputBox' placeholder='Enter product name' onChange={(e)=>{setName(e.target.value)}} value={name}/>
            {error && !name && <span className='invalid-input'>Enter valid name</span>}
            <input type="text" className='inputBox' placeholder='Enter product price' onChange={(e)=>{setPrice(e.target.value)}} value={price}/>
            {error && !price && <span className='invalid-input'>Enter valid price</span>}
            <input type="text" className='inputBox' placeholder='Enter product category' onChange={(e)=>{setCatagory(e.target.value)}} value={catagory} />
            {error && !catagory && <span className='invalid-input'>Enter valid category</span>}
            <input type="text" className='inputBox' placeholder='Enter product company' onChange={(e)=>{setCompany(e.target.value)}} value={company}/>
            {error && !company && <span className='invalid-input'>Enter valid company</span>}
            <button className='appButton' onClick={addProduct}>Add Product</button>
        </div>
    );
}

export default AddProduct;
