export const getCommentsData = async () => {
  return [
    {
      _id: "10",
      user: {
        _id: "a",
        name: "Ally Joh",
        image: "/imageUrl",
      },
      desc: "It was a nice post, Thank you",
      post: "1",
      parent: null,
      replyOnUser: null,
      createdAt: "2024-01-31T17:22:05.092+0000",
    },
    {
      _id: "11",
      user: {
        _id: "b",
        name: "Francis Allan",
      },
      desc: "a reply for Ally Joh",
      post: "1",
      parent: "10",
      replyOnUser: "a",
      createdAt: "2024-01-31T17:22:05.092+0000",
    },
    {
      _id: "12",
      user: {
        _id: "b",
        name: "Francis Allan",
      },
      desc: "Keep it up bro <3",
      post: "1",
      parent: null,
      replyOnUser: null,
      createdAt: "2024-01-31T17:22:05.092+0000",
    },
    {
      _id: "13",
      user: {
        _id: "c",
        name: "Grace ",
      },
      desc: "I'm alwayes interrested in your content :)",
      post: "1",
      parent: null,
      replyOnUser: null,
      createdAt: "2024-01-31T17:22:05.092+0000",
    },
  ];
};
