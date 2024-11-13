"use client";

import { useEffect, useState } from "react";
import PageList from "./pageList";
import { db } from "@/libs/config";
import { collection, onSnapshot } from "firebase/firestore";

const Home = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const contentRef = collection(db, "blogs");

    const unsubscribe = onSnapshot(contentRef, (snapshot) => {
      if (!snapshot.empty) {
        const contents = [];
        snapshot.forEach((doc) => {
          console.log(doc.data());
          contents.push({ id: doc.id, ...doc.data() });
        });
        setContents(contents);
      }
    });

    return () => unsubscribe();
  }, []);

  if (contents.length <= 0) {
    return (
      <div className="w-full p-8 bg-white rounded-md">
        <h1 className="text-2xl font-bold mb-4">Published Blogs</h1>
        <p className="text-gray-600 text-lg font-medium mb-4 mt-2">
          Loading blog contents...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-8 bg-white rounded-md">
      <h1 className="text-2xl font-bold mb-4">Published Blogs</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 w-full">
        {contents.map((content) => (
          <PageList {...content} key={content.id} />
        ))}
      </section>
    </div>
  );
};

export default Home;
