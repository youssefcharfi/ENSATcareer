import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./signup.css";

const RegisterScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [filiere, setFiliere] = useState("");
  const [niveau, setNiveau] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [confirmpassword,setConfirmPassword]=useState("")
  const [isEntreprise, setEntreprise] = useState("");
  const [error, setError] = useState("");
  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        {
          name,
          email,
          password,
          filiere,
          niveau,
          description,
          link,
          isEntreprise,

        },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="register-screen">
      <form onSubmit={registerHandler} className="register-screen__form">
        <h3 className="register-screen__title">Register</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            required
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input
            type="password"
            required
            id="confirmpassword"
            autoComplete="true"
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
           <div className="form-group">
          <label htmlFor="name">Niveau:</label>
          <input
            type="text"
            id="niveau"
            placeholder="Enter your level"
            value={niveau}
            onChange={(e) => setNiveau(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Filiere:</label>
          <select name="cars"  id="filiere">
           <option value={"gind"} OnChange={(e) => setFiliere(e.target.value)}>Genie Indistruelle et logistiques</option>
           <option value={"ginfos"} OnChange={(e) => setFiliere(e.target.value)}>Genie Informatiques</option>
           <option value={"gsea"} OnChange={(e) => setFiliere(e.target.value)}>Genie Systeme electroniques automatiques</option>
           <option value={"gsea"} OnChange={(e) => setFiliere(e.target.value)}>Genie Systemes Reseaux et telecommunications</option>
        </select>
        </div>
        <label htmlFor="name">Link:</label>
          <input
            type="text"
            id="link"
            placeholder="Enter the link for your company's website"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
         <div>
        <label htmlFor="name">Description:</label>
          <input
            type="text"
            id="description"
            placeholder="Enter a Description for your company's domain of activity"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      
        <button type="submit" className="btn btn-primary">
          Register
        </button>

        <span className="register-screen__subtext">
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterScreen;