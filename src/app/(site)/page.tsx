"use client";

import Link from "next/link";
import "../../index.css";
import { CloudOff, Focus, Hash, ShieldCheck, Smartphone } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <section className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col space-y-1.5 p-6 my-2">
        <h1 className="text-4xl font-semibold leading-slug tracking-tight">
          Capture Every Color Around You
        </h1>
        <h3 className="pb-6 pt-2 text-2xl leading-none">
          Instantly identify and use real-world colors with our browser-based
          Pixel Color Detector App.
        </h3>
        <div className="flex items-center justify-center">
          <Link
            href="/app"
            className="flex items-center gap-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-3 transition-all"
          >
            Start Detecting Colors
          </Link>
        </div>
      </section>
      <section className="text-card-foreground flex flex-col space-y-1.5 my-8">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          Turn Any Seen Color into Usable Code
        </h2>
        <p>
          Colors are everywhere - in nature, art, and everyday life. Imagine
          being able to capture any color you see and use it for your creative
          projects. With our Pixel Color Detector App, you can do just that.
          Simply open the app in your browser, point your camera, and tap to
          discover the exact HEX and RGB values, along with the color's name.
        </p>
      </section>
      <section className="text-card-foreground flex flex-col space-y-1.5 my-10">
        <h2 className="text-4xl font-semibold leading-none tracking-tight text-center mb-5">
          Key Features
        </h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="mr-2">
              {/* <Camera /> */}
              <Smartphone />
            </span>
            <div>
              <strong>Real-Time Color Detection</strong>
              <p>
                Point your camera and tap anywhere on the screen to instantly
                get color details.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2">
              <Focus />
            </span>
            <div>
              <strong>Precision with Pause & Zoom</strong>
              <p>
                Pause the live feed and zoom into the pixel matrix for exact
                color selection.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2">
              <Hash />
            </span>
            <div>
              <strong>Comprehensive Color Information</strong>
              <p>
                Access precise HEX and RGB values, plus the common names of
                colors for easy reference.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2">
              <ShieldCheck />
            </span>
            <div>
              <strong>Privacy and Security</strong>
              <p>
                We take your privacy seriously. All color detection is performed
                directly on your device. Your camera feed is never transmitted
                or stored on any server, ensuring your data remains completely
                private.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2">
              <CloudOff />
            </span>
            <div>
              <strong>No Installation Needed</strong>
              <p>
                Use the app directly in your browser—no downloads or sign-ups
                required.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2">
              <Smartphone />
            </span>
            <div>
              <strong>Always with You on Mobile</strong>
              <p>
                Optimized for mobile browsers, our app is always at your
                fingertips. Easily capture and use colors anytime, anywhere—no
                downloads or installations needed.
              </p>
            </div>
          </li>
        </ul>
      </section>
    </>
  );
}
