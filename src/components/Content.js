import { useEffect, useState } from "react"

function Content(){
   const [animeclickcount,Setanimeclickcount]=useState([])
   const [score,Setscore]=useState(0)
   const [highscore,Sethighscore]=useState(0)
   
   useEffect(()=>{
       fetch("https://api.jikan.moe/v4/anime/9969/characters",{mode:'cors'}).then((response)=>{ return response.json()}).then((info)=>{
           let arr=[]
           for(let j=0;j<24;j++){
               arr.push({name:`${info.data[j].character.name}`, clicks:0, image:`${info.data[j].character.images.jpg.image_url}`})
           }
          Setanimeclickcount(arr)
       })  
    },[])

    useEffect(()=>{
     if(animeclickcount.length===24){   
      console.log(animeclickcount)
    
      let stylecards= document.querySelectorAll('.card')
      let rndint=0
      for(let i=0;i<12;i++){
          rndint=Math.floor(Math.random() * (23 - 0 + 1)) + 0;
          stylecards[i].style.cssText=`background-image: url(${animeclickcount[rndint].image})`
          stylecards[i].textContent=`${animeclickcount[rndint].name}`
      }
      } 
    },[animeclickcount])

    useEffect(()=>{
        let stylescore = document.querySelector('.score')
        stylescore.textContent=`SCORE : ${score}`
    },[score])

    useEffect(()=>{
        let stylehighscore = document.querySelector('.highscore')
        stylehighscore.textContent=`HIGHSCORE : ${highscore}`
        Setscore(0)
    },[highscore])

   
    function handleClick(e){
        const temp = animeclickcount.concat()
        for(let k=0;k<24;k++){
            if(temp[k].name === e.target.textContent){
                  if(temp[k].clicks===0){
                      temp[k].clicks=temp[k].clicks + 1;
                      Setscore(score+1)
                  }
                  else if(temp[k].clicks===1){
                      if(highscore<score){
                          Sethighscore(score)
                      }
                      else{
                          Setscore(0)
                      }
                  }
    
            }
        }
        Setanimeclickcount(temp) 
    }

    let cards = []
    for(let i=0;i<12;i++){
        cards.push(<div className="card" key={i} onClick={handleClick}>char</div>)
    }

    return (
        <div className="main">
          <div className="scoreboard">
              <div className="score">
                  SCORE : 0
              </div> 
              <div className="highscore">
                HIGHSCORE : 0
              </div>
          </div>
          <div className="content">         
            {cards}
          </div>
        </div>
    )

    
}

export {Content}