import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import CandidateCard from "./components/CandidateCard";
import "./styles.css";
import axios from "axios"

export default function App() {
  const [data, setData] = useState([]);

  const [isload,setIsloading]=useState(true)

  const [pg,setPg]=useState(1)
  

 useEffect(()=>{
   async function getData(){
     setIsloading(true)
     const mydata= await fetch(`https://json-server-mocker-masai.herokuapp.com/candidates?_page=${pg}&_limit=5`).then((d)=>d.json())

     setData(mydata)
     setIsloading(false)
     
   }
   getData()

 },[pg])





  return (
    <div className="App">
      <div>
        {isload==true && <div id="loading-container">...Loading</div>}
        <Button  id="SORT_BUTTON" title={`Sort by Ascending Salary`} />
        <Button  onClick={()=>{setPg(pg-1)}} title="PREV" id="PREV" />
        <Button onClick={()=>{setPg(pg+1)}} id="NEXT" title="NEXT" />
        
        
      </div>
      
      {data.map((item) => {return(
        <CandidateCard name={item.name} title={item.title} salary={item.salary} company_name={item.company_name} avatar={item.avatar}/>)

      })}
      
      
      
    </div>
  );
}
