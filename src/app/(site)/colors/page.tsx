import ColorsList from "./colors-list";

export const metadata = {
  title: "GetColor.io | Colors Palette",
  description: "All the collor names used in GetColor.io Camera Color Picker",
};

export default function ColorsPage() {
  return (
    <>
      <h1 className="text-4xl font-bold">Colors Palette</h1>

      <ColorsList />

      <div className="flex flex-col gap-2 pt-8">
        <h3 className="text-2xl font-bold">Credits</h3>
        <p>
          This palette is using colors from{" "}
          <a className="underline" href="https://chir.ag/projects/ntc/">
            NTC (Name That Color)
          </a>{" "}
          by{" "}
          <a className="underline" href="https://chir.ag/">
            Chirag Mehta
          </a>
          . Thanks a lot for making this amazing collection of colors.
        </p>
      </div>
    </>
  );
}
