import React from 'react'

export default function NextButton({dispatch,answer, currentIndex, noOfQuestions}) {

    if(answer === null) return null;

 if(currentIndex < noOfQuestions -1 ) return (
    <button className='btn btn-ui' onClick={()=>dispatch({type:'nextQuestion'})}>Next Button</button>
  )

  if(currentIndex === noOfQuestions -1 ) return (
    <button className='btn btn-ui' onClick={()=>dispatch({type:'finished'})}>Finish</button>
  )
}
