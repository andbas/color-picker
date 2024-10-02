import { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "GetColor.io | About",
};

export default function About() {
  return (
    <>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold">About GetColor.io</h1>

        <p className="text-md">
          Welcome to GetColor.io — a free, ad-free, and instant{" "}
          <strong>camera color picker</strong> that helps you identify colors in
          real-time using your device's camera. This project was born out of a
          personal need and a passion for creating accessible tools for
          everyone.
        </p>

        <h2 className="text-2xl font-bold pt-4">
          The Story Behind GetColor.io
        </h2>

        <p className="text-md">
          I'm a software engineer with partial color blindness, specifically
          when it comes to distinguishing certain shades in the green and red
          spectrum. This condition affects approximately 1 in 12 men and 1 in
          200 women worldwide — hundreds of millions of people who might face
          similar challenges in everyday situations.
        </p>

        <p className="text-md">
          One day, I was at an IKEA store on a mission to buy a green chair for
          my daughter. What seemed like a simple task turned complicated when I
          couldn't differentiate the green chair from the gray one due to my
          color vision deficiency. The chairs' color variations fell exactly
          within the spectrum I struggle with. I needed a quick solution.
        </p>

        <p className="text-md">
          I turned to my smartphone, thinking there must be a{" "}
          <strong>camera color picker app</strong> that could help me identify
          the correct chair. However, my search led to disappointing results:
        </p>

        <ul className="list-disc pl-6">
          <li className="text-md">
            <strong>Websites</strong>: Most were cluttered with ads, required
            uploading photos, and provided only HEX or RGB values without
            meaningful context.
          </li>
          <li className="text-md">
            <strong>Apps</strong>: Many hid essential features behind paywalls
            or were bogged down with intrusive ads. Even when functional, they
            offered limited assistance by displaying only technical color codes.
          </li>
        </ul>

        <p className="text-md">
          Frustrated by the lack of accessible and user-friendly options, I
          decided to create my own solution.
        </p>

        <h2 className="text-2xl font-bold pt-4">
          Creating a Better Camera Color Picker
        </h2>

        <p className="text-md">
          Leveraging my skills as a software engineer, I envisioned a simple,
          web-based <strong>camera color picker</strong> that:
        </p>

        <ul className="list-disc pl-6">
          <li className="text-md">
            Works instantly without requiring downloads or installations.
          </li>
          <li className="text-md">
            Provides real-time color detection using the device's camera.
          </li>
          <li className="text-md">
            Is free to use and free from intrusive advertisements.
          </li>
          <li className="text-md">
            Offers meaningful color information accessible to everyone.
          </li>
        </ul>

        <p className="text-md">
          With the help of modern web technologies and a bit of creativity, I
          developed a prototype in less than an hour. The initial version
          allowed users to open a webpage that accessed the camera and
          identified the color at the center of the screen. Testing it on my
          phone, I was thrilled to see it work seamlessly.
        </p>

        <p className="text-md">
          Encouraged by the prototype's success, I refined the tool by enhancing
          the user interface and adding controls for various scenarios. I built
          a website around it and made it publicly available as GetColor.io.
        </p>

        <h2 className="text-2xl font-bold pt-4">
          More Than Just for Color Blindness
        </h2>

        <p className="text-md">
          While GetColor.io was created to assist those with color vision
          deficiencies, its usefulness extends far beyond:
        </p>

        <ul className="list-disc pl-6">
          <li className="text-md">
            <strong>Artists</strong>: My wife, an artist, uses it to capture
            unique colors for her paintings.
          </li>
          <li className="text-md">
            <strong>Interior Designers</strong>: Quickly match colors and shades
            in real-world environments.
          </li>
          <li className="text-md">
            <strong>Web and Graphic Designers</strong>: Find inspiration by
            identifying captivating colors on the go.
          </li>
          <li className="text-md">
            <strong>Educators and Students</strong>: A practical tool for
            teaching and learning about colors.
          </li>
        </ul>

        <h2 className="text-2xl font-bold pt-4">Join the Community</h2>

        <p className="text-md">
          If you've found GetColor.io helpful, I'd love to hear your story. Your
          feedback is invaluable and helps improve the tool for everyone. Feel
          free to:
        </p>

        <ul className="list-disc pl-6">
          <li className="text-md">
            <span>💬 </span>
            <a href="https://discord.gg/3gA9rHCXuz" className="underline">
              <strong className="font-normal">
                Join our Discord community
              </strong>
            </a>
            : Share your experiences and connect with others -
          </li>
          <li className="text-md">
            <strong>✉️ Email me</strong>: Reach out at{" "}
            <a href="mailto:andrei@getcolor.io" className="underline">
              andrei@getcolor.io
            </a>{" "}
            with your thoughts or suggestions.
          </li>
          <li className="text-md">
            <strong>⭐️ on GitHub </strong>
            <a
              href="https://github.com/andbas/color-picker/"
              className="underline"
            >
              https://github.com/andbas/color-picker/
            </a>
          </li>
        </ul>

        <h2 className="text-2xl font-bold pt-4">Our Commitment</h2>

        <p className="text-md">
          GetColor.io is committed to providing a reliable and accessible{" "}
          <strong>camera color picker</strong> for everyone. We believe in the
          power of technology to solve real-world problems and strive to make
          this tool as helpful as possible without any barriers.
        </p>

        <p className="text-md">
          Thank you for visiting GetColor.io. Whether you're here to solve a
          specific problem or simply exploring, we're glad you found us. We hope
          this tool makes your life just a little bit easier.
        </p>
      </div>
    </>
  );
}
