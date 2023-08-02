module.exports = function override(api) {
  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = [];

  api.cache(true);

  plugins.push([
    'module-resolver',
    {
      root: ['.'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  ]);
  return {
    presets,
    plugins,
  };
};
