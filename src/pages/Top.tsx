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

class Blocks {
    blocks: Array<Body>;

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
    get(x: number, y: number) {}
}

function Top() {
    const canvas = useRef<HTMLCanvasElement>();
    var engine: Engine;

    var s = 64;
    var w = 5 * s + s;
    var h = 7 * s + s;
    var blocks = new Blocks(5, 7);

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
            var block = blocks[tileX][tileY];

            checkAndDelete(tileX, tileY);
        }
    };

    function checkAndDelete(x: number, y: number) {
        var body = blocks[x][y];
        (blocks[x][y] as any) = {
            render: { fillStyle: '' },
        };

        const color = body.render.fillStyle;

        body.collisionFilter = {
            group: -1,
            category: 2,
            mask: 0,
        };
        Composite.remove(engine.world, body);

        if (
            blocks[x - 1] &&
            blocks[x - 1][y].render.fillStyle === color
        ) {
            checkAndDelete(x - 1, y);
        }

        if (
            blocks[x + 1] &&
            blocks[x + 1][y].render.fillStyle === color
        ) {
            checkAndDelete(x + 1, y);
        }

        if (
            blocks[x][y - 1] &&
            blocks[x][y - 1].render.fillStyle === color
        ) {
            checkAndDelete(x, y - 1);
        }

        if (
            blocks[x][y + 1] &&
            blocks[x][y + 1].render.fillStyle === color
        ) {
            checkAndDelete(x, y + 1);
        }
        var newBody = Bodies.rectangle(
            x * s + s,
            0 * s + s - 20,
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
                    ][Math.floor(Math.random() * 4)],
                },
            }
            // );
            // World.add(engine.world, newBody);
            // blocks[x] = [
            //     newBody,
            //     ...blocks[x].slice(0, y),
            //     ...blocks[x].slice(y + 1),
            // ];
            // console.log(
            //     blocks
            //         .map((v) =>
            //             v.map((b) => b.render.fillStyle)
            //         )
            //         .reverse()
        );
    }

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
            ...blocks.flat(),
        ]);

        Runner.run(runner, engine);
        Render.run(render);
    });

    return (
        <>
            <canvas onClick={ClickHandler} ref={canvas} />
        </>
    );
}

export default Top;
