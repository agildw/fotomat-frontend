import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import PatternOne from "../assets/pattern_1.jpg";
import PatternTwo from "../assets/pattern_2.jpg";
import PatternThree from "../assets/pattern_3.jpg";
import PatternFour from "../assets/pattern_4.jpg";
// import PatternFive from "../assets/pattern_5.jpg";

interface MenuItem {
  name: string;
  description: string;
  image: string;
  link: string;
}

const menuItems: MenuItem[] = [
  {
    name: "Matrix Gambar",
    description: "Melihat matrix dari gambar",
    image: PatternFour,
    link: "/matrix-image",
  },
  {
    name: "Konversi warna",
    description: "Konversi gambar ke warna merah, hijau, biru, atau abu-abu",
    image: PatternOne,
    link: "/convert-color",
  },
  {
    name: "Kompresi gambar",
    description: "Kompressi gambar dengan opsi kualitas",
    image: PatternTwo,
    link: "/compress-image",
  },
  {
    name: "Pertajam gambar",
    description: "Pertajam gambar dengan opsi intensitas",
    image: PatternThree,
    link: "/sharpen-image",
  },
  // {
  //   name: "Transformasi fourier",
  //   description: "Transformasi fourier pada gambar",
  //   image: PatternFive,
  //   link: "/fourier-transform",
  // },
];

function Menu({ name, image, description, link }: MenuItem) {
  return (
    <Card
      sx={{ width: 345, bgcolor: "#535C91", color: "white" }}
      className="my-8"
    >
      <CardActionArea href={link}>
        <CardMedia
          component="img"
          height="40"
          image={image}
          alt="pattern"
          className="h-40 w-full object-cover"
        />
        <CardContent className="h-28">
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="body2" className="text-gray-300">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function HomePage() {
  return (
    <div className="flex flex-col w-screen">
      <div className="flex flex-col">
        <div className="flex flex-col space-y-4 mt-8 justify-center items-center">
          <p className="text-4xl font-bold text-gray-200 max-w-3xl text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          </p>
          <p className="text-xl font-bold text-gray-600 max-w-3xl text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            eveniet asperiores eius dolore repellat iste nihil ex. Iure nam
            reprehenderit recusandae quasi laboriosam! Provident dolorem cum
            beatae, possimus ad ea.
          </p>
        </div>
      </div>
      {/* <div className="flex flex-row space-x-16 mt-24 mx-auto flex-wrap"> */}

      <div
        className="flex flex-wrap justify-center items-center 
      space-x-8 mt-24 max-w-8xl mx-auto w-full"
      >
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mx-auto justify-center items-center"> */}
        {menuItems.map((item) => (
          <Menu key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
