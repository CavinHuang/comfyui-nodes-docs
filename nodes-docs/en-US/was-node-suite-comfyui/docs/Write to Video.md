---
tags:
- Animation
- Image
---

# Write to Video
## Documentation
- Class name: `Write to Video`
- Category: `WAS Suite/Animation/Writer`
- Output node: `False`

The 'Write to Video' node is designed to facilitate the creation and manipulation of video files from images. It encompasses functionalities such as writing individual images to a video, generating transition frames between images, adding still image delays, and configuring video properties like frame rate and resolution. This node aims to provide a comprehensive set of tools for video editing and generation, making it easier to produce high-quality video content.
## Input types
### Required
- **`image`**
    - The image or sequence of images to be written into the video. This is the primary content that will be displayed in the video.
    - Comfy dtype: `IMAGE`
    - Python dtype: `np.ndarray or list of np.ndarray`
- **`transition_frames`**
    - Specifies the number of frames used for creating smooth transitions between images in the video. It enhances the visual flow of the video content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`image_delay_sec`**
    - Determines the duration for which each image is displayed in the video, allowing for the creation of still image delays. This parameter helps in controlling the pacing of the video content.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`fps`**
    - Sets the frame rate of the video, defining how many frames are displayed per second. This parameter is crucial for determining the smoothness and playback speed of the video.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_size`**
    - Specifies the maximum size (in pixels) for the images in the video, ensuring that all images are uniformly scaled. This parameter helps in maintaining consistent video quality and aspect ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`output_path`**
    - The path to the directory where the video will be saved. It determines the location of the output video file.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filename`**
    - The name of the output video file. It allows for easy identification and organization of created videos.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`codec`**
    - Defines the codec used for encoding the video. Different codecs can affect the video's compatibility, size, and quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`IMAGE_PASS`**
    - Comfy dtype: `IMAGE`
    - Indicates whether the image processing and video writing operations were successful.
    - Python dtype: `bool`
- **`filepath_text`**
    - Comfy dtype: `STRING`
    - The full path to the created video file, including its name. It provides a direct link to access or share the video.
    - Python dtype: `str`
- **`filename_text`**
    - Comfy dtype: `STRING`
    - The name of the created video file. It helps in identifying the video among other files.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Video_Writer:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        WTools = WAS_Tools_Class()
        v = WTools.VideoWriter()
        codecs = []
        for codec in v.get_codecs():
            codecs.append(codec.upper())
        codecs = sorted(codecs)
        return {
            "required": {
                "image": ("IMAGE",),
                "transition_frames": ("INT", {"default":30, "min":0, "max":120, "step":1}),
                "image_delay_sec": ("FLOAT", {"default":2.5, "min":0.1, "max":60000.0, "step":0.1}),
                "fps": ("INT", {"default":30, "min":1, "max":60.0, "step":1}),
                "max_size": ("INT", {"default":512, "min":128, "max":1920, "step":1}),
                "output_path": ("STRING", {"default": "./ComfyUI/output", "multiline": False}),
                "filename": ("STRING", {"default": "comfy_writer", "multiline": False}),
                "codec": (codecs,),
            }
        }

    #@classmethod
    #def IS_CHANGED(cls, **kwargs):
    #    return float("NaN")

    RETURN_TYPES = ("IMAGE",TEXT_TYPE,TEXT_TYPE)
    RETURN_NAMES = ("IMAGE_PASS","filepath_text","filename_text")
    FUNCTION = "write_video"

    CATEGORY = "WAS Suite/Animation/Writer"

    def write_video(self, image, transition_frames=10, image_delay_sec=10, fps=30, max_size=512,
                            output_path="./ComfyUI/output", filename="morph", codec="H264"):

        conf = getSuiteConfig()
        if not conf.__contains__('ffmpeg_bin_path'):
            cstr(f"Unable to use MP4 Writer because the `ffmpeg_bin_path` is not set in `{WAS_CONFIG_FILE}`").error.print()
            return (image,"","")

        if conf.__contains__('ffmpeg_bin_path'):
            if conf['ffmpeg_bin_path'] != "/path/to/ffmpeg":
                sys.path.append(conf['ffmpeg_bin_path'])
                os.environ["OPENCV_FFMPEG_CAPTURE_OPTIONS"] = "rtsp_transport;udp"
                os.environ['OPENCV_FFMPEG_BINARY'] = conf['ffmpeg_bin_path']

        if output_path.strip() in [None, "", "."]:
            output_path = "./ComfyUI/output"

        if image == None:
            image = pil2tensor(Image.new("RGB", (512,512), (0,0,0)))

        if transition_frames < 0:
            transition_frames = 0
        elif transition_frames > 60:
            transition_frames = 60

        if fps < 1:
            fps = 1
        elif fps > 60:
            fps = 60

        results = []
        for img in image:
            print(img.shape)
            new_image = self.rescale_image(tensor2pil(img), max_size)
            print(new_image.size)

            tokens = TextTokens()
            output_path = os.path.abspath(os.path.join(*tokens.parseTokens(output_path).split('/')))
            output_file = os.path.join(output_path, tokens.parseTokens(filename))

            if not os.path.exists(output_path):
                os.makedirs(output_path, exist_ok=True)

            WTools = WAS_Tools_Class()
            MP4Writer = WTools.VideoWriter(int(transition_frames), int(fps), int(image_delay_sec), max_size=max_size, codec=codec)
            path = MP4Writer.write(new_image, output_file)

            results.append(img)

        return (torch.cat(results, dim=0), path, filename)

    def rescale_image(self, image, max_dimension):
        width, height = image.size
        if width > max_dimension or height > max_dimension:
            scaling_factor = max(width, height) / max_dimension
            new_width = int(width / scaling_factor)
            new_height = int(height / scaling_factor)
            image = image.resize((new_width, new_height), Image.Resampling(1))
        return image

```
