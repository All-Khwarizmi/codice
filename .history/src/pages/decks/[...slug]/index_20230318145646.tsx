import { NextPage } from 'next';
import { useRouter } from "next/router";


  const router = useRouter();
  const { name } = router.query;

const Decks: NextPage = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"></main>
    </>
  );
};

export default Decks