import { Metadata } from "next";
export const runtime = "edge";

export const metadata: Metadata = {
  title: "Thiện Web",
  description: "thienweb",
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
};

async function getData() {
  try {
    const { data: groups } = await fetch(
      "https://api.vbonews.com/News/news-list"
    ).then((res) => res.json());
    return groups;
  } catch (error) {
    console.log(error);
  }
}

const formatDate = (str: string) => {
  const date = new Date(str);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export default async function Home() {
  const groups = await getData();

  return (
    <main className="p-4 text-lg">
      {groups.map((group: any) => {
        return (
          <>
            <h1 className="mx-auto text-3xl md:text-6xl lg:text-6xl font-bold mb-4 mt-8">
              {group.groupName}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {group.detail.map((article: any) => {
                return (
                  <a
                    key={article.id}
                    href={`/${article.id}`}
                    className="mt-4 md:mt-2"
                  >
                    <img
                      src={article.avatarLink}
                      width={640}
                      height={640}
                      alt={article.name}
                      loading="lazy"
                      className="w-full object-cover shadow-lg"
                      sizes="(max-width: 640px) 100vw"
                      placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkEAMAABwAGLaurXYAAAAASUVORK5CYII="
                    />
                    <h2 className="font-semibold text-3xl mt-4">
                      {article.name}
                    </h2>
                    <p className="mt-2">
                      Posted: {formatDate(article.dateTimeStart)}
                    </p>
                  </a>
                );
              })}
            </div>
          </>
        );
      })}
    </main>
  );
}
