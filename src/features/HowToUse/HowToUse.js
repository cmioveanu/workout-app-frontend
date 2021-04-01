import { Link } from 'react-router-dom';
import styles from './HowToUse.module.css';



export const HowToUse = () => {

    return (
        <section className={styles.howToUseContainer}>
            <h2>Overview</h2>
            <p>This app is designed for High Intensity Training(HIT) with bodyweight exercises.
             This consists of only one set per exercise, to complete mechanical failure.</p>
            <p>There is also the chance to add extra negative reps at the end of the initial set for further stimulus,
             since bodyweight exercises often have "sticking points" that stop the set before complete muscle fatigue.</p>
            <p>The time under load for each exercise set should be between 45s and 90s.
             If you can handle more than 90s, it's time to increase the difficulty of the exercise.</p>
            <p>This training method requires a good amount of rest days to recover from
            the very high intensity, so for the average person, one full body workout
            per week is the ideal frequency and volume with this approach.</p>
            <br />

            <h3><span>Step 1{')'}</span> Add exercises</h3>
            <p>First, go to the <Link to="/exercises">exercises</Link> page
             and add your favourite exercises.</p>

            <h3><span>Step 2{')'}</span> Create a routine</h3>
            <p>Go to the <Link to="/routines">routines</Link> page, create a routine and add
             exercises to it from your exercises list.</p>

            <h3><span>Step 3{')'}</span> Work out!</h3>
            <p>Finally, go to the <Link to="/workout">workout</Link> page and start your workout
             with one of your routines. You can record your time under load and the number
             of extra negative reps for each exercise. </p>
            <p>When you're done with all exercises, press "Record workout" to save your workout.</p>
        </section >
    );
}