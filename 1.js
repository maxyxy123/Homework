
let a = [1,2,3,4,5,6]




const products = ["Tivi", "Tu lanh", "May giat", "phone"];


let sp = prompt("nhap ten san pham");

let index = -1;

for (let i = 0; i < products.length; i++) {
    if (products[i].toLowerCase().trim() === sp.toLowerCase().trim()) {
        index = i; 
        break;    
    }
}

if (index !== -1) {
    console.log(`san phamz "${sp}" nam o vtri so ${index}`);
} else {
    console.log(`ko thay san pham "${sp}" o trong products list`);
    console.log(index);
    
}