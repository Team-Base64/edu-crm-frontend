const imageRegRex = /.webp|.svg|.jpg|.jpeg|.gif|.png/;

export const checkIfImageByExtension = (fileName: string) =>
    imageRegRex.test(fileName);
