// Copyright (C) 2024, Centum T&S

const cp = require('child_process');


/**
 * Utility class for playing a video using GStreamer.
 *
 * The video is shown as an always-on-top window on the Wayland dekstop. This window is invisible
 * for the touchscreen: clicking on it will click on the window right below.
 */
class GStreamerVideo {
    #child;
    #exitCallback;


    /**
     * Constructs a new GStreamerVideo object.
     */
    constructor() {
        this.#exitCallback = this.stop.bind(this);
    }


    /**
     * Plays the given video on screen.
     * @param {string} url The URL of the video to play.
     * @param {Object} [area] An `{x,y,width,height}` object to position video window.
     * @param {Object} [opts] Extra playing options.
     */
    play(url, area, opts) {
        this.playPipeline(this.createPipeline(url, area, opts));
    }

    /**
     * Plays the given GStreamer pipeline on screen.
     * @param {string[]} pipeline The GStreamer pipeline to play.
     */
    playPipeline(pipeline) {
        this.stop();

        this.#child = cp.spawn("gst-launch-1.0", pipeline, {
            stdio: ["ignore", "pipe", "inherit"]
        });

        process.on("exit", this.#exitCallback);
    }


    /**
     * Stops the video being played.
     */
    stop() {
        if (!this.#child)
            return;  // Video is not palying.

        this.#child.kill();
        this.#child = null;

        process.off("exit", this.#exitCallback);
    }


    /**
     * Create the GStreamer pipeline for playing the givn video.
     * @param {string} url The URL of the video to play.
     * @param {Object} [area] An `{x,y,width,height}` object to position video window.
     * @param {Object} [opts] Extra playing options.
     * @returns The complete GStreamer pipeline.
     */
    createPipeline(url, area, opts) {
        const { rescale = false } = opts || {};

        let pipeline = this.createSourcePipeline(url, opts);
        pipeline.push("!", "decodebin");

        // VPU video rescaler, prefer rescaling using Wayland viewporter.
        if (rescale)
            pipeline.push("!", "v4l2convert");

        const sink = this.createSinkPipeline(area, rescale);
        return pipeline.concat(sink);
    }

    /**
     * Create the source part of the pipeline.
     * @param {string} url The URL of the video to play.
     * @param {Object} [opts] Extra playing options.
     * @returns GStreamer source pipeline.
     */
    createSourcePipeline(url, opts) {
        const { latency = 150 } = opts || {};

        if (/^rtsps?[uth]?:\/\//.test(url)) {
            let pipeline = ["rtspsrc", `location=${url}`, `latency=${latency}`];

            // Make sure only video is decoded, and not the potential ONVIF metadata stream.
            // It has the following cap: "application/x-rtp,media=application".
            pipeline.push("!", "application/x-rtp,media=video");

            return pipeline;
        } else if (url.startsWith("file://")) {
            return ["filesrc", `location=${url.substring(7)}`];
        } else {
            return [url];
        }
    }

    /**
     * Creates the sink part of the pipeline.
     * @param {Object} area An `{x,y,width,height}` object to position video window.
     * @param {boolean} rescale true to force the video size before the sink element.
     * @returns GStreamer sink pipeline.
     */
    createSinkPipeline(area, rescale = false) {
        const { x = 0, y = 0, width = 500, height = 500 } = area || {};
        const sink = ["!", "waylandsink", `render-rectangle=<${x},${y},${width},${height}>`];

        // If rescaling is enabled, force rescaling before reaching sink element.
        if (rescale)
            return ["!", `video/x-raw,width=${width},height=${height}`].concat(sink);
        else
            return sink;
    }
};


// Export the GStreamerVideo class.
module.exports = GStreamerVideo;