import { groq } from "next-sanity";


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