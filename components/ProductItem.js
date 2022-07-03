import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
  } from '@material-ui/core';
  import React from 'react';
  import NextLink from 'next/link';
  import Rating from '@material-ui/lab/Rating';
  
  export default function ProductItem({ product, addToCart }) {
    return (
      <Card>
        <NextLink href={`/product/${product.slug}`} passHref>
          <CardActionArea>
            <CardMedia
              component="img"
              image={product.image}
              title={product.name}
            ></CardMedia>
            <CardContent>
              <Typography>{product.name}</Typography>
              <Rating value={product.rating} readOnly></Rating>
            </CardContent>
          </CardActionArea>
        </NextLink>
        <CardActions>
          <Typography>&#8358;{product.price}</Typography>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    );
  }