// https://zhongdeliu.github.io/placeholder-image/
const imageDataURI = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAHNJREFUKFOdkLEKwCAMRM/JwUFwdPb/v8RPEDcdBQcHJyUt0hQ6hGY6Li8XEhVjXM45aK3xVXNOtNagcs6LRAgB1toX23tHSgkUpEopyxhzGRw+EHljjBv03oM3KJYP1lofkJoHJs3T/4Gi1aJjxO+RPnwDur2EF1gNZukAAAAASUVORK5CYII=`;

const byteString = atob(imageDataURI.split(',')[1]);
const mimeString = imageDataURI.split(',')[0].split(':')[1].split(';')[0];
const ab = new ArrayBuffer(byteString.length);
const ia = new Uint8Array(ab);

for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
}

const blob = new Blob([ab], { type: mimeString });

const dummyImageFile = new File([blob], 'dummy_image.jpg', { type: mimeString });

export default dummyImageFile;