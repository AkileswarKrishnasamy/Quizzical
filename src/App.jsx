import { useEffect, useState } from 'react'
import StartPage from '../Components/StartPage'
import Questions from '../Components/Questions'
import Swal from 'sweetalert2'

function App() {
  const [startTest,setStartTest] = useState(true)
  const [coreData,setCoreData] = useState([])
  const [appData,setAppData] = useState([])
  const [isSubmitted,setIsSubmitted] = useState(false)
  const [score,setScore] = useState(0);
  const [createNewQuiz,setCreateNewQuiz] = useState(1)

  useEffect(()=> {function getCoreData(){
        try{
            
             fetch(`https://opentdb.com/api.php?amount=5`)
            .then(data=>data.json())
            .then(data=>{
              setCoreData(data.results)
            })
            console.log('rendered')
        }
        catch(err){
          console.error(err)
        }
  }
   getCoreData()
  },[createNewQuiz])

  useEffect(()=>{
    if(coreData && coreData.length>0){
      setData()
    }
  },[coreData])
   

  function setData(){
      const template = coreData.map((data,index)=>{
        return(
          {
            id:index,
            question:data.question,
            answer:data.correct_answer,
            options:[...data.incorrect_answers,data.correct_answer].sort(),
            selected_answer:null
          }
        )
      })
      setAppData(template)
    }


  function handleStartClick(){
    console.log("clicked start")
    setStartTest(false)
    if (coreData && coreData.length > 0) {
      setData();
    }
  }

  function setSelected(id,selectedOption){
    if(isSubmitted)return
    setAppData((prevData)=>prevData.map((data)=>{
      return id===data.id?{...data,selected_answer:selectedOption}:data
    }))
  }

  function submit(){
    if(isSubmitted){
      return;
    }
    setIsSubmitted(true)
    let newScore = 0;
      appData.map((data)=>{
        if(data.selected_answer === data.answer)
          { 
            newScore+=1 
          }
      })
      Swal.fire({
        title:`Your score ${newScore}`,
        icon:"success",
        iconColor:"#333d70",
        confirmButtonColor:'#333d70'
      })
      setScore(newScore)
  }

  async function newQuiz(){
    
    let timerInterval
    Swal.fire({
      title: "Plese Hold on While the Questions is rendering",
      html: "Questions load in <b></b> milliseconds.",
      timer: 6000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    })
    setTimeout(()=>{
        resetQuizState()
        setCreateNewQuiz(prev=>prev+1)
    },5000)
  
  }

  function resetQuizState() {
    setIsSubmitted(false);
    setScore(0);
    setCoreData([]);
    setAppData([]);
  }  


  


  const renderedQuestions = appData.map((data,index)=>{
     return <Questions 
              question={data.question}
              options = {data.options} 
              id = {data.id}
              selected={data.selected_answer}
              key={index}
              setSelected = {setSelected}
              submitted = {isSubmitted}
              answer = {data.answer}
              
              />
  })
   return(
    <div className='main-body'>
      {startTest && <StartPage handleClick = {handleStartClick}/>}
      {!startTest && renderedQuestions}
      {!startTest && <button className="submit" onClick={submit}>Submit</button>}
      {isSubmitted && < h1 className='results'>Your Score {score}</h1>}
      {isSubmitted && <button onClick={newQuiz} className='new-quiz'>New-Quiz</button>}
    </div>
   )
}



export default App