const newColorScheme = {
    darkBase: '#021526',
    darkAccent: '#03346E',
    lightBlue: '#6EACDA',
    lightBeige: '#E2E2B6',
  };

  const buttonStyle = {
    backgroundColor: newColorScheme.lightBlue,
    color: newColorScheme.lightBeige,
    '&:hover': {
      backgroundColor: newColorScheme.darkBase,
    },
  };
  
  const tableStyle = {
    backgroundColor: newColorScheme.darkAccent,
    color: newColorScheme.lightBeige,
  };
  

export default {newColorScheme, buttonStyle, tableStyle} //newColorScheme