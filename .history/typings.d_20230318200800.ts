type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

type Data = {
  data: Memo[];
};
interface Technos extends Base {
  _id: string
  name: string;
  image: Image;
  
}
interface Deck extends Base {
  flashCard: FlashCard[];
  image: Image;
  slug: slug;
  difficulty: string
  description: string
  technos: {
    _id: string,
    name: string,
  };
  
 
}

export type FlashCard = {
 _key: string,
 _type: string,
 name: string,
 question: string,
 reponse: string,
}

export type Image = {
  asset: {
    url: string;
  };
};



interface Reference {
  _ref: string;
  _type: "reference";
}
interface Classe {
  _key: string;
  _ref: string;
  _type: "reference";
}

interface Slug {
  _type: "Slug";
  current: string;
}
interface Title {
  _type: "string";
  current: string;
}

interface Block {
  _type: "block";
  children: Span[];
  markdefs: any[];
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
}

interface Span {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
}

interface Category {
  description: string;
  title: string;
}
