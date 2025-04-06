import Image from "next/image";

export default function Home() {
  return (
    

    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to expense tracker</h1>
      <p className="mt-4 text-lg">Journey to track your expenses starts here!</p>
      <Image
        src="/notebook-pen.svg"
        alt="Shop Icon"
        width={100}
        height={100}
        className="mt-6"
      />
    </main>   
    
 
  );
}