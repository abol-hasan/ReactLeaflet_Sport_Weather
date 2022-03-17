import classes from "./welcome.module.css";
function Welcome() {
  return (
    <section className={classes.welcome}>
      <h1>Welcome to WorkoutMap</h1>
      <h2>Login to Register Date and Place of your Workouts on the Map! </h2>
      <h3>, and write your daily Note.</h3>
      <h4>
        This is app that you can enter your distance of running or cycling and
        time of them, then recieve your pace or your speed.
      </h4>
    </section>
  );
}

export default Welcome;
