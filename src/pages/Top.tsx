import React, {
    ReactEventHandler,
    useEffect,
    useRef,
} from 'react';
import Matter, {
    Bodies,
    Composite,
    Engine,
    Render,
    Runner,
    World,
} from 'matter-js';

class Blocks<T> {
    blocks: Array<T>;

    constructor(sizeX: number, sizeY: number) {
        var s = 64;
        var blocks = new Array(sizeX)
            .fill('')
            .map((...[, x]) =>
                new Array(sizeY)
                    .fill('')
                    .map((...[, y]) => {
                        return Bodies.rectangle(
                            x * s + s,
                            y * s + s,
                            s,
                            s,
                            {
                                friction: 0.01,
                                render: {
                                    fillStyle: [
                                        'red',
                                        'orange',
                                        'yellow',
                                        'green',
                                        'blue',
                                    ][
                                        Math.floor(
                                            Math.random() *
                                                4
                                        )
                                    ],
                                },
                            }
                        );
                    })
            );
    }
    set(x: number, y: number, value: T) {
        this.blocks[x][y] = value;
    }
    destroy(x: number, y: number) {}
}

function Top() {
    const canvas = useRef<HTMLCanvasElement>();
    var engine: Engine;

    var s = 64;
    var w = 5 * s + s;
    var h = 7 * s + s;
    var blocks = new Blocks<Body>(5, 7); // |{ render: { fillStyle: string } }

    const ClickHandler = (
        e: React.MouseEvent<HTMLCanvasElement>
    ) => {
        var { offsetX: clickX, offsetY: clickY } =
            e.nativeEvent;

        if (
            s / 2 < clickX &&
            clickX < w - s / 2 &&
            s / 2 < clickY &&
            clickY < h - s / 2
        ) {
            var clickX = clickX + s / 2;
            var clickY = clickY + s / 2;
            var tileX = Math.floor(clickX / s) - 1;
            var tileY = Math.floor(clickY / s) - 1;

            blocks.destroy(tileX, tileY);
        }
    };

    useEffect(() => {
        engine = Engine.create({});
        var render = Render.create({
            canvas: canvas.current,
            engine: engine,
            options: {
                width: w,
                height: h,
                wireframes: false,
                background: '#ffffff',
            },
        });
        var runner = Runner.create();

        Composite.add(engine.world, [
            Bodies.rectangle(
                s / 4,
                h / 2,
                s / 2,
                7 * s + s,
                {
                    isStatic: true,
                    render: { fillStyle: 'blue' },
                }
            ),
            Bodies.rectangle(
                w - s / 4,
                h / 2,
                s / 2,
                7 * s + s,
                {
                    isStatic: true,
                    render: { fillStyle: 'blue' },
                }
            ),
            Bodies.rectangle(w / 2, h - s / 4, w, s / 2, {
                isStatic: true,
                render: { fillStyle: 'blue' },
            }),
        ]);

        Runner.run(runner, engine);
        Render.run(render);
    });
    Composite.add(engine.world, blocks.blocks.flat());

    return (
        <>
            <canvas onClick={ClickHandler} ref={canvas} />
        </>
    );
}

export default Top;
