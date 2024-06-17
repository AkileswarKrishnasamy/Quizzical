



export default function StartPage(props){
    return(
        <div className="start--page">
            <h1 className="startpage--heading">Quizzical</h1>
            <button 
                className="startquiz--button"
                onClick={props.handleClick}
                >Start Quiz</button>
        </div>
    )
}