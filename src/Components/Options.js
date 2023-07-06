
export default function Options({question, dispatch, answer}){

    const hasAnswered= answer != null;
    const handleOptionClick = (index) => {
        dispatch({ type: 'newAnswer', payload: index });
      };

      return (
        <div className="options">
          {question.options.map((option, index) => (
            <button
              className={`btn btn-option ${index === answer ? "answer" : ''}
               ${hasAnswered ? index === question.correctOption ? "correct" : "wrong" : ""}`
            }
              key={option}
              onClick={() => handleOptionClick(index)}
              disabled={hasAnswered}
            > 
              {option}
            </button>
          ))}
        </div>
      );
    }