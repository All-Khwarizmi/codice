type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

type Data =  {
    data : Memo[] 
}
interface Memo extends Base {
    classe: Classe
    description: Description[]
    categories: Category[]
    name: string
    publishedAt: string,
    question: Question[],
    slug: Slug
  
}
interface Question extends Base {
 
  _key: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerCorrect: string;
  answerD: string;
  memo: Reference
  question: string;
  title: string;
}
interface Image {
    _type: "image"
    asset: Reference
}
interface MainImage {
    _type: "image"
    asset: Reference
}

interface Reference {
    _ref: string
    _type: 'reference'
}
interface Classe {
    _key: string;
    _ref: string
    _type: 'reference'
}

interface Slug {
    _type: 'Slug'
    current: string
}
interface Title {
    _type: 'string'
    current: string
}

interface Block {
  
  _type: 'block'
  children: Span[]
  markdefs: any[]
  style: 'normal' | "h1" | 'h2' | "h3" | "h4" | "blockquote"
}

interface Span {
  _key: string;
  _type: 'span';
  marks: string[];
  text: string;
}

interface Category {
    description: string
    title: string
}