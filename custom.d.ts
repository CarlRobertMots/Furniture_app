// custom.d.ts

// This tells TypeScript that importing a .png file returns a number,
// which is the asset ID used by React Native's Image component when using require().
declare module "*.png" {
  const value: number;
  export default value;
}
