import { useEffect, useState } from 'react';
import { Grid, Card, Typography, Container, CardMedia, Box, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
      .then(response => setPokemonList(response.data.results))
      .catch(error => console.error(error));
  }, []);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
        {pokemonList.map((pokemon, index) => {
          const pokeId = pokemon.url.split('/')[6];
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`;
          return (
             <Card 
                variant="outlined" 
                sx={{ 
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