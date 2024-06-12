---
tags:
- Image
---

# Export With Ffmpeg (mtb)
## Documentation
- Class name: `Export With Ffmpeg (mtb)`
- Category: `mtb/IO`
- Output node: `True`

The Export With Ffmpeg (mtb) node provides functionality for exporting media files using FFmpeg, supporting various formats and codecs. It allows for the conversion of image sequences or playlists into video files, with customizable frame rates, formats, and codecs, catering to different requirements for video production.
## Input types
### Required
- **`fps`**
    - Specifies the frames per second for the video export, affecting the playback speed and smoothness of the resulting video.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`prefix`**
    - A prefix for the output file name, aiding in the organization and identification of exported files.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`format`**
    - Determines the video file format (e.g., mov, mp4, mkv), influencing compatibility with different players and platforms.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`codec`**
    - Selects the codec used for encoding the video, impacting the balance between quality and file size.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`images`**
    - An optional tensor of images to be exported as a video, enabling the creation of video content from individual frames.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[torch.Tensor]`
- **`playlist`**
    - An optional list of video file paths for concatenation, facilitating the compilation of multiple videos into a single file.
    - Comfy dtype: `PLAYLIST`
    - Python dtype: `Optional[List[str]]`
## Output types
- **`video`**
    - Comfy dtype: `VIDEO`
    - The path to the exported video file, indicating the successful creation of the video.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_ExportWithFfmpeg:
    """Export with FFmpeg (Experimental)"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "optional": {
                "images": ("IMAGE",),
                "playlist": ("PLAYLIST",),
            },
            "required": {
                "fps": ("FLOAT", {"default": 24, "min": 1}),
                "prefix": ("STRING", {"default": "export"}),
                "format": (
                    ["mov", "mp4", "mkv", "gif", "avi"],
                    {"default": "mov"},
                ),
                "codec": (
                    ["prores_ks", "libx264", "libx265", "gif"],
                    {"default": "prores_ks"},
                ),
            },
        }

    RETURN_TYPES = ("VIDEO",)
    OUTPUT_NODE = True
    FUNCTION = "export_prores"
    CATEGORY = "mtb/IO"

    def export_prores(
        self,
        fps: float,
        prefix: str,
        format: str,
        codec: str,
        images: Optional[torch.Tensor] = None,
        playlist: Optional[List[str]] = None,
    ):
        pix_fmt = "rgb48le" if codec == "prores_ks" else "yuv420p"
        file_ext = format
        file_id = f"{prefix}_{uuid.uuid4()}.{file_ext}"

        if playlist is not None and images is not None:
            log.info(f"Exporting to {output_dir / file_id}")

        if playlist is not None:
            if len(playlist) == 0:
                log.debug("Playlist is empty, skipping")
                return ("",)

            temp_playlist_path = (
                output_dir / f"temp_playlist_{uuid.uuid4()}.txt"
            )
            log.debug(
                f"Create a temporary file to list the videos for concatenation to {temp_playlist_path}"
            )

            with open(temp_playlist_path, "w") as f:
                for video_path in playlist:
                    f.write(f"file '{video_path}'\n")

            out_path = (output_dir / file_id).as_posix()

            # Prepare the FFmpeg command for concatenating videos from the playlist
            command = [
                "ffmpeg",
                "-f",
                "concat",
                "-safe",
                "0",
                "-i",
                temp_playlist_path.as_posix(),
                "-c",
                "copy",
                "-y",
                out_path,
            ]
            log.debug(f"Executing {command}")
            subprocess.run(command)

            temp_playlist_path.unlink()

            return (out_path,)

        if (
            images is None or images.size(0) == 0
        ):  # the is None check is just for the type checker
            return ("",)

        frames = tensor2np(images)
        log.debug(f"Frames type {type(frames[0])}")
        log.debug(f"Exporting {len(frames)} frames")

        if codec == "gif":
            out_path = (output_dir / file_id).as_posix()
            command = [
                "ffmpeg",
                "-f",
                "image2pipe",
                "-vcodec",
                "png",
                "-r",
                str(fps),
                "-i",
                "-",
                "-vcodec",
                "gif",
                "-y",
                out_path,
            ]
            process = subprocess.Popen(command, stdin=subprocess.PIPE)
            for frame in frames:
                model_management.throw_exception_if_processing_interrupted()
                Image.fromarray(frame).save(process.stdin, "PNG")

            process.stdin.close()
            process.wait()
        else:
            frames = [frame.astype(np.uint16) * 257 for frame in frames]

        height, width, _ = frames[0].shape

        out_path = (output_dir / file_id).as_posix()

        # Prepare the FFmpeg command
        command = [
            "ffmpeg",
            "-y",
            "-f",
            "rawvideo",
            "-vcodec",
            "rawvideo",
            "-s",
            f"{width}x{height}",
            "-pix_fmt",
            pix_fmt,
            "-r",
            str(fps),
            "-i",
            "-",
            "-c:v",
            codec,
            "-r",
            str(fps),
            "-y",
            out_path,
        ]

        process = subprocess.Popen(command, stdin=subprocess.PIPE)

        for frame in frames:
            model_management.throw_exception_if_processing_interrupted()
            process.stdin.write(frame.tobytes())

        process.stdin.close()
        process.wait()

        return (out_path,)

```
