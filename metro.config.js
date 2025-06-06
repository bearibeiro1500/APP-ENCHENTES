const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Adiciona suporte adequado para web
config.resolver.sourceExts.push('jsx', 'js', 'ts', 'tsx');
config.transformer.minifierConfig = {
  keep_classnames: true,
  keep_fnames: true,
  mangle: {
    keep_classnames: true,
    keep_fnames: true,
  },
};

// Configura MIME types corretamente
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

// Adiciona suporte para web
config.resolver.assetExts.push('png', 'jpg', 'jpeg', 'gif', 'ico');

module.exports = config; 