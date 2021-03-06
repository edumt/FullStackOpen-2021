const Total = ({ course }) => {
  const [part1, part2, part3] = [...course.parts];
  return (
    <p>
      Number of exercises {part1.exercises + part2.exercises + part3.exercises}
    </p>
  );
};

export default Total;
