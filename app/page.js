"use client";

import {
    Slider,
    SliderViewer,
    SliderItems,
    SliderItem,
} from "@/components/Slider/Slider";
import apple from "../images/apple.png";
import banana from "../images/banana.png";
import logo from "../images/logo.jpg";
import peach from "../images/peach.png";

export default function Home() {
    return (
        <>
            <Slider>
                <SliderViewer initialView={apple.src} />
                <SliderItems>
                    <SliderItem data={apple.src} thumbnail={apple.src} />
                    <SliderItem data={banana.src} thumbnail={banana.src} />
                    <SliderItem data={logo.src} thumbnail={logo.src} />
                    <SliderItem data={peach.src} thumbnail={peach.src} />
                </SliderItems>
            </Slider>
        </>
    );
}
