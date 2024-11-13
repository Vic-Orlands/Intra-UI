"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/libs/config";

const BlogDetail = () => {
  const pathname = usePathname();
  const stripId = pathname.split("&")[1];
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    if (stripId) {
      const fetchBlog = async () => {
        const blogRef = doc(db, "blogs", stripId);
        const blogSnap = await getDoc(blogRef);

        if (blogSnap.exists()) {
          setBlogData(blogSnap.data());
        } else {
          console.error("No such blog found!");
        }
      };

      fetchBlog();
    }
  }, [stripId]);

  if (!blogData) {
    return <p className="p-14 font-semibold text-xl">Loading...</p>;
  }

  const { title, coverImage, createdAt, blogContent } = blogData;

  return (
    <section className="py-14 px-4 xl:px-96 lg:px-64 md:px-8">
      <div className="border rounded-lg p-10">
        <h3 className="text-3xl font-bold">{title}</h3>
        <Image
          src={coverImage}
          alt={title}
          width={500}
          height={400}
          className="w-full h-50 object-cover rounded-t-lg"
        />
        <span className="text-sm font-semibold">
          {createdAt.toDate().toDateString()}
        </span>
        <div
          className="text-gray-700 mt-2"
          dangerouslySetInnerHTML={{ __html: blogContent }}
        ></div>
      </div>
    </section>
  );
};

export default BlogDetail;
