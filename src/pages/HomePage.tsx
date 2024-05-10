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
import PatternFive from "../assets/pattern_5.jpg";

interface MenuItem {
  name: string;
  description: string;
  image: string;
  link: string;
}

const menuItems: MenuItem[] = [
  {
    name: "Matrix Gambar",
    description: "Melihat matriks dari gambar yang diunggah",
    image: PatternFour,
    link: "/matrix-image",
  },
  {
    name: "Konversi Warna",
    description: "Konversi gambar ke warna merah, hijau, biru, atau abu-abu",
    image: PatternOne,
    link: "/convert-color",
  },
  {
    name: "Kompresi Gambar",
    description: "Kompressi gambar dengan opsi kualitas",
    image: PatternTwo,
    link: "/compress-image",
  },
  {
    name: "Pertajam Gambar",
    description: "Pertajam gambar dengan filter sharpening",
    image: PatternThree,
    link: "/sharpen-image",
  },
  {
    name: "Transformasi Fourier",
    description: "Transformasi fourier pada gambar",
    image: PatternFive,
    link: "/fourier-transform",
  },
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
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex flex-col space-y-4 justify-center items-center">
          <p className="text-4xl font-bold text-gray-200 max-w-3xl text-center">
            Aplikasi untuk memproses gambar dengan berbagai teknik
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 md:gap-8 mx-auto justify-center items-center mt-12 lg:mt-16">
        {menuItems.map((item) => (
          <Menu key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
