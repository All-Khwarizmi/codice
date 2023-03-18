import { groq } from "next-sanity";


// Get all technos 
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