import { AuthedUserContext } from '../../App';
import { useContext } from 'react';


const Dashboard = () => {
  const user = useContext(AuthedUserContext);
  return (
    <body>
    <h3>
       thank you for signing up and sharing your fitness journey with us.
      </h3>
    <main>
    <div class="help">
      <h2>To help you get the most out of your membership:</h2>
      <li>Check out our range of popular classes</li>
      <li>Join our free  gym app  to connected with like-minded members and track your workouts.</li>
      <li>Schedule in your complementary assessment and training programme.</li>
      </div>
    </main>
    <div class="text-wrapper">
        <p2>
          Make fitness your basic. Bee Avci Gym you have been sporting since
          $29,99 every 4 weeks and you get a free sports bag. Go for it!
        </p2>
        <p2>
          Make fitness your basic. Bee Avci Gym you have been sporting since
          $29,99 every 4 weeks and you get a free sports bag. Go for it!
        </p2>
      </div>
    </body>
  );
};

export default Dashboard;
