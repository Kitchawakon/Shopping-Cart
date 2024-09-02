"use client";

import { useState } from "react";
import { IconButton, Stack, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import NumberFormat from 'react-number-format';

const items = [
    { name: "iPhone 15 Pro", price: 39900, image: "https://www.istudio.store/cdn/shop/files/TH_iPhone_15_Pro_Natural_Titanium_PDP_Image_Position-1A_Natural_Titanium_Color.jpg?v=1707277926&width=1445" },
    { name: "iPhone 15", price: 28900, image: "https://mobileleb.com/cdn/shop/files/apple-mobile-phone-apple-iphone-15-512gb-33291233558660_1200x1200.jpg?v=1697425349" },
    { name: "iPad Pro", price: 35900, image: "https://media.studio7thailand.com/81576/iPad_Pro_Cellular_12-9_in_6th_Gen_Space_Gray_5G_2-square_medium.jpg" },
    { name: "iPad Air", price: 22900, image: "https://www.istudio.store/cdn/shop/files/iPad_Air_13_M2_WiFi_Starlight_PDP_Image_Position_1b__en-US_7a608d1c-6550-4adb-be92-169152ad7d91.jpg?v=1716471228&width=823" },
    { name: "iPad", price: 13900, image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-blue-wifi_FMT_WHH?wid=640&hei=360&fmt=jpeg&qlt=95&.v=1670856032314" },
    { name: "iPad mini", price: 20900, image: "https://media.studio7thailand.com/6529/iPad_mini_Cellular_Purple_2-square_medium.jpg" },
    { name: "MacBook Air", price: 34900, image: "https://www.istudio.store/cdn/shop/files/macbook-air-m1-space-gray-001.jpg?v=1706069830" },
    { name: "MacBook Pro", price: 52900, image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830200" },
    { name: "iMac", price: 48900, image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/imac-24-no-id-blue-selection-hero-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1701459101618" },
    { name: "Mac mini", price: 20900, image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mac-mini-hero-202301_FMT_WHH?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671503802341" },
    { name: "Mac Studio", price: 54900, image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mac-studio-select-202306?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1684345161143" },
  ];

export default function Home() {
  const [counts, setCounts] = useState(Array(items.length).fill(0));
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const handleAdd = (index) => {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);
    calculateTotals(newCounts);
  };

  const handleRemove = (index) => {
    const newCounts = [...counts];
    if (newCounts[index] > 0) {
      newCounts[index] -= 1;
      setCounts(newCounts);
      calculateTotals(newCounts);
    }
  };

  const calculateTotals = (counts) => {
    const total = counts.reduce((sum, count, index) => sum + count * items[index].price, 0);
    const totalItemCount = counts.reduce((sum, count) => sum + count, 0);
    setTotalPrice(total);
    setTotalCount(totalItemCount);
  };

  // Helper function to format price with commas and suffix
  const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(price);
  };

  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                alt={item.name}
                height="140"
                image={item.image}
                sx={{ 
                    objectFit: "contain",  // ทำให้ภาพแสดงทั้งหมดภายในกรอบ
                    objectPosition: "center", // ทำให้ภาพอยู่ตรงกลาง
                  }}
              />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: {formatPrice(item.price)}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" mt={1}>
                  <IconButton onClick={() => handleRemove(index)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="h6">{counts[index]}</Typography>
                  <IconButton onClick={() => handleAdd(index)}>
                    <AddIcon />
                  </IconButton>
                  <Typography variant="body2">
                    Total: {formatPrice(counts[index] * item.price)}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6" align="right" style={{ marginTop: 16 }}>
        Total Items: {totalCount} | Grand Total: {formatPrice(totalPrice)}
      </Typography>
    </div>
  );
}
