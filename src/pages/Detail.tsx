import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Typography, Container, Grid, Box, Button } from '@mui/material';
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
      <Typography variant="h5" align="center" sx={{ mt: 10 }}>
        Loading Data...
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 5 }}>
      <Card
        variant="outlined"
        sx={{ p: { xs: 2, md: 5 }, borderRadius: 4, boxShadow: 2, borderColor: 'grey.700' }}
      >
        <Button component={Link} to="/" variant="outlined" sx={{ mb: 3, fontWeight: 700, borderColor: 'grey.700', color: 'black' }}>
          Back to Home
        </Button>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ textTransform: 'capitalize', fontWeight: 800, mb: 4 }}
        >
          {pokemon.name}
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Card variant="outlined" sx={{ p: 2, textAlign: 'center', borderRadius: 3, borderColor: 'grey.700' }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ fontWeight: 700 }}>
                  Official Artwork
                </Typography>
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default ?? ''}
                  alt="Official Artwork"
                  style={{ width: '100%', maxWidth: '200px', height: 'auto' }}
                />
              </Card>

              <Card variant="outlined" sx={{ p: 2, borderRadius: 3, borderColor: 'grey.700' }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ fontWeight: 700 }}>
                  Sprites
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    overflowX: 'auto',
                    pb: 1,
                    '&::-webkit-scrollbar': {
                      height: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#616161',
                      borderRadius: '4px',
                    },
                  }}
                >
                  {Object.entries({
                    'Front': pokemon.sprites.front_default,
                    'Front Shiny': pokemon.sprites.front_shiny,
                    'Back': pokemon.sprites.back_default,
                    'Back Shiny': pokemon.sprites.back_shiny,
                  })
                    .filter(([, url]) => url !== null)
                    .map(([label, url]) => (
                      <Box
                        key={label}
                        sx={{
                          textAlign: 'center',
                          minWidth: '80px',
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={url ?? ''}
                          alt={label}
                          style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                        />
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5, fontWeight: 700 }}>
                          {label}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              </Card>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Card
              variant="outlined"
              sx={{ p: 4, height: '100%', borderRadius: 3, display: 'flex', flexDirection: 'column', borderColor: 'grey.700' }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                  Pokedex ID: {pokemon.id}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                  Height: {pokemon.height}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                  Weight: {pokemon.weight}
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Move:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {pokemon.moves.slice(0, 3).map((moveObj) => (
                    <Card
                      key={moveObj.move.name}
                      variant="outlined"
                      sx={{ p: 1.5, borderRadius: 2, borderColor: 'grey.700' }}
                    >
                      <Typography variant="body1" align="center" sx={{ textTransform: 'capitalize', fontWeight: 700 }}>
                        {moveObj.move.name}
                      </Typography>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
