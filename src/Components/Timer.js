import React, { useEffect } from 'react'

export default function Timer({dispatch, secondsRemaining}) {

const minutes=Math.floor(secondsRemaining/60);
const seconds=secondsRemaining % 60;

    useEffect(function(){
      const timer=setInterval(function(){
            dispatch({type:"tick"})
        },1000)
             
        return ()=> clearInterval(timer);
    },[dispatch])
  return (
    <div className='timer'>{minutes < 10 && '0'}{minutes}:{seconds < 10 && '0'}{seconds}</div>
  )
}
