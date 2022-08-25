export const categories = [
  {
      name: 'Animals',
      image: 'https://static.posters.cz/image/1300/fototapet/cute-kitten-i77094.jpg',
  },
  {
      name: 'Wallpapers',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt73Mol8oo5JZeHXpqPxnH-cddgkyN8Y467RgK2En9cRMwQxdHcqI5XjVCdTdNcsZNXAo&usqp=CAU',
  },
  {
      name: 'Art',
      image: 'https://yt3.ggpht.com/ytc/AKedOLSRSl8xsTNuQU_f6sg3bHI19gZYUSqLu2I78S90MQ=s900-c-k-c0x00ffffff-no-rj',
  },
  {
      name: 'Places',
      image: 'https://www.cinqueterre.eu.com/images/stories/web/pisa/torre-di-pisa-350.jpg',
  },
  {
      name: 'Food',
      image: 'https://images.deliveryhero.io/image/fd-op/LH/xbrj-hero.jpg',
  },
  {
      name: 'Gaming',
      image: 'https://storage.googleapis.com/pod_public/1300/121065.jpg',
  },
  {
      name: 'Memes',
      image: 'https://cdn.pocket-lint.com/r/s/1201x/assets/images/152027-apps-news-these-memes-do-not-exist-and-are-made-by-ai-image1-eh5wdqtisy.jpg',
  },
  {
      name: 'Coding',
      image: 'https://repository-images.githubusercontent.com/310526431/f3510580-2712-11eb-9cf2-793ab4e1bbf7',
  },
  {
      name: 'Other',
      image: 'https://i1.sndcdn.com/artworks-000163652249-zpswew-t500x500.jpg',
  },
];

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[[_type] == "pin" && title match '${searchTerm}' || category match '${searchTerm}' || about match '${searchTerm}']{
      image {
          asset -> {
              url
          }
      },
      _id,
      destination,
      postedBy -> {
          _id,
          userName,
          image
      },
      save[] {
          _key,
          postedBy -> {
              _id,
              userName,
              image
          },
      },
  }`

  return query;
}

export const userQuery = (userId) => {
    const query = `*[_type == 'user' && _id == '${userId}']`;
    return query;
}

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};