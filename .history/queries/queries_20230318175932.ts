import { groq } from "next-sanity";


// Get all technos with name, id and image 
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