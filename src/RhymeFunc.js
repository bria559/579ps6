import { useState, useRef } from 'react';
import GetRhymes from './GetRhymes';
import GetSimilar from './GetSimilar';
import GroupBy from './GroupBy';


function RhymeFunc(){
    const inputEl = useRef(null);
    const [rhymes_list, setRhymes_list] = useState([]);
    const [description, setDescription] = useState('');
    const [synonyms_list, setSynonyms_list] = useState('');
    const [saved_word, setSavedWord] = useState([]);
    const [results_listed, setResultsListed]= useState(false);

    let saved_list = [];
    let string_saved = '';
    function updateSaved(word){
      // setSavedWord(word);
      // saved_list.push(saved_word);
      saved_list.push(word);
      // console.log(saved_list);
      saved_list.toString();
      console.log(saved_list);
      setSavedWord(saved_list);
    };
    
    
    function showRhymeDescription(word){
      setDescription('Words that rhyme with ' + word)
    };

    function showRhymeDescriptionFalse(word){
      setDescription('No results')
    };

    function showSynonymDescription(word){
      setDescription('Words that are similar to ' + word)
    };

    function showSynonymDescriptionFalse(word){
      setDescription('No results')
    };

    function rhymes(){
      const wordInput =inputEl.current.value;
      GetRhymes(wordInput, (results)=>{
        if (results.length !== 0){
          showRhymeDescription(wordInput);
          setResultsListed(true);
          setRhymes_list(results)
        }
        else{
          showRhymeDescriptionFalse();
          setResultsListed(false);
        }
      });
    }

    function synonyms(){
      const wordInput =inputEl.current.value;
      showSynonymDescription(wordInput);
      GetSimilar(wordInput, (results)=>{
        if (results.length !== 0){
          showSynonymDescription(wordInput);
          setResultsListed(true);
          setSynonyms_list(results)
        }
        else{
          showSynonymDescriptionFalse();
          setResultsListed(false);
        }
      });
    }

    let group_rhymes = []
    let group_synonyms = []
    let syllable_heading= null;
    const groups = GroupBy(rhymes_list, 'numSyllables');
    

    for (let key in groups){
      key = parseInt(key)
      if (key > 1){
        syllable_heading = <h2>{key} Syllables</h2>;
      }
      else{
        syllable_heading = <h2>{key} Syllable</h2>;
      }

      group_rhymes.push(syllable_heading);

      for (const data of groups[key]){
        const word_list_el = (<li key={data.word} >
          {data.word}{' '}
          <button onClick={() => updateSaved(data.word)}>Save</button>
        </li>);
        group_synonyms = [];
        group_rhymes.push(word_list_el);
      };
    }

    for (const synonym_word of synonyms_list){
      // console.log(synonym_word.word);
        const synonyms_list_el = (
          <li key = {synonym_word.word}>
            {synonym_word.word}{' '}
          <button onClick={() => updateSaved(synonym_word.word)}>Save</button>
          </li>
        );
      group_rhymes = [];
      group_synonyms.push(synonyms_list_el);
    }


    function onKeydown(event){
      if (event.key ==='Enter'){
          rhymes();
      }
      }


return (
    <div className="container">
      <div className="row">
      <div className="col">Saved words: <span id="saved_words"> {saved_word}</span>
      </div>

        <div className="row">
          <div className="input-group col">
            <input
              className="form-control"
              placeholder="Enter a word"
              ref={inputEl}
              type="text"
              onKeyDown = {onKeydown}
            ></input>

            <button
              className="btn btn-primary"
              onClick={() => {
                rhymes();
              }}
            >
              Show rhyming words
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                synonyms();
              }}
            >
              Show synonyms
            </button>

            <div className="output row">
            <output id = "word_output" className="col"><h2 className="col">{description}</h2></output>
            </div>
          </div>
        </div>
        <br />
        {/* <h2 className="col">{description}</h2> */}
          <ul>{group_rhymes}</ul>
          <ul>{group_synonyms}</ul>
      </div>
    </div>
  );

};


export default RhymeFunc;