import { NextPage } from 'next';
import { useRouter } from "next/router";




const Decks: NextPage = () => {
    const router = useRouter();
    const { techno, difficulty } = router.query;
    console.log(techno, difficulty)
  return (
    
  );
};

export default Decks