module.exports = function override(api) {
  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = ['react-native-reanimated/plugin'];

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
