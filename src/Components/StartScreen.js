
function StartScreen({noOfQuestions, onShowQuestions}){
    return <div className="start">
        <h2>Welcome To The React Quiz</h2>
        <h3>{noOfQuestions} question test your react mastery</h3>
        <button className="btn btn-ui" onClick={onShowQuestions}>Let's Start</button>
    </div>
}
export default StartScreen;