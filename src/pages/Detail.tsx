import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Typography, Button } from '@mui/material';
import axios from 'axios';

type PokemonMove = {
  move: {
    name: string;
  };
};

type PokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    back_default: string | null;
    back_shiny: string | null;
    other: {
      'official-artwork': {
        front_default: string | null;
      };
    };
  };
  moves: PokemonMove[];
};

export default function Detail() {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);

  useEffect(() => {
    if (!name) {
      return;
    }

    axios
      .get<PokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => setPokemon(response.data))
      .catch((error) => console.error(error));
  }, [name]);

  if (!pokemon) {
    return (
      <Typography variant="h5" align="center" className="mt-20">
        Loading Data...
      </Typography>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-16 mb-10">
      <Card
        variant="outlined"
        className="p-4 md:p-10 rounded-2xl shadow-md border-gray-700"
      >
        <Button 
          component={Link} 
          to="/" 
          variant="outlined" 
          className="mb-6 font-bold border-gray-700 text-black hover:bg-gray-100"
        >
          Back to Home
        </Button>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          className="capitalize font-extrabold mb-8"
        >
          {pokemon.name}
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <div className="flex flex-col gap-6">
              <Card variant="outlined" className="p-4 text-center rounded-xl border-gray-700">
                <Typography variant="subtitle1" color="text.secondary" gutterBottom className="font-bold">
                  Official Artwork
                </Typography>
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default ?? ''}
                  alt="Official Artwork"
                  className="w-full max-w-[200px] h-auto mx-auto"
                />
              </Card>

              <Card variant="outlined" className="p-4 rounded-xl border-gray-700">
                <Typography variant="subtitle1" color="text.secondary" gutterBottom className="font-bold">
                  Sprites
                </Typography>
                <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded">
                  {Object.entries({
                    'Front': pokemon.sprites.front_default,
                    'Front Shiny': pokemon.sprites.front_shiny,
                    'Back': pokemon.sprites.back_default,
                    'Back Shiny': pokemon.sprites.back_shiny,
                  })
                    .filter(([, url]) => url !== null)
                    .map(([label, url]) => (
                      <div
                        key={label}
                        className="text-center min-w-[80px] flex-shrink-0"
                      >
                        <img
                          src={url ?? ''}
                          alt={label}
                          className="w-20 h-20 object-contain"
                        />
                        <Typography variant="caption" color="text.secondary" display="block" className="mt-1 font-bold">
                          {label}
                        </Typography>
                      </div>
                    ))}
                </div>
              </Card>
            </div>
          </div>

          <div className="md:col-span-7">
            <Card
              variant="outlined"
              className="p-8 h-full rounded-xl flex flex-col border-gray-700"
            >
              <div className="mb-6">
                <Typography variant="h6" className="mb-2 font-bold">
                  Pokedex ID: {pokemon.id}
                </Typography>
                <Typography variant="h6" className="mb-2 font-bold">
                  Height: {pokemon.height}
                </Typography>
                <Typography variant="h6" className="mb-2 font-bold">
                  Weight: {pokemon.weight}
                </Typography>
              </div>

              <div>
                <Typography variant="h6" className="font-extrabold mb-4">
                  Move:
                </Typography>
                <div className="flex flex-col gap-3">
                  {pokemon.moves.slice(0, 3).map((moveObj) => (
                    <Card
                      key={moveObj.move.name}
                      variant="outlined"
                      className="p-3 rounded-lg border-gray-700"
                    >
                      <Typography variant="body1" align="center" className="capitalize font-bold">
                        {moveObj.move.name}
                      </Typography>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}
