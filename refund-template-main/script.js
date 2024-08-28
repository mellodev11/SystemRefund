const amount  = document.getElementById("amount")



amount.oninput = () =>{
  let value = amount.value.replace(/\D/g, "")
  
  value = Number(value) / 100
  
  amount.value = formtCurrencyBRL(value) 
}

function formtCurrencyBRL(value){
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  } )
  return value
}
