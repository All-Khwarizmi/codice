import { NextPage } from 'next';
import { useRouter } from "next/router";




const Decks: NextPage = () => {
    const router = useRouter();
    const { techno, diff } = router.query;
    console.log(slug)
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"></main>
    </>
  );
};

export default Decks