import { groq } from "next-sanity";
import { Deck, Technos } from "typings";

export type AllTechnos = {
  technos: Technos[];
};
// Get all technos with name, id and image only
export const ALLTECHNOS = groq`
*[_type == "technos"]{
  _id,
  name, 
  image { asset-> {
    url
  }
    }
}
`;


export type AllDecks = {
  decks: Deck[];
};
export const ALLDECKS = groq`
*[_type == "deck"]{
  flashCard,
  description,
    difficulty ->{
      name,
      level
    },
  image {
    asset -> {
      url
    }
  } ,
    _id,
  name,
  technos -> {
    name,
    _id
    
  }
}

`;

export const DECKBYNAME = groq`
*[_type == "deck" &&
  name == $name
 ]{
  _id,
  name,
    description,
    difficulty ->{
      name,
      level
    },
    slug, 
    flashCard,
    
 }
`;



export interface DeckByTechno {
_id: string
deck: Deck[]
name : string
}
export type DeckByTechnoArr = {
  decks: DeckByTechno[]
};
export const DECKBYTECHNO = groq`
*[_type == "technos" &&
  name == $technoName
 ]{
  _id, name,
  "deck": *[_type == "deck"  &&
  references(^._id)]{
    _id,
    name,
   difficulty ->{
      name,
      level
    },
      description,
      image {
        asset -> {
        url
        }
      } ,
      slug,
      flashCard,
  }
  }

`;