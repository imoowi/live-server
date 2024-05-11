import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>Home Page</div>
      <div>
        <Link to={"/login"}>login</Link>
      </div>
      <div>
        <Link to={"/event"}>event</Link>
      </div>
    </>
  );
};
export default Home;
