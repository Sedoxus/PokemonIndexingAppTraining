# MUI sx → Tailwind Conversion Reference

This document shows how we converted your Pokemon app from MUI `sx` prop to Tailwind `className`.

## Layout & Container

### Before (MUI sx)
```jsx
<Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
```

### After (Tailwind)
```jsx
<div className="w-full max-w-7xl mx-auto">
```

---

## Flexbox Layout

### Before (MUI sx)
```jsx
<Box sx={{ 
  display: 'flex', 
  flexWrap: 'wrap', 
  gap: 3, 
  justifyContent: 'center' 
}}>
```

### After (Tailwind)
```jsx
<div className="flex flex-wrap gap-6 justify-center">
```

---

## Spacing (Padding & Margin)

### Before (MUI sx)
```jsx
<Box sx={{ p: 2, mt: 3, mb: 5 }}>
<Box sx={{ px: 2, py: 1 }}>
```

### After (Tailwind)
```jsx
<div className="p-4 mt-6 mb-10">
<div className="px-4 py-2">
```

**Scale reference:**
- MUI `1` = Tailwind `2` = 8px
- MUI `2` = Tailwind `4` = 16px
- MUI `3` = Tailwind `6` = 24px

---

## Border & Shadows

### Before (MUI sx)
```jsx
<Card sx={{ 
  borderRadius: 3, 
  boxShadow: 1,
  borderColor: 'grey.700'
}}>
```

### After (Tailwind)
```jsx
<Card className="rounded-xl shadow-md border-gray-700">
```

**Tailwind border radius:**
- `rounded` = 4px
- `rounded-lg` = 8px
- `rounded-xl` = 12px
- `rounded-2xl` = 16px

---

## Typography & Text

### Before (MUI sx)
```jsx
<Typography sx={{ 
  fontWeight: 700,
  textAlign: 'center',
  textTransform: 'capitalize'
}}>
```

### After (Tailwind)
```jsx
<Typography className="font-bold text-center capitalize">
```

---

## Responsive Design

### Before (MUI sx)
```jsx
<Box sx={{ 
  p: { xs: 2, md: 5 },
  width: {
    xs: '100%',
    sm: 'calc(50% - 12px)',
    md: 'calc(25% - 18px)'
  }
}}>
```

### After (Tailwind)
```jsx
<div className="p-4 md:p-10 w-full sm:w-[calc(50%-12px)] md:w-[calc(25%-18px)]">
```

**Tailwind breakpoints:**
- `sm:` = 640px+
- `md:` = 768px+
- `lg:` = 1024px+
- `xl:` = 1280px+

---

## Grid Layout

### Before (MUI Grid)
```jsx
<Grid container spacing={4}>
  <Grid size={{ xs: 12, md: 5 }}>
  <Grid size={{ xs: 12, md: 7 }}>
</Grid>
```

### After (Tailwind)
```jsx
<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
  <div className="md:col-span-5">
  <div className="md:col-span-7">
</div>
```

---

## Hover States

### Before (MUI sx)
```jsx
<Card sx={{ 
  boxShadow: 1,
  transition: '0.2s',
  '&:hover': { boxShadow: 4 }
}}>
```

### After (Tailwind)
```jsx
<Card className="shadow-md transition-shadow duration-200 hover:shadow-xl">
```

---

## Colors

### Before (MUI sx)
```jsx
<Box sx={{ 
  bgcolor: '#fdfdfd',
  color: '#333',
  borderColor: 'grey.500'
}}>
```

### After (Tailwind)
```jsx
<div className="bg-[#fdfdfd] text-gray-800 border-gray-500">
```

**Arbitrary values:** Use brackets `[]` for custom colors not in Tailwind's default palette.

---

## Custom Scrollbar

### Before (MUI sx)
```jsx
<Box sx={{
  overflowX: 'auto',
  '&::-webkit-scrollbar': { height: '8px' },
  '&::-webkit-scrollbar-thumb': { 
    backgroundColor: '#616161',
    borderRadius: '4px'
  }
}}>
```

### After (Tailwind)
```jsx
<div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded">
```

**Arbitrary variants:** Use `[&:selector]:utility` for custom pseudo-selectors.

---

## Quick Cheat Sheet

| MUI sx Property | Tailwind Class |
|----------------|----------------|
| `display: 'flex'` | `flex` |
| `flexDirection: 'column'` | `flex-col` |
| `justifyContent: 'center'` | `justify-center` |
| `alignItems: 'center'` | `items-center` |
| `gap: 2` | `gap-4` |
| `p: 2` | `p-4` |
| `mx: 'auto'` | `mx-auto` |
| `textAlign: 'center'` | `text-center` |
| `fontWeight: 700` | `font-bold` |
| `fontWeight: 800` | `font-extrabold` |
| `width: '100%'` | `w-full` |
| `height: '100%'` | `h-full` |
| `borderRadius: 3` | `rounded-xl` |
| `boxShadow: 1` | `shadow-md` |

---

## When to Keep MUI vs Use Tailwind

### Keep MUI for:
- Complex components (Card, Button, Typography)
- Component variants (`variant="outlined"`)
- Theme-based colors (`color="text.secondary"`)
- Typography presets (`variant="h6"`)

### Use Tailwind for:
- Layout (flex, grid, spacing)
- Responsive design (breakpoints)
- Custom spacing/sizing
- Hover/focus states
- Colors and backgrounds

---

## Combined Usage Pattern

```jsx
<Card 
  variant="outlined"              // MUI feature
  className="p-4 rounded-xl"      // Tailwind layout
>
  <Typography 
    variant="h6"                   // MUI typography preset
    className="font-bold mb-2"     // Tailwind customization
  >
    Title
  </Typography>
</Card>
```

This hybrid approach gives you the best of both worlds!
