---
tags:
- AnimationScheduling
- FrameInterpolation
- VisualEffects
---

# Film Interpolation (mtb)
## Documentation
- Class name: `Film Interpolation (mtb)`
- Category: `mtb/frame iterpolation`
- Output node: `False`

The Film Interpolation (mtb) node utilizes Google Research's FILM technology for frame interpolation, specifically designed to handle large motion between frames. It provides a method to interpolate additional frames between a sequence of images, enhancing the fluidity and smoothness of motion in video content.
## Input types
### Required
- **`images`**
    - A tensor of images to be interpolated. This input is crucial for determining the frames between which the interpolation will occur, directly influencing the output's visual continuity.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`interpolate`**
    - An integer specifying the number of frames to interpolate between each pair of input frames. This parameter directly affects the smoothness and duration of the resulting motion.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`film_model`**
    - An instance of the FILM model used for interpolation. This model is responsible for the actual computation of the interpolated frames, leveraging advanced techniques to manage large motions effectively.
    - Comfy dtype: `FILM_MODEL`
    - Python dtype: `interpolator.Interpolator`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a tensor of interpolated images, enriched with additional frames to create a smoother transition between the original images.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_FilmInterpolation:
    """Google Research FILM frame interpolation for large motion"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "interpolate": ("INT", {"default": 2, "min": 1, "max": 50}),
                "film_model": ("FILM_MODEL",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "do_interpolation"
    CATEGORY = "mtb/frame iterpolation"

    def do_interpolation(
        self,
        images: torch.Tensor,
        interpolate: int,
        film_model: interpolator.Interpolator,
    ):
        n = images.size(0)
        # check if images is an empty tensor and return it...
        if n == 0:
            return (images,)

        # check if tensorflow GPU is available
        available_gpus = tf.config.list_physical_devices("GPU")
        if not len(available_gpus):
            log.warning(
                "Tensorflow GPU not available, falling back to CPU this will be very slow"
            )
        else:
            log.debug(f"Tensorflow GPU available, using {available_gpus}")

        num_frames = (n - 1) * (2 ** (interpolate) - 1)
        log.debug(f"Will interpolate into {num_frames} frames")

        in_frames = [images[i] for i in range(n)]
        out_tensors = []

        pbar = comfy.utils.ProgressBar(num_frames)

        for frame in util.interpolate_recursively_from_memory(
            in_frames, interpolate, film_model
        ):
            out_tensors.append(
                torch.from_numpy(frame)
                if isinstance(frame, np.ndarray)
                else frame
            )
            model_management.throw_exception_if_processing_interrupted()
            pbar.update(1)

        out_tensors = torch.cat(
            [tens.unsqueeze(0) for tens in out_tensors], dim=0
        )

        log.debug(f"Returning {len(out_tensors)} tensors")
        log.debug(f"Output shape {out_tensors.shape}")
        log.debug(f"Output type {out_tensors.dtype}")
        return (out_tensors,)

```
