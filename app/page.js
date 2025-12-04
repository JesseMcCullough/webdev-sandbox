"use client";

import {
    Slider,
    SliderItems,
    SliderItem,
    SliderIndicators,
} from "@/components/Slider/Slider";
import apple from "../images/apple.png";
import banana from "../images/banana.png";
import logo from "../images/logo.jpg";
import peach from "../images/peach.png";

export default function Home() {
    return (
        <>
            <Slider>
                <SliderItems>
                    <SliderItem
                        index={0}
                        data={apple.src}
                        thumbnail={apple.src}
                    >
                        <h1>1 - My Title Here</h1>
                        <p>
                            1 - Lorem ipsum yooo sit amet, consectetur
                            adipiscing elit. Nunc sem massa, convallis sed
                            lectus eu, euismod vehicula libero. Ut posuere
                            aliquam nibh, nec fermentum nisi luctus ac.
                            Vestibulum quis libero est. Interdum et malesuada
                            fames ac ante ipsum primis in faucibus. Vivamus
                            justo quam, volutpat a vehicula a, placerat eget
                            velit. Vivamus aliquet maximus ipsum ac ultrices.
                            Cras risus nisi, rhoncus in ultricies sit amet,
                            rhoncus at enim. Sed justo erat, venenatis id enim
                            a, finibus faucibus purus.{" "}
                        </p>
                    </SliderItem>
                    <SliderItem
                        index={1}
                        data={banana.src}
                        thumbnail={banana.src}
                    >
                        <h1>2 - My Title Here</h1>
                        <p>
                            2 - Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit. Nunc sem massa, convallis sed
                            lectus eu, euismod vehicula libero. Ut posuere
                            aliquam nibh, nec fermentum nisi luctus ac.
                            Vestibulum quis libero est. Interdum et malesuada
                            fames ac ante ipsum primis in faucibus. Vivamus
                            justo quam, volutpat a vehicula a, placerat eget
                            velit. Vivamus aliquet maximus ipsum ac ultrices.
                            Cras risus nisi, rhoncus in ultricies sit amet,
                            rhoncus at enim. Sed justo erat, venenatis id enim
                            a, finibus faucibus purus.{" "}
                        </p>
                    </SliderItem>
                    <SliderItem index={2} data={logo.src} thumbnail={logo.src}>
                        <h1>3 - My Title Here</h1>
                        <p>
                            3 - ayyyy ipsum dolor sit amet, consectetur
                            adipiscing elit. Nunc sem massa, convallis sed
                            lectus eu, euismod vehicula libero. Ut posuere
                            aliquam nibh, nec fermentum nisi luctus ac.
                            Vestibulum quis libero est. Interdum et malesuada
                            fames ac ante ipsum primis in faucibus. Vivamus
                            justo quam, volutpat a vehicula a, placerat eget
                            velit. Vivamus aliquet maximus ipsum ac ultrices.
                            Cras risus nisi, rhoncus in ultricies sit amet,
                            rhoncus at enim. Sed justo erat, venenatis id enim
                            a, finibus faucibus purus.{" "}
                        </p>
                    </SliderItem>

                    <SliderItem
                        index={3}
                        data={peach.src}
                        thumbnail={peach.src}
                    >
                        <h1>4 - My Title Here</h1>
                        <p>
                            4 - Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit. Nunc sem massa, convallis sed
                            lectus eu, euismod vehicula libero. Ut posuere
                            aliquam nibh, nec fermentum nisi luctus ac.
                            Vestibulum quis libero est. Interdum et malesuada
                            fames ac ante ipsum primis in faucibus. Vivamus
                            justo quam, volutpat a vehicula a, placerat eget
                            velit. Vivamus aliquet maximus ipsum ac ultrices.
                            Cras risus nisi, rhoncus in ultricies sit amet,
                            rhoncus at enim. Sed justo erat, venenatis id enim
                            a, finibus faucibus purus.{" "}
                        </p>
                    </SliderItem>
                </SliderItems>
                <SliderIndicators />
            </Slider>
            <Slider name="multi">
                <SliderItems>
                    <SliderItem
                        index={0}
                        data={apple.src}
                        thumbnail={apple.src}
                    >
                        <div className="wrapper">
                            <h1>1 - My Title Here</h1>
                            <p>
                                1 - Lorem ipsum yooo sit amet, consectetur
                                adipiscing elit. Nunc sem massa, convallis sed
                                lectus eu, euismod vehicula libero. Ut posuere
                                aliquam nibh, nec fermentum nisi luctus ac.
                                Vestibulum quis libero est. Interdum et
                                malesuada fames ac ante ipsum primis in
                                faucibus. Vivamus justo quam, volutpat a
                                vehicula a, placerat eget velit. Vivamus aliquet
                                maximus ipsum ac ultrices. Cras risus nisi,
                                rhoncus in ultricies sit amet, rhoncus at enim.
                                Sed justo erat, venenatis id enim a, finibus
                                faucibus purus.{" "}
                            </p>
                        </div>
                        <div className="wrapper">
                            {" "}
                            <h1>2 - My Title Here</h1>
                            <p>
                                2 - Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nunc sem massa, convallis sed
                                lectus eu, euismod vehicula libero. Ut posuere
                                aliquam nibh, nec fermentum nisi luctus ac.
                                Vestibulum quis libero est. Interdum et
                                malesuada fames ac ante ipsum primis in
                                faucibus. Vivamus justo quam, volutpat a
                                vehicula a, placerat eget velit. Vivamus aliquet
                                maximus ipsum ac ultrices. Cras risus nisi,
                                rhoncus in ultricies sit amet, rhoncus at enim.
                                Sed justo erat, venenatis id enim a, finibus
                                faucibus purus.{" "}
                            </p>
                        </div>
                    </SliderItem>
                    <SliderItem
                        index={1}
                        data={peach.src}
                        thumbnail={peach.src}
                    >
                        <h1>3 - My Title Here</h1>
                        <p>
                            3 - Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit. Nunc sem massa, convallis sed
                            lectus eu, euismod vehicula libero. Ut posuere
                            aliquam nibh, nec fermentum nisi luctus ac.
                            Vestibulum quis libero est. Interdum et malesuada
                            fames ac ante ipsum primis in faucibus. Vivamus
                            justo quam, volutpat a vehicula a, placerat eget
                            velit. Vivamus aliquet maximus ipsum ac ultrices.
                            Cras risus nisi, rhoncus in ultricies sit amet,
                            rhoncus at enim. Sed justo erat, venenatis id enim
                            a, finibus faucibus purus.{" "}
                        </p>
                    </SliderItem>
                </SliderItems>
                <SliderIndicators />
            </Slider>
        </>
    );
}
