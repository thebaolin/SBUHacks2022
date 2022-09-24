import logo from './logo.svg';
import './App.css';

import { useState } from 'react';

const axios = require('axios');
const log_entry = (name, text) => [name, text];
// DUM DUM DUM DUM
const API_KEY = "fcCuE2KiwJqdaTYEoR2Al9RaVT13ltr32eo2cIw0";

const HEADER_FOR_REQUESTS = {
  headers: {
  'content-type': 'application/json',
  'authorization': `BEARER ${API_KEY}`
  }
};
async function cohere_generate(params) {
  const result = await axios.post("https://api.cohere.ai/generate", params, HEADER_FOR_REQUESTS);
  return result.data;
}

/* function cohere_generate(gcc)
 *  */
function random_integer_between(a, b) {
  return Math.floor();
}
function SearchBar({logstuff, add_output, update_output}) {
  const [search_string, update_search_string] = useState("");

  async function submit_entry() {
    const prompt = search_string;
    let current_output = add_output(logstuff, log_entry("User", prompt)) ;
    update_output(current_output);
    update_search_string("");
    const lol = await cohere_generate({
      prompt: "I would like an answer to this query: "+ prompt +". The response is:",
      model: "xlarge",
      temperature: 0.65,
      k: 323,
      tokens: random_integer_between(15, 40)
    });
    current_output = add_output(current_output, log_entry("Bot", `${lol.text}`));
    console.log(current_output);
    update_output(current_output);
  }

  return (
    <div className="center-this">
      <div className="search-bar">
        <input type="text"
               value={search_string}
               onKeyDown={
               function (event) {
                 if (event.keyCode === 13) {
                   submit_entry();
                 }
               }
               }
               onChange={
               function(event) {
                 update_search_string(event.target.value);
               }
               }
               placeholder="Enter a LinkedIn URL..."></input>
        <button onClick={submit_entry}>
          Enter
        </button>
      </div>
    </div>
        )
}

function TextLine(context) {
  return <p className="chat-line"><span className="chat-name">{context.name}: </span><span className="chat-text">{context.text}</span></p>;
}

function OutputBox(context) {
  return (
    <div className="center-this chat-box-holder">
        <div className="chat-box">
        {context.output.map(([name, line]) => <TextLine name={name} text={line} />)}
        </div>
    </div>
  );
}

function App() {
  const [text_line_log, update_text_line_log] = useState([
    log_entry("Bot", "Hello! Welcome to the LinkedIn optimizer bot!"),
    log_entry("Bot", "To get started copy and paste a job link!"),
  ]);

  // garbage collector will fix this later...
  function add_output(old, entry) {
    const new_text_log = [entry, ...old];
    return new_text_log;
  }

  return (
    <div className="App">
      <OutputBox output={text_line_log} />
      <SearchBar logstuff={text_line_log} add_output={add_output} update_output={update_text_line_log} />
    </div>
  );
}

export default App;
