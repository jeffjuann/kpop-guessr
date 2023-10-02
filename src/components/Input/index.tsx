import idols from "@/pages/api/idols";
import { searchProps } from "@/types";
import axios from "axios";
import { ObjectId } from "mongodb";
import { useEffect, useState, useMemo } from "react";

import inputStyles from '@/styles/Input/input.module.css';
import suggestionsStyles from '@/styles/Input/Suggestions.module.css';


export default function Input({ idols, onSubmit }: { idols: any[], onSubmit: Function })
{
  
  // let guess_id: ObjectId;
  const [ search, setSearch ] = useState<searchProps>(
  {
    _id: null,
    name: '',
    group: '',
  });

  const clickEnter = () =>
  {
    setSearch({
      _id: null,
      name: '',
      group: '',
    });
    onSubmit(search._id);
  }

  const [ isVisible, setVisibility ] = useState<boolean>(false);
  const [ cursorIndex, setCursorIndex ] = useState<number>(0);

  const suggestions: searchProps[] = useMemo(() =>
  {
    if(search.name === '') return [];
    else return idols.filter((item: searchProps) =>
    {
      return item.name.toLowerCase().startsWith(search.name.toLowerCase()); 
    })
  },[search.name]);

  const keyboardNavigation = (event: React.KeyboardEvent<HTMLInputElement>) =>
  {
    if (event.key === "ArrowDown")
    {  
      setCursorIndex(c => (c < suggestions.length - 1 ? c + 1 : c))
    }
    if (event.key === "ArrowUp")
    {
      setCursorIndex(c => (c > 0 ? c - 1 : 0));
    }
    if (event.key === "Enter" && cursorIndex >= -1 && suggestions.length === 1)
    {
      setSearch(suggestions[0]);
      // clickEnter();
      // if(search._id !== null) checkAnswer(search._id, guess_id);
      setVisibility(false);

    }
    if (event.key === "Enter" && cursorIndex >= 0 && suggestions.length > 1)
    {
      setSearch(suggestions[cursorIndex]);
      // clickEnter()
      // if(search._id !== null) checkAnswer(search._id, guess_id);
      setVisibility(false);
    }
  };

  return (
    <div className={inputStyles.container}>
      <div className={inputStyles.inputContainer}>
        <input
            className={inputStyles.input}
            type='text' 
            id="name" 
            autoComplete='off'
            value={search.name}
            placeholder='Input Name'
            onChange={(e) =>
            {
                setCursorIndex(0);
                if(e.target.value !== '') setVisibility(true);
                setSearch({ ...search, name: e.target.value});
            }}
            onKeyDown={(e) =>
            {
                keyboardNavigation(e)
            }}
        />
        { 
          isVisible ? 
          <div className={suggestionsStyles.suggestionContainer}>
          {
            suggestions
            .map((idol: searchProps, index: number) =>
            {
                return (
                <div 
                    key={index} 
                    onClick={() =>
                    {
                        setSearch(suggestions[index]);
                        // clickEnter()
                        // if(search._id !== null) checkAnswer(search._id, guess_id);
                        setVisibility(false);
                    }} 
                    className={cursorIndex === index ? suggestionsStyles.suggestionItemActive : suggestionsStyles.suggestionItem}
                >
                    <h3>{idol.name}</h3>
                    <h5>{idol.group}</h5>
                </div>
                )
            } 
            )
          }
          </div> 
          : null
        }
      </div>
      <button className={inputStyles.checkButton} onClick={() => clickEnter()}>CHECK</button>
    </div>
  )
}