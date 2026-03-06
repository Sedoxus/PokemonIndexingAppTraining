import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, Container, Box } from '@mui/material';
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
        front_shiny: string | null;
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
      <Typography variant="h5" align="center" sx={{ mt: 10 }}>
        Loading Data...
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 5 }}>
      <Card variant="outlined" sx={{ p: { xs: 2, md: 5 }, borderRadius: 4, boxShadow: 2 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ textTransform: 'capitalize', fontWeight: 'bold', mb: 4 }}
        >
          {pokemon.name}
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Sprites
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {Object.entries({
              'Official Artwork': pokemon.sprites.other['official-artwork'].front_default,
              'Official Artwork Shiny': pokemon.sprites.other['official-artwork'].front_shiny,
              'Front': pokemon.sprites.front_default,
              'Front Shiny': pokemon.sprites.front_shiny,
              'Back': pokemon.sprites.back_default,
              'Back Shiny': pokemon.sprites.back_shiny,
            })
              .filter(([, url]) => url !== null)
              .map(([label, url]) => (
                <Card
                  key={label}
                  variant="outlined"
                  sx={{ p: 2, textAlign: 'center', borderRadius: 2, flex: '1 1 auto', minWidth: '120px' }}
                >
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                    {label}
                  </Typography>
                  <img
                    src={url ?? ''}
                    alt={label}
                    style={{ width: '100%', maxWidth: '120px', height: 'auto' }}
                  />
                </Card>
              ))}
          </Box>
        </Box>

        <Card
          variant="outlined"
          sx={{ p: 4, borderRadius: 3, display: 'flex', flexDirection: 'column' }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Pokedex ID: {pokemon.id}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Height: {pokemon.height}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Weight: {pokemon.weight}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Move:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {pokemon.moves.slice(0, 3).map((moveObj) => (
                <Card
                  key={moveObj.move.name}
                  variant="outlined"
                  sx={{ p: 1.5, borderRadius: 2, borderColor: '#ccc' }}
                >
                  <Typography variant="body1" align="center" sx={{ textTransform: 'capitalize' }}>
                    {moveObj.move.name}
                  </Typography>
                </Card>
              ))}
            </Box>
          </Box>
        </Card>
      </Card>
    </Container>
  );
}
