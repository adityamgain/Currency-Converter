
const droplist=document.querySelectorAll(".drop-list select"),
from=document.querySelector(".from select"),
to=document.querySelector(".to select"),
getButton=document.querySelector("form button");
const exchangeratetxt=document.querySelector(".exchange-rate");


for(let i=0;i<droplist.length;i++){
    for(currency_code in country_code){
        let selected;
        if(i==0){
            selected=currency_code == "USD";
        }
        else if(i==1){
            selected=currency_code == "NPR";
        }
        let optionTag=`<option value="${currency_code}">${currency_code}</option>`;
        droplist[i].insertAdjacentHTML("beforeend",optionTag);
    }
    droplist[i].addEventListener("change",e=>{
        loadflag(e.target);
    });
}

function loadflag(element){
    for(code in country_code){
        if(code == element.value){
            let imgTag=element.parentElement.querySelector("img");
            let pic=country_code[code].toLowerCase()
            imgTag.src=`https://flagcdn.com/16x12/${pic}.png`
        }
    }
}

getButton.addEventListener("click",e=>{
    e.preventDefault();
    getExchangeRate();
});

function getExchangeRate(){
    const amount= document.querySelector(".amount input");
    let amountVal= amount.value;
    const api='f6e1de3beb7c35562a820fa1';
    if(amountVal== "" || amountVal =="0"){
        amount.value="1";
        amountVal=1;
    }
    exchangeratetxt.innerHTML="fetching...";
    let url=`https://v6.exchangerate-api.com/v6/${api}/latest/${from.value}`;
    fetch(url).then(response => response.json()).then(result=>{
        let exchangerate=result.conversion_rates[to.value];
        let totalexchangerate=(amountVal*exchangerate).toFixed(2);
        exchangeratetxt.innerText=`${amountVal} ${from.value}=${totalexchangerate} ${to.value}`
    })
}