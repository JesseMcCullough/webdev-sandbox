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
                    <SliderItem
                        index={0}
                        data={apple.src}
                        thumbnail={apple.src}
                    />
                    <SliderItem
                        index={1}
                        data={banana.src}
                        thumbnail={banana.src}
                    />
                    <SliderItem
                        index={2}
                        data={logo.src}
                        thumbnail={logo.src}
                    />
                    <SliderItem
                        index={3}
                        data={peach.src}
                        thumbnail={peach.src}
                    />
                </SliderItems>
            </Slider>
        </>
    );
}
