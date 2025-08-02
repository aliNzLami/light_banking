'use client';
import CountUp from "react-countup";

function CountUpAnimate({number}: {number: number}) {
  return (
    <>
        <CountUp end={number} />
    </>
  )
}

export default CountUpAnimate