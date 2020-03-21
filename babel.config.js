module.exports = {
  presets: [
    // [
    "@babel/preset-env",
    "@babel/preset-react"
    // {
    //   targets: {
    //     node: "current"
    //   }
    // }
    // ]
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true
      }
    ]
  ]
};
