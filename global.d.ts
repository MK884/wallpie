// {
//     "id": 3082832,
//     "pageURL": "https://pixabay.com/photos/nature-waters-lake-island-3082832/",
//     "type": "photo",
//     "tags": "nature, waters, lake",
//     "previewURL": "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_150.jpg",
//     "previewWidth": 150,
//     "previewHeight": 84,
//     "webformatURL": "https://pixabay.com/get/gebce35a6c52e18e90e2225e9c0cae8d08a5bd3f503cae994be1d463846a8b9cded732ccba99af722282daca320a7923cadc94faf5184a1dc16d43d0cc1ce0957_640.jpg",
//     "webformatWidth": 640,
//     "webformatHeight": 359,
//     "largeImageURL": "https://pixabay.com/get/gbd2273aaaba2e688e40387d3205099629e82fe910936319bcd0172d79f3726c2b20414ecb1f7478e02e12a1d64205e1f6f26bbadd8eb9ce9ab3fb9724234ad35_1280.jpg",
//     "imageWidth": 5757,
//     "imageHeight": 3238,
//     "imageSize": 4638828,
//     "views": 7029147,
//     "downloads": 4307417,
//     "collections": 187389,
//     "likes": 5132,
//     "comments": 753,
//     "user_id": 7645255,
//     "user": "jplenio",
//     "userImageURL": "https://cdn.pixabay.com/user/2024/06/10/13-43-32-848_250x250.jpg"
//   },

interface IPixabay {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  collections: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}
