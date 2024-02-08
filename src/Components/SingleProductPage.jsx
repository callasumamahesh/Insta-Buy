import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function SingleProductPage({cart,handleCart}) {
    
    const location = useLocation()
    let navigate = useNavigate()
    const {images,title,price,description,category,id} = location.state;

    const [screenForMobiles,setScreenForMobiles] = useState(
        window.innerWidth <= 600
    )

        useEffect(()=>{
            const isScreen = ()=>{
                setScreenForMobiles(window.innerWidth <= 600)
            }
            isScreen()
            window.addEventListener('resize',isScreen)
            return () => {
                window.removeEventListener('resize',isScreen)
            }
        },[])

    const [products,setProducts] = useState([])

    useEffect(()=>{
        async function getData(){
            const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${category.id || 1}/products?limit=20&offset=0`)
            setProducts(response.data)
        }
        getData()
    },[])
    const TenProducts = products.slice(0,12)
    const SinglePageStyle = {
        display:'grid',
        gridTemplateColumns : '0.8fr 2fr 3fr',
        gap:'1rem',
        justifyContent:'center',
        alignItems:'flex-start',
    }
    const SimilarImages = {
        display:'flex',
        flexDirection:'column',
        gap:'1rem',
        justifyContent:'flex-start',
        alignItems:'center',
    }
    const imageStyle = {
        width:'100px',
        height:'100px',
    }
    const ProductDetails = {
        width:'450px',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems : 'flex-start',
        margin:'auto',
    }
    const SingleImage = {
        width:'400px',
        height:'300px',
        margin:'auto',
        borderRadius:'10px',
        boxShadow : '5px 5px 10px gray'
    }
    const AddtoCartButton = {
        width:'200px',
        padding:'10px',
        backgroundColor:'blue',
        color:'white',
        borderRadius:'10px',
        marginTop:'1rem'
    }
    const SimilarProductImage = {
        width:'150px',
        height:'150px',
        borderRadius:'10px',
    }
    const singleProductdiv ={
        width:'200px',
        height:'250px',
    }
    const viewDetails = {
        width:'120px',
        margin:'0.5rem 1rem',
        padding:'7px',
        backgroundColor:'blue',
        borderRadius:'10px',
        color:'white',
    }

    const pageStyle = {
        display : screenForMobiles ? 'flex' : 'grid',
        flexDirection : screenForMobiles ? 'column': 'row',
    }
    const TotalStyles = {...SinglePageStyle,...pageStyle}
  return (
    <div style={TotalStyles}>
        <section style={{SimilarImages, flexDirection : screenForMobiles ? 'row' : 'column',}}>
            {images.map((image,index)=>{
                return(
                    <img key={index} src={image} alt="images" style={imageStyle}/>
                )
            })}
        </section>
        <section style={ProductDetails}>
            <img style={SingleImage} src={images[0]} alt="" />
            <h2 style={{textAlign:'start',marginTop:'1rem'}}>{title}</h2>
            <h5 style={{textAlign:'start',marginTop:'1rem'}}>${price}.00</h5>
            <p style={{marginTop:'1rem'}}>{description.split(' ').slice(0,10).join(' ')}</p>
            <button style={AddtoCartButton} onClick={() => {
                if(id in cart){
                    const alreadytItem = cart[id];
                    handleCart({[id] : {title,price :alreadytItem.price,quantity:alreadytItem.quantity + 1}})
                    //console.log({[id] : {title,price :alreadytItem.price,quantity:alreadytItem.quantity + 1}})
                }
                else{
                    handleCart({[id] : {title,price,quantity:1}})
                    //console.log({[id] : {title,price,quantity:1}})
                }
                navigate('/cart')
                
            }}>Add To Cart</button>
        </section>
        <section>
            <h1 style={{textAlign:'center',marginBottom:'1rem'}}>Other Similar Products</h1>
            <div className='allSingleProduct'>
            {TenProducts.map((singleProduct, index) => {
                if(singleProduct.id == id) return 
                return(
                <div key={index} style={singleProductdiv}>
                    <img src={singleProduct.images[0]} alt="Photo" style={SimilarProductImage}/>
                    <p style={{marginBottom:'0px'}}>{singleProduct.title.split(' ').slice(0, 2).join(' ')}</p>
                    <h6>${singleProduct.price}.0</h6>
                    <button style={viewDetails} onClick={()=>{navigate(`/products/${singleProduct.id}`,{state : singleProduct})}}>View Product</button>
                </div>
                )
            })}

            </div>
        </section>
    </div>
  )
}
export default SingleProductPage