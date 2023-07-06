import React from 'react'

export default function Progress({currentIndex,noOfQuestions,points, maxPossiblePoints, answer}) {
  return (
    <header className='progress'>
   <progress max={noOfQuestions} value={currentIndex + Number(answer !== null)} />

        <p>Question <strong>{currentIndex}</strong>/{noOfQuestions}</p>
        <p><strong>{points}</strong>/{maxPossiblePoints}</p>
    </header>
  )
}
