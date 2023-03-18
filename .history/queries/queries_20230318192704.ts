import { groq } from "next-sanity";


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
export const DECKBYTECHNO = groq`
*[_type == "deck" 
 ]{
  _id, name,
  "deck": *[_type == "deck" &&
    name == $technoName        &&
  references(^._id)]{
    _id,
    name,

  }
  }

`;