import { useEffect, useState } from 'react';
import { Card, Typography, CardMedia, Box, Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

type PokemonListItem = {
  name: string;
  url: string;
};

type PokemonListResponse = {
  count: number;
  results: PokemonListItem[];
};

const PAGE_SIZE = 40;

export default function Home() {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const offset = (currentPage - 1) * PAGE_SIZE;

    axios
      .get<PokemonListResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`)
      .then((response) => {
        setPokemonList(response.data.results);
        setTotalCount(response.data.count);
      })
      .catch(error => console.error(error));
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const startPokemon = totalCount === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endPokemon = Math.min(currentPage * PAGE_SIZE, totalCount);

  return (
    <Box className="w-full max-w-[1200px] mx-auto" sx={{ pt: 5 }}>
  
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center',
          width: '100%',
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

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1 }}>
          <Button
            variant="outlined"
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            disabled={currentPage === 1}
            sx={{
              bgcolor: '#fff',
              color: '#333',
              borderColor: 'grey.500',
              '&:hover': { bgcolor: '#f7f7f7', borderColor: 'grey.700' },
            }}
          >
            Prev
          </Button>
          <Typography variant="body1" sx={{ minWidth: '230px', textAlign: 'center', fontWeight: 700 }}>
            {startPokemon} - {endPokemon} out of {totalCount} pokemons
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            disabled={totalPages === 0 || currentPage >= totalPages}
            sx={{
              bgcolor: '#fff',
              color: '#333',
              borderColor: 'grey.500',
              '&:hover': { bgcolor: '#f7f7f7', borderColor: 'grey.700' },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}