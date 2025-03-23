export const getColorFromTitle = (title) => {
    const colors = {
      urgent: "#ff4d4d", // Red
      important: "#ffa500", // Orange
      work: "#4682b4", // Blue
      personal: "#32cd32", // Green
      others: "#d3d3d3", // Gray
    };
  
    if (!title) return colors["others"];
  
    const lowerTitle = title.toLowerCase();
    console.log("Checking title:", lowerTitle);
  
    for (const keyword in colors) {
      if (lowerTitle.includes(keyword)) {
        console.log("Matched keyword:", keyword, "Color:", colors[keyword]);
        return colors[keyword];
      }
    }
  
    return colors["others"];
  };
  