const slider= document.querySelector("[data-lengthslider]");
const lengthdisplay = document.querySelector("[data-length]");

const passworddis= document.querySelector("[data-displaypassword]");
const copybtn = document.querySelector("[data-copy]")
const copymsg = document.querySelector("[data-copymsg]")
 
const uppercase= document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const number = document.querySelector("#number");
const symbols = document.querySelector("#symbols");

const indicator= document.querySelector("[data-indicator]");
const generate = document.querySelector(".button-gen");

 const allcheckbox = document.querySelectorAll("input[type=checkbox]");
 const symbolss = '~';

  // INTIALLY
let password = "";
let passwordlength= 10;
let checkcount=0;
 handleslider();

setIndicator("#ccc");
 // SET PASSWORDLENGTH
 function handleslider (){
     
      slider.value = passwordlength;
      lengthdisplay.innerText = passwordlength;
      const min =slider.min;
      const max = slider.max;
      slider.style.backgroundSize =((passwordlength-min)*100/(max-min)) + "% 100%";
 } 

 function setIndicator (color){
    indicator.style.backgroundColor = color;

    // SHADOW-HW

 }

 function getRanInteger(min,max){
   return Math.floor (Math.random()*(max-min))+min;
 }
 function genraterandnumber(){
    return getRanInteger(0,9);
 }
 function genratelowercase(){
    return String.fromCharCode(getRanInteger(97,123));
 }
 function genrateuppercase(){
    return String.fromCharCode(getRanInteger(65,91));
 }
function genratesymbol(){
    const randnum = getRanInteger(0,symbolss.length);
    return symbolss.charAt(randnum);

}
function calstrength(){
 let hasupper=false;
 let haslower = false;
 let hasnumber = false;
 let hassym= false;

 if(uppercase.checked) hasupper=true;
 if(lowercase.checked) haslower=true;
 if(number.checked) hasnumber=true;
 if(symbols.checked) hassym=true;

 if(hasupper && haslower &&(hasnumber||hassym) && passwordlength>=7){
    setIndicator("#0f0");
 }
 else if((hasupper||haslower)&&(hasnumber||hassym)&&  passwordlength>=5){
    setIndicator("#ff0")
 }
 else{
    setIndicator("#f00");
 }
}

async function copycontent(){
    try{
        await navigator.clipboard.writeText(passworddis.value);
        copymsg.innerText= "copied"
    }
     catch(e){
           copymsg.innerText="failed"
     }

     copymsg.classList.add("active");
     setTimeout( ()=>{
        copymsg.classList.remove("active");
     },1000);

}

    function shufflepassword(array){
        //fisher yates method

      for(let i=array.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i]= array[j];
        array[j]=temp; 
      }
      let str="";
      array.forEach((el)=>(str+=el));
      return str;

      }


function handlecheckboxchange(){
    checkcount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
        checkcount++;
    });


    // special condidtion

    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }
}
slider.addEventListener('input',(e) => {
    passwordlength = e.target.value;
    handleslider();
})


allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckboxchange);
})



copybtn.addEventListener('click',()=>{
    if(passworddis.value){
        copycontent();
    }
})

generate.addEventListener('click',()=>{
     //none of the checkbox are checked

     if(checkcount==0)
     return;

     if(passwordlength < checkcount){
        passwordlength = checkcount;
        handleslider();
     }
     // lets start the journey to find new password 

  password= "";


let funcArr=[];

if(uppercase.checked)
    funcArr.push(genrateuppercase);

if(lowercase.checked)
    funcArr.push(genratelowercase);
    
    if(number.checked)
    funcArr.push(genraterandnumber);

    if(symbols.checked)
    funcArr.push(genratesymbol);

  //compulsory addition
    for(let i=0;i<funcArr.length;i++){
        password +=funcArr[i]();
    }

   //additonal addition
   for(let i=0;i<passwordlength-funcArr.length;i++){
    let randindex = getRanInteger(0,funcArr.length);
    password += funcArr[randindex]();

   } 
   // shuffle the password
   password= shufflepassword(Array.from(password));

   passworddis.value = password;

   calstrength();



});
