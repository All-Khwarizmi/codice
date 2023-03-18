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
*[_type == "deck"][1]{
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
*[_type == "deck"][1]{
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