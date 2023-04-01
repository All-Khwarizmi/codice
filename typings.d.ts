import {z} from "zod"

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
  name: string
  image: Image;
  slug: slug;
  difficulty: Difficulty
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

export type Difficulty = {
    level: string
    name: string
}

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


// Recall

// creating a zod validation schema for recall incoming request
export const addRecallSchema = z.object({
  topicName: z.string(),
  questionName: z.string(),
  interval: z.number(),
  repetitions: z.number(),
  easeFactor: z.number(),
  quality: z.number(),
  score: z.array(z.number()),
  studySessions: z.array(z.string()),
  userId: z.string(),
  userEmail: z.string().email(),
  userImage: z.string(),
  userName: z.string(),
  lastRecall: z.date(),
  nextRecall: z.date(),
  nextRecallName: z.string(),
  calendar: z.object({
    recallOne: z.string(),
    recallTwo: z.string(),
    recallThree: z.string(),
    recallFour: z.string(),
    recallFive: z.string(),
    recallSix: z.string(),
    recallSeven: z.string(),
    recallEight: z.string(),
    recallNine: z.string(),
    recallTen: z.string(),
  }),
  botUrl: z.string(),
});

// Infering typescript type from zod schema
export type AddRecall = z.infer<typeof addRecallSchema>;
export type DayDate = Date;