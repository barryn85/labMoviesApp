import React, { useState, useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import { useNavigate } from "react-router-dom";

const CreateFantasyMoviePage: React.FC = () => {
  const { addFantasyMovie } = useContext(MoviesContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [genres, setGenres] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [runtime, setRuntime] = useState("");
  const [productionCompany, setProductionCompany] = useState("");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    addFantasyMovie({
      id: Date.now(),
      title,
      overview,
      genres,
      releaseDate,
      runtime: Number(runtime),
      productionCompany,
    });

    navigate("/fantasy");
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        Create Fantasy Movie
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={{
            width: "450px",
            padding: "10px",
            fontSize: "16px",
            marginBottom: "15px",
          }}
        />

        <br />

        <textarea
          placeholder="Movie Overview"
          value={overview}
          onChange={(e) =>
            setOverview(e.target.value)
          }
          style={{
            width: "450px",
            height: "120px",
            padding: "10px",
            fontSize: "16px",
            marginBottom: "15px",
          }}
        />

        <br />

        <input
          type="text"
          placeholder="Genre"
          value={genres}
          onChange={(e) =>
            setGenres(e.target.value)
          }
          style={{
            width: "450px",
            padding: "10px",
            fontSize: "16px",
            marginBottom: "15px",
          }}
        />

        <br />

        <input
          type="date"
          value={releaseDate}
          onChange={(e) =>
            setReleaseDate(e.target.value)
          }
          style={{
            width: "450px",
            padding: "10px",
            fontSize: "16px",
            marginBottom: "15px",
          }}
        />

        <br />

        <input
          type="number"
          placeholder="Runtime (minutes)"
          value={runtime}
          onChange={(e) =>
            setRuntime(e.target.value)
          }
          style={{
            width: "450px",
            padding: "10px",
            fontSize: "16px",
            marginBottom: "15px",
          }}
        />

        <br />

        <input
          type="text"
          placeholder="Production Company"
          value={productionCompany}
          onChange={(e) =>
            setProductionCompany(e.target.value)
          }
          style={{
            width: "450px",
            padding: "10px",
            fontSize: "16px",
            marginBottom: "20px",
          }}
        />

        <br />

        <button
          type="submit"
          style={{
            padding: "10px 25px",
            fontSize: "16px",
          }}
        >
          Save Fantasy Movie
        </button>
      </form>
    </>
  );
};

export default CreateFantasyMoviePage;