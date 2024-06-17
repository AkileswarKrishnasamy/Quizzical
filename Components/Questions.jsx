import he from 'he'

export default function Questions({question,options,id,selected,setSelected,submitted,answer}){
    return(
        <div className = 'question-bank'>
            <h1 className = 'question'>{he.decode(question)}</h1>
            <div className="option-list">
            {options.map((option,index)=>(
            <div 
                    className="options"
                    style={{
                        backgroundColor: submitted? selected === answer && option===selected || option == answer ?'#94D7A2':
                                                            selected!==answer && option==selected?'#F8BCBC':'#F5F7FB' :
                             selected === option ? '#D6DBF5' : '#F5F7FB'
                        }}
                    onClick={()=>setSelected(id,option)}
                    key={index}>
                        {he.decode(option)}</div>))}
            <hr/>
        </div>
    </div>
    )
}

