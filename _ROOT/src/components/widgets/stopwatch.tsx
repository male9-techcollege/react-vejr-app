/*  Source of the following component, incl. course notes:
- Min tidligere opgave react-gallery-wrapper
Moreover:
The code for the basic stopwatch card (not the stopwatch functionality) and its inner components is based on: 
- my earlier card assignments with an anchor element as the top-level element (see card-anchor.tsx);
- the card components without an anchor element created based on the aforementioned components;
- the extensive sources provided for my image component (see file atoms/img-el.tsx); 
- my relatively extensive research on generic interface to use with specific HTML elements 
  (see region of the same name in file main-el.tsx);
- see also sources for way to fold regions in .jsx files and for 
  concatenation/combination of CSS classes in React in the file App.tsx.
I found the two following sources to help me with the functionality:
- "Build this stopwatch with React!" by Bro Code at https://www.youtube.com/watch?v=jPo0mIcNZfM
- React's documentation at https://react.dev/learn/referencing-values-with-refs
*/

import { useEffect, useState } from "react";
import gridstyling from "../shared/atoms/grid.module.scss";
import { CardWithDivByMariePierreLessard } from "../shared/m-and-o/card";
import { CardBodyByMariePierreLessard, CardFooterByMariePierreLessard } from "../shared/atoms/card-parts";
import { ToggleBtnComponentByMariePierreLessard, MultiTypeBtnComponentByMariePierreLessard } from "../shared/atoms/btns";

export function StopwatchByMariePierreLessard() {

    const [isStopwatchRunningByMariePierreLessard, setIsStopwatchRunningByMariePierreLessard] = useState(false);
    const [durationRecordedByMariePierreLessard, setDurationRecordedByMariePierreLessard] = useState(0);

    /* The following useEffect hook starts and stops the stopwatch based on the current value of the boolean state
    isStopwatchRunningByMariePierreLessard. The duration recorded is in milliseconds. */
    useEffect(() => {
        /* The following code is based on course notes in react-modal-codealong-med-kasper 
        and the sources cited. After, there are research notes that I didn't really use in the code, but they were helpful
        in understanding what should work. */
        /* Acc. to Kasper, functions like setInterval have to be put in useEffect.
        This being said, the stopwatch example in React documentation does not put setInterval in the useEffect hook. 
        See: https://react.dev/learn/referencing-values-with-refs
        The stop-watch assignment's instructions ask me to use the useEffect hook, as we learned in class.
        */
        let intervalFunctionByMariePierreLessard = setInterval(() => {
            /* Since useEffect is triggered every time that the boolean value of isStopwatchRunningByMariePierreLessard
            changes (whether it is true or false), the following conditional is necessary to make sure that 
            the stopwatch only records seconds when the value of isStopwatchRunningByMariePierreLessard is true. 
            */
            if (isStopwatchRunningByMariePierreLessard === true) {

                /* The following code didn't work:
                setDurationRecordedByMariePierreLessard(durationRecordedByMariePierreLessard + 1000);

                Kasper said that when the previous value needs to be incremented or updated repeatedly
                by the setter, the arrow function is necessary. It's because the React setter functions
                differently depending on the type of argument it receives. The above syntax (an argument 
                that is an expression) worked fine in a slider button (see react-hook-repetition), but not in a stopwatch.

                The following doesn't work because the code is incomplete: the previous state has to be an argument 
                of the arrow function. I was getting a type error that provided a hint:  
                Type '() => void' is not assignable to type '(prevState: number) => number'.
                setDurationRecordedByMariePierreLessard(() => durationRecordedByMariePierreLessard + 1000);
                */
                setDurationRecordedByMariePierreLessard((durationRecordedByMariePierreLessard) => durationRecordedByMariePierreLessard + 1000);
                /* Previous attempts:
                
                The following works: 1000 is printed to the console, not 0.
                let x = durationRecordedByMariePierreLessard + 1000;
                console.log("Milliseconds recorded: ", x);

                This also works (for other purposes):
                setDurationRecordedByMariePierreLessard(400)
                setDurationRecordedByMariePierreLessard(durationRecordedByMariePierreLessard - durationRecordedByMariePierreLessard);

                However, the following console logs do NOT print the new value of durationRecordedByMariePierreLessard
                every time the value is updated. It made me think that my stopwatch didn't work, but the incrementation is 
                displayed in real time on the page, just not in the console!
                The console shows that sth happens every second, but the state in the console log isn't getting updated 
                every second (even though the setter does change the state). Result: the same message is printed 
                every second.   
                console.log("Milliseconds recorded: ", durationRecordedByMariePierreLessard);
                or
                console.log("Milliseconds recorded: ", {durationRecordedByMariePierreLessard});
                */
                /* Unused research notes: 
                I had considered circumventing the loss of data at rerendering or unmounting 
                (with React code and not session or local storage) with:
                - the useRef hook or
                - the useCallback hook, which I had used in my colour-mode-switch assignment.
                Contrarily to my expectations, Kasper told me that useRef and useCallback should hardly ever be used 
                because these hooks are something like problem-solving patches to the original React solution. He
                says that a clean and simple solution produces more effective code.
                It is tempting to use them nevertheless since certain values have to be stored 
                somewhere where they will be kept in spite of re-renderings that will happen at an interval. 
                The stopwatch in React's own documentation at 
                https://react.dev/learn/referencing-values-with-refs
                uses a ref for a stopwatch.
                Interestingly, useEffect is also categorised as an escape hatch by the React documentation,
                not just useRef and useCallback:
                "Effects are an “escape hatch”: you use them when you need to “step outside React” and when there is no better 
                built-in solution for your use case."
                https://react.dev/reference/react/useEffect
                
                Sources:
                "The useRef Hook allows you to persist values between renders.
                It can be used to store a mutable value that does not cause a re-render when updated."
                https://www.w3schools.com/react/react_useref.asp
                It seems useful to learn about useRef since certain things cannot be achieved with useState, for instance
                the following task, which does not seem like a sensible thing to try to achieve with session or local 
                storage:
                "If we tried to count how many times our application renders using the useState Hook, we would be caught in 
                an infinite loop since this Hook itself causes a re-render."
                https://www.w3schools.com/react/react_useref.asp
                The sample code from that W3Schools page uses the .current property, just like the Bro Code video. 
                This property is not vanilla JS. I can't find it on MDN.

                "Learn React
                Escape Hatches
                Referencing Values with Refs
                When you want a component to “remember” some information, but you don’t want that information to trigger 
                new renders, you can use a ref. (...)
                Unlike state, ref is a plain JavaScript object with the current property that you can read and modify.
                Note that the component doesn’t re-render with every increment. Like state, refs are retained by React 
                between re-renders. However, setting state re-renders a component. Changing a ref does not! (...)
                
                In order to display how much time has passed since the user pressed “Start”, you will need to keep track of when 
                the Start button was pressed and what the current time is. This information is used for rendering, so you’ll keep it 
                in state: (...)
                import { useState, useRef } from 'react';

                export default function Stopwatch() {
                    const [startTime, setStartTime] = useState(null);
                    const [now, setNow] = useState(null);
                    const intervalRef = useRef(null);
                
                    function handleStart() {
                        setStartTime(Date.now());
                        setNow(Date.now());
                
                        clearInterval(intervalRef.current);
                        intervalRef.current = setInterval(() => {
                            setNow(Date.now());
                        }, 10);
                    }
                
                    function handleStop() {
                        clearInterval(intervalRef.current);
                    }
                
                    let secondsPassed = 0;
                    if (startTime != null && now != null) {
                        secondsPassed = (now - startTime) / 1000;
                    }
                
                    return (
                        <>
                            <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
                            <button onClick={handleStart}>
                                Start
                            </button>
                            <button onClick={handleStop}>
                                Stop
                            </button>
                       </>
                    );
                }
                "
                https://react.dev/learn/referencing-values-with-refs
                */
            };
        }, 1000);
        /* Kasper said that it is necessary to stop sth that runs in the background, like an interval, 
        otherwise it will continue to run! As explained in the Bro Code video, clearing the interval (function) corresponds
        to stopping it (stopping the counting). It doesn't reset the count. */
        return () => clearInterval(intervalFunctionByMariePierreLessard);
    }, [isStopwatchRunningByMariePierreLessard]);

    /* Acc. to Bro Code, the reset button has to perform the 2 following tasks (that was pretty obvious, though)-
    "Build this stopwatch with React!" by Bro Code
    https://www.youtube.com/watch?v=jPo0mIcNZfM
    */
    function resetByMariePierreLessard() {
        setIsStopwatchRunningByMariePierreLessard(false); 
        setDurationRecordedByMariePierreLessard(0);
    };

    /* The Bro Code video had calculations to make sure that seconds and minutes displayed never exceeded 59 and
    did not include the minutes of the hours displayed or the seconds of the minutes displayed.

    1) The duration recorded has to be divided by the total number of milliseconds in the duration unit desired and rounded down.
    That way, the result displayed will only change when the total of milliseconds reaches a new integer. */
    let durationInHoursByMariePierreLessard = Math.floor(durationRecordedByMariePierreLessard / (1000 * 60 * 60)); 
    /* 2) I understand what the modulus operator does, now! 
    % 60 is the same as saying: **if** this is bigger than 60, then give me the remainder of a division by 60. 
    Modulus doesn't always divide by 60, i.e. it's not the same as writing
    durationRecordedByMariePierreLessard / (1000 * 60 * 60)
    or 
    durationRecordedByMariePierreLessard / (1000 * 60) / 60 
    If it were the same thing, the following calculation would find the number of hours passed, not the minutes left
    after the hours are subtracted.
    */
    let durationInMinutesByMariePierreLessard = Math.floor(durationRecordedByMariePierreLessard / (1000 * 60) % 60);
    let durationInSecondsByMariePierreLessard = Math.floor(durationRecordedByMariePierreLessard / 1000 % 60);

    /* This is a very useful set of JS functions from the Bro Code video; padStart and padEnd can only be used on strings
    according to MDN. 
    String()
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String
    .padStart()
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
    */
    let stringifiedDurationInHoursByMariePierreLessard = String(durationInHoursByMariePierreLessard).padStart(2, "0");
    let stringifiedDurationInMinutesByMariePierreLessard = String(durationInMinutesByMariePierreLessard).padStart(2, "0");
    let stringifiedDurationInSecondsByMariePierreLessard = String(durationInSecondsByMariePierreLessard).padStart(2, "0");

    return (
        <CardWithDivByMariePierreLessard className={gridstyling.widgetCardByMariePierreLessard}>
            <CardBodyByMariePierreLessard>
                {stringifiedDurationInHoursByMariePierreLessard}
                :{stringifiedDurationInMinutesByMariePierreLessard}
                :{stringifiedDurationInSecondsByMariePierreLessard}
            </CardBodyByMariePierreLessard>
            <CardFooterByMariePierreLessard className={gridstyling.btnGroupByMariePierreLessard}>
                <ToggleBtnComponentByMariePierreLessard
                    type={"button"}
                    booleanState={isStopwatchRunningByMariePierreLessard}
                    toggleAction={setIsStopwatchRunningByMariePierreLessard}
                >
                    On/off
                </ToggleBtnComponentByMariePierreLessard>
                {/* This works: 
                    <button type="button" onClick={resetByMariePierreLessard}>Reset</button>
                */}
                <MultiTypeBtnComponentByMariePierreLessard
                    type={"reset"}
                    action={resetByMariePierreLessard}
                >
                    Reset
                </MultiTypeBtnComponentByMariePierreLessard>
            </CardFooterByMariePierreLessard>
        </CardWithDivByMariePierreLessard>
    );
};

