import React, { useState, useRef } from "react";
import { Button, IconButton, Box } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "Graphic Designer",
  "FullStack Developer"
];

const Carousel = () => {
  const containerRef = useRef(null);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0); // Index of the first visible item
  const visibleCount = 3; // Number of visible buttons at once

  const handleScroll = (direction) => {
    let newStartIndex = visibleStartIndex;

    // Adjust the visibleStartIndex based on the scroll direction
    if (direction === "left" && newStartIndex > 0) {
      newStartIndex -= 1;
    }
    if (direction === "right" && newStartIndex < category.length - visibleCount) {
      newStartIndex += 1;
    }

    setVisibleStartIndex(newStartIndex);

    // Smoothly scroll the container to align the selected items
    const scrollAmount = direction === "left" ? -350 : 350; // Adjust scroll amount
    containerRef.current.scrollTo({
      left: containerRef.current.scrollLeft + scrollAmount,
      behavior: "smooth"
    });
  };

  const getVisibleItems = () => {
    return category.slice(visibleStartIndex, visibleStartIndex + visibleCount);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "10vh", // Center vertically
        padding: 4
      }}
    >
      <IconButton
        onClick={() => handleScroll("left")}
        sx={{
          marginRight: 4,
          fontSize: "3rem", // Bigger icon
          color: "#1876D1", // Cool color for the left arrow
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.3)", // Larger zoom on hover
            color: "#9C27B0" // Hover color change
          }
        }}
      >
        <ArrowBack />
      </IconButton>

      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 4, // Increased gap between buttons
          padding: 2,
          width: "auto",
          justifyContent: "center",
          "&::-webkit-scrollbar": {
            display: "none"
          },
          scrollBehavior: "smooth", // Make scrolling smoother
          transition: "scroll 0.5s ease-in-out" // Smooth transition effect when scrolling
        }}
      >
        {getVisibleItems().map((item, index) => (
          <Button
            key={index}
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              padding: "12px 24px", // Larger button size
              fontSize: "1rem", // Larger font size
              borderRadius: "40px", // More rounded corners
              backgroundColor: "white", // Orange background
              borderColor: "#1876D1", // Blue border
              color: "#1876D1", // Blue text color
              transition: "transform 0.3s ease, background-color 0.3s ease",
              ":hover": {
                backgroundColor: "#9C27B0", // Purple on hover
                color: "#ffffff", // White text on hover
                transform: "scale(1.1)", // Slight zoom effect on hover
              }
            }}
          >
            {item}
          </Button>
        ))}
      </Box>

      <IconButton
        onClick={() => handleScroll("right")}
        sx={{
          marginLeft: 4,
          fontSize: "3rem", // Bigger icon
          color: "#1876D1", // Cool color for the right arrow
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.3)", // Larger zoom on hover
            color: "#9C27B0" // Hover color change
          }
        }}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
};

export default Carousel;
