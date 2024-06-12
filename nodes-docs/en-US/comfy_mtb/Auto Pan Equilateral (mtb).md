---
tags:
- Image
---

# Auto Pan Equilateral (mtb)
## Documentation
- Class name: `Auto Pan Equilateral (mtb)`
- Category: `mtb/utils`
- Output node: `False`

This node is designed to generate a 360-degree panning video from an equilateral image by transforming the image based on specified field of view (FOV) parameters, elevation, and frame count to create a seamless panoramic experience.
## Input types
### Required
- **`equilateral_image`**
    - The equilateral image to be transformed into a 360-degree panning video. It serves as the base for generating the panoramic frames.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`fovX`**
    - Specifies the horizontal field of view for the panoramic transformation. It influences the breadth of view in each frame of the video.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`fovY`**
    - Specifies the vertical field of view for the panoramic transformation. It affects the height of the view in each frame of the video.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`elevation`**
    - Determines the elevation angle at which the panoramic frames are generated, affecting the vertical angle of the camera.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`frame_count`**
    - The total number of frames to generate for the 360-degree panning video, determining the video's length.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`width`**
    - The width of each frame in the generated video, affecting the resolution.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The height of each frame in the generated video, influencing the resolution.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`floats_fovX`**
    - An optional list of FOVX values to specify a varying horizontal field of view across frames, allowing for dynamic panning effects.
    - Comfy dtype: `FLOATS`
    - Python dtype: `List[float]`
- **`floats_fovY`**
    - An optional list of FOVY values to specify a varying vertical field of view across frames, enabling dynamic panning effects.
    - Comfy dtype: `FLOATS`
    - Python dtype: `List[float]`
- **`floats_elevation`**
    - An optional list of elevation values to specify varying camera angles across frames, enhancing the panoramic effect.
    - Comfy dtype: `FLOATS`
    - Python dtype: `List[float]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after applying the 360-degree panning transformation, represented as a sequence of frames.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_AutoPanEquilateral:
    """Generate a 360 panning video from an equilateral image."""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "equilateral_image": ("IMAGE",),
                "fovX": ("FLOAT", {"default": 45.0}),
                "fovY": ("FLOAT", {"default": 45.0}),
                "elevation": ("FLOAT", {"default": 0.5}),
                "frame_count": ("INT", {"default": 100}),
                "width": ("INT", {"default": 768}),
                "height": ("INT", {"default": 512}),
            },
            "optional": {
                "floats_fovX": ("FLOATS",),
                "floats_fovY": ("FLOATS",),
                "floats_elevation": ("FLOATS",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    CATEGORY = "mtb/utils"
    FUNCTION = "generate_frames"

    def check_floats(self, f: list[float] | None, expected_count: int):
        if f:
            if len(f) == expected_count:
                return True
            return False
        return True

    def generate_frames(
        self,
        equilateral_image: torch.Tensor,
        fovX: float,
        fovY: float,
        elevation: float,
        frame_count: int,
        width: int,
        height: int,
        floats_fovX: list[float] | None = None,
        floats_fovY: list[float] | None = None,
        floats_elevation: list[float] | None = None,
    ):
        source = tensor2np(equilateral_image)

        if len(source) > 1:
            log.warn(
                "You provided more than one image in the equilateral_image input, only the first will be used."
            )
        if not all(
            [
                self.check_floats(x, frame_count)
                for x in [floats_fovX, floats_fovY, floats_elevation]
            ]
        ):
            raise ValueError(
                "You provided less than the expected number of fovX, fovY, or elevation values."
            )

        source = source[0]
        frames = []

        pbar = comfy.utils.ProgressBar(frame_count)
        for i in range(frame_count):
            rotation_angle = (i / frame_count) * 2 * pi

            if floats_elevation:
                elevation = floats_elevation[i]

            if floats_fovX:
                fovX = floats_fovX[i]

            if floats_fovY:
                fovY = floats_fovY[i]

            fov = [fovX / 100, fovY / 100]
            center_point = [rotation_angle / (2 * pi), elevation]

            nfov = numpy_NFOV(fov, height, width)
            frame = nfov.to_nfov(source, center_point=center_point)

            frames.append(frame)

            model_management.throw_exception_if_processing_interrupted()
            pbar.update(1)

        return (pil2tensor(frames),)

```
