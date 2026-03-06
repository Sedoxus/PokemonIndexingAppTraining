import { useEffect, useState } from 'react';
import { Card, Typography, CardMedia, Box, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

type PokemonListItem = {
  name: string;
  url: string;
};

type PokemonListResponse = {
  results: PokemonListItem[];
};

export default function Home() {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);

  useEffect(() => {
    axios
      .get<PokemonListResponse>('https://pokeapi.co/api/v2/pokemon?limit=40')
      .then((response) => setPokemonList(response.data.results))
      .catch(error => console.error(error));
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto',
      }}
    >
        {pokemonList.map((pokemon) => {
          const pokeId = pokemon.url.split('/')[6];
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`;
          return (
             <Card 
                key={pokemon.name}
                variant="outlined" 
                sx={{ 
                  width: {
                    xs: '100%',
                    sm: 'calc(50% - 12px)',
                    md: 'calc(25% - 18px)',
                    lg: 'calc(20% - 18px)',
                  },
                  textAlign: 'center', 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  borderRadius: 3,
                  boxShadow: 1,
                  transition: '0.2s',
                  '&:hover': { boxShadow: 4 }
                }}
              >
                <Box sx={{ p: 2 }}>

                  <CardMedia
                    component="img"
                    image={imageUrl}
                    alt={pokemon.name}
                    sx={{ width: '100%', height: '120px', objectFit: 'contain' }}
                  />
                </Box>
                
                <Divider />
                <Box sx={{ p: 2, bgcolor: '#fdfdfd' }}>
                  <Typography 
                    variant="h6" 
                    component={Link} 
                    to={`/pokemon/${pokemon.name}`}
                    sx={{ 
                      textTransform: 'capitalize',
                      textDecoration: 'none', 
                      color: '#333',
                      fontWeight: 'bold',
                      display: 'block',
                      '&:hover': { color: '#1976d2' } 
                    }}
                  >
                    {pokemon.name}
                  </Typography>
                </Box>
              </Card>
          )
        })}
    </Box>
  );
}