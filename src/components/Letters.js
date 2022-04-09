import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [term, setTerm] = useState();
  const [songs, setSongs] = useState(null);
  let [letter, setLetters] = useState(["A", "B", "C", "D", "E"]);

  useEffect(() => {
    const timer = setTimeout(
      () => setLetters((arr) => arr.slice(1).concat(arr[0])),
      1000
    );
    return () => clearTimeout(timer);
  });

  const sendReq = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      `https://itunes.apple.com/search?term=${term}&enitity=album`
    );
    const response = data.results
      .slice(0, 5)
      .map((s) => s.collectionName)
      .sort();
    !songs && setSongs(response);
    console.log(songs);
  };

  const backToLetters = () => {
    setSongs(null);
  };

  return (
    <div className="container center">
      <form className="center" onSubmit={sendReq}>
        <input
          type="text"
          value={term}
          name="term"
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Please enter something ..."
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={backToLetters}>
          Back to letters
        </button>
        {songs
          ? songs &&
            songs.map((l) => {
              return (
                <div key={Math.random()} className="music">
                  <b>{l}</b>
                </div>
              );
            })
          : letter &&
            letter.map((l) => {
              return (
                <ul key={l}>
                  <li>{l[0]}</li>
                  <li>{l[1]}</li>
                  <li>{l[1]}</li>
                  <li>{l[3]}</li>
                  <li>{l[4]}</li>
                </ul>
              );
            })}
      </form>
    </div>
  );
}

export default App;
