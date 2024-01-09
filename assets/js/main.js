//Example Code

fetch('https://fakestoreapi.com/products/1')
            .then(res=>res.json())
            .then(json=>console.log(json))


//Get all products

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => console.log(json))

//Get a single product


fetch('https://fakestoreapi.com/products/1')
    .then(res => res.json())
    .then(json => console.log(json))


//Limit results

fetch('https://fakestoreapi.com/products?limit=5')
    .then(res => res.json())
    .then(json => console.log(json))

//Sort results

fetch('https://fakestoreapi.com/products?sort=desc')
    .then(res => res.json())
    .then(json => console.log(json))

//Get all categories

fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(json => console.log(json))


    //Sort results

    fetch('https://fakestoreapi.com/products?sort=desc')
    .then(res=>res.json())
    .then(json=>console.log(json))

    




