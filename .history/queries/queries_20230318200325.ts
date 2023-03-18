import { groq } from "next-sanity";
import { Deck } from "typings";

export type 
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

export const ALLDECKS = groq`
*[_type == "deck"]{
  flashCard,
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
    description,
    difficulty ->{
      name,
      level
    },
    slug, 
    flashCard,
    
 }
`;

interface DeckByTechno {
_id: string
deck: Deck
name : string
}
export const DECKBYTECHNO = groq`
*[_type == "technos" &&
  name == $technoName
 ]{
  _id, name,
  "deck": *[_type == "deck"  &&
  references(^._id)]{
    _id,
    name,
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